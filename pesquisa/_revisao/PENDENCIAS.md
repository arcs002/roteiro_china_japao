# Pendências do guia — pós-revisão final (30/09/2026)

Lista acionável de tudo que a revisão final **não** corrigiu sozinha. As ~440 correções mecânicas já foram aplicadas; o detalhe de cada item (linha, antes→depois, justificativa) está no relatório do pacote indicado entre colchetes.

Legenda: **🔴 bloqueador** · **🟠 alta** · **🟡 média** · **⚪ baixa** · *quem executa* em itálico.
Relatórios: [roteiro](roteiro.md) · [chongqing](chongqing.md) · [zhangjiajie-furong](zhangjiajie-furong.md) · [fenghuang-guilin](fenghuang-guilin.md) · [yangshuo](yangshuo.md) · [shenzhen](shenzhen.md) · [xiamen](xiamen.md) · [fukuoka-kurokawa](fukuoka-kurokawa.md) · [beppu](beppu.md)

---

## 1. Decisões suas (bloqueiam o resto)

- [ ] 🔴 **Numeração de dias.** Hoje ela segue 3 regras:
  - Os Dias 9, 10 e 11 aparecem em duas cidades.
  - 16/11 e 28/11 não têm dia.
  - `day/11` perde uma das duas páginas.

  Proposta: **Dia N = N de novembro**; 31/10 = "Noite de chegada", sem número; dia de transição com 1 número e até 2 arquivos (`part: 1/2`); 28/11 = Dia 28, de logística. A tabela de-para está em [roteiro §2](roteiro.md). *Você aprova → script de renomeação + ajuste em `build-registry.js`/`validate.js`.*
- [ ] 🔴 **Dono de 16/11** (Shenzhen→Xiamen): um dia de chegada em Xiamen (novo `## Dia 16`) ou um dia de trânsito. [xiamen B2, shenzhen B3]
- [ ] 🟠 **Trabalho remoto**: em quais noites vale (só Beppu? Kurokawa? Fukuoka?). O Thanksgiving (26/11) libera o turno? Atualizar `perfil-viajantes.md`, que ainda diz "Fukuoka 21–26/11". [roteiro §5, beppu B5, fukuoka B10]
- [ ] 🟡 **Padrão de moeda.** Proposta: "yuan" nas páginas da China e "¥" só para iene. [roteiro §6.3]
- [ ] 🟡 **Padrão de horário.** Proposta: "7h30", "15h", sem zero à esquerda e sem ":00". [roteiro §6.4]
- [ ] 🟡 **Nomes de lugar**: pinyin/português + caracteres na 1ª menção, ou nome em inglês (Elephant Trunk Hill, Yellow Cloth Shoal…)? [fenghuang-guilin, nota 3]
- [ ] 🟡 **Atrações órfãs**: remover ou incluir no roteiro? glass-bridge, golden-whip-stream, longsheng, ping-an-shenzhen-bay, kushida-shrine, canal-city. Opcional: fundir kannawa + beppu-jigoku.
- [ ] 🟡 **Beppu, Shibaseki** (nunca visitado dentro do Combo Pass): opção (a) trocar o Kamado por Shibaseki no Dia 25, ou (b) começar o Dia 26 por Shibaseki às 14h. [beppu B1]

## 2. Reservas e transportes a confirmar

Depois de confirmar, registre em `pesquisa/voos.md` (ou numa tabela de trechos terrestres) e rode *`travel-itinerary-logistics`* para amarrar os dois lados.

