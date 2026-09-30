'use strict';
/*
 * Monta os fragmentos HTML de UMA página a partir do front matter + módulos
 * já parseados. Cada página vira um pequeno conjunto de arquivos, não um
 * único HTML gigante:
 *   - um índice (hero + grade de seções) na rota "base" (ex.: city/xian)
 *   - um arquivo por seção/módulo (ex.: city/xian/retrato-geral), com
 *     navegação anterior/próxima seção já cravada no HTML — nada disso
 *     precisa de lógica no cliente, é tudo decidido em build time.
 */

const { renderModule } = require('./render-modules');
const { escapeHtml, renderInline } = require('./lib/markdown');

function splitTitle(title) {
  const m = title.split(/\s+—\s+/);
  if (m.length >= 2) return { name: m[0], tagline: m.slice(1).join(' — ') };
  return { name: title, tagline: '' };
}

function capitalize(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function stripAccents(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function slugify(s, maxLen = 40) {
  let out = stripAccents(s)
    .toLowerCase()
    .replace(/\[.*?\]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (out.length > maxLen) out = out.slice(0, maxLen).replace(/-+$/g, '');
  return out || 'secao';
}

// Slug estável por seção: "Roteiro hora a hora — Dia 2 (...)" -> "dia-2" (link
// direto e reaproveitável pela página de Dia); qualquer outro cabeçalho vira
// slugify() do próprio texto, com desambiguação por índice em caso de colisão.
function sectionSlug(header, usedSlugs) {
  const dayMatch = header.match(/dia\s*(\d+)/i);
  let base = dayMatch ? `dia-${dayMatch[1]}` : slugify(header);
  let slug = base;
  let n = 2;
  while (usedSlugs.has(slug)) { slug = `${base}-${n}`; n++; }
  usedSlugs.add(slug);
  return slug;
}

// basePath da página, sem barra final — usado tanto pra nome de arquivo
// quanto pra rota (#city/xian, #aprofundamento/pais/china/historia, ...).
function basePathFor(fm) {
  if (fm.type === 'city') return `city/${fm.slug}`;
  if (fm.type === 'atracao') return `atracao/${fm.slug}`;
  if (fm.type === 'dia') return `day/${fm.global_day}`;
  if (fm.type === 'pais') return fm.topico ? `aprofundamento/pais/${fm.slug}/${fm.topico}` : `aprofundamento/pais/${fm.slug}`;
  if (fm.type === 'provincia') return fm.topico ? `aprofundamento/provincia/${fm.slug}/${fm.topico}` : `aprofundamento/provincia/${fm.slug}`;
  return `${fm.type}/${fm.slug}`;
}

function teaser(content, maxLen = 150) {
  const firstPara = content.split(/\r?\n\r?\n+/).map((p) => p.trim()).filter(Boolean)[0] || '';
  const plain = firstPara
    .replace(/\[VERIFICAR:[^\]]*\]/g, '')
    .replace(/\[(CONFIRMADO|PROVÁVEL|NÃO CONFIRMADO)\]/g, '')
    .replace(/[*`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\r?\n/g, ' ')
    .trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, plain.lastIndexOf(' ', maxLen)) + '…';
}

function crumbsHtml(fm, registry, sectionTitle) {
  const items = [['#home', '◆ Roteiro']];
  const base = `#${basePathFor(fm)}`;
  if (fm.type === 'city') {
    if (fm.pais) items.push([`#aprofundamento/pais/${fm.pais}`, registry.paises[fm.pais]?.title || fm.pais]);
    items.push([sectionTitle ? base : null, fm.title ? splitTitle(fm.title).name : fm.slug]);
  } else if (fm.type === 'dia') {
    if (fm.city) items.push([`#city/${fm.city}`, registry.cities[fm.city]?.name || fm.city]);
    items.push([sectionTitle ? base : null, `Dia ${fm.global_day}`]);
  } else if (fm.type === 'atracao') {
    if (fm.city) items.push([`#city/${fm.city}`, registry.cities[fm.city]?.name || fm.city]);
    items.push([sectionTitle ? base : null, fm.title ? splitTitle(fm.title).name : fm.slug]);
  } else if (fm.type === 'pais') {
    items.push(['#aprofundamento', 'Aprofundamento']);
    if (fm.topico) items.push([sectionTitle ? base : null, registry.paises[fm.slug]?.title || capitalize(fm.slug)]);
    else items.push([null, registry.paises[fm.slug]?.title || capitalize(fm.slug)]);
  } else if (fm.type === 'provincia') {
    items.push(['#aprofundamento', 'Aprofundamento']);
    if (fm.topico) items.push([sectionTitle ? base : null, registry.provincias[fm.slug]?.title || capitalize(fm.slug)]);
    else items.push([null, registry.provincias[fm.slug]?.title || capitalize(fm.slug)]);
  }
  if (sectionTitle) items.push([null, sectionTitle]);
  return `<nav class="mag-crumbs">\n${items
    .map(([href, label], i) => {
      const isLast = i === items.length - 1;
      const sep = i > 0 ? '<span class="sep">/</span>' : '';
      const cls = i === 0 ? ' class="home"' : isLast ? ' class="here"' : '';
      return href && !isLast
        ? `${sep}<a href="${href}"${cls}>${label}</a>`
        : `${sep}<span${cls}>${label}</span>`;
    })
    .join('\n')}\n</nav>`;
}

function heroHtml(fm, heroImgKey) {
  const { name, tagline } = splitTitle(fm.title || fm.slug);
  const metas = [];
  if (fm.days && fm.days.length) {
    metas.push(`<div class="m"><b>${fm.days.length > 1 ? fm.days[0] + '–' + fm.days[fm.days.length - 1] : fm.days[0]}</b><span>Dia${fm.days.length > 1 ? 's' : ''} do roteiro</span></div>`);
  }
  if (fm.region) metas.push(`<div class="m"><b>${escapeHtml(fm.region)}</b><span>Região</span></div>`);
  const eyebrowBits = [fm.region, fm.days && fm.days.length ? `Dia${fm.days.length > 1 ? 's' : ''} ${fm.days.join(', ')}` : null].filter(Boolean);
  return `<header class="mag-hero">
  ${heroImgKey ? `<img class="mag-hero-img" data-img-key="${heroImgKey}" alt="${escapeHtml(name)}">` : ''}
  ${eyebrowBits.length ? `<div class="mag-eyebrow">${eyebrowBits.map(escapeHtml).join(' · ')}</div>` : ''}
  <h1>${fm.emoji ? fm.emoji + ' ' : ''}${escapeHtml(name)}</h1>
  ${tagline ? `<p class="mag-tagline">${escapeHtml(tagline)}</p>` : ''}
  ${metas.length ? `<div class="mag-hero-meta">${metas.join('')}</div>` : ''}
</header>`;
}

function footerHtml(fm, backLabel, backHref) {
  const { name } = splitTitle(fm.title || fm.slug);
  return `<footer class="mag-footer">
  <span class="big">${escapeHtml(name)}</span>
  <a href="${backHref || '#home'}">${backLabel || '← Voltar ao roteiro completo'}</a>
</footer>`;
}

// Índice da página: hero + grade "sumário" com 1 card por seção (título +
// teaser), sem o corpo de prosa — é o que resolve a página-linguição.
function renderIndex(fm, registry, heroImgKey, sections, relMount) {
  const base = basePathFor(fm);
  const cards = sections
    .map((s, i) => `      <a class="mag-card" href="#${base}/${s.slug}"><span class="ic">${String(i + 1).padStart(2, '0')}</span><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.teaser)}</p><span class="go">Ler →</span></a>`)
    .join('\n');
  return `<article class="mag"${fm.theme ? ` data-theme="${fm.theme}"` : ''}>
${crumbsHtml(fm, registry, null)}
${heroHtml(fm, heroImgKey)}
<div class="mag-body">
  <section class="mag-section">
    <div class="mag-eyebrow">Neste guia</div>
    <h2 class="mag-title">Seções</h2>
    <div class="mag-rule"></div>
    <div class="mag-cards">
${cards}
    </div>
  </section>
  ${relMount}
  ${footerHtml(fm)}
</div>
</article>`;
}

function renderSection(fm, registry, section, idx, all, relMount) {
  const base = basePathFor(fm);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const nav = `<nav class="mag-daynav">
    ${prev ? `<a href="#${base}/${prev.slug}"><span class="dir">← Anterior</span><span class="lbl">${escapeHtml(prev.title)}</span></a>` : `<a href="#${base}"><span class="dir">← Voltar</span><span class="lbl">Visão geral</span></a>`}
    ${next ? `<a class="next" href="#${base}/${next.slug}"><span class="dir">Próxima →</span><span class="lbl">${escapeHtml(next.title)}</span></a>` : `<a class="next" href="#home"><span class="dir">Fim →</span><span class="lbl">Voltar ao roteiro</span></a>`}
  </nav>`;
  return `<article class="mag"${fm.theme ? ` data-theme="${fm.theme}"` : ''}>
${crumbsHtml(fm, registry, section.title)}
<div class="mag-body">
  <p class="mag-eyebrow" style="padding:20px 20px 0;">Seção ${idx + 1} de ${all.length} · <a href="#${base}" style="color:inherit;">${escapeHtml(splitTitle(fm.title || fm.slug).name)}</a></p>
${section.html}
  ${nav}
  ${relMount || ''}
  ${footerHtml(fm, '← Voltar à visão geral', `#${base}`)}
</div>
</article>`;
}

// Tenta associar cada seção "Roteiro hora a hora" a um número de dia, pra
// permitir que a rota #day/N aponte DIRETO pra essa seção (não um stub) —
// via "Dia N" no próprio cabeçalho, ou (fallback) quando a página tem um
// único dia e uma única seção de roteiro, mesmo sem o número no cabeçalho.
function resolveDaySections(sections, fm) {
  const roteiro = sections.filter((s) => /roteiro hora a hora/i.test(s.title));
  for (const s of roteiro) {
    const m = s.title.match(/dia\s*(\d+)/i);
    s.day = m ? parseInt(m[1], 10) : null;
  }
  if (roteiro.length === 1 && roteiro[0].day == null && fm.days && fm.days.length === 1) {
    roteiro[0].day = fm.days[0];
  }
}

// fm: front matter da página. parsed: { title, modules, images } de parsePage().
// registry: registro global (pra crumbs/links). imgKeyFor: url -> chave IMGS.
// Retorna { basePath, index: html, sections: [{slug, title, html}] }.
function renderPage(fm, parsed, registry, imgKeyFor) {
  const ctx = { imageRows: parsed.images, imgKeyFor, matchedImages: new Set(), index: 0 };
  const heroImg = parsed.images[0] ? imgKeyFor(parsed.images[0].url) : null;
  const base = basePathFor(fm);

  const usedSlugs = new Set();
  const sections = parsed.modules.map((mod, idx) => {
    ctx.index = idx;
    return {
      slug: sectionSlug(mod.header, usedSlugs),
      title: mod.header,
      teaser: teaser(mod.content),
      html: renderModule(mod, ctx),
    };
  });

  resolveDaySections(sections, fm);

  const relKind = fm.type === 'atracao' ? 'attraction' : fm.type;
  const relMount = ['city', 'atracao'].includes(fm.type)
    ? `<div data-rel-kind="${relKind}" data-rel-id="${fm.slug}"></div>`
    : '';

  const unmatched = parsed.images.filter((row) => !ctx.matchedImages.has(row.section));
  if (unmatched.length) {
    // eslint-disable-next-line no-console
    console.warn(`  [img] ${fm.slug}: ${unmatched.length} imagem(ns) da tabela não usadas em nenhum módulo (${unmatched.map((r) => r.section).join('; ')})`);
  }

  return {
    basePath: base,
    index: renderIndex(fm, registry, heroImg, sections, relMount),
    sections: sections.map((s, idx) => ({
      slug: s.slug,
      title: s.title,
      day: s.day ?? null,
      html: renderSection(fm, registry, s, idx, sections, relMount),
    })),
  };
}

module.exports = { renderPage, splitTitle, basePathFor, sectionSlug, slugify };
