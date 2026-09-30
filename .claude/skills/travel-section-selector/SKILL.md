---
name: travel-section-selector
description: O motor de decisão do planejador de conteúdo — classifica o subtipo do lugar, atribui o nível de profundidade e monta o menu de módulos sob medida (de uma biblioteca aberta), sempre a partir do ângulo único e do perfil do viajante já definidos. Use dentro de travel-content-planner depois que o ângulo único já foi decidido.
---

# Travel Section Selector

Este é o motor de decisão de estrutura de página — recebe um ângulo único e um perfil de viajante já prontos (de [[travel-content-planner]]) e decide subtipo, profundidade e módulos. Não decide personalização nem ângulo: isso já vem resolvido de antes.

## Passo 1 — Classifique o assunto de verdade

Não force um encaixe em "atração genérica" ou "cidade genérica". Identifique o que esse lugar **é**, na prática. Estas listas são ponto de partida, não catálogo fechado — nomeie o subtipo você mesmo se nada descrever bem.

**Atrações** — sítio arqueológico/mausoléu, edifício religioso, palácio/edifício histórico, museu/coleção, bairro/distrito, mercado, paisagem natural/mirante/formação geológica, ponte/obra de engenharia, vila/aldeia histórica, complexo de entretenimento/parque temático, praia/orla, trilha/experiência ao ar livre, distrito de compras, zona de vida noturna, evento/festival sazonal, ruína, memorial, mirante urbano, complexo esportivo, spa/termas, vinícola/rota gastronômica, rota cênica...

**Cidades/paradas** — metrópole global, capital histórica ou cidade grande de relevância regional, cidade média turística, cidade litorânea/de praia, vila/pequena cidade, destino de compras, destino de vida noturna, escala de trânsito sem tempo de exploração real...

## Passo 2 — Atribua um nível de profundidade, não um número fixo

Resultado de **três** fatores combinados — não dois:
- **Complexidade/relevância real do lugar** — quanto sustenta objetivamente em história, escala, cultura.
- **Peso para este viajante** — um lugar "menor" no papel pode merecer profundidade alta se está no centro do que este viajante busca; um lugar famoso pode merecer tratamento mais leve se, para este viajante, é só um "já que estamos aqui".
- **Tempo útil real disponível no roteiro para este lugar especificamente.** Este fator pode **sobrepor** os outros dois: um lugar objetivamente riquíssimo em conteúdo, mas onde o viajante só passa algumas horas de escala/trânsito, não deve receber tratamento de profundidade alta só porque o lugar "merece" — ele merece, mas o roteiro não abre espaço para isso ser vivido. Exemplo real deste guia: Pequim tem séculos de história e sustentaria uma página tão densa quanto Xi'an, mas no roteiro real é só parada de chegada, sem tempo de exploração — a página correta para Pequim é enxuta, não porque o lugar seja menos importante, mas porque o tempo útil ali é quase zero. Ao atribuir profundidade, sempre pergunte primeiro: quantas horas/dias de tempo útil (não de trânsito, não de sono) o roteiro real reserva para este lugar? Essa informação vem do perfil do viajante/roteiro (contagem de dias por trecho, notas de chegada/saída, dias com componente de trabalho remoto etc.) — nunca estime de forma abstrata quando o dado real já está disponível.

**Nunca aplique a mesma meta de tamanho a duas páginas só porque são do mesmo subtipo ou do mesmo guia — e nunca aplique profundidade alta a um lugar rico em conteúdo mas pobre em tempo útil real.**

## Passo 3 — Monte o menu de módulos sob medida

Escolha módulos de uma **biblioteca aberta** — exemplos abaixo, não catálogo obrigatório nem exaustivo. Nomeie um módulo que não está listado sempre que o lugar/perfil pedir algo que nenhum item cobre bem. Descarte sem culpa qualquer item que não se aplique — mas siga os guardrails abaixo antes de descartar.

### Exemplos — ATRAÇÃO
Abertura/lede · walking tour/roteiro a pé · contexto histórico narrativo · arquitetura em detalhe minucioso · engenharia/geografia/formação · contexto religioso/espiritual · contexto social/comunidade viva · estado da pesquisa/conservação · curiosidades · o que observar/roteiro de olhar · onde comer/comprar por ali (com lugares reais — ver [[travel-place-finder]]) · compras · vida noturna local · experiência para crianças/família · fotografia · acessibilidade e mobilidade reduzida · clima/melhor estação · eventos/festivais sazonais (ver [[travel-event-finder]]) · roteiro de aventura/atividade física · informações práticas · encerramento.

### Exemplos — CIDADE / PARADA

