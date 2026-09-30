# Revisão final: pacote xiamen (Fase 1)

**Veredito: PRONTO COM RESSALVAS.** A voz está boa e os BRIEF-DIA batem com os dias. Duas coisas impedem o PRONTO: (1) a logística da balsa para Gulangyu é contraditória e provavelmente está errada nos fatos; (2) 16/11 (dia de chegada) não tem conteúdo nenhum. As 5 atrações continuam stubs.

Arquivos: `pesquisa/cidades/08-xiamen.expandido.md`, `pesquisa/dias/18-xiamen-dia-17.md` … `21-xiamen-dia-20.md`, `pesquisa/atracoes/{gulangyu,nanputuo,universidade-xiamen,zengcuoan,zhongshan-road-xiamen}.md`. Build depois das correções: ok (89 páginas).

## Achados da fase 0: o que conferi

- Metalinguagem e tags vazadas (dia-19 :39/:45/:113/:173; dia-17 :41/:163/:166; dia-19 :133; dia-20 :15/:41): **confirmados e corrigidos**.
- `pendência` em city :89, dia-18 :123, dia-19 :25, dia-20 :21: **falsos positivos**. O regex `\bTODO\b` com `/i` casa com a palavra portuguesa "todo". Sugestão para o script: tirar o `/i` de `TODO`.
- `destino-removido` city :495 ("não tem a antiguidade de Xi'an"): é só comparação, **fica como está**.
- `[VERIFICAR` / `CONFIRMADO` dentro de `<!--BRIEF-DIA-->` e em `## Lugares reais pesquisados`: é bastidor, **não mexi**.
- Front matter sem `days` nos 4 arquivos de dia: **corrigido** (`days: [N]` = `global_day`).
- Numeração de dias que quebra (Dia 16 = 15/11 → Dia 17 = 17/11): problema entre guias já conhecido. **Não mexi** (ver Classe B-2).

## Correções Classe A aplicadas (67)

