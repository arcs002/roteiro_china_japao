# Revisão final — pacote zhangjiajie-furong

**Veredito: PRONTO COM RESSALVAS** (city pages e dias revisados; as 6 atrações do pacote são stubs e o dia 7 tem um problema de horário/geografia do Bailong a decidir)

Arquivos: `cidades/02-zhangjiajie.md`, `cidades/03-furong-town.md`, `dias/05..09-*.md`, `atracoes/{tianmen-mountain,yuanjiajie-avatar,tianzi-mountain,golden-whip-stream,glass-bridge,furong-cachoeira}.md`. Assignments usados só como referência. `node build/build.js` roda sem erro depois das correções.

## Correções Classe A aplicadas (60)

| Arquivo:linha (aprox.) | Antes → depois |
|---|---|
| **Tags vazadas (27)** | |
| cidades/02-zhangjiajie.md:73 | Hu Shifu `[CONFIRMADO]`, Fuzhengyi `[CONFIRMADO]` → removidas; Aunt Qin's `[PROVÁVEL]` → "(vale confirmar antes de ir se segue aberta)" |
| 02-zhangjiajie.md:75,77 | Tang Shifu, Dadui, Hourong, South Gate `[CONFIRMADO]` → removidas |
| 02-zhangjiajie.md:83 | Dayong Bar Street `[CONFIRMADO como área]` → removida; Jiude `[PROVÁVEL]` → "(confira antes se segue aberto)"; DOU SAI `[PROVÁVEL]` → "(também vale confirmar o funcionamento)" |
| 02-zhangjiajie.md:87,89 | Xibu `[CONFIRMADO]` → removida; Charming Xiangxi `[CONFIRMADO operando em 2026]` → "em cartaz em 2026" |
| 02-zhangjiajie.md:103,109,111,113,115 | Baofeng (2x), Yangjiajie, Tianzishan `[CONFIRMADO …]` → removidas; mercado Nanzhuangping `[NÃO CONFIRMADO]` → removida (texto já manda checar no Baidu Maps) |
| dias/06-zhangjiajie-dia-6.md:57,59,105,107,127,129,133 | 8 tags `[CONFIRMADO]` + "Alternativa confirmada:" → removidas / "Alternativa:" |
| dias/07-zhangjiajie-dia-7.md:139,141,159 | `[CONFIRMADO]`, "restaurante confirmado", "alternativa confirmada", "(provável, não confirmado independentemente)" → forma natural / "(confira antes se segue aberto)" |
| dias/05-zhangjiajie-dia-5.md:61,69,94,96 | "Confirmado por relatos…", "alternativas/opções confirmadas", "são prováveis" → linguagem natural |
| **Metalinguagem / jargão (14)** | |
| 02-zhangjiajie.md:95,131 | "golden window" → "janela de névoa" / "no melhor horário da manhã" |
| 02-zhangjiajie.md:115 | "no perfil de quem valoriza" → "para quem valoriza" |
| dias/05:51 | "textura certa para este viajante" → "o que vale a caminhada" |
| dias/05:86,130 | "golden window matinal" → "janela da manhã" / "primeiro horário da manhã" |
| dias/05:134 | bloco `[FLAG — horário do trem]` com "fixar no calendário do Dia 5" → nota ao leitor "Atenção ao horário do trem" |
| dias/06:158-162 | 3 blocos "Flag operacional [ALTA]/[MÉDIA]/[BAIXA]" → "Antes de ir — horário de Tianmen" / "Se Tianmen atrasar" / "Bilhete do parque" |
| dias/09:52 | "mencionado no brief é condicional" → "não é garantido" |
| dias/09:26,32,36,52 | "golden hour" (4x, incl. título de bloco) → "hora dourada" |
| cidades/03-furong-town.md:63 | cabeçalho "Fotografia e golden windows" → "Fotografia e melhores horários" (slug de seção muda; nenhum link interno apontava para ele) |
| 03-furong-town.md:150,188 | "(golden hour)" → "(hora dourada)"; "golden hour final" → "última volta pela Rua de Pedra" |
| **Datas / dia da semana (5)** | |
| 02-zhangjiajie.md:81 | "roteiro começa na quinta-feira à noite" → "quarta-feira" (04/11 = qua) |
| 02-zhangjiajie.md:61 | parágrafo tratava 07/11 (sábado) como dia de parque → reescrito para 06/11 (sexta, último dia inteiro), coerente com Dia 7 |
| 03-furong-town.md:21 | "madrugada de domingo … Lìdōng, sete de novembro" (domingo = 08/11) → "primeira madrugada depois do Lìdōng" |
| dias/08:172 | "no dia 8 (domingo, 08/11) … saída entre 8h–9h, chegar até o meio-dia" → "Dia 9 … às 10h30 … início da tarde" (alinha ao BRIEF-DIA do Dia 9) |
| dias/09:122,126 | "chegada a Fenghuang (Dia 10)" → "(tarde do Dia 9)"; lógica "numa segunda-feira … tarde de chegada" (chegada é domingo) → domingo à tarde + segunda de manhã |
| **Número/fato interno resolvido por fonte do pacote (3)** | |
| dias/06:89 | "Não é o pico do outono, que já passou em outubro" → pico no início de novembro (Eventos pesquisados da city page: "janela cai no núcleo do pico") |
| dias/09:34 | "volume da cachoeira é maior do que no verão" → "menor do que no auge do verão" (city page + Eventos 3c) |
| dias/09:48,50 | mi doufu descrito como "tofu branco fresco … quase líquido" → "tofu de arroz" de farinha de arroz, textura sedosa (Gastronomia da city + Lugares reais) |
| **Português / erro de digitação (11)** | |
| 02-zhangjiajie.md:31 | "Hunan occidental" → "Hunan ocidental" |
| 02-zhangjiajie.md:109 | "quarenta japoneses de guarda-chuva laranja" → "quarenta turistas…" (estereótipo) |
| 02-zhangjiajie.md:111 | "Os dois primeiros horas" → "As duas primeiras horas" |
| dias/05:63,67 | "chepar" → "chegar"; baijiu "no leste" → "em Chongqing" (Chongqing fica a oeste) |
| dias/07:17,55,61,65,109,119,153 | "deste sexta-feira", "nos topo", "quize", "Journey to the West" → *Jornada ao Oeste*, "saí", "different", "cualquer" |
| dias/08:64,172 | "autentico" → "autêntico"; "duas balsas" → "duas baldeações" |

