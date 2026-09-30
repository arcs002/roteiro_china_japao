/*
 * Runtime da SPA — portado do guia.html de referência (guia irmão EUA/Canadá).
 * A diferença central: ROUTES/GUIDE/DAY_INFO/CITY_INFO/IMGS não são mais
 * literais neste arquivo — vêm de content/registry.json, gerado pelo build
 * a partir de pesquisa/**.md. O mecanismo de router, cache de imagem
 * (IndexedDB) e "related rail" é o mesmo, só troca de onde os dados vêm.
 */

let REG = null; // registry.json carregado no boot

// --- Local image cache (IndexedDB) ---
// Cada imagem remota é baixada uma vez e guardada como Blob, então visitas
// seguintes servem do disco sem uso de rede — essencial para roaming.
const ImgCache = {
  _db: null,
  _open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open('guia-img-cache', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('imgs');
        req.onsuccess = () => { this._db = req.result; resolve(this._db); };
        req.onerror = () => resolve(null);
      } catch (e) { resolve(null); }
    });
  },
  async get(key) {
    const db = await this._open();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const r = db.transaction('imgs', 'readonly').objectStore('imgs').get(key);
        r.onsuccess = () => resolve(r.result || null);
        r.onerror = () => resolve(null);
      } catch (e) { resolve(null); }
    });
  },
  async put(key, blob) {
    const db = await this._open();
    if (!db) return;
    try { db.transaction('imgs', 'readwrite').objectStore('imgs').put(blob, key); } catch (e) {}
  },
};

async function loadImg(img, key, url) {
  try {
    const cached = await Promise.race([
      ImgCache.get(key),
      new Promise((r) => setTimeout(() => r(null), 1200)),
    ]);
    if (cached) { img.src = URL.createObjectURL(cached); return; }
  } catch (e) {}

  img.src = url;

  try {
    const resp = await fetch(url, { mode: 'cors', cache: 'force-cache' });
    if (resp.ok) ImgCache.put(key, await resp.blob());
  } catch (e) {}
}

function hydrateImgs(root) {
  root.querySelectorAll('img[data-img-key]').forEach((img) => {
    const key = img.getAttribute('data-img-key');
    const url = REG.images[key];
    img.removeAttribute('data-img-key');
    if (url) loadImg(img, key, url);
  });
}

// --- Cross-link rails: cidade ↔ dia ↔ atração ↔ aprofundamento ---

function _dayRange(days) { return days.length > 1 ? days[0] + '–' + days[days.length - 1] : '' + days[0]; }
function _thumb(imgKey) { return imgKey ? `<img data-img-key="${imgKey}" alt="">` : ''; }

function _relCardCity(slug) {
  const c = REG.cities[slug];
  if (!c) return '';
  return `<a class="mag-relcard" href="#city/${slug}"><div class="thumb">${_thumb(c.img)}</div>`
    + `<div class="meta"><div class="kind">Cidade${c.days.length ? ' · Dias ' + _dayRange(c.days) : ''}</div>`
    + `<div class="nm">${c.emoji} ${c.name}</div><div class="sub">${c.region}</div></div></a>`;
}
function _relCardAttr(slug) {
  const a = REG.attractions[slug];
  if (!a) return '';
  const hasPage = !!REG.routes['atracao/' + slug];
  const cityName = a.city && REG.cities[a.city] ? REG.cities[a.city].name : '';
  return `<a class="mag-relcard" href="${hasPage ? '#atracao/' + slug : '#city/' + a.city}"><div class="thumb">${_thumb(a.img)}</div>`
    + `<div class="meta"><div class="kind">Atração${cityName ? ' · ' + cityName : ''}</div>`
    + `<div class="nm">${a.emoji} ${a.name}</div><div class="sub">${hasPage ? 'Ver guia completo →' : 'Ver na cidade →'}</div></div></a>`;
}
function _relChipDay(n) {
  return `<a class="mag-relchip" href="#day/${n}">Dia ${n}</a>`;
}
function _relChipDeepdive(kind, slug, title) {
  return `<a class="mag-relchip" href="#aprofundamento/${kind}/${slug}">${title}</a>`;
}
function _grp(label, inner) { return `<div class="grp"><div class="mag-eyebrow">${label}</div>${inner}</div>`; }
function _dayCity(n) {
  const found = REG.days.find((d) => d.n === +n);
  return found ? found.city : null;
}

