# Rubrica de avaliação — A/B de modelos em `aprofundamento/paises/china/etnias.md`

Nota final de **0 a 100**, avaliando o **conteúdo da página** (não o processo do agente). Fixada antes da comparação. Versão 2: revisada por um segundo modelo (correções registradas no fim).

Tarefa avaliada: reescrever `etnias.md` para o roteiro atual (Chongqing → Zhangjiajie/Furong → Fenghuang → Guilin/Yangshuo → Shenzhen → Xiamen → Fukuoka/Kurokawa/Beppu), cobrindo Tujia, Miao e Tujia em Fenghuang, Zhuang, Minnan e Hakka/migrantes, com `travel-deepdive-writer`.

## Procedimento

1. **Blindagem real.** Os relatórios dos três agentes já identificam cada texto (contagem de palavras, nº de seções, nº de `[VERIFICAR]`). Renomear arquivos não basta. O avaliador deve ser um **sub-agente novo**, que recebe **apenas**: os três arquivos como `A.md`/`B.md`/`C.md` (ordem sorteada), esta rubrica e a lista de fatos já checada (`FATOS.md`). Não recebe os relatórios nem o nome dos modelos.
2. **Dois avaliadores independentes**, de modelos diferentes, pontuando em separado. Nota final = média. Divergência > 10 pontos em qualquer dimensão vai para arbitragem do usuário. Se um avaliador for de um dos três modelos testados, isso fica declarado no resultado.
3. **Medições mecânicas com o mesmo comando nos três**: palavras (`wc -w` do corpo, sem front matter), `node build/build.js`, `audit.mjs`, contagem de "Não é … — é …". Nunca usar a contagem que o agente reportou.
4. **Lista de fatos montada antes de ler a prosa, e não curada.** Extrair mecanicamente de cada arquivo toda data, número, ano de UNESCO, população e nome próprio; deduplicar; checar por busca na web. Prioridade de checagem: (a) as armadilhas listadas em D1, (b) **afirmações em que os três textos discordam entre si**, (c) o restante por amostragem uniforme (mesmo nº de afirmações únicas por arquivo). Resultado gravado em `FATOS.md` com veredito por afirmação.
5. Cada nota de dimensão vem com **uma frase de justificativa e citação de trecho**. Nota sem justificativa não vale.

## Dimensões (total 100)

### 1. Precisão factual — 30
Pontuada por **taxa de acerto** sobre as afirmações checadas do arquivo, com a gravidade como critério separado.

| Pts | Taxa de acerto |
|---|---|
| 27–30 | ≥ 97 % |
| 21–26 | 93–96 % |
| 13–20 | 85–92 % |
| 5–12 | 70–84 % |
| 0–4 | < 70 % ou invenção de fato/lugar/pessoa |

**Gravidade:** cada erro relevante (uma das armadilhas abaixo, ou algo que o leitor repetiria como fato) derruba **uma faixa** além da taxa. Contradição interna do próprio texto (mesma data com dois valores) conta como erro.

Armadilhas, checar sempre: Zhangjiajie **não** pertence a Xiangxi (saiu da prefeitura em 1988); os Tujia estão no **noroeste** de Hunan e no sudeste de Chongqing; Minnan e Hakka são subgrupos **han**, não minorias oficiais; população 2020 de Tujia (~9,6 mi), Miao (~11,1 mi), Zhuang (~19,6 mi); Região Autônoma de Guangxi (1958); Laosicheng (UNESCO 2015); Hongyadong é réplica recente de palafita; Ping'an é Zhuang e Dazhai/Huangluo são Yao.

*(Sem desconto por "afirmação duvidosa escrita como certeza" aqui — isso é D6.)*

### 2. Cobertura e aderência ao brief — 15
- Os 5 grupos pedidos cobertos, cada um ligado ao trecho do roteiro (5 pts, 1 por grupo).
- Nenhum resquício do roteiro antigo: Hui/Xi'an, Miao/Xijiang, Dong/Zhaoxing, Dong Grand Song (4 pts; qualquer resquício = 0 aqui).
- Nenhum link para atração removida ou inexistente; sem números de dia (a numeração está pendente em `PENDENCIAS.md` — não estava no prompt, mas é derivável do repo) (3 pts).
- Estrutura da skill: Abertura + tópicos livres + Encerramento; front matter obrigatório intacto (3 pts).

### 3. Profundidade e especificidade — 15
| Pts | Âncora |
|---|---|
| 13–15 | Quase todo parágrafo traz nome, data, lugar ou costume concreto; explica o mecanismo (por que/como), não só descreve; **acrescenta o que as páginas de cidade/atração não têm** e referencia em vez de repetir |
| 9–12 | Maioria específica, com trechos de enciclopédia genérica ou reconto do que já está em outra página |
| 5–8 | Metade genérica, repetição ou enchimento |
| 0–4 | Resumo de blog |

