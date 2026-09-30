# `pesquisa/_pipeline/` — material de referência condensado, feito para reduzir custo

Esta pasta não é conteúdo do guia (o build ignora tudo aqui, só varre `cidades/`, `atracoes/` e `aprofundamento/`). É material de apoio para quem orquestra a geração de uma página.

**Por que existe**: medimos o custo real de gerar uma página de cidade completa (ver retrospectiva em `pesquisa/_pipeline/CUSTO-CHONGQING.md`) e o maior driver de custo não era pesquisa — era o orquestrador reler, em cada um dos ~21 turnos de uma execução, o `CLAUDE.md` inteiro + a página-modelo inteira (~14.000 palavras) que tinham sido carregados no início. Esse custo cresce mais que proporcionalmente ao número de turnos. `CHEATSHEET.md` e `GOLD-STANDARD-DIGEST.md` carregam só o que um orquestrador precisa saber para executar 1 página, na fração do tamanho.

- **`CHEATSHEET.md`** — ordem do pipeline, regras de execução (síncrono, paralelismo, protocolo de handoff por arquivo), schema de front matter. Leia isto em vez do `CLAUDE.md` inteiro ao orquestrar uma página específica.
- **`GOLD-STANDARD-DIGEST.md`** — amostra de voz, esqueleto de módulos, pisos de palavra, template de front matter — extraído de Xi'an/Terracota. Leia isto em vez das páginas-modelo inteiras.

`CLAUDE.md` e as páginas-modelo completas continuam sendo a fonte da verdade para humano e para auditoria de qualidade — não foram encurtados, só deixaram de ser lidos por padrão em toda execução de página.
