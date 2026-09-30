---
name: travel-day-writer
description: Expande o day summary + brief estruturado de um dia de roteiro em hora-a-hora narrativo completo para pesquisa/dias/*.md — 1800+ palavras por dia, parágrafo por bloco horário, prosa de livro de viagem. Input obrigatório é o ## Dia N da cidade (com o comment <!--BRIEF-DIA-->). Output é o arquivo de dia completo com front matter e hora-a-hora expandido.
---

# Travel Day Writer

Esta skill escreve o hora-a-hora completo de um dia de roteiro para o arquivo `pesquisa/dias/NN-cidade-dia-N.md`. O input é o `## Dia N` da página da cidade, que contém:
1. O texto narrativo do day summary (overview + lógica do dia)
2. O bloco `<!--BRIEF-DIA-->` com a sequência validada, horários e flags de atenção

A skill não repleja o dia do zero — ela expande o que o `travel-day-planner` já decidiu. A decisão de sequência e timing já foi tomada e validada. Aqui o trabalho é transformar a sequência em experiência narrada.

## Entradas obrigatórias

1. **O texto de `## Dia N`** da página da cidade, incluindo o bloco `<!--BRIEF-DIA-->`
2. **Perfil do viajante** (`pesquisa/perfil-viajantes.md`) — para personalização do tom e das dicas
3. **Arquivos de pesquisa das atrações do dia** — os `.md` de cada atração mencionada no brief, para extrair detalhes concretos sem inventar (nomes reais, preços, horários, dicas específicas)

## Output: o arquivo de dia

O arquivo gerado é `pesquisa/dias/NN-cidade-dia-N.md` com a seguinte estrutura:

### Front matter obrigatório

```yaml
---
type: dia
slug: [cidade]-dia-[N]
city: [slug da cidade]
day: [N]
date: [YYYY-MM-DD]
title: "[Dia N — Título narrativo do dia]"
emoji: [emoji que captura o tema]
pais: [china|japao]
---
```

### Corpo do arquivo

```markdown
# Dia N — [Título]

## O dia em resumo

[Parágrafo de 100–150 palavras: o que este dia entrega, por que faz sentido neste ponto do roteiro, o que o viajante vai levar de memória]

## Hora a hora

[Seção central — ver formato abaixo]

## Refeições do dia

[Almoço e jantar com contexto — não só o nome do lugar mas por que ali, o que pedir, o que esperar]

## Logística do dia

[Tabela resumida: modal, tempo estimado, custo aproximado]
```

## Formato do hora a hora

Cada bloco de horário é um **parágrafo narrativo desenvolvido**, nunca uma linha de agenda.

### O que cada bloco deve conter

Para cada atividade no brief:

- **Abertura descritiva do bloco** — onde você está, o que você está vendo/sentindo ao chegar. Primeira frase que ancora o leitor no lugar e no horário.
- **O que fazer neste bloco** — não como lista, como narrativa: o percurso dentro do lugar, o que priorizar, o que a golden window desse horário específico entrega que outro horário não daria.
- **Detalhes concretos** — nome exato do prato que pedir, o andar certo para subir, a saída do metrô que economiza 10 min de caminhada, o ângulo fotográfico que só funciona de manhã.
- **Quando sair** — o sinal que indica que o tempo nessa atividade está esgotado. Não "após 1h30", mas "quando o segundo grupo de turistas com guia aparecer" ou "quando o calor de meio-dia tornar o pátio externo insuportável".
- **Transição para o próximo bloco** — modal, tempo, e qualquer coisa que acontece durante o deslocamento que vale mencionar.

### Piso de tamanho

| Bloco | Piso |
|---|---|
| Bloco de atividade principal (museu, sítio, bairro histórico) | 300–500 palavras |
| Bloco de refeição (almoço ou jantar com contexto) | 150–250 palavras |
| Bloco de deslocamento longo (>30 min) | 100–150 palavras se a viagem tem interesse; pode ser 1 frase se não tem |
| Bloco de atividade secundária (mirante rápido, mercado de passagem) | 150–250 palavras |
| Encerramento do dia | 150–200 palavras |

**Total mínimo do hora a hora:** 1.800 palavras. Para dias com 4+ atividades distintas, esperar 2.500–3.500.

### Exemplo de bloco bem escrito vs. mal escrito

**Ruim (agenda, não narrativa):**
> 09h00 — Chegada em Liziba. Ver o metrô passando pelo prédio. Tirar fotos. 30 min.

**Bom (narrativa com profundidade):**
> Às nove da manhã, o metrô da Linha 2 passa pela estação Liziba de dois em dois minutos, e cada passagem é a mesma sequência: o chiado metálico antes de ver o vagão, a fissura de luz que aparece no flanco do edifício residencial, e então o trem emergindo da lateral do prédio como se atravessar um bloco de apartamentos fosse uma opção de projeto normal — porque aqui, por necessidade de encosta e custo de alternativa, foi. A plataforma de visualização externa fica a dois minutos a pé da saída B da estação, subindo a rampa de concreto que dá direto para o nível da via. Posicione-se no canto esquerdo do terraço, onde o ângulo cobre tanto o vão de entrada do prédio quanto a seção suspensa da via antes do apoio seguinte — é o frame que aparece em nove de cada dez fotos desta atração, e a razão é simples: é o único ponto de onde você vê os dois elementos de uma vez. Manhã de novembro, com a névoa ainda baixa sobre o Jialing lá embaixo, o fundo dos arranha-céus de Shapingba borrando ligeiramente — vinte minutos aqui é o suficiente, porque depois de ver o trem passar umas quatro ou cinco vezes, você entendeu o que Liziba quer dizer sobre a cidade toda: que o espaço físico, neste relevo, é um recurso tão escasso que a engenharia aprendeu a colocar uma coisa dentro da outra.

## Logística do dia (tabela)

Ao final do arquivo, produza uma tabela de logística do dia:

```markdown
## Logística do dia

| Trecho | Modal | Tempo est. | Custo est. |
|---|---|---|---|
| Hotel → Liziba | Metrô L2 (Jiaochangkou) | 25 min | 3 yuan |
| Liziba → Jiefangbei | Táxi / DiDi | 15 min | ~15 yuan |
| ... | ... | ... | ... |
| **Total transporte** | | | **~XX yuan** |

**Atrações pagas:** [lista com preços]
**Total estimado do dia (sem jantar):** ~XX yuan
```

## Voz e estilo

Mesmo padrão da `travel-magazine-writer`:
- Prosa de reportagem, não agenda de tour
- Detalhe concreto > adjetivo genérico
- Segunda pessoa implícita ("você está", "você vê") ou terceira pessoa impessoal ("quem chega cedo encontra...") — nunca primeira pessoa narratorial genérica
- O timing das atividades sempre tem uma razão explícita no texto — não diga "às 19h, ir para Hongyadong", diga por que 19h e não 17h ou 21h

## O que esta skill NÃO faz

- Não replaneja o dia — a sequência e os horários já foram decididos pelo `travel-day-planner`
- Não inventa informações sobre as atrações — usa os arquivos de pesquisa existentes
- Não escreve o day summary da cidade — isso é `travel-day-planner`
- Não é invocada mais de uma vez por dia — um dia, um arquivo, uma invocação (diferente de `travel-writer`, que faz um módulo por invocação; aqui, o dia inteiro vai num único arquivo e numa única invocação, porque a coerência narrativa entre blocos exige continuidade)
