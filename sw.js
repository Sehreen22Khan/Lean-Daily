/* Lean Daily service worker.
   Pages always come from the network when online (so updates show up), with a saved copy for offline use.
   Icons, fonts and the manifest are served from the saved copy and refreshed in the background. */
const CACHE = "lean-daily-v1";
const CORE = ["./", "./manifest.webmanifest", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("lean-daily") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The app page: network first, saved copy when offline.
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok && url.origin === self.location.origin) {
          const copy = res.clone();
          e.waitUntil(caches.open(CACHE).then(c => c.put("./", copy)));
        }
        return res;
      } catch (err) {
        const c = await caches.open(CACHE);
        return (await c.match("./")) || (await c.match(req)) || Response.error();
      }
    })());
    return;
  }

  // Requests that ask for a fresh copy (like the app's update check) skip the saved copy.
  if (req.cache === "no-store" || req.cache === "no-cache" || req.cache === "reload") return;

  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== self.location.origin && !fonts) return;

  const cacheP = caches.open(CACHE);
  const netP = fetch(req).then(async res => {
    if (res && (res.ok || res.type === "opaque")) {
      const copy = res.clone();
      await (await cacheP).put(req, copy);
    }
    return res;
  }).catch(() => null);
  e.waitUntil(netP);
  e.respondWith(cacheP.then(c => c.match(req)).then(hit => hit || netP.then(r => r || Response.error())));
});
