const addResourcesToCache = async (resources) => {
  const cache = await caches.open('v3');
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open('v3');
  await cache.put(request, response);
}

const cacheFirst = async ({ request, preloadResponsePromise }) => {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  }

  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  caches.delete('v1');
  caches.delete('v2');
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  skipWaiting();
  event.waitUntil(
    addResourcesToCache([
      './index.html',
      './sounds/button-sound-primary.mp3',
      './sounds/button-sound-secondary.mp3',
      './sounds/cockatieldzillas-main.ogg',
      './favicon-32x32.png',
      './favicon-16x16.png',
      './android-chrome-192x192.png',
      './android-chrome-512x512.png',
      './manifest.json'
    ])
  );
});

self.addEventListener('fetch', function (event) {
  const needCache = !/^chrome\-extension:/g.test(event.request.url)
    && event.request.method === 'GET'
    && !/\/authenticate$/g.test(event.request.url)
    && !/\/api\//g.test(event.request.url)
    && !/(installHook|bundle.*|hot\-update)\.(js|json)/g.test(event.request.url
    )
  event.respondWith(
    needCache ? cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse
    }) : fetch(event.request)
  )
})