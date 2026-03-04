// Python Mastery - Service Worker
const CACHE_NAME = 'python-mastery-v1';
const BASE_PATH = '/python-teaching-app';

// Files to cache for offline use
const ASSETS_TO_CACHE = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/python-course.css`,
    `${BASE_PATH}/quiz.js`,
    `${BASE_PATH}/manifest.json`,
    `${BASE_PATH}/assets/icons/icon-192x192.png`,
    `${BASE_PATH}/assets/icons/icon-512x512.png`,
    `${BASE_PATH}/assets/bus.png`,
    `${BASE_PATH}/assets/grocery.png`,
    `${BASE_PATH}/assets/nameboard.png`,
    `${BASE_PATH}/assets/tea-shop.png`
];

// Dynamically add all 30 lesson pages
for (let i = 1; i <= 30; i++) {
    const num = String(i).padStart(2, '0');
    ASSETS_TO_CACHE.push(`${BASE_PATH}/lessons/lesson-${num}.html`);
}

// Install event - cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app shell...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then((networkResponse) => {
                    // Cache new resources as they're fetched
                    if (event.request.method === 'GET' && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                });
            })
            .catch(() => {
                // Offline fallback - return the main page
                if (event.request.mode === 'navigate') {
                    return caches.match(`${BASE_PATH}/index.html`);
                }
            })
    );
});
