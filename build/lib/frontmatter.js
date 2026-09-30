'use strict';
/*
 * Parser mínimo de front matter YAML — cobre só o subconjunto que este
 * projeto usa (chave: valor escalar, "texto entre aspas", [lista, de, itens]).
 * Sem dependência externa de propósito: o front matter aqui é sempre plano
 * e pequeno, não vale puxar uma lib de YAML completa para isso.
 */

function parseScalar(raw) {
  const v = raw.trim();
  if (v === '') return '';
  if (/^\[.*\]$/.test(v)) {
    const inner = v.slice(1, -1).trim();
    if (inner === '') return [];
    return inner.split(',').map((s) => parseScalar(s.trim()));
  }
  if (/^".*"$/.test(v) || /^'.*'$/.test(v)) return v.slice(1, -1);
  if (/^-?\d+$/.test(v)) return parseInt(v, 10);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null' || v === '~') return null;
  return v;
}

// Divide o arquivo em { data, body }. Se não houver bloco `---`, data = {}.
function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1);
    data[key] = parseScalar(val);
  }
  return { data, body: raw.slice(m[0].length) };
}

// Serializa de volta para um bloco `---\n...\n---\n` — usado só pela
// migração one-off (build/migrate-frontmatter.js).
function stringifyFrontMatter(data) {
  const lines = ['---'];
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined) continue;
    if (Array.isArray(val)) {
      lines.push(`${key}: [${val.join(', ')}]`);
    } else if (typeof val === 'string' && /[:#]/.test(val)) {
      lines.push(`${key}: "${val.replace(/"/g, '\\"')}"`);
    } else {
      lines.push(`${key}: ${val}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

module.exports = { parseFrontMatter, stringifyFrontMatter };
