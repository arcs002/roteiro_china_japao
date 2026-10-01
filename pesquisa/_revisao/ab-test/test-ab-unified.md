# Teste A/B unificado — China: Etnias

**Data:** 01/10/2026 · **Rubrica:** [v2, sem alteração](RUBRICA.md) · **11 textos distintos, 12 configurações declaradas.** Os sete candidatos anteriores e os quatro Codex foram avaliados novamente pela mesma dupla cega. As notas históricas não entram na média. Nenhum candidato foi reescrito nesta etapa.

## 1. Resultado

| Pos. | Modelo | Ferramenta | Média (Haiku / GPT-6 Sol) | Situação |
|---|---|---|---:|---|
| 1 | **GPT-6 Astra** | Codex CLI 0.155.1 | **95,5** (99 / 92) | Publicável com revisão mínima |
| 2 | GPT-5.6 Terra | Codex CLI 0.155.1 | **94** (97 / 91) | Publicável com revisão mínima |
| 2 | GPT-5.6 Sol ‡ | Copilot | **94** (95 / 93) | Publicável com revisão mínima |
| 4 | GPT-5.6 Sol | Codex CLI 0.155.1 | **93** (94 / 92) | Publicável com revisão mínima |
| 4 | GPT-6.1 Sol | Codex — subagente nativo | **93** (94 / 92) | Publicável com revisão mínima |
| 6 | Opus 5.5 | Copilot | **91,5** (94 / 89) | Publicável com revisão mínima |
| 7 | Opus 5.5 | Claude Code | **81** (83 / 79) | Bom; revisão de fatos/estilo |
| 8 | Gemini 3.8 Flash † | Copilot | **60** (63 / 57) | Rascunho; retrabalho |
| 9 | Fable 5.1 | Claude Code | **57,5** (60 / 55) | Reescrever |
| 10 | Sonnet 5.5 | Claude Code | **56,5** (62 / 51) | Reescrever ⚠ divergência total |

**Fora do ranking — Candidato histórico E/C06: 95,5 (97 / 94).** O usuário informou que não utilizou GPT-6.1 Sol no Copilot. O rótulo foi herdado do nome do arquivo e do relatório histórico, sem logs que comprovem essa atribuição. A nota pertence ao texto, não a uma execução confirmada dessa combinação. A nota histórica era 83,5 (Haiku 88 / Sonnet 79); a nova é 95,5 (Haiku 97 / GPT-6 Sol 94). O texto não mudou. GPT-6.1 Sol efetivamente executado no Codex é C11, com 93 pontos. O mapa original e os registros brutos foram preservados; a [correção de procedência](unified-2026-10-01/provenance-corrections.json) prevalece sobre o rótulo antigo.

Maior média nesta tarefa: **GPT-6 Astra — Codex CLI 0.155.1**, 95,5. Nenhuma divergência por dimensão ultrapassou os dez pontos definidos para arbitragem. Uma amostra por configuração não permite concluir superioridade geral nem significância estatística de diferenças pequenas.

‡ **GPT-5.6 Sol/Copilot e o candidato histórico E/C06, de autoria contestada, compartilham 33 parágrafos longos**; são variantes fortemente sobrepostas, não duas amostras independentes. Entre as quatro novas execuções Codex, Astra tem a maior média e cumpre todos os pisos de seção.

As faixas da tabela são a leitura numérica da v2, não uma dispensa dos requisitos da skill. Terra/Codex, apesar de 94 pontos, tem seis seções abaixo do piso; GPT-5.6 Sol/Codex tem três. As limitações de estrutura permanecem pendentes e aparecem em §5.

† **Gemini 3.8 Flash/Copilot e GPT-5.6 Terra/Copilot:** o registro anterior relata arquivos byte a byte idênticos e autoria incerta. O arquivo preservado foi avaliado uma única vez (C02, 60). A configuração Terra/Copilot fica incluída como **duplicata histórica sem autoria resolvida**, sem segunda posição ou nota independente. O arquivo duplicado não está disponível separadamente para uma nova conferência de hash. Isso não afeta a execução nova de Terra no Codex CLI.

