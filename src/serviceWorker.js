const CACHE_NAME = 'moon-faces-v1';
const urlsToCache = [
    '/',
    '/app.js',
    '/style.css',
    '/dark.css',
    '/images/sun.png',
    '/images/moon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {


    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // if (response) {
                //     console.log(123);
                //     return response;
                // }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                ).catch(() => {
                    console.log(response);
                    return response;
                });
            })
    );
});
