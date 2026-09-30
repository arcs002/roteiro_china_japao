---
name: travel-day-logistics
description: Motor de restrições para planejamento de dias de roteiro — valida sequência de atividades contra golden windows por tipo de atividade, estima tempo de deslocamento entre pontos, identifica conflitos de horário e infeasibilidades. Não escreve texto final — produz um relatório estruturado usado pelo travel-day-planner para montar o day summary.
---

# Travel Day Logistics

Esta skill é o motor de restrições do planejamento de dias. Ela não escreve o roteiro — ela valida se um roteiro proposto é factível, em que horário cada atividade deve ficar e por quê, e onde estão os pontos de atrito logístico. Quem chama (`travel-day-planner`) usa o relatório desta skill para montar um day summary honesto e executável.

## Entradas

- **Lista de atividades/atrações candidatas para o dia** — nome, tipo (atração cultural, mercado, restaurante, mirante, passeio fluvial, etc.), localização/bairro aproximado
- **Data e cidade** — necessárias para calcular horário de nascer/pôr do sol, clima esperado, dias da semana (museus fecham segundas em muitos países)
- **Ponto de partida do dia** (geralmente o hotel) e **ponto de chegada/saída** (hotel de volta, estação de trem, aeroporto)
- **Contexto do perfil do viajante** — ritmo (intenso/moderado/leve), restrições físicas, preferências que afetam timing (por ex.: não acorda cedo, prefere jantares tardios)

## Tabela de Golden Windows por tipo de atividade

Use esta tabela como referência primária de timing. Quando duas atividades concorrem pelo mesmo horário, priorize a que tem janela mais restrita (uma atração que só funciona de manhã pesa mais que um museu que funciona o dia todo).

### Manhã cedo (6h–9h)
| Atividade | Razão da janela | Conflito típico |
|---|---|---|
| Mirantes com névoa matinal | Névoa e luz baixa são o ativo fotográfico; a névoa dissipa entre 9h30 e 11h | Se perder essa janela, o mirante vira outro mirante qualquer |
| Mercados de rua / quitandas locais | Vendedores chegam cedo, produto fresco, fila de moradores não de turistas; após 10h muitos fecham ou viram turísticos | Virar tarde anula o propósito |
| Templos ativos (serviços matinais) | Serviços e rituais diários acontecem entre 7h e 9h; fora disso, o templo existe mas não opera | — |
| Caminhadas em parques/jardins | Taichi, idosos locais, silêncio antes do fluxo turístico | — |
| Bairros históricos antes da multidão | Sem grupos de tour, com moradores ainda no cotidiano | Criticamente perecível: depois das 10h muda de caráter |

### Manhã plena (9h–12h)
| Atividade | Razão da janela | Notas |
|---|---|---|
| Museus e sítios arqueológicos | Abertura + menor densidade de visitantes; grupos de tour chegam entre 10h30 e 11h | Para sítios muito visitados, chegar na abertura pode ser a única forma de ter o lugar "para si" nos primeiros 45 min |
| Cavernas / grutas / sítios naturais fechados | Geralmente permitem entrada até certa hora; calor ainda tolerável | Verificar horário de corte de entrada — alguns cortam às 16h |
| Bairros de mercado em bom estado | Atividade plena, mas já com turistas também; melhor que a tarde | — |
| Caminhadas/trilhas | Temperatura mais amena que a tarde; luz funciona | Em novembro na China, luz da manhã é boa |

### Meio-dia (12h–14h)
| Atividade | Razão da janela | Notas |
|---|---|---|
| Almoço (bloco obrigatório, ~1h) | Evitar pico de fila: ou 11h30 antes do rush ou 13h depois | Restaurantes locais cheios exatamente 12h–13h |
| Transferências longas de transporte | Hora menos útil do ponto de vista de luz/conteúdo | Boa hora para metrô ou táxi entre bairros distantes |
| Descanso em local climatizado (museu, shopping) | Calor de pico em verão; em novembro, menos crítico | — |

### Tarde (14h–17h)
| Atividade | Razão da janela | Notas |
|---|---|---|
| Museus (segunda visita do dia ou menos prioritários) | Fluxo de turistas geralmente diminui após 15h | — |
| Passeios de barco / fluviais | Luz da tarde funciona; evita calor de pico | Verificar horários de operação — muitos encerram às 17h–18h |
| Exploração de bairros sem constraint de horário | Lojas abertas, ruas cheias mas não insuportáveis | — |
| Compras, souvenires | Sem urgência de horário | — |

### Fim de tarde / golden hour (16h30–18h30)
| Atividade | Razão da janela | Notas |
|---|---|---|
| Mirantes para pôr do sol | Luz mais bonita do dia; em novembro China, pôr do sol 17h30–18h | Janela específica: posicionar no mirante 20–30 min antes |
| Atividades em alturas (teleférico, subida) | Luz dourada | — |
| Fotografia de rua / mercados ao entardecer | Iluminação natural favorável + atividade de fim de tarde local | — |