| Arquivo | Antes → depois (resumo) | Categoria |
|---|---|---|
| city :13 | "o cais de Neicuoao" (Neicuo Ao fica NA ilha) → "o cais de Heping Matou (和平码头)" | coerência interna |
| city :13 | "Malaysia" → "Malásia" | jargão |
| city :39 | "Em 1903, com o fim da Segunda Guerra do Ópio" (a guerra terminou em 1860) → "décadas depois de as Guerras do Ópio e os tratados que as encerraram abrirem Amoy…" | erro factual óbvio |
| city :49 | "condensed milk na ementa" → "leite condensado no cardápio" | pt-PT + inglês |
| city :89 | "serve — se ainda aberto — café … — com" → vírgulas | estilo |
| city :116/:138/:146/:407; dia-19 :17/:41/:129 | "oyster vermicelli (海蛎煎)" → "omelete de ostra (海蛎煎, *hai li jian*)". 海蛎煎 é omelete, não vermicelli, e o próprio restaurante se chama Oyster Omelette | terminologia (7) |
| city :122/:139 | "you tiao (fried dough)", "fried dough" → "bastão de massa frita" / *you tiao* | jargão (2) |
| city :200/:210/:294/:366; dia-17 :73/:167; dia-18 :87/:89 | "golden hour" → "hora dourada"/"luz dourada" (os BRIEF-DIA em comentário não foram alterados) | jargão (8) |
| city :298; dia-18 :105 | "Dois ou três bancos de ostras" → "Duas ou três porções" | erro de português (2) |
| city :302 | "sculpta" → "esculpe" | erro de português |
| city :306 | "Baroque italiano" → "barroco italiano"; "fotografia de uma postal" → "foto de cartão-postal" | jargão/português |
| city :456 | "loja centenária de pasta de amendoim" (fundada em 1945) → "casa de sopa de amendoim aberta em 1945" | número interno (Lugares resolve) |
| city :458; dia-20 :53 | listas de cidades anteriores sem Yangshuo/Shenzhen → lista completa segundo o config | coerência (2) |
| dia-17 :41 | "O status de funcionamento é PROVÁVEL (…)" → "Não há relato recente confirmando que continua aberto" | tag vazada |
| dia-17 :99 | "ambos confirmados" → removido | bastidor |
| dia-17 :158–167 | "Flags para este dia" → "Antes de sair"; "Sem flag ativo" removido; "status PROVÁVEL" e "CONFIRMADO" trocados por aviso natural | metalinguagem/tag (4) |
| dia-18 :37 | "pianos e soalhos foram demolidos" → "os interiores foram refeitos" | pt-PT/sentido |
| dia-18 :57 | "tan Kah Kee" → "Tan Kah Kee" | grafia |
| dia-18 :71/:73 | "apuntando" → "apontando"; "decompressar" → "descomprimir" | português (2) |
| dia-18 :93 | "o clichê invertido que a seção de fotografia da cidade descreve" (além de citar outra seção, invertia o sentido da city page) → "o inverso do enquadramento do Dia 17" | metalinguagem + coerência |
| dia-18 :93 | "dura quarenta minutos" (o parágrafo anterior fala em 50) → "menos de uma hora" | número interno |
| dia-18 :101 | "madrugada (… 21h30+)" → "fim de noite" | coerência |
| dia-18 :103 | "põe o cotovelo" → "ponha" | concordância |
| dia-18 :175–176 | "Flag de verificação" → "Antes de ir" (2) | metalinguagem |
| dia-19 :25 | "o salt-iodo" → "o sal e o iodo" | jargão |
| dia-19 :39/:45/:113 | "a pesquisa descreve/confirma" → "quem já esteve lá descreve" / fato direto / "Os regulares chegam antes das 21h" | metalinguagem (3) |
| dia-19 :55 | "ainda tem três dias no Japão" (o trecho Japão tem 8+ dias) → "mais de uma semana"; "dois a três dias" → "uma semana" | fato interno (config) |
| dia-19 :75/:79 | "dezoito dias de viagem" → "quase três semanas" (2) | fato interno |
| dia-19 :89 | "A Ilha de Xiamen … Não tem carros, mas não é ilha" → "Tem carros e, embora também seja ilha, tem pontes" | erro de sentido |
| dia-19 :89 | "o fact de que" → "o fato de que" | inglês |
| dia-19 :99/:105 | "que a seção de gastronomia/segredos locais descreveu" → frase direta (2) | metalinguagem |
| dia-19 :133 | "CONFIRMADO." removido | tag vazada |
| dia-19 :173 | bloco "Flags para revisão" (citava "a pesquisa" e "flag do BRIEF-DIA") → "Antes de sair", reescrito para o leitor | metalinguagem |
| dia-20 :15 | "⚠️ FLAG CRÍTICA — HORÁRIO DO VOO NÃO CONFIRMADO" → "Antes de usar este dia — confira o horário do voo" (+ "este arquivo" → "este dia") | metalinguagem (2) |
| dia-20 :31 | "Junto, você tiao" → "Junto, *you tiao*" | erro de digitação |
| dia-20 :41 | nota "é PROVÁVEL" → "não tem confirmação recente de funcionamento" | tag vazada |
| dia-20 :51 | "com os amendoeiras plantadas" (detalhe sem fonte + erro de gênero) → "com o mar servindo de muro" (fato da própria página) | português/fidelidade |
| dia-20 :121 | "Lembrete de flag" → "Lembrete" | metalinguagem |
| 4 arquivos de dia | front matter: adicionado `days: [N]` | front matter (4) |

Contagem por categoria: metalinguagem/bastidor 16 · tag vazada 5 · jargão inglês/pt-PT/erro de português 25 · terminologia 7 · coerência/número interno 10 · front matter 4.

## Classe B (só reporto, com a correção que proponho)

