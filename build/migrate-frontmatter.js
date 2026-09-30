#!/usr/bin/env node
'use strict';
/*
 * Migração ÚNICA (não faz parte do build normal): preenche o front matter
 * mínimo em cada pesquisa/cidades/*.md e pesquisa/atracoes/*.md que ainda
 * não tem, usando pesquisa/README.md (tabela índice cidade↔dias↔atrações)
 * + o nome do arquivo como fonte. `emoji`/`region`/`pais`/`provincia` usam
 * um mapa de conhecimento geográfico geral (não é pesquisa de viagem, é só
 * "em que província/país fica" — ver GEO abaixo) só para não deixar tudo
 * em branco; revise/ajuste à mão depois, o build nunca falha por causa
 * desses campos (só title/slug/type são obrigatórios).
 */

const fs = require('fs');
const path = require('path');
const { parseFrontMatter, stringifyFrontMatter } = require('./lib/frontmatter');

const ROOT = path.resolve(__dirname, '..');
const PESQUISA = path.join(ROOT, 'pesquisa');

// slug do arquivo de cidade -> { pais, provincia, region, emoji }
const GEO = {
  pequim:            { pais: 'china', provincia: null,      region: 'Pequim, China',            emoji: '🏯' },
  xian:              { pais: 'china', provincia: 'shaanxi', region: 'Shaanxi, China',            emoji: '🏛️' },
  chongqing:         { pais: 'china', provincia: null,      region: 'Chongqing, China',          emoji: '🌆' },
  zhangjiajie:       { pais: 'china', provincia: 'hunan',   region: 'Hunan, China',              emoji: '⛰️' },
  fenghuang:         { pais: 'china', provincia: 'hunan',   region: 'Hunan, China',              emoji: '🏮' },
  guizhou:           { pais: 'china', provincia: 'guizhou', region: 'Guizhou, China',            emoji: '🌾' },
  'yangshuo-guilin': { pais: 'china', provincia: 'guangxi', region: 'Guangxi, China',            emoji: '🏔️' },
  shenzhen:          { pais: 'china', provincia: 'guangdong', region: 'Guangdong, China',        emoji: '🏙️' },
  hongkong:          { pais: 'china', provincia: 'hongkong', region: 'Hong Kong, China',         emoji: '🌃' },
  kurokawa:          { pais: 'japao', provincia: 'kumamoto', region: 'Kumamoto, Japão',          emoji: '♨️' },
  yufuin:            { pais: 'japao', provincia: 'oita',    region: 'Oita, Japão',               emoji: '🎐' },
  fukuoka:           { pais: 'japao', provincia: 'fukuoka-ken', region: 'Fukuoka, Japão',         emoji: '🍜' },
};

function slugFromFilename(base) {
  // "02-xian" -> "xian" ; "07-yangshuo-guilin" -> "yangshuo-guilin"
  const m = base.match(/^\d+-(.+)$/);
  return m ? m[1] : base;
}

function orderFromFilename(base) {
  const m = base.match(/^(\d+)-/);
  return m ? parseInt(m[1], 10) : 999;
}

// Lê a tabela índice do README para cidade -> {days, atracoes[]}
function readReadmeIndex() {
  const readme = fs.readFileSync(path.join(PESQUISA, 'README.md'), 'utf8');
  const cityDays = {}; // slug -> [n,n,...]
  const attrCity = {}; // atracao-slug -> city-slug
  const lines = readme.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\|\s*\d+\s*\|\s*\[cidades\/(\d+-[a-z-]+)\.md\]/);
    if (!m) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    const fileCell = cells[1];
    const daysCell = cells[2];
    const attrCell = cells[3];
    const fm = fileCell.match(/cidades\/(\d+-[a-z-]+)\.md/);
    if (!fm) continue;
    const slug = slugFromFilename(fm[1]);
    const days = (daysCell.match(/\d+/g) || []).map(Number);
    let daysRange = days;
    if (days.length === 2 && daysCell.includes('-')) {
      daysRange = [];
      for (let n = days[0]; n <= days[1]; n++) daysRange.push(n);
    }
    cityDays[slug] = daysRange;
    (attrCell.match(/[a-z][a-z0-9-]+/g) || []).forEach((slug2) => { attrCity[slug2] = slug; });
  }
  return { cityDays, attrCity };
}

function getTitle(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

function migrateCityFile(file, cityDays) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, body } = parseFrontMatter(raw);
  if (data.type) return false; // já migrado
  const base = path.basename(file).replace(/\.expandido\.md$/, '').replace(/\.md$/, '');
  const slug = slugFromFilename(base);
  const geo = GEO[slug] || {};
  const fm = {
    type: 'city',
    slug,
    title: getTitle(body) || slug,
    emoji: geo.emoji || '',
    order: orderFromFilename(base),
    days: cityDays[slug] || [],
    pais: geo.pais || '',
    provincia: geo.provincia || '',
    region: geo.region || '',
  };
  fs.writeFileSync(file, stringifyFrontMatter(fm) + body);
  return true;
}

function migrateAtracaoFile(file, attrCity, cityDays) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, body } = parseFrontMatter(raw);
  if (data.type) return false;
  const slug = path.basename(file).replace(/\.expandido\.md$/, '').replace(/\.md$/, '');
  const city = attrCity[slug] || '';
  const fm = {
    type: 'atracao',
    slug,
    title: getTitle(body) || slug,
    emoji: '',
    order: 999,
    city,
    days: city ? (cityDays[city] || []) : [],
  };
  fs.writeFileSync(file, stringifyFrontMatter(fm) + body);
  return true;
}

function run() {
  const { cityDays, attrCity } = readReadmeIndex();
  let n = 0;
  for (const f of fs.readdirSync(path.join(PESQUISA, 'cidades'))) {
    if (!f.endsWith('.md')) continue;
    if (migrateCityFile(path.join(PESQUISA, 'cidades', f), cityDays)) n++;
  }
  for (const f of fs.readdirSync(path.join(PESQUISA, 'atracoes'))) {
    if (!f.endsWith('.md')) continue;
    if (migrateAtracaoFile(path.join(PESQUISA, 'atracoes', f), attrCity, cityDays)) n++;
  }
  console.log(`Front matter adicionado em ${n} arquivo(s). Revise emoji/region/provincia manualmente quando sobrar tempo — o build só exige type+slug+title.`);
}

run();
