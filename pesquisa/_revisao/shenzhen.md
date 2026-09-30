# Revisão final — pacote shenzhen (Fase 1)

**Veredito: NÃO PRONTO.** Dois bloqueadores: (1) toda a chegada do Dia 13 parte de Hong Kong, que saiu do roteiro (a cidade anterior real é Yangshuo, check-out 12/11); (2) as 4 páginas de atração são stubs. A prosa em si é de bom nível. A Classe A abaixo limpa idioma, jargão, bastidor, dias da semana e números internos.

Arquivos: `pesquisa/cidades/07-shenzhen.expandido.md`, `pesquisa/dias/14-shenzhen-dia-13.md` … `17-shenzhen-dia-16.md`, `pesquisa/atracoes/{dafen,huaqiangbei,oct-loft,ping-an-shenzhen-bay}.md`. Estadia: 12/11 (qui) a 16/11 (seg), COCO FLORAL XIJU, Futian. Sem arquivo de assignment.

## Achados da fase 0: triagem

- **pendência** (city :69, :129, :264; dia-14 :47; dia-16 :73) são **falsos positivos**. A regex `\bTODO\b` é case-insensitive e casa com a palavra "todo" do português. Não há o que corrigir. Sugestão para o script: deixar a regex de `TODO` case-sensitive.
- **destino-removido "Hong Kong"**: a maioria é comparação legítima (história da ZEE, fronteira, noite de HK, clima, vista da baía). Os erros reais são os trechos que supõem que o viajante está vindo de HK ou passando por lá. Corrigi os 2 pontuais (configuração de apps) e deixei a chegada como Classe B (B1).
- **destino-removido "Xi'an"/"Guizhou"**: só comparação ou origem culinária. Estão ok.
- **tag-vazada** no dia-15 :133 e :158: corrigidas.
- **clichê "imponente"**: corrigido.
- **front-matter `days`** nos 4 arquivos de dia: adicionado.
- **extensão/pendência nas atrações**: stubs, ver B2.

## Correções Classe A aplicadas

| Arquivo:linha (aprox.) | Antes → depois |
|---|---|
| city:41 | "Você chega dois dias antes das delegações" → "Você chega seis dias antes da cúpula e parte dois dias antes de ela começar" |
| city:45 | "mais imponente" → "mais monumental" |
| city:55 | "uma baala" → "uma bala"; "sem briefing" → "sem preparo" |
| city:73 | "institutional" → "institucional" |
| city:81 | "13 milhões… em cinquenta anos" → "18 milhões… em menos de cinquenta anos" |
| city:101 | "hunanese, guizhou" → "hunaneses, gente de Guizhou" |
| city:103 | "internationalizou" → "internacionalizou" |
| city:105 | "tetera" → "bule"; Lianxiang Lou recebe "(vale conferir o endereço no Amap antes de ir)", pois é PROVÁVEL |
| city:107 | Fa Ji recebe "(confira se a filial segue aberta…)", pois é PROVÁVEL |
| city:115 | "quarenta anos e treze milhões" → "quarenta e seis anos e dezoito milhões" |
| city:117 | Penny Black: "o mesmo bar nomeado para sábado à noite" → "vale confirmar a programação antes de ir — e é o bar da noite de sábado" (metalinguagem + confiança PROVÁVEL) |
| city:119 | "A sexta-feira, primeira noite" → "A quinta-feira, primeira noite" (12/11 = qui) |
| city:121 | "O sábado tem outra escala… MO Bar" → "A sexta-feira tem outra escala. Depois do primeiro dia inteiro" (o MO Bar é no Dia 14, sex 13/11) |
| city:147, 206 | "golden hour" → "hora dourada" (2×) |
| city:159, 211 | "APEC prep" → "preparação para a APEC" (2×) |
| city:171 | "ideal fazer no Brasil ou em Hong Kong" → "ideal fazer ainda no Brasil" |
| city:192 | "17 milhões" → "18 milhões" |
| city:200 | "Cantonês/Mandarim" → minúsculas |
| city:230 | "13 milhões" → "18 milhões" |
| city:262 | "cadmio" → "cádmio" |
| city:292 | "O terceiro dia em Shenzhen" → "O último dia em Shenzhen" (é o 4º) |
| city:326 | "A madrugada de quinta em Huaqiangbei" → "A manhã de sexta"; "tai chi de madrugada" → "tai chi do amanhecer" |
| city:328 | "trem para Xiamen leva menos de duas horas" → "entre duas horas e meia e três horas" (alinhado a Como se locomover e ao Dia 16) |
| dia-13 | +`days: [13]`; "golden hour" → "hora dourada" (2×); "o APEC prep" → "a preparação para a APEC" (2×, incluindo o aviso); "sintetização" → "síntese"; "antes de embarcar ou em Hong Kong" → "antes de embarcar no Brasil"; "fracção" → "fração"; "GDP" → "PIB"; "Flags operacionais" → "Avisos práticos" |
| dia-14 | +`days: [14]`; "pode ter era diferente" → "pode ser de outra era"; "o conveniência ou o room service" → "a loja de conveniência ou o serviço de quarto"; "quinze minutos do COCO Park, ou cinco a dez do hotel" → "cerca de dez minutos de DiDi do hotel" (o hotel fica no COCO Park; bate com a tabela); "Flags operacionais" → "Avisos práticos" |
| dia-15 | +`days: [15]`; "que dourado" → "que doura"; "que a luz direta fraca" → "achata"; "ao sul do expressway, Longgang" → "a nordeste, já em Longgang" e "corta de norte a sul" → "corta para nordeste" (Longgang fica a NE de Futian); "Huaqiaochen" → "Huaqiaocheng" (todas); nota do Lianxiang Lou sem "PROVÁVEL (não CONFIRMADO)"/"CONFIRMADA" e com aviso natural; "Penny Black (PROVÁVEL)" → "a casa não tem confirmação recente de funcionamento — verificar"; "golden hour" → "hora dourada" (2×); "Metrô APEC prep" → "Metrô na preparação para a APEC"; "Flags operacionais" → "Avisos práticos" |
| dia-16 | +`days: [16]`; "bandeiras de vinte economias" → "vinte e uma" (alinhado ao resto); "o APEC prep" → "a preparação para a APEC"; "made for each other, e são" → "feitos um para o outro — e foram"; "âncora" (verbo) → "ancora"; "Confirmado em operação ativa em 2026 (TripAdvisor)" → "Em funcionamento em 2026" |