## 2. Candidatos, preservação e independência

| ID cego | Modelo × ferramenta | Fonte preservada | SHA-256 (prefixo) |
|---|---|---|---|
| C01 | Opus 5.5 — Claude Code | [candidato](candidatos/etnias.D-opus-5.5-claude-code.md) | `b5b63b02ccf77727` |
| C02 | Gemini 3.8 Flash — Copilot | [candidato](candidatos/etnias.A-gemini-3.8-flash-copilot.md) | `c9f6c45dc1ae7b92` |
| C03 | Fable 5.1 — Claude Code | [candidato](candidatos/etnias.B-fable-5.1-claude-code.md) | `611d0c2fed45258c` |
| C04 | GPT-5.6 Terra — Codex CLI 0.155.1 | [candidato](codex-2026-10-01/gpt-5.6-terra/candidate.md) | `dd42a2906e7d02ba` |
| C05 | Opus 5.5 — Copilot | [candidato](candidatos/etnias.F-opus-5.5-copilot.md) | `35f2083224dfd4a3` |
| C06 | Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | [candidato](candidatos/etnias.E-gpt-6.1-sol-copilot.md) | `3feb72f88f4cad37` |
| C07 | GPT-5.6 Sol — Codex CLI 0.155.1 | [candidato](codex-2026-10-01/gpt-5.6-sol/candidate.md) | `bd617fb39c002b29` |
| C08 | Sonnet 5.5 — Claude Code | [candidato](candidatos/etnias.C-sonnet-5.5-claude-code.md) | `3baf4785b0ff4511` |
| C09 | GPT-5.6 Sol — Copilot | [candidato](candidatos/etnias.G-gpt-5.6-sol-copilot.md) | `d47c287f746a9ec4` |
| C10 | GPT-6 Astra — Codex CLI 0.155.1 | [candidato](codex-2026-10-01/gpt-6-astra/candidate.md) | `972120ef94e532a4` |
| C11 | GPT-6.1 Sol — Codex — subagente nativo | [candidato](codex-2026-10-01/gpt-6.1-sol/candidate.md) | `669ba0fa1214e4b5` |

- **Candidato histórico E/C06/Autoria e ferramenta não confirmadas e GPT-5.6 Sol/Copilot:** 33 parágrafos idênticos após normalização de espaços, entre parágrafos de pelo menos 30 palavras (45 e 47 no total). São textos diferentes, mas não amostras independentes. O relatório histórico registrava 35 com outro critério; a medição reproduzível desta rodada é 33.
- O original de master é referência, sem posição no ranking. Os candidatos, a rubrica e as branches de geração foram preservados.
- GPT-6.1 Sol/Codex foi gerado por subagente nativo após recusa do modelo no CLI; as outras três execuções Codex usaram CLI 0.155.1. Essa diferença de ferramenta impede atribuir todo efeito ao modelo.

## 3. Método e aplicação da rubrica

