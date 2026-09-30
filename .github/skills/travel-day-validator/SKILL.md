---
name: travel-day-validator
description: Valida um dia de roteiro ou um plano multi-dias inteiro contra critérios de factibilidade, coerência geográfica, arco energético e equilíbrio entre dias. Devolve um relatório com score por dimensão + ações concretas (mover atração X para dia Y, cortar Z, inverter ordem A↔B). Usado pelo travel-itinerary-builder no loop de iteração e pelo travel-day-planner como auto-check antes de entregar o day summary.
---

# Travel Day Validator

Esta skill não planeja nem escreve — ela avalia. O output é sempre um **relatório de validação** com score por dimensão e ações concretas suficientemente específicas para serem aplicadas sem ambiguidade.

---

## Modos de operação

### Modo 1: Validação de atribuição (assignment validation)
Input: a proposta de "quais atrações em qual dia" — sem horários detalhados ainda.
Usado por: `travel-itinerary-builder` no loop de iteração.
Foco: cross-day balance, factibilidade grosseira de cada dia, coerência temática entre dias.

### Modo 2: Validação de dia único (single-day validation)
Input: o day summary completo com `<!--BRIEF-DIA-->` (horários, sequência, modais).
Usado por: `travel-day-planner` como auto-check antes de entregar o output.
Foco: factibilidade temporal detalhada, coerência geográfica, arco energético.

---

## Dimensões de validação e critérios

### D1 — Factibilidade temporal

**Para assignment:** cada dia tem no máximo um número realista de atrações dado o tipo (ver tabela).
**Para dia único:** a soma de (tempo na atividade + buffer de deslocamento + refeições) ≤ horas disponíveis no dia.

| Tipo de dia | Atrações principais máximas | Horas disponíveis |
|---|---|---|
| Dia de chegada (voo matinal/tarde) | 1–2 leves | 4–6h úteis |
| Dia de chegada (voo noturno) | 0–1 orientação | 0–2h úteis |
| Dia pleno (sem transporte) | 3–4 | 10–12h úteis |
| Dia com excursão de dia inteiro (ex.: Dazu) | 1 excursão = dia inteiro | — |
| Meio-dia + tarde (partida noturna) | 2 leves | 4–6h úteis |
| Dia de partida (voo/trem manhã) | 0–1 | < 3h úteis |

Atração "pesada" (sítio arqueológico grande, museu extenso, caminhada intensa): +50% do tempo estimado de uma atração normal.

**Flag CRÍTICA:** total estimado do dia > horas disponíveis → o dia não é executável como proposto.
**Flag ALTA:** total estimado do dia = 90–100% das horas disponíveis → sem margem para imprevistos, clima, fila.
**Flag BAIXA:** total estimado < 50% das horas disponíveis → dia subaproveitado; considerar adicionar atração.

### D2 — Coerência geográfica

**Regra geral:** um dia deve ter no máximo 2 áreas/bairros distintos, conectados por um deslocamento lógico (não zigzag).

**Violações comuns:**
- Atração no extremo norte da cidade + outra no extremo sul + voltar ao norte para jantar
- Bairro histórico isolado (ex.: Ciqikou em Shapingba) combinado com sítio no centro + atração fluvial em outra margem — três deslocamentos de 30+ min cada

**Flag CRÍTICA:** >3 bairros distintos no mesmo dia com deslocamentos >20 min entre cada par.
**Flag ALTA:** sequência geográfica não otimizada — existe uma reordenação que reduziria >30 min de deslocamento total.
**Flag BAIXA:** deslocamento único longo (>45 min) sem conteúdo durante o trajeto — considerar se vale mencionar no roteiro ou usar metrô diferente.

**Ação concreta esperada:** "Inverter Ciqikou (manhã) → Hongyadong (tarde) para Hongyadong (tarde/noite) → Ciqikou eliminar do dia 2 e mover para dia 1."

### D3 — Arco energético

O dia bem estruturado tem uma curva de energia que faz sentido para o corpo e para a experiência:
- Atividades que exigem foco ou deslocamento intenso: **antes das 14h**
- Após almoço: atividade mais passiva ou culturalmente densa (menos corrida, mais absorção)
- Final do dia: experiência de encerramento — jantar + atividade noturna ou apenas jantar sem mais corrida

**Flags:**
- **ALTA:** atividade mais fisicamente exigente do dia (caminhada longa, trilha, muitos andares) programada após 15h, depois de um dia já intenso
- **ALTA:** sem almoço definido, ou almoço após 14h30
- **MÉDIA:** encerramento do dia com atividade que exige muito deslocamento ou energia — o leitor chega no hotel esgotado sem encerramento
- **BAIXA:** tarde excessivamente cheia depois de manhã pesada — sugestão de adicionar pausa ou reordenar

### D4 — Coerência temática do dia

