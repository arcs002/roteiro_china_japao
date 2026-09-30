'use strict';
/*
 * Checagens estruturais antes de gerar qualquer HTML. Falha o build (o
 * caller decide o exit code) em erro real de referência cruzada; só avisa
 * em pendência que não impede a navegação (ex.: província sem país).
 */

function validate(pages) {
  const errors = [];
  const warnings = [];
  const seen = new Set();

  for (const { fm, relPath } of pages) {
    if (!fm.type) { errors.push(`${relPath}: falta "type" no front matter`); continue; }
    if (!fm.slug) { errors.push(`${relPath}: falta "slug" no front matter`); continue; }
    if (!fm.title) { warnings.push(`${relPath}: falta "title" no front matter`); }

    const key = `${fm.type}/${fm.slug}${fm.topico ? '/' + fm.topico : ''}`;
    if (seen.has(key)) errors.push(`${relPath}: slug duplicado (${key})`);
    seen.add(key);
  }

  const bySlug = (type) => new Map(pages.filter((p) => p.fm.type === type).map((p) => [p.fm.slug, p]));
  const cities = bySlug('city');
  const provincias = bySlug('provincia');
  const paises = bySlug('pais');

  for (const { fm, relPath } of pages) {
    if (fm.type === 'atracao' && fm.city && !cities.has(fm.city)) {
      errors.push(`${relPath}: atração referencia city="${fm.city}" que não existe em pesquisa/cidades`);
    }
    if (fm.type === 'city' && fm.provincia && !provincias.has(fm.provincia)) {
      warnings.push(`${relPath}: cidade referencia provincia="${fm.provincia}" sem página própria ainda`);
    }
    if (fm.type === 'provincia' && fm.pais && !paises.has(fm.pais)) {
      warnings.push(`${relPath}: província referencia pais="${fm.pais}" sem página própria ainda`);
    }
  }

  return { errors, warnings };
}

module.exports = { validate };
