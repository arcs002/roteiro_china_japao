'use strict';
/*
 * Agrega o front matter de TODAS as páginas parseadas num único registro de
 * navegação — o equivalente gerado de ROUTES + GUIDE + DAY_INFO + CITY_INFO
 * do guia.html de referência, mas nunca editado à mão: sempre recalculado a
 * partir do que existe em pesquisa/**.
 *
 * `pages` : array de { fm, title, file, name, tagline } — uma entrada por
 * página já parseada (ver build.js).
 */

const { splitTitle } = require('./render-page');

function capitalize(slug) {
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildRegistry(pages) {
  const routes = { '': 'content/home.html', home: 'content/home.html' };
  const cities = {};
  const attractions = {};
  const paises = {};
  const provincias = {};
  const dayToCity = {};

  for (const p of pages) {
    const { fm, file } = p;
    const { name } = splitTitle(fm.title || fm.slug);

    if (fm.type === 'city') {
      routes[`city/${fm.slug}`] = file;
      cities[fm.slug] = {
        name, emoji: fm.emoji || '', region: fm.region || '',
        days: fm.days || [], pais: fm.pais || null, provincia: fm.provincia || null,
        order: fm.order ?? 999,
      };
      (fm.days || []).forEach((d) => { dayToCity[d] = fm.slug; });
    } else if (fm.type === 'atracao') {
      routes[`atracao/${fm.slug}`] = file;
      attractions[fm.slug] = {
        name, emoji: fm.emoji || '', city: fm.city || null,
        days: fm.days || [], order: fm.order ?? 999,
      };
    } else if (fm.type === 'pais') {
      const slug = fm.slug;
      const topicTitle = fm.topico ? (splitTitle(fm.title || '').tagline || fm.topico) : name;
      paises[slug] = paises[slug] || { title: fm.topico ? capitalize(slug) : name, topics: [] };
      if (fm.topico) {
        routes[`aprofundamento/pais/${slug}/${fm.topico}`] = file;
        paises[slug].topics.push({ topico: fm.topico, title: topicTitle, order: fm.order ?? 999 });
      } else {
        routes[`aprofundamento/pais/${slug}`] = file;
        paises[slug].title = name;
        paises[slug].hasIndex = true;
      }
    } else if (fm.type === 'dia') {
      if (fm.city && fm.global_day != null) {
        dayToCity[fm.global_day] = fm.city;
        // rota final sobrescrita em build.js step 6 (diaPageIndex tem prioridade)
      }
    } else if (fm.type === 'provincia') {
      const slug = fm.slug;
      const topicTitle = fm.topico ? (splitTitle(fm.title || '').tagline || fm.topico) : name;
      provincias[slug] = provincias[slug] || { title: fm.topico ? capitalize(slug) : name, topics: [], pais: fm.pais || null };
      if (fm.topico) {
        routes[`aprofundamento/provincia/${slug}/${fm.topico}`] = file;
        provincias[slug].topics.push({ topico: fm.topico, title: topicTitle, order: fm.order ?? 999 });
      } else {
        routes[`aprofundamento/provincia/${slug}`] = file;
        provincias[slug].title = name;
        provincias[slug].pais = fm.pais || provincias[slug].pais;
        provincias[slug].hasIndex = true;
      }
    }
  }

  // prateleira "províncias visitadas" de cada país: qualquer província cujo
  // `pais` bata com o slug do país, mesmo sem depender de front matter na cidade.
  for (const [slug, prov] of Object.entries(provincias)) {
    if (prov.pais && paises[prov.pais]) {
      paises[prov.pais].provincias = paises[prov.pais].provincias || [];
      paises[prov.pais].provincias.push(slug);
    }
  }

  const cityOrder = Object.entries(cities).sort((a, b) => a[1].order - b[1].order).map(([s]) => s);
  const days = Object.keys(dayToCity).map(Number).sort((a, b) => a - b)
    .map((n) => ({ n, city: dayToCity[n] }));
  for (const n of days.map((d) => d.n)) routes[`day/${n}`] = `content/day/${n}.html`;

  return { routes, cities, attractions, paises, provincias, cityOrder, days };
}

module.exports = { buildRegistry };
