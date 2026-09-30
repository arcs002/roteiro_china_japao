# Revisão final — pacote fukuoka-kurokawa (Fase 1)

**Veredito: PRONTO COM RESSALVAS** — as duas city pages e os três arquivos de dia estão consistentes entre si depois das correções. Ficam abertos três bloqueadores de roteiro e de fato: (1) o trecho Kurokawa→Beppu não está confirmado; (2) o trajeto do metrô do aeroporto ao hotel está errado; (3) há erros factuais de geografia na abertura de Fukuoka. As 6 atrações do pacote são stubs.

Estadia (config): Fukuoka 20–22/11 (sex–dom), WELLCABIN TENJIN; Kurokawa 22–23/11 (dom–seg), Ryokan Misato. Numeração lida no pacote: Fukuoka Dia 21 = 20/11, Dia 22 = 21/11; Kurokawa Dia 23 = 22/11 (com a manhã de 23/11 dentro do mesmo arquivo); Beppu começa no Dia 24 = 23/11. O offset é global_day = dia do mês + 1 do começo ao fim do pacote. O deslocamento vem de trás (Xiamen Dia 20 = 20/11, a mesma data de Fukuoka Dia 21), é problema transversal e não foi corrigido aqui.

Trabalho remoto: não há conflito no pacote. O próprio bastidor de Fukuoka diz que o turno EST começa na segunda 23/11, ou seja, na noite de 23/11 JST, já em Beppu, que usa turnos de 23h–7h. Sexta, sábado e domingo à noite ficam livres. **Mas** `perfil-viajantes.md` (linhas 13 e 103) ainda diz "Fukuoka (23–26/11)" / "21–26/11" com trabalho remoto. São datas antigas, de antes do roteiro TripIt. Está fora do pacote e fica para a fase 2 ou para o usuário.

## Correções Classe A aplicadas (57)

