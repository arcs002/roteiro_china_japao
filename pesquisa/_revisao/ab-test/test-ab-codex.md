# Teste A/B de modelos — Codex · `aprofundamento/paises/china/etnias.md`

**Data:** 01/10/2026 · **Tarefa:** reescrever a página “China — Etnias” com `travel-deepdive-writer`, usando o mesmo prompt nos quatro modelos.

**Rubrica para avaliação posterior:** [RUBRICA.md](RUBRICA.md) (v2). **Artefatos desta rodada:** [codex-2026-10-01/](codex-2026-10-01/). **Referência de formato:** [TesteABClaude.md](TesteABClaude.md).

---

## 1. Resultado

**Quatro candidatos produzidos em branches independentes. Avaliação editorial pendente:** as linhas seguem a ordem solicitada, sem ranking nem notas inventadas. As notas do experimento anterior não foram reaproveitadas.

| Pos. | Letra | Modelo | Ferramenta | Palavras | Aval. 1 | Aval. 2 | **Média** | Leitura |
|---|---|---|---|---:|---|---|---|---|
| — | B | **GPT-6 Astra** | Codex CLI | 3.979 | Pendente | Pendente | **—** | Pronto para avaliação |
| — | C | **GPT-5.6 Sol** | Codex CLI | 3.981 | Pendente | Pendente | **—** | ⚠ pisos por seção (§4) |
| — | D | **GPT-6.1 Sol** | Codex · subagente nativo | 4.675 | Pendente | Pendente | **—** | Pronto para avaliação |
| — | A | **GPT-5.6 Terra** | Codex CLI | 2.916 | Pendente | Pendente | **—** | ⚠ pisos por seção (§4) |

Os avaliadores desta rodada ainda não foram definidos. Os cabeçalhos Haiku/Sonnet do exemplo representam avaliações históricas e não se aplicam automaticamente a estes textos.

## 2. Candidatos e branches

| Letra | Modelo | Branch | Commit | Texto e evidências |
|---|---|---|---|---|
| B | GPT-6 Astra | `ab/codex-gpt-6-astra-etnias` | `cf465d8c` | [Texto](codex-2026-10-01/gpt-6-astra/candidate.md) · [Diff](codex-2026-10-01/gpt-6-astra/candidate.patch) · [Resposta](codex-2026-10-01/gpt-6-astra/final-response.md) · [Build](codex-2026-10-01/gpt-6-astra/verified-build.log) |
| C | GPT-5.6 Sol | `ab/codex-gpt-5.6-sol-etnias` | `4098a32f` | [Texto](codex-2026-10-01/gpt-5.6-sol/candidate.md) · [Diff](codex-2026-10-01/gpt-5.6-sol/candidate.patch) · [Resposta](codex-2026-10-01/gpt-5.6-sol/final-response.md) · [Build](codex-2026-10-01/gpt-5.6-sol/verified-build.log) |
| D | GPT-6.1 Sol | `ab/codex-gpt-6.1-sol-etnias` | `d02703f5` | [Texto](codex-2026-10-01/gpt-6.1-sol/candidate.md) · [Diff](codex-2026-10-01/gpt-6.1-sol/candidate.patch) · [Resposta](codex-2026-10-01/gpt-6.1-sol/final-response.md) · [Build](codex-2026-10-01/gpt-6.1-sol/verified-build.log) |
| A | GPT-5.6 Terra | `ab/codex-gpt-5.6-terra-etnias` | `654fe24f` | [Texto](codex-2026-10-01/gpt-5.6-terra/candidate.md) · [Diff](codex-2026-10-01/gpt-5.6-terra/candidate.patch) · [Resposta](codex-2026-10-01/gpt-5.6-terra/final-response.md) · [Build](codex-2026-10-01/gpt-5.6-terra/verified-build.log) |

Base comum: `d8de411c19ce21847fe0cb1c717d65e3f5c794d5`. Os quatro worktrees começaram com o mesmo SHA-256 do arquivo original: `1197f94d3e23f1b0e0cfcb5721eb57231913f5a056f019e80b52f98a543ecb61`. Cada commit altera somente `pesquisa/aprofundamento/paises/china/etnias.md`. A versão de `main` permanece na base original; os registros do experimento estão reunidos nesta pasta para publicação no repositório.

| Modelo | SHA-256 do candidato (bytes originais) |
|---|---|
| GPT-6 Astra | `972120ef94e532a4f999727f4dfbcab30534593ec81399c8eb98f68ef4754c45` |
| GPT-5.6 Sol | `bd617fb39c002b299a1ffbecf4a13ea3414c7cdeecef54d46a8c109ec33cb56c` |
| GPT-6.1 Sol | `669ba0fa1214e4b5e7175838924e77fbedaf14f728bef4ccc55546137153b7c3` |
| GPT-5.6 Terra | `dd42a2906e7d02ba8bae1db056cb9eddbe4ac93ddfd03747401efd6c00763629` |

## 3. Método