| ✓ | Data | Trecho | O que está em aberto | Sev. |
|---|---|---|---|---|
| [ ] | 31/10 | PKX → PEK → CKG | São dois aeroportos diferentes em 5h40, com imigração e bagagem. Confirmar se o CA 750 chega mesmo em PKX. Hotel de Chongqing sem nome (config `null`). | 🟡 |
| [ ] | 04/11 | Chongqing → Zhangjiajie | As páginas divergem em trem (K × D8021), estação (Chongqing Norte × Zhangjiajie/West) e duração (5–6h × 7h). O texto diz "interior do Sichuan", o que está errado. | 🟠 |
| [ ] | 04/11 | Hotel de Yongding | Não tem nome. A distância até o teleférico de Tianmen aparece como 500 m a pé e como 15 min de táxi. | 🟡 |
| [ ] | 07/11 | Zhangjiajie → Furong | Checkout 8h × chegada 13h para ~3h de estrada; custo divergente (¥80–120 × ¥250–350). **Verificar** o trem-bala Zhangjiajie West → Furongzhen → Fenghuang Gucheng, que pode encurtar este trecho e o seguinte. | 🟡 |
| [ ] | 08/11 | Furong → Fenghuang | Modal e preço divergentes (ônibus via Jishou ¥60–90 × táxi ¥150–200). | 🟡 |
| [ ] | 09/11 | Fenghuang → Guilin | "Van ~5h, ¥150–200" sem operador nem fonte. Alternativa: trem-bala via Huaihua Sul/Tongren. | 🟠 |
| [ ] | 12/11 | **Yangshuo → Shenzhen** | Sem modal, horário nem estação. Provável: trem-bala Yangshuo → Shenzhen North, ~3h–3h30. | 🔴 |
| [ ] | 16/11 | Shenzhen → Xiamen | Trem G com duração divergente (2h30–3h × 3h30–4h) e estação de chegada em aberto (Xiamen North × Xiamen/Gaoqi). | 🟠 |
| [ ] | 20/11 | Voo XMN → FUK | Não está em `voos.md`. O texto supõe decolagem ≥14h e chegada ~16h. Com o fuso, a chegada real fica perto de 17h. | 🟠 |
| [ ] | 22/11 | Fukuoka → Kurokawa | A operadora diverge (Nishitetsu × Sanko Bus 12h40). | ⚪ |
| [ ] | 23/11 | **Kurokawa → Beppu** (feriado) | Não confirmado. Pesquisar o Kyushu Odan Bus (Kurokawa–Yufuin–Beppu) ou ônibus até Hakata/Hita + JR. O táxi não é alternativa realista. | 🟠 |
| [ ] | 28/11 | Checkout do Super Hotel Beppu | 10h (pesquisa) × 11h (perfil). Conferir na reserva. | 🟡 |
| [ ] | 28/11 | **Beppu → FUK → PVG** | O voo FUK→PVG não está reservado. Precisa de pernoite em Xangai para o CA 935 de 29/11 às 11h05. | 🔴 |
| [ ] | 28/11 | **Reentrada na China** | Verificar se o visto é de entrada única e se vale a isenção de trânsito de 240h (JP → CN → DE) ou a isenção para brasileiros. | 🔴 |
| [ ] | — | Hotéis no config | Faltam Yangshuo ("Mountain View & Soaking Tub") e Xiamen ("Ferry Terminal Branch") em `final-review.config.json`. | ⚪ |

## 3. Blocos a replanejar

Executar com *`travel-day-planner` → `travel-day-validator` → `travel-day-writer`*, sempre city page + BRIEF-DIA + arquivo de dia juntos.

### Chongqing [chongqing]
- [ ] 🟠 **Dia 1**: "Nan'an → 15 min a pé até Jiangbeizui" é impossível, porque há dois rios no caminho. Trocar pelo mirante da orla de Nan'an (Nanbin Road/Longmenhao).
- [ ] 🟠 **Noite de chegada**: pouso às 20h55 → check-in real ~22h15, Jialing ~22h30, xiaomian ~23h. Alinhar o custo do DiDi (80–120 yuan).
- [ ] 🟡 **Dia 2**: o arquivo está no formato antigo, com 1.728 palavras. Regenerar a partir do BRIEF-DIA e considerar a ordem Ciqikou → Liziba → Jiefangbei (hoje a rota vai e volta a Shapingba).
- [ ] 🟡 Os horários recomendados nos módulos (Eling às 7h com névoa, Qiansimen ao entardecer, Liziba antes das 10h) não aparecem nos dias. Encaixar uma manhã de névoa (ex.: Dia 4) ou apresentar como alternativa.
- [ ] ⚪ Dois hotpots em Guanyinqiao (Dias 2 e 3). Considerar Nanshan/Xianlongjing no Dia 3.