1. **Balsa para Gulangyu: fatos duvidosos e contradições internas** — city Gulangyu :61, Logística :95–96, Como se locomover :236, Quadro prático :259–266, dia-17 inteiro. Severidade **alta**. (a) A city page diz ao mesmo tempo "sem taxa turística separada" (:95, :236) e "ingresso da área cênica comprado à parte" (:261, :266). (b) O Quadro chama o terminal turístico de "Lujiang", mas o cais de 鹭江道/轮渡 é justamente o que, até onde sei, **está reservado a moradores com cartão desde 2014**. Visitantes usam o 东渡邮轮中心 (Xiamen International Cruise Center) → Sanqiutian/Neicuo'ao, a ~RMB 35 ida e volta. (c) Todo o conceito de "turista pega a balsa dos residentes a RMB 8" pode não funcionar para quem tem passaporte estrangeiro. Proposta: rodar o `travel-place-finder` só sobre "rotas e regras de balsa para Gulangyu em 2026 (quais cais aceitam não residentes, preço, primeiro horário)". Depois reescrever a Logística compacta, o Quadro prático, o bloco 07h00 do dia-17 e o BRIEF-DIA 17. Se a balsa das 7h para visitantes não existir, vale conferir o primeiro horário do Cruise Center → Neicuo'ao, que preserva o ângulo "entrar pelo norte antes da multidão".
2. **16/11 (segunda, chegada) não tem dono** — city page e dias. Severidade **alta**. O leitor vê Shenzhen "Dia 16" = 15/11 e Xiamen "Dia 17" = 17/11. O Shenzhen Dia 16 anuncia um trem na manhã de segunda, e o próprio perfil fala em "4 dias inteiros". Hoje a city page trata a chegada só como uma linha ("trem ~3h30", :242/:270). Não há day summary, nem estação, nem horário, e a tarde e a noite de 16/11 somem. O Encerramento (:495, "Você chegou pelo cais, numa manhã de novembro") e o Dia 20 (:454, "como sumiu quando você chegou") dão a entender uma chegada por mar. Proposta: criar um `## Dia N — chegada` para 16/11 (tarde/noite: check-in no Ferry Terminal Branch, primeira volta pela Zhongshan Road/orla, satay noodle). Isso depende da numeração canônica da fase 2. Ajustar também as duas frases do "chegou pelo cais".
3. **Tempo de trem Shenzhen→Xiamen diverge** — city :242 ("~3h30"), :270 ("~3h30-4h") × Shenzhen dia-16 :63 ("2h30–3h"). Severidade **média**. Unificar quando o bilhete estiver definido. A estação (Xiamen North × Xiamen/Gaoqi) está em aberto nos dois arquivos.
4. **Voo XMN→FUK de 20/11 não está em `voos.md`** — dia-20 :15/:121, city :244/:272/:460. Severidade **média**. O pacote supõe DiDi às 12h e decolagem ≥14h. O Fukuoka Dia 21 (fora do pacote) supõe chegada às 15h–17h e diz que o voo "dura pouco mais de uma hora". XMN–FUK leva uns 2h de voo, com +1h de fuso. Os dois lados estão compatíveis entre si, mas não têm âncora. Proposta: registrar o voo real em `voos.md` e remover os avisos condicionais. Para a fase 2: Fukuoka :27 descreve Gaoqi com "filas de cem metros", e o dia-20 :69 diz "aeroporto de tamanho médio … confortável".
5. **Linguiça minnanesa como lembrança para levar ao Japão** — dia-19 :53–55. Severidade **média**. O Japão proíbe a entrada de produtos de carne vindos da China (o próprio Fukuoka Dia 21 alerta para declarar produtos de origem animal). Proposta: trocar "Linguiça que precisa de geladeira: talvez não" por "linguiça e qualquer produto de carne: não, o Japão não deixa entrar". Deixei como B porque o fato não tem fonte no arquivo.
6. **Dados de metrô/rota duvidosos** — city :238/:250 ("Linha 1 liga Ferry Terminal, Zhongshan Road e Universidade de Xiamen"; "inaugurada entre 2018 e 2021"); dia-19 :155 (Shapowei → hotel de "Metrô L1"); dia-20 :71 (a rota para Gaoqi "de oeste para leste", com vista para a universidade e "a ponte que cruza para Gaoqi"). Severidade **média**. A Linha 1 sai de Zhenhai Rd rumo ao norte e não passa na universidade. Gaoqi fica ao norte, na própria ilha. Proposta: revisar com mapa real e trocar por DiDi/BRT/ônibus onde for o caso.
7. **"Novecentas mil tigelas estimadas"** do Sha Cha Lin — dia-19 :63. Severidade **baixa**. É um número sem fonte em Lugares reais pesquisados. Sugiro apagar a oração.
8. **Área de Gulangyu inconsistente** — 1,87 km² (city :63), "pouco mais de 1,8" (:81), 1,91 km² (city :310; dia-17 :69). Idem para a largura do estreito: 500 m, 600 m, "menos de 1 km". Severidade **baixa**. Unificar pelo valor oficial da UNESCO (~1,88 km²) depois de conferir.
9. **Stubs: as 5 atrações** (gulangyu, nanputuo, universidade-xiamen, zengcuoan, zhongshan-road-xiamen), com 36–48 palavras cada. Severidade **média**. Todas são visitadas no roteiro, então devem ir para o pipeline normal (`travel-content-planner` → … → `travel-page-assembler`). O `days: [17, 18, 19, 20]` delas é genérico: gulangyu = 17; nanputuo/universidade/zengcuoan = 18; zhongshan = 18, 19, 20. O stub do nanputuo diz "século IV" (o templo é da dinastia Tang). O do gulangyu diz "mais pianos per capita que qualquer lugar do mundo", enquanto a city diz "da China". Corrigir ao escrever.
10. **Numeração global_day** (problema conhecido, não corrigido). Para o leitor, Dia 17–20 = ter 17/11 a sex 20/11. Os dias da semana estão certos em todo o pacote (Shuzhuang fecha às segundas; o dia 17/11 é terça, está coerente). Sobram dois problemas: o salto de 15/11 para 17/11 e o Dia 20 (Xiamen) e o Dia 21 (Fukuoka) caindo os dois em 20/11. O dia-20 fecha coerente com a partida (DiDi às 12h → XMN). Numeração canônica: fica com a fase 2.

