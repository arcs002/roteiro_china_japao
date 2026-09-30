'use strict';
/*
 * Parser de markdown sob medida para o formato que travel-writer produz:
 * # Título
 * > brief citado (descartado — é nota de processo, não conteúdo de leitor)
 * ## Módulo 1
 * parágrafos...
 * ## Módulo 2
 * ...
 * ## Imagens por seção — pesquisadas   <- e tudo depois disso: descartado
 * | tabela ...
 *
 * Não tenta ser um parser de markdown genérico — só o suficiente para este
 * pipeline. Biblioteca de módulos "aberta": qualquer `##` novo funciona sem
 * mudança de código, cai no renderer genérico.
 */

// Cabeçalhos de bastidor de pesquisa/processo — nunca são conteúdo de leitor,
// mesmo quando o rascunho ainda não passou pelo padrão das páginas-gold
// (que usam sempre "Imagens por seção — pesquisadas"). Biblioteca aberta
// pro lado do CONTEÚDO, mas esses nomes de scaffolding são conhecidos.
const APPENDIX_RE = /^(imagens\b|imagens por se[çc][ãa]o|fontes$|lugares reais pesquisados|eventos\/sazonalidade pesquisados|eventos pesquisados)/i;

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Converte um parágrafo de markdown inline para HTML: **bold**, *italic*,
// `code`, [texto](url), e as tags de confiança do pipeline de viagem
// ([VERIFICAR: ...], [CONFIRMADO], [PROVÁVEL], [NÃO CONFIRMADO]) — essas
// precisam ficar visualmente marcadas, nunca some no meio da prosa.
function renderInline(text) {
  let s = escapeHtml(text);

  // tags de confiança primeiro (antes do parser genérico de *itálico*,
  // que senão comeria os asteriscos ao redor de *[CONFIRMADO]*)
  s = s.replace(/\*?\[VERIFICAR:([^\]]*)\]\*?/g,
    '<span class="mag-tag verificar">verificar$1</span>');
  s = s.replace(/\*?\[(CONFIRMADO|PROVÁVEL|NÃO CONFIRMADO)\]\*?/g,
    (_, tag) => `<span class="mag-tag ${tag === 'CONFIRMADO' ? 'confirmado' : tag === 'PROVÁVEL' ? 'provavel' : 'nao-confirmado'}">${tag.toLowerCase()}</span>`);

  // [texto](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // **bold**
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // *italic*
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // `code`
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

function paragraphsToHtml(block) {
  // Strip HTML comments (<!--...--> spanning multiple lines)
  const stripped = block.replace(/<!--[\s\S]*?-->/g, '');

  return stripped
    .split(/\r?\n\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      // Blockquote: consecutive lines starting with >
      if (p.split('\n').every((l) => l.startsWith('>'))) {
        const inner = p.split('\n').map((l) => l.replace(/^>\s?/, '').trim()).join(' ');
        return `<blockquote>${renderInline(inner)}</blockquote>`;
      }
      return `<p>${renderInline(p.replace(/\r?\n/g, ' '))}</p>`;
    })
    .join('\n');
}

// Parseia a tabela markdown "Imagens por seção" em linhas { section, url, source, scene }.
function parseImageTable(appendixBlock) {
  const rows = [];
  const lines = appendixBlock.split(/\r?\n/).filter((l) => l.trim().startsWith('|'));
  // pula cabeçalho + linha separadora (--- | --- | ...)
  for (const line of lines.slice(2)) {
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 2) continue;
    const [section, urlCell, source, scene] = cells;
    const urlMatch = urlCell.match(/`([^`]+)`/) || urlCell.match(/(https?:\/\/\S+)/);
    if (!section || !urlMatch) continue;
    rows.push({ section, url: urlMatch[1], source: source || '', scene: scene || '' });
  }
  return rows;
}

// Parseia o corpo completo (já sem front matter) em { title, modules, images }.
function parsePage(body) {
  const lines = body.split(/\r?\n/);
  let i = 0;
  let title = '';
  if (lines[0] && lines[0].startsWith('# ')) {
    title = lines[0].slice(2).trim();
    i = 1;
  }
  const rest = lines.slice(i).join('\n');

  // divide em blocos por cabeçalho `## `
  const parts = rest.split(/\r?\n## /);
  // parts[0] = tudo antes do primeiro `##` (brief citado, `---`, lixo) — descartado
  const sections = parts.slice(1).map((part) => {
    const nlIdx = part.indexOf('\n');
    const header = (nlIdx === -1 ? part : part.slice(0, nlIdx)).trim();
    const content = nlIdx === -1 ? '' : part.slice(nlIdx + 1);
    return { header, content };
  });

  const modules = [];
  let images = [];
  for (const sec of sections) {
    if (APPENDIX_RE.test(sec.header)) {
      images = images.concat(parseImageTable(sec.content));
      continue; // seção de pesquisa/processo — nunca renderizada
    }
    modules.push(sec);
  }
  return { title, modules, images };
}

module.exports = { parsePage, paragraphsToHtml, renderInline, escapeHtml };
