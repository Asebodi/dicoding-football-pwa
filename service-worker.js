const CACHE_NAME = "football-v2";

const urlsToCache = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/push.js",
  "/js/content.js",
  "/js/api.js",
  "/js/db.js",
  "/js/idb.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/style.css.map",
  "/css/materialize.min.css",
  "/assets/header.jpg",
  "/assets/logo.svg",
  "/assets/icon32.png",
  "/assets/icon96.png",
  "/assets/icon192.png",
  "/assets/icon512.png",
  "/assets/svg/burger.svg",
  "/assets/svg/heart-regular.svg",
  "/assets/svg/heart-solid.svg",
  "/assets/svg/trash.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((res) => {
      if (res) {
        return res;
      }

      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/notification.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
