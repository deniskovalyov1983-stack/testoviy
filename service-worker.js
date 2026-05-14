const CACHE_NAME = 'app-v1';

const ASSETS = [
  './',
  './index.html',
  './bg.png',
  './card_front.png',
  './card_back.png',
  './services.png',
  './jobs.png',
  './menu.png',
  './document.png',
  './onovyty_frame.png',
  './menu-plus.png',
  './icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});