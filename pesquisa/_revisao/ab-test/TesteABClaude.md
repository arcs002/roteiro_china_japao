# Teste A/B de modelos — `aprofundamento/paises/china/etnias.md`

**Data:** 30/09/2026 · **Tarefa:** reescrever a página "China — Etnias" para o roteiro atual (item 🟠 da seção 5 de `PENDENCIAS.md`), com a skill `travel-deepdive-writer`, mesmo prompt para todos.
**Rubrica:** [RUBRICA.md](RUBRICA.md) (v2). **Artefatos:** [artefatos/](artefatos/) — `FATOS.md` (checagem factual), `METRICAS.md` (medições mecânicas), `EVAL-1-haiku.md`, `EVAL-2-sonnet.md` (avaliações cegas). **Textos:** [candidatos/](candidatos/) — os 7 rascunhos lado a lado, nomeados `etnias.<letra>-<modelo>-<ferramenta>.md`, mais o original de `master`.

---

## 1. Resultado

| Pos. | Letra | Modelo | Ferramenta | Palavras | Aval. 1 (Haiku) | Aval. 2 (Sonnet) | **Média** | Leitura |
|---|---|---|---|---|---|---|---|---|
| 1 | **D** | **Opus 5.5** | Claude Code | 4.483 | 90 | 87 | **88,5** | Bom → quase publicável |
| 2 | **F** | **Opus 5.5** | GH Copilot | 4.375 | 86 | 90 | **88,0** | Bom → quase publicável |
| 3 | G | GPT-5.6 (sol) | GH Copilot | 3.781 | 88 | 80 | 84,0 | Bom ⚠ ver §4 |
| 4 | E | GPT-6.1 (sol) | GH Copilot | 3.322 | 88 | 79 | 83,5 | Bom ⚠ ver §4 |
| 5 | B | Fable 5.1 | Claude Code | 5.621 | 81 | 77 | 79,0 | Bom; passada de fatos |
| 6 | A | Gemini 3.8 Flash | GH Copilot | 4.815 | 85 | 60 | 72,5 | **⚠ arbitragem pendente** (§6) |
| 7 | C | Sonnet 5.5 | Claude Code | 3.842 | 65 | 60 | 62,5 | Rascunho; retrabalho |

Faixas: 90–100 publicável com revisão mínima · 75–89 bom, precisa de passada · 60–74 rascunho · <60 reescrever.

**Vencedor: Opus 5.5**, nas duas ferramentas, praticamente empatado (88,5 × 88,0). A diferença entre D e F está dentro do ruído entre avaliadores; a diferença de ambos para o resto **não** está.

---

## 2. Candidatos e anomalias encontradas antes de avaliar

Havia 8 branches/worktrees com `etnias.md` modificado (todos sem commit — a reescrita está só no working tree de cada worktree). Após deduplicação por hash, **7 textos distintos**:

| Worktree / branch | Modelo declarado | Observação |
|---|---|---|
| `agent-a415a3e08b3422adb` | Opus 5.5 (Claude Code) | = **D** |
| `agent-a6bff4e07db98e1f4` | Sonnet 5.5 (Claude Code) | = **C** |
| `agent-ada5ac357e61a3cf0` | Fable 5.1 (Claude Code) | = **B** |
| `ab/opus-5.5-etnias` | Opus 5.5 (Copilot) | = **F** |
| `ab/gpt-5.6-sol-etnias` | GPT-5.6 sol (Copilot) | = **G** |
| `ab/gpt-6.1-sol-etnias` | GPT-6.1 sol (Copilot) | = **E** |
| `ab/gemini-3.8-flash-etnias` | Gemini 3.8 Flash (Copilot) | = **A** |
| `ab/gpt-5.6-terra-etnias` | GPT-5.6 terra (Copilot) | **arquivo byte a byte idêntico ao do Gemini** (md5 `ed08e086…`). Não é uma execução independente — descartado como candidato. Não dá para saber qual dos dois modelos de fato gerou o texto de A. |

**Anomalia 2 — E e G não são independentes.** 35 dos ~48 parágrafos longos são idênticos, da seção de Fenghuang até o Encerramento. Só a Abertura e as seções iniciais (Tujia; G tem uma seção extra "Antes do mapa") diferem. Uma das execuções reaproveitou o texto da outra, ou ambas vieram de um mesmo cache. As notas de E e G medem, na prática, **um** texto com duas aberturas.

Ambas as anomalias apontam para um problema de processo nas execuções via Copilot (worktrees criados a partir do mesmo estado, ou arquivo copiado entre branches). Vale verificar antes de repetir o experimento.

---

## 3. Método

