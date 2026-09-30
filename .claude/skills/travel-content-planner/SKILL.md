---
name: travel-content-planner
description: Orquestra o planejamento sob medida de UMA página de cidade ou atração antes de qualquer prosa ser escrita — perfil do viajante e ângulo único primeiro, depois delega busca de lugares/eventos/imagens e seleção de módulos a skills dedicadas, e valida o brief resultante antes de liberar para escrita. Use SEMPRE antes de invocar travel-magazine-writer.
---

# Travel Content Planner (orquestrador)

**Escopo: só páginas de Cidade e Atração** (`pesquisa/cidades/`, `pesquisa/atracoes/`). Para páginas de Aprofundamento (`pesquisa/aprofundamento/paises/` e `.../provincias/`), use [[travel-deepdive-writer]] — é um processo mais leve, sem place-finder/event-finder e sem o eixo lugar×viajante×data, porque não faz sentido para conteúdo de referência (dinastia, etnia, geografia, história, culinária regional).

Este planejador não faz tudo sozinho — ele decide o essencial (perfil, ângulo) e delega o resto a skills especializadas, cada uma com um trabalho bem definido. Isso existe porque uma skill monolítica decidindo tudo de uma vez tende a cortar módulos por suposição em vez de checagem real (ex.: descartar "vida noturna" só porque "é viagem solo", sem nunca checar o que de fato existe).

## Antes de tudo — gestão de contexto

Leia `pesquisa/_pipeline/CHEATSHEET.md` e `pesquisa/_pipeline/GOLD-STANDARD-DIGEST.md` para a ordem do pipeline e o formato/pisos de palavra esperados — não o `CLAUDE.md` inteiro nem a página-modelo inteira, a menos que algo genuinamente ambíguo exija. Isso é uma questão de custo real: releitura de contexto grande em cada turno domina o custo deste pipeline. Ver `pesquisa/_pipeline/README.md` para a razão completa.

## Passo 1 — Perfil do viajante

Leia o arquivo de perfil do viajante do guia ativo (ex.: `pesquisa/perfil-viajantes.md`). Deve conter: quem viaja, **as datas reais de visita e a estação/clima que elas implicam**, **o tempo útil real reservado a este lugar no roteiro** (dias inteiros? poucas horas de escala? chegada sem exploração?) — essa é uma variável de peso igual às outras, não um detalhe de rodapé: ela entra no Passo 4 (nível de profundidade) e pode sobrepor tanto a complexidade objetiva do lugar quanto o interesse do viajante, motivação da viagem, interesses em ordem de prioridade, ritmo preferido, restrições reais, e qualquer inferência já registrada a partir do próprio roteiro.

**Se o arquivo não existir ou estiver incompleto, pare e sinalize no brief — não invente perfil, e não planeje "para qualquer um".**

## Passo 2 — Ângulo único

Antes de classificar o lugar ou escolher módulos, decida o ângulo que ancora a página: o que faz este lugar único **para este viajante, nesta data, com este tempo disponível** — não o que é objetivamente único no mundo. Formule em 1-2 frases. Esse ângulo abre e fecha a página, e orienta as decisões dos passos seguintes.

## Passo 3 — Delegue a busca de matéria-prima real

Antes de decidir módulos, reúna o que existe de verdade, através das skills dedicadas:

- **Lugares reais** (restaurante que se destaca, café que os locais frequentam, doceria/sorveteria lendária, mercado de comida, bares) → [[travel-place-finder]]. Nunca escreva um módulo de gastronomia/compras/vida noturna só com categorias de prato/tipo de loja quando puder ter nomes reais.
- **"O que está acontecendo" — eventos, festivais, feriados e atividades sazonais coincidindo com a data fixa da visita** → [[travel-event-finder]]. Para páginas de cidade, este módulo é **mandatório** — nunca fica de fora do brief, mesmo quando a checagem não encontra festival pontual (nesse caso a seção é montada com as camadas sazonais que a skill sempre levanta).
- **Imagens** → [[travel-image-sourcing]] (tipicamente um agente dedicado, dado que envolve busca iterativa + verificação técnica de URL).

O resultado dessas buscas — inclusive um resultado "nada encontrado" — é insumo para o passo seguinte, não algo a pular.

## Passo 4 — Selecione os módulos

Use [[travel-section-selector]] para classificar o subtipo do lugar, atribuir o nível de profundidade e montar o menu de módulos — alimentando essa seleção com o ângulo do Passo 2, o perfil do Passo 1, e os achados reais do Passo 3. É essa skill que decide, por exemplo, se "vida noturna" ganha uma seção de peso, uma nota curta, ou é omitida — sempre com base no que foi de fato encontrado, nunca por suposição.

## Passo 5 — Valide o brief antes de liberar para escrita

Antes de mandar o brief para escrita, rode-o contra [[travel-brief-validator]] — que confirma se a personalização é real, se os guardrails contra descarte precipitado foram seguidos, se lugares/eventos reais foram de fato buscados onde deveriam, e se o ângulo é específico. Só um brief aprovado nessa validação segue para escrita.

## Passo 6 — Escrita por módulo, nunca por página inteira

Um brief aprovado NUNCA é despachado como uma única tarefa de escrita de página inteira — isso produz conteúdo raso (erro já cometido e corrigido nesta skill). Use [[travel-page-assembler]] para orquestrar: uma invocação de [[travel-magazine-writer]]/agente `travel-writer` por módulo do brief, montagem do arquivo final, e só então revisão pelo [[travel-content-reviewer]] sobre a página completa montada. Para páginas de cidade, dois módulos são **mandatórios** (ver [[travel-section-selector]]) — nunca omitidos nem absorvidos dentro de outro módulo: o **roteiro hora a hora** e **"o que está acontecendo"** (eventos/festivais/feriados/atividades sazonais nas datas exatas da visita).

## Saída esperada: o brief

Documento curto (não prosa de página) com: (1) perfil do viajante considerado; (2) ângulo único; (3) achados de [[travel-place-finder]]/[[travel-event-finder]]/[[travel-image-sourcing]] relevantes a esta página; (4) classificação/profundidade/módulos de [[travel-section-selector]], com justificativa lugar×viajante×achados reais para cada módulo escolhido e descartado; (5) faixa de tamanho esperada por módulo; (6) confirmação de que passou por [[travel-brief-validator]].

Esse brief é o que [[travel-magazine-writer]] recebe como instrução de trabalho. O [[travel-content-reviewer]] valida o texto final contra ESTE brief específico — incluindo se lugares/eventos reais citados no brief de fato aparecem na prosa, não só no plano.
