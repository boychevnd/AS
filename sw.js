/* AS-532AL COUGAR v3.0 — service worker (offline cache) */
const CACHE = 'cougar-v4-en';
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-512-maskable.png", "./apple-touch-icon.png"];
const ECL = ["./ecl/e001.webp", "./ecl/e002.webp", "./ecl/e003.webp", "./ecl/e004.webp", "./ecl/e005.webp", "./ecl/e006.webp", "./ecl/e008.webp", "./ecl/e009.webp", "./ecl/e010.webp", "./ecl/e011.webp", "./ecl/e012.webp", "./ecl/e013.webp", "./ecl/e014.webp", "./ecl/e015.webp", "./ecl/e016.webp", "./ecl/e017.webp", "./ecl/e018.webp", "./ecl/e019.webp", "./ecl/e021.webp", "./ecl/e022.webp", "./ecl/e023.webp", "./ecl/e024.webp", "./ecl/e025.webp", "./ecl/e026.webp", "./ecl/e027.webp", "./ecl/e028.webp", "./ecl/e029.webp", "./ecl/e030.webp", "./ecl/e031.webp", "./ecl/e032.webp", "./ecl/e033.webp", "./ecl/e035.webp", "./ecl/e037.webp", "./ecl/e039.webp", "./ecl/e040.webp", "./ecl/e041.webp", "./ecl/e043.webp", "./ecl/e045.webp", "./ecl/e046.webp", "./ecl/e047.webp", "./ecl/e049.webp", "./ecl/e051.webp", "./ecl/e052.webp", "./ecl/e053.webp", "./ecl/e054.webp", "./ecl/e055.webp", "./ecl/e056.webp", "./ecl/e057.webp", "./ecl/e059.webp", "./ecl/e060.webp", "./ecl/e061.webp", "./ecl/e063.webp", "./ecl/e064.webp", "./ecl/e065.webp", "./ecl/e066.webp", "./ecl/e067.webp", "./ecl/e068.webp", "./ecl/e069.webp", "./ecl/e070.webp", "./ecl/e071.webp", "./ecl/e073.webp", "./ecl/e075.webp", "./ecl/e076.webp", "./ecl/e077.webp", "./ecl/e078.webp", "./ecl/e079.webp", "./ecl/e080.webp", "./ecl/e081.webp", "./ecl/e082.webp", "./ecl/e083.webp", "./ecl/e085.webp", "./ecl/e086.webp", "./ecl/e087.webp", "./ecl/e089.webp", "./ecl/e090.webp", "./ecl/e091.webp", "./ecl/e093.webp", "./ecl/e094.webp", "./ecl/e095.webp", "./ecl/e097.webp", "./ecl/e098.webp", "./ecl/e099.webp", "./ecl/e100.webp", "./ecl/e101.webp", "./ecl/e103.webp", "./ecl/e104.webp", "./ecl/e105.webp", "./ecl/e106.webp", "./ecl/e107.webp", "./ecl/e108.webp", "./ecl/e109.webp", "./ecl/e110.webp", "./ecl/e111.webp", "./ecl/e112.webp", "./ecl/e113.webp", "./ecl/e115.webp", "./ecl/e116.webp", "./ecl/e117.webp", "./ecl/e118.webp", "./ecl/e119.webp", "./ecl/e120.webp", "./ecl/e121.webp", "./ecl/e123.webp", "./ecl/e125.webp", "./ecl/e126.webp", "./ecl/e127.webp", "./ecl/e128.webp", "./ecl/e129.webp", "./ecl/e130.webp", "./ecl/e131.webp", "./ecl/e132.webp", "./ecl/e133.webp", "./ecl/e134.webp", "./ecl/e135.webp", "./ecl/e137.webp", "./ecl/e138.webp", "./ecl/e139.webp", "./ecl/e140.webp", "./ecl/e141.webp", "./ecl/e142.webp", "./ecl/e143.webp", "./ecl/e144.webp", "./ecl/e145.webp", "./ecl/e146.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).then(() =>
    Promise.all(ECL.map(u => c.add(u).catch(() => null))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html')) {
    e.respondWith(fetch(req).then(resp => {
      if (resp && resp.ok) { const copy = resp.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
      return resp;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(cached => cached || fetch(req).then(resp => {
    if (resp && resp.ok) { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return resp;
  })));
});