1. Sorteio de IDs C01–C11, hashes e [protocolo fixado antes da pontuação](unified-2026-10-01/protocol.md). O orquestrador conhece o mapa; pesquisadores e avaliadores trabalharam sem nomes, notas antigas ou relatórios de geração.
2. Inventário mecânico de sentenças com números ou nomes por heurística; prioridade às armadilhas e a todas as sentenças numéricas, mais dez sentenças por candidato selecionadas deterministicamente por SHA-256. Duplicatas literais deduplicadas. Discordâncias e contexto conferidos pelos pesquisadores. O inventário não equivale a reconhecimento perfeito de toda afirmação implícita.
3. Três verificadores temáticos consultaram fontes externas. Uma auditoria independente revisou erros e uma amostra das demais classificações: [auditoria de fontes](unified-2026-10-01/facts/source-audit.md). [FATOS.md](unified-2026-10-01/blind/FATOS.md) registra sentença, veredito, motivo e fontes; correções da checagem original ficam preservadas separadamente.
4. Dois avaliadores novos, **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`, Claude Code) e **GPT-6 Sol** (`gpt-6-sol`, Codex CLI, esforço medium), avaliaram cada texto em uma sessão separada; cada par recebeu exatamente o mesmo pacote incorporado no prompt. Nenhum concorre. Sem ferramentas, pesquisa adicional ou acesso ao mapa. Hash do conjunto ordenado dos onze pacotes: `16a445f246eb783875f457ea883c64dc106d6e5399ebba27cd780fd1f80da515`. Logs, configurações e respostas foram guardados.
5. Sete dimensões, justificativa e seleção de trecho literal por ID para cada nota; soma, pertencimento das citações e tetos verificados por script. D1 usa corretas ÷ (corretas + incorretas), exclui incertezas e baixa uma faixa por erro relevante distinto. São taxas **amostrais**, não precisão de todo o documento. Unidades podem agrupar mais de uma proposição. A média usa notas após os tetos.
6. Build e audit.mjs em cópia comum do commit `d8de411c19ce21847fe0cb1c717d65e3f5c794d5`; `wc -w` do corpo, mesma regex de retórica e checagem de links. CRLF normalizado para LF só nas cópias de execução, pois o parser do audit exige LF. Os textos preservados não foram normalizados.

A v2 não cria teto por seção curta, número de fontes ou ausência de tags. Não foram adotadas as sugestões de “v3” do relatório antigo. `[VERIFICAR]` pertence a D6; os avisos de Hong Kong/Guizhou exigem leitura contextual. O `hui` de *hui gan* (retrogosto do chá) é falso positivo, não o povo Hui do roteiro removido.

**Controle dos avaliadores:** uma primeira passagem com todos os textos no mesmo contexto foi descartada por citações inexatas e mistura de candidatos. A pontuação foi refeita nos mesmos modelos, em sessões separadas por texto e com seleção de citações de um banco extraído daquele candidato. Nenhuma nota da passagem descartada entra nesta tabela. [Ajuste documentado do protocolo](unified-2026-10-01/protocol-amendment.md); [respostas e validação descartadas](unified-2026-10-01/judges/score/validation.json).

## 4. Notas por dimensão

Formato **Haiku / GPT-6 Sol**. Máximos: D1 30, D2 15, D3 15, D4 10, D5 15, D6 10, D7 5.

| Modelo × ferramenta | D1 | D2 | D3 | D4 | D5 | D6 | D7 | Soma | Teto | Final |
|---|---|---|---|---|---|---|---|---|---|---|
| Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | 30 / 30 | 15 / 15 | 14 / 12 | 10 / 8 | 14 / 14 | 9 / 10 | 5 / 5 | 97 / 94 | — / — | **95,5** |
| GPT-6 Astra — Codex CLI 0.155.1 | 30 / 30 | 15 / 15 | 15 / 12 | 9 / 8 | 15 / 12 | 10 / 10 | 5 / 5 | 99 / 92 | — / — | **95,5** |
| GPT-5.6 Terra — Codex CLI 0.155.1 | 30 / 30 | 15 / 15 | 15 / 12 | 10 / 8 | 15 / 13 | 7 / 8 | 5 / 5 | 97 / 91 | — / — | **94** |
| GPT-5.6 Sol — Copilot | 30 / 30 | 15 / 15 | 13 / 12 | 9 / 9 | 14 / 12 | 9 / 10 | 5 / 5 | 95 / 93 | — / — | **94** |
| GPT-5.6 Sol — Codex CLI 0.155.1 | 30 / 30 | 15 / 15 | 14 / 13 | 9 / 9 | 15 / 13 | 6 / 7 | 5 / 5 | 94 / 92 | — / — | **93** |
| GPT-6.1 Sol — Codex — subagente nativo | 29 / 29 | 15 / 15 | 14 / 12 | 8 / 9 | 14 / 12 | 9 / 10 | 5 / 5 | 94 / 92 | — / — | **93** |
| Opus 5.5 — Copilot | 30 / 29 | 15 / 15 | 14 / 12 | 10 / 9 | 14 / 14 | 6 / 5 | 5 / 5 | 94 / 89 | — / — | **91,5** |
| Opus 5.5 — Claude Code | 19 / 20 | 15 / 15 | 14 / 12 | 9 / 9 | 15 / 13 | 6 / 5 | 5 / 5 | 83 / 79 | — / — | **81** |
| Gemini 3.8 Flash — Copilot | 2 / 3 | 15 / 15 | 14 / 12 | 9 / 7 | 14 / 11 | 4 / 4 | 5 / 5 | 63 / 57 | — / — | **60** |
| Fable 5.1 — Claude Code | 2 / 1 | 15 / 15 | 13 / 11 | 9 / 8 | 14 / 12 | 2 / 3 | 5 / 5 | 60 / 55 | — / — | **57,5** |
| Sonnet 5.5 — Claude Code | 2 / 1 | 15 / 14 | 12 / 11 | 8 / 8 | 15 / 10 | 5 / 2 | 5 / 5 | 62 / 51 | 70 / 70 | **56,5** |

Justificativas e citações completas: [Haiku](unified-2026-10-01/judges/isolated/judge-haiku/evaluation.md) e [GPT-6 Sol](unified-2026-10-01/judges/isolated/judge-gpt/evaluation.md).

### Evidência factual usada nas notas

| Modelo × ferramenta | Corretas | Incorretas | Incertas | Não factuais | Taxa / denominador | Erros relevantes distintos |
|---|---:|---:|---:|---:|---:|---:|
| Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | 17 | 0 | 0 | 4 | 100,0% / 17 | 0 |
| GPT-6 Astra — Codex CLI 0.155.1 | 16 | 0 | 0 | 26 | 100,0% / 16 | 0 |
| GPT-5.6 Terra — Codex CLI 0.155.1 | 16 | 0 | 1 | 5 | 100,0% / 16 | 0 |
| GPT-5.6 Sol — Copilot | 15 | 0 | 0 | 5 | 100,0% / 15 | 0 |
| GPT-5.6 Sol — Codex CLI 0.155.1 | 30 | 0 | 4 | 0 | 100,0% / 30 | 0 |
| GPT-6.1 Sol — Codex — subagente nativo | 19 | 0 | 0 | 22 | 100,0% / 19 | 0 |
| Opus 5.5 — Copilot | 43 | 0 | 12 | 9 | 100,0% / 43 | 0 |
| Opus 5.5 — Claude Code | 31 | 1 | 15 | 4 | 96,9% / 32 | 1 |
| Gemini 3.8 Flash — Copilot | 12 | 2 | 13 | 0 | 85,7% / 14 | 2 |
| Fable 5.1 — Claude Code | 23 | 12 | 24 | 4 | 65,7% / 35 | 12 |
| Sonnet 5.5 — Claude Code | 22 | 6 | 18 | 4 | 78,6% / 28 | 6 |

Uma classificação incerta significa que a checagem não resolveu a alegação inteira; não demonstra falsidade. A amostra prioriza riscos e números, portanto não estima de forma aleatória a precisão geral. Afirmações verdadeiras com limites inferiores antigos não foram transformadas automaticamente em erros de censo.

## 5. Verificação mecânica

| Modelo × ferramenta | Palavras (wc -w) | Seções abaixo do piso | Build | Avisos novos | Links internos quebrados | Regex retórica | [VERIFICAR] |
|---|---:|---:|---|---:|---:|---:|---:|
| Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | 3.322 | 4 | Passou | 0 | 0 | 2 | 0 |
| GPT-6 Astra — Codex CLI 0.155.1 | 3.979 | 0 | Passou | 0 | 0 | 0 | 0 |
| GPT-5.6 Terra — Codex CLI 0.155.1 | 2.916 | 6 | Passou | 0 | 0 | 1 | 0 |
| GPT-5.6 Sol — Copilot | 3.781 | 4 | Passou | 0 | 0 | 2 | 0 |
| GPT-5.6 Sol — Codex CLI 0.155.1 | 3.981 | 3 | Passou | 0 | 0 | 0 | 0 |
| GPT-6.1 Sol — Codex — subagente nativo | 4.675 | 0 | Passou | 0 | 0 | 0 | 0 |
| Opus 5.5 — Copilot | 4.375 | 3 | Passou | 0 | 0 | 0 | 0 |
| Opus 5.5 — Claude Code | 4.483 | 3 | Passou | 0 | 0 | 0 | 0 |
| Gemini 3.8 Flash — Copilot | 4.815 | 2 | Passou | 0 | 0 | 0 | 0 |
| Fable 5.1 — Claude Code | 5.621 | 0 | Passou | 0 | 0 | 2 | 0 |
| Sonnet 5.5 — Claude Code | 3.842 | 5 | Passou | 0 | 0 | 1 | 6 |

Todos os front matters foram preservados. Todos superam 2.000 palavras; 3 cumprem também todos os pisos por seção. Os builds repetiram 21 avisos preexistentes; a lista integral está nos logs. Os erros e avisos globais de páginas não candidatas no audit não foram debitados destes textos. Para D7, a edição exclusiva dos quatro candidatos novos tem commits verificáveis; nos sete antigos, depende do registro histórico, não de diff original recuperado.

**Correção do relatório anterior:** o `audit.mjs` existe em `.claude/skills/travel-final-review/scripts/audit.mjs`. A busca anterior não o localizou por estar em pasta oculta. Ele foi executado efetivamente nesta rodada para todos os candidatos; `tasks/audit-ab-codex.cjs` continua sendo uma verificação complementar diferente.

## 6. Divergências e revisões prioritárias

Nenhuma diferença estritamente superior a dez pontos em uma dimensão: não há arbitragem obrigatória pela regra literal da v2.

Diferenças superiores a dez na **nota total**, destacadas como sinal de instabilidade (a regra da v2 é por dimensão):

- Sonnet 5.5 — Claude Code: 62 / 51; diferença 11.

**Revisões derivadas das evidências:** as opiniões editoriais completas dos juízes permanecem nos anexos. A tabela abaixo usa os fatos auditados e as medições, sem transformar sugestões novas dos avaliadores em fatos do roteiro.

| Modelo × ferramenta | Erros decididos a corrigir | Incertezas a revisar | Seções abaixo do piso |
|---|---|---:|---:|
| Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | Nenhum demonstrado na amostra | 0 | 4 |
| GPT-6 Astra — Codex CLI 0.155.1 | Nenhum demonstrado na amostra | 0 | 0 |
| GPT-5.6 Terra — Codex CLI 0.155.1 | Nenhum demonstrado na amostra | 1 | 6 |
| GPT-5.6 Sol — Copilot | Nenhum demonstrado na amostra | 0 | 4 |
| GPT-5.6 Sol — Codex CLI 0.155.1 | Nenhum demonstrado na amostra | 4 | 3 |
| GPT-6.1 Sol — Codex — subagente nativo | Nenhum demonstrado na amostra | 0 | 0 |
| Opus 5.5 — Copilot | Nenhum demonstrado na amostra | 12 | 3 |
| Opus 5.5 — Claude Code | U020 | 15 | 3 |
| Gemini 3.8 Flash — Copilot | U061, U076 | 13 | 2 |
| Fable 5.1 — Claude Code | U085, U092, U094, U095, U098, U100, U103, U104, U106, U114, U126, U141 | 24 | 0 |
| Sonnet 5.5 — Claude Code | U289, U291, U302, U306, U311, U316 | 18 | 5 |

**Limitação dos pareceres:** Haiku sugeriu datas incompatíveis com o roteiro ao comentar C10 (08/11 em Chongqing e 07/11 em Guilin; o config coloca essas cidades em 31/10–04/11 e 09–10/11). Também mencionou contagens de retórica diferentes da regex comum e descreveu a faixa final de D1 de C01 como “base”. Essas frases não foram adotadas como recomendações nem corrigidas silenciosamente nas respostas. As notas permanecem as dadas pelo avaliador; as faixas e somas estão corretas, mas a validação formal não garante a precisão de toda justificativa. Isso reforça o caráter exploratório do ranking e recomenda revisão humana antes de decisões por diferenças pequenas.


## 7. Comparação com a avaliação histórica

| Configuração anterior | Média histórica (Haiku / Sonnet) | Nova média (Haiku / GPT-6 Sol) | Variação |
|---|---:|---:|---:|
| Candidato histórico E/C06 — Autoria e ferramenta não confirmadas | 83,5 | 95,5 | +12 |
| GPT-5.6 Sol — Copilot | 84 | 94 | +10 |
| Opus 5.5 — Copilot | 88 | 91,5 | +3,5 |
| Opus 5.5 — Claude Code | 88,5 | 81 | -7,5 |
| Gemini 3.8 Flash — Copilot | 72,5 | 60 | -12,5 |
| Fable 5.1 — Claude Code | 79 | 57,5 | -21,5 |
| Sonnet 5.5 — Claude Code | 62,5 | 56,5 | -6 |

Os textos são os mesmos. A variação decorre de nova checagem, aplicação operacional da rubrica e troca de um avaliador; **não mede melhora ou piora do modelo**. O relatório histórico foi preservado como registro. Não misturar as duas séries de notas.

## 8. Limites da comparação

- Uma única tarefa e uma única amostra por configuração; sem intervalos de confiança ou repetições para medir variância.
- Identidade dos modelos históricos é a declarada no arquivo recebido; não há logs de execução para autenticar novamente todos os rótulos. Gemini/Terra possui atribuição incerta; o candidato E/C06 tem autoria contestada pelo usuário e foi retirado do ranking. Os rótulos preservados no mapa original são históricos, não comprovação de execução.
- A qualidade da checagem e a seleção factual influenciam D1/D6. Incertezas, fontes conflitantes, cobertura da auditoria e correções estão publicadas. A deduplicação inicial é literal; unidades semanticamente próximas podem permanecer, mas erros relevantes repetidos usam a mesma chave.
- Os contextos de cidade/atração para D3 incluem páginas integrais curtas e excertos culturais limitados; ausência de parágrafos literalmente iguais não prova ausência de repetição conceitual.
- Haiku teve ferramentas desabilitadas; GPT recebeu sandbox somente leitura, pesquisa desabilitada e instrução de não usar ferramentas, conferida nos logs. Sistemas internos dos provedores e esforço de raciocínio não são idênticos.
- Nenhuma das notas equivale a aprovação factual integral para publicação do roteiro. As revisões apontadas continuam necessárias.

## 9. Artefatos e reprodução

- [Protocolo inicial](unified-2026-10-01/protocol.md)
- [Ajuste das sessões e citações](unified-2026-10-01/protocol-amendment.md)
- [Mapa e hashes](unified-2026-10-01/candidate-map.json)
- [Inventário extraído](unified-2026-10-01/claim-inventory.json)
- [Fatos e fontes](unified-2026-10-01/blind/FATOS.md)
- [Auditoria independente de fontes](unified-2026-10-01/facts/source-audit.md)
- [Métricas de todos os candidatos](unified-2026-10-01/blind/metrics.json)
- [Validação das avaliações](unified-2026-10-01/validation.json)
- [Pacotes idênticos por candidato](unified-2026-10-01/judges/isolated/inputs/)
- [Registro das 22 sessões](unified-2026-10-01/judges/isolated/batch.json)

Scripts em `tasks/`: preparação e medições (`prepare-unified-eval.cjs`, `measure-unified-eval.cjs`, `package-unified-eval.cjs`); execução definitiva (`run-isolated-judges.cjs`, `collect-isolated-eval.cjs`); validação e relatório (`validate-unified-eval.cjs`, `report-unified-eval.cjs`). `run-eval-judges.cjs` e `normalize-judge-output.cjs` reproduzem a passagem descartada e sua inspeção. Os lançadores protegem os registros existentes contra sobrescrita; uma nova rodada precisa de nova pasta. Reexecutar avaliações consome uso dos provedores.