1. **Rubrica fixada antes de ler qualquer texto** (v1 pelo Sonnet 5.5, revisada para v2 pelo Fable 5.1 — 8 correções registradas no fim do arquivo). 7 dimensões, 100 pontos, tetos pós-soma.
2. **Blindagem:** os 7 arquivos copiados como `A–G` em ordem sorteada (`sort -R`), mapa guardado fora do alcance dos avaliadores. Avaliadores receberam **só** os textos, a rubrica, as métricas e a checagem de fatos — nunca os relatórios dos agentes nem os nomes dos modelos.
3. **Métricas mecânicas** com o mesmo comando nos 7 (`wc -w` do corpo, `node build/build.js`, `audit.mjs`, regex de estilo, `git status` para escopo). Resultado em `artefatos/METRICAS.md`.
4. **Checagem factual** por um agente Opus 5.5 com WebSearch: extração mecânica de toda afirmação checável (datas, números, UNESCO, classificações, geografia), deduplicação, prioridade para as 8 armadilhas da rubrica e para os pontos em que os textos discordam entre si, amostragem uniforme no resto. 128 afirmações únicas, 328 verificações. Resultado em `artefatos/FATOS.md`.
5. **Dois avaliadores cegos independentes:** Haiku 4.5 (não concorre) e Sonnet 5.5 (**concorre — declarado**; instruído a não tentar identificar autoria). Nota final = média. Divergência > 10 → arbitragem do usuário (§6).

---

## 4. Notas por dimensão

Formato `Haiku / Sonnet`.

| Dimensão | Máx. | A Gemini | B Fable | C Sonnet | D Opus-CC | E GPT-6.1 | F Opus-Cop | G GPT-5.6 |
|---|---|---|---|---|---|---|---|---|
| 1. Precisão factual | 30 | 20 / 10 | 16 / 17 | 13 / 8 | 22 / 24 | 25 / 27 | 24 / 25 | 25 / 27 |
| 2. Cobertura e aderência | 15 | 15 / 15 | 15 / 15 | 12 / 15 | 15 / 15 | 15 / 15 | 15 / 15 | 15 / 15 |
| 3. Profundidade e especificidade | 15 | 14 / 11 | 13 / 14 | 11 / 12 | 14 / 14 | 12 / 7 | 12 / 14 | 12 / 8 |
| 4. Ancoragem no roteiro | 10 | 9 / 5 | 9 / 9 | 8 / 9 | 10 / 9 | 7 / 5 | 8 / 10 | 7 / 5 |
| 5. Qualidade editorial PT-BR | 15 | 15 / 10 | 15 / 13 | 11 / 7 | 15 / 13 | 14 / 11 | 14 / 13 | 14 / 11 |
| 6. Calibração epistêmica | 10 | 7 / 4 | 8 / 4 | 5 / 4 | 9 / 7 | 10 / 9 | 8 / 8 | 10 / 9 |
| 7. Conformidade mecânica | 5 | 5 / 5 | 5 / 5 | 5 / 5 | 5 / 5 | 5 / 5 | 5 / 5 | 5 / 5 |
| **Soma** | 100 | 85 / 60 | 81 / 77 | 65 / 60 | 90 / 87 | 88 / 79 | 86 / 90 | 88 / 80 |
| Teto | — | — | — | 70 (não morde) | — | — | — | — |
| **Média** | | **72,5** | **79,0** | **62,5** | **88,5** | **83,5** | **88,0** | **84,0** |

### Precisão factual (de `FATOS.md`)

| Arq. | Checadas | Corretas | Erro menor | Erro relevante | Contradição interna | Taxa |
|---|---|---|---|---|---|---|
| A Gemini | 48 | 40 | 6 | 0* | 0 | 87,0 % |
| B Fable | 75 | 66 | 7 | 0 | 0 | 90,4 % |
| C Sonnet | 49 | 45 | 0 | **2** | **1** | 93,8 % |
| D Opus-CC | 58 | 53 | 3 | 0 | 0 | 94,6 % |
| E GPT-6.1 | 20 | 20 | 0 | 0 | 0 | 100 % |
| F Opus-Cop | 59 | 56 | 2 | 0 | 0 | 96,6 % |
| G GPT-5.6 | 19 | 19 | 0 | 0 | 0 | 100 % |

\* A dá os três números de população do **censo de 2010 sem ano** ("mais de oito milhões" Tujia, "mais de nove" Miao, "mais de 16" Zhuang). O verificador classificou como erro menor (limite inferior tecnicamente verdadeiro) e deixou ao avaliador decidir se conta como erro da armadilha "população 2020". Haiku: não conta. Sonnet: conta. Essa é a origem da divergência de A (§6).

