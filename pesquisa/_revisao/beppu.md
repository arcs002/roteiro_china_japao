# Revisão final — pacote beppu (Fase 1)

**Veredito: PRONTO COM RESSALVAS** — a city page e os 5 arquivos de dia estão completos, em PT-BR editorial e coerentes com a estadia (23/11 seg → 28/11 sáb, Super Hotel Beppu Ekimae). Mas as 4 atrações ainda são stubs, e há três pendências de roteiro que dependem de decisão ou fonte: o Combo Pass/Shibaseki, a logística de saída em 28/11 e o horário de checkout.

Arquivos: `pesquisa/cidades/11-beppu.expandido.md`, `pesquisa/dias/25..29-beppu-dia-24..28.md`, `pesquisa/atracoes/{beppu-jigoku,kannawa,takegawara-onsen,yufuin-day-trip}.md`. Não existe `pesquisa/dias/00-beppu-assignment.md`.

## Achados da fase 0 confirmados / descartados

- **pendência (15 erros)**: todos **falso positivo**. A regex `\bTODO\b/i` casa com a palavra portuguesa "todo". Nenhuma pendência real na prosa. Os únicos placeholders reais são os 4 stubs de atração.
- **clichê "imperdível" (2)**: falso positivo. Em l.147 é uma citação irônica do que "os guias dizem"; em l.185 aparece negado ("Não porque Yufuin seja imperdível").
- **tag-vazada (13 linhas, 16 tags)**: confirmado e corrigido.
- **metalinguagem "o brief" (2)**: confirmado e corrigido.
- **front-matter (9)**: confirmado e corrigido.
- **extensão/stub (4 atrações)**: confirmado. Vai para a Classe B (não se escreve stub nesta fase).

## Correções Classe A aplicadas (51)

