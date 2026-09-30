# Revisão final — pacote fenghuang-guilin (Fase 1)

**Veredito: NÃO PRONTO.** As duas city pages e os dois arquivos de dia estão bem escritos e agora estão limpos de bastidor. O pacote não passa por três motivos: (1) os horários de nascer do sol estão errados em ~30 min nas duas cidades, e as manhãs mais importantes do pacote foram montadas em cima deles; (2) a logística do Dia 11 em Guilin (táxi às 8h30 para embarque às 9h num pier a 27 km) não fecha; (3) as 7 atrações do pacote são stubs.

Estadia (config): Fenghuang 08→09/11 (1 noite, Tuojiang Town), Guilin 09→10/11 (1 noite, área dos Rios e Quatro Lagos), Yangshuo a partir de 10/11. Dias da semana conferidos: 07/11 sáb (Lìdōng), 08/11 dom, 09/11 seg, 10/11 ter — tudo certo no texto.

## Como a numeração de dias chega ao leitor neste pacote

Neste trecho o offset está correto: global_day N = 30/10 + N (Dia 9 = 08/11, Dia 10 = 09/11, Dia 11 = 10/11). O problema está nos dias de trânsito, que aparecem em duas cidades:
- **Dia 9 (08/11)** = manhã em Furong Town + tarde/noite em Fenghuang. Só existe arquivo de dia para Furong (`09-furong-town-dia-9.md`). O Dia 9 de Fenghuang (a chegada, com a hora dourada no Huilong e o jantar no Junzi) **não tem hora a hora**.
- **Dia 10 (09/11)** = manhã em Fenghuang (`10-fenghuang-dia-10.md`) + noite em Guilin. O Dia 10 de Guilin (barco noturno pelos lagos) **não tem hora a hora**.
- **Dia 11 (10/11)** = manhã em Guilin + cruzeiro (`11-guilin-dia-11.md`) + tarde/noite em Yangshuo (`12-yangshuo-dia-11.md`). Dois arquivos para o mesmo global_day, e os dois cobrem metades que se completam. Isso é coerente, mas a rota `#day/11` precisa decidir qual mostra.

**Horário de saída de Fenghuang (a flag operacional do Dia 10):** o certo é **~11h**. O BRIEF-DIA de Fenghuang diz ~11h (a flag era só um aviso de que o horário não está confirmado, não um horário diferente). O summary, o arquivo de dia e o BRIEF-DIA do Dia 10 de Guilin (chegada 16h, check-in 17h–17h30) batem com 11h + ~5h de estrada. A flag do arquivo de dia foi reescrita como aviso ao leitor. O que continua em aberto é o **modal**: não há reserva (ver B2).

**Transições vistas deste lado:**
- Furong → Fenghuang: Fenghuang espera check-in ~14h00 vindo de Furong. Furong diz táxi de 2h–2h30 e chegada 13h–13h30. Bate. Só que o `09-furong-town-dia-9.md` chama a chegada de "(Dia 10)" e de "segunda-feira (09/11)", quando o certo é Dia 9, domingo 08/11. Arquivo fora do pacote, fica para a Fase 2.
- Fenghuang → Guilin: 11h → 16h–17h, van/ônibus. Coerente dentro do pacote.
- Guilin → Yangshuo: Guilin prevê embarque às 9h00 no Mopanshan e chegada 13h30–14h30 no Longtoushan Pier. Yangshuo Dia 11 prevê atracação ~14h. Bate. Mas o Yangshuo diz "saída de Guilin antes das oito", e o Guilin sai do hotel às 8h30 (ver B3). O Guilin diz ainda "três minutos a pé até o centro" a partir do pier, enquanto o Yangshuo manda pegar táxi ou mototáxi de ¥30–50, "dez a quinze minutos". Uma das duas versões está errada (ver B7).

## Correções Classe A aplicadas (47)