| Arquivo:linha (aprox.) | Antes → depois | Categoria |
|---|---|---|
| 09-fukuoka:21, :37 | "turbiledade" → "turbidez" (2×) | português |
| 09-fukuoka:53 | "O que a pesquisa encontrou em Fukuoka são três…" → "Três estabelecimentos de Fukuoka representam…" | metalinguagem |
| 09-fukuoka:59 | "noodles firmes e broth" → "macarrão firme e caldo" | jargão EN |
| 09-fukuoka:61 | "Mentaiko: a ostra de Kawahara Toshio" → "a invenção de…" | erro de palavra |
| 09-fukuoka:78 | "Prováveis 9h–22h" → "~9h–22h (… confirmar)" | tag vazada |
| 09-fukuoka:104 | FUKUOKA CRAFT "para beber no dia de partida para Kurokawa" (domingo à noite ele já está em Kurokawa) → "aberto nas duas noites da estadia…" | coerência de roteiro |
| 09-fukuoka:130 | "quasi-fila" → "quase-fila" | português |
| 09-fukuoka:168, :174, :217 | ônibus para Kurokawa "Nishitetsu, ~2h30, ¥2.500–3.000, horários variam" → Sanko Bus, ~3h, ¥3.000–4.000, partidas ~9h15/11h15/12h40, roteiro usa 12h40 (fonte: Lugares reais de Kurokawa §5 + BRIEF-DIA 23) | número interno |
| 09-fukuoka:245 | "sem compromissos amanhã cedo" (o Dia 22 começa às 7h30) → "o sábado começa cedo, com o mercado às 8h" | coerência dia↔dia |
| 09-fukuoka:278 | "aproveitam a véspera do feriado" (sábado não é véspera de um feriado na segunda) → "feriado prolongado" | data |
| 09-fukuoka:337 | "Ambas [Kurokawa e Beppu] ficam em Oita" → Kurokawa em Kumamoto, Beppu em Ōita (front matter `provincia: kumamoto`) | fato interno |
| 09-fukuoka BRIEF Dia 22 flag | ônibus Nishitetsu "chegar antes das 15h" → Sanko Bus, 12h40, chegada ~15h30 (alinha com o BRIEF-DIA 23) | BRIEF↔BRIEF |
| 10-kurokawa:29 | pico de koyo "empurrado para o final do mês" (contradiz :71 e o bastidor: pico no início e em meados de novembro) → pico no início/meados, com cor até o fim do mês | número interno |
| 10-kurokawa:41 | "uma resort-spa" → "um resort-spa" | português |
| 10-kurokawa:45 | "lavagem com chuveiro frio" → "lavagem no chuveiro" | fato/etiqueta |
| 10-kurokawa:47 | "rio Tanohara" → "Tanoharu" | terminologia |
| 10-kurokawa:49 | "grandes chances de estar em sua versão mais densa" → "ainda deve ter cor, provavelmente já na cauda da temporada" (bastidor: não prometer folhagem plena); "day use" → "entrada avulsa" | fonte + jargão |
| 10-kurokawa:51 | "A validade do tegata é válida para o dia da compra" → as informações divergem (do dia da compra a seis meses), confirmar | fonte + redundância |
| 10-kurokawa:61 | kaiseki "incluído nos planos standard" → "normalmente incluído… confirme se não é sudomari" | tag implícita |
| 10-kurokawa:63 | "Caminhar pelo kamado" → "pela vila" | erro de palavra |
| 10-kurokawa:69 | "Do Hakata, um ônibus" → "De Tenjin"; "menos de três horas" → "cerca de três horas" | número interno |
| 10-kurokawa:71 | "outono kumamotan" → "outono de Kumamoto" | português |
| 10-kurokawa:77 | "não foi confirmado na pesquisa" → "ainda precisa ser confirmado" | metalinguagem |
| 10-kurokawa:87 | "semanas em China" → "na China" | português |
| 10-kurokawa:91 | "gaps da pedra" → "fendas" | jargão EN |
| 10-kurokawa:103, :106 | "[VERIFICAR transporte]" → "(transporte a confirmar na recepção)"; "one-way" → "só ida" | pendência vazada + EN |
| 22-fukuoka-dia-21:17 | "copa gelado" → "copo gelado" | português |
| 22-dia-21:25 | "**FLAG — Horário do voo não confirmado. Este roteiro foi escrito…**" → "**Antes de sair de Xiamen:** confira o horário… Este dia foi pensado…" | metalinguagem |
| 22-dia-21:57 | "Por do sol" → "Pôr do sol" | português |
| 22-dia-21:65, :67 | "cacifos/cacifo" → "armários/armário" | lusitanismo |
| 22-dia-21:67 | Nakasu "a cinco quilômetros, quarenta minutos a pé, duas estações" → "pouco mais de um quilômetro, uns vinte minutos, uma parada Tenjin→Nakasu-Kawabata" (a própria tabela diz 20–25 min; Dia 22 diz 15 min e 1 parada) | número interno |
| 22-dia-21:99 | "2,5 km, duas estações de Watanabe-dori" → "uns vinte minutos, uma parada de Tenjin" | número interno |
| 22-dia-21:101 | "Nakasu tem cerca de cem yatai" → "Fukuoka tem cerca de cem… boa parte aqui" (city page + bastidor: ~100 no total da cidade) | número interno |
| 22-dia-21:111 | "o que você como" → "come" | português |
| 22-dia-21:137 | "nocturnos" → "noturnos" | pt-PT |
| 23-fukuoka-dia-22:43 | "outros condicionantes" → "outros temperos" | erro de palavra |
| 23-dia-22:55, :117 | "cacifo(s)" → "armário(s)" | lusitanismo |
| 23-dia-22:63, :81, :135 | "véspera de feriado" (sábado) → "feriado prolongado" | data |
| 23-dia-22:75 | "imponente" → "se impor" | clichê |
| 23-dia-22:101 | ônibus "~2h30, saídas 8h/10h, pegar o das 10h, ¥2.500–3.000" → Sanko Bus ~3h, 9h15/11h15/12h40, roteiro usa o das 12h40 (chegada ~15h30), ¥3.000–4.000 | dia↔BRIEF-DIA 23 |
| 23-dia-22:111 | Tenshudai "onde ficava o torreão… que nunca chegou a ser construído" → "base destinada ao torreão… que nunca chegou a ser erguido" | lógica/português |
| 23-dia-22:165 | janela do sumô "se o ônibus das dez… até 9h30" → "com o das 12h40, janela até por volta das 11h" | dia↔BRIEF-DIA 23 |
| 23-dia-22:223 | horário-alvo "antes das 10h, chegada 14h–15h, ¥2.500–3.000" → "12h40, chegada ~15h30, ¥3.000–4.000" | número interno |
| 23-dia-22:225 | **"23/11 (domingo)" → "(segunda-feira)"**; "FLAG — sábado véspera" → "Atenção — fim de semana de feriado prolongado"; "grupos chegam antes das 10h" (contradiz a linha 63) → "a partir das 10h" | data + metalinguagem |
| 24-kurokawa-dia-23:25 | "a manhã num ryokan — café, banho, checkout" (na manhã de 22/11 ele está no WELLCABIN em Fukuoka) → "a última manhã em Fukuoka — checkout do WELLCABIN, Tenjin, talvez o sumô" | coerência de roteiro |
| 24-dia-23:39 | "receber o briefing"; "nenhuma pesquisa online conseguiu resolver" → "as instruções da casa"; "vale resolver de viva voz" | metalinguagem |
| 24-dia-23:51 | "banho frio com chuveiro" → "lavagem no chuveiro" | fato |
| 24-dia-23:53, :89 | "Uma hora neste banho" / "após quarenta minutos" (contradiz "vinte minutos à tarde… trinta aqui") → "vinte, trinta minutos" / "meia hora" | número interno |
| 24-dia-23:61 | Sumiyoshi "sobre carvão… alternativa ao kaiseki para sudomari" → lanche rústico; a alternativa para sudomari é o Yamatake (BRIEF-DIA + bastidor) | dia↔BRIEF-DIA |
| 24-dia-23:75 | "imode de batata-doce ou barley" → "imo, de batata-doce, ou mugi, de cevada" | português/EN |
| 24-dia-23:99 | turistas "saem cedo na segunda para voltar ao trabalho" (segunda é feriado) → "saem na manhã de segunda para chegar em casa antes do trabalho de terça" | data |
| 24-dia-23:113 | "sair do ryokan às 9h30 para usar o Shinmeikan antes do checkout" (o BRIEF diz Shinmeikan 8h30–9h30) → "levante da mesa por volta das 8h30" | dia↔BRIEF-DIA |
| 24-dia-23:121 | "(PROVÁVEL — confirmar no local)", "(PROVÁVEL)" → "valor a confirmar no local", "horário que também vale confirmar"; "não paga separado" → "não se paga à parte" | tag vazada |
| 24-dia-23:131 | "[FLAG — VERIFICAR ANTES]… não estava confirmado nas pesquisas" → "Antes de ir: confirme o transporte… ainda precisa ser confirmado" | metalinguagem |
| 24-dia-23:141 | "(PROVÁVEL nos planos standard…)", "mais alinhada com o perfil do viajante" → "Nos planos com refeição, costuma incluir (confirme)", "a alternativa mais interessante" | tag vazada + metalinguagem |
| 24-dia-23:154 | "**[VERIFICAR]**… não confirmado" → "(a confirmar)" | pendência vazada |
| 24-dia-23:168–175 | a seção "## Flags para o escritor da página da cidade" era renderizada para o leitor (o build só filtra Imagens/Fontes/Lugares/Eventos). Virou "## Antes de ir — o que confirmar", com os 6 itens reescritos como aviso ao leitor, sem tags | bastidor vazado |

