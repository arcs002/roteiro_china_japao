# Digest do padrão-ouro (leia isto, não os 12.700/8.000 palavras inteiros de Xi'an/Terracota, para calibrar formato)

> Extraído de `pesquisa/cidades/02-xian.expandido.md` e `pesquisa/atracoes/exercito-terracota.expandido.md`. Esses dois arquivos continuam sendo a referência completa para auditoria/dúvida real de qualidade — mas não precisam ser lidos por completo por quem só está orquestrando outra página. Isto aqui é o que basta para calibrar estrutura, tom e extensão.

## Amostra de voz — abertura de página de CIDADE (Xi'an)

> "Às 20h30, as torres do Sino e do Tambor de Xi'an se acendem contra o céu já escuro de início de novembro, e um aglomerado de turistas ergue o celular na mesma direção, buscando o ângulo em que as duas silhuetas iluminadas cabem no mesmo quadro. É a cena que qualquer guia de viagem promete e qualquer perfil de rede social já viu centenas de vezes [...] Vale o retrato. Mas é só o prólogo."
>
> "Bastam dez minutos de caminhada [...] para a cidade trocar de registro sem aviso. Do outro lado dessa passagem estreita não fica um bairro histórico preservado para visita, mas um bairro que segue sendo, à noite de terça-feira como de sábado, o lugar onde uma comunidade específica janta, negocia, reza e cria seus filhos."

## Amostra de voz — abertura de página de ATRAÇÃO (Exército de Terracota)

> "O primeiro efeito, ao se aproximar da mureta que separa o público das trincheiras, é de massa [...] À distância, o olho não distingue indivíduos — vê fileiras, um padrão repetitivo de capacetes, ombros, armaduras entrelaçadas, um exército reduzido a textura. É preciso caminhar ao longo da mureta [...] para que a massa comece a se desfazer em pessoas. Um rosto mais largo aqui, um bigode fino ali, uma ruga de concentração na testa de um arqueiro agachado."

**O que essas amostras mostram, na prática**: cena concreta em vez de afirmação genérica; detalhe sensorial (hora, luz, temperatura, som, distância caminhada) amarrado a um fato verificável (13,7 km de muralha, 230×62m de escavação); a transição de um parágrafo para o outro muda de registro (do cartão-postal para o que está por trás dele) em vez de só acrescentar mais adjetivo. Nenhuma das duas aberturas usa "imponente", "incrível", "de tirar o fôlego".

## Esqueleto de módulos — CIDADE (referência, ajuste ao lugar/brief real)

Abertura → Retrato geral → Como se locomover → **Roteiro hora a hora** (mandatório, 1 seção por dia coberto) → **O que está acontecendo** (mandatório) → Gastronomia/lugares reais → Vida noturna → "O que só quem mora aqui sabe" (3-4 lugares distintos) → Fotografia/mirantes (quando aplicável) → Clima/melhor época → Quadro prático → Encerramento → *(bastidor, filtrado do site)* Lugares reais pesquisados → Imagens por seção.

## Esqueleto de módulos — ATRAÇÃO (referência, ajuste ao lugar/brief real)

Abertura → Contexto histórico narrativo → Contexto religioso/social (quando aplicável) → Arquitetura/engenharia/geologia em detalhe → Curiosidades (5-8 itens, 100-180 palavras cada) → O que observar (5-7 itens) → Onde comer/comprar por ali (quando aplicável) → Fotografia → Informações práticas → Encerramento → *(bastidor)* Lugares reais pesquisados → Imagens por seção.

## Pisos de palavra (piso, nunca teto — tabela completa em `travel-magazine-writer`)

| Módulo | Piso |
|---|---|
| Abertura | 300-350 |
| Retrato geral / contexto histórico narrativo | 900 |
| Arquitetura/engenharia em detalhe | 700 |
| Roteiro hora a hora | 1.800 por dia coberto |
| "O que está acontecendo" | 400 (sem evento pontual) a 1.100 (com evento de peso) |
| Gastronomia / segredo local | 700-900 |
| Curiosidades | 100-180 por item × 5-8 itens |
| Encerramento | 300-350 |

**Total esperado, profundidade ALTA**: cidade 8.000-14.000 palavras (com roteiro); atração 5.000-8.000. Profundidade MÉDIA/BAIXA escala proporcionalmente ao tempo útil real do brief — não force o teto quando o tempo real não sustenta.

## Front matter (template, schema completo em `pesquisa/README.md`)

```yaml
---
type: city | atracao
slug: <slug>
title: "<Nome> — <tagline específica, não genérica>"
emoji: "🏛️"
order: <n>
days: [n, ...]
city: <slug-cidade-mãe>   # só atracao
pais: china | japao
provincia: <slug>         # só city, opcional
region: "<Região>, <País>"
---
```

## Convenções de fechamento de página

Bloco `> **Brief usado (travel-content-planner, aprovado):** ...` logo após o `# Título`, resumindo perfil considerado + ângulo único + profundidade + módulos escolhidos/descartados em ~150-250 palavras (não copie o brief inteiro). Fecha com `## Lugares reais pesquisados` (nome — tag CONFIRMADO/PROVÁVEL/NÃO CONFIRMADO — fonte) e `## Imagens por seção — pesquisadas` (módulo — URL — origem) — ambos os cabeçalhos são filtrados na renderização, servem só de rastro de auditoria.
