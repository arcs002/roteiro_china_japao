# Revisão transversal do roteiro (Fase 2, modo roteiro)

Data: 30/09/2026. Revisor: `travel-final-reviewer` (modo roteiro). **Só reporta; nenhum arquivo de conteúdo foi editado**, porque os pacotes de cidade estão sendo corrigidos em paralelo.

Fontes lidas: `final-review.config.json`, `voos.md`, tabela "Datas" de `perfil-viajantes.md`, calendário e achados de roteiro/data de `auditoria-mecanica.md`, front matter e todos os `## Dia N` (resumo + `<!--BRIEF-DIA-->`) das 11 city pages vivas, primeiro e último bloco dos 29 arquivos de dia, os 2 aprofundamentos da China, `build/build-registry.js` (como `day/N` é resolvido).

## Veredito: NÃO PRONTO

Quatro bloqueadores:
1. Shenzhen: a chegada em 12/11 é escrita como se o viajante viesse de Hong Kong, mas ele vem de Yangshuo.
2. 16/11 e 28/11 são datas sem dono.
3. A numeração `global_day` muda de regra três vezes, e o build perde dias: `day/N` aceita uma cidade por número, e hoje 3 números estão em duas cidades.
4. `aprofundamento/paises/china/etnias.md` foi escrito para o roteiro antigo (Xi'an, Guizhou, Longsheng).

---

## 1. Calendário: o que está quebrado

A numeração atual segue três regras diferentes ao mesmo tempo:

| Trecho | Regra de fato | Offset data × N |
|---|---|---|
| Dias 1–4 (Chongqing) | 1 número por data | data = N |
| 04/11 (CQ→ZJJ) | dia de transição ganha **número novo** (Dia 4 = manhã em CQ, Dia 5 = noite em ZJJ) | o offset passa a data = N−1 |
| 08/11, 09/11, 10/11 (Furong→Fenghuang→Guilin→Yangshuo) | dia de transição **dividido entre duas city pages com o mesmo número** (Dia 9 em Furong e em Fenghuang; Dia 10 em Fenghuang e em Guilin; Dia 11 em Guilin e em Yangshuo) | data = N−1 |
| 16/11 (Shenzhen→Xiamen) | dia de transição **sumido**: não tem número, arquivo nem seção | pula para data = N |
| 20/11 (Xiamen→Fukuoka) | número novo de novo (Dia 20 Xiamen, Dia 21 Fukuoka) | volta a data = N−1 |
| 28/11 (Beppu→PVG) | sem dono. O `## Dia 28` do Beppu é 27/11, com o título "O último onsen antes do aeroporto" | — |

Efeitos concretos:
- **Build.** `build-registry.js` monta `dayToCity[n]` e `diaPageIndex[n]` com um valor só, e o último escrito vence. Por isso:
  - Dia 11 tem dois arquivos (`11-guilin-dia-11`, `12-yangshuo-dia-11`) e um deles some de `day/11`.
  - Dias 9, 10 e 11 aparecem no `days:` de duas cidades.
  - Os dias 25–28 usam `cidade:` em vez de `city:`, e por isso o calendário da auditoria mostra esses dias sem cidade.
- **Metades sem arquivo.**
  - Fenghuang `## Dia 9` (chegada 08/11, 14h–22h30) não tem arquivo de dia.
  - Guilin `## Dia 10` (chegada 09/11, 17h–21h30) também não.
  - O leitor que abre `day/9` ou `day/10` vê só a manhã.
- **Referências internas já contraditórias.** Em `09-furong-town-dia-9.md` a seção "Nota de logística — chegada a Fenghuang (**Dia 10**)" diz que a chegada é "numa **segunda-feira (09/11)**". A chegada real é domingo, 08/11. O `08-furong-town-dia-8.md` fala em "Dia 8 (domingo, 08/11)", mas o Dia 8 é 07/11.
- **Metadados.** O perfil ainda diz no título "30/10 – 27/11", chegada "domingo 01/11 às 12h45" e trabalho remoto em "Fukuoka 23–26/11" e "21–26/11". Tudo isso é do roteiro antigo.

## 2. Numeração canônica proposta (uma regra, sem exceção)

- **R1. Dia N = N de novembro.** Dia 1 = 01/11 … Dia 28 = 28/11. O offset é fixo e fácil de lembrar, e o prefixo do arquivo passa a ser a própria data (`NN` = `global_day`).
- **R2. 31/10 (chegada ~21h) não recebe número.** Fica como "Noite de chegada": a seção `## Noite de chegada` que já existe em `01-chongqing.md`, sem arquivo de dia e fora de `days:`. São 90 minutos a pé; um arquivo hora a hora não se justifica.
- **R3. Toda data de 01/11 a 28/11 tem exatamente um `global_day`.**
  - Dia de transição não ganha número extra e não é pulado.
  - A parte de cada cidade fica na city page dela, com o mesmo número: `## Dia N — …` na origem (manhã e partida) e `## Dia N — …` no destino (chegada). O `RETORNO` do BRIEF-DIA da origem precisa ser igual ao `PARTIDA` do BRIEF-DIA do destino.
  - Um número pode ter até 2 arquivos, `part: 1` (origem) e `part: 2` (destino), ambos com o prefixo `NN`. O build renderiza os dois em sequência em `day/N`.
  - No card do dia, a cidade é a do `part: 2`, porque é lá que se dorme (bate com check-in/check-out do config). Rótulo sugerido: "Furong → Fenghuang".
- **R4. 28/11 é o Dia 28, dia de trânsito explícito** (Beppu → Hakata → FUK → PVG), com arquivo fino de logística. O embarque de 29/11 às 11h05 entra como último bloco desse arquivo, sem número próprio.
- **Mudança de build necessária** (é pequena):
  - `diaPageIndex[n]` vira lista ordenada por `part`.
  - A cidade do dia passa a vir do front matter do arquivo de dia, não do `days:` da city page (sem "último vence").
  - `validate.js` passa a checar que `global_day` = dia do mês de `date` e que o par (`global_day`, `part`) é único.
- **Por que não "1 arquivo por data" com fusão de prosa:** daria o mesmo resultado para o leitor, mas exigiria reescrever 5 arquivos de dia. Se preferirem um hora a hora contínuo, a alternativa é fundir os pares com `travel-day-writer`; a numeração R1–R4 continua a mesma.

### Tabela de-para

| Arquivo atual | N atual | Data | **N novo** | part | Arquivo novo | Observação |
|---|---|---|---|---|---|---|
| (seção "Noite de chegada", CQ) | — | sáb 31/10 | — | — | — | continua sem número |
| 01-chongqing-dia-1 | 1 | dom 01/11 | **1** | — | = | sem mudança |
| 02-chongqing-dia-2 | 2 | seg 02/11 | **2** | — | = | sem mudança |
| 03-chongqing-dia-3 | 3 | ter 03/11 | **3** | — | = | sem mudança |
| 04-chongqing-dia-4 | 4 | qua 04/11 | **4** | 1 | = | |
| 05-zhangjiajie-dia-5 | 5 | qua 04/11 | **4** | 2 | 04-zhangjiajie-dia-4 | título "Dia 4 — A cidade que vem antes das nuvens" |
| 06-zhangjiajie-dia-6 | 6 | qui 05/11 | **5** | — | 05-zhangjiajie-dia-5 | |
| 07-zhangjiajie-dia-7 | 7 | sex 06/11 | **6** | — | 06-zhangjiajie-dia-6 | |
| 08-furong-town-dia-8 | 8 | sáb 07/11 | **7** | — | 07-furong-town-dia-7 | manhã de saída de Wulingyuan já coberta pelo FLAG do ZJJ |
| 09-furong-town-dia-9 | 9 | dom 08/11 | **8** | 1 | 08-furong-town-dia-8 | |
| (Fenghuang `## Dia 9`, sem arquivo) | 9 | dom 08/11 | **8** | 2 | **NOVO** 08-fenghuang-dia-8 | gerar com `travel-day-writer` a partir do BRIEF existente |
| 10-fenghuang-dia-10 | 10 | seg 09/11 | **9** | 1 | 09-fenghuang-dia-9 | |
| (Guilin `## Dia 10`, sem arquivo) | 10 | seg 09/11 | **9** | 2 | **NOVO** 09-guilin-dia-9 | idem |
| 11-guilin-dia-11 | 11 | ter 10/11 | **10** | 1 | 10-guilin-dia-10 | |
| 12-yangshuo-dia-11 | 11 | ter 10/11 | **10** | 2 | 10-yangshuo-dia-10 | |
| 13-yangshuo-dia-12 | 12 | qua 11/11 | **11** | — | 11-yangshuo-dia-11 | |
| 14-shenzhen-dia-13 | 13 | qui 12/11 | **12** | — | 12-shenzhen-dia-12 | reescrever blocos iniciais (sai Hong Kong, entra Yangshuo→Shenzhen North); `from: yangshuo` |
| 15-shenzhen-dia-14 | 14 | sex 13/11 | **13** | — | 13-shenzhen-dia-13 | |
| 16-shenzhen-dia-15 | 15 | sáb 14/11 | **14** | — | 14-shenzhen-dia-14 | |
| 17-shenzhen-dia-16 | 16 | dom 15/11 | **15** | — | 15-shenzhen-dia-15 | mover "Logística de saída para Xiamen" para o Dia 16 |
| (nenhum) | — | seg 16/11 | **16** | — | **NOVO** 16-xiamen-dia-16 | exige `## Dia 16` na city page de Xiamen (planner + writer) |
| 18-xiamen-dia-17 | 17 | ter 17/11 | **17** | — | = | sem mudança |
| 19-xiamen-dia-18 | 18 | qua 18/11 | **18** | — | = | sem mudança |
| 20-xiamen-dia-19 | 19 | qui 19/11 | **19** | — | = | sem mudança |
| 21-xiamen-dia-20 | 20 | sex 20/11 | **20** | 1 | = | |
| 22-fukuoka-dia-21 | 21 | sex 20/11 | **20** | 2 | 20-fukuoka-dia-20 | |
| 23-fukuoka-dia-22 | 22 | sáb 21/11 | **21** | — | 21-fukuoka-dia-21 | corrigir "23/11 (domingo" (linha 225) |
| 24-kurokawa-dia-23 | 23 | dom 22/11 | **22** | — | 22-kurokawa-dia-22 | manhã de 22/11 em Fukuoka (checkout, sumô opcional) não está planejada |
| 25-beppu-dia-24 | 24 | seg 23/11 | **23** | — | 23-beppu-dia-23 | |
| 26-beppu-dia-25 | 25 | ter 24/11 | **24** | — | 24-beppu-dia-24 | |
| 27-beppu-dia-26 | 26 | qua 25/11 | **25** | — | 25-beppu-dia-25 | |
| 28-beppu-dia-27 | 27 | qui 26/11 | **26** | — | 26-beppu-dia-26 | |
| 29-beppu-dia-28 | 28 | sex 27/11 | **27** | — | 27-beppu-dia-27 | novo título: "Dia 27 — O último onsen" (o aeroporto é amanhã) |
| (nenhum) | — | sáb 28/11 | **28** | — | **NOVO** 28-beppu-dia-28 | retorno Beppu→FUK→PVG + embarque de 29/11 |

Há colisão de nomes: `05-zhangjiajie-dia-5` e `06-zhangjiajie-dia-6` trocam de nome entre si, e o mesmo acontece em toda a sequência. Renomear com 1 script que primeiro move tudo para nomes temporários.

### Onde a mudança se propaga (contagens via Grep, 30/09)

| Local | Quantidade | O que muda |
|---|---|---|
| Nomes de arquivo em `pesquisa/dias/` | 25 renomeações + 5 arquivos novos (08-fenghuang, 09-guilin, 16-xiamen, 28-beppu, e reescrita parcial do 12-shenzhen) | prefixo = `global_day` |
| Front matter dos arquivos de dia | 29 arquivos | `slug`, `global_day`, `days`/`day`, `title` (29 títulos contêm "Dia N"), mais `part`/`from`. Normalizar também: `cidade:` → `city:` (25–29); `date` sempre entre aspas; acrescentar `emoji`/`pais` que faltam em 27–29; escolher um padrão de título (hoje há 4: "Dia N em X — …", "Dia N — …", "X — Dia N", "X — Dia N: …") |
| Cabeçalhos `## Dia N` nas city pages | 31 no total; **23 mudam** (ZJJ 3, Furong 2, Fenghuang 2, Guilin 2, Yangshuo 2, Shenzhen 4, Fukuoka 2, Kurokawa 1, Beppu 5); 8 ficam (CQ 4, Xiamen 4). Novos: Xiamen `## Dia 16`, Beppu `## Dia 28` | |
| `days:` das city pages | 9 de 11 mudam | CQ [1–4] fica; ZJJ [4,5,6]; Furong [7,8]; Fenghuang [8,9]; Guilin [9,10]; Yangshuo [10,11]; Shenzhen [12–15]; Xiamen [16–20]; Fukuoka [20,21]; Kurokawa [22]; Beppu [23–28] |
| `days:` das atrações | 41 com `days` preenchido; **31 mudam** (as 10 de CQ e Xiamen ficam, salvo Xiamen ganhar o 16) | Rederivar os valores de dia único a partir do dia em que a atração aparece de fato: shen-congwen [10]→[9]; hongqiao-fenghuang, rio-tuojiang-diaojiaolou, muralha-fenghuang, wanming-pagoda [9]→[8,9]; rio-li-cruzeiro [11]→[10]; furong-cachoeira [8]→[7,8]; kurokawa-onsen [23]→[22]. `tianmen-mountain` [5] hoje está errado (Tianmen é o Dia 6 atual) e fica certo na nova regra. **Órfãs** (em nenhum dia planejado): `longsheng` [10], `glass-bridge` [6,7], `golden-whip-stream` [6,7]: decidir entre `days: []` e incluir no roteiro |
| "Dia N" em prosa e BRIEF (fora de cabeçalhos e títulos) | **202** ocorrências em 39 arquivos vivos. Maiores: 02-zhangjiajie 20, 06-yangshuo 15, 08-xiamen 12, 11-beppu 12, 05-guilin 10, 20-xiamen-dia-19 10, 07-zhangjiajie-dia-7 9, 09-furong-dia-9 9 | Todas deslocam −1, exceto CQ (1–4) e Xiamen (17–20). Não dá para fazer por sed cego: em ZJJ e Furong "Dia 8"/"Dia 9" às vezes já está errado |
| Outras formas | 5 FLAGS em snake case no BRIEF do Beppu (`_DIA25`, `_DIA26` ×2, `_DIA_28`); faixas "dias 09–10" ×2, "dias 11-12", "dia 24-25", "dias 16-18" (etnias.md, já errado) | |
| Assignments `pesquisa/dias/00-*-assignment.md` | 87 "Dia N" em 6 arquivos | bastidor; atualizar ou marcar como histórico |
| Build/validação | `build-registry.js` (dayToCity/diaPageIndex), `build.js:112-122` (card "Dias a–b"), `validate.js` (nova checagem), `audit.mjs` (esperar offset fixo N = dia do mês) | |
| Config/perfil | `final-review.config.json` sem hotéis de Yangshuo ("Mountain View & Soaking Tub") e Xiamen ("Ferry Terminal Branch"), que constam no perfil; tabela do perfil sem a coluna "Dias N–M" | |

---

## 3. Transições cidade a cidade

| # | Transição (data) | Saída na origem | Chegada no destino | Status |
|---|---|---|---|---|
| T0 | PKX→PEK→CKG (31/10) | PKX 12h35 → PEK 18h15 | CQ "Noite de chegada": aeroporto 20h55 → hotel 21h15 | **Média.** São dois aeroportos diferentes (Daxing → Capital): imigração, retirada de bagagem e ~1h30 de traslado por terra dentro de uma janela de 5h40. O guia chama Pequim de "só um corredor de aeroporto" e não avisa. Confirmar se o CA 750 chega mesmo em PKX |
| T1 | CQ → ZJJ (04/11) | CQ Dia 4: DiDi 11h30 → **Chongqing Norte**, trem ~12–13h, "5–6h", chegada 17–18h, [VERIFICAR] | ZJJ Dia 5: 17h30 na "Estação de Zhangjiajie (Yongding)", "K-series ~7h ou D8021" | **Média.** Origem e destino não batem na estação (Zhangjiajie vs. Zhangjiajie West, se for trem-bala), na duração (5–6h vs. ~7h) nem no tipo de trem. O dia 4 diz que o trem "parte para o interior do **Sichuan**", o que é geograficamente errado: o trajeto vai para leste/sudeste, pelo sudeste de Chongqing e oeste de Hunan. Fixar 1 trem real (12306) e escrevê-lo igual nos dois BRIEFs |
| T2 | Yongding → Wulingyuan (05/11) | ZJJ Dia 6: táxi 13h30, ¥120–150 | check-in 15h | OK. Pendência interna: o bilhete do parque aparece como "válido 4 dias" (Dia 6) e "bilhete 3 dias" (Dia 7); uniformizar |
| T3 | ZJJ → Furong (07/11) | ZJJ Dia 7 FLAGS: checkout 8–9h, ~130 km, 2h30–3h táxi/ônibus | Furong Dia 8: chegada 13h, "~3h de táxi/ônibus" | Coerente. **Oportunidade provável (verificar em 12306):** a linha de alta velocidade Zhangjiajie–Jishou–Huaihua (2021) tem, pelo que se sabe, estações Zhangjiajie West → Furongzhen → Fenghuang Gucheng. Se confirmado, T3 e T4 caem de 2–3h de estrada para 30–60 min de trem |
| T4 | Furong → Fenghuang (08/11) | Furong Dia 9: saída 10h30, "táxi ou ônibus compartilhado, 2–2h30, 60–90 CNY" | Fenghuang Dia 9: check-in 13h30–14h | Horários coerentes, modal e preço não: o hora a hora de Furong dia 8 diz "via Jishou 2h30–3h, 60–90 yuan **ou** táxi direto 150–200"; a tabela do dia 9 diz "táxi direto 60–90 CNY". A mesma nota fala em "duas balsas" (deve ser "baldeações") |
| T5 | Fenghuang → Guilin (09/11) | Fenghuang Dia 10: van ~11h, ~390 km, ~5h, ¥150–200 | Guilin Dia 10: "chegada de ônibus 16h, check-in 17h" | Coerente, mas não verificado. Pode existir alternativa de trem-bala via Huaihua South (verificar). O dia de Fenghuang já remete à "noite no Dia 10 da página de Guilin", e isso quebra quando o número mudar |
| T6 | Guilin → Yangshuo (10/11) | Guilin Dia 11: cruzeiro 9h, chegada 13h30–14h30, Longtoushan Pier | Yangshuo Dia 11: pier 14h–14h30, bagagem no barco | **OK**, a melhor transição do livro |
| T7 | **Yangshuo → Shenzhen (12/11)** | Yangshuo Dia 12: só "check-out normal em 12/11 para Shenzhen". Não há modal, horário nem estação | Shenzhen Dia 13: "**Deixar Hong Kong** pelo lado correto", 13h30 MTR até Lok Ma Chau, Futian Checkpoint; almoço "em trânsito de HK"; custo "HKD já calculado na logística de HK" | **BLOQUEADOR.** Hong Kong saiu do roteiro. A rota provável é trem-bala Yangshuo → **Shenzhen North** (linha Guiyang–Guangzhou, com trens diretos da ordem de 3h–3h30, a confirmar), seguido de metrô L4 ou DiDi até Futian. Também precisam ser reescritos: o bloco de abertura do dia 13, a `Sequência`, o `Ponto de partida` e o BRIEF de `## Dia 13` da city page; o primeiro parágrafo de "Como se locomover" (linha 157), que ensina a entrar vindo de HK; e o Encerramento e o "Ponto de partida" da linha 212. Em Yangshuo falta uma linha de partida (manhã de 12/11, táxi até a estação de Yangshuo) |
| T8 | **Shenzhen → Xiamen (16/11)** | Shenzhen dia 16 (15/11) tem "Logística de saída para Xiamen — segunda 16/11": G-class Shenzhen North → Xiamen North, "2h30–3h" | Xiamen começa em 17/11 às 7h00, com o hotel já em uso | **BLOQUEADOR.** A data não tem dono: não se sabe o que se faz em 16/11 nem a que horas se chega. "2h30–3h" parece otimista (provavelmente 3h20–4h, verificar). O Xiamen Dia 17 fala em "Gulangyu sumindo… como sumiu quando você chegou", insinuando chegada pelo mar, sem que isso esteja planejado |
| T9 | Xiamen → Fukuoka (20/11) | Xiamen Dia 20: DiDi 12h → XMN, voo "14h ou depois", **não confirmado** | Fukuoka Dia 21: "~16h00 desembarque", chegada 15–17h | Os dois lados assumem a mesma hipótese e ela não está confirmada. Com decolagem às 14h CST, a chegada fica em torno de 17h JST (+1h de fuso); o bloco "~16h00" é otimista. Contradição menor: o Xiamen Dia 19 diz "amanhã **cedo** o roteiro aponta para Fukuoka" |
| T10 | Fukuoka → Kurokawa (22/11) | Fukuoka Dia 22: "reservar **ônibus Nishitetsu**", chegar antes das 15h, sumô opcional às 8h | Kurokawa Dia 23: "**Sanko Bus** 12h40 Tenjin", chegada ~15h30 | Operadora divergente entre as páginas (uniformizar depois de confirmar). A manhã de 22/11 (checkout do WELLCABIN, sumô do senshuraku) não está em nenhum dia |
| T11 | **Kurokawa → Beppu (23/11)** | Kurokawa: RETORNO "[VERIFICAR PRIORIDADE ALTA] — transporte não confirmado" | Beppu Dia 24: checkout 10h, "Sanko Bus **ou táxi** + JR", 2–3h, chegada 13h30 | **Alta.** Nada confirmado dos dois lados, e o táxi é apresentado como equivalente, quando 2–3h de táxi no Japão custa dezenas de milhares de ienes. Provável: ônibus de Kyushu que liga Aso/Kurokawa a Yufuin e Beppu (verificar) ou ônibus até Hita + JR. É feriado nacional, com horário reduzido |
| T12 | **Beppu → PVG (28/11)** | Beppu Dia 28 (27/11): FLAG `LOGISTICA_BEPPU_FUKUOKA_AEROPORTO_SABADO_A_CONFIRMAR`; o encerramento diz "amanhã é logística" | — | **BLOQUEADOR** (ver seção 4) |

## 4. Retorno de 28/11 para PVG (proposta para o Dia 28 novo)

- **Sequência sugerida:**
  - Checkout no Super Hotel às 11h, ou mais cedo, porque o trabalho remoto termina às 7h.
  - JR Limited Express Sonic de Beppu a Hakata, ~2h (reservar assento).
  - Metrô de Hakata até o aeroporto de Fukuoka, ~5 min, mais o ônibus gratuito até o terminal internacional, ~15 min.
  - **Voo FUK→PVG à tarde em 28/11**, com pernoite perto de Pudong e check-in em PVG às ~8h de 29/11 para o CA 935 das 11h05.
- **Descartar** voar FUK→PVG na manhã de 29/11: a margem é inviável para um voo intercontinental. O aeroporto de Oita não tem rota para Xangai (verificar); FUK é o ponto de saída natural.
- **Reentrada na China: verificar.** O viajante entra pela 2ª vez em 28/11. Com visto de entrada única, isso é um problema. Pode estar coberto pela isenção de trânsito de 240h (Japão → China → Alemanha, terceiro país) ou por uma isenção de visto para brasileiros em vigor na data. Confirmar antes de fechar o voo FUK→PVG. O `voos.md` já registra que o trecho não está confirmado.
- **Coerência de texto:**
  - O Beppu Dia 28 atual (27/11) diz "viagem de 28 dias que começou em Pequim, atravessou o interior da China, **desceu o Yangtze**". Não há trecho no Yangtze no roteiro, e a viagem tem 29 noites na Ásia (31/10–29/11).
  - Nas contagens de "dias de China" (Kurokawa l.15; Beppu l.23 e l.43), "22 dias" está errado. O certo é ~20 dias (01–20/11) ou 21 noites; o Fukuoka ("vinte dias") está certo.
  - A duração total também oscila: "29 dias" (Xiamen l.411, Shenzhen dia 15) e "28 dias" (Beppu l.444 e l.459).

## 5. Energia e ritmo no livro inteiro

- **Madrugada em cinco dias seguidos entre 06/11 e 10/11**, quatro deles colados a deslocamentos longos:
  - 06/11: 05h30 (Bailong).
  - 07/11: 3h de estrada.
  - 08/11: 05h45 (Furong), mais 2h30 de estrada.
  - 09/11: 05h45 (Fenghuang), mais 5h de van.
  - 10/11: 5h45 (Guilin), mais 4h de cruzeiro.
  - 11/11: 5h30 no "modo madrugada" opcional do Yangshuo.
  - O Guilin Dia 10 foi pensado como passivo, o que ajuda, mas é o trecho de maior risco de exaustão. Sugestão: tornar explícito que o modo madrugada de Yangshuo é "só se dormiu bem" (já está parcialmente) e rever se a van de 5h pode virar trem.
- **A mesma experiência em três cidades seguidas:** "névoa ao amanhecer antes dos turistas" em Furong Dia 9 → Fenghuang Dia 10 → Guilin Dia 11 (08, 09 e 10/11), com estrutura quase idêntica (alarme 5h45, câmera, névoa, rua vazia, mercado matinal). A lógica se sustenta (é a única janela em cada cidade), mas a narrativa precisa diferenciar os três amanheceres ou admitir a repetição.
- **"Mercado matinal como autenticidade local"** aparece em 7 dias: CQ Dia 4, Furong 9, Fenghuang 10, Yangshuo 12, Shenzhen 16, Xiamen 19, Fukuoka 22.
- **Trabalho remoto (perfil × roteiro):**
  - O perfil diz que o turno noturno EST vale para "Fukuoka 23–26/11" / "21–26/11", datas do roteiro antigo.
  - Na prática, só o Beppu aplica o turno (`REMOTE_WORK_23H`, acordar às 13h30–14h nos 5 dias).
  - O Fukuoka Dia 22 começa às 7h30 e vai até jazz depois das 20h30, sem considerar o turno.
  - Kurokawa e a China também ignoram o turno.
  - **Decisão do usuário:** em que noites há trabalho? Se for Fukuoka também, o Dia 21/22 atual é inviável. Atualizar o perfil de qualquer forma.
- **Perfil "templos mínimos":** Dazaifu Tenmangu é o bloco central do Fukuoka Dia 22 (justificado por koyo e Sou Fujimoto); aceitável, mas vale dizer isso no texto. Nan Putuo aparece como "passagem breve", o que está correto.
- **Kurokawa + Beppu = 6 dias seguidos de onsen.** É o tema declarado do trecho, não é erro. O Beppu varia bem as modalidades (jigoku, sunamushi, Myoban, Hyotan).

## 6. Consistência de estilo entre cidades

1. **O esqueleto do day summary varia em 4 pontos:**
   - Ordem do blockquote: Fukuoka e Kurokawa usam `Sequência → Ponto de partida → Logística`; o resto usa `Sequência → Logística → Ponto de partida`.
   - Rótulo: "**Sequência Dia 21:**" em Fukuoka e Kurokawa, "**Sequência:**" no resto.
   - Separador da sequência: `→` (maioria), `|` (Shenzhen), `·` (Beppu), lista multilinha (Kurokawa), "Pier (14h30) → Hotel (15h–16h30)" (Yangshuo).
   - Beppu Dia 27 tem duas "Sequência A/B" (aceitável, é bifurcação).
   - Padrão proposto: o do Chongqing.
2. **BRIEF-DIA** (oculto do leitor, mas é o contrato):
   - O campo de custo aparece como `CUSTO`, `CUSTO ESTIMADO` e `CUSTO ESTIMADO DO DIA`.
   - `FLAGS` vêm como tokens em snake case (Beppu), bullets com [ALTA]/[ATENÇÃO] (ZJJ) ou texto separado por `|` (Yangshuo).
   - Há uma linha `VALIDADO:` só no ZJJ Dia 6.
   - Uniformizar para o parser do day-writer.
3. **Moeda:**
   - China: "yuan" (CQ 66), "¥" (Guilin 60, ZJJ 48, Yangshuo 43, Fenghuang 23), "CNY" (Shenzhen 15, Furong 11, ZJJ 10), "RMB" (Xiamen 23, que mistura RMB, ¥ e CNY na mesma página).
   - Japão: "¥" para iene.
   - O mesmo símbolo para duas moedas no mesmo livro é ambíguo. Proposta: **"yuan" nas páginas da China** (número + "yuan") e **"¥" só para iene**.
4. **Horários:** zero à esquerda "07h30"/"05h45" (CQ, ZJJ, Xiamen, parte dos arquivos de dia) contra "7h30"/"5h45" (Guilin, Shenzhen, Beppu); "6h00" contra "6h"; "~16h00". Proposta: "7h30", "15h", "15h–17h", sem zero à esquerda e sem ":00".
5. **Nomes de módulo equivalentes com títulos diferentes:**
   - Quadro prático / O essencial / Orientação prática.
   - Encerramento / Para encerrar.
   - Segredos locais / O que só quem mora aqui sabe / O que o mapa não mostra / O que West Street esconde.
   - Só as 5 páginas não expandidas têm `## Abertura`; nas expandidas a abertura é a prosa antes do primeiro `##`.
   - "O que está acontecendo" aparece no início em 8 cidades, mas logo antes dos dias em Xiamen, Fukuoka e Beppu.
   - Os títulos editoriais podem variar; a posição dos módulos fixos (acontecendo, quadro prático) deveria ser a mesma.
6. **Esqueleto dos arquivos de dia:** o padrão é `O dia em resumo → Hora a hora (### hh) → Refeições do dia → Logística do dia`. Fora do padrão:
   - `01-chongqing-dia-1`: `## 7h30` sem o wrapper "Hora a hora".
   - `02-chongqing-dia-2`: Manhã/Tarde + "Onde comer hoje" + "Roteiro hora a hora" + "Para amanhã".
   - `05`, `08`, `09` trazem uma "Nota de logística — Dia N+1" que duplica o dia seguinte (e em 08/09 já está errada).
7. **Truques de abertura repetidos:**
   - A fórmula "X chega/aparece antes de qualquer outra coisa" abre Chongqing ("O ar chega antes de qualquer outra coisa") e Fenghuang ("O rio aparece antes de qualquer outra coisa"). Variações próximas: Zhangjiajie ("O chão some antes de você ter tempo…"), Beppu ("A primeira coisa que você nota… é a fumaça saindo do bueiro"). O Beppu dia 24 repete a mesma imagem ("A primeira coisa que se percebe… é o vapor").
   - Das 11 aberturas, 6 começam pelo veículo de chegada: ônibus (Furong, Guilin, Kurokawa, Beppu), barco (Yangshuo), metrô (Fukuoka).
   - A construção "não é X — é Y" aparece **~70 vezes** nas city pages (Xiamen 12, ZJJ 11, Yangshuo 8, Shenzhen 8, Fukuoka 7, Beppu 7). É o tique mais visível do livro.
   - Recomendação: reescrever 3–4 aberturas (Fenghuang e Beppu primeiro) e cortar metade dos "não é X — é Y".

## 7. Aprofundamento (China)

- **`etnias.md` — NÃO PRONTO (alta).** Foi estruturado sobre o roteiro antigo:
  - Seção "Hui: a etnia que a Rota da Seda deixou em Xi'an", com "Dos cinco grupos **deste roteiro**".
  - Miao "no trecho de Guizhou deste roteiro… Xijiang" e Dong "território que o roteiro cruza diretamente em Zhaoxing", com links para `atracoes/xijiang.md` e `atracoes/zhaoxing.md` (removidos).
  - Longsheng "na parada de Yangshuo/Guilin (**dias 16-18**)".
  - O fechamento diz "Cinco paradas, cinco povos… Hui em Xi'an… Miao em Xijiang… Dong em Zhaoxing".
  - Faltam os grupos que o roteiro real atravessa: **Tujia** (Zhangjiajie, Furong, que é o coração Tujia, e o sudeste de Chongqing), Miao e Tujia em Fenghuang (já presentes), **Zhuang** (Guangxi), **Minnan/Hokkien** e a diáspora (Xiamen, subgrupo Han), e os **Hakka**/migrantes em Shenzhen.
  - Reescrever com `travel-deepdive-writer`.
- **`historia.md` — NÃO PRONTO (média).**
  - Tem 309 palavras, contra um piso de 1.500.
  - A abertura ancora a "profundidade de tempo" em Xi'an e no Exército de Terracota, ambos fora do roteiro ("separa a China de qualquer outro destino do roteiro"). Não afirma a visita, mas o ponto de apoio sumiu.
  - Reancorar nos lugares do roteiro: Chongqing (reino Ba, capital de guerra 1938–46), Dazu (Song), Fenghuang (muralha Ming e "Muralha do Sul"), Xiamen (porto de tratado, Koxinga) e Shenzhen (Zona Econômica Especial de 1980).
- **Menções de Xi'an e Hong Kong nas city pages** (Shenzhen l.47, l.103, l.115, l.324; Xiamen l.495): são comparações, não afirmam visita, e são aceitáveis. Exceções: as de chegada via HK (T7) e o "desceu o Yangtze" do Beppu (seção 4).

---

## Classe B priorizada (tudo para o usuário ou pipeline; nada foi aplicado)

| # | Sev. | Arquivo(s) | Problema | Correção proposta | Quem |
|---|---|---|---|---|---|
| 1 | alta (bloq.) | `07-shenzhen.expandido.md` (Dia 13, "Como se locomover", l.212), `14-shenzhen-dia-13.md`, `06-yangshuo.expandido.md` | Chegada a Shenzhen via Hong Kong; saída de Yangshuo sem logística | Yangshuo → Shenzhen North de trem-bala (confirmar trem real) → Futian; reescrever os blocos iniciais e o BRIEF | usuário confirma o trem; `travel-day-planner` + `travel-day-writer` |
| 2 | alta (bloq.) | calendário 16/11 | Data sem dono | Criar `## Dia 16` em Xiamen (manhã em Shenzhen, trem, chegada, 1ª noite em Siming) e `16-xiamen-dia-16.md`; mover para ele o bloco de saída do Shenzhen dia 15 | `travel-day-planner` + writer |
| 3 | alta (bloq.) | calendário 28/11, `11-beppu.expandido.md` | Retorno Beppu → FUK → PVG não planejado; reentrada na China não verificada | Dia 28 novo conforme a seção 4; confirmar voo FUK→PVG e regime de visto | usuário (reserva/visto) + planner |
| 4 | alta (bloq.) | todos os dias, city pages, atrações, build | Numeração com 3 regras; `day/N` perde arquivos | Aplicar R1–R4 com a de-para acima (1 script de renomeação + ajuste de build + revisão manual das 202 referências) | orquestrador (script) + `build/` |
| 5 | alta | `aprofundamento/paises/china/etnias.md` | Roteiro antigo (Xi'an, Guizhou, Longsheng) | Reescrever sobre Tujia, Miao, Zhuang, Minnan e Hakka | `travel-deepdive-writer` |
| 6 | alta | `10-kurokawa.expandido.md`, `11-beppu.expandido.md`, `24-kurokawa-dia-23.md`, `25-beppu-dia-24.md` | Kurokawa → Beppu não confirmado; táxi apresentado como opção equivalente | Confirmar o ônibus (feriado 23/11) e escrever uma rota só nos dois lados | usuário/`travel-itinerary-logistics` |
| 7 | alta | `perfil-viajantes.md` | Trabalho remoto em datas antigas (Fukuoka), chegada "01/11 12h45", título "30/10–27/11", "Kurokawa→Yufuin→Fukuoka", ryokan em Yufuin | Usuário decide as noites de trabalho; atualizar o perfil; se incluir Fukuoka, replanejar os Dias 21–22 atuais | usuário |
| 8 | média | `08-/09-furong-town-dia-*.md`, `03-furong-town.md` | Datas e números errados nas "Notas de logística" (Dia 8 = 08/11, chegada segunda 09/11); preço e modal Furong→Fenghuang divergentes | Remover as notas duplicadas do dia seguinte; fixar 1 modal e 1 preço | pacote Hunan (fase 1) |
| 9 | média | `01-chongqing.md` Dia 4, `04-chongqing-dia-4.md`, `02-zhangjiajie.md` Dia 5, `05-zhangjiajie-dia-5.md` | Estação, duração e tipo do trem CQ→ZJJ divergentes; "interior do Sichuan" | Fixar 1 trem real; corrigir a geografia | usuário + pacotes CQ/ZJJ |
| 10 | média | `02-zhangjiajie.md` | Bilhete do parque "4 dias" (Dia 6) contra "3 dias" (Dia 7) | Uniformizar pela fonte | pacote ZJJ |
| 11 | média | `21-xiamen-dia-20.md`, `22-fukuoka-dia-21.md`, `08-xiamen.expandido.md` l.411 | Voo XMN→FUK não confirmado; "amanhã cedo" contra saída ao meio-dia; chegada "~16h" otimista | Confirmar o voo e alinhar os dois BRIEFs | usuário |
| 12 | média | `11-beppu.expandido.md` l.444 e l.459, `29-beppu-dia-28.md`, Kurokawa l.15, Beppu l.23 e l.43 | "desceu o Yangtze", "28 dias", "22 dias de China" | "29 noites", "três semanas de China", tirar o Yangtze | pacote Beppu (fase 1) |
| 13 | média | `09-fukuoka.expandido.md` / `10-kurokawa.expandido.md` | Operadora do ônibus Tenjin→Kurokawa divergente (Nishitetsu × Sanko); manhã de 22/11 sem plano | Confirmar a operadora; 1 bloco de manhã (checkout, sumô opcional) no Dia 22 novo | pacotes Japão |
| 14 | média | `aprofundamento/paises/china/historia.md` | 309 palavras; ancorado em Xi'an e Terracota | Expandir até ≥1.500 palavras, ancorado nos lugares do roteiro | `travel-deepdive-writer` |
| 15 | média | atrações `longsheng`, `glass-bridge`, `golden-whip-stream` | Estão em `days:` mas não aparecem em nenhum dia | `days: []` ou incluir no roteiro | usuário |
| 16 | baixa | T0 (`voos.md`, `01-chongqing.md` Abertura) | Conexão PKX→PEK entre dois aeroportos sem aviso | 1 parágrafo prático no Quadro prático de CQ | pacote CQ |
| 17 | baixa | todas as city pages e arquivos de dia | Moeda, horário, esqueleto do summary e do BRIEF, front matter dos dias heterogêneos | Aplicar os padrões da seção 6 em 1 passada mecânica, depois da renumeração | orquestrador (script) |
| 18 | baixa | Fenghuang, Beppu (aberturas); todas ("não é X — é Y") | Truque de abertura repetido; ~70 "não é X — é Y" | Reescrever 3–4 aberturas; cortar metade do tique | `travel-writer` pontual |
| 19 | baixa | Furong 9 / Fenghuang 10 / Guilin 11 | 3 amanheceres com névoa em sequência, com o mesmo esqueleto | Diferenciar o ângulo narrativo de cada um | `travel-writer` pontual |
| 20 | baixa | `final-review.config.json` | Hotéis de Yangshuo e Xiamen nulos (o perfil tem os nomes); a auditoria não sabe checar | Preencher | orquestrador |

## Notas (não são erro)

- A transição Guilin → Yangshuo pelo rio (T6), com BRIEFs encadeados (RETORNO = PARTIDA), é o modelo a seguir nas demais.
- A seção "Noite de chegada" de Chongqing já resolve bem o 31/10 e serve de modelo para o Dia 28 de retorno: curta, prática, sem inflar.
- Depois da renumeração, rodar de novo `audit.mjs` e `node build/build.js` e conferir que `registry.days` tem 28 entradas, com os dias 4, 8, 9, 10 e 20 em 2 partes cada.
