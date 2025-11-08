// service-worker.js

const CACHE_NAME = 'teachmate-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/dashboard.html',
  '/images/logo.png'
];

// Install event - caches all the files listed above
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching files...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serves files from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // If file found in cache, use it; otherwise, fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event - removes old caches when you update
self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
        .filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
      );
    })
  );
});
