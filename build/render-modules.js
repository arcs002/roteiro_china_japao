'use strict';
/*
 * Biblioteca ABERTA de renderers de módulo — 1 renderer genérico cobre
 * qualquer `##` novo sem exigir código; poucos casos especiais por regex
 * de cabeçalho ganham tratamento visual diferente. Adicionar um novo caso
 * especial no futuro é só acrescentar uma entrada em SPECIAL_RENDERERS,
 * nunca precisa tocar no genérico nem nas páginas já geradas.
 */

const { paragraphsToHtml } = require('./lib/markdown');
const { bestImageForHeader } = require('./lib/imagematch');

function figureHtml(imgRow, imgKeyFor) {
  if (!imgRow) return '';
  const key = imgKeyFor(imgRow.url);
  return `<figure class="mag-figure wide">
    <img data-img-key="${key}" alt="">
    <figcaption>${imgRow.scene || imgRow.section}</figcaption>
  </figure>`;
}

// Renderer genérico: eyebrow removido (o cabeçalho já é livre e específico
// por página), título + regra + prosa + figura opcional casada pela tabela
// de imagens. Alterna tint para dar ritmo visual entre seções.
function genericRenderer(mod, ctx) {
  const img = bestImageForHeader(mod.header, ctx.imageRows);
  if (img) ctx.matchedImages.add(img.section);
  return `<section class="mag-section${ctx.index % 2 === 1 ? ' tint' : ''}">
  <h2 class="mag-title">${mod.header}</h2>
  <div class="mag-rule"></div>
  ${figureHtml(img, ctx.imgKeyFor)}
  <div class="mag-prose">
${paragraphsToHtml(mod.content)}
  </div>
</section>`;
}

// "Abertura": vira a abertura de leitura logo abaixo do hero, sem título
// próprio repetido (o h1 do hero já cumpre esse papel) — primeiro parágrafo
// em destaque (mag-lead), sem tint (é a continuação visual do hero).
function aberturaRenderer(mod, ctx) {
  const paras = mod.content.split(/\r?\n\r?\n+/).map((p) => p.trim()).filter(Boolean);
  const [first, ...restParas] = paras;
  const img = bestImageForHeader(mod.header, ctx.imageRows);
  if (img) ctx.matchedImages.add(img.section);
  const { renderInline } = require('./lib/markdown');
  return `<section class="mag-section">
  ${figureHtml(img, ctx.imgKeyFor)}
  <div class="mag-prose">
    <p class="mag-lead">${renderInline((first || '').replace(/\r?\n/g, ' '))}</p>
${paragraphsToHtml(restParas.join('\n\n'))}
  </div>
</section>`;
}

const SPECIAL_RENDERERS = [
  { test: /^abertura/i, render: aberturaRenderer },
];

function renderModule(mod, ctx) {
  const special = SPECIAL_RENDERERS.find((r) => r.test.test(mod.header));
  return (special ? special.render : genericRenderer)(mod, ctx);
}

module.exports = { renderModule };
