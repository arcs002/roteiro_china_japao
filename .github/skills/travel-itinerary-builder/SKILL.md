---
name: travel-itinerary-builder
description: Coordenador do loop de planejamento multi-dias — recebe lista de atrações + N dias disponíveis, faz draft de atribuição (qual atração em qual dia), valida com travel-day-validator, ajusta iterativamente até que todos os dias passem na validação, e entrega o assignment validado pronto para travel-day-planner. É o ponto de entrada para construir o roteiro de uma cidade do zero.
---

# Travel Itinerary Builder

Esta skill é o coordenador externo do loop de planejamento. Ela não escreve texto final nem hora-a-hora — ela garante que a **atribuição de atrações a dias está correta e coerente** antes que qualquer `travel-day-planner` seja invocado.

O problema que ela resolve: sem coordenação, `travel-day-planner` planeja cada dia de forma isolada e não pode saber que o dia 2 ficou sobrecarregado enquanto o dia 3 ficou vazio, ou que a mesma área da cidade aparece em dias consecutivos sem motivo.

---

## Entradas obrigatórias

1. **Lista de atrações da cidade** — nome, tipo, localização/bairro, duração estimada, restrição especial (ex.: excursão de dia inteiro, só funciona de manhã, fecha segunda)
2. **N dias disponíveis** com datas reais (para saber dia da semana, horário de chegada/partida em dias de ponta)
3. **Perfil do viajante** (`pesquisa/perfil-viajantes.md`) — ritmo, interesses, energia
4. **Contexto de chegada e saída** — horário do voo/trem de chegada (afeta quanto do dia 1 é útil) e do voo/trem de saída (afeta quanto do último dia é útil)
5. **Atrações opcionais / de corte** — atrações que podem ser incluídas se houver espaço ou cortadas sem prejuízo ao roteiro essencial

---

## Processo — o loop

### Iteração 0 — Coleta de dados

Antes de fazer qualquer draft, mapeie:
- Cada atração com sua **categoria de tempo** (ver tabela abaixo)
- Restrições duras: o que **não pode ser mudado** de dia (excursão Dazu = dia inteiro fixo; chegada com voo à tarde = dia 1 parcial)
- Quais atrações têm **golden window insubstituível** — essas precisam de um dia com o horário certo disponível
- Total de horas de atividade estimadas ÷ horas úteis disponíveis = **taxa de ocupação bruta**. Se > 1.2×, há cortes obrigatórios. Se < 0.7×, há espaço para atrações opcionais.

**Tabela de categorias de tempo:**
| Categoria | Duração típica | Impacto no dia |
|---|---|---|
| Excursão full-day | 8–10h | Ocupa o dia inteiro; não combinar com nada além de jantar na cidade |
| Atração pesada | 2–3h | Máximo 2 por dia pleno |
| Atração média | 1–1.5h | Máximo 3–4 por dia pleno |
| Atração leve / passagem | 30–45 min | Pode aparecer como "bônus" entre atrações |
| Bairro de caminhada | 1.5–2.5h | Geralmente âncora de manhã (antes de turistas) |
| Jantar temático | 1–1.5h | Parte do encerramento do dia |

### Iteração 1 — Draft de atribuição

Regras de draft inicial:
1. **Fixar as restrições duras primeiro** — dias de chegada/partida com carga ajustada, excursões full-day isoladas
2. **Distribuir as atrações de golden window restrita** — colocar cada uma no dia cujo horário disponível coincide com sua janela ideal
3. **Criar temas por dia** — agrupar atrações com fio narrativo em comum (mesma área geográfica, mesmo tipo de experiência, mesma época histórica)
4. **Equilibrar a carga** — dias alternando pesado/médio, nunca dois dias seguidos no limite máximo
5. **Deixar atrações opcionais por último** — inserir nos dias mais leves se couberem

**Formato do draft:**
```
Dia 1 [data, dia semana] — [Título tentativo]
  Chegada: [horário] → [horas úteis disponíveis]
  Atrações: [lista com categoria e duração estimada]
  Carga total estimada: Xh / Yh disponíveis = Z%
  Bairros envolvidos: [lista]
  Golden windows necessárias: [lista]

Dia 2 [data, dia semana] — [Título tentativo]
  ...
```

### Iteração 2 — Validação com travel-day-validator (Modo 1)