### Zhangjiajie + Furong [zhangjiajie-furong]
- [ ] 🟠 **Dia 7**: o parque abre às **7h** (não 6h30) e o Bailong fica a 20–30 min de ônibus interno a partir do portão (não 15 min a pé). Nova sequência: portão às 7h → Bailong → plateau ~7h45.
- [ ] 🟠 Citar o **No. 106 Guihua Road Inn** como ponto de partida e retorno dos dias em Wulingyuan e recalcular os trajetos (hoje o texto supõe um hotel "perto da entrada nordeste").
- [ ] 🟡 Transição de 07/11: fixar a saída (~9h30 → chegada ~13h) ou antecipar a chegada.

### Fenghuang + Guilin [fenghuang-guilin]
- [ ] 🟠 **Nascer do sol errado**: Guilin 10/11 nasce ~6h52 (não 6h20); Fenghuang 09/11 nasce ~6h58 (não 6h15–6h35). Replanejar as manhãs-âncora e corrigir "Eventos/sazonalidade pesquisados" nas duas páginas.
- [ ] 🟠 **Embarque do Rio Li**: táxi às 8h30 para o embarque fixo das 9h, num pier a ~27 km, não fecha. Sair ~7h45; o café vira "a caminho".
- [ ] 🟡 Jantar de Guilin "a pé na Zhengyang": o Renli fica no Qixing, do outro lado do rio. Trocar de lugar (*place-finder*) ou assumir táxi.
- [ ] 🟡 "Margem oposta" do Elephant Trunk Hill via Binjiang Road: a Binjiang fica na mesma margem. Confirmar o ponto de foto e o tempo de deslocamento.

### Yangshuo [yangshuo]
- [ ] 🟠 **Dia 11**: a Big Banyan Tree fica em Gaotian, ~7–8 km ao sul, não a 500 m do teatro do Impression. Refazer a logística 17h45–18h45 (táxi Banyan → teatro, jantar perto do teatro).
- [ ] 🟡 "Fotografia e luz": o plano de dois dias põe madrugada no Yulong/Xianggong no dia em que o viajante ainda está em Guilin. Reescrever alinhado aos dias reais.
- [ ] 🟡 Bloco de madrugada do Dia 12: a condição "Dia 11 encerrado antes das 22h" nunca se cumpre, porque o Dia 11 termina às 22h45. Decidir.
- [ ] 🟡 Distância do cais de Longtoushan ao centro: "3 min a pé" (Guilin) × "~3 km, táxi" (Yangshuo). Unificar.
- [ ] 🟡 Acrescentar uma linha de partida na manhã de 12/11 (táxi até a estação de Yangshuo).

### Shenzhen [shenzhen]
- [ ] 🔴 **Dia 13 inteiro chega de Hong Kong** (Lok Ma Chau, Futian Checkpoint, HKD). Reescrever a partir da chegada de trem a Shenzhen North (Linha 4 → Futian): summary, Sequência, Ponto de partida, BRIEF-DIA, 1ª metade do arquivo de dia, 1º parágrafo de "Como se locomover" e Encerramento.
- [ ] 🟡 Mover a "Logística de saída para Xiamen" do Dia 16 atual para o dia que for dono de 16/11.
- [ ] ⚪ Dia 15: divergências pequenas entre o BRIEF e o dia (último metrô, custo, local do tai chi, distância hotel↔TAPS).

