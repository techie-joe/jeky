const BUILD_VERSION = "B26013";
const CACHE_PREFIX = "jeky-";
const CACHE_NAME = CACHE_PREFIX + BUILD_VERSION;
const BUILD_METADATA_URL = new URL("./__meta__/build-version", self.registration.scope);
const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/themes/style.css",
  "./assets/themes/normalization.css",
  "./assets/themes/main-style.css",
  "./assets/themes/dark-style.css",
  "./assets/scripts/main.js",
  "./assets/images/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_FILES).then(() =>
        cache.put(BUILD_METADATA_URL, new Response(BUILD_VERSION, {
          headers: { "Content-Type": "text/plain" }
        }))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ),
    self.clients.claim()
  ]));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).catch(() => {
          if (event.request.mode === "navigate") {
            return cache.match("./index.html");
          }
          return Response.error();
        });
      })
    )
  );
});
