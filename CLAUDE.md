# CLAUDE.md

Guia para o Claude Code trabalhando neste repositório. **Substitui integralmente a versão anterior deste arquivo**, que descrevia por engano um projeto diferente (um guia EUA/Canadá que vive em `~/Downloads/guia_usa_canada_2026`, não aqui).

## O que este repositório é

Guia de viagem, em Português brasileiro, para uma viagem solo de ~29 dias por **China + Japão (Kyushu)**, 30/10–29/11/2026. O site final é uma SPA hash-routed hospedada em servidor web estático (não mais single-file — ver "Arquitetura do site" abaixo), com design system editorial `.mag` e cache agressivo (imagem via IndexedDB + páginas via Service Worker) para minimizar consumo de dados em roaming, que continua sendo requisito essencial mesmo fora do modelo single-file original.

`guia.html` e `guia.html*.bak`, na raiz do repo, **pertencem ao guia irmão EUA/Canadá** (`~/Downloads/guia_usa_canada_2026`) — não são deste projeto, só ficaram aqui como referência de arquitetura de template `.mag` durante a refatoração. Não editar; considerar mover para fora do repo.

**Ambição de escala**: o resultado final deve ser um "livro" de centenas de páginas — cada cidade/atração é um capítulo de profundidade real (milhares de palavras), não um resumo de blog. Isso é requisito explícito do usuário, reforçado várias vezes depois de reprovar versões mais curtas.

**Segundo objetivo, igualmente importante**: construir um conjunto de **skills e agentes reutilizáveis** para produzir conteúdo de viagem personalizado em qualquer guia futuro, não só este. Toda a arquitetura abaixo foi desenhada para isso — generalize ao editar, não hardcode para "Xi'an" ou "China".

## Arquitetura do pipeline de conteúdo

O conteúdo de cada página (cidade ou atração) passa por um pipeline de skills/agentes, cada um com um trabalho bem definido — **não existe mais uma skill monolítica "escreva a página"**, isso foi tentado e reprovado repetidamente por produzir conteúdo raso e genérico.

### Ordem do pipeline

1. **Perfil do viajante** (`pesquisa/perfil-viajantes.md`) — lido antes de qualquer planejamento. Contém quem viaja, interesses reais em ordem de prioridade (com exemplos concretos de calibração, não categorias abstratas), o que evitar, calibração de tourist-trap, datas reais por trecho + estação + **tempo útil real** (uma parada de escala não recebe a mesma profundidade que 3 dias inteiros, mesmo que o lugar seja objetivamente rico). **Sem esse perfil rico, não personalize — sinalize a ausência.**
2. **`travel-content-planner`** (skill+agente) — orquestrador. Decide o ângulo único (cruzamento lugar×viajante×data, não "o que é objetivamente único no mundo"), delega pesquisa e seleção de módulos, valida o brief.
3. **`travel-section-selector`** (skill) — motor de classificação/profundidade/seleção de módulos, a partir de uma **biblioteca aberta** (não uma lista fixa igual para toda página). Guardrails registrados: nunca descartar vida noturna por suposição; gastronomia/compras/vida noturna sempre com lugares reais nomeados, nunca só categoria; **day summaries** e **"o que está acontecendo"** (eventos/festivais/feriados/atividades sazonais nas datas exatas da visita) são **ambos mandatórios** para páginas de cidade, nunca opcionais nem absorvidos em outro módulo — ver seção "Arquitetura de dias" abaixo para a nova distinção city page (day summary) vs. day page (hora-a-hora); "o que está acontecendo" nunca fica vazio: sem festival pontual encontrado, a seção é montada com feriados/clima/safra/luz do dia daquela janela; módulos de "segredo local" exigem **mínimo 3-4 lugares distintos**, nunca um só esgotado em profundidade; profundidade depende de 3 fatores (complexidade do lugar × peso para o viajante × tempo útil real disponível).
4. **`travel-place-finder`** / **`travel-event-finder`** (skill+agente cada) — pesquisa real via WebSearch/WebFetch, nunca inventam nome de lugar/evento. Classificam achados como CONFIRMADO/PROVÁVEL/NÃO CONFIRMADO com fonte, e essas tags **precisam ser preservadas na prosa final**, nunca apresentadas como certeza. Achados são persistidos no próprio arquivo de pesquisa da cidade/atração (seção "Lugares reais pesquisados") para rastreabilidade — nunca ficam só na conversa. `travel-event-finder` busca em três camadas (eventos pontuais anunciados, feriados/datas cívicas, atividades/fenômenos sazonais recorrentes) para alimentar a seção mandatória "o que está acontecendo" — sem festival pontual, a seção ainda existe com o que sobrar das outras duas camadas.
5. **`travel-image-sourcing`** (skill+agente) — prioriza fotos reais de blog de viagem, cai para Unsplash/Pexels quando direito de uso/CORS for incerto, nunca Wikimedia Commons (histórico de bloqueio de hotlink neste projeto). MCP `stock-images` (Pexels, chave em `.mcp.json`) já configurado — precisa aprovação numa sessão interativa (`claude mcp list` mostra "pending approval" até isso acontecer).
6. **`travel-brief-validator`** (skill+agente) — valida o BRIEF antes de qualquer prosa: personalização real (não decorativa), guardrails seguidos, lugares/eventos checados, ângulo específico.
7. **`travel-page-assembler`** (skill, sem agente próprio — executada pelo orquestrador principal) — **uma invocação de `travel-writer` por módulo do brief, nunca uma única invocação para a página inteira**. Isso é a correção mais importante do pipeline: escrever tudo de uma vez produz parágrafos curtos mesmo com metas de tamanho generosas; dividir por módulo é o que garante profundidade real de livro.
8. **`travel-magazine-writer`** (skill, usada pelo agente `travel-writer`) — pisos de tamanho por módulo (não tetos): abertura ~300-550, história/retrato geral ~900-1.800, módulos de detalhe ~700-1.400, curiosidades/observação 5-8 itens de 80-180 palavras cada. **Day summary na city page: 400–600 palavras por dia** (não hora-a-hora — ver "Arquitetura de dias" abaixo). Hora-a-hora completo: ~1.800–3.500 palavras, vive no arquivo de dia, gerado pelo `travel-day-writer`. Página de atração em profundidade alta: 5.000-8.000 palavras. Página de cidade em profundidade alta: 8.000-14.000 palavras.
9. **`travel-content-reviewer`** (skill+agente) — valida o texto final montado contra o brief específico daquela página (não uma régua igual para todas). Máximo 2 rodadas antes de escalar ao usuário.