**Erros relevantes (só em C):** "Xiangxi, a área de Zhangjiajie, Furong e Fenghuang, é oficialmente a Prefeitura Autônoma…" (Zhangjiajie saiu de Xiangxi em 1988 — armadilha 1); Bao'an "com algumas dezenas de milhares de habitantes" (~314 mil); contradição interna "entre 8 e 9 milhões" × "perto de 9,6 milhões" na mesma frase.

**Discordâncias entre textos resolvidas pela checagem:** Muralha do Sul 1554–1622 (D certo; B "1615" erro menor) · Rebelião Miao 1795–1806 (F "1795–1797" erro menor) · Miao é a 4ª maior minoria em 2020 (B diz "quinta") · Peng inicia domínio em 910 (B e D erram por pouco) · Hehu Xinju **concluída** em 1817, ~24,8 mil m² (B diz "iniciada"; D "~28 mil m²") · Fenghuang 1704 (cidade) e 1715 (muralha de pedra) — ambos certos.

**Os 100 % de E e G têm pouco valor comparativo:** os dois textos têm 19–20 afirmações checáveis contra 48–75 dos outros — evitam número, data e nome próprio. Ambos os avaliadores apontaram que a rubrica **premia a omissão** aqui (D1 no piso da faixa alta, D6 quase cheio). Isso infla E e G em ~5–8 pontos frente a um texto igualmente correto mas mais denso. Ver §7.

---

## 5. Leitura por candidato

