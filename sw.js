const CACHE_NAME = 'university-portal-v3';
const ASSETS_TO_CACHE = [
  // Core Pages
  '/',
  '/index.html',
  '/contact.html',
  '/login.html',
  '/service.html',
  '/developer.html',
  '/register.html',
  
  // CSS Files
  '/styles.css',
  
  // JavaScript Files
  '/script.js',
  '/register.js',

  
  // Images
  '/card2.webp',
  '/card1.webp',
  '/s.jpg',
  '/p.jpg',
  '/font.jpg',
  '/graduation.jpg',
  '/download.jpg',
  
  // External Resources
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap',
  
  // Fallback Page
  '/offline.html'
];
// Install Event: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch((err) => console.log('Cache installation failed:', err))
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
// Fetch Event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached asset if found
        if (cachedResponse) {
          return cachedResponse;
        }
        // Fetch from network, then cache the response
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));
            return response;
          })
          .catch(() => {
            // Optional: Serve a fallback offline page
            return caches.match('/offline.html');
          });
      })
  );
});
