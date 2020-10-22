const CACHE_NAME = "mangan-v2";

const urlsToCache = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/explore.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/js/script.js",
  "/js/materialize.min.js",
  "/css/style.css",
  "/css/style.css.map",
  "/css/materialize.min.css",
  "/assets/about.jpg",
  "/assets/header.jpg",
  "/assets/home.jpg",
  "/assets/logo-black.png",
  "/assets/logo.png",
  "/assets/personal.jpg",
  "/assets/icon32.png",
  "/assets/icon96.png",
  "/assets/icon192.png",
  "/assets/icon512.png",
  "/assets/icon192_maskable.png",
  "/assets/icon512_maskable.png",
  "/assets/explore/1.jpg",
  "/assets/explore/2.jpg",
  "/assets/explore/3.jpg",
  "/assets/explore/4.jpg",
  "/assets/explore/5.jpg",
  "/assets/svg/navbar.svg",
  "/assets/svg/burger.svg",
  "/assets/svg/favorite.svg",
  "/assets/svg/github.svg",
  "/assets/svg/instagram.svg",
  "/assets/svg/web.svg",
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