10. **`travel-final-review`** (skill + agente `travel-final-reviewer`) — revisão de fechamento do guia INTEIRO, não de uma página: fase 0 mecânica (`node .claude/skills/travel-final-review/scripts/audit.mjs`, config em `pesquisa/_pipeline/final-review.config.json` com paradas/hotéis/destinos removidos), fase 1 um agente por pacote de cidade em paralelo (corrige direto só Classe A: metalinguagem, tag vazada, clichê, PT-PT, jargão, dia da semana, divergência dia↔BRIEF-DIA), fase 2 agente transversal de roteiro (só reporta), consolidado em `pesquisa/_revisao/REVISAO-FINAL.md`. Snapshot `tar` obrigatório antes (repo sem git).

**Este pipeline (passos 1-9) é só para Cidade/Atração.** Para a área de Aprofundamento (país/província), use **`travel-deepdive-writer`** (skill, sem agente próprio) — processo mais leve, feito depois que o site já tinha sido construído e essa área não existia no desenho original: sem place-finder/event-finder, sem eixo lugar×viajante×data (é conteúdo de referência, não amarrado a uma visita datada), mas com a mesma disciplina de front matter obrigatório e uma seção por invocação. Ver o SKILL.md dela para o schema de front matter (`type: pais|provincia`, `slug`, `topico`, `title`, `order`) e a estrutura esperada (Abertura + tópicos livres + Encerramento).

### Arquitetura de dias: city page summary → day page hora-a-hora

**Esta é a mudança mais importante de arquitetura feita após a produção de Chongqing.**

A city page **não contém hora-a-hora**. Ela contém day summaries — um por dia — que são simultaneamente o overview para o leitor e o brief para gerar o hora-a-hora completo em arquivo separado.

**Estrutura do `## Dia N` na city page:**
```markdown
## Dia N — [Título narrativo que captura o tema]

[400–600 palavras: arco do dia, lógica de timing, por que cada atividade no horário que está]

> **Sequência:** [lista compacta com horários aproximados]
> **Logística:** [modal principal, custo estimado]
> **Ponto de partida:** [bairro/local]

<!--BRIEF-DIA
ARCO: ...
PARTIDA: ...
BLOCOS: (um por atividade com horários e modal)
ALMOÇO: ...
JANTAR: ...
RETORNO: ...
CUSTO: ...
FLAGS: ...
-->
```

**Pipeline completo — loop com validação:**