Passe o draft completo para `travel-day-validator` no Modo 1 (assignment validation).

**Se APROVADO:** avançar para o Passo Final.

**Se APROVADO COM AJUSTES ou REPROVADO:** aplicar as ações do relatório e re-iterar.

### Iterações subsequentes — Ciclo de ajuste

Para cada flag CRÍTICA ou ALTA no relatório:

1. **Leia a ação concreta** proposta pelo validador
2. **Aplique a mudança mínima** que resolve o flag sem criar novos problemas:
   - Mover atração entre dias → verificar se o dia receptor não passa a ter flag
   - Cortar atração → verificar se o dia não fica subaproveitado
   - Reordenar dentro do dia → verificar se a sequência geográfica ainda faz sentido
3. **Re-valide** o novo draft (só precisa re-validar os dias que mudaram + D5 cross-day)

**Critério de parada:**
- **Sucesso:** zero flags CRÍTICAS, ≤ 2 flags ALTAS menores documentadas
- **Escalada:** após 3 iterações sem resolver todas as flags CRÍTICAS → parar e reportar ao usuário com as flags abertas e as opções disponíveis (cortar atração X, aceitar o dia sobrecarregado, ou redistribuir dias pedindo +1 dia à cidade)

**O que nunca fazer:**
- Silenciosamente ignorar uma flag CRÍTICA e avançar mesmo assim
- Criar uma "solução" que move o problema de um dia para outro sem net improvement
- Adicionar um dia fictício que não existe no calendário real para resolver sobrecarga

### Passo Final — Entrega do assignment validado

O output final é um documento `pesquisa/dias/00-[cidade]-assignment.md` com:

```markdown
---
type: assignment
city: [slug]
validated: true
iterations: N
---

# Atribuição validada — [Cidade]

## Resumo
- **Dias disponíveis:** N ([data início] – [data fim])
- **Atrações incluídas:** X de Y candidatas
- **Atrações cortadas:** [lista com motivo]
- **Atrações opcionais incluídas:** [lista]
- **Iterações de validação:** N (aprovado com [zero | X flags ALTAS menores])

## Dias

### Dia 1 — [Título]
**Data:** [DD/MM, dia semana]
**Tipo:** [chegada parcial | dia pleno | excursão | partida parcial]
**Atrações:** [lista em ordem proposta, com duração e bairro]
**Tema:** [o fio narrativo do dia]
**Golden windows críticas:** [lista]
**Notas para o travel-day-planner:** [flags de atenção, opções de corte se o dia ficar apertado]

### Dia 2 — [Título]
...

## Flags abertas (documentadas, não bloqueantes)
[Qualquer flag ALTA que foi aceita com justificativa, para que o travel-day-planner saiba]

## Próximo passo
Chamar travel-day-planner para cada dia, passando:
- O assignment deste arquivo (a seção do dia específico)
- O perfil do viajante
- Os arquivos de pesquisa das atrações do dia
```

---

## Relação com as outras skills do loop

```
travel-itinerary-builder  ← você está aqui (coordenador do loop)
    ↓ (assignment validado)
travel-day-planner         ← um por dia, em paralelo quando possível
    ↑ (usa travel-day-validator como auto-check)
    ↓ (day summary + <!--BRIEF-DIA-->)
travel-day-writer          ← um por dia, após o planner
    ↓
pesquisa/dias/*.md         ← hora-a-hora completo
```

O `travel-itinerary-builder` é invocado **uma vez por cidade**, antes de qualquer `travel-day-planner`. Os planners são invocados **em paralelo** depois que o assignment está validado — cada um recebe só a sua seção do assignment, sem precisar conhecer os outros dias.

---

## Critérios de qualidade do assignment

Um bom assignment, quando lido por alguém sem ter visto o processo, deve fazer sentido como roteiro:

- Cada dia tem um título que resume o tema sem ser uma lista de lugares
- A progressão entre dias conta uma história — começa orientação, vai para imersão, termina com síntese ou encerramento
- O ritmo varia — não há dois dias consecutivos de museu pesado
- Nenhum dia parece uma lista de pendências — todas as escolhas têm uma lógica que pode ser explicada em uma frase
- As constraints reais (chegada/partida, fechamentos, excursões) estão explicitamente anotadas para o planner
