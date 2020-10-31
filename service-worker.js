importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

const urlsToCache = [
  { url: "/", revision: "1" },
  { url: "/favicon.ico", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/push.js", revision: "1" },
  { url: "/js/content.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/css/style.css.map", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/assets/header.jpg", revision: "1" },
  { url: "/assets/logo.svg", revision: "1" },
  { url: "/assets/icon32.png", revision: "1" },
  { url: "/assets/icon96.png", revision: "1" },
  { url: "/assets/icon192.png", revision: "1" },
  { url: "/assets/icon512.png", revision: "1" },
  { url: "/assets/svg/burger.svg", revision: "1" },
  { url: "/assets/svg/heart-regular.svg", revision: "1" },
  { url: "/assets/svg/heart-solid.svg", revision: "1" },
  { url: "/assets/svg/trash.svg", revision: "1" },
];

if (workbox) {
  console.log(`Workbox berhasil dimuat`);

  workbox.precaching.precacheAndRoute(urlsToCache);

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "api-response",
    })
  );
} else console.log(`Workbox gagal dimuat`);

self.addEventListener("push", (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message with no payload";
  }
  const options = {
    body: body,
    icon: "assets/icon192.png",
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