1. Quatro branches e worktrees separados, criados do mesmo commit. Nenhuma execução recebeu o histórico desta conversa, o relatório anterior, suas notas ou textos candidatos anteriores.
2. Sparse checkout ocultou `pesquisa/_revisao/ab-test/` e `pesquisa/_backup/` de todos os candidatos. Instruções iguais proibiram consultar outros worktrees, branches ou resultados. Trata-se de isolamento de contexto e arquivos, não de uma barreira de segurança contra acesso deliberado ao restante do disco.
3. [Prompt integral](codex-2026-10-01/prompt.txt) idêntico, raciocínio `medium`. [Instruções comuns de execução](codex-2026-10-01/execution-instructions.txt) orientaram o uso da skill, o escopo de um único arquivo e a preservação do modelo em eventual delegação.
4. Astra, GPT-5.6 Sol e Terra rodaram no Codex CLI 0.155.1, com `web_search=live`, configuração pessoal ignorada e execução sem interação. Logs JSONL e respostas finais foram preservados.
5. **Exceção documentada:** o endpoint do CLI recusou GPT-6.1 Sol com HTTP 400 (“model is not supported when using Codex with a ChatGPT account”). A tentativa não alterou o candidato. O modelo foi então executado pelo subagente nativo do Codex, com `model=gpt-6.1-sol`, `reasoning_effort=medium`, histórico não herdado e o mesmo prompt no worktree reservado. O conjunto de ferramentas e as instruções de sistema diferem do CLI. [Registro](codex-2026-10-01/gpt-6.1-sol/native-execution.json).
6. Os resultados foram preservados como entregues pelos modelos. O orquestrador repetiu o build e mediu palavras, front matter, arquivos alterados, links internos e sobreposição de texto; não reescreveu os candidatos para melhorar notas.
7. Cópias neutras foram sorteadas como A–D em [blind-candidates/](codex-2026-10-01/blind-candidates/). Para uma futura avaliação cega, fornecer somente essas cópias, a rubrica e uma nova checagem factual; não fornecer este relatório nem o mapa de autoria.