| Arquivo | Antes → depois | Categoria |
|---|---|---|
| cidades/04-fenghuang.md (O que está acontecendo) | "O primeiro módulo do inverno no calendário lunissolar" → "O primeiro termo solar do inverno" | erro/termo |
| 04-fenghuang (idem) | "casarões de estilos stilt houses — as diaojiaolou" → "casas de palafita — as diaojiaolou" | inglês |
| 04-fenghuang (idem) | "Pergunte ao hospedeiro onde se está" → "Pergunte na pousada onde está acontecendo" | português |
| 04-fenghuang (Gastronomia) | Junzi "a menos de dez minutos a pé" da ponte → "a poucos minutos" (BRIEF: ~2 min) | número interno |
| 04-fenghuang (Gastronomia) | barracas "por volta das 6h" → "6h30" (igual ao arquivo de dia) | número interno |
| 04-fenghuang (Vida noturna) | "accessível" → "acessível" | ortografia |
| 04-fenghuang (Dia 9) | "golden hour" → "hora dourada" (prosa + Sequência); "Walk Rua Antiga" → "Caminhada pela Rua Antiga" | inglês |
| 04-fenghuang (Dia 10) | "calendário lunar" → "calendário solar chinês"; "pela uma vez" → "desta vez"; "*Bordercity*" → "*Cidade de Fronteira*" (igual ao Retrato geral); Sequência "(golden hour com névoa)" → "(névoa ao amanhecer)" | erro/inglês/consistência |
| 04-fenghuang BRIEF-DIA Dia 10 | JANTAR "(a ser planejado no Dia 11)" → "(ver Dia 10 da página de Guilin)" | numeração |
| dias/10-fenghuang-dia-10.md | "pela uma vez" → "desta vez"; "acorgar" → "acordar"; "Charger" → "Carregador"; "a segunda-feira do dia 10" → "a segunda-feira" | português |
| 10-fenghuang-dia-10 | "**Flag de atenção:**" → "**Atenção:**"; "Não substituir por visita a templo — não é o perfil." → "Trocar por um templo não compensa." | metalinguagem |
| 10-fenghuang-dia-10 | "O Dia 11 começa ali." / "Jantar — Guilin (Dia 11) … consultar o hora-a-hora do Dia 11" → remetem ao Dia 10 da página de Guilin | numeração errada |
| 10-fenghuang-dia-10 (final) | "Flag para o escritor da página da cidade" + "Flag operacional … BRIEF-DIA" → avisos ao leitor "Antes de ir" e "Horário da van" (mesmo conteúdo) | metalinguagem |
| cidades/05-guilin.md (Abertura) | "bagagem apareceu na esteira de Guilin Norte" → "saiu do bagageiro do ônibus em Guilin" (a mesma frase fala em 5h de ônibus) | coerência |
| 05-guilin (O que está acontecendo) | névoa ao nascer do sol "em 9 de novembro" → "10 de novembro" (na manhã de 09/11 o viajante está em Fenghuang) | data |
| 05-guilin (米粉) | Lao Dong Jiang "fecha ao meio-dia" → "no começo da tarde" (fonte/BRIEF: ~6h–14h); "chega no domingo à noite" → "segunda-feira" | número/data |
| 05-guilin (Dois Rios e Quatro Lagos) | "a partir das 19h30" → "a partir das 19h ou 19h30, conforme a temporada" (Dia 10 e BRIEF dizem 19h) | número interno |
| 05-guilin (Rio Li) | "scrollando o celular" → "rolando a tela do celular" | inglês |
| 05-guilin (Dia 10) | "Golden Week" → "Semana Dourada"; Sequência "golden hour"/"walkway lakeside" → "luz dourada"/"caminhada pela orla dos lagos" | inglês |
| 05-guilin (Dia 11) | Elephant Trunk Hill "a dois quilômetros" → "a poucos minutos a pé" (o dia fala em 8–10 min) | número interno |
| 05-guilin (Dia 11) | "A golden window dura…" → "A janela de luz dura…"; Sequência "(golden window, …)" → "(melhor luz, …)" | metalinguagem |
| 05-guilin (Dia 11 prosa, BRIEF, Quadro prático) + 11-guilin-dia-11 | piers Mopanshan/Zhujiang "em direções opostas / pontos opostos" → "distintos, a quilômetros um do outro, ambos ao sul" (os Lugares pesquisados dão os dois a 27–28 km ao sul) | fato interno |
| dias/11-guilin-dia-11.md | removido "com o bonde vazio" (Guilin não tem bonde); "dry-mix com molho de brasado"/"ovo de brasado" → "versão seca, com molho de braseado"/"ovo braseado" (2x); "fecha ao meio-dia" → "no começo da tarde"; "Settle a conta" → "Acerte a conta" | fato/inglês/número |
| 11-guilin-dia-11 | título "O Rio Li: quatrocentos anos dentro do rio" (número sem fonte) → "quatro horas dentro da paisagem"; "Não planejado neste arquivo. O jantar pertence ao Dia 11 de Yangshuo." → "Ver o Dia 11 na página de Yangshuo." | fato/metalinguagem |
| atracoes/rio-li-cruzeiro.md | `days: [10]` → `[11]` (o cruzeiro é no Dia 11) | front matter |
| atracoes/shen-congwen.md | `days: [9]` → `[10]` (a visita é no Dia 10) | front matter |