```
[atrações da cidade + N dias + perfil]
          ↓
travel-itinerary-builder  ← PONTO DE ENTRADA para nova cidade
  ├── draft: quais atrações em qual dia
  ├── travel-day-validator (Modo 1) → D1 temporal, D2 geo, D3 energia, D4 tema, D5 cross-day, D6 perfil
  ├── ajusta (move/corta/reordena) — máx 3 iterações
  └── produz: pesquisa/dias/00-cidade-assignment.md (validado)
          ↓ (em paralelo, um por dia)
travel-day-planner
  ├── travel-day-logistics (golden windows, modais, buffers)
  ├── escreve ## Dia N (400–600w narrativo + <!--BRIEF-DIA-->)
  └── travel-day-validator (Modo 2, auto-check) → aprovado antes de entregar
          ↓ (em paralelo, um por dia)
travel-day-writer
  └── gera pesquisa/dias/NN-cidade-dia-N.md (hora-a-hora, 1800–3500w)
          ↓
build → #day/N no browser
```

**Skills sem agent próprio (chamadas internamente):**
- `travel-day-logistics` — motor de restrições: golden windows por tipo de atividade, estimativas de deslocamento por modal, buffers obrigatórios
- `travel-day-validator` — validação em dois modos: Modo 1 = assignment multi-dias (usado pelo builder no loop), Modo 2 = dia único (auto-check do planner)

**Retroalimentação:** o brief `<!--BRIEF-DIA-->` no arquivo da cidade é o que garante coerência entre o overview (city page) e o detalhe (day page). Nunca gere hora-a-hora sem esse brief como input.

**Páginas de Chongqing (estado atual):** os `## Roteiro hora a hora — Dia N` existentes precisam ser convertidos para o novo formato. Use `travel-itinerary-builder` para gerar o `00-chongqing-assignment.md` a partir das atrações existentes, depois `travel-day-planner` por dia.

### Referência de resultado (gold standard atual)

- `pesquisa/cidades/02-xian.expandido.md` (~12.700 palavras) e `pesquisa/atracoes/exercito-terracota.expandido.md` (~7.150 palavras) são as duas páginas-modelo aprovadas neste pipeline completo, incluindo roteiro hora a hora mandatório e módulo de "segredo local" com múltiplos lugares. **Use-as como referência de profundidade e formato ao produzir a próxima página**, não os `tpl-page-ybor_city`/`tpl-city-tampa` do guia EUA/Canadá (esses são só referência de arquitetura de template HTML `.mag`, não de profundidade de conteúdo).

### Gestão de contexto/custo do pipeline (obrigatória, não opcional)

Duas medições reais (Chongqing → Fenghuang, ver `pesquisa/_pipeline/CUSTO-CHONGQING.md`/`CUSTO-FENGHUANG.md`/`PLANO-V3.md`) mostraram que **o custo escala com o número de turnos reais de API** (cada chamada de ferramenta, mesmo uma isolada, relê todo o contexto acumulado até ali) — não com "quanto se lê no início". A primeira rodada de otimização (v2) chegou nisso por um caminho errado: fazer `travel-writer` escrever em arquivo em vez de devolver texto **piorou** o custo dele (turnos quase dobraram), porque um turno extra de "escrever + confirmar" custa mais, numa tarefa de disparo único, do que a economia que gera em quem chama. A regra corrigida (v3):

- **Orquestradores leem `pesquisa/_pipeline/CHEATSHEET.md` + `GOLD-STANDARD-DIGEST.md`** (não o CLAUDE.md inteiro nem a página-modelo inteira) — **numa única mensagem com múltiplos `Read` em paralelo**, não um por turno.
- **Sub-agentes de disparo único devolvem texto direto** (`travel-writer`, `travel-brief-validator`, `travel-reviewer`) — quem chama persiste em lote o que recebeu, não módulo a módulo.
- **Sub-agentes cujo resultado É conteúdo final persistem eles mesmos** (`travel-place-finder`, `travel-event-finder` — os achados vão para "Lugares reais pesquisados" de qualquer forma).
- **Chamadas independentes sempre na mesma mensagem, em lote** — leituras iniciais, `travel-place-finder`+`travel-event-finder`, `travel-writer` em lotes de 3-4.
- **Toda etapa mecânica de várias partes é 1 comando, não uma sequência** — montagem final = 1 Bash; correções pós-revisor = 1 reescrita; verificação de N imagens = 1 loop num único `curl`.