### Xiamen [xiamen]
- [ ] 🟠 **Balsa para Gulangyu**: o cais indicado (鹭江道/轮渡, RMB 8) provavelmente é só para moradores desde 2014. Visitantes usam o 东渡邮轮中心 → Sanqiutian/Neicuo'ao (~RMB 35). A taxa também se contradiz ("sem taxa" × "ingresso à parte"). *place-finder* sobre as rotas de balsa, depois reescrever o Quadro prático, o bloco das 7h do Dia 17 e o BRIEF-DIA 17.
- [ ] 🟠 Criar o dia de chegada de 16/11 (depende da decisão 1). Corrigir "você chegou pelo cais" (Encerramento, Dia 20).
- [ ] ⚪ Dia 19 diz que "amanhã **cedo**" o roteiro vai para Fukuoka, mas o DiDi sai às 12h.

### Fukuoka + Kurokawa [fukuoka-kurokawa]
- [ ] 🟠 **Aeroporto → hotel (Dia 21)**: o voo chega ao Terminal Internacional, sem metrô (shuttle até o doméstico). Watanabe-dori fica na linha **Nanakuma**, não na Kuko. Tenjin→Ohori-Koen são 2 paradas.
- [ ] 🟡 Manhã de domingo 22/11 (checkout até o ônibus das 12h40) sem plano: sumô das categorias baixas ou Ohori/castelo, armário para a bagagem, compras para Kurokawa (a vila não tem konbini).

### Beppu [beppu]
- [ ] 🟠 **Shibaseki**: aplicar a decisão do item 1. Unificar o fechamento do Tatsumaki em 17h.
- [ ] 🟠 **Dia 28 (atual 27/11) e novo Dia 28 (28/11)**: remover "logística às 9h" e "cartão de embarque às 6h". Ônibus/Sonic até Fukuoka leva ~2h–2h40, não 1h40. Escrever o dia de retorno depois de reservar o FUK→PVG.
- [ ] 🟡 Se 26/11 (Thanksgiving) for folga, o Dia 27 pode juntar Yufuin + fugu ou ganhar vida noturna.
- [ ] ⚪ Transporte para Yufuin em 3 versões (ônibus Kamenoi × JR via Oita). Unificar numa recomendação só.

## 4. Fatos a verificar ou corrigir

