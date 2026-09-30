'use strict';
/*
 * Casamento heurístico entre o cabeçalho de um módulo (## Abertura, ## Roteiro
 * hora a hora — Dia 2 (...): Chegada + Centro Histórico) e o rótulo livre da
 * coluna "Seção" da tabela "Imagens por seção" (ex.: "Roteiro Dia 2 —
 * Bairro Muçulmano de dia"). Os dois textos não são iguais por design (a
 * tabela descreve a cena, não repete o cabeçalho) — por isso o match é por
 * sobreposição de palavras-chave, não igualdade. Nunca força imagem: abaixo
 * de um limiar mínimo, o módulo simplesmente fica sem figura.
 */

const STOPWORDS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'as', 'os', 'em', 'no', 'na',
  'nos', 'nas', 'que', 'por', 'para', 'com', 'ou', 'um', 'uma', '—', '-', '·',
]);

function normalizeTokens(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
    .replace(/[().:,;"'`]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t) && !/^\d+$/.test(t));
}

function overlapScore(a, b) {
  const ta = new Set(normalizeTokens(a));
  const tb = normalizeTokens(b);
  if (!ta.size || !tb.length) return 0;
  let hits = 0;
  for (const t of tb) if (ta.has(t)) hits++;
  return hits / Math.min(ta.size, tb.length);
}

// Retorna a melhor linha da tabela de imagens para este cabeçalho de módulo,
// ou null se nada passar do limiar (nunca inventa imagem genérica).
function bestImageForHeader(header, imageRows, threshold = 0.34) {
  let best = null;
  let bestScore = 0;
  for (const row of imageRows) {
    const score = overlapScore(header, row.section);
    if (score > bestScore) { bestScore = score; best = row; }
  }
  return bestScore >= threshold ? best : null;
}

module.exports = { bestImageForHeader, overlapScore };
