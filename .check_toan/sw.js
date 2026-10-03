self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // A minimal fetch event handler is required to pass the PWA criteria on some browsers.
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});