Um *WebSearch*/*place-finder* pontual por item; depois uma edição cirúrgica.

- [ ] 🟠 **Fukuoka, abertura**: "300 km de Xiamen" (são ~1.500 km); "mais perto de Xangai que de Osaka" (é o contrário). Cortar as duas.
- [ ] 🟠 **Zhangjiajie, Retrato geral**: Xiangxi **não** inclui Zhangjiajie (inclui Fenghuang e Yongshun); os Tujia ficam no **noroeste** de Hunan; checar o "37%".
- [ ] 🟠 **Chongqing**: Hongyadong fica na margem **sul** do Jialing e o mirante clássico na margem **norte** (hoje estão invertidos em hongyadong.md, na city page e nos BRIEFs).
- [ ] 🟡 Chongqing: rotas de metrô (L6 em Jiaochangkou, Longtousi, "2 paradas até Liziba" no BRIEF); fatos de Jiefangbei (ano 1945/46/47, altura 18 × 27,5 m, hexágono × octógono, MIXC/Raffles fora do lugar); "30 dias de sol por ano"; "888 Budas" em Dazu (confusão com a Guanyin de Mil Braços?); DiDi/VPN; metrô abre ~6h30.
- [ ] 🟡 Zhangjiajie/Furong: validade do bilhete de Wulingyuan (3 × 4 dias); o Youshui deságua no **Yuan** (não no Shennong Xi); o filme *Furong Town* "proibido internamente"?; altura e rocha da cachoeira (50 × 60 m, calcário × arenito); o Baofeng Lake é de quartzito-arenito; Bailong 330 × 400 m; o "pedido de James Cameron" para renomear o pilar é discutível.
- [ ] 🟡 Fenghuang/Guilin: a nota de 20 yuan retrata Xingping (não o Yellow Cloth); ordem Nine Horse × Yellow Cloth; bilhete combinado de ~¥148 (abolido em 2016?); "ponte das Cem Flores"; diaojiaolou "Tujia" × "Miao"; Rio Li 83 × ~60 km.
- [ ] 🟡 Yangshuo: dialeto do barqueiro do Yulong (não é cantonês); bilheteria dos rafts; preço ¥150–250; idade da figueira (~1.400 anos, "tradição local"); GMV do Singles' Day; "três anos" de Zhang Yimou.
- [ ] 🟡 Shenzhen: Huaqiangbei é Linha 2/7 (na Linha 1 a estação é Huaqiang Road); tofu fedorento "¥80"; Bao'an 300 mil × 30 mil; Civic Center (chapéu de mandarim × asas); orientação da vista do MO Bar; Linha 4 "sem troca" desde o COCO Park; Ping An "4º mais alto" (hoje ~5º).
- [ ] 🟡 Xiamen: **linguiça minnanesa não entra no Japão** (trocar a dica); Linha 1 não passa na universidade; rota para Gaoqi "de oeste para leste"; ciclovia 环岛路; área de Gulangyu (1,87 × 1,91 km²); "900 mil tigelas"; Nan Putuo "século IV" (é Tang); "mais pianos per capita do mundo" × "da China".
- [ ] 🟡 Fukuoka: o santuário temporário de Sou Fujimoto ainda está de pé em nov/2026?; koyo vem de momiji/ginkgo, não das ameixeiras; costa coreana visível?; JapanTaxi → GO; tarifas do metrô (¥180 × ¥210) e do Nishitetsu para Dazaifu; rio dos yatai (Naka-gawa × Hakata-gawa).
- [ ] ⚪ Beppu: reimen com "melancia em conserva" (é de Morioka) e "Estreito de Bungo"; Hyotan "3 estrelas Michelin" (Guia Verde?) e "único"; tarifa do Kamenoi Bus (¥150–380); JR Beppu→Yufuin faz baldeação em Oita; argumento do Yufuin no Mori.
- [ ] ⚪ Contagens do livro: "22 dias de China" (são ~20–21), "28 × 29 dias", "desceu o Yangtze" (não há cruzeiro), Zhangjiajie chamada de "megacidade" em Kurokawa.

## 5. Conteúdo faltante (pipeline normal)

### Atrações em placeholder: 36 páginas
Executar com *`travel-content-planner` → place/event-finder → `travel-brief-validator` → `travel-page-assembler` → `travel-content-reviewer`*. Ajustar `days:` para o dia real (hoje é genérico) quando cada uma for escrita.

| Cidade | Visitadas (produzir) | Prioridade | Remover? |
|---|---|---|---|
| Zhangjiajie | tianmen-mountain, yuanjiajie-avatar, tianzi-mountain | tianmen, yuanjiajie | glass-bridge, golden-whip-stream |
| Furong | furong-cachoeira | — | — |
| Fenghuang | shen-congwen, hongqiao-fenghuang, muralha-fenghuang, rio-tuojiang-diaojiaolou, wanming-pagoda | shen-congwen | — |
| Guilin | rio-li-cruzeiro | alta | longsheng |
| Yangshuo | impressao-liu-sanjie, moon-hill, yulong-river, west-street | liu-sanjie, moon-hill | west-street pode ficar curta |
| Shenzhen | huaqiangbei, oct-loft, dafen | huaqiangbei | ping-an-shenzhen-bay |
| Xiamen | gulangyu, nanputuo, universidade-xiamen, zengcuoan, zhongshan-road-xiamen | gulangyu | — |
| Fukuoka | yatai, dazaifu, ohori-park-castelo | yatai, dazaifu | kushida-shrine, canal-city |
| Kurokawa | kurokawa-onsen | — | — |
| Beppu | beppu-jigoku, kannawa, takegawara-onsen, yufuin-day-trip | beppu-jigoku | fundir kannawa + beppu-jigoku? |

### Páginas e módulos incompletos
- [ ] 🟠 **`aprofundamento/paises/china/etnias.md`**: foi escrito para o roteiro antigo (Hui/Xi'an, Miao/Xijiang, Dong/Zhaoxing, links para atrações removidas). Reescrever com **Tujia** (Zhangjiajie/Furong/SE de Chongqing), Miao e Tujia em Fenghuang, **Zhuang** (Guangxi), **Minnan**/diáspora (Xiamen) e Hakka/migrantes (Shenzhen). *`travel-deepdive-writer`*
- [ ] 🟡 **`aprofundamento/paises/china/historia.md`**: 309 palavras (piso 1.500), ancorado em Xi'an. Reancorar em Chongqing (Ba, capital de guerra), Dazu (Song), Fenghuang (Muralha do Sul), Xiamen (porto de tratado, Koxinga) e Shenzhen (ZEE 1980).
- [ ] 🟡 Demais tópicos de Aprofundamento ainda não escritos (dinastia, geografia, Japão, províncias Hunan/Guangxi/Guangdong/Fujian/Fukuoka-ken/Kumamoto/Oita). O build já avisa.
- [ ] 🟡 **Fenghuang**: falta "O que só quem mora aqui sabe" (≥3 lugares), Quadro prático e Encerramento.
- [ ] 🟡 **Guilin**: falta "O que só quem mora aqui sabe".
- [ ] 🟡 **Kurokawa**: 4.650 palavras (piso 6.000). Falta "Comer e beber na vila" (Roku, Sumiyoshi, Yamatake, Tofu Kissho, Au Pan) e Quadro prático.
- [ ] 🟡 **Arquivos de dia inexistentes**: chegada a Fenghuang (08/11), chegada a Guilin (09/11), chegada a Xiamen (16/11) e retorno (28/11). Dependem da decisão 1.
- [ ] ⚪ jiefangbei.md sem Quadro prático; liziba.md com a frase falsa "Jiaochangkou oferece o mesmo ângulo".
- [ ] ⚪ Furong com 5.665 palavras (piso 6.000): aceitável pelo tempo útil, ou +350 palavras no Quadro prático.
- [ ] ⚪ Conferir a "Nota de logística — Dia N+1" nos arquivos 05, 08 e 09, que duplica o dia seguinte e em 08/09 já está errada. Remover depois da renumeração.