Ver detalhe completo em `pesquisa/_pipeline/README.md` e `PLANO-V3.md`. Isso não muda o padrão de qualidade/profundidade exigido — muda só como o contexto circula entre as etapas.

## Arquitetura do site (build determinístico, "quase-CMS")

`pesquisa/**/*.md` é a fonte da verdade. Um build em Node (zero dependências) converte cada página num fragmento HTML consumido por uma SPA — nada de conteúdo embedado à mão num único arquivo, nada de UI de edição em runtime.

```
site/            shell da SPA, mantido à mão: index.html, style.css (.mag), app.js (router+cache), sw.js
build/           scripts do build — node build/build.js gera dist/ a partir de pesquisa/**
  build.js         orquestrador (valida → registry → renderiza cada página → copia site/ para dist/)
  build-registry.js  agrega front matter de todas as páginas → content/registry.json (substitui ROUTES/GUIDE/DAY_INFO/CITY_INFO manuais)
  render-page.js / render-modules.js   monta o fragmento .mag de cada página; biblioteca de módulo ABERTA (1 renderer genérico + poucos especiais por regex de cabeçalho, ex. "Abertura")
  validate.js      checagens estruturais (slugs cruzados, duplicidade) — erro aborta o build, pendência só avisa
  migrate-frontmatter.js   script one-off já executado (preencheu front matter em todo pesquisa/cidades e pesquisa/atracoes a partir do README)
  lib/frontmatter.js, lib/markdown.js, lib/imagematch.js   parsers de apoio
dist/            GERADO — nunca editar, nunca commitar por cima à mão (rodar o build de novo)
```

**Front matter obrigatório** no topo de cada `.md` em `pesquisa/` (a prosa/módulos `##` abaixo não mudam nada do que `travel-writer` já produz) — ver exemplo completo e regras em `pesquisa/README.md`. Só `type`/`slug`/`title` são obrigatórios; o resto (`emoji`/`region`/`provincia`/`pais`) `validate.js` avisa sem quebrar o build quando falta.

**Cada página vira uma pasta, não um arquivo único**: `render-page.js` nunca concatena todos os módulos `##` numa rolagem só (isso ficava "linguição" — reprovado). A rota base (`city/xian`) é um **índice** (hero + grade de cards, 1 por seção, com teaser) e cada módulo ganha seu próprio arquivo/rota (`city/xian/retrato-geral`, `city/xian/dia-2` — slug de seção com "Dia N" no cabeçalho vira `dia-N` estável, o resto é slugify do próprio cabeçalho), com paginação "seção anterior/próxima" cravada no HTML em build time (zero lógica de paginação no cliente). Cabeçalhos de bastidor de pesquisa (`Imagens...`, `Fontes`, `Lugares reais pesquisados`) são filtrados do lado do leitor, não viram seção.

**4ª área — Aprofundamento** (além de Cidade/Dia/Atração): `pesquisa/aprofundamento/paises/<pais>/<topico>.md` e `pesquisa/aprofundamento/provincias/<provincia>/<topico>.md`. País é o hub (mostra seus tópicos + uma prateleira "províncias visitadas"); província é sub-item, alcançado a partir do país ou da cidade (`provincia:` no front matter da cidade alimenta um rail de contexto histórico na página da cidade). `topico` é slug livre — biblioteca aberta, o mesmo princípio dos módulos de conteúdo. Exemplo já criado e verificado ponta a ponta: `pesquisa/aprofundamento/paises/china/historia.md`.

Rotas: `city/<slug>`, `day/<n>` (página fina, auto-gerada do registro — o roteiro hora a hora completo mora na página da cidade, não duplicado aqui), `atracao/<slug>` (renomeado do antigo `page/<slug>` do guia irmão), `aprofundamento/pais/<pais>[/<topico>]`, `aprofundamento/provincia/<provincia>[/<topico>]`.

**Cache/offline**: `site/app.js` mantém o `ImgCache` (IndexedDB) idêntico ao guia irmão para imagens; `site/sw.js` é novo — cache-first para o shell e para `content/*.html`/`registry.json`, testado e confirmado funcionando 100% offline para páginas já visitadas (servidor derrubado, página renderiza do cache do Service Worker). Só a página visitada é baixada — menos dado gasto que o antigo modelo single-file, que baixava o guia inteiro de uma vez.

**Como rodar**: `node build/build.js` na raiz → gera `dist/`. Servir com qualquer servidor estático (`python3 -m http.server` dentro de `dist/` para testar local) e abrir `dist/index.html`.

## `pesquisa/voos.md` — âncora de calendário

