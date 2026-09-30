# Revisão final — pacote yangshuo (Fase 1)

**Veredito: PRONTO COM RESSALVAS.** A city page e os dois arquivos de dia têm voz boa e são específicos, mas há um erro de logística no Dia 11 (a distância Big Banyan Tree ↔ teatro), a seção "Fotografia e luz" propõe um plano de dois dias que não bate com o roteiro, e as 4 atrações são stubs.

Arquivos: `pesquisa/cidades/06-yangshuo.expandido.md`, `pesquisa/dias/12-yangshuo-dia-11.md`, `pesquisa/dias/13-yangshuo-dia-12.md`, `pesquisa/atracoes/{impressao-liu-sanjie,moon-hill,west-street,yulong-river}.md` (assignment usado só como referência).

## Achados da fase 0: conferência

- **pendência, city page:19/49/161: falsos positivos.** A regex `\bTODO\b` do audit é case-insensitive e casa com a palavra "todo" ("todo o sentido", "todo dia"). Sugiro deixar essa regex case-sensitive no `audit.mjs`.
- **front matter sem `days`, nos dois dias: corrigido.**
- **metalinguagem, dia-12:161: corrigido** (o parágrafo de flag foi removido).
- **4 stubs de atração: confirmados.** Ficaram na Classe B.

## Correções Classe A aplicadas (24)