## 6. Estilo transversal (1 passada depois das decisões 1 e 4-6)

- [ ] 🟡 **"Não é X — é Y"**: ~70 ocorrências nas city pages (Xiamen 12, ZJJ 11, Yangshuo 8, Shenzhen 8, Fukuoka 7, Beppu 7). Cortar metade.
- [ ] 🟡 **Aberturas repetidas**: "X chega/aparece antes de qualquer outra coisa" (Chongqing, Fenghuang; variações em ZJJ e Beppu). 6 das 11 aberturas começam no veículo de chegada. Reescrever 3–4, com Fenghuang e Beppu primeiro.
- [ ] 🟡 **Repetição entre city page, dia e atração** (manter uma versão profunda e referências curtas nas outras):
  - Chongqing: janela da névoa (4×), Liziba (6×), Roda da Vida de Dazu, Glasses Noodles (3×).
  - ZJJ: Cameron/Avatar, chili defumado × Sichuan.
  - Fenghuang/Guilin: rajio taisō (4×), "espelho → parede de pedra" (3×).
  - Yangshuo: Pantao Road, cormorão, Groove (3×).
  - Shenzhen: metáfora "sistema/versão 3.0" (3×), Huaqiangbei/Dafen.
  - Xiamen: Fat Fat Beer Horse (4×, destino das 3 noites).
  - Fukuoka: mongóis, tonkotsu (3×), metrô silencioso na abertura e no Dia 21, "vinte dias de China" (6×).
  - Kurokawa: cor da água (3×).
  - Beppu: "Não é efeito especial…" (4×), Beppu Station Market, fecho "Onsen às 21h30. Trabalho às 23h." nos 5 dias.