### Noite (18h30+)
| Atividade | Razão da janela | Notas |
|---|---|---|
| Complexos iluminados (ex.: Hongyadong) | Iluminação começa entre 18h30 e 19h; janela ideal 19h–21h | Sair cedo demais mata a foto |
| Hotpot / jantar tardio local | Cultura local de jantar entre 19h e 21h; antes disso os restaurantes ficam semiabertos | Hotpot Chongqing funciona melhor 20h–22h |
| Vida noturna / bares/mercados noturnos | Animam depois das 21h | — |
| Jantares em altura / vistas noturnas | 20h–22h para skylines | — |

### Restrições por dia da semana
- **Museus:** a maioria na China fecha segundas-feiras (verificar caso a caso, especialmente museus municipais). Confirme sempre para atrações específicas.
- **Mercados:** alguns mercados de fim de semana não operam em dias de semana.
- **Templos:** geralmente abertos todos os dias, mas serviços específicos têm dias certos.

## Estimativas de tempo de deslocamento por modal

Use como base de cálculo, sempre ajustando para horário de pico (+30–50% no rush das 7h–9h e 17h–19h).

| Modal | Velocidade de referência | Notas |
|---|---|---|
| A pé | ~15 min/km em terreno plano; +5–10 min/km em encosta íngreme (Chongqing) | Chongqing: adicionar sempre o desnível |
| Metrô | ~3–5 min por estação + 5–10 min de caminhada até/da estação + 2–3 min espera média | Para distâncias >4 estações, quase sempre mais rápido que táxi no rush |
| Táxi / DiDi | ~2 km/min fora do rush; 1 km/min no rush | Na China, DiDi é confiável; custo base 10–15 yuan + 2–3 yuan/km |
| Ônibus | Imprevisível; só para trajetos sem metrô | Evitar para timing preciso |
| Táxi de longa distância (para fora da cidade) | Conforme rota — sempre pesquisar ou confirmar com concierge | — |

### Tempo mínimo entre atividades (buffer)
- **Mesma área / a pé <15 min:** 20 min de buffer (inclui espera + orientação)
- **Metrô 2–4 estações:** 30 min de buffer
- **Metrô 5+ estações ou baldeação:** 45 min de buffer
- **Táxi cross-city:** 60 min de buffer (trânsito imprevisível)
- **Refeição:** mínimo 60 min para almoço/jantar local real; 30 min para lanche rápido

## Formato do relatório de saída

Produza um relatório estruturado com:

### 1. Sequência validada
Lista ordenada das atividades com:
- Horário de início proposto
- Horário de saída estimado
- Duração na atividade
- Modal e tempo de deslocamento até a próxima
- Flag de golden window: `✓ dentro da janela` / `⚠ beira da janela` / `✗ fora da janela — considerar reposicionar`

### 2. Conflitos e infeasibilidades
Cada conflito com:
- O que está errado
- Impacto (crítico / alto / baixo)
- Solução sugerida (reordenar, cortar, ajustar horário de início do dia)

### 3. Arco energético do dia
Nota sobre a curva de esforço do dia:
- Atividades fisicamente intensas (caminhadas longas, muitas escadas) não devem ficar empilhadas na segunda metade do dia sem intervalo
- Verificar se o almoço está bem posicionado (não às 14h30 depois de 6h sem parar)
- Verificar se o jantar permite o tipo de encerramento que o perfil pede (encerramento tranquilo, noite animada, etc.)

### 4. Dados para o day summary
Bloco estruturado que o `travel-day-planner` usa para escrever o summary:
```
ARCO: [Manhã exploratória + tarde mais leve + noite em X]
PARTIDA: [hora] de [local]
BLOCOS:
  - [hora início]–[hora fim]: [atividade] | [bairro] | [modal de chegada, X min]
  - ...
ALMOÇO: [hora] em [bairro/tipo de lugar]
JANTAR: [hora] em [local sugerido]
RETORNO: [hora] ao hotel via [modal]
CUSTO DO DIA: ~[X] yuan (só atrações e transporte; sem jantar)
FLAGS DE ATENÇÃO: [lista de qualquer coisa que o escritor deve mencionar no summary]
```

## O que esta skill NÃO faz

- Não escreve o day summary (isso é `travel-day-planner`)
- Não escreve o hora-a-hora (isso é `travel-day-writer`)
- Não escolhe quais atividades incluir no dia (isso é decisão humana ou do `travel-day-planner`)
- Não pesquisa horários oficiais de funcionamento — usa ranges típicos e sinaliza quando precisa verificação
