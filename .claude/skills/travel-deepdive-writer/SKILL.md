---
name: travel-deepdive-writer
description: Planeja e escreve UMA página de Aprofundamento — um tópico de país (ex. China/Dinastia, China/Etnias, China/Geografia, China/História) ou de província visitada (ex. Shaanxi/Etnias, Shaanxi/Cidades, Shaanxi/Culinária). Mais leve que travel-content-planner+travel-magazine-writer (não tem place-finder/event-finder, não é por-viajante-e-data): é conteúdo de referência ancorado no roteiro real. Use para qualquer página em pesquisa/aprofundamento/, nunca travel-content-planner para essas.
---

# Travel Deepdive Writer (Aprofundamento: país/província)

Esta skill existe porque o pipeline `travel-content-planner` → `travel-section-selector` → `travel-place-finder`/`travel-event-finder` → `travel-brief-validator` foi desenhado para **cidade/atração com data e viajante fixos** (evento do dia, restaurante real, ritmo do roteiro). Página de Aprofundamento é outra coisa: um tópico de fundo (dinastia, etnia, geografia, história, culinária regional) que não tem data de visita nem precisa de lugar real nomeado — aplicar aquele pipeline aqui é usar a ferramenta errada (o `travel-brief-validator`, por exemplo, reprovaria por "faltar roteiro hora a hora", que nunca se aplica aqui). Use esta skill mais leve no lugar, sempre.

## Front matter — não é opcional, é o que o build usa pra tudo

Todo arquivo de Aprofundamento **precisa** deste bloco YAML no topo (ver `pesquisa/README.md`):

```yaml
---
type: pais              # pais | provincia
slug: china              # slug do país/província (não do tópico)
topico: historia         # slug livre do tópico — biblioteca aberta, invente o que fizer sentido
title: "China — História"  # SEMPRE "<Nome do país/província> — <Tópico>", o build separa por " — "
order: 3                 # posição na prateleira de tópicos daquele país/província
---
```
- `pais`/`provincia` em `type` decide a pasta: `pesquisa/aprofundamento/paises/<slug>/<topico>.md` ou `pesquisa/aprofundamento/provincias/<slug>/<topico>.md`. **O nome do arquivo e da pasta pai precisam bater com `slug`** — é assim que o build (`build/build-registry.js`) liga o tópico ao país/província certo.
- Para uma página de **província**, adicione também `pais: china` no front matter — é o que alimenta a prateleira "províncias visitadas" na página do país.
- Sem `type`/`slug`/`title`, o build falha (`build/validate.js`). Sem `topico`, a página é tratada como o **hub** do país/província (não escreva um hub sem ser explicitamente pedido — hoje o hub é sempre auto-gerado pelo build a partir dos tópicos existentes, ver `CLAUDE.md`).

## Estrutura do corpo — igual ao resto do pipeline, mais curta

```markdown
# China — História

## Abertura
(lede — 250-400 palavras)

## <Tópico temático 1, nomeado por você>
(600-1.200 palavras — piso, não teto)

## <Tópico temático 2>
...

## Encerramento
(250-400 palavras)
```
Sem bloco de brief citado (`>` no topo) — isso é convenção de cidade/atração, aqui não há brief de planejador. Sem place-finder/event-finder, sem tabela "Imagens por seção" obrigatória (adicione se `travel-image-sourcing` rodou; se não, deixe de fora — o build nunca força imagem). Biblioteca de subtítulos **aberta**: para "Dinastia" pode ser um `##` por dinastia relevante ou por período; para "Etnias" um `##` por grupo étnico relevante ao roteiro; para "Geografia" um `##` por região física; para "Culinária" de província um `##` por prato/tradição. Nomeie o que fizer sentido para o tópico — não force um catálogo fixo.

**Total esperado por página: 2.000-4.000 palavras** (menor que atração/cidade porque é um só tópico, não um dossiê completo do lugar todo) — ainda assim profundidade real de livro, não resumo de enciclopédia.

## O que muda em relação a `travel-magazine-writer` (o resto vale igual — leia lá)

Reaproveite de [[travel-magazine-writer]], sem reescrever aqui: voz e estilo, frases banidas, fidelidade aos fatos (`[VERIFICAR: ...]` quando incerto, nunca inventar), múltiplos parágrafos por seção. A diferença é só:

- **Não personalize por viajante/data** — este não é o ângulo lugar×viajante×data do resto do pipeline. O ângulo aqui é **lugar×roteiro real**: sempre que possível, ancore o conteúdo geral nas paradas que o viajante de fato visita (ex.: a seção de "Dinastias" da China deveria mencionar explicitamente a dinastia Ming quando o roteiro passa pela muralha Ming de Xi'an; "Etnias" deveria citar o povo Hui se o Bairro Muçulmano de Xi'an está no roteiro). **Nunca escreva um texto de enciclopédia genérico que serviria a qualquer guia de viagem da China** — isso é o mesmo defeito de genericidade do resto do pipeline, só que disfarçado de "é conteúdo de referência, não precisa ser específico". Antes de escrever, releia os arquivos de `pesquisa/cidades/*.md` e `pesquisa/atracoes/*.md` do mesmo país/província para saber o que de fato conectar.
- **Fatos exigem mais rigor, não menos** — dinastias, datas, população de etnias, geografia: são afirmações verificáveis. Quando não tiver certeza (data exata, número, ortografia de nome), use WebSearch para checar antes de afirmar, ou marque `[VERIFICAR: ...]`. Não há `travel-place-finder`/`travel-event-finder` para apoiar aqui — a responsabilidade de checar é sua, direto.
- **Sem módulos mandatórios fixos** — não existe "roteiro hora a hora" nem "o que está acontecendo" aqui (isso é de cidade). A única estrutura fixa é Abertura + Encerramento; o meio é 100% biblioteca aberta por tópico.

## Processo

1. Confirme `slug` do país/província e `topico` antes de escrever (evite arquivo solto sem front matter combinando).
2. Releia as páginas de cidade/atração do mesmo país/província já escritas, anotando o que o roteiro realmente visita e que se conecta ao tópico.
3. Escreva o front matter completo primeiro.
4. Escreva **uma seção por invocação**, na mesma disciplina de [[travel-page-assembler]] (mesmo aqui sendo mais leve, a fragmentação por módulo é o que garante profundidade — não escreva a página inteira de uma vez).
5. Monte o arquivo final (front matter + `# Título` + seções na ordem) em `pesquisa/aprofundamento/paises/<slug>/<topico>.md` ou `pesquisa/aprofundamento/provincias/<slug>/<topico>.md`.
6. Rode `node build/build.js` na raiz do repo e confirme: (a) nenhum erro novo em `validate.js`; (b) o tópico aparece na prateleira "Aprofunde" da página do país/província (`content/aprofundamento/pais/<slug>/index.html` ou `.../provincia/<slug>/index.html`); (c) abra `#aprofundamento/pais/<slug>/<topico>` num servidor local e confirme que renderiza em seções navegáveis, não uma rolagem só.

## Revisão

Use [[travel-content-reviewer]] normalmente para especificidade/clichês/fidelidade às fontes (itens 5-9 daquela skill se aplicam igual) — só ignore os itens que citam o brief de cidade/atração (módulos mandatórios, place-finder/event-finder, ângulo lugar×viajante×data), que não existem aqui.
