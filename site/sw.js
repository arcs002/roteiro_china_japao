/*
 * Service worker stale-while-revalidate para o shell e para
 * content/*.html/registry.json: serve do cache local IMEDIATAMENTE (rápido,
 * funciona offline, não gasta dado quando repetido) e, em paralelo, busca
 * uma cópia nova na rede para a PRÓXIMA visita — assim uma republicação do
 * site eventualmente chega a quem já visitou, em vez de ficar presa para
 * sempre na primeira versão baixada (cache-first puro tem esse problema).
 * Nunca bloqueia a 1ª carga: em cache miss, busca na rede normalmente.
 */

const CACHE = 'guia-shell-v1';
const SHELL_FILES = ['./', 'index.html', 'style.css', 'app.js', 'content/registry.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL_FILES).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // só cacheia o próprio site (shell + content/*.html) — imagens remotas já
  // são cuidadas pelo ImgCache (IndexedDB) no app.js, não duplicar aqui.
  if (url.origin !== self.location.origin) return;

  const cacheable = req.url.endsWith('.html') || req.url.endsWith('.json') || req.url.endsWith('.js') || req.url.endsWith('.css');

  const revalidate = caches.open(CACHE).then((cache) =>
    fetch(req)
      .then((resp) => {
        if (resp.ok && cacheable) cache.put(req, resp.clone());
        return resp;
      })
      .catch(() => null)
  );

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // devolve o cache já, atualiza em segundo plano pra próxima visita
        revalidate.catch(() => {});
        return cached;
      }
      return revalidate.then((resp) => resp || new Response('Sem conexão e página ainda não está no cache local.', { status: 503 }));
    })
  );
});