function buildRelated(kind, id) {
  let h = '';
  if (kind === 'city') {
    const c = REG.cities[id];
    if (!c) return h;
    if (c.days.length) h += _grp('No roteiro', `<div class="mag-relchips">${c.days.map(_relChipDay).join('')}</div>`);
    const attrs = Object.keys(REG.attractions).filter((s) => REG.attractions[s].city === id);
    if (attrs.length) h += _grp('Atrações em ' + c.name, `<div class="mag-rail">${attrs.map(_relCardAttr).join('')}</div>`);
    const deepLinks = [];
    if (c.pais && REG.paises[c.pais]) deepLinks.push(_relChipDeepdive('pais', c.pais, REG.paises[c.pais].title));
    if (c.provincia && REG.provincias[c.provincia]) deepLinks.push(_relChipDeepdive('provincia', c.provincia, REG.provincias[c.provincia].title));
    if (deepLinks.length) h += _grp('Contexto histórico', `<div class="mag-relchips">${deepLinks.join('')}</div>`);
  } else if (kind === 'day') {
    const cs = _dayCity(id);
    if (cs) h += _grp('A cidade do dia', `<div class="mag-rail">${_relCardCity(cs)}</div>`);
  } else if (kind === 'attraction') {
    const a = REG.attractions[id];
    if (a) {
      if (a.city) h += _grp('Onde fica', `<div class="mag-rail">${_relCardCity(a.city)}</div>`);
      if (a.days.length) h += _grp('Quando você visita', `<div class="mag-relchips">${a.days.map(_relChipDay).join('')}</div>`);
      const others = Object.keys(REG.attractions).filter((s) => REG.attractions[s].city === a.city && s !== id);
      if (others.length && a.city) h += _grp('Mais em ' + (REG.cities[a.city] ? REG.cities[a.city].name : ''), `<div class="mag-rail">${others.map(_relCardAttr).join('')}</div>`);
      const cityCtx = a.city ? REG.cities[a.city] : null;
      const deepLinks = [];
      if (cityCtx && cityCtx.pais && REG.paises[cityCtx.pais]) deepLinks.push(_relChipDeepdive('pais', cityCtx.pais, REG.paises[cityCtx.pais].title));
      if (cityCtx && cityCtx.provincia && REG.provincias[cityCtx.provincia]) deepLinks.push(_relChipDeepdive('provincia', cityCtx.provincia, REG.provincias[cityCtx.provincia].title));
      if (deepLinks.length) h += _grp('Contexto histórico', `<div class="mag-relchips">${deepLinks.join('')}</div>`);
    }
  }
  return h;
}

// --- Router ---

const app = {
  go(path) {
    const h = (path || '').replace(/^#/, '');
    history.pushState(null, '', '#' + h);
    this._render(h);
  },

  async _render(path) {
    path = (path || '').replace(/^#/, '');
    const container = document.getElementById('spa-app');
    if (!container || !REG) return;

    const bar = document.getElementById('spa-loading');
    if (bar) { bar.classList.add('show'); setTimeout(() => bar.classList.remove('show'), 350); }

    const file = REG.routes[path] || REG.routes.home;
    let html;
    try {
      const resp = await fetch(file, { cache: 'no-cache' });
      html = resp.ok ? await resp.text() : '<p style="padding:40px;">Página não encontrada.</p>';
    } catch (e) {
      html = '<p style="padding:40px;">Sem conexão e página ainda não está no cache local.</p>';
    }

    container.innerHTML = html;
    hydrateImgs(container);
    container.querySelectorAll('[data-rel-kind]').forEach((mount) => {
      mount.classList.add('mag-related');
      mount.innerHTML = buildRelated(mount.getAttribute('data-rel-kind'), mount.getAttribute('data-rel-id'));
      hydrateImgs(mount);
    });

    window.scrollTo(0, 0);
    this._closePicker();
  },

  _openDayPicker() {
    const panel = document.getElementById('spa-picker-panel');
    panel.innerHTML = '<div class="picker-title">Escolha o dia</div>' +
      REG.days.map((d) => {
        const c = REG.cities[d.city];
        return `<a class="picker-item" href="#day/${d.n}" onclick="event.preventDefault();app.go('day/${d.n}');">
          ${c ? c.emoji : ''} Dia ${d.n} — ${c ? c.name : ''}
        </a>`;
      }).join('');
    document.getElementById('spa-picker').classList.add('open');
  },

  _openCityPicker() {
    const panel = document.getElementById('spa-picker-panel');
    panel.innerHTML = '<div class="picker-title">Escolha a cidade</div>' +
      REG.cityOrder.map((slug) => {
        const c = REG.cities[slug];
        return `<a class="picker-item" href="#city/${slug}" onclick="event.preventDefault();app.go('city/${slug}');">
          ${c.emoji} ${c.name}
          <span class="pi-sub">${c.days.length ? 'Dias ' + _dayRange(c.days) : ''}</span>
        </a>`;
      }).join('');
    document.getElementById('spa-picker').classList.add('open');
  },

  _closePicker() {
    document.getElementById('spa-picker').classList.remove('open');
  },
};

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href) return;
  if (href === '#home' || href === '#') { e.preventDefault(); app.go('home'); return; }
  if (href.startsWith('#') && href.includes('/')) { e.preventDefault(); app.go(href.slice(1)); }
});

// popstate cobre voltar/avançar do navegador; hashchange cobre navegação
// direta pela barra de endereço, link externo ou favorito com #hash —
// sem os dois, abrir uma URL com hash direto na barra não renderiza nada.
window.addEventListener('popstate', () => {
  app._render((location.hash || '').replace(/^#/, ''));
});
window.addEventListener('hashchange', () => {
  app._render((location.hash || '').replace(/^#/, ''));
});

async function boot() {
  try {
    const resp = await fetch('content/registry.json', { cache: 'no-cache' });
    REG = await resp.json();
  } catch (e) {
    document.getElementById('spa-app').innerHTML = '<p style="padding:40px;">Não foi possível carregar o guia (sem conexão e nada em cache ainda).</p>';
    return;
  }
  app._render((location.hash || '').replace(/^#/, '') || 'home');
}

window.addEventListener('DOMContentLoaded', boot);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
