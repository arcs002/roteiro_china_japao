---
name: travel-itinerary-logistics
description: Valida e persiste a alocação de dias/datas do roteiro inteiro contra as datas/horários reais de voo — ancora o calendário, identifica gaps/overlaps, valida a logística de transição entre paradas (sugerindo horários realistas de voo/trem), avalia se o tempo dedicado a cada parada faz sentido dado o perfil do viajante, e sugere paradas adicionais quando há folga real no calendário. Use sempre que houver mudança em voos/datas fixas, ou antes de qualquer trabalho de conteúdo por página começar, para garantir que o roteiro-base está correto.
---

# Travel Itinerary Logistics

Esta skill não escreve conteúdo de página — ela garante que a **espinha dorsal de datas/dias do roteiro está correta** antes que qualquer planejador de página (`travel-content-planner`) confie nela. Um brief de página perfeito, construído sobre uma data errada, produz um guia bonito e errado.

## Entradas obrigatórias

1. **`pesquisa/voos.md`** (ou arquivo equivalente) — horários reais de chegada/partida internacionais. Isso ancora as duas pontas do calendário. **Nunca assuma datas de calendário arredondadas quando o horário real de voo já está disponível.**
2. **O rascunho de roteiro atual** — a alocação de dias por cidade/parada (hoje, os arquivos `pesquisa/cidades/*.md` e a tabela de datas em `pesquisa/perfil-viajantes.md`).
3. **`pesquisa/perfil-viajantes.md`** — interesses, ritmo, restrições. Necessário para avaliar se o tempo por parada faz sentido, não só se os dias somam certo.

## Processo

### 1. Ancore o calendário nos voos reais

Calcule a data e hora exatas de chegada no primeiro destino e de partida do último. Marque explicitamente:
- **O primeiro dia é um dia cheio ou parcial?** Chegada de manhã cedo talvose permita dia quase inteiro; chegada ao meio-dia ou à tarde, depois de um voo longo com conexões, é dia parcial — na prática, geralmente menos ambicioso do que o resto do roteiro.
- **O último dia é um dia cheio ou parcial?** Se o voo de saída for de madrugada, a noite anterior já é consumida por deslocamento/check-in — o "último dia útil" é o penúltimo, não o último.
- **Existe algum trecho de conexão implícito não representado no roteiro** (ex.: um voo doméstico entre a última cidade visitada e o aeroporto de saída internacional, que não é o mesmo lugar)? Se sim, ele precisa aparecer como item explícito do roteiro, com data e (se possível) horário estimado — não pode ficar escondido dentro de "dia de retorno".

### 2. Recalcule a tabela de dias contra o calendário ancorado

Redistribua as datas de calendário reais para cada cidade/parada, mantendo a ordem e a duração relativa que o rascunho já definia, a menos que o passo 3 ou 4 abaixo indiquem mudança. Se a soma de dias do rascunho não bate com os dias reais disponíveis (sobra ou falta), isso é um **gap** — reporte explicitamente o tamanho do desvio (ex.: "rascunho assume 29 dias completos; janela real ancorada nos voos dá 27,5 dias úteis; faltam ~1,5 dia a redistribuir ou cortar").

### 3. Verifique gaps e overlaps

- **Gap**: dias sem cidade/parada atribuída, ou dias contados a mais do que a janela real permite.
- **Overlap**: duas paradas reivindicando a mesma data, ou uma transição que exige mais tempo de deslocamento do que o roteiro deixou entre uma parada e outra.
- Para cada transição entre paradas, valide se o tempo alocado é realista: pesquise ou estime a duração real do trecho (voo doméstico, trem-bala, trem noturno, ônibus) e o tempo de deslocamento até/desde aeroportos/estações — sinalize se o roteiro assume uma transição instantânea que não existe na vida real.

### 4. Sugira horários realistas de voo/trem para cada transição