Todo dia deve ter um **fio narrativo** — o "tema" que, quando você conta o dia para alguém, faz sentido como uma história.

**Exemplos de dias com tema forte:**
- "O dia da verticalidade" — Liziba (metrô no prédio) + Jiefangbei (rede subterrânea) + Hongyadong (palafita noturna)
- "O dia do rio" — Ciqikou (antigo porto do Jialing) + passeio fluvial + orla noturna do Yangtze
- "O dia fora da cidade" — excursão Dazu (dia inteiro, ônibus + táxi)

**Flag MÉDIA:** dia com 3+ atrações que não têm relação temática entre si — soa como lista de pendências, não como experiência.
**Flag BAIXA:** tema presente mas fraco — uma atração desvia levemente do fio; considerar se vale manter por logística mesmo sem fit temático perfeito.

### D5 — Equilíbrio entre dias (apenas no Modo 1 — assignment)

Avalia o conjunto de dias como um todo:

**Flag CRÍTICA:**
- Todos os marcos principais (flagship attractions) concentrados no mesmo dia
- Dia de chegada planejado como dia pleno sem ajuste de carga
- Dia de partida com atrações que exigem compra antecipada ou horário rígido que conflita com o trem/voo

**Flag ALTA:**
- Dias alternando muito pesado / muito leve sem progressão — melhor ter intensidade crescente até o pico e depois decrescente
- Bairro visitado em dois dias diferentes sem motivo narrativo claro
- Todas as atrações "pesadas" nos primeiros dias — o viajante chega ao final da estadia com fôlego mas sem nada relevante planejado

**Flag MÉDIA:**
- Tema do dia 2 e do dia 3 muito similares — dois dias "histórico + templo" em sequência sem variação de ritmo
- Atração de interesse muito alto no perfil jogada no último dia sem destaque

### D6 — Compatibilidade com o perfil do viajante

Verificar contra `pesquisa/perfil-viajantes.md` (se disponível no contexto):

- **Ritmo:** perfil intenso → validar que os dias estão aproveitando toda a janela útil. Perfil moderado → validar que não há dias > 10h de atividade.
- **Interesses:** atividades de prioridade baixa para o perfil não devem ocupar golden windows (ex.: shopping em horário de mirante com névoa).
- **Restrições físicas/dietéticas:** se houver, verificar se foram respeitadas na sequência de refeições e na carga física dos dias.

---

## Formato do relatório de saída

```
## Relatório de Validação — [Cidade] / [Modo: Assignment | Dia N]

### Resultado geral: APROVADO | APROVADO COM AJUSTES | REPROVADO

### Score por dimensão
| Dimensão | Score | Flags |
|---|---|---|
| D1 Factibilidade temporal | ✓ / ⚠ / ✗ | [resumo] |
| D2 Coerência geográfica | ✓ / ⚠ / ✗ | [resumo] |
| D3 Arco energético | ✓ / ⚠ / ✗ | [resumo] |
| D4 Coerência temática | ✓ / ⚠ / ✗ | [resumo] |
| D5 Equilíbrio entre dias | ✓ / ⚠ / ✗ | (modo assignment only) |
| D6 Perfil do viajante | ✓ / ⚠ / ✗ | [resumo] |

### Flags detalhadas (ordenadas por severidade)

#### CRÍTICAS (bloqueiam — devem ser resolvidas antes de avançar)
- [Flag]: [descrição precisa do problema]
  → Ação: [instrução específica e executável]

#### ALTAS (devem ser resolvidas se possível)
- [Flag]: [descrição]
  → Ação: [instrução]

#### MÉDIAS (considerar resolver)
- [Flag]: [descrição]
  → Ação sugerida: [instrução]

#### BAIXAS (opcional)
- [Flag]: [descrição]
  → Sugestão: [instrução]

### Atribuição corrigida (apenas Modo 1 — se houver flags CRÍTICAS ou ALTAS)
[Proposta de reatribuição de atrações entre dias com justificativa]

### Próximo passo
[O que fazer com este relatório: re-iterar com as correções, avançar para travel-day-planner, ou escalar ao usuário para decisão humana]
```

---

## Critérios de passagem

**APROVADO:** sem flags CRÍTICAS, no máximo 2 flags ALTAS menores.
**APROVADO COM AJUSTES:** sem flags CRÍTICAS, tem flags ALTAS → aplicar ações e re-validar (ou avançar aceitando as limitações documentadas).
**REPROVADO:** tem flags CRÍTICAS → não avançar para travel-day-planner sem resolver.

---

## O que esta skill NÃO faz

- Não reescreve o plano — propõe ações, quem decide e aplica é o `travel-itinerary-builder`
- Não pesquisa horários de funcionamento — usa ranges típicos da tabela de `travel-day-logistics` e sinaliza quando verificação manual é necessária
- Não avalia qualidade do texto — só a lógica do plano