- [ ] 🟡 **Três amanheceres seguidos** (Furong, Fenghuang, Guilin), com a mesma estrutura. Diferenciar a narrativa ou assumir a repetição.
- [ ] 🟡 **Esqueleto do day summary**: padronizar no formato do Chongqing (`Sequência → Logística → Ponto de partida`, separador `→`, rótulo "**Sequência:**").
- [ ] 🟡 **BRIEF-DIA**: padronizar os campos (`CUSTO`, formato de `FLAGS`) para o parser do day-writer.
- [ ] 🟡 **Módulos fixos**: mesmo título e mesma posição em todas as cidades (Quadro prático × O essencial × Orientação prática; Encerramento × Para encerrar; "O que está acontecendo" no início).
- [ ] 🟡 **Arquivos de dia**: esqueleto único `O dia em resumo → Hora a hora → Refeições → Logística` (fora do padrão: chongqing-dia-1 e dia-2). Padronizar os títulos do front matter (hoje há 4 formatos). Normalizar `date` entre aspas.
- [ ] ⚪ Shenzhen dia-13 mistura "tu" e "você". Uniformizar em "você".
- [ ] ⚪ Anglicismos soltos: "timing", "seaview boardwalk", "brewpub", "noodles". Decidir se ficam.
- [ ] ⚪ Shenzhen: "um engenheiro de IA visitando…" soa como perfil exposto. Suavizar.
- [ ] ⚪ Beppu dia-28 tem dois encerramentos seguidos; Beppu Social Bar aparece duplicado na Vida noturna.
- [ ] ⚪ Clichês leves em Zhangjiajie ("enlouquecer de amor pela paisagem").

## 7. Ferramentas e build

- [ ] 🟡 `build/build-registry.js`: `dayToCity[n]`/`diaPageIndex[n]` guardam um único valor ("último vence"). Aceitar lista ordenada por `part` e tirar a cidade do front matter do arquivo de dia. (Necessário para a decisão 1.)
- [ ] 🟡 `build/validate.js`: checar `global_day` = dia do mês de `date` e a unicidade de (`global_day`, `part`).
- [ ] ⚪ `audit.mjs`: depois da renumeração, trocar a checagem de offset por "N = dia do mês" e aceitar `part`.
- [ ] ⚪ Atrações de Chongqing: `days: [1,2,3,4]` genérico. Pelo assignment: hongyadong/ciqikou/jiefangbei/liziba = [2], dazu = [3].
- [ ] ⚪ Assignments `pesquisa/dias/00-*`: 87 "Dia N" (bastidor). Atualizar ou marcar como histórico após a renumeração. Faltam `title` em 5 deles.
- [ ] ⚪ Mover `guia.html*` (guia irmão) para fora do repo; aprovar o MCP `stock-images` (pendências antigas do CLAUDE.md).

---

## Ordem sugerida

1. Seção 1 (decisões) e seção 2 (reservas).
2. Renumeração: script + build (seção 7). Depois, `audit.mjs` e `build.js`.
3. Seção 3 (replanejar blocos), cidade por cidade, em paralelo.
4. Seção 4 (fatos), agrupada por cidade.
5. Seção 5 (conteúdo faltante), priorizando as atrações marcadas.
6. Seção 6 (estilo), numa passada única.
7. Rodar a skill `travel-final-review` de novo (fase 0 + fase 2) para fechar.