**Duas entradas desta lista são MANDATÓRIAS para toda página de cidade com roteiro definido — nunca descartadas, nunca fundidas dentro de outro módulo:**
- **Roteiro hora a hora** — nunca funda dentro de "como se locomover" ou qualquer outro módulo.
- **"O que está acontecendo" (eventos/festivais/atividades sazonais nas datas exatas da visita)** — toda página de cidade recebe esta seção própria, sempre, mesmo quando a checagem via [[travel-event-finder]] não encontra festival ou evento pontual algum. Ver guardrail dedicado abaixo — isto substitui o tratamento antigo de "seção própria / rodapé / omitir-mas-checado": a seção nunca é omitida, só o conteúdo varia com o que foi encontrado.

Abertura/lede · retrato geral · a cidade em resumo (ficha) · como se locomover · bairro em resumo · landmarks/pontos essenciais · compras (lugares reais) · praias/orla · **vida noturna/depois do pôr do sol** (ver guardrail) · roteiro hora a hora (mandatório) · gastronomia — cultura alimentar **com lugares reais nomeados** (ver [[travel-place-finder]]) · onde ficar · clima e melhor época · **"o que está acontecendo" — eventos/festivais/atividades sazonais nas datas da viagem (mandatório, ver [[travel-event-finder]])** · experiência para crianças/família · dia de folga · segurança e etiqueta social · "o que só quem mora aqui sabe" (hidden gems locais) · quadro prático · encerramento.

## Guardrails contra descarte precipitado (erros já cometidos — não repita)

- **"Viagem solo" ou "sem interesse declarado em vida noturna" não é motivo para descartar o módulo de vida noturna/depois-do-pôr-do-sol.** Saber o que existe é informação básica de guia mesmo para quem não vai sair para balada. Trate como módulo mínimo obrigatório (mesmo que curto): o que existe, o que muda entre dia de semana e fim de semana, o que é seguro/vale a pena para quem está sozinho.
- **"O que está acontecendo" (eventos/festivais/atividades sazonais) nunca é omitido em página de cidade — é módulo mandatório, no mesmo nível do roteiro hora a hora.** Erro já cometido neste pipeline: tratar o módulo de eventos como opcional e deixá-lo de fora sempre que a checagem não achava um festival grande o suficiente. Rode [[travel-event-finder]] contra a data fixa da viagem e escreva a seção sempre, com o conteúdo proporcional ao que foi encontrado:
  - Achou evento/festival relevante nas datas exatas (ex.: Canada Day em Ottawa em 1º de julho, Festival de Jazz em Montreal) → seção completa, no piso de tamanho normal de módulo de cidade.
  - Achou algo relevante na região/país mas que não afeta esta cidade/data específica → seção mais curta, mas ainda presente, contextualizando o que está acontecendo por perto e por que não muda o roteiro aqui.
  - Nada de pontual encontrado → a seção não fica vazia: cubra o que está sazonalmente ativo nessas datas mesmo sem festival nomeado — safra/prato de estação, clima e o que ele libera ou impede (ex.: folhas de outono, floração, temporada de neve), horário de pôr do sol, feriados nacionais/locais em vigor, o que costuma lotar ou esvaziar a cidade nessa janela do calendário.
- **Gastronomia/compras/vida noturna nunca ficam só em categorias/tipos genéricos.** Sempre que o módulo existir, ele precisa de pelo menos uma tentativa de achar lugares reais e nomeados via [[travel-place-finder]] antes de escrever só "prove X" sem dizer onde.
- **"O que só quem mora aqui sabe"** — pergunte sempre, mesmo sem módulo dedicado: existe algo que a versão de cartão-postal do destino não mostra? Se sim, nomeie o módulo e inclua. **Este módulo é uma coleção, não um estudo de caso único**: busque e inclua no mínimo 3-4 lugares/rituais/hábitos distintos (a mesma lógica de "curiosidades" — vários itens curtos e desenvolvidos, não um único item esgotado em profundidade). Um guia que só encontrou um "segredo local" não fez a pesquisa completa — volte ao [[travel-place-finder]] e busque mais candidatos antes de escrever.

Para CADA módulo escolhido, justifique em 1 linha por que importa **para este lugar E para este viajante**. Para módulos de exemplo descartados, justifique também — e, se o descarte for de gastronomia/compras/vida noturna/eventos, cite explicitamente o resultado da checagem via place-finder/event-finder que sustenta o descarte.

## Saída

Classificação do subtipo + justificativa; nível de profundidade + justificativa; módulos escolhidos com justificativa lugar×viajante (e resultado de place-finder/event-finder quando aplicável); módulos descartados com justificativa; módulos extras inventados; faixa de tamanho por módulo. Isso alimenta o brief final de [[travel-content-planner]], que depois passa por [[travel-brief-validator]].