O registro de eventos por `codex exec --json` segue o mecanismo descrito na [documentação oficial de avaliação de skills](https://developers.openai.com/blog/eval-skills). A disponibilidade efetiva foi comprovada pelas execuções locais, não inferida do catálogo.

## 4. Verificações mecânicas

| Critério | GPT-6 Astra | GPT-5.6 Sol | GPT-6.1 Sol | GPT-5.6 Terra |
|---|---:|---:|---:|---:|
| Palavras do corpo | 3.979 | 3.981 | 4.675 | 2.916 |
| Piso total ≥2.000 | OK | OK | OK | OK |
| Seções H2 | 7 | 8 | 7 | 7 |
| Front matter preservado | OK | OK | OK | OK |
| Abertura e Encerramento | OK | OK | OK | OK |
| Build: código de saída | 0 | 0 | 0 | 0 |
| Avisos totais / novos | 21 / 0 | 21 / 0 | 21 / 0 | 21 / 0 |
| Links internos inexistentes | 0 | 0 | 0 | 0 |
| Arquivos de fonte alterados | 1 | 1 | 1 | 1 |
| Seções abaixo do piso | 0 | 3 | 0 | 6 |
| Tags [VERIFICAR] | 0 | 0 | 0 | 0 |

**Contagem:** corpo sem front matter, dividido por espaços em branco; títulos, marcadores e URLs presentes no corpo entram na contagem, como em uma contagem mecânica de tokens separados por whitespace. A mesma implementação foi aplicada aos quatro arquivos, independentemente da contagem autorreportada. Detalhamento em [audit.json](codex-2026-10-01/audit.json).

**Pisos por seção:** 250 palavras para Abertura/Encerramento e 600 para cada seção temática, conforme a skill. Ultrapassar a faixa total esperada de 2.000–4.000 não é, por si só, falha: os pisos por seção continuam aplicáveis.

| Modelo | Seções abaixo do piso (medição independente) |
|---|---|
| GPT-6 Astra | Nenhuma |
| GPT-5.6 Sol | Antes dos nomes: etnia oficial, cultura regional e migração: 387/600; Zhuang: Guangxi para além do cenário cárstico: 565/600; Shenzhen: Hakka antigos, migrantes novos: 580/600 |
| GPT-6.1 Sol | Nenhuma |
| GPT-5.6 Terra | Tujia: a serra entre Chongqing e Xiangxi: 508/600; Miao e Tujia em Fenghuang: uma cidade, muitas camadas: 463/600; Zhuang: Guangxi não é somente um pano de fundo cárstico: 484/600; Minnan e diáspora: Xiamen olha para o mar: 457/600; Hakka e migrantes: Shenzhen como cidade de chegadas: 363/600; Encerramento: 223/250 |

As sete dimensões da rubrica — precisão factual, cobertura, profundidade, ancoragem, qualidade editorial, calibração e conformidade — permanecem sem pontuação. O build e a quantidade de palavras não substituem essa avaliação.

## 5. Integridade e independência

| Par | Parágrafos longos idênticos | Sobreposição de sequências de 8 palavras (Jaccard) |
|---|---:|---:|
| GPT-6 Astra × GPT-5.6 Sol | 0 | 0,11% |
| GPT-6 Astra × GPT-6.1 Sol | 0 | 0,54% |
| GPT-6 Astra × GPT-5.6 Terra | 0 | 0,01% |
| GPT-5.6 Sol × GPT-6.1 Sol | 0 | 0,13% |
| GPT-5.6 Sol × GPT-5.6 Terra | 0 | 0,01% |
| GPT-6.1 Sol × GPT-5.6 Terra | 0 | 0,19% |

Parágrafo longo = pelo menos 30 palavras, com espaços normalizados. A medida Jaccard usa sequências contíguas de oito palavras normalizadas. Hashes diferentes e baixa sobreposição ajudam a detectar cópias como as do teste anterior; não constituem prova absoluta de independência estatística ou ausência de influências comuns.

## 6. Avisos e anomalias de execução

O build original já produzia **21 avisos**: 15 avisos de metadados/referências (cinco arquivos de assignment sem título e dez referências a províncias sem página) e seis avisos de imagens não usadas nos módulos. [Lista completa](codex-2026-10-01/baseline-warnings.md).

- **GPT-6 Astra:** build aprovado; 21 avisos, 0 novos em relação à base.
- **GPT-5.6 Sol:** build aprovado; 21 avisos, 0 novos em relação à base.
- **GPT-6.1 Sol:** build aprovado; 21 avisos, 0 novos em relação à base.
- **GPT-5.6 Terra:** build aprovado; 21 avisos, 0 novos em relação à base.

O CLI também registrou avisos de infraestrutura sobre snapshots de PowerShell e, em Astra/Sol, acesso ao cache compartilhado de skills/plugins. A skill do projeto foi lida diretamente do worktree. Esses registros são distintos dos avisos do build e estão nos arquivos `stderr.log`. A recusa do GPT-6.1 Sol permanece preservada em seus logs de tentativa CLI.

## 7. Métricas de execução e limitações

| Modelo | Ferramenta | Duração da execução CLI | Buscas web concluídas no log principal | Tokens de entrada / cache / saída no turno principal |
|---|---|---:|---:|---|
| GPT-6 Astra | Codex CLI | 9min 8s | 6 | 2.072.298 / 1.951.872 / 13.005 |
| GPT-5.6 Sol | Codex CLI | 14min 48s | 7 | 6.052.265 / 5.873.664 / 27.218 |
| GPT-6.1 Sol | Codex · subagente nativo | Não medida de forma equivalente | Não medida de forma equivalente | Não disponível em formato equivalente |
| GPT-5.6 Terra | Codex CLI | 4min 31s | 2 | 537.379 / 472.320 / 12.251 |

- Uma tarefa e uma amostra por modelo. Não é um ranking geral de capacidade.
- A mudança de harness do GPT-6.1 Sol é um fator de confusão explícito: diferenças podem vir do modelo, das ferramentas ou das instruções de sistema.
- Duração inclui pesquisa, chamadas de ferramenta e esperas; houve execuções concorrentes. Tokens e buscas do log principal não são apresentados como custo total de uma árvore de subagentes. Custos monetários não foram estimados.
- Não houve revisão factual independente, dupla avaliação cega nem arbitragem nesta rodada. As referências incluídas nos candidatos ainda precisam de checagem editorial.
- Não foi encontrado `audit.mjs` no checkout. As verificações complementares desta rodada estão em `tasks/audit-ab-codex.cjs` e não devem ser confundidas com o auditor histórico citado no exemplo.

## 8. Próxima comparação

Usar os quatro arquivos neutros com a mesma rubrica e uma checagem factual nova. Fixar os avaliadores antes de abrir o mapa e registrar suas justificativas por dimensão. Somente depois preencher notas, médias e posições na tabela de resultado. Os resultados históricos podem entrar como outra rodada, com as diferenças de protocolo identificadas.

## 9. Reprodução e arquivos

- [Manifesto da execução](codex-2026-10-01/manifest.json): base, modelos, parâmetros, diretórios, horários e códigos de saída do CLI.
- [Prompt](codex-2026-10-01/prompt.txt) e [instruções comuns](codex-2026-10-01/execution-instructions.txt).
- [Auditoria mecânica](codex-2026-10-01/audit.json) e [mapa A–D](codex-2026-10-01/candidate-map.json).
- Em cada pasta de modelo: `candidate.md`, `candidate.patch`, `final-response.md`, `verified-build.log`, `metrics.json` e logs/procedência disponíveis.
- Worktrees em `.claude/worktrees/codex-<modelo>-etnias/`; versões preservadas nos commits da seção 2.

```powershell
node tasks/ab-status.cjs
node tasks/audit-ab-codex.cjs
node tasks/report-ab-codex.cjs
```

`tasks/run-ab-codex.cjs` preserva o comando de lançamento e impede sobrescrever a execução existente. Uma nova rodada precisa de outro diretório, outros nomes de branch e registro explícito da exceção GPT-6.1 Sol.
