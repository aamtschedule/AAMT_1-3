/* Offline support for index.html + admin.html.
   Pages, icons, fonts and the Firebase SDK are cached so the site opens with no internet. */
const CACHE_NAME = "aamt-v22";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./admin.html",
  "./schedule-data.js",
  "./alarm.js",
  "./service_worker.js",

  "./manifest_index.json",
  "./manifest_admin.json",

  "./vendor/bootstrap.min.css",
  "./vendor/bootstrap.bundle.min.js",
  "./vendor/bootstrap-icons.min.css",
  "./vendor/fonts/bootstrap-icons.woff2",
  "./vendor/fonts/bootstrap-icons.woff",
  "./index_icon_192.png",
  "./index_icon_512.png",

  "./new_main_icon-RAW.png",
  "./new_admin_icon-RAW.png",
  "./index_icon_192.png",
  "./index_icon_512.png",
  "./admin_icon_192.png",
  "./admin_icon_512.png"
];

self.addEventListener("install", event => {
  // Cache each file separately so one missing file can't break the whole install
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(FILES_TO_CACHE.map(u => cache.add(u).catch(() => { }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== "GET" || !url.protocol.startsWith("http")) return;

  // Firestore / Auth / Storage talk to the network directly (Firestore keeps its own offline cache)
  if (/firestore\.googleapis\.com|firebasestorage|identitytoolkit|securetoken|firebaseinstallations/.test(url.host)) return;

  // Pages: network first (3s), fall back to the cached copy when offline
  if (req.mode === "navigate") {
    event.respondWith(
      Promise.race([fetch(req), new Promise((_, rej) => setTimeout(rej, 3000))])
        .then(res => { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Everything else: serve the cached copy instantly, refresh it in the background
  event.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});

/* Web Push support: a push service can deliver class reminders while the PWA is closed.
   A server must send the push; the service worker cannot create future alarms by itself. */
self.addEventListener("push", event => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; }
  catch (_) { payload = { body: event.data ? event.data.text() : "You have a schedule reminder." }; }
  const title = payload.title || "Schedule reminder";
  const options = {
    body: payload.body || "You have an upcoming class.",
    icon: payload.icon || "./index_icon_192.png",
    badge: payload.badge || "./index_icon_192.png",
    tag: payload.tag || "aamt-schedule-push",
    renotify: false,
    data: { url: payload.url || "./index.html" }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "./index.html", self.location.origin).href;
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const client of list) {
      if (client.url === target && "focus" in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow(target);
  }));
});
