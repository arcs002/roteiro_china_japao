#!/usr/bin/env node
'use strict';
/*
 * Orquestrador do build — a única forma correta de gerar o site final.
 * `node build/build.js` lê pesquisa/**.md, valida, renderiza cada página em
 * content/*.html + content/registry.json, e copia o shell (site/) para dist/.
 * Zero dependências fora do Node built-in.
 */

const fs = require('fs');
const path = require('path');

const { parseFrontMatter } = require('./lib/frontmatter');
const { parsePage, escapeHtml } = require('./lib/markdown');
const { renderPage, splitTitle, basePathFor } = require('./render-page');
const { buildRegistry } = require('./build-registry');
const { validate } = require('./validate');

const ROOT = path.resolve(__dirname, '..');
const PESQUISA = path.join(ROOT, 'pesquisa');
const SITE = path.join(ROOT, 'site');
const DIST = path.join(ROOT, 'dist');

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') out.push(full);
  }
  return out;
}

// --- 1. carrega e parseia todas as páginas -------------------------------

const diasDir = path.join(PESQUISA, 'dias');
const mdFiles = [
  ...walk(path.join(PESQUISA, 'cidades')),
  ...walk(path.join(PESQUISA, 'atracoes')),
  ...walk(path.join(PESQUISA, 'aprofundamento')),
  ...(fs.existsSync(diasDir) ? walk(diasDir) : []),
].filter((f) => !f.endsWith('.expandido.md') || true); // .expandido.md são as versões atuais aprovadas

// entre <slug>.md e <slug>.expandido.md, prefere o .expandido (gold standard)
const byBaseSlug = new Map();
for (const f of mdFiles) {
  const base = f.replace(/\.expandido\.md$/, '.md');
  const isExpandido = f !== base;
  const prev = byBaseSlug.get(base);
  if (!prev || (isExpandido && !prev.isExpandido)) byBaseSlug.set(base, { f, isExpandido });
}

const pages = [];
for (const { f } of byBaseSlug.values()) {
  const raw = fs.readFileSync(f, 'utf8');
  const { data: fm, body } = parseFrontMatter(raw);
  const parsed = parsePage(body);
  if (!fm.title && parsed.title) fm.title = parsed.title;
  pages.push({ fm, parsed, relPath: path.relative(ROOT, f) });
}

// --- 2. valida -------------------------------------------------------------

const { errors, warnings } = validate(pages);
warnings.forEach((w) => console.warn('  [warn] ' + w));
if (errors.length) {
  errors.forEach((e) => console.error('  [erro] ' + e));
  console.error(`\nBuild abortado: ${errors.length} erro(s) estrutural(is) acima.`);
  process.exit(1);
}

// --- 3. resolve o basePath/arquivo-índice de cada página -------------------
// Cada página vira uma PASTA: content/<basePath>/index.html (visão geral) +
// content/<basePath>/<secao>.html (uma por módulo) — nunca mais um único
// HTML gigante com tudo concatenado.

for (const p of pages) {
  p.basePath = basePathFor(p.fm);
  p.file = `content/${p.basePath}/index.html`; // arquivo-índice, usado pelo registry
}

const registry = buildRegistry(pages.map((p) => ({ fm: p.fm, file: p.file })));

// --- 4. chave de imagem global (url -> i0, i1, ...), deduplicada ----------

const imgKeys = new Map();
let imgCounter = 0;
function imgKeyFor(url) {
  if (!url) return null;
  if (!imgKeys.has(url)) imgKeys.set(url, 'i' + imgCounter++);
  return imgKeys.get(url);
}

// --- 5. renderiza cada página de conteúdo (índice + 1 arquivo por seção) --

const outFiles = {};
const daySectionFile = {}; // dayNumber -> arquivo da seção "Roteiro hora a hora" real (não um stub)
for (const p of pages) {
  const rendered = renderPage(p.fm, p.parsed, registry, imgKeyFor);
  outFiles[`content/${rendered.basePath}/index.html`] = rendered.index;
  for (const sec of rendered.sections) {
    const file = `content/${rendered.basePath}/${sec.slug}.html`;
    outFiles[file] = sec.html;
    registry.routes[`${rendered.basePath}/${sec.slug}`] = file;
    if (sec.day != null && p.fm.type === 'city') daySectionFile[sec.day] = file;
  }
}

// índice de páginas type:dia — têm prioridade sobre seções de cidade no step 6
const diaPageIndex = {};
for (const p of pages) {
  if (p.fm.type === 'dia' && p.fm.global_day != null) {
    diaPageIndex[p.fm.global_day] = `content/${p.basePath}/index.html`;
  }
}

// --- 6. páginas auto-geradas a partir só do registro (sem .md próprio) ---

