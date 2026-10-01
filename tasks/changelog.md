# Histórico de entregas

## 2026-10-01

- Projeto clonado de https://github.com/arcs002/roteiro_china_japao na pasta `C:\dev\pessoal\roteiro_china_japao`, branch `main`.
- Diretório `pesquisa/_revisao/ab-test` disponível, incluindo `artefatos`, `candidatos`, `RUBRICA.md` e `TesteABClaude.md`.
- Sincronização verificada no commit `d8de411c19ce21847fe0cb1c717d65e3f5c794d5`.
- Registros locais de tarefas criados conforme as instruções globais; nenhum commit ou push realizado.

### Experimento A/B no Codex

- Executado o mesmo prompt em GPT-6 Astra, GPT-5.6 Sol, GPT-6.1 Sol e GPT-5.6 Terra, com raciocínio medium e quatro branches/worktrees a partir de `d8de411`.
- Astra, GPT-5.6 Sol e Terra executados pelo Codex CLI 0.155.1; GPT-6.1 Sol executado por subagente nativo após recusa HTTP 400 do endpoint CLI. Exceção de ferramenta documentada.
- Textos preservados sem reescrita pelo orquestrador. Somente `pesquisa/aprofundamento/paises/china/etnias.md` alterado em cada branch.
- Auditoria independente: 3.979 / 3.981 / 4.675 / 2.916 palavras, respectivamente; todos os builds aprovados com os mesmos 21 avisos da base, nenhum link interno inexistente detectado, front matter preservado e navegação verificada no navegador nos quatro candidatos.
- Hashes distintos e zero parágrafos longos idênticos entre pares. Pisos por seção não atendidos em três seções do GPT-5.6 Sol e seis do Terra, mantidos como evidência do teste.
- Logs, prompts, procedência, métricas, patches e cópias dos candidatos em `pesquisa/_revisao/ab-test/codex-2026-10-01/`. Relatório no formato de referência em `pesquisa/_revisao/ab-test/test-ab-codex.md`; notas e ranking reservados para avaliação posterior.
- Commits locais dos candidatos: Astra `cf465d8c`, GPT-5.6 Sol `4098a32f`, GPT-6.1 Sol `d02703f5`, Terra `654fe24f`. Quatro worktrees limpos, todos com apenas o arquivo autorizado alterado em relação à base.
- Relatório conferido com 30 links locais válidos, cópias A–D preparadas para futura avaliação cega e servidores temporários encerrados. Nenhum push realizado.

### Publicação solicitada

- Preparado o envio de 53 arquivos novos (relatório, candidatos, logs, métricas, prompts e scripts) e das quatro branches de candidatos para `origin`.
- JSON/JSONL validados e `main` confirmada como alinhada com o remoto antes do commit de publicação.
- Convite de colaboração de `arcs002` aceito para `mattusca` no repositório solicitado; acesso de escrita confirmado após a recusa inicial por falta de permissão.
- Publicados os 53 arquivos no commit `3bc7e87` de `main` e as quatro branches `ab/codex-*-etnias`, sem mesclar os candidatos em `main`.
- Confirmada por `git ls-remote` a igualdade dos commits locais e remotos nas cinco branches.

### Avaliação comparativa unificada

- Reavaliados os sete textos históricos (Claude Code/Copilot) e os quatro Codex com a rubrica v2 inalterada. Onze textos distintos; Terra/Copilot histórico registrado como duplicata de autoria incerta, sem nota independente.
- Extração mecânica e seleção de 426 unidades únicas (435 ocorrências), com prioridade às armadilhas e números e amostra determinística adicional por candidato. Após checagem e auditoria: 238 corretas, 21 incorretas, 87 incertas e 80 não factuais, com fontes e denominadores publicados.
- Três verificadores temáticos e auditor independente: todos os 27 erros iniciais reabertos, mais 12 unidades amostradas. Oito ajustes documentados, sem apagar os registros originais.
- Repetidos `wc -w`, build, checagem de links e o verdadeiro `.claude/skills/travel-final-review/scripts/audit.mjs` em base comum isolada. Onze builds aprovados, 21 avisos preexistentes e nenhum novo; front matters preservados, sem links internos quebrados. Corrigida a informação anterior de que `audit.mjs` não existia.
- Avaliadores Haiku 4.5 e GPT-6 Sol, sem nomes dos candidatos. Primeira passagem em contexto conjunto descartada por citações inexatas. Pontuação definitiva em 22 sessões novas, uma por texto/avaliador, com pacotes idênticos por candidato e banco de citações literais. Reparos estritamente sintáticos de JSON registrados; notas e justificativas preservadas.
- Validados 154 conjuntos de nota, justificativa e citação, sete dimensões por texto/avaliador; somas, faixas D1, tetos e hashes conferidos. Nenhuma divergência por dimensão superior a dez; Sonnet apresenta diferença total de 11, sinalizada sem inventar regra de arbitragem.
- Relatório `pesquisa/_revisao/ab-test/test-ab-unified.md`: Astra/Codex e GPT-6.1 Sol/Copilot empatam em 95,5. O resultado Copilot é ressalvado pela sobreposição de 33 parágrafos com GPT-5.6 Sol/Copilot. Notas históricas separadas das novas; limitações de seção e amostragem mantidas explícitas.
- Candidatos, arquivo de produção e rubrica mantidos intactos. Artefatos, respostas brutas, fontes, auditorias, scripts e protocolo da rodada em `pesquisa/_revisao/ab-test/unified-2026-10-01/`; página de entrada em `ab-test/readme.md`.
