# Plano v3 de otimização — baseado na medição corrigida (Chongqing vs. Fenghuang)

Ver `CUSTO-CHONGQING.md`/`CUSTO-FENGHUANG.md` para os números. Resumo do diagnóstico: **o custo escala com o número de turnos reais de API** (cada chamada de ferramenta relê todo o contexto acumulado até ali), não com "quanto se lê no início". O v2 melhorou 27% mesmo com o orquestrador tendo *mais* turnos (22→36), porque o texto que circula ficou mais curto — mas deixou clara a alavanca que falta: **cortar turnos mecânicos**, não só volume de texto.

## 1. Reverter o protocolo de arquivo do `travel-writer` — devolver texto, não escrever arquivo

Dado real: 12 módulos foram de 30 para 59 turnos (quase 2x) só por adicionar "escrever arquivo + confirmar" em vez de "responder o texto". Para um agente de disparo único (não acumula ao longo de uma sessão longa), esse turno extra custa mais do que evita.

**Mudança**: `travel-writer` volta a devolver o texto do módulo na resposta (sem `Write`). O `travel-page-assembler` continua despachando em lotes de 3-4 em paralelo (isso já funciona), mas agora **persiste cada lote inteiro com UMA única chamada de Bash/Write** (heredoc com os N módulos do lote, não N chamadas separadas) — assim o orquestrador ainda evita N pequenas chamadas de gravação, só que sem forçar o redator a gastar turnos extras.

- Reverter: `.claude/agents/travel-writer.md` (passo 7), `.claude/skills/travel-magazine-writer/SKILL.md` (passo 5) — voltar a "devolva o texto".
- Ajustar: `.claude/skills/travel-page-assembler/SKILL.md` — passo de coleta: receber os textos do lote, persistir os N módulos daquele lote em UMA chamada de Bash (heredoc) ou Write, não uma gravação por módulo.

**Manter como está** (não reverter) para `travel-place-finder`/`travel-event-finder`: são chamados 1x por página (não 12x), o turno extra de `Write` custa pouco em absoluto, e o conteúdo gravado já É o conteúdo final (seção "Lugares reais pesquisados"), não um rascunho descartável — o trade-off aqui é favorável.

## 2. Orquestrador: eliminar turnos mecânicos de 1 tool call cada

Ordenado por onde os 36 turnos foram gastos (ver a inspeção turno-a-turno):

- **Leitura inicial (5 arquivos, 5 turnos)** → 1 turno com 5 `Read` em paralelo (mesma mensagem). Isso já é recomendado pela plataforma para chamadas independentes; só precisa ser instruído explicitamente no `CHEATSHEET.md`, porque não estava acontecendo por padrão.
- **Montagem final (dezenas de `Bash`/`Edit`/`Read` sequenciais, a maior fatia dos 36 turnos)** → 1 comando Bash só, com heredoc ou concatenação de todos os arquivos de uma vez (`cat parte1 parte2 ... > final.md`), não uma chamada por arquivo/trecho.
- **Correções pós-revisor (4+ `Edit` sequenciais)** → 1 reescrita completa do arquivo (`Write` do conteúdo já corrigido) em vez de N `Edit` pontuais, quando as correções passam de 2-3 pontos.
- **Passos de "confirmação" isolados** (`Bash` só para checar algo, depois outro turno só para agir) → combinar checagem+ação no mesmo comando sempre que possível (ex.: `wc -w arquivo.md && grep -c "^## " arquivo.md` numa chamada só, não duas).

## 3. `travel-image-sourcing`: comprimir de ~1-2 turnos/imagem para 2 turnos totais

Turnos ficaram estruturalmente iguais (23→24) porque o processo é 1 busca + 1 verificação por slot de imagem, repetido ~10-12x. Mudança:

1. **1 turno**: todas as buscas (`WebSearch`) dos ~10-12 slots de imagem, em paralelo, na mesma mensagem.
2. **1 turno**: todas as verificações de URL (`curl`) num único comando Bash que testa todas as URLs candidatas em sequência dentro do MESMO comando (`for url in ...; do curl ...; done`), não uma chamada de Bash por URL.
3. Resultado esperado: de ~23 turnos para ~4-6 (busca em lote + verificação em lote + eventuais buscas de fallback para candidatos que falharam).

Isso é uma mudança estrutural maior que a anterior ("prefira WebSearch a WebFetch", que não tocou o número de turnos) — vale testar em isolado antes de aplicar a todas as páginas.

## 4. Testar cada mudança isoladamente, não todas juntas

O teste anterior (Chongqing → Fenghuang) misturou várias mudanças de uma vez, o que tornou difícil separar o que ajudou do que piorou (só descobrimos que o protocolo do redator piorou porque fomos conferir turno a turno). Para o próximo teste:

- Rodar 1 cidade só com a mudança nº 2 (turnos mecânicos do orquestrador) primeiro, medir.
- Depois somar a nº 3 (image-sourcing em lote), medir de novo.
- `measure_v2.py` (script corrigido, deduplicado por `message.id`) é o script de referência para toda medição futura — não reusar o script antigo (`measure_generic.py`, com o bug de contagem duplicada).

## Estimativa de impacto

Alvo direto: reverter o protocolo do redator deve recuperar a diferença de +7% observada nele (voltar para próximo de 1,09M), e os turnos mecânicos do orquestrador (hoje ~36, boa parte evitável) são a maior superfície ainda não atacada — cortar pela metade só esse número já implicaria uma fração proporcional de queda no custo do orquestrador (hoje 1,17M). Estimativa realista combinada: **3,44M → ~2,3-2,6M** (mais −25 a −33% sobre o v2, adicional ao −27% já obtido — algo como −45 a −50% sobre o baseline original de 4,70M).

## Resultado real do teste v3 (Guizhou, 27/08/2026) — resultado misto, ver `CUSTO-GUIZHOU.md`

A estimativa acima **não se confirmou** — Guizhou ficou em 3.911.686 (−17% vs. baseline v1, mas **+14% vs. v2/Fenghuang**). Dois dos quatro itens do plano funcionaram exatamente como desenhado (curadoria de imagem: 24→13 turnos; orquestrador: 36→30 turnos, mesmo com +2 módulos); o item 1 (reverter o protocolo do redator) só resolveu parte do problema — confirmado que nenhum `travel-writer` usou `Write`, mas os turnos por módulo continuaram altos (4,1, vs. 2,5 do baseline v1) porque o writer passou a gastar turnos com `Glob`/`Read` procurando a pesquisa persistida em vez de recebê-la já colada no prompt. Correção aplicada para a próxima rodada: orquestrador cola o trecho relevante direto no prompt de cada `travel-writer` (não aponta pra arquivo), e `Glob` foi removido das ferramentas do redator. Ainda não medido — próximo teste deve isolar só essa mudança.
