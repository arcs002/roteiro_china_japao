# Revisão final do guia — consolidado (30/09/2026)

Skill: `.claude/skills/travel-final-review/` · agente: `.claude/agents/travel-final-reviewer.md` · config: `pesquisa/_pipeline/final-review.config.json`.
Snapshot antes das correções: `pesquisa/_backup/pre-revisao-final-20260930-1653.tar.gz`.

## Veredito por pacote

| Pacote | Veredito | Correções Classe A | Relatório |
|---|---|---|---|
| Chongqing | NÃO PRONTO (roteiro) | ~75 | [chongqing.md](chongqing.md) |
| Zhangjiajie + Furong | PRONTO COM RESSALVAS | 60 | [zhangjiajie-furong.md](zhangjiajie-furong.md) |
| Fenghuang + Guilin | NÃO PRONTO (horários de luz, embarque do Rio Li) | 47 | [fenghuang-guilin.md](fenghuang-guilin.md) |
| Yangshuo | PRONTO COM RESSALVAS | 24 | [yangshuo.md](yangshuo.md) |
| Shenzhen | NÃO PRONTO (chegada via Hong Kong) | ~60 | [shenzhen.md](shenzhen.md) |
| Xiamen | PRONTO COM RESSALVAS | 67 | [xiamen.md](xiamen.md) |
| Fukuoka + Kurokawa | PRONTO COM RESSALVAS | 57 | [fukuoka-kurokawa.md](fukuoka-kurokawa.md) |
| Beppu | PRONTO COM RESSALVAS | 51 | [beppu.md](beppu.md) |
| Roteiro (transversal) | NÃO PRONTO | só reporta | [roteiro.md](roteiro.md) |

**Total: ~440 correções Classe A aplicadas** (tags CONFIRMADO/PROVÁVEL vazadas, metalinguagem/"flags" para o escritor, jargão em inglês como "golden window/hour", lusitanismos e erros de português, dias da semana errados, números internos divergentes, divergências dia↔BRIEF-DIA, front matter).

## Auditoria mecânica: antes → depois

| Categoria | Antes (erros/avisos) | Depois |
|---|---|---|
| metalinguagem | 29 / 0 | 1 / 0 (falso positivo: "pesquisa visual" de Cameron) |
| tag-vazada | 48 / 0 | 0 / 0 |
| data (dia da semana) | 1 / 0 | 0 / 0 |
| front-matter | 0 / 22 | 0 / 3 |
| clichê | 0 / 6 | 0 / 3 (citações irônicas/negadas) |
| roteiro | 3 / 3 | 3 / 3 (numeração: decisão do usuário) |
| extensão | 36 / 6 | 36 / 6 (stubs de atração: pipeline normal) |
| pendência | 70 / 82* | 0 / 72 (só placeholders de atração) |

\* Inflado por falso positivo (`TODO` com `/i` casava "todo"); regex corrigida no script.
`node build/build.js`: ok, 89 páginas.

## Classe B — o que depende de decisão ou de pipeline (priorizado)

### 1. Bloqueadores de roteiro (decisão do usuário)
1. **Numeração de dias.** Hoje a numeração segue 3 regras diferentes. Os Dias 9, 10 e 11 estão em duas cidades cada, e em 16/11 e 28/11 não há dia nenhum. Proposta da fase 2: **Dia N = N de novembro**, a noite de 31/10 sem número, dia de transição com 1 número e até 2 arquivos (`part` 1/2). A tabela de-para completa e o impacto estão em [roteiro.md §2](roteiro.md): 25 renomeações, 4 arquivos novos, cerca de 202 referências "Dia N" no texto e um ajuste pequeno em `build-registry.js`/`validate.js`.
2. **Chegada a Shenzhen (12/11) escrita a partir de Hong Kong**, que saiu do roteiro. O viajante vem de Yangshuo, e o trecho Yangshuo→Shenzhen não tem modal nem horário. É preciso definir o trem e reescrever o Dia 13 de Shenzhen (city page, BRIEF-DIA, arquivo de dia e "Como se locomover").
3. **Transporte ainda não reservado ou confirmado:**
   - Chongqing→Zhangjiajie: as páginas divergem em trem, estação e duração.
   - Fenghuang→Guilin.
   - Yangshuo→Shenzhen.
   - Shenzhen→Xiamen: 2h30–3h numa página, 3h30–4h na outra.
   - Voo XMN→FUK (20/11): não está em `voos.md`.
   - Kurokawa→Beppu (23/11, feriado).
   - Beppu→FUK→PVG (28/11) com pernoite em Xangai.
4. **Trabalho remoto**: `perfil-viajantes.md` ainda diz Fukuoka 21–26/11, que é do roteiro antigo. É preciso decidir em quais noites de Beppu (e talvez Kurokawa) ele vale. Considerar o Thanksgiving em 26/11.

