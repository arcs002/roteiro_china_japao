---
name: travel-day-planner
description: Planeja a estrutura de um dia de roteiro — decide sequência de atividades, timing, lógica de logística — e produz dois outputs: (1) o texto de day summary para a página da cidade (## Dia N, 400–600 palavras), que serve como overview para o leitor; (2) um brief estruturado que alimenta o travel-day-writer na geração do hora-a-hora completo da página de dia.
---

# Travel Day Planner

Esta skill planeja um dia de roteiro e produz o texto `## Dia N` que vai na página da cidade. Esse texto é simultaneamente o overview do dia para o leitor e o brief para o `travel-day-writer` gerar o hora-a-hora detalhado da página de dia.

**Diferença crucial:** a página da cidade não contém hora-a-hora. Ela contém o *arco* do dia — a narrativa de por que este dia tem esta estrutura, o que o viajante vai sentir em cada bloco, a lógica das escolhas. O detalhe minuto-a-minuto fica na página do dia (`#day/N`).

## Entradas obrigatórias

1. **Lista de atividades/atrações candidatas para o dia** — pode ter mais do que cabem num dia; a skill decide o que cortar
2. **Data real do dia** (ex.: "02/11/2026, segunda-feira") — afeta horários de funcionamento, clima, golden windows
3. **Cidade e bairro de base** (onde está o hotel / ponto de partida)
4. **Perfil do viajante** (`pesquisa/perfil-viajantes.md`) — ritmo, interesses, restrições de energia
5. **Contexto do roteiro** — o que aconteceu no dia anterior e o que vem no dia seguinte (para evitar repetição de bairros/temas e garantir progressão)

## Processo

### Passo 1 — Chamar `travel-day-logistics`

Antes de escrever qualquer texto, invoque mentalmente (ou via chamada real, se disponível) a skill `travel-day-logistics` com a lista de atividades candidatas. O objetivo é:

- Identificar as atividades com **golden window restrita** — essas têm prioridade de posicionamento no horário correto
- Calcular se o conjunto de atividades cabe num dia com buffers realistas
- Ordenar por sequência geográfica e temporal que minimize deslocamento e maximize experiência

Se o conjunto não cabe, **corte** — um dia de 5 atividades bem feitas é melhor que 8 corridas. O critério de corte é sempre: (a) o que tem golden window insubstituível fica; (b) o que o perfil valoriza mais fica; (c) o que pode ser visto a qualquer hora e em qualquer dia cede.

### Passo 2 — Definir o arco narrativo do dia

Todo dia de roteiro tem um arco — uma progressão que faz sentido não só logisticamente mas emocionalmente. Exemplos:

- **Imersão crescente:** começa no mais acessível/orientador e vai para o mais denso/desafiador
- **Contraste:** manhã histórica/pesada → tarde leve → noite animada
- **Progressão geográfica:** parte de cima e desce, ou do centro para a periferia
- **Tema:** o dia de "Chongqing vertical" (Liziba + Jiefangbei subterrâneo + Hongyadong noturno)

O arco não é decorativo — ele é o que justifica a sequência. Se a sequência parece arbitrária, é sinal de que o arco não foi definido.

### Passo 3 — Escrever o day summary (output 1: texto para o city page)

O summary tem **400–600 palavras** e responde a três perguntas:

1. **O que é este dia?** (em 1 parágrafo: tema, arco, o que o viajante vai levar de lembranças)
2. **Como o dia se organiza?** (1–2 parágrafos por bloco principal, cobrindo manhã/tarde/noite com lógica explícita de timing — por que aquela atividade naquele horário, o que torna a sequência ideal)
3. **Quais são os detalhes que fazem diferença?** (notas práticas críticas: horário de abertura que não pode perder, ponto de ônibus que a maioria passa batido, refeição que define o dia)

**Formato do summary no arquivo da cidade:**

```markdown
## Dia N — [Título que captura o tema do dia, não só a lista de lugares]

[texto narrativo 400–600 palavras]

> **Sequência:** [lista compacta das atividades em ordem, com horários aproximados]
> **Logística:** [modal principal do dia, custo estimado de transporte]
> **Ponto de partida:** [bairro/local]
```

O bloco `>` no final é estruturado — ele é lido pelo `travel-day-writer` como brief de entrada, além de servir ao leitor como referência rápida.

### Passo 4 — Produzir o brief estruturado (output 2: para travel-day-writer)

Após o texto do summary, produza um bloco `<!-- BRIEF-DIA -->` em HTML comment, **não renderizado na página**, com o relatório de logística completo (formato do "Dados para o day summary" da skill `travel-day-logistics`). Este bloco é o brief machine-readable que o `travel-day-writer` usa para gerar o hora-a-hora sem precisar replanejar tudo do zero.

```markdown
<!--BRIEF-DIA
ARCO: ...
PARTIDA: ...
BLOCOS:
  - 09h00–10h30: Liziba | Shapingba | metrô L2, 25 min
  - ...
ALMOÇO: ...
JANTAR: ...
RETORNO: ...
CUSTO: ...
FLAGS: ...
-->
```

Este comment é preservado no arquivo `.md` da cidade e fica disponível para o `travel-day-writer` quando ele for chamado para expandir o dia.

## Padrão de qualidade do day summary

O summary da cidade **não é um resumo de agenda**. É um texto que convence o leitor de que aquele dia faz sentido — que a ordem das atividades foi pensada, que os horários não são arbitrários, que há uma lógica de experiência por trás da logística.

**Proibido:**
- Listas de bullet disfarçadas de prosa ("Pela manhã, visita ao X. Em seguida, almoço em Y. À tarde, Z.")
- Horários que não têm justificativa ("Às 10h, ir ao museu" — por que 10h e não 9h ou 14h?)
- Ausência de transições ("depois de X, ir para Y" sem mencionar como e quanto tempo)
- Falta do arco emocional/experiencial (roteiro que parece agenda de trabalho, não dia de viagem)

**Obrigatório:**
- Cada escolha de timing tem uma razão explícita (a névoa matinal, o calor do meio-dia, a iluminação noturna)
- As transições entre atividades são mencionadas quando fazem parte da experiência (uma caminhada de 20 min pode ser o ponto alto do dia, não um inconveniente)
- O jantar está ancorado — não "jantar em algum lugar da área" mas "jantar em restaurante de hotpot no Guanyinqiao antes das 21h para pegar a última fila do dia"
- O dia tem começo, meio e fim — uma progressão real

## Auto-check antes de entregar (Passo 3b)

Antes de entregar o day summary, aplique `travel-day-validator` no **Modo 2 (single-day)** contra o draft produzido no Passo 3. Isso é obrigatório.

- **Se APROVADO:** entregar o day summary como está.
- **Se APROVADO COM AJUSTES:** aplicar as ações do relatório (geralmente reordenações ou ajustes de horário menores) e entregar a versão corrigida.
- **Se REPROVADO:** retrabalhar a sequência e re-validar. Se após 2 tentativas ainda houver flags CRÍTICAS, reportar o problema ao chamador (o `travel-itinerary-builder` pode ter passado um assignment com um problema que só aparece na granularidade do planejamento detalhado).

O resultado da validação **não aparece no day summary** entregue ao leitor — é processamento interno. Mas o bloco `<!--BRIEF-DIA-->` deve incluir uma linha `VALIDADO: [APROVADO | APROVADO COM AJUSTES — flags: ...]` para rastreabilidade.

## Relação com o resto do pipeline

- Este é o módulo que substitui o antigo `## Roteiro hora a hora — Dia N` na página da cidade
- O texto vai para a cidade como `## Dia N — [título]` (não mais como "Roteiro hora a hora")
- O brief `<!--BRIEF-DIA-->` fica no arquivo da cidade e é o input do `travel-day-writer`
- O `travel-day-writer` usa o brief para gerar `pesquisa/dias/NN-cidade-dia-N.md`
- A página `#day/N` renderiza a partir desse arquivo de dia

A relação entre city page e day page é de overview → detalhe, não de repetição — a city page conta o porquê e o arco, a day page conta o como e o o-que-exatamente.
