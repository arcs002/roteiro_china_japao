#!/usr/bin/env node
// Auditoria mecânica do guia inteiro (fase 0 da skill travel-final-review).
// Zero dependências. Tudo que é específico de uma viagem vem do config JSON —
// o script em si serve para qualquer guia com o mesmo layout pesquisa/**.
//
// Uso: node .claude/skills/travel-final-review/scripts/audit.mjs [config.json]
//   default config: pesquisa/_pipeline/final-review.config.json
// Saída: <reportDir>/auditoria-mecanica.md + auditoria-mecanica.json (+ resumo no stdout)

import fs from 'node:fs';
import path from 'node:path';

const cfgPath = process.argv[2] || 'pesquisa/_pipeline/final-review.config.json';
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const ROOT = cfg.contentRoot || 'pesquisa';
const YEAR = cfg.year || new Date().getFullYear();
const BACKSTAGE = new RegExp(cfg.backstageHeaders || '^(Imagens|Fontes|Lugares reais pesquisados)', 'i');

// ---------- léxicos (genéricos, PT-BR) ----------
const CLICHES = [
  'imponente', 'incrível', 'incríveis', 'de tirar o fôlego', 'tirar o fôlego', 'não pode deixar de',
  'imperdível', 'imperdíveis', 'vale muito a pena', 'paraíso na terra', 'verdadeira joia', 'joia escondida',
  'cenário de cinema', 'cartão-postal perfeito', 'experiência única', 'mágico', 'mágica', 'deslumbrante',
  'simplesmente espetacular', 'de outro mundo',
];
const META = [
  'confirmado por múltiplas fontes', 'nossa pesquisa', 'a pesquisa', 'não foi possível confirmar',
  'as informações disponíveis', 'fontes consultadas', 'segundo as fontes', 'classificado como',
  'grau de certeza', 'o brief', 'no brief', 'brief-dia', 'flag operacional', 'flag de atenção', 'golden window', 'este módulo', 'esta seção', 'neste módulo', 'nesta seção',
  'o viajante declarou', 'perfil do viajante', 'do perfil', 'para o perfil', 'travel-writer', 'place-finder', 'event-finder',
];
const TAG_LEAK = /\b(CONFIRMADO|PROVÁVEL|NÃO CONFIRMADO|NAO CONFIRMADO)\b/;
const TODO = /\[VERIFICAR|\bTODO\b|\bTBD\b|FIXME|[Pp]laceholder|[Cc]onteúdo em desenvolvimento|conteúdo a desenvolver|lorem ipsum/; // case-sensitive: /i casaria "todo" em português
const PT_PT = [
  'comboio', 'autocarro', 'pequeno-almoço', 'casa de banho', 'telemóvel', 'ecrã', 'equipa', 'registo',
  'facto', 'contacto', 'receção', 'bilhete de identidade', 'miúdo', 'rapariga', 'propina', 'sítio web',
  'fixe', 'autarquia', 'utente', 'talho', 'montra', 'frigorífico', 'casa-de-banho', 'portagem',
];
// "estar a + infinitivo" (construção lusitana)
const PT_PT_RE = /\b(estou|está|estão|estava|estavam|estamos|fica|ficam|anda|andam) a (fazer|ver|comer|andar|beber|caminhar|chegar|subir|descer|olhar|esperar|tentar|usar|sair|entrar|trabalhar|cair|correr)\b/i;

const WEEKDAYS = { 'domingo': 0, 'dom': 0, 'segunda': 1, 'seg': 1, 'terça': 2, 'ter': 2, 'quarta': 3, 'qua': 3, 'quinta': 4, 'qui': 4, 'sexta': 5, 'sex': 5, 'sábado': 6, 'sáb': 6, 'sab': 6 };
const MONTHS = { janeiro: 1, fevereiro: 2, março: 3, abril: 4, maio: 5, junho: 6, julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12 };
const WD_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

// ---------- helpers ----------
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name.startsWith('_') ? [] : walk(p);
    return e.name.endsWith('.md') && e.name !== 'README.md' ? [p] : [];
  });
}
function parseFM(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, body: src };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean).map((s) => (/^\d+$/.test(s) ? +s : s));
    else v = v.replace(/^["']|["']$/g, '');
    fm[kv[1]] = v;
  }
  return { fm, body: src.slice(m[0].length) };
}
const words = (s) => (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
const toDate = (iso) => new Date(iso + 'T12:00:00Z');
const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (isoStr, n) => iso(new Date(toDate(isoStr).getTime() + n * 864e5));
const fmtBR = (isoStr) => isoStr.slice(8, 10) + '/' + isoStr.slice(5, 7);

// Prefere <slug>.expandido.md quando os dois existem (mesma regra do build).
function liveFiles(files) {
  const set = new Set(files);
  return files.filter((f) => !(f.endsWith('.md') && !f.endsWith('.expandido.md') && set.has(f.replace(/\.md$/, '.expandido.md'))));
}

// Divide o corpo em seções "## " e marca as de bastidor. Remove comentários HTML e o blockquote de brief.
function sections(body) {
  const out = [];
  let cur = { head: '(topo)', lines: [], start: 1 };
  body.split('\n').forEach((line, i) => {
    const h = line.match(/^##\s+(.*)$/);
    if (h) { out.push(cur); cur = { head: h[1].trim(), lines: [], start: i + 1 }; }
    else cur.lines.push([i + 1, line]);
  });
  out.push(cur);
  for (const s of out) s.backstage = BACKSTAGE.test(s.head);
  return out;
}
function proseLines(sec) {
  const res = [];
  let inComment = false;
  for (const [n, raw] of sec.lines) {
    let line = raw;
    if (inComment) { if (line.includes('-->')) { inComment = false; line = line.split('-->').pop(); } else continue; }
    if (line.includes('<!--')) { if (!line.includes('-->')) { inComment = true; line = line.split('<!--')[0]; } else line = line.replace(/<!--.*?-->/g, ''); }
    if (/^>\s*\*\*Brief usado/i.test(line)) continue;
    res.push([n, line]);
  }
  return res;
}

// ---------- coleta ----------
const READER_TYPES = new Set(cfg.readerTypes || ['city', 'dia', 'atracao', 'pais', 'provincia']);
const all = liveFiles(walk(ROOT));
const pages = all.map((f) => {
  const src = fs.readFileSync(f, 'utf8');
  const { fm, body } = parseFM(src);
  const fmLines = src.length - body.length ? src.slice(0, src.length - body.length).split('\n').length - 1 : 0;
  return { file: f, fm, body, fmLines, secs: sections(body) };
}).filter((p) => READER_TYPES.has(p.fm.type)); // assignment/perfil/voos são bastidor, não vão para o leitor
const findings = []; // {file, line, sev, cat, msg}
const add = (p, line, sev, cat, msg) => findings.push({ file: p.file, line: line ? line + p.fmLines : null, sev, cat, msg });

const stopByCity = Object.fromEntries((cfg.stops || []).map((s) => [s.city, s]));

// ---------- checagens por página ----------
for (const p of pages) {
  const { fm } = p;
  const type = fm.type;
  for (const k of ['type', 'slug', 'title']) if (!fm[k]) add(p, 1, 'erro', 'front-matter', `falta "${k}"`);
  if (['dia', 'city', 'atracao'].includes(type) && !fm.days) add(p, 1, 'aviso', 'front-matter', 'falta "days"');
  if (['dia', 'atracao'].includes(type) && !fm.city) add(p, 1, 'aviso', 'front-matter', 'falta "city"');

  let prose = 0;
  for (const s of p.secs) {
    if (s.backstage) continue;
    for (const [n, line] of proseLines(s)) {
      prose += words(line);
      const low = line.toLowerCase();
      for (const c of CLICHES) if (new RegExp(`(^|[^\\p{L}])${c}([^\\p{L}]|$)`, 'iu').test(low)) add(p, n, 'aviso', 'clichê', `"${c}" — ${line.trim().slice(0, 110)}`);
      for (const c of META) if (low.includes(c)) add(p, n, 'erro', 'metalinguagem', `"${c}" — ${line.trim().slice(0, 110)}`);
      if (TAG_LEAK.test(line)) add(p, n, 'erro', 'tag-vazada', line.trim().slice(0, 120));
      if (TODO.test(line)) add(p, n, type === 'atracao' ? 'aviso' : 'erro', 'pendência', line.trim().slice(0, 120));
      for (const c of PT_PT) if (new RegExp(`(^|[^\\p{L}])${c}([^\\p{L}]|$)`, 'iu').test(low)) add(p, n, 'aviso', 'pt-PT', `"${c}" — ${line.trim().slice(0, 110)}`);
      if (PT_PT_RE.test(line)) add(p, n, 'aviso', 'pt-PT', `"estar a + infinitivo" — ${line.trim().slice(0, 110)}`);
      for (const d of cfg.removedDestinations || []) if (new RegExp(`\\b${d.replace(/'/g, "['’]")}\\b`, 'i').test(line)) add(p, n, 'aviso', 'destino-removido', `"${d}" — ${line.trim().slice(0, 110)}`);
      checkWeekdays(p, n, line);
    }
  }
  p.prose = prose;
  const floor = (cfg.wordFloors || {})[type];
  if (floor && prose < floor) add(p, null, type === 'atracao' && prose < 200 ? 'erro' : 'aviso', 'extensão', `${prose} palavras de prosa (piso ${floor})${prose < 200 ? ' — STUB/placeholder' : ''}`);

  if (type === 'city') {
    const heads = p.secs.filter((s) => !s.backstage).map((s) => s.head);
    for (const m of cfg.mandatoryCitySections || []) if (!heads.some((h) => h.toLowerCase().includes(m.toLowerCase()))) add(p, null, 'erro', 'estrutura', `seção mandatória ausente: "${m}"`);
    const dayHeads = p.secs.filter((s) => /^Dia\s+\d+/i.test(s.head));
    const declared = [].concat(fm.days || []);
    const found = dayHeads.map((s) => +s.head.match(/^Dia\s+(\d+)/i)[1]);
    for (const d of declared) if (!found.includes(d)) add(p, null, 'erro', 'estrutura', `front matter declara dia ${d} mas não há "## Dia ${d}"`);
    for (const d of found) if (!declared.includes(d)) add(p, null, 'erro', 'estrutura', `"## Dia ${d}" não está em days: [${declared}]`);
    for (const s of dayHeads) {
      const txt = s.lines.map((l) => l[1]).join('\n');
      if (!/<!--\s*BRIEF-DIA/.test(txt)) add(p, s.start, 'aviso', 'estrutura', `"## ${s.head}" sem bloco <!--BRIEF-DIA-->`);
      const w = words(proseLines(s).map((l) => l[1]).join(' '));
      if (w > 900) add(p, s.start, 'aviso', 'estrutura', `"## ${s.head}" tem ${w} palavras (day summary deveria ter ~400-600; hora-a-hora mora no arquivo de dia)`);
      if (w < 300) add(p, s.start, 'aviso', 'extensão', `"## ${s.head}" tem só ${w} palavras (day summary 400-600)`);
    }
    const stop = stopByCity[fm.slug];
    if (!stop) add(p, 1, 'aviso', 'roteiro', `cidade "${fm.slug}" não está em stops do config`);
  }
}

function checkWeekdays(p, n, line) {
  // "sábado, 31/10" | "sáb 31/10" | "31/10 (sáb)" | "sábado, 31 de outubro"
  const wd = '(domingo|segunda|terça|quarta|quinta|sexta|sábado|dom|seg|ter|qua|qui|sex|sáb|sab)(?:-feira)?';
  const dt = '(\\d{1,2})(?:/(\\d{1,2})| de (janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro))';
  const res = [new RegExp(`\\b${wd}\\.?,?\\s+(?:dia\\s+)?${dt}`, 'gi'), new RegExp(`${dt}\\s*[\\(,–-]\\s*${wd}\\b`, 'gi')];
  res.forEach((re, idx) => {
    for (const m of line.matchAll(re)) {
      const [w, d, mo, moName] = idx === 0 ? [m[1], m[2], m[3], m[4]] : [m[4], m[1], m[2], m[3]];
      const month = mo ? +mo : MONTHS[moName.toLowerCase()];
      if (!month || month > 12 || +d > 31) continue;
      const real = toDate(`${YEAR}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`).getUTCDay();
      const said = WEEKDAYS[w.toLowerCase()];
      if (said !== undefined && said !== real) add(p, n, 'erro', 'data', `"${m[0]}" — ${d}/${month}/${YEAR} é ${WD_NAMES[real]}`);
    }
  });
}

// ---------- checagens de roteiro (cross-page) ----------
const dias = pages.filter((p) => p.fm.type === 'dia');
const byGlobal = {};
for (const p of dias) {
  const g = +(p.fm.global_day ?? [].concat(p.fm.days || [])[0]);
  const fnDay = +(p.file.match(/dia-(\d+)\.md$/) || [])[1];
  const days = [].concat(p.fm.days || []);
  if (!p.fm.global_day) add(p, 1, 'aviso', 'front-matter', 'falta "global_day"');
  if (!p.fm.date) add(p, 1, 'aviso', 'front-matter', 'falta "date"');
  if (fnDay && days.length && !days.includes(fnDay)) add(p, 1, 'erro', 'roteiro', `nome do arquivo diz dia ${fnDay}, front matter days: [${days}]`);
  if (fnDay && g && g !== fnDay) add(p, 1, 'erro', 'roteiro', `global_day ${g} ≠ dia ${fnDay} do nome do arquivo`);
  const stop = stopByCity[p.fm.city];
  if (stop && p.fm.date && (p.fm.date < stop.checkin || p.fm.date > stop.checkout)) add(p, 1, 'erro', 'roteiro', `date ${p.fm.date} fora da estadia em ${p.fm.city} (${stop.checkin} → ${stop.checkout})`);
  const h1 = p.body.match(/^#\s+Dia\s+(\d+)/m);
  if (h1 && g && +h1[1] !== g) add(p, 1, 'erro', 'roteiro', `título "# Dia ${h1[1]}" ≠ global_day ${g}`);
  if (g) (byGlobal[g] ||= []).push(p);
  const city = pages.find((c) => c.fm.type === 'city' && c.fm.slug === p.fm.city);
  if (city && g && !city.secs.some((s) => new RegExp(`^Dia\\s+${g}\\b`).test(s.head))) add(p, 1, 'erro', 'roteiro', `cidade ${p.fm.city} não tem "## Dia ${g}" correspondente`);
}
// mapa global_day → data: a diferença de dias entre dois global_day tem que bater com a diferença de datas
const calendar = Object.entries(byGlobal).map(([g, ps]) => ({ g: +g, dates: [...new Set(ps.map((p) => p.fm.date).filter(Boolean))], cities: ps.map((p) => p.fm.city), files: ps.map((p) => p.file) })).sort((a, b) => a.g - b.g);
for (const c of calendar) if (c.dates.length > 1) findings.push({ file: c.files.join(' + '), line: null, sev: 'erro', cat: 'roteiro', msg: `Dia ${c.g} tem datas diferentes: ${c.dates.join(', ')}` });
const offsets = calendar.filter((c) => c.dates[0]).map((c) => ({ ...c, off: Math.round((toDate(c.dates[0]) - toDate(`${YEAR}-01-01`)) / 864e5) - c.g }));
for (let i = 1; i < offsets.length; i++) {
  if (offsets[i].off !== offsets[i - 1].off) findings.push({ file: offsets[i].files.join(' + '), line: null, sev: 'erro', cat: 'roteiro', msg: `numeração de dias quebra entre Dia ${offsets[i - 1].g} (${fmtBR(offsets[i - 1].dates[0])}) e Dia ${offsets[i].g} (${fmtBR(offsets[i].dates[0])}): ${offsets[i].g - offsets[i - 1].g} dia(s) de numeração para ${Math.round((toDate(offsets[i].dates[0]) - toDate(offsets[i - 1].dates[0])) / 864e5)} dia(s) de calendário` });
}
// cobertura do calendário: toda data entre o 1º check-in e o último check-out deveria ter um dia (ou ser trânsito explícito)
if (cfg.stops?.length) {
  const first = cfg.stops[0].checkin, last = cfg.stops.at(-1).checkout;
  const covered = new Set(dias.map((p) => p.fm.date).filter(Boolean));
  for (let d = first; d <= last; d = addDays(d, 1)) if (!covered.has(d)) findings.push({ file: '(calendário)', line: null, sev: 'aviso', cat: 'roteiro', msg: `${fmtBR(d)} (${WD_NAMES[toDate(d).getUTCDay()]}) sem arquivo de dia — confirmar se é trânsito/chegada tardia intencional` });
}
// hotel mencionado em algum lugar do pacote da cidade
for (const s of cfg.stops || []) {
  for (const h of [].concat(s.hotel || [])) {
    const bundle = pages.filter((p) => p.fm.slug === s.city || p.fm.city === s.city);
    const key = h.split(/[ (]/)[0].toLowerCase();
    if (bundle.length && !bundle.some((p) => p.body.toLowerCase().includes(key))) findings.push({ file: `(pacote ${s.city})`, line: null, sev: 'aviso', cat: 'roteiro', msg: `hotel reservado "${h}" não aparece em nenhuma página da cidade` });
  }
}
// arquivos não-vivos (fonte de pesquisa sombreada por .expandido)
const shadowed = walk(ROOT).filter((f) => !all.includes(f));

// ---------- relatório ----------
const order = { erro: 0, aviso: 1 };
findings.sort((a, b) => order[a.sev] - order[b.sev] || a.cat.localeCompare(b.cat) || a.file.localeCompare(b.file) || (a.line || 0) - (b.line || 0));
const byCat = {};
for (const f of findings) (byCat[f.cat] ||= { erro: 0, aviso: 0 })[f.sev]++;

const outDir = cfg.reportDir || path.join(ROOT, '_revisao');
fs.mkdirSync(outDir, { recursive: true });
let md = `# Auditoria mecânica — ${new Date().toISOString().slice(0, 16).replace('T', ' ')}\n\n`;
md += `Gerado por \`.claude/skills/travel-final-review/scripts/audit.mjs\` com \`${cfgPath}\`. É a fase 0 — só pega o que regex pega. Estilo, qualidade e coerência narrativa são das fases 1-2 (agentes).\n\n`;
md += `## Resumo por categoria\n\n| Categoria | Erros | Avisos |\n|---|---|---|\n` + Object.entries(byCat).map(([c, v]) => `| ${c} | ${v.erro} | ${v.aviso} |`).join('\n') + '\n\n';
md += `## Calendário (global_day → data → cidade)\n\n| Dia | Data | Dia da semana | Cidade(s) |\n|---|---|---|---|\n` + calendar.map((c) => `| ${c.g} | ${c.dates.map(fmtBR).join(' / ')} | ${c.dates.map((d) => WD_NAMES[toDate(d).getUTCDay()]).join(' / ')} | ${c.cities.join(', ')} |`).join('\n') + '\n\n';
md += `## Extensão das páginas vivas\n\n| Arquivo | Tipo | Palavras de prosa |\n|---|---|---|\n` + pages.map((p) => `| ${p.file} | ${p.fm.type} | ${p.prose} |`).join('\n') + '\n\n';
md += `## Achados\n\n` + findings.map((f) => `- **${f.sev}** · ${f.cat} · \`${f.file}${f.line ? ':' + f.line : ''}\` — ${f.msg}`).join('\n') + '\n\n';
md += `## Arquivos sombreados por .expandido (não vão para o site)\n\n` + shadowed.map((f) => `- ${f}`).join('\n') + '\n';
fs.writeFileSync(path.join(outDir, 'auditoria-mecanica.md'), md);
fs.writeFileSync(path.join(outDir, 'auditoria-mecanica.json'), JSON.stringify({ calendar, findings, pages: pages.map((p) => ({ file: p.file, type: p.fm.type, slug: p.fm.slug, city: p.fm.city, prose: p.prose })) }, null, 1));

console.log(`${pages.length} páginas vivas · ${findings.filter((f) => f.sev === 'erro').length} erros · ${findings.filter((f) => f.sev === 'aviso').length} avisos`);
for (const [c, v] of Object.entries(byCat)) console.log(`  ${c.padEnd(18)} ${String(v.erro).padStart(4)} erro(s) ${String(v.aviso).padStart(4)} aviso(s)`);
console.log(`→ ${path.join(outDir, 'auditoria-mecanica.md')}`);