Falsos positivos da fase 0 confirmados e não tocados: "pendência" (regex pegou "todo"/"confirmar" em prosa), "Terracota" (cor, em dias/06:17), "Hong Kong" (decoração "inspirada em Hong Kong" de um bar), "a pesquisa" em dias/07:59 (pesquisa visual de Cameron), "Golden Week" (nome próprio), flags dentro de `<!--BRIEF-DIA-->` (comentário, não renderiza).

## Classe B (reportar)

| # | Arquivo | Problema | Correção proposta | Sev. |
|---|---|---|---|---|
| 1 | 02-zhangjiajie.md Dia 7 + BRIEF-DIA; dias/07 | Bailong "abre às 6h30" e saída a pé do hotel às 6h15, mas os Lugares reais da própria página dizem **parque 07h00–18h00**, e "Segredos locais" diz abertura às 7h. Além disso, o Bailong fica **dentro** do parque, a ~20-30 min de ônibus interno a partir do portão de Wulingyuan — "15 min a pé do hotel até o Bailong / entrada nordeste" não é plausível. | Replanejar o Dia 7: portão às 7h00, ônibus interno até o Bailong, plateau ~7h45. Rodar `travel-day-planner`/`travel-day-validator` no Dia 7 e ajustar a city page + o arquivo do dia juntos. | alta |
| 2 | todo o pacote | Hotel reservado **No. 106 Guihua Road Inn (Wulingyuan)** nunca é citado; os textos falam em "hotel Wulingyuan district" e supõem que ele fica perto da "entrada nordeste". O hotel de Yongding (04/11) também não é nomeado (não consta no config). | Citar o Guihua Road Inn como ponto de partida/retorno dos Dias 6-7 e recalcular os trajetos até o portão de Wulingyuan (Guihua Road fica na cidade de Wulingyuan, perto do portão principal/Charming Xiangxi — 20 Guihua Rd). Nomear o hotel de Yongding se houver reserva. | alta |
| 3 | 02-zhangjiajie.md Retrato geral:31 | Erros de geografia: diz que a prefeitura autônoma de Xiangxi "inclui Zhangjiajie" (Zhangjiajie é cidade-prefeitura à parte; Xiangxi inclui Fenghuang e Yongshun/Furong) e põe os Tujia no "sudoeste de Hunan" (é o noroeste). O "37%" fica ambíguo. | Corrigir: "Xiangxi, a prefeitura autônoma vizinha que inclui Fenghuang e Furong Town"; "noroeste de Hunan". Checar a fonte do percentual. | alta |
| 4 | 02-zhangjiajie.md Dia 5/Dia 6; dias/05, dias/06 | Distância do hotel de Yongding até o teleférico de Tianmen: o BRIEF do Dia 6 fala em "~500 m, a pé"; a última linha do Dia 5 na city page, o FLAG do BRIEF do Dia 5 e o dias/05 falam em táxi de 15 min (¥15-20), saída às 7h00. | Decidir quando o hotel de Yongding estiver definido (perto da estação base do teleférico, que fica ao lado da estação de trem, ou perto da Jiefang Lu) e alinhar os dois dias. | média |
| 5 | 02-zhangjiajie.md Como se locomover / Dia 6 Logística / O essencial; dias/06, dias/07 | Validade do bilhete de Wulingyuan: "3 dias" (Como se locomover, O essencial, dias/07) × "válido 4 dias" (Logística do Dia 6, dias/06). Nenhuma fonte no arquivo resolve. Dias/07 diz ainda que o Dia 7 é "o terceiro e último dia de cobertura", mas é o 2º dia de uso. | Checar a regra atual (bilhete de 4 dias é o padrão divulgado hoje) e unificar; corrigir a contagem de dias em dias/07. | média |
| 6 | dias/09:80,111; 03-furong-town.md Dia 9, Quadro prático | Custo Furong→Fenghuang: "táxi direto 60–90 CNY" (dias/09) × táxi direto 150–200 (dias/08) × táxi Wulingyuan→Furong ¥250–350 para distância parecida (dias/07). 60–90 é preço de ônibus. | Separar: ônibus/compartilhado via Jishou ~60–90; táxi direto ~150–200 (confirmar com o hotel). | média |
| 7 | transição ZJJ→Furong | Horário da saída: dias/07 diz checkout às 8h; O essencial diz "antes das 9h" e 2h30-3h de viagem; Furong Dia 8 chega às 13h ("quase três horas"). Chegar às 13h com saída às 8h pede 5h. Custo do trecho: dias/08 fala em ~80–120 (compartilhado/ônibus), dias/07 fala em táxi ¥250–350. | Fixar saída ~9h30-10h → chegada ~13h, ou manter 8h e antecipar a chegada para ~11h. Unificar o custo por modal. | média |
| 8 | dias/08:130 | "O Rio Youshui … desemboca no Shen Nong Xi" — o Shennong Xi é afluente do Yangtzé em Hubei; o Youshui deságua no Yuan (沅江), que chega ao Dongting. | Trocar para "desemboca no Rio Yuan e, por ele, no lago Dongting". | média |
| 9 | 03-furong-town.md Gastronomia:49 | Diz que o filme *Furong Town* (1986) foi "proibido internamente por alguns anos"; o próprio Retrato geral diz que dezenas de milhões de pessoas o assistiram. Sem fonte no arquivo. | Remover "proibido internamente" ou achar uma fonte. | média |
| 10 | 6 atrações do pacote | Stubs (22-40 palavras, "Placeholder"): tianmen-mountain, yuanjiajie-avatar, tianzi-mountain, golden-whip-stream, glass-bridge, furong-cachoeira. **glass-bridge** (Grand Canyon, cortada no assignment) e **golden-whip-stream** (não aparece em nenhum dia) não são visitadas. | Remover glass-bridge e golden-whip-stream (ou tirar o `days:` delas). Os outros 4 vão para o pipeline normal (planner → … → page-assembler). A `days:` do tianmen-mountain está [5], mas a visita é no Dia 6. | média |
| 11 | dias/08:30 × 03-furong Dia 8 × dias/09:34 | Altura e rocha da cachoeira: "sessenta metros … arenito avermelhado" (city) × "uns cinquenta metros de parede de calcário" (dias/08) × "60 metros" (dias/09). O Baofeng Lake na city também aparece com "paredes de calcário" (é quartzito-arenito). | Unificar com fonte (Pipa Xi costuma ser citada com ~60 m). | baixa |
| 12 | dias/08:128 | "Fenghuang … dois mil anos de história civil onde Furong Town tem quarenta anos de cinema" contradiz o Retrato geral (Wangcun tem dois mil anos de porto). | Reformular o contraste, sem negar a história de Wangcun. | baixa |
| 13 | 03-furong-town.md Quadro prático; 02-zhangjiajie O essencial | "Ative a VPN antes de cruzar para a China" num ponto em que o viajante já está na China há uma semana. | Mover a dica para Chongqing ou para o Aprofundamento, e deixar aqui só uma referência. | baixa |
| 14 | 03-furong-town.md | 5.665 palavras de prosa (piso 6.000). Para uma parada de ~20 h, está proporcional ao tempo útil. | Aceitar, ou somar ~350 palavras num módulo curto (ex.: Quadro prático). | baixa |
| 15 | dias/06:91 | "plateau a 400 metros acima" × Bailong de 330 m em todo o resto. | Unificar. | baixa |

