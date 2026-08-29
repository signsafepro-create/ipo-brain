// 30-Year Long-Term Cache & Offline Resilience Service Worker
const CACHE_NAME = 'hyper-cache-v30';
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const networked = fetch(e.request)
        .then((res) => {
          const cacheCopy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, cacheCopy));
          return res;
        })
        .catch(() => cached || new Response('Offline Hyper-Resilience Active', { status: 200 }));
      return cached || networked;
    })
  );
});
