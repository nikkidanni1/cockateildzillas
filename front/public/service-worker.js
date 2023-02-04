const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
  };
  
  // const putInCache = async (request, response) => {
  //   const cache = await caches.open('v1');
  //   await cache.put(request, response);
  // };
  
  // const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  //   const responseFromCache = await caches.match(request);
  //   if (responseFromCache) {
  //     return responseFromCache;
  //   }
  
  //   const preloadResponse = await preloadResponsePromise;
  //   if (preloadResponse) {
  //     console.info('using preload response', preloadResponse);
  //     putInCache(request, preloadResponse.clone());
  //     return preloadResponse;
  //   }
  
  //   try {
  //     const responseFromNetwork = await fetch(request);
  //     putInCache(request, responseFromNetwork.clone());
  //     return responseFromNetwork;
  //   } catch (error) {
  //     const fallbackResponse = await caches.match(fallbackUrl);
  //     if (fallbackResponse) {
  //       return fallbackResponse;
  //     }

  //     return new Response('Network error happened', {
  //       status: 408,
  //       headers: { 'Content-Type': 'text/plain' },
  //     });
  //   }
  // };
  
  const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  };
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload());
  });
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      addResourcesToCache([
        './index.html',
        './sounds/button-sound-primary.mp3',
        './sounds/button-sound-secondary.mp3',
        './sounds/cockatieldzillas-main.mp3',
        './favicon-32x32.png',
        './favicon-16x16.png',
        './android-chrome-192x192.png',
        './android-chrome-512x512.png',
        './manifest.json'
      ])
    );
  });
  
  self.addEventListener('fetch', function(event) {
    console.log(event)
  //   event.respondWith(
  //     cacheFirst({
  //       request: event.request,
  //       preloadResponsePromise: event.preloadResponse,
  //       fallbackUrl: './gallery/myLittleVader.jpg',
  //     })
  //   );
  })