### Datas, numeração de dias e transições (para a fase 2)

- Pelo front matter, as datas do pacote batem com o calendário real: Dia 5 = qua 04/11, Dia 6 = qui 05/11, Dia 7 = sex 06/11, Dia 8 = sáb 07/11, Dia 9 = dom 08/11. Os dias da semana na prosa agora estão todos certos. Para o leitor, o problema aparece só na comparação com Chongqing: o "Dia 4" de lá também é 04/11 (drift já conhecido).
- **Chongqing → Zhangjiajie**: os dois lados concordam na chegada (~17h-18h), mas não na viagem. O lado de Chongqing diz saída ~12h-13h e 5-6h de percurso. O lado de Zhangjiajie diz K-series de ~7h saindo às 10h-11h (ou D8021). O trem continua sem confirmação nas duas pontas.
- **Zhangjiajie → Furong**: ver B7 (saída às 8h × chegada às 13h). O "sábado" bate nos dois lados.
- **Furong → Fenghuang**: saída às 10h30 de domingo (Dia 9) e chegada ~12h30-13h30. Bate com o `## Dia 9` da city page de Fenghuang ("check-in ~13h30–14h00"). O Dia 9 é compartilhado (manhã em Furong, tarde em Fenghuang), e isso agora está explícito no dias/09. Coisas **fora do pacote** que notei: `cidades/04-fenghuang.md` diz "segundo dia depois de Lìdōng … caiu ontem, 7 de novembro" (no domingo 08/11 é o 1º dia depois), e o dias/10 de Fenghuang é 09/11 = segunda.