**Contagem por categoria (~60):** jargão em inglês 17 · português/ortografia/digitação 15 · números internos 7 · data/dia da semana/calendário 5 · metalinguagem/bastidor 5 · tag vazada, com confiança preservada, 6 (3 remoções + 3 avisos PROVÁVEL adicionados na city) · front matter 4 · destino removido supondo passagem 2 · geografia 1 · clichê 1.

Fica de fora o que está dentro de `<!--BRIEF-DIA-->`, `## Lugares reais pesquisados` e `## Eventos/sazonalidade pesquisados` (bastidor).

## Classe B (só reporto)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| B1 | city `## Dia 13` (summary, Sequência, Ponto de partida, BRIEF-DIA), `## Como se locomover` §1, `dias/14-shenzhen-dia-13.md` (blocos 13h30/14h15/14h30, tabelas de refeição e logística) | **A chegada inteira vem de Hong Kong** (MTR East Rail → Lok Ma Chau → Futian Checkpoint → Linha 2), mas HK saiu do roteiro. A parada anterior real é Yangshuo, check-out 12/11. O Yangshuo Dia 12 diz só "ônibus ou trem para Shenzhen", sem horário. Além disso, a city diz 15h–17h e o arquivo de dia diz 13h30–14h30. | Decidir o modal e o horário Yangshuo → Shenzhen (provavelmente trem-bala Yangshuo → Shenzhen North, ~3h; confirmar com `travel-itinerary-logistics`). Depois disso, `travel-day-planner` reescreve o `## Dia 13` + BRIEF-DIA e `travel-day-writer` refaz a 1ª metade do arquivo de dia (chegada por Shenzhen North, Linha 4 → Futian). "Como se locomover" troca o parágrafo do checkpoint pela chegada de trem. O aviso sobre SMS/roaming no WeChat Pay continua valendo. | **alta** |
| B2 | `atracoes/{huaqiangbei,oct-loft,dafen,ping-an-shenzhen-bay}.md` | 4 stubs com placeholder (26–42 palavras). Huaqiangbei, OCT-LOFT e Dafen são visitados (Dias 14/15). Ping An/Shenzhen Bay: o roteiro não sobe na torre nem vai a Shenzhen Bay, só vê o prédio da rua ou de mirantes. Todas trazem `days: [13,14,15,16]` genérico. | Rodar o pipeline normal (`travel-content-planner` → … → `travel-page-assembler`) para as 3 visitadas, aproveitando os módulos longos da city como base. Para Ping An/Shenzhen Bay, ou incluir no roteiro (ex.: Free Sky 116º andar) ou tirar a página. Ajustar `days` para os dias reais (Huaqiangbei [14], Dafen/OCT [15]). "4º mais alto do mundo" está desatualizado (hoje ~5º, depois do Merdeka 118). | alta |
| B3 | 16/11 (partida) | Nenhum arquivo do pacote cobre 16/11. Não existe dia com esse número: a numeração global vai de Dia 16 = dom 15/11 direto para Xiamen Dia 17 = ter 17/11. O pacote só diz "trem G, Shenzhen North, 2h30–3h, partida de manhã cedo", com checklist no fim do dia-16 e "estar acordado antes das oito". **Não há trem nem horário definido.** O Xiamen diz 3h30–4h e chegada em Xiamen Gaoqi/North; o Shenzhen diz 2h30–3h e "Xiamen North ou Xiamen". | Fase 2: decidir quem é dono de 16/11 (dia de trânsito explícito ou Dia 1 de Xiamen) e unificar o tempo de trem (fontes de 2026 indicam ~3h–3h30 nos G mais rápidos) e a estação de chegada nos dois pacotes. | alta (transversal) |
| B4 | city `## Dia 14` Logística/Ponto de partida; dia-14 bloco 9h e tabela | "Metrô Linha 1 até a estação Huaqiangbei": a estação Huaqiangbei é das Linhas 2/7. Na Linha 1, a estação é Huaqiang Road (华强路), a poucos passos. A volta pela Linha 7 de Huaqiangbei até Chegongmiao está certa. | Trocar por "Linha 1 até Huaqiang Road (ou Linha 2/7 até Huaqiangbei)". É fato sem fonte no arquivo, por isso não corrigi. | média |
| B5 | dia-16 bloco 12h | "Tofu fedorento… quatro cubos, a oitenta yuan o prato" é implausível (o resto do almoço custa 20–40 yuan e a tabela dá 40–80 no total). | Confirmar o preço ou tirar o número (provavelmente ~8–15 yuan). | média |
| B6 | city :17 vs :25 | "aldeia de pescadores chamada Bao'an, menos de trezentas mil pessoas" vs "cidade de pesca com em torno de trinta mil habitantes". Aldeia com 300 mil habitantes não fecha. (Bao'an era o condado, com ~300 mil; a vila de Shenzhen tinha ~30 mil.) | Reescrever a :17 como "o condado de Bao'an… e uma vila de pescadores de uns trinta mil". | média |
| B7 | city Dia 13/16 + dia-13 + dia-16 | O Civic Center aparece como curva que "imita um chapéu de mandarim". A leitura corrente do projeto é a de asas de um pássaro (大鹏展翅). | Checar a fonte e ajustar nos 3 arquivos. | baixa |
| B8 | dia-14 bloco 19h30 | O MO Bar tem "a vista ocupa toda a parede norte" e "Civic Center mantido ao norte". O UpperHills fica ao norte do CBD, então o CBD aparece para o **sul**. | Inverter a orientação ou tirá-la. | baixa |
| B9 | city Dia 15 BRIEF vs dia-15 | Divergências pequenas: último metrô ~23h (BRIEF) vs ~23h30 (dia); custo 150–300 (BRIEF) vs 250–400 (dia); tai chi "no espelho d'água" (summary) vs "esplanada pavimentada" (dia). Distância hotel ↔ TAPS: "adjacente" / "7–10 min" / "~12–15 min" / "a dois quarteirões", conforme o arquivo. | Unificar na próxima passada do planner (TAPS: um número só). | baixa |
| B10 | city `## Dia 16` → Linha 4 | "Shenzhen North na Linha 4, sem troca, direto de Futian": o COCO Park (estação Shopping Park) é das Linhas 1/3, e a Linha 4 passa pela Convention & Exhibition Center/Civic Center. Pode exigir 1 baldeação ou caminhada. | Conferir e ajustar o "sem troca". | baixa |

**Como a numeração de dias chega ao leitor:** dentro do pacote ela é coerente (Dias 13–16 = qui 12 a dom 15/11, dias da semana corretos depois da Classe A). Quem lê o livro, porém, vai de "Dia 16 — domingo" para um "Dia 17" que é terça 17/11. A segunda-feira 16/11 (partida) aparece só como checklist no fim do Dia 16 e numa frase do Encerramento. Não corrigi, porque é transversal (B3).

## Notas de estilo (não são erro)

1. O dia-13 mistura imperativo de "tu" ("Guarda", "Coloca", "testa agora", "Dorme") com "você" em todo o resto. Vale uniformizar em "você" (guarde, coloque, teste, durma).
2. A metáfora "sistema/versão 3.0/bug vira feature/compilada" aparece na abertura, no dia-13 e no Encerramento. Uma vez rende; três vezes vira tique.
3. O Dia 14 da city e o dia-15 repetem, quase com as mesmas palavras, os parágrafos de Huaqiangbei e Dafen da city (cheiro de tinta, "cinco versões do mesmo pôr do sol", pintor só de rostos). Quando as atrações forem escritas (B2), deixar a versão em profundidade na atração e fazer referência curta nos outros lugares.
4. O "O que está acontecendo" está bom e específico (APEC, inspeção no metrô, zona sem drones, clima, pôr do sol). A frase "um engenheiro de IA visitando…" soa como perfil exposto. Dá para suavizar para algo como "para quem trabalha com tecnologia".
5. O city BREWTOWN (PROVÁVEL, bairro desconhecido) aparece como exemplo sem endereço. Ou ganha localização, ou vira menção de passagem.