function cityCard(slug) {
  const c = registry.cities[slug];
  const key = c.heroImgKey || null;
  return `<a class="mag-card" href="#city/${slug}"><span class="ic">${c.emoji}</span><h3>${c.name}</h3><p>${c.region}${c.days.length ? ' · Dia' + (c.days.length > 1 ? 's ' : ' ') + (c.days.length > 1 ? c.days[0] + '–' + c.days[c.days.length - 1] : c.days[0]) : ''}</p><span class="go">Ver cidade →</span></a>`;
}

function paisCard(slug) {
  return `<a class="mag-card" href="#aprofundamento/pais/${slug}"><span class="ic">🌏</span><h3>${registry.paises[slug].title}</h3><span class="go">Explorar →</span></a>`;
}

function dayCard(day) {
  const c = registry.cities[day.city];
  return `<a class="mag-card" href="#day/${day.n}"><span class="ic">${c ? c.emoji : '📅'}</span><h3>Dia ${day.n}</h3><p>${c ? c.name : ''}</p><span class="go">Ver dia →</span></a>`;
}

outFiles['content/home.html'] = `<article class="mag">
<header class="mag-hero">
  <div class="mag-eyebrow">Guia de Viagem · China + Japão</div>
  <h1>China <em>&amp;</em> Japão</h1>
  <p class="mag-tagline">Um mês de Pequim a Fukuoka — rota da seda, montanhas, arroz e onsen.</p>
</header>
<div class="mag-body">
  <section class="mag-section">
    <div class="mag-eyebrow">O roteiro</div>
    <h2 class="mag-title">As cidades</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${registry.cityOrder.map(cityCard).join('\n')}
    </div>
  </section>
  <section class="mag-section tint">
    <div class="mag-eyebrow">Dia a dia</div>
    <h2 class="mag-title">Os dias</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${registry.days.map(dayCard).join('\n')}
    </div>
  </section>
  <section class="mag-section">
    <div class="mag-eyebrow">Aprofundamento</div>
    <h2 class="mag-title">Países e regiões visitadas</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${Object.keys(registry.paises).map(paisCard).join('\n')}
    </div>
  </section>
  <footer class="mag-footer"><span class="big">China + Japão</span>Guia de Viagem</footer>
</div>
</article>`;

for (const day of registry.days) {
  const c = registry.cities[day.city];
  if (diaPageIndex[day.n]) {
    // Página type:dia independente — tem prioridade máxima sobre seção de cidade.
    registry.routes[`day/${day.n}`] = diaPageIndex[day.n];
    continue;
  }
  const realFile = daySectionFile[day.n];
  if (realFile) {
    // Aponta a rota #day/N direto pro arquivo real da seção "Roteiro hora a
    // hora" dentro da cidade — o dia MOSTRA o roteiro, não um resumo/stub.
    registry.routes[`day/${day.n}`] = realFile;
    continue;
  }
  // Fallback: cidade sem seção de roteiro reconhecível pra este dia ainda
  // (conteúdo não segue a convenção "Roteiro hora a hora" / "Dia N").
  outFiles[`content/day/${day.n}.html`] = `<article class="mag">
<nav class="mag-crumbs"><a href="#home" class="home">◆ Roteiro</a><span class="sep">/</span><span class="here">Dia ${day.n}</span></nav>
<header class="mag-hero">
  <div class="mag-eyebrow">Dia ${day.n} do roteiro</div>
  <h1>${c ? c.emoji + ' ' : ''}${c ? c.name : ''}</h1>
  <p class="mag-tagline">O roteiro hora a hora deste dia ainda não está identificado como seção própria — veja o guia completo da cidade.</p>
</header>
<div class="mag-body">
  <section class="mag-section">
    <div class="mag-cards">
      <a class="mag-card" href="#city/${day.city}"><span class="ic">${c ? c.emoji : ''}</span><h3>${c ? c.name : ''}</h3><p>Ver o guia completo da cidade, incluindo este dia.</p><span class="go">Ver cidade →</span></a>
    </div>
  </section>
  <footer class="mag-footer"><a href="#home">← Voltar ao roteiro completo</a></footer>
</div>
</article>`;
}

function topicShelf(kind, slug, topics) {
  if (!topics || !topics.length) return '';
  return `<section class="mag-section tint">
    <div class="mag-eyebrow">Tópicos</div>
    <h2 class="mag-title">Aprofunde</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${topics.sort((a, b) => a.order - b.order).map((t) => `      <a class="mag-card" href="#aprofundamento/${kind}/${slug}/${t.topico}"><h3>${t.title}</h3><span class="go">Ler →</span></a>`).join('\n')}
    </div>
  </section>`;
}