| Arquivo:linha | Antes → depois |
|---|---|
| **Front matter** (5 arquivos) | |
| dias/25-beppu-dia-24.md:1 | + `days: [24]` |
| dias/26-beppu-dia-25.md:1 | + `city: beppu`, `day: 25`, `days: [25]` |
| dias/27-beppu-dia-26.md:1 | + `city: beppu`, `day: 26`, `days: [26]`, `emoji: ♨️`, `pais: japao` |
| dias/28-beppu-dia-27.md:1 | + `city: beppu`, `day: 27`, `days: [27]`, `emoji`, `pais` |
| dias/29-beppu-dia-28.md:1 | + `city: beppu`, `day: 28`, `days: [28]`, `emoji`, `pais` |
| **Tags vazadas** (city page) | |
| 11-beppu.expandido.md:71,83,85,89,103×2,109,115,131,133,135,177 | `(CONFIRMADO, …)` → `(…)`: 13 tags, os dados entre parênteses foram mantidos |
| 11-beppu.expandido.md:111 | `**Beppu Station Market** (CONFIRMADO)` → sem tag |
| 11-beppu.expandido.md:129 | `(CONFIRMADA como área)` → removido |
| 11-beppu.expandido.md:179 | `(CONFIRMADA como lotada após 10h30) em si, a rua, já esteve lotada…` → `em si, a rua principal, fica lotada de ônibus de turismo a partir das 10h30` |
| **Metalinguagem/bastidor** | |
| dias/26-beppu-dia-25.md:88 | `…crítica do dia, que o brief já marcou em maiúsculas` → `…crítica do dia` |
| dias/26-beppu-dia-25.md:156 | `a restrição de horário que o brief já marcou` → `uma restrição de horário` |
| dias/27-beppu-dia-26.md:156-160 | bloco "Notas de operação" com flags cruas (`SUNAMUSHI_ULTIMA_ENTRADA_17H30`, `MYOBAN_YUNOSATO_PROVAVEL`, `REMOTE_WORK_23H`…) → "Atenção:" em frases normais |
| dias/28-beppu-dia-27.md:161 | `**Flags operacionais:**` → `**Atenção:**` |
| **Jargão em inglês** | |
| 11-beppu.expandido.md:93 | `remote work` → `trabalho remoto` |
| 11-beppu.expandido.md:306,341,382,454 | Sequência `23h remote work` → `23h trabalho remoto` (os BRIEF-DIA ficaram intocados) |
| 11-beppu:101, dia-24:76, dia-28:92 | `coating` → `película` |
| dia-25:26 | `buckwheat` → `trigo-sarraceno` |
| dia-25:96 | `temperatura layered` → `temperatura em camadas` |
| dia-25:116 | `chá de barley` → `mugicha (chá de cevada)` |
| dia-25:128 | `beer draft` → `chope` |
| dia-24:56 | `unmistakável` → `inconfundível` |
| dia-27:82 | `broth` → `caldo` |
| dia-27:100 | `cardápio de imagem laminated` → `cardápio plastificado com fotos` |
| dia-26:70 | `cierre` (espanhol) → frase reescrita (ver a linha de fato abaixo) |
| **Erro de português / digitação** | |
| dia-24:26 | `yukatta` → `yukata` |
| dia-24:36 | `recepcionist` → `recepcionista` |
| dia-24:60 | `Dois horas` → `Duas horas` |
| dia-25:26 | `rodela de semiaberto de carne gelada` (frase truncada) → `fatia de carne bovina gelada` |
| dia-25:80 | `micro-clima` → `microclima` |
| dia-25:122 | `uma endereço` → `um endereço`; `izakayas pequenos abertas` → `abertos` |
| dia-25:138 | `terrroso` → `terroso`; `cujo produto circular até Tóquio é improvável` → `cujo produto dificilmente circula até Tóquio` |
| dia-26:24 | `gessos de gelo` → `bandejas de gelo` |
| dia-26:34 | `cobert` → `coberto`; `océano` → `oceano` |
| dia-26:46 | `num sauna` → `numa sauna` |
| dia-26:50 | `para a desenterra` → `para desenterrar você`; `num complex` → `num complexo` |
| dia-26:108 | `carafera` → `jarra` |
| dia-27:46 | `uma sorveterias` → `uma sorveteria` |
| dia-27:64 | `os vales em escurecendo` → `os vales escurecendo` |
| dia-27:84 | frase sem sentido `Peças de testa de loja.` → removida |
| dia-27:100 | `aquário de baiacu vivos` → `baiacus vivos` |
| dia-27:165 | `Ultimo` → `Último` |
| dia-28:76 | `julio` → `julho` |
| dia-28:90 | `un guia` → `um guia` |
| **Fato ou número interno (a fonte resolve)** | |
| 11-beppu:43 | `no trigésimo dia` → `no vigésimo quarto dia` (23/11 = global_day 24) |
| 11-beppu:69 | Combo Pass `cinco ou mais já justifica` → `quatro ou mais` (4 × ¥600 = ¥2.400; bate com dia-25) |
| 11-beppu:73 | janela 14h–17h `três horas e meia` → `três horas` |
| 11-beppu:99 | `depois de uma semana em Tóquio, dois dias em Osaka e uma passagem por Kyoto` (não faz parte deste roteiro) → `com Tóquio, Osaka e Kyoto de viagens anteriores` |
| 11-beppu:163 | Myoban `a nordeste` → `a noroeste` (bate com l.35) |
| 11-beppu:167, dia-27:92 | `Mar Interior de Kyushu` → `Mar Interior de Seto` |
| 11-beppu:448 | `sol embaixo do horizonte da Baía de Beppu` (a baía fica a leste) → `atrás das montanhas a oeste` (bate com dia-28:72) |
| 11-beppu:452, dia-28:118 | `embarque para Xangai, conexão para São Paulo` → `…e, no domingo às 11h05, o voo de volta a São Paulo` (segundo voos.md) |
| 11-beppu:481 | `onsen antes do turno às 22h30` → `onsen das 21h30, antes do turno das 23h`; Toyotsune Ekimae `na terça-feira` → `na segunda-feira` (foi o jantar do Dia 24) |
| dia-24:136 | Takegawara `fecha às 22h30 (entrada até 22h)` → sem o "(entrada até 22h)", que a fonte não traz (6h30–22h30) |
| dia-25:58 | `a menos de um grau do ponto de fusão` → `a menos de dois graus do ponto de ebulição` (água a 98°C) |
| dia-25:156 | `Cinco jigoku de Kannawa` → `Três` (o dia visita Umi, Oniyama e Kamado) |
| dia-26:60 | sol `a uns 30 graus acima do horizonte` às 16h30 (o pôr do sol é 17h10) → `já rente à encosta a oeste` |
| dia-26:70 | "Chinoike não tem a restrição de 17h30, ainda pode ser vista" → Chinoike segue o horário geral dos jigoku (8h–17h, fonte: `11-beppu.md` l.37), então também estaria fechado |
| dia-26:72, 158 | "Combo Pass vale hoje e amanhã, deixar Shibaseki para o Dia 27" → o passe vale no dia da compra e no seguinte (24 e 25/11) e vence no Dia 26; Shibaseki no Dia 27 só com ingresso avulso (¥600) |
| dia-26:88 | `dois jigoku azuis ontem (Umi-Jigoku, Shiraike)` (Shiraike não foi visitado) e `sunamushi branco de areia` (a areia é escura) → `azul-cobalto do Umi-Jigoku ontem e da areia escura do sunamushi hoje` |
| dia-26:90 | `sol abaixo do horizonte da baía` → `sol já atrás da montanha` |
| dia-26:122 | cliente em EST: `a tarde deles começa` (às 22h50 JST são 8h50 EST) → `a manhã deles começa` |
| dia-27:20 | `quarto ciclo de turno remoto encerrado` → `terceiro` (turnos das noites de 23, 24 e 25/11) |
| dia-28:16 | `dois países, catorze cidades` → `onze paradas` (config) |
| dia-28:118 | `começou em Pequim no dia 30 de outubro` → `31 de outubro` (chegada PKX 31/10, voos.md) |