Falsos positivos da Fase 0 confirmados: as 6 "pendências" em 04:75, 05:17, 05:39, dia10:82, dia11:18 e dia11:90 são a palavra "todo/todos" batendo no regex de TODO. Nada pendente de fato. As tags e os "golden window"/"FLAGS" que sobraram estão só em `<!--BRIEF-DIA-->` e em `## Lugares reais pesquisados`/`## Eventos…pesquisados`, que são bastidor e ficaram como estão. `node build/build.js` roda ok depois das correções.

## Classe B (só reportada)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| B1 | 05-guilin (O que está acontecendo, Dia 11, BRIEF) + 11-guilin-dia-11; 04-fenghuang (Dia 10) + 10-fenghuang-dia-10 | **Nascer do sol errado.** Cálculo astronômico (NOAA, UTC+8): Guilin 10/11 nasce **~6h52** e se põe ~17h53 (o texto diz 6h20 e 17h30–17h45). Fenghuang 09/11 nasce **~6h58** e se põe ~17h53 (a pesquisa diz 6h35, e a prosa diz "luz entra 6h15, janela 6h15–7h00"). O Dia 11 de Guilin sai do hotel às 6h15 para um nascer às 6h20; na verdade ainda está escuro, e a névoa com luz fica em ~6h50–7h40, o que atropela o café das 7h30. | Replanejar o bloco da manhã com os horários corretos (travel-day-planner → travel-day-writer): Guilin sai ~6h35, Elephant Trunk ~6h45–7h35, café rápido perto do hotel. Fenghuang: janela ~6h40–7h50, mercado a partir de ~7h50. Corrigir "Eventos/sazonalidade pesquisados" das duas cidades. | **alta** |
| B2 | 04-fenghuang Dia 10, 10-fenghuang-dia-10, 05-guilin Quadro prático | Fenghuang → Guilin sem reserva nem modal definido ("van/ônibus privado ~5h, ¥150–200", sem operador nem ponto de embarque). A abertura de Guilin falava em "Guilin Norte", ou seja, trem. Não há fonte no pacote para esse ônibus direto. | Usuário decide: van/ônibus direto (confirmar se existe) ou táxi até Huaihua Sul/Tongren Sul + trem-bala até Guilin/Guilin Norte. Depois alinhar horário de saída, abertura e Dia 10 de Guilin. travel-itinerary-logistics. | **alta** |
| B3 | 05-guilin Dia 11 + BRIEF, 11-guilin-dia-11 | Táxi às 8h30 para embarque fixo às 9h00 no Mopanshan, que os próprios Lugares pesquisados põem a ~27 km, com orientação de "sair 6h30–7h30". O texto promete 20–30 min e ainda fala em check-in de 30 min no pier. Não fecha (o Yangshuo também diz "saída antes das oito"). | Saída do hotel ~7h45–8h00, o que junto com B1 corta ou encurta o café no Lao Dong Jiang (Qixing, 15–20 min a pé). Considerar o café a caminho. Replanejar junto com B1. | **alta** |
| B4 | 7 atrações (hongqiao-fenghuang, muralha-fenghuang, rio-tuojiang-diaojiaolou, shen-congwen, wanming-pagoda, rio-li-cruzeiro, longsheng) | Stubs (11–39 palavras, "Conteúdo em desenvolvimento"). **Longsheng** não é visitado (1 noite em Guilin, sem bate-volta), então sugiro remover. O stub do Rio Li diz 83 km, e a página diz ~60 km (Mopanshan → Yangshuo). | Pipeline normal (travel-content-planner → … → travel-page-assembler) para as 6 visitadas, com prioridade para rio-li-cruzeiro e shen-congwen. Remover longsheng. | alta |
| B5 | 05-guilin Dia 10 (summary + BRIEF) | O jantar "na Zhengyang St., 5 min a pé do pier" é no Renli Mi Fen, que fica no **Qixing** (施家园/东江花园, do outro lado do Li). A Logística diz "100% a pé, sem táxi no Dia 10". | Trocar por uma casa de 米粉 na própria Zhengyang/Xiufeng (precisa de travel-place-finder) ou assumir táxi curto até o Renli. | média |
| B6 | 05-guilin Dia 11, 11-guilin-dia-11 | "Da margem oposta" do Elephant Trunk Hill com acesso pela Binjiang Road, mas a Binjiang Road (portão 3 do parque) fica na **mesma** margem do morro. O ângulo clássico da margem oposta é pelo lado leste (ilha/parque Zizhou), mais longe que 8–10 min. | Confirmar o ponto e ajustar o tempo de deslocamento. | média |
| B7 | 11-guilin-dia-11 (chegada) vs 12-yangshuo-dia-11 | Longtoushan Pier → centro: Guilin diz "três minutos a pé", Yangshuo diz táxi/mototáxi de 10–15 min. | Verificar e alinhar (Fase 2). | média |
| B8 | 05-guilin (Rio Li), 11-guilin-dia-11 | A vista da nota de 20 yuans costuma ser atribuída a **Xingping**, não ao Yellow Cloth Shoal. A ordem Nine Horse (km 46) → Yellow Cloth (km 60) também é duvidosa (em geral o Yellow Cloth vem antes). | Checar com fonte e corrigir nas duas páginas. | média |
| B9 | 04-fenghuang (Dia 9 Logística), 10-fenghuang-dia-10 | "Bilhete combinado do casco histórico ~¥148" que cobriria a 故居. Até onde sei, a cobrança obrigatória de entrada no casco antigo foi abolida em 2016 e os pontos passaram a ser pagos um a um. Não há fonte no arquivo. | Verificar o regime atual de ingressos e ajustar os custos. | média |
| B10 | 04-fenghuang, 05-guilin | As duas cidades estão abaixo do piso (4.139 e 4.013 palavras de prosa, piso 6.000), o que se defende pelo tempo útil de ~20h cada. Mas faltam módulos: nenhuma tem "O que só quem mora aqui sabe" (≥3 lugares), e Fenghuang não tem Quadro prático nem Encerramento. Fenghuang Dia 9 e Guilin Dia 10 não têm arquivo de hora a hora (ver numeração acima). | Acrescentar os módulos em falta (travel-page-assembler, um módulo por invocação) e decidir se os dias de chegada ganham arquivo próprio. | média |
| B11 | 04-fenghuang (O que está acontecendo) | "ponte das Cem Flores" não aparece em nenhuma fonte nem em outra parte do pacote. A autoria das diaojiaolou oscila entre "Tujia" (Retrato) e "Miao" (Abertura, Dia 9). | Confirmar ou remover a ponte. Padronizar para "Miao e Tujia". | baixa |
| B12 | 05-guilin Abertura | Diz que a janela de luz "já se fechou" às ~16h, mas o Dia 10 planeja luz dourada às 17h30. | Ajustar uma frase da abertura. | baixa |

