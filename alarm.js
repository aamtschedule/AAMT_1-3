/* Subject alarms for the schedule PWA.
   Local alarms run while the page is open. Background delivery needs a push server. */
(() => {
  'use strict';
  const STORE = 'aamtSubjectAlarmsV1';
  const firedKey = 'aamtSubjectAlarmsFiredV1';
  let audioContext = null;
  let lastRenderedSem = null;

  const $ = id => document.getElementById(id);
  const readSettings = () => {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (_) { return {}; }
  };
  const saveSettings = value => localStorage.setItem(STORE, JSON.stringify(value));
  const semesterSettings = () => {
    const all = readSettings();
    const key = String(typeof currentSem !== 'undefined' ? currentSem : 2);
    all[key] ||= { defaults: 10, subjects: {} };
    return { all, key, current: all[key] };
  };
  const courseList = () => {
    try {
      if (typeof getEffectiveCourses === 'function') return getEffectiveCourses();
      if (typeof scheduleData !== 'undefined') return scheduleData.courses || [];
    } catch (_) {}
    return [];
  };
  const subjectRows = () => {
    const map = new Map();
    courseList().forEach(c => {
      if (!c || !c.id || c.startH === 'TBA' || c.startH == null) return;
      if (!map.has(c.id)) map.set(c.id, { id: c.id, desc: c.desc || c.id, color: c.color || '#8099cc' });
    });
    return [...map.values()].sort((a,b) => a.id.localeCompare(b.id));
  };
  const getSubjectSetting = (id) => {
    const { current } = semesterSettings();
    return current.subjects[id] || { enabled: true, lead: current.defaults ?? 10 };
  };
  const saveSubjectSetting = (id, setting) => {
    const { all, key, current } = semesterSettings();
    current.subjects[id] = setting;
    all[key] = current;
    saveSettings(all);
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function renderSettings() {
    const host = $('alarmSubjectList');
    if (!host) return;
    const { current } = semesterSettings();
    $('defaultAlarmLead').value = String(current.defaults ?? 10);
    host.innerHTML = subjectRows().map(row => {
      const setting = getSubjectSetting(row.id);
      return `<div class="alarm-subject">
        <input type="checkbox" data-alarm-enabled="${esc(row.id)}" ${setting.enabled ? 'checked' : ''} aria-label="Enable alarm for ${esc(row.id)}">
        <div class="alarm-subject-main"><div class="alarm-subject-code">${esc(row.id)}</div><div class="alarm-subject-desc">${esc(row.desc)}</div></div>
        <select data-alarm-lead="${esc(row.id)}" aria-label="Reminder time for ${esc(row.id)}">
          <option value="0" ${setting.lead==0?'selected':''}>At start</option>
          <option value="5" ${setting.lead==5?'selected':''}>5 min</option>
          <option value="10" ${setting.lead==10?'selected':''}>10 min</option>
          <option value="15" ${setting.lead==15?'selected':''}>15 min</option>
          <option value="30" ${setting.lead==30?'selected':''}>30 min</option>
        </select>
      </div>`;
    }).join('') || '<div class="alarm-muted" style="padding:16px 0">No timed subjects are available for this semester.</div>';
    host.querySelectorAll('[data-alarm-enabled]').forEach(el => el.addEventListener('change', () => {
      const id = el.dataset.alarmEnabled, old = getSubjectSetting(id);
      saveSubjectSetting(id, { ...old, enabled: el.checked });
    }));
    host.querySelectorAll('[data-alarm-lead]').forEach(el => el.addEventListener('change', () => {
      const id = el.dataset.alarmLead, old = getSubjectSetting(id);
      saveSubjectSetting(id, { ...old, lead: Number(el.value) });
    }));
    updatePermissionStatus();
  }

  function updatePermissionStatus() {
    const el = $('alarmPermissionStatus');
    if (!el) return;
    if (!('Notification' in window)) el.textContent = 'This browser does not support notifications. Sound alarms still work while the page is open.';
    else if (Notification.permission === 'granted') el.textContent = 'Notifications enabled on this device. Keep the schedule open for local alarms.';
    else if (Notification.permission === 'denied') el.textContent = 'Notifications are blocked. Enable them in your browser or device settings.';
    else el.textContent = 'Notifications are not enabled yet. Tap “Enable notifications” and allow the permission prompt.';
  }

  async function enableNotifications() {
    if (!('Notification' in window)) { updatePermissionStatus(); return; }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted' && 'serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) await reg.showNotification('Schedule notifications enabled', {
          body: 'You will receive class reminders while this app is active.',
          icon: './index_icon_192.png',
          badge: './index_icon_192.png',
          tag: 'aamt-notification-test'
        });
      }
    } catch (err) { console.warn('Notification permission/setup:', err); }
    updatePermissionStatus();
  }

  function playAlarm() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioContext ||= new Ctx();
      if (audioContext.state === 'suspended') audioContext.resume();
      const start = audioContext.currentTime;
      [0, .42, .84].forEach(offset => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine'; osc.frequency.value = 880;
        gain.gain.setValueAtTime(.0001, start + offset);
        gain.gain.exponentialRampToValueAtTime(.22, start + offset + .025);
        gain.gain.exponentialRampToValueAtTime(.0001, start + offset + .28);
        osc.connect(gain); gain.connect(audioContext.destination);
        osc.start(start + offset); osc.stop(start + offset + .3);
      });
    } catch (err) { console.warn('Alarm sound unavailable:', err); }
  }

  async function notify(title, body, tag) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(title, { body, icon:'./index_icon_192.png', badge:'./index_icon_192.png', tag, renotify:false, data:{url:'./index.html'} });
      } else new Notification(title, { body, tag });
    } catch (err) { console.warn('Could not show notification:', err); }
  }

  function getFired() {
    try { return JSON.parse(localStorage.getItem(firedKey) || '{}'); } catch (_) { return {}; }
  }
  function checkAlarms() {
    if (typeof getEffectiveCourses !== 'function' || typeof currentSem === 'undefined') return;
    const now = new Date();
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const day = dayNames[now.getDay()];
    const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const closures = window._fbDayClosures || [];
    const closed = closures.some(x => {
      if (!x.date) return false;
      if (x.repeat === 'range') return date >= x.date && date <= (x.endDate || x.date);
      if (x.repeat === 'weekly') {
        const start = new Date(`${x.date}T00:00:00`);
        const until = x.repeatUntil || '9999-12-31';
        return date >= x.date && date <= until && now.getDay() === start.getDay();
      }
      return x.date === date;
    });
    if (closed) return;
    const courses = getEffectiveCourses(date);
    const fired = getFired();
    let changed = false;
    courses.forEach(c => {
      if (!c || !c.id || !Array.isArray(c.days) || !c.days.includes(day) || c.startH === 'TBA' || c.startH == null) return;
      const setting = getSubjectSetting(c.id);
      if (!setting.enabled) return;
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(c.startH), Number(c.startM || 0), 0, 0);
      const alarmAt = new Date(start.getTime() - Number(setting.lead || 0) * 60000);
      const diff = now.getTime() - alarmAt.getTime();
      if (diff < 0 || diff > 90000 || start.getTime() <= now.getTime() - 90000) return;
      const slot = c._sessionKey || c.slotId || c.id;
      const key = `${date}|${currentSem}|${slot}|${setting.lead}`;
      if (fired[key]) return;
      fired[key] = Date.now(); changed = true;
      const when = setting.lead ? ` in ${setting.lead} minute${setting.lead===1?'':'s'}` : ' now';
      const title = `${c.id} class${when}`;
      const body = `${c.desc || c.id}${c.room ? ` · ${c.room}` : ''} starts at ${formatTime(c.startH,c.startM)}.`;
      playAlarm();
      notify(title, body, `class-${key}`);
      if (navigator.vibrate) navigator.vibrate([250,100,250]);
    });
    if (changed) {
      const keys = Object.keys(fired);
      if (keys.length > 300) keys.slice(0, keys.length - 200).forEach(k => delete fired[k]);
      localStorage.setItem(firedKey, JSON.stringify(fired));
    }
  }
  function formatTime(h,m) {
    h=Number(h); m=Number(m||0);
    const suffix=h>=12?'PM':'AM', hour=h%12||12;
    return `${hour}:${String(m).padStart(2,'0')} ${suffix}`;
  }

  function openSettings() {
    renderSettings();
    $('alarmOverlay').classList.add('open');
  }
  function closeSettings() { $('alarmOverlay').classList.remove('open'); }

  function init() {
    $('openAlarmSettings')?.addEventListener('click', openSettings);
    $('closeAlarmSettings')?.addEventListener('click', closeSettings);
    $('closeAlarmBottom')?.addEventListener('click', closeSettings);
    $('alarmOverlay')?.addEventListener('click', e => { if (e.target === $('alarmOverlay')) closeSettings(); });
    $('enableAlarmNotifications')?.addEventListener('click', enableNotifications);
    $('testAlarmSound')?.addEventListener('click', playAlarm);
    $('applyDefaultLead')?.addEventListener('click', () => {
      const lead = Number($('defaultAlarmLead').value);
      const { all, key, current } = semesterSettings();
      current.defaults = lead;
      subjectRows().forEach(row => {
        const existing = current.subjects[row.id] || { enabled:true };
        current.subjects[row.id] = { ...existing, lead };
      });
      all[key] = current; saveSettings(all); renderSettings();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSettings(); });
    if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => updatePermissionStatus()).catch(()=>{});
    setInterval(checkAlarms, 5000);
    checkAlarms();
    setInterval(() => {
      if (typeof currentSem !== 'undefined' && currentSem !== lastRenderedSem && $('alarmOverlay')?.classList.contains('open')) {
        lastRenderedSem = currentSem; renderSettings();
      }
    }, 1500);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