Contagem por categoria: front matter 5 · tag vazada 16 · metalinguagem/bastidor 4 · jargão em inglês 14 · português/digitação 22 · fato/número interno 20.

## Classe B (só reportado)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| 1 | 11-beppu.expandido.md (Os oito infernos l.69/73, Dia 26 l.376 + BRIEF-DIA), 27-beppu-dia-26.md | **Shibaseki (Chinoike + Tatsumaki) nunca é visitado.** A city page promete "Shibaseki no Dia 26 com o mesmo Pass". O dia 26 real (sunamushi 15h30 → Myoban) não cabe: os jigoku fecham às 17h (fonte), e o próprio arquivo de dia conclui que é inviável. O summary diz que Shibaseki fica "no caminho de volta do sunamushi", mas o sunamushi é ao sul e Shibaseki ao norte, perto de Kannawa. A city page também diz que o Tatsumaki fecha às 17h30, e a fonte dá 17h para todos. | Usuário decide: (a) no Dia 25, trocar o Kamado por Shibaseki (ônibus Kannawa→Shibaseki 10 min) antes do jigoku-mushi; ou (b) no Dia 26, começar por Shibaseki às 14h e seguir para o sunamushi às 15h45 (última entrada 17h30), com Myoban depois. Em seguida, reescrever o summary, o BRIEF-DIA e o arquivo de dia pelo `travel-day-planner` e depois pelo `travel-day-writer`. Unificar o horário do Tatsumaki em 17h. | alta |
| 2 | 11-beppu (Quadro prático l.207, Dia 28, Encerramento), 29-beppu-dia-28.md:108,171 | **Saída em 28/11 indefinida e contraditória.** O dia-28 diz que "a logística para o aeroporto começa às 9h no máximo para um voo internacional" e cita cartão de embarque "às 6h da manhã", enquanto o checkout é às 11h. O Encerramento diz "ônibus para Fukuoka ~1h40" (o trajeto Beppu–Hakata/aeroporto FUK leva ~2h–2h40 de ônibus rodoviário ou JR Sonic). voos.md: o trecho FUK→PVG **não está reservado**; o voo PVG→FRA sai dom 29/11 às 11h05, então é preciso pernoite em Xangai. | Usuário decide o trecho 28/11 (voo FUK→PVG, horário). Depois ajustar à mão 3 frases (dia-28 l.108 e l.171, Encerramento l.483) para "voo a Xangai no sábado, pernoite, embarque domingo 11h05". Fase 2 cruza com voos.md. | alta |
| 3 | 11-beppu.expandido.md:207 vs Dia 28 / dia-28 | **Checkout**: o Quadro prático diz "até as 10h" (bate com a pesquisa em `11-beppu.md` l.27); o Dia 28 e o dia-28 dizem "às 11h" (bate com a tabela do perfil). As duas fontes de verdade divergem. | Conferir na reserva e unificar. | média |
| 4 | atracoes/{beppu-jigoku,kannawa,takegawara-onsen,yufuin-day-trip}.md | 4 stubs (40–47 palavras), todos de lugares que o roteiro visita. O stub do Yufuin ainda fala em "30 min de trem", contra ~1h no resto do pacote. | Rodar o pipeline normal (`travel-content-planner` → … → `travel-page-assembler`). Opção: fundir `kannawa` e `beppu-jigoku`, que se sobrepõem quase por completo. | média |
| 5 | 28-beppu-dia-27.md, 11-beppu Dia 27 | **26/11/2026 é Thanksgiving nos EUA** (e 27/11 é Black Friday). O turno das 23h JST de 26/11 cai às 9h EST do feriado, então é provavelmente uma noite livre, e o texto não considera isso. O dia-28 já pede "verificar se o turno de sexta existe" pelo motivo errado (a sexta à noite JST é sexta de manhã nos EUA, dia útil). | Usuário confirma a agenda de trabalho. Se 26/11 for folga, o Dia 27 pode fazer as duas opções (Yufuin + fugu tarde) ou incluir vida noturna depois das 23h (Motomachi Bar até 2h, Beppu Social Bar até 5h). | média |
| 6 | 11-beppu Day trip (l.175) vs Como se locomover (l.199) vs Dia 27 | Três versões do transporte para Yufuin. O módulo Day trip recomenda o ônibus Kamenoi (50–60 min); o Como se locomover dá ônibus ~45 min a ¥800–1.000 e JR ~1h a ¥580; o Dia 27 usa só o JR. O argumento de que o Yufuin no Mori seria uma "impossibilidade" por causa do sono não se sustenta: a reserva abre 26/10 e pode ser feita online. O motivo real está na fonte: há 1 ida e volta por dia com passagem por Beppu. O JR Beppu→Yufuin faz baldeação em Oita (Nippō → Kyūdai), e a tarifa de ¥580 vale conferir. | Unificar numa recomendação só e ajustar o argumento do Yufuin no Mori para "horário/rota". Também vale lembrar que o ônibus Kurokawa→Beppu do Dia 24 passa por Yufuin. | baixa |
| 7 | 26-beppu-dia-25.md:26 | Reimen: "cubo de melancia em conserva" é traço do reimen de Morioka, não do de Beppu. A frase "chegou pelo Estreito de Bungo" é geograficamente errada: o estreito separa Kyushu de Shikoku, não da Coreia (o reimen de Beppu veio com imigrantes vindos da Manchúria/Coreia no pós-guerra). | Checar a fonte e reescrever 2 frases. | baixa |
| 8 | 11-beppu:41,85,446; dia-28:58 | Hyotan: "três estrelas Michelin... na categoria de acomodação" e "único onsen do Japão com três estrelas". Provavelmente se trata do Guia Verde Michelin (atrações), e "único" não tem fonte. | Checar e ajustar para "Guia Verde Michelin, três estrelas". | baixa |
| 9 | 11-beppu (Abertura l.23, Dia 24 l.294, dia-24, dia-25) | "22 dias de China": pelo calendário são 21 (31/10–20/11). | Unificar ("três semanas de China"). | baixa |
| 10 | 11-beppu Dia 28 l.444 | "desceu o Yangtze": o roteiro não tem cruzeiro no Yangtze (Chongqing é só a cidade à beira do rio). | Confirmar na fase 2 e trocar por "começou à beira do Yangtze". | baixa |
| 11 | Kamenoi Bus, várias linhas | Tarifa inconsistente: ¥380 (dia-25) vs ¥150–300 (Quadro prático) vs ¥200–300 (dia-26, dia-28). Nenhuma fonte no pacote resolve. | Conferir a tarifa estação→Kannawa e unificar. | baixa |
| 12 | 11-beppu:175 | O Day trip diz "Às 15h30 de uma quinta-feira" e "Dia 27", coerente com o Dia 27. Registro só como confirmação: **Yufuin está tratado como bate-volta de Beppu, não como estadia separada**. Nenhuma ação necessária. | — | ok |

