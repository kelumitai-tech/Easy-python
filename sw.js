// මෙතන අගට තියෙන Number එක (v2) හැම Update එකකදිම වෙනස් කරන්න (v3, v4 ලෙස)
const CACHE_NAME = 'python-guide-v3'; 
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // අලුත් Service Worker එක ඉක්මනින් ක්‍රියාත්මක වීමට
});

// Activate Event (මෙයින් තමයි පරණ Cache එක Delete කරන්නේ)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // සියලුම Tabs වලට බලපෑමට
});

// Fetch Event (Network First, then Cache) - මෙය Update වීම වඩාත් පහසු කරයි
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