## Notas de estilo/qualidade (não são erro)

1. As três city/day pages de Zhangjiajie repetem quase com as mesmas palavras o bloco "Cameron/Avatar renomeou a Southern Sky Column em 2010" e a frase "chili seco defumado × pimenta que entorpece de Sichuan" (Retrato, Gastronomia, Dia 5, dias/05, dias/06, dias/07). O ideal seria contar uma vez em profundidade e só referenciar nas outras.
2. `dias/07` "Refeições do dia" repete quase literalmente o bloco das 19h (Tang Shifu, làrou, 竹筒饭). O mesmo vale para os outros arquivos de dia. É um padrão do template, mas pesa na leitura em sequência.
3. As aberturas de Furong ("Você vai ver essa cachoeira três vezes") e do Dia 9 ("a cidade antes de todos") usam o mesmo truque de "mesmo lugar, outro registro" que a abertura de Fenghuang ("dois rostos"). A fase 2 deve olhar isso entre cidades.
4. A city page de Zhangjiajie ainda tem uns clichês leves ("fizeram James Cameron enlouquecer de amor pela paisagem", "vai rearranjar expectativas"). Mantive para preservar a voz, mas valem uma lapidação.
5. As tabelas de Logística alternam "¥" (Zhangjiajie) e "CNY/yuan" (Furong). Vale padronizar em "¥" no livro todo.