| Arquivo:linha | Antes → depois | Categoria |
|---|---|---|
| city:33 | "mercado húmido" → "mercado úmido" | lusitanismo |
| city:37 | "dada escala de tempo" → "dada uma escala de tempo" | português |
| city:39 | "envolverada" → "envolvida" | português |
| city:43 | "criou e sustenta o Groove Bar" → "sustenta o Groove Vibes Cafe Bar" | terminologia (mesmo lugar, mesmo nome) |
| city:57 | sessões 19h45/21h20 + "(vale confirmar os horários ao reservar)" | confiança PROVÁVEL passada ao leitor |
| city:151 | "não se enquadra no que este viajante evita" → "não é trilha longa" | metalinguagem (perfil) |
| city:153, 155 | "golden hour" → "hora dourada" (2x) | jargão em inglês |
| city:159 | "cerca de sete horas de distância" → "umas cinco horas" (14h30 → 19h45) | número interno |
| city:163 | frase truncada da figueira ("o que, literalmente, ela já abrigou…") → "e a tradição local, que lhe atribui mais de mil anos, conta que em certos momentos abrigou mesmo" | português |
| city:167 | "número do hotel do teatro" → "contato da bilheteria do teatro" (igual ao da l.87) | consistência |
| city:171 | "no afternoon" → "à tarde" | inglês |
| city:185 (BRIEF-DIA) | "sessão 20h45 contraindicada" → "sessão 21h20" (as sessões reais citadas são 19h45/21h20) | divergência BRIEF ↔ prosa |
| city:201 | "passa o feriado" → "passa a data" (Singles' Day não é feriado; a própria l.53 diz isso) | coerência |
| dia-11 front matter | + `days: [11]` | front matter |
| dia-11:17 | "quatro horas de distância" → "umas cinco horas" | número interno |
| dia-11:35, 45, 139 | "Golden Hour/golden hour" → "hora dourada" (3x) | jargão |
| dia-11:49 | "—recebem" → "— recebem" | tipografia |
| dia-11:51 | "o scale do cruzeiro" → "a escala do cruzeiro" | inglês |
| dia-11:55 | "o próximo parado" → "a próxima parada" | português |
| dia-11:71 | "reflecte" → "reflete" | lusitanismo |
| dia-11:73 | "ouve o cheiro do rio" / "o equilíbrio mais equilibrado" → "sente… o cheiro do rio" / "o meio-termo mais sensato" | português |
| dia-11:81 | "que você vai ver ao amanhecer no Dia 12" → "que você pode ver…, se acordar para o bloco de madrugada" (o bloco é opcional) | coerência |
| dia-12 front matter | + `days: [12]` | front matter |
| dia-12:23 | "o cálculo fechar é possível" → "o cálculo fecha" | português |
| dia-12:31 | "e o perfil deste viajante indica que sim" → "e neste roteiro ela vai junto" | metalinguagem |
| dia-12:69 | "um garçahead pousado" → "uma garça pousada" | erro de digitação/inglês |
| dia-12:89 | "o tipo de trekking que este viajante evita" → "uma trilha longa" | metalinguagem |
| dia-12:93 | "plano de contingência documentado no assignment" → "o plano de contingência daquele dia"; "~17h do Dia 11 se o barco chegou tarde" → "…chegou no horário" (estava invertido) | metalinguagem + lógica |
| dia-12:101 | "tirou foto da Big Banyan Tree hoje" → "ontem" | coerência |
| dia-12:125 | "sem nome confirmado" → "sem um nome fixo a indicar" | bastidor |
| dia-12:161 | parágrafo "*Flag aberta para o escritor da city page…*" removido | metalinguagem |

O build rodou depois das correções: 89 páginas, sem erro.

## Classe B (só reportar)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| 1 | dia-11 (l.55, 61, logística l.122) + city:163-165 + assignment | Coloca a Big Banyan Tree a **~500 m / 5-7 min a pé** do teatro do Impression Liu Sanjie. Na prática o teatro fica na margem do Li, colado ao centro de Yangshuo (perto do cais, ~1-2 km da West Street), e a Big Banyan Tree fica em Gaotian, ~7-8 km ao sul. Os dois não são vizinhos. Isso também afeta o "táxi de 20 min do teatro de volta ao centro" (dia-11:87, city:169, city:234) e a "aldeia entre as duas". | Checar os endereços (Trip.com/Amap) e refazer a logística das 17h45-18h45: táxi Banyan → centro/teatro (~20 min), jantar perto do teatro ou em Pantao Road, e volta a pé depois do show. Ajustar o BRIEF-DIA e o dia-11 juntos. | alta |
| 2 | Transição 12/11 (dia-12:117, BRIEF-DIA Dia 12 "RETORNO") ↔ `07-shenzhen` / `14-shenzhen-dia-13` | O Yangshuo diz "ônibus ou trem para Shenzhen", sem horário nem estação. O Dia 13 de Shenzhen descreve chegada **vinda de Hong Kong** pelo Futian Checkpoint, e Hong Kong foi removido do roteiro. | Na fase 2, definir o modal real (provável trem rápido da estação Yangshuo 阳朔站, ~30-40 min do centro → Shenzhen North, ~3h) e alinhar a chegada no Shenzhen dia 13. Yangshuo não tem dia 12/11 próprio, então vale uma linha de logística de saída no fim do Dia 12 ou em "Orientação prática". | alta |
| 3 | city:141-155 (Fotografia e luz) e city:49 | O plano de "dois dias com câmera" põe no primeiro dia a saída às 5h45 para a névoa no Yulong + Xianggong Hill. Só que o viajante acorda em Guilin em 10/11 e chega de barco às 14h, e Xianggong Hill não entra em nenhum dia. A frase "Moon Hill no dia seguinte às 14h30" também diverge dos dias. A l.49 fala em madrugada "nos dias 10 e 11". Xianggong Hill "a 30 minutos pedalando" é duvidoso: fica perto de Xingping, a ~25 km, e se chega de carro. | Reescrever o parágrafo final de "Fotografia e luz" alinhado aos dias reais (Dia 11: hora dourada na Banyan Tree; Dia 12: névoa residual no Yulong às 9h30, Moon Hill 15h-16h30, amanhecer opcional com cormorão). Citar Xianggong como opção de carro, só se houver madrugada livre. | média |
| 4 | city:199 + dia-12:23 | A condição do bloco de madrugada é "Dia 11 encerrado antes das 22h", mas o próprio Dia 11 termina às 22h45. Do jeito que está, a condição nunca se cumpre, e o dia-12 se contradiz ("bar até 22h45 → possível"). | Decidir: ou o bloco de madrugada pressupõe pular o bar do Dia 11 (dizer isso), ou a condição vira "dormir até ~23h". | média |
| 5 | dia-12:17, 65 | Três afirmações duvidosas: (a) o barqueiro do Yulong "fala só cantonês" (em Yangshuo se fala o mandarim de Guilin e dialetos locais/zhuang, não cantonês); (b) o Yulong "não tem pier turístico organizado / não há guichê": há anos os rafts saem de pontos com bilheteria (Jinlong, Yulong Bridge, Gongnong); (c) o preço "¥150-250 negociado direto". Nada disso tem fonte no arquivo. | Pesquisar (place-finder) o esquema atual de bilhete dos rafts do Yulong e corrigir o dialeto. Manter o tom de "menos movimentado que o Li". | média |
| 6 | city:163 × dia-11:47 | Idade da figueira: a city page diz "mais de mil anos (tradição local)"; o dia diz "mais de mil e quinhentos anos… idade documentada". A cifra mais citada é ~1.400 anos (dinastia Sui), e "documentada" é forte demais. | Unificar em "cerca de 1.400 anos, segundo a tradição local" nos dois arquivos. | baixa |
| 7 | atracoes/{impressao-liu-sanjie, moon-hill, west-street, yulong-river}.md | São 4 stubs (26-36 palavras). As quatro atrações são de fato visitadas ou citadas no roteiro. O stub do Liu Sanjie ainda fala em "600 atores" e "maior palco ao ar livre do mundo", números que a city page não usa. | Produzir pelo pipeline normal (planner → … → assembler). Prioridade: Impression Liu Sanjie e Moon Hill. West Street pode virar página curta ou sair, porque a city page já cobre o tema a fundo. `days: [11, 12]` em todas deveria ser o dia real (Liu Sanjie → 11; Moon Hill/Yulong → 12). | média |
| 8 | Numeração de dias (conhecido, não corrigir) | Para o leitor, a leitura é coerente: "Dia 11" = ter 10/11, "Dia 12" = qua 11/11, e os dias da semana estão certos. Mas o "Dia 11" é compartilhado com Guilin: `11-guilin-dia-11` e `12-yangshuo-dia-11` são duas páginas de "Dia 11" com a mesma data, e o registro gera `day/11` para as duas. O leitor não vê o Dia 11 como um dia só (manhã em Guilin, tarde em Yangshuo). | Na fase 2, decidir entre fundir as páginas ou dar um rótulo explícito, tipo "Dia 11 (manhã, Guilin)" e "Dia 11 (tarde, Yangshuo)". | média |
| 9 | Chegada, lado Guilin (`11-guilin-dia-11.md:106`, fora do pacote) | O Guilin diz que do Longtoushan Pier "você tem três minutos a pé até o centro"; o Yangshuo (city:224, dia-11:27) diz ~3 km e táxi de 10-15 min por ¥30-50. Os horários (13h30-14h30 × 14h-14h30) são compatíveis. | Unificar a distância do cais até o centro nos dois pacotes. Se o barco de fato atraca no cais de Longtoushan, perto da West Street, o táxi é curto ou dispensável e a logística do Dia 11 muda (junto com o item 1). | média |

## Notas de estilo e qualidade (não são erro)

1. Repetição entre city page e dia-12: os parágrafos do mercado de Pantao Road, do cormorão, do Singles' Day ("estar em Yangshuo no dia 11 de novembro de 2026" vs "estar em Yangshuo") e do ShouZi aparecem quase com as mesmas palavras em "O que West Street esconde"/"O que está acontecendo" e no dia-12. O mesmo vale para a descrição do Groove (Patrick e Aki, dardos, sinuca, foosball), repetida 3 vezes. O ideal é manter a versão longa num lugar só e uma referência curta no outro.
2. city:53 e dia-12:17: "movimenta mais dinheiro em 24 horas do que Black Friday e Cyber Monday somados" está datado. Desde 2022 a Alibaba não divulga o GMV e o festival dura semanas. Vale suavizar.
3. city:63: "laranja-melancia" como nome do pomelo é estranho em PT-BR. "Toranja" ou só "pomelo" soa mais natural.
4. dia-11:17: "espetáculo que Zhang Yimou levou três anos para desenhar" não tem fonte. A produção costuma ser datada de 1998-2004, então dá para cortar ou confirmar.
5. Fuli e Xianggong Hill aparecem como experiências fortes em "O que West Street esconde" e em "Fotografia", mas não entram em nenhum dia. Uma frase dizendo "fora do roteiro, se sobrar uma manhã" evita que o leitor ache que foram esquecidos.
