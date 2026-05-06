const CACHE_NAME = 'guia-dcv-slz-v9-final';
const ASSETS = [
 './','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
 './apple-touch-icon.png','./favicon.png','./prefeitura_semus.png',
 './logo_covep.png','./barra_prefeitura.png','./ciclo_aedes.png','./ciclo_anopheles_padrao.png','./ciclo_culex_padrao.png','./ciclo_barbeiro_padrao.png','./ciclo_mosquito_palha_padrao.png','./ciclo_maruim_padrao.png','./ciclo_aedes_padrao.png','./ciclo_culex.png','./ciclo_anopheles.png','./culex_anopheles.png','./caramujo_comparativo.png','./ciclo_barbeiro.png'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