**Regra padrão para trechos longos (declarada pelo viajante, aplicar por default em qualquer guia): prefira sempre o trem noturno (sleeper) ou, na ausência de um, o último trem rápido/voo disponível no dia** — nunca gaste horas de luz do dia em deslocamento quando existe uma opção que preserva esse tempo. Exemplos de referência: um trecho de ~4h pode ser feito num trem-bala tardio saindo ~22h e chegando ~2h da manhã, ou num sleeper saindo ~20h e chegando ~6h — ambos preservam o dia anterior inteiro E o dia seguinte quase inteiro, contra a alternativa ruim de sair de manhã e "queimar" a manhã de um dos dois lados. Ao propor horário para uma transição sem horário definido, siga esta ordem de preferência: (1) trem noturno/sleeper que preserva os dois dias adjacentes quase inteiros; (2) último trem-bala/voo do dia que ainda preserva o dia de partida inteiro; (3) só recorrer a deslocamento diurno no meio do dia quando as opções acima não existirem na rota real (confirme isso, não assuma). Isso vale por padrão para qualquer guia — é coerente com perfis de ritmo intenso, mas também é, em geral, a opção que maximiza tempo útil independente do perfil.

### 5. Avalie o tempo por parada contra o perfil — não só contra a soma de dias

Para cada parada, pergunte: **o tempo alocado é proporcional à combinação de (a) complexidade/riqueza real do lugar e (b) prioridade para este viajante específico** (mesma lógica de profundidade do [[travel-section-selector]], aplicada aqui à alocação de dias, não à extensão de texto)? Sinalize:
- Paradas com **tempo desproporcionalmente alto** para o que sustentam ou para o interesse real do perfil (candidatas a doar dias).
- Paradas com **tempo desproporcionalmente baixo** dado o quanto sustentam e o quanto batem no perfil (candidatas a receber dias, se houver de onde tirar).
- Nunca decida essa realocação sozinha de forma silenciosa — reporte como sugestão com justificativa, para confirmação humana.

### 6. Sugira paradas adicionais quando houver folga real

Se o passo 2 revelar dias sobrando (folga real, não erro de conta), e não houver uma realocação óbvia de #5 que absorva a folga, sugira paradas adicionais plausíveis geograficamente (na rota real, sem desvio absurdo) e alinhadas ao perfil (experiências autênticas, não tourist trap raso, ver calibração do perfil). Sempre com justificativa e citando de onde viria o tempo (dia sobrando de qual origem).

### 7. Persista o resultado, mas de forma auditável

Atualize a tabela de datas/dias na fonte de verdade (`pesquisa/perfil-viajantes.md` ou arquivo dedicado de roteiro) com as datas corrigidas — mas **nunca sobrescreva silenciosamente**: acompanhe a atualização de um changelog curto explícito (o que mudou, por quê, o que ficou como sugestão não aplicada) para o usuário revisar. Alterações que impliquem cortar ou adicionar uma parada inteira são sugestão, não aplicação automática — só ajustes de data/hora dentro da estrutura já aprovada de cidades são persistidos diretamente.

## Formato do relatório

1. **Calendário ancorado** — data/hora real de chegada e partida, com nota de dia parcial/cheio em cada ponta.
2. **Gaps/overlaps encontrados** — cada um com o tamanho do desvio e uma proposta de resolução.
3. **Transições validadas** — cada transição entre paradas com horário sugerido e modal (voo/trem-bala/trem noturno/ônibus) e uma nota se o tempo alocado no rascunho é insuficiente.
4. **Flags de tempo desproporcional** — paradas candidatas a ganhar ou perder dias, com justificativa dupla (complexidade do lugar + peso no perfil).
5. **Sugestões de paradas adicionais** (se houver folga real) — com justificativa geográfica e de perfil.
6. **Tabela de datas corrigida**, pronta para persistir, com changelog do que mudou.

Nada aqui decide sozinho uma mudança estrutural grande (cortar/adicionar cidade, redistribuir muitos dias) sem reportar ao usuário — a skill resolve a matemática e a logística, mas a decisão de roteiro final é humana.
