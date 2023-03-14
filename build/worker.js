let CACHE_NAME = "SherzodPMA";
let filesToCache = ['index.html', 'offline.html'];

self.addEventListener('onstall', (event) => {
    event.waintUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(filesToCache);
        })
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                .catch(() => caches.match('offline.html'))
            })
    )
})