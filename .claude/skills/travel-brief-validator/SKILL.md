---
name: travel-brief-validator
description: Valida o BRIEF de planejamento (produzido por travel-content-planner/travel-section-selector) antes de ele ir para o redator — confirma que a personalização é real, que os guardrails contra descarte precipitado foram seguidos, que place-finder/event-finder foram de fato usados onde deveriam, e que o ângulo é específico. Use sempre entre o planejamento e a escrita, não só no conteúdo final.
---

# Travel Brief Validator

O erro que esta skill existe para evitar: revisar só o texto final e descobrir tarde demais que o *plano* já estava errado (módulo cortado por suposição, gastronomia sem lugares reais, ângulo genérico) — quando teria sido mais barato pegar isso antes de qualquer prosa ser escrita.

## O que checar

### 1. Personalização real, não decorativa
O brief cita o perfil do viajante de forma específica (interesses, restrições, datas) em cada decisão de módulo, ou só menciona o perfil genericamente no início e depois ignora? Marque cada módulo cuja justificativa poderia ser copiada e colada para qualquer outro viajante sem perder sentido — isso é sinal de personalização decorativa, não real.

### 2. Guardrails de descarte seguidos
Para cada módulo de exemplo descartado (especialmente vida noturna, gastronomia/compras com lugares reais): o brief cita o resultado de uma checagem real (via [[travel-place-finder]] ou [[travel-event-finder]]) sustentando o descarte, ou descartou por suposição ("viagem solo, provavelmente não relevante")? Descarte sem checagem registrada = FALHA, devolver para o planejador antes de prosseguir.

### 2b. Módulos mandatórios de cidade presentes, sem exceção
Para toda página de CIDADE, confirme que o brief lista os dois módulos mandatórios como seções próprias (nunca ausentes, nunca fundidos em outro módulo): **roteiro hora a hora** e **"o que está acontecendo"** (eventos/festivais/feriados/atividades sazonais). Ausência de qualquer um dos dois é FALHA automática, independentemente de justificativa — estes não estão sujeitos ao descarte do item 2. Para "o que está acontecendo" especificamente: o brief precisa trazer o achado do [[travel-event-finder]] mesmo quando o resultado é "nenhum evento pontual encontrado" — nesse caso confirme que o brief ainda assim descreve as camadas sazonais (clima, feriados, safra, luz do dia) que vão sustentar a seção, não um veredito vazio.

### 3. Lugares reais, não categorias
Todo módulo de gastronomia/compras/vida noturna tem pelo menos uma tentativa de nome real de estabelecimento (com nível de confiança do [[travel-place-finder]]), não só tipo de prato/categoria.

### 4. Ângulo específico, não genérico
O ângulo único poderia ser copiado para outro lugar do guia trocando só o nome próprio? Se sim, FALHA — peça um ângulo mais específico ao cruzamento real lugar×viajante×data.

### 5. Profundidade justificada nos dois eixos
A profundidade atribuída cita tanto a complexidade real do lugar quanto o peso para este viajante — não só um dos dois.

### 6. Módulos extras contra "o que só quem mora aqui sabe"
O brief considerou explicitamente se há algo de "segredo local" a incluir, mesmo que a resposta final seja "nada relevante encontrado"? Ausência total dessa consideração é sinal de brief incompleto.

## Formato do veredito

Por item do checklist: PASS/FAIL + o que falta. Veredito geral: APROVADO (segue para o redator) / REPROVADO (volta para travel-content-planner/travel-section-selector com as correções específicas antes de qualquer prosa ser escrita). Máximo de 2 rodadas antes de escalar ao usuário — igual à disciplina do [[travel-content-reviewer]] para o texto final.