Contém os horários reais de voo internacional (ida GRU→PKX, volta PVG→GRU). **A tabela de datas em `perfil-viajantes.md` já foi corrigida uma vez** por estar 2 dias adiantada em relação a esses voos reais — sempre ancorar datas em `voos.md`, nunca assumir calendário arredondado. `travel-itinerary-logistics` (skill+agente) existe para validar isso: identifica gaps/overlaps entre trechos, sugere horários de transição (regra padrão: preferir trem noturno/sleeper ou o último trem rápido do dia para preservar tempo útil diurno, nunca queimar luz do dia em deslocamento quando há alternativa noturna), avalia se o tempo por parada é proporcional, sugere paradas extras só quando há folga real — nunca decide mudança estrutural grande sozinha.

**Pendências abertas da última auditoria de roteiro** (não resolvidas, listadas em `perfil-viajantes.md`): confirmar se a transição Zhaoxing→Yangshuo é trem-bala diurno ou noturno (usuário escolheu noturno, já aplicado em `06-guizhou.md`/`07-yangshuo-guilin.md`); revisar se outras cidades (Chongqing, Zhangjiajie, Fenghuang, Guizhou, Yangshuo/Guilin, Shenzhen, Hong Kong, Kurokawa, Yufuin, Fukuoka) têm o mesmo tipo de inconsistência de horário entre arquivos adjacentes que Xi'an tinha — vale rodar `travel-itinerary-logistics` de novo antes de produzir conteúdo de cada uma.

## Estado atual / próximos passos

- ✅ Pipeline completo de skills/agentes construído e validado em 2 páginas (Xi'an cidade + Exército de Terracota atração).
- ✅ Perfil do viajante rico e real em `pesquisa/perfil-viajantes.md` — inclui bio, interesses calibrados por exemplo concreto, calibração de tourist-trap, tabela de datas/tempo-útil por trecho.
- ✅ Correção de calendário aplicada (voos reais ancorados).
- ✅ Arquitetura do site refatorada: build determinístico markdown → HTML (`build/`), shell da SPA em `site/`, front matter migrado em todo `pesquisa/cidades` e `pesquisa/atracoes`, nova área Aprofundamento com 1 página de exemplo, `dist/` gerado e verificado ponta a ponta no browser (incluindo offline via Service Worker). Ver seção "Arquitetura do site" acima.
- ⏳ **Pendente**: aplicar o pipeline de conteúdo (planner → place/event-finder → brief-validator → page-assembler/writer por módulo → reviewer) a cada uma das outras 10 cidades e ~40 atrações restantes — cada `.md` novo já sai com front matter desde o início (ver `pesquisa/README.md`).
- ⏳ **Pendente**: escrever o restante do conteúdo de Aprofundamento (`pesquisa/aprofundamento/paises/china/{dinastia,etnias,geografia}.md`, o mesmo conjunto para Japão, e `provincias/<slug>/{etnias,cidades,culinaria}.md` para cada província visitada — só `historia.md` da China existe até agora, como prova de conceito).
- ⏳ **Pendente**: revisar/ajustar à mão `emoji`/`region`/`provincia` no front matter migrado automaticamente (`build/migrate-frontmatter.js` usou um mapa de geografia geral só para não deixar em branco — não é pesquisa de viagem, vale checar).
- ⏳ **Pendente**: mover `guia.html`/`guia.html*.bak` (guia irmão) para fora deste repo.
- ⏳ **Pendente**: aprovar o MCP `stock-images` numa sessão interativa; considerar mandar a chave Unsplash também (multi-provider já suportado pelo mesmo MCP).
- ⏳ **Pendente**: rodar `travel-itinerary-logistics` nas demais transições do roteiro (ver pendências acima).

## Como retomar em uma sessão nova

1. Leia este arquivo (automático) e `pesquisa/perfil-viajantes.md` por completo.
2. Para a próxima cidade/atração a produzir, siga o pipeline da seção "Arquitetura" acima, na ordem — não pule a etapa de planejamento/pesquisa achando que "já sabe" o que a página precisa.
3. Ao escrever, sempre uma invocação de agente por módulo (`travel-page-assembler`), nunca a página inteira de uma vez. Todo `.md` novo precisa do front matter mínimo (ver "Arquitetura do site" e `pesquisa/README.md`).
4. Compare o resultado final, em extensão e profundidade, com as duas páginas-modelo citadas acima antes de considerar pronto.
5. Para ver a página no site, rode `node build/build.js` e sirva `dist/` (ex.: `python3 -m http.server` dentro de `dist/`).
