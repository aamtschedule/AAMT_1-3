const CACHE_NAME = "aamt-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./admin.html",

  "./manifest_index.json",
  "./manifest_admin.json",

  "./index-icon-192.png",
  "./index-icon-512.png",
  "./admin-icon-192.png",
  "./admin-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