Contagem por categoria: metalinguagem/bastidor 8 · tag/pendência vazada 7 · português/erro de palavra 15 · lusitanismo/pt-PT 5 · jargão EN 4 · clichê 1 · data/dia da semana 7 · número interno ou dia↔BRIEF 10 · coerência de roteiro 3.

Achados da fase 0 que eram falso positivo: todas as "pendências" em linhas de prosa (09:282, 10:33, dia-21:41/43, dia-22:69/79, dia-23:27) eram "todo/toda" pegos pela regex TODO. A "falta days" nos 3 arquivos de dia vale para todos os arquivos de dia do guia (Xiamen também não tem `days`) e não foi mexida. As tags e os [VERIFICAR] que ficaram estão só dentro de `<!--BRIEF-DIA-->` e de `## Lugares reais pesquisados`, que são bastidor. `node build/build.js` roda ok depois das correções.

## Classe B (só reportado)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| 1 | 10-kurokawa (Dia 23 + BRIEF RETORNO), 24-dia-23 | O transporte Kurokawa→Beppu em 23/11 (feriado) não está confirmado. A página de Beppu já abre "descendo de ônibus de Kurokawa", como se a rota direta fosse certa. | Pesquisar o **Kyushu Odan Bus** (Kyushu Sanko/Kyu-Bus, Kumamoto–Aso–Kurokawa–Yufuin–Beppu, assento reservado). Se existir no horário, amarrar partida e chegada nos dois lados (Dia 23 e Beppu Dia 24). Se não, usar ônibus para Hakata + trem Sonic. Rodar `travel-itinerary-logistics`. | alta |
| 2 | 09-fukuoka (:142, :160, :241, BRIEF :259), 22-dia-21 (:55, :119, :153) | Trajeto do aeroporto errado. (a) Voo XMN→FUK é internacional: chega ao Terminal Internacional, que não tem metrô (é preciso o shuttle gratuito até o terminal doméstico, ~10–15 min). (b) Watanabe-dori fica na linha Nanakuma, não na Kuko. A sequência "Hakata → Nakasu-Kawabata → Watanabe-dori" não existe. (c) Tenjin→Ohori-Koen são 2 paradas (Akasaka no meio), não 1. | Reescrever o trecho: shuttle até o terminal doméstico → linha Kuko até Tenjin → a pé até o WELLCABIN (ou baldeação para Tenjin-Minami/Nanakuma, conforme o endereço exato). A volta noturna Nakasu-Kawabata → Tenjin. Confirmar a distância real hotel↔estação. | alta |
| 3 | 09-fukuoka abertura (:15, :17) | Geografia falsa: "a trezentos quilômetros de Xiamen" (são ~1.500 km); "mais perto de Xangai do que de Osaka" (é o contrário: ~880 × ~480 km); ver a costa coreana de Fukuoka em dia claro (dúvida: o que se vê é Tsushima, quando muito). | Cortar as duas afirmações erradas; manter "mais perto de Seul do que de Tóquio" (correto). | alta |
| 4 | 09-fukuoka :282, 23-dia-22 :75 | O santuário temporário de Sou Fujimoto em Dazaifu está previsto para cerca de 3 anos a partir de 2023. Não é certo que ainda esteja de pé em 21/11/2026, e o texto vende isso como "janela única". | Confirmar no site oficial do Dazaifu Tenmangu o cronograma de 2026. Se já tiver sido desmontado, reescrever os parágrafos. | média |
| 5 | 09-fukuoka :227, :284 | "As mais de seis mil ameixeiras ficam vermelhas e douradas" como motor do koyo: dúvida. As ume não são árvore de koyo; a cor vem dos momiji e dos ginkgos. O arquivo do dia (:73) já trata as ume como coadjuvantes. | Deslocar o koyo para momiji e ginkgo (e Komyozen-ji, citado no bastidor) e deixar as ume como fato do santuário (floração em fev–mar). | média |
| 6 | 09-fukuoka / 24-dia-23 | A manhã de domingo 22/11 em Fukuoka (checkout até a saída das 12h40) não tem plano em nenhum arquivo. Só há menções soltas ao sumô. | Acrescentar um bloco curto: checkout, bagagem no armário, sumô (lutas das categorias baixas desde as 8h) OU Ohori/castelo (o bastidor diz que abre 9h–17h aos domingos), compras sem konbini para Kurokawa. Decisão de estrutura: fica com o usuário e `travel-day-planner`. | média |
| 7 | 09-fukuoka abertura/retrato/gastronomia | Repetição: a invasão mongol aparece quase igual na Abertura (:19) e no Retrato geral (:33); a origem do tonkotsu em Nagahama aparece 3× (:21, :37, :45–49); o silêncio do metrô aparece na abertura e de novo no Dia 21 com a mesma imagem. | Manter uma versão em profundidade (Retrato para os mongóis, Gastronomia para o tonkotsu) e deixar referências curtas nas outras. | média |
| 8 | pesquisa/atracoes/{yatai,dazaifu,ohori-park-castelo,kurokawa-onsen,canal-city,kushida-shrine}.md | 6 stubs (~40 palavras, "Placeholder"). Kushida não entra em nenhum dia; Canal City só aparece de passagem. | Pipeline normal (`travel-content-planner` → … → `travel-page-assembler`) para yatai, dazaifu, kurokawa-onsen, ohori. Remover kushida-shrine e canal-city (ou despublicar). Corrigir também `days:` delas: dazaifu/ohori só [22], kurokawa-onsen [23]. | média |
| 9 | 10-kurokawa | 4.650 palavras (piso 6.000). Sem módulos de gastronomia/lugares na vila, Como se locomover e Quadro prático, embora o bastidor tenha Roku, Sumiyoshi, Yamatake, Tofu Kissho e Au Pan. | Escrever um módulo "Comer e beber na vila" + um quadro prático curto (ônibus, tegata, sem konbini, tatuagem, cash) via `travel-page-assembler`. | média |
| 10 | perfil-viajantes.md :13, :103 (fora do pacote) | Datas de trabalho remoto em Fukuoka antigas ("23–26/11", "21–26/11"). O roteiro atual põe o 1º turno na noite de 23/11, em Beppu. | Atualizar o perfil: remoto a partir de 23/11, Beppu. | média |
| 11 | 22-dia-21 :17 / xiamen dia-20 | "O voo XMN–FUK dura pouco mais de uma hora" (são ~2h de voo, mais 1h de fuso). Xiamen sai do hotel às 12h, o que é coerente com a chegada ~16h–17h assumida aqui, mas o voo não está em `voos.md`. | Registrar o voo XMN→FUK real em `voos.md` e ajustar a duração e a hora de chegada no Dia 21. | baixa |
| 12 | 09-fukuoka :164, :216 | "Japan Taxi / GO": o JapanTaxi virou GO em 2020. | Citar só "GO". | baixa |
| 13 | 22/23 dias, 09-fukuoka | Pequenas divergências de horário do último metrô (00h15 × "meia-noite e meia") e de tarifa (¥180 × ¥210). A Nishitetsu Tenjin→Dazaifu provavelmente é tarifa direta, não ¥340+¥140. | Uniformizar depois de conferir as tarifas oficiais. | baixa |

## Notas de estilo e qualidade (não são erro)

1. A abertura de Fukuoka e a abertura do Dia 21 usam a mesma cena (metrô silencioso, alguém dormindo inclinado, "convenção tão internalizada que ninguém precisa de cartaz"), quase com as mesmas palavras. Vale trocar a cena de um dos dois.
2. "Vinte dias de China" como gancho aparece em pelo menos 6 parágrafos de Fukuoka. Kurokawa repete "22 dias de…" 3×, e na :143 chama Zhangjiajie de "megacidade".
3. "Não é X — é Y" é o molde retórico dominante nos 5 arquivos (dezenas de ocorrências). Variar a estrutura.
4. O Dia 23 (Kurokawa) descreve a mudança de cor da água três vezes (city page, banho das 17h, banho matinal). Uma descrição completa e duas referências curtas bastariam.
5. Nomes: "Nakasugawa" (Dia 22) × "Hakata-gawa" (Dia 21) para o rio dos yatai. Escolher um só. O que corre ao lado da fileira principal de yatai de Nakasu é o Naka-gawa, lado oeste da ilha; conferir.