## Notas de estilo (não são erro)

1. A comparação com o **rajio taisō de Tóquio** aparece 4 vezes no pacote (Fenghuang Gastronomia, Fenghuang Dia 10, arquivo do Dia 10, Guilin 米粉 com Coppelia/Havana). Vale manter uma só.
2. "O mesmo espelho / reflexo → parede de pedra" fecha Guilin três vezes (Dia 11 summary, arquivo do Dia 11, Para encerrar), quase com as mesmas palavras.
3. Nomes em inglês para lugares chineses (Huilong Pavilion, North Gate Wharf, Jumping Rocks, Elephant Trunk Hill, Yellow Cloth Shoal, Nine Horse Fresco Hill) convivem com versões em português no mesmo texto ("Portão Norte", "Pavilhão Huilong"). Convém escolher uma convenção para o guia todo (Fase 2): pinyin/português + caracteres na 1ª menção.
4. A física da condensação na lente está trocada entre as páginas: Fenghuang manda deixar a câmera fora na véspera, Guilin manda deixar a lente no quarto. Na prática, embaça quem vai do frio para o quente, não o contrário. Vale uma frase coerente ou nenhuma.
5. O arquivo do Dia 10 promete "ver o Huilong Pavilion de cima" numa curva da estrada 20–30 min depois da saída. É um detalhe sem fonte, e é bonito demais para não ser verdade. Confirmar ou suavizar.