Tamanho não pontua. O piso da skill (**2.000 palavras**, `SKILL.md` linha 46) é condição; acima disso, enchimento **reduz** esta nota. Duplicação com `furong`, `hongyadong`, `fenghuang`, `gulangyu`, `dafen` etc. conta como enchimento (ver `PENDENCIAS.md §6`).

### 4. Ancoragem no roteiro e no viajante — 10
Conexão real entre o povo e o que o viajante verá e fará (Hongyadong, Furong, Fenghuang, Yangshuo, Gulangyu, Dafen…), com datas da viagem quando úteis (ex.: Ano Novo Miao vs. 08–09/11), observações práticas de como reconhecer/respeitar a diferença. Penalizar encaixe decorativo ("quando você visitar X, lembre…") sem conteúdo.
- 9–10 conexão específica e útil em todos os grupos · 6–8 na maioria · 3–5 só em alguns · 0–2 ausente.

### 5. Qualidade editorial PT-BR — 15
- Prosa fluida, voz de livro-reportagem, ritmo variado (6 pts).
- Sem clichê, metalinguagem ("nesta seção veremos") ou jargão de bastidor (4 pts; `audit.mjs` limpo). **`[VERIFICAR]` não conta como tag vazada nesta avaliação** — é marcação honesta de rascunho e é tratada em D6.
- PT-BR, sem PT-PT; uso consistente de "você" (2 pts).
- Retórica: "Não é X — é Y" ≤ 3 ocorrências na página; aberturas e fechos não repetitivos (3 pts).

### 6. Calibração epistêmica — 10
Mede se o **texto** diferencia o estabelecido do incerto. Só conteúdo — o que o agente disse no relatório sobre buscas ou checagens não entra.

| Pts | Âncora |
|---|---|
| 9–10 | Incerteza sinalizada (tag ou ressalva na prosa) exatamente onde `FATOS.md` mostra que há incerteza real; nenhuma afirmação errada apresentada como certeza |
| 6–8 | Uma ou duas falhas: afirmação errada sem ressalva, ou tag em fato trivial e correto |
| 3–5 | Várias afirmações erradas ou duvidosas escritas como certeza, **ou** excesso de tags em fatos triviais (tag não é mérito por si) |
| 0–2 | Confiança injustificada em pontos errados das armadilhas |

### 7. Conformidade mecânica — 5
`node build/build.js` passa sem erro novo (3 pts); só `etnias.md` foi alterado (1 pt); front matter e slug válidos (1 pt).

## Tetos (aplicados depois da soma)

| Condição | Teto |
|---|---|
| Build quebrado | 60 |
| Resquício do roteiro antigo (Xi'an/Hui/Xijiang/Zhaoxing) | 75 |
| 2+ erros relevantes entre as armadilhas de D1 | 70 |
| Abaixo do piso de 2.000 palavras (corpo) | 65 |
| Invenção de lugar, pessoa ou evento | 50 |

## Faixas de leitura

| Nota | Leitura |
|---|---|
| 90–100 | Publicável com revisão mínima; nível do gold standard |
| 75–89 | Bom; precisa de uma passada de fatos/estilo |
| 60–74 | Aproveitável como rascunho; retrabalho substancial |
| < 60 | Reescrever |

## Registro de resultado (preencher na comparação)

| Dimensão | Máx. | A | B | C |
|---|---|---|---|---|
| 1. Precisão factual | 30 | | | |
| 2. Cobertura e aderência | 15 | | | |
| 3. Profundidade e especificidade | 15 | | | |
| 4. Ancoragem no roteiro | 10 | | | |
| 5. Qualidade editorial PT-BR | 15 | | | |
| 6. Calibração epistêmica | 10 | | | |
| 7. Conformidade mecânica | 5 | | | |
| Soma | 100 | | | |
| Teto aplicado | — | | | |
| **Nota final (média dos 2 avaliadores)** | 100 | | | |

**Métricas de apoio (fora da nota):** palavras (`wc -w` do corpo), nº de afirmações checadas/erradas, nº de "Não é X — é Y", nº de `[VERIFICAR]`, tokens/tempo/nº de buscas do agente, honestidade do relatório do agente.

## Registro de revisão (v1 → v2)

1. Blindagem: A/B/C não bastava — avaliador passa a ser sub-agente novo sem acesso aos relatórios; dois avaliadores + arbitragem.
2. D1: âncoras por **taxa de acerto**, não por contagem absoluta (evita punir o texto com mais afirmações); gravidade separada.
3. D1: removido o desconto por "duvidosa como certeza" — dupla contagem com D6.
4. D5/D6: resolvida a contradição sobre `[VERIFICAR]` (não é tag vazada; D6 só recompensa tag no lugar certo).
5. D6: removido "relatório do agente honesto" da nota — processo, não conteúdo; foi para métricas de apoio.
6. Piso confirmado em 2.000 palavras no `SKILL.md`; "1.500" do PENDENCIAS era de outra página.
7. Lista de fatos: montada mecanicamente antes de ler a prosa; prioridade para discordâncias entre os textos.
8. D3: duplicação com páginas de cidade/atração passa a contar como enchimento.