## Coerência do roteiro (C)

- **Datas/dia da semana**: 23/11 seg (Kinrō Kansha no Hi) → 27/11 sex, todas corretas. Fechamentos batem com os dias: Toyotsune Honten fecha ter/qua (usado na sex); Ekimae-ten fecha qui (usado na seg); Fugumatsu fecha qua (dia-26 evita, dia-27 usa na qui); Ramentei fecha dom (usado ter e sex); Takegawara fecha na 3ª quarta = 18/11 (não afeta).
- **City page ↔ arquivo de dia**: os 5 dias batem com o BRIEF-DIA em atividades, ordem, almoço e jantar (±30 min). Ressalvas: o Dia 25 do arquivo não inclui o bloco "hotel 18h30" do brief (fica implícito), e o Dia 26 omite o Motomachi Bar, que era opcional. A única divergência material é Shibaseki (B1).
- **Hotel**: o Super Hotel Beppu Ekimae é o ponto de partida e de retorno em todos os dias; o bairro (Ekimaecho) é coerente.
- **Chegada 23/11**: checkout em Kurokawa às 10h, Sanko Bus/táxi + JR, chegada ~13h30 na estação JR Beppu, bagagem no hotel, check-in 15h. É plausível. O lado de Kurokawa fica para a fase 2.
- **Partida 28/11**: ver B2 e B3.
- **Trabalho remoto**: 23h–7h JST (= 9h–17h EST) aparece de forma consistente em todos os dias, com a janela de turismo das 14h às 22h30.

## Notas de estilo (não são erro)

1. O fecho "Não é efeito especial. Não é decoração sazonal. É a infraestrutura…" aparece quase idêntico na city page (l.153), no dia-24, no dia-25 e no dia-28. Vale manter em um só lugar.
2. O parágrafo do Beppu Station Market se repete com as mesmas palavras em Gastronomia (l.111) e em "O que só quem mora aqui sabe" (l.159); a explicação toriten/kabosu se repete na city page, no dia-24 e no dia-28. Melhor deixar uma versão profunda e referências curtas nas outras.
3. Os cinco arquivos de dia fecham com a mesma cadência "Onsen às 21h30. Trabalho às 23h.". O ritmo repetitivo pesa na leitura corrida do livro.
4. O dia-28 tem dois encerramentos seguidos ("22h30 — Hotel, encerramento" e "Encerramento: o que este dia entrega") e ainda compete com o Encerramento da city page.
5. Em Vida noturna, o Beppu Social Bar aparece duas vezes seguidas com o mesmo horário (l.135).