## Notas de estilo e qualidade (não são erro)

- **Repetição literal** entre city page e dias: o parágrafo do Fat Fat Beer Horse ("pergunte o que está na torneira, ignore as garrafinhas importadas no fundo da geladeira", "as pessoas que têm trabalho amanhã mas foram mesmo assim…") aparece quase igual na city :164, no dia-17 :109–111, no dia-18 :115–117 e no dia-19 :115. O "frio diminuiu a mortalidade dos moluscos…" se repete na city :298 e no dia-18 :105. E o bar é o destino das 3 noites. Sugestão: manter uma versão em profundidade (city) e variar o ângulo nos dias.
- **Tique retórico** "isso não é X, é Y" / "não é dado decorativo, é timing operacional" em excesso (dia-17 :73, dia-18 :89, dia-19 :67/:79, city :176). Cortar metade.
- **Dia 18 :63** "vitrais de janela em granito cor de areia" não faz sentido. Rever a frase.
- **"Timing"**, "seaview boardwalk", "noodles" e "brewpub" aparecem soltos; se o guia todo aceitar esses termos, tudo bem, mas vale uniformizar na fase 2.
- **City "Como se locomover" :240**: a ciclovia 环岛路 não começa no Ferry Terminal; ela sai da região da universidade/Baicheng. Ajustar junto com o item B-6.