### 2. Erros de logística que exigem replanejar blocos (`travel-day-planner` → `travel-day-writer`)
- **Chongqing Dia 1**: o trajeto "Nan'an → 15 min a pé até Jiangbeizui" é impossível, porque há dois rios no caminho. Na noite de chegada, o check-in real fica por volta de 22h15.
- **Zhangjiajie Dia 7**: o parque abre às 7h e o Bailong fica a 20-30 min de ônibus interno. O texto diz 6h30 e 15 min a pé.
- **Guilin/Fenghuang**: o nascer do sol real é ~6h52–6h58, não 6h15–6h20, e as manhãs-âncora dos Dias 10/11 dependem disso. O embarque do Rio Li às 9h, a ~27 km, com táxi às 8h30, não fecha.
- **Yangshuo Dia 11**: a Big Banyan Tree fica a ~7-8 km do teatro do Impression, não a 500 m.
- **Beppu**: o Shibaseki nunca é visitado dentro da validade do Combo Pass. O checkout é às 10h ou 11h? Conferir na reserva.
- **Fukuoka**: o voo chega ao Terminal Internacional, que não tem metrô. Watanabe-dori fica na linha Nanakuma.
- **Xiamen**: a balsa para Gulangyu recomendada é provavelmente só para moradores; o visitante usa o 东渡邮轮中心 → Neicuo'ao. Recomenda-se rodar `travel-place-finder` sobre as rotas de balsa.

### 3. Fatos a corrigir ou confirmar (1 pesquisa pontual cada)
- **Fukuoka**, na abertura: "300 km de Xiamen" (são ~1.500 km) e "mais perto de Xangai que de Osaka" (é o contrário).
- **Zhangjiajie**: Xiangxi não "inclui" Zhangjiajie, e os Tujia ficam no noroeste de Hunan, não no sudoeste. O Youshui deságua no Yuan.
- **Chongqing**: Hongyadong fica na margem sul do Jialing, e o mirante clássico é a margem norte (aparece invertido). Rotas de metrô duvidosas.
- **Shenzhen**: Huaqiangbei é Linhas 2/7. O tofu fedorento "a ¥80 o prato" e a contradição 300 mil × 30 mil no texto.
- **Xiamen**: levar linguiça minnanesa para o Japão, que proíbe produtos de carne da China.
- **Dazaifu**: o santuário temporário de Sou Fujimoto pode já ter sido desmontado.
- **Zhangjiajie Dia 7**: o "pedido de James Cameron" para renomear o pilar é discutível.

### 4. Conteúdo faltante (pipeline normal)
- **36 atrações são stubs** (placeholder de ~60 palavras). Candidatas a remoção porque o roteiro não as visita: glass-bridge, golden-whip-stream, longsheng, ping-an-shenzhen-bay, kushida-shrine e canal-city. As demais vão para `travel-content-planner` → … → `travel-page-assembler`.
- **Aprofundamento**:
  - `paises/china/etnias.md` foi escrito para o roteiro antigo (Hui/Xi'an, Miao/Dong/Guizhou). Faltam os Tujia (Zhangjiajie/Furong) e o povo Minnan (Xiamen).
  - `historia.md` tem só 309 palavras e se apoia em Xi'an.
- **Kurokawa** tem ~4.650 palavras para um piso de 6.000. A manhã de 22/11 em Fukuoka não tem plano. O arquivo de Chongqing Dia 2 está no formato antigo, com 1.728 palavras.

### 5. Estilo transversal (1 passada mecânica depois de decidir o padrão)
- **Moeda**: na China aparecem ¥, yuan, CNY e RMB misturados, e ¥ também é usado para iene. Sugestão: `¥` só para yuan e `JP¥`/"ienes" no Japão, ou o inverso. Decidir.
- **Horário**: aparece 07h30 e 7h30. Sugestão: 7h30.
- **Resumo do dia**: há quatro formatos diferentes. Convergir para o esqueleto `Sequência/Logística/Ponto de partida`.
- **Tiques repetidos**: cerca de 70 ocorrências de "não é X — é Y", e a abertura "X chega antes de qualquer outra coisa" se repete em várias cidades.

## Próximos passos sugeridos
1. O usuário decide a numeração (item 1.1) e o padrão de moeda (5).
2. Confirmar ou reservar os trechos de transporte (1.3). Depois, `travel-itinerary-logistics` amarra os dois lados de cada transição.
3. Aplicar a renumeração (script único + ajuste de build) e replanejar os blocos da seção 2.
4. Rodar `/travel-final-review` de novo (fases 0 + 2 bastam) para fechar.