**D — Opus 5.5 (Claude Code), 88,5.** Melhor equilíbrio: 58 afirmações checadas com 94,6 % de acerto, nenhum erro relevante, ressalvas no lugar certo ("segundo a biografia mais repetida" para Shen Congwen, "segundo a tradição" para Mazu), melhor ancoragem no roteiro (datas da viagem, Ano Novo Miao vs. 08–09/11). Único agente que **buscou na web** durante a escrita (25 chamadas de ferramenta). Também identificou, sem que pedissem, um erro factual em `02-zhangjiajie.md:31` (Zhangjiajie ≠ Xiangxi) que consta em `PENDENCIAS.md §4`. Três erros menores a corrigir (Peng/910, Hehu Xinju área, um terceiro em FATOS #27/116/120).

**F — Opus 5.5 (Copilot), 88,0.** Mesmo modelo, resultado equivalente: 96,6 % sobre 59 afirmações, prosa que o Sonnet-avaliador considerou a melhor (D4 10/10, D5 13). Dois erros menores (rebelião "1795–1797"; #84). Sem informação de processo (tokens, buscas) do lado do Copilot.

**G / E — GPT-5.6 e GPT-6.1 (Copilot), 84,0 / 83,5.** Texto correto e limpo, mas **raso em fatos** (19–20 afirmações checáveis) e com a menor ancoragem no roteiro. Sonnet-avaliador deu 7–8 em profundidade ("enciclopédia genérica"); Haiku foi mais generoso (12). Como compartilham 35 parágrafos, contam como um resultado. Omitem 4 das 8 armadilhas (população, ano de Guangxi, Laosicheng, Ping'an/Dazhai) — não erraram porque não arriscaram.

**B — Fable 5.1 (Claude Code), 79,0.** O mais longo (5.621) e o mais denso (75 afirmações — 30 % a mais que qualquer outro), com a melhor cobertura das armadilhas junto de D. Mas 7 erros menores e nenhum sinalizado → D6 baixo (4 e 8). Nenhum erro relevante. É o texto com mais matéria-prima e mais retrabalho de checagem por palavra. Não usou busca na web (7 chamadas de ferramenta).

**A — Gemini 3.8 Flash (Copilot), 72,5 — arbitragem pendente.** 6 erros menores em 48 afirmações (87 %), incluindo os três números de censo desatualizados sem ano. Não menciona 5 das 8 armadilhas. Os avaliadores divergiram 25 pontos, quase todos em D1 (20 × 10), D4 (9 × 5) e D5 (15 × 10) — ver §6.

**C — Sonnet 5.5 (Claude Code), 62,5.** Único com erros relevantes (2 + contradição interna), incluindo a armadilha 1 (Zhangjiajie em Xiangxi). Único com **11 caminhos de arquivo dentro da prosa do leitor** ("Hongyadong (`pesquisa/atracoes/hongyadong.md`)") — convenção herdada do texto antigo, mas jargão de bastidor que o renderizador não transforma em link. Frases truncadas apontadas pelo avaliador ("A cidade velha de Ela foi sede…"). Ponto a favor: é o único que marcou `[VERIFICAR]` (6), e todas as marcações estão em afirmações corretas — o problema é que os erros ficaram **fora** das tags. Foi o mais barato (112 k tokens, 9 chamadas).

---

## 6. Divergência entre avaliadores — arbitragem pendente

Critério da rubrica: divergência > 10 → usuário decide. Só **A** ultrapassa (25 pontos no total; 10 em D1, 5 em D5, 4 em D4).

| Questão | Haiku | Sonnet | O que decide |
|---|---|---|---|
| Três populações do censo 2010, sem ano, contam como erro da armadilha "população 2020"? | Não (erro menor; D1 = 20) | Sim (relevante → derruba faixa; D1 = 10) | Se sim, A cai para ~62–70; se não, fica ~80–85 |
| Estilo/ancoragem de A | 15 e 9 | 10 e 5 | Leitura pessoal do texto |

**Leitura de quem consolidou (Fable 5.1 — concorrente, portanto só opinião, não voto):** a rubrica lista explicitamente "população 2020" como armadilha; um leitor que repetir "Zhuang, mais de 16 milhões" estará 3,5 milhões abaixo do número atual. Tenderia a contar como erro relevante. Mas a decisão é sua — os dois relatórios em `artefatos/` têm as justificativas linha a linha. **Nenhuma decisão sobre A altera o topo do ranking** (D e F continuam 1º e 2º); altera só se A fica acima ou abaixo de B.

As demais divergências (E 9, G 8, B 4, F 4, D 3, C 5 pontos) estão dentro do previsto.

---

## 7. Limitações do experimento

1. **A rubrica premia omissão em D1/D6.** Taxa de acerto sem ponderar pelo número de afirmações favorece textos que evitam fatos (E/G). Correção sugerida para a v3: piso mínimo de afirmações checáveis (ex.: 40) para acessar a faixa 27–30; abaixo disso, teto de 24 em D1 e nota de D6 limitada a 7.
2. **Amostras não independentes do lado Copilot:** o arquivo do Gemini é idêntico ao do "GPT-5.6 terra", e E/G compartilham 70 % do texto. Só D, F, B, C e (A ou G, um deles) são execuções claramente independentes.
3. **Conflitos de interesse declarados:** Avaliador 2 é Sonnet 5.5 (concorrente C); a consolidação deste relatório foi feita por Fable 5.1 (concorrente B). O Haiku 4.5 é o único avaliador neutro. A blindagem foi real para os avaliadores (não viram relatórios nem nomes); o consolidador viu o mapa só depois das notas fechadas.
4. **Métricas de processo só para Claude Code:** Opus 130 k tokens / 25 chamadas / 5,5 min; Sonnet 112 k / 9 / 2,9 min; Fable 102 k / 7 / 6,6 min. Nada equivalente para as execuções via Copilot.
5. **Um só item, uma só execução por modelo.** Variância entre execuções do mesmo modelo não foi medida (o Opus nas duas ferramentas ficou a 0,5 ponto, o que sugere baixa variância, mas é n = 2).
6. **Dimensões 3–5 são julgamento editorial.** Com dois avaliadores a divergência chegou a 5 pontos em D3 e D5 mesmo em textos sem anomalia. Um terceiro avaliador humano (você) em D5 resolveria melhor que mais um modelo.

---

## 8. Recomendação

1. **Adotar D (Opus 5.5, Claude Code)** como base da página. Corrigir os 3 erros menores listados em `FATOS.md` (#27, #116, #120) e considerar incorporar de F a passagem sobre satay/*sa-te* e a Abertura, que o Avaliador 2 considerou a melhor. Depois rodar `travel-content-reviewer` normalmente.
2. **Descartar C** e registrar a lição no pipeline: a convenção de citar `pesquisa/atracoes/x.md` na prosa deve ser proibida na skill `travel-deepdive-writer` (o texto antigo da página a usava; três modelos a herdaram parcialmente, um a espalhou).
3. **Para a escolha de modelo no pipeline de conteúdo:** Opus 5.5 justifica o custo em páginas de referência factual (aprofundamento). Fable 5.1 produz mais densidade por invocação, mas exige passada de fatos — bom candidato para módulos narrativos onde a checagem já é etapa obrigatória (`travel-content-reviewer`). Sonnet 5.5 não deve ser usado sozinho para conteúdo factual denso sem `place-finder`/WebSearch acoplado.
4. **Antes de repetir o A/B com Copilot**, verificar por que dois pares de branches saíram com texto compartilhado.
5. **Arbitrar A** (§6) só se a posição relativa Gemini × Fable importar para alguma decisão; para a escolha da página, não importa.

---

## 9. Reprodução

```
# métricas mecânicas e blindagem: ver comandos em artefatos/METRICAS.md
# checagem de fatos: agente Opus 5.5 + WebSearch, prompt em FATOS.md (cabeçalho)
# avaliação: 2 agentes (haiku, sonnet), prompt idêntico, input = RUBRICA + METRICAS + FATOS + A–G
# mapa letra→modelo: §2 deste arquivo (aberto só após as notas)
```
