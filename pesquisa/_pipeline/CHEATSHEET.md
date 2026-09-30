# Cheatsheet do pipeline (leia isto, não o CLAUDE.md inteiro, ao orquestrar 1 página)

> Este arquivo existe por custo, não por preguiça. Ver `pesquisa/_pipeline/README.md` para a razão.
> Se algo aqui for ambíguo para o seu caso específico, aí sim abra o `CLAUDE.md` completo — mas isso deve ser exceção, não rotina.

## Ordem do pipeline (Cidade/Atração)

`travel-content-planner` → (`travel-place-finder` / `travel-event-finder`, conforme módulos do brief) → `travel-image-sourcing` → `travel-brief-validator` → **1 `travel-writer` por módulo aprovado** → montagem do arquivo final → `travel-reviewer` → salvar.

Aprofundamento (país/província) usa `travel-deepdive-writer` em vez disso — mais leve, sem place/event-finder.

## Regra de execução nº 1: toda chamada ao Agent tool é síncrona

Sempre `run_in_background: false`. Chamadas em background para sub-agentes deste pipeline já quebraram execuções (o orquestrador para e não é notificado quando o filho termina).

## Regra de execução nº 2: gestão ativa de contexto (é aqui que o custo vive)

**O custo real escala com o número de turnos reais de API** (cada chamada de ferramenta — mesmo uma isolada como `mkdir` ou um `Read` solto — relê todo o contexto acumulado até ali). Uma medição real comparando duas cidades (`pesquisa/_pipeline/CUSTO-CHONGQING.md`/`CUSTO-FENGHUANG.md`/`PLANO-V3.md`) confirmou isso e corrigiu uma hipótese errada da v2 deste cheatsheet: **fazer sub-agentes de disparo único (como `travel-writer`) escreverem em arquivo em vez de devolver texto piorou o custo** (quase dobrou os turnos deles) — o turno extra de "escrever + confirmar" custou mais do que economizava. A regra certa:

1. **Sub-agentes de disparo único devolvem o texto/resultado direto na resposta** (`travel-writer`, `travel-brief-validator`, `travel-reviewer`) — nunca usam `Write` para persistir seu próprio trabalho. Quem chama é responsável por persistir, em lote, o que recebeu.
2. **Sub-agentes chamados 1x por página cujo resultado É conteúdo final** (`travel-place-finder`, `travel-event-finder` — os achados vão para a seção "Lugares reais pesquisados" de qualquer forma) **persistem eles mesmos**, porque aqui o turno extra de `Write` é pago só 1x e evita relatar tudo de volta em prosa.
3. **Dispare chamadas independentes na MESMA mensagem, sempre.** `travel-place-finder`+`travel-event-finder` juntos; leituras de arquivo de referência todas juntas (1 mensagem, N `Read`); `travel-writer` em lotes de 3-4. Isso corta turnos de verdade.
4. **Toda etapa de várias partes mecânicas é UM comando, não uma sequência**: montagem final do arquivo = 1 comando Bash (não N `Read`/`Edit`); correções pós-revisor = 1 reescrita completa (`Write`), não N `Edit` pontuais (exceto quando é literalmente 1 ponto isolado); verificação de N URLs de imagem = 1 loop `for` num único `curl`, não N chamadas de `curl`.
5. **Leia os digests condensados abaixo, não os documentos inteiros**, para calibrar formato/tom/profundidade.

## Protocolo de handoff (v3 — devolver texto para disparo único, persistir em lote)

- **`travel-writer`**: devolve o texto do módulo na resposta (markdown puro). O orquestrador persiste cada LOTE recebido (3-4 módulos) com UMA operação de arquivo (heredoc/Write cobrindo todos os arquivos do lote de uma vez), em `pesquisa/_rascunhos/<slug-da-página>/<NN>-<slug-do-módulo>.md`.
- **`travel-place-finder` / `travel-event-finder`**: persistem os achados completos (nome, tags CONFIRMADO/PROVÁVEL/NÃO CONFIRMADO, fonte) direto na seção "Lugares reais pesquisados" / "Eventos pesquisados" do arquivo-fonte da página, usando Write/Edit. Devolvem ao orquestrador só uma lista curta (nome — tag, 1 por linha).
- **`travel-image-sourcing`**: processo em 2 rodadas em lote (busca de todos os módulos numa mensagem, verificação de todas as URLs num único comando) — não 1 busca+verificação por imagem. Escreve a tabela final de uma vez (1 `Write`), devolve só a lista final + pendências. Para páginas com 8+ módulos com imagem, considere 2 agentes em paralelo.
- **`travel-brief-validator` / `travel-reviewer`**: devolvem veredito estruturado (é o produto deles) de forma econômica — tabela PASS/FAIL + o que falta, sem reescrever parágrafos inteiros de volta.
- **Montagem final**: 1 comando Bash que concatena `pesquisa/_rascunhos/<slug>/*.md` na ordem certa com front matter/blockquote/tabela final, direto para o arquivo de destino. Depois, apague a pasta de rascunho.

## Front matter obrigatório (schema completo em `pesquisa/README.md`)

```yaml
---
type: city | atracao          # obrigatório
slug: <slug>                   # obrigatório
title: "<Nome> — <tagline>"     # obrigatório — build separa por " — " pro hero
emoji: "🏛️"
order: <n>
days: [n, n, ...]
city: <slug-da-cidade-mãe>      # só atracao
provincia: <slug>               # só city, opcional
pais: china | japao
region: "<Região>, <País>"
---
```

## Convenção de arquivo

`<slug>.expandido.md` na mesma pasta do `<slug>.md` original — o build prefere `.expandido.md` quando os dois existem. Nunca apagar o `.md` original (ele guarda os achados persistidos de pesquisa).

## Formato do corpo

`# Título` → blockquote `> **Brief usado (travel-content-planner, aprovado):** ...` → `---` → `## <Módulo>` por seção → fecha com `## Lugares reais pesquisados` e `## Imagens por seção — pesquisadas` (cabeçalhos filtrados do lado do leitor, não aparecem no site).

## Módulos mandatórios de CIDADE (nunca omitidos, nunca fundidos)

**Roteiro hora a hora** e **"O que está acontecendo"** — mesmo quando o tempo útil é curto (aí a profundidade cai, mas a seção existe) ou quando nenhum evento pontual foi encontrado (aí a seção é feita das camadas sazonais).

## Pisos de palavra (ver tabela completa em `pesquisa/_pipeline/GOLD-STANDARD-DIGEST.md`)

Atração ALTA: 5.000-8.000 palavras totais. Cidade ALTA: 8.000-14.000 (com roteiro hora a hora). Profundidade MÉDIA/BAIXA escala proporcionalmente ao tempo útil real — não é defeito ficar mais curto quando a parada é curta.