// Interlinkagem de volta pra Cidade: toda página de país/província lista as
// cidades do roteiro que pertencem a ela — sem isso, Aprofundamento fica uma
// via de mão única (só cidade linkando pra lá, nunca o inverso).
function citiesShelf(filterFn) {
  const slugs = registry.cityOrder.filter(filterFn);
  if (!slugs.length) return '';
  return `<section class="mag-section">
    <div class="mag-eyebrow">No roteiro</div>
    <h2 class="mag-title">Cidades visitadas</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${slugs.map(cityCard).join('\n')}
    </div>
  </section>`;
}

for (const [slug, pais] of Object.entries(registry.paises)) {
  if (outFiles[`content/aprofundamento/pais/${slug}/index.html`]) continue; // já tem _index.md próprio
  registry.routes[`aprofundamento/pais/${slug}`] = `content/aprofundamento/pais/${slug}/index.html`;
  const provinciasShelf = (pais.provincias || []).length
    ? `<section class="mag-section tint">
    <div class="mag-eyebrow">Províncias visitadas</div>
    <h2 class="mag-title">Regiões deste país no roteiro</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${pais.provincias.map((ps) => `      <a class="mag-card" href="#aprofundamento/provincia/${ps}"><h3>${registry.provincias[ps].title}</h3><span class="go">Explorar →</span></a>`).join('\n')}
    </div>
  </section>`
    : '';
  outFiles[`content/aprofundamento/pais/${slug}/index.html`] = `<article class="mag">
<nav class="mag-crumbs"><a href="#home" class="home">◆ Roteiro</a><span class="sep">/</span><a href="#aprofundamento">Aprofundamento</a><span class="sep">/</span><span class="here">${pais.title}</span></nav>
<header class="mag-hero">
  <div class="mag-eyebrow">Aprofundamento</div>
  <h1>${pais.title}</h1>
</header>
<div class="mag-body">
${topicShelf('pais', slug, pais.topics)}
${provinciasShelf}
${citiesShelf((s) => registry.cities[s].pais === slug)}
  <footer class="mag-footer"><a href="#home">← Voltar ao roteiro completo</a></footer>
</div>
</article>`;
}

for (const [slug, prov] of Object.entries(registry.provincias)) {
  if (outFiles[`content/aprofundamento/provincia/${slug}/index.html`]) continue;
  registry.routes[`aprofundamento/provincia/${slug}`] = `content/aprofundamento/provincia/${slug}/index.html`;
  outFiles[`content/aprofundamento/provincia/${slug}/index.html`] = `<article class="mag">
<nav class="mag-crumbs"><a href="#home" class="home">◆ Roteiro</a><span class="sep">/</span><a href="#aprofundamento">Aprofundamento</a>${prov.pais && registry.paises[prov.pais] ? `<span class="sep">/</span><a href="#aprofundamento/pais/${prov.pais}">${registry.paises[prov.pais].title}</a>` : ''}<span class="sep">/</span><span class="here">${prov.title}</span></nav>
<header class="mag-hero">
  <div class="mag-eyebrow">Aprofundamento · Província</div>
  <h1>${prov.title}</h1>
</header>
<div class="mag-body">
${topicShelf('provincia', slug, prov.topics)}
${citiesShelf((s) => registry.cities[s].provincia === slug)}
  <footer class="mag-footer"><a href="#home">← Voltar ao roteiro completo</a></footer>
</div>
</article>`;
}

outFiles['content/aprofundamento.html'] = outFiles['content/aprofundamento.html'] || `<article class="mag">
<nav class="mag-crumbs"><a href="#home" class="home">◆ Roteiro</a><span class="sep">/</span><span class="here">Aprofundamento</span></nav>
<header class="mag-hero"><div class="mag-eyebrow">Aprofundamento</div><h1>Países &amp; Regiões</h1></header>
<div class="mag-body">
  <section class="mag-section">
    <div class="mag-cards">
${Object.keys(registry.paises).map(paisCard).join('\n')}
    </div>
  </section>
  <footer class="mag-footer"><a href="#home">← Voltar ao roteiro completo</a></footer>
</div>
</article>`;
registry.routes['aprofundamento'] = 'content/aprofundamento.html';

// --- 7. grava dist/ ---------------------------------------------------------

function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function cpDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) cpDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

rmrf(DIST);
cpDir(SITE, DIST);

// imgKeys é Map(url -> chave "iN"); registry.images precisa do inverso
// (chave -> url), que é como site/app.js faz REG.images[key] pra hidratar.
registry.images = Object.fromEntries([...imgKeys].map(([url, key]) => [key, url]));
fs.mkdirSync(path.join(DIST, 'content'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'content', 'registry.json'), JSON.stringify(registry, null, 2));

for (const [rel, html] of Object.entries(outFiles)) {
  const full = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
}

console.log(`\nBuild ok: ${pages.length} página(s) de conteúdo, ${Object.keys(outFiles).length} arquivo(s) gerado(s) em dist/, ${imgKeys.size} imagem(ns) únicas.`);
