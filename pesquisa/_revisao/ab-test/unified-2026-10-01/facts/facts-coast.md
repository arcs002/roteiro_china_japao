# Checagem factual cega — costa

Data da checagem: 1º de outubro de 2026. Escopo: 156 unidades de `blind/coast-claims.json`, com consulta contextual aos candidatos cegos, à rubrica e ao protocolo. Não foram consultados mapa de candidatos, identidades de modelos, relatórios anteriores ou outros arquivos do projeto. Não há avaliação de qualidade editorial nem pontuação neste arquivo.

| Resultado | Unidades |
|---|---:|
| correct | 86 |
| incorrect | 7 |
| uncertain | 42 |
| not-factual | 21 |
| Total | 156 |

O JSON contém uma entrada por identificador exato, preservando a ordem do input. Todas as 135 unidades factuais têm fontes; há 61 URLs distintas. Os sete erros materiais têm `errorKey` estável; `relevantError=true` apenas quando há erro demonstrado. Nenhuma unidade foi marcada como erro de armadilha de classificação Hakka/Minnan: os textos não os apresentam inequivocamente como minorias oficiais autônomas. U083 erra ao universalizar a população Han das cidades, questão distinta.

A pesquisa agrupou duplicações semânticas, mas avaliou a proposição inteira de cada sentença. Uma parte demonstravelmente falsa produz `incorrect`; uma proposição material sem comprovação suficiente produz `uncertain`, sem penalização automática como erro. Limites inferiores verdadeiros e arredondamentos proporcionais não foram tratados como falsidade. Links isolados e enquadramento normativo/editorial receberam `not-factual`.

## Erros materiais

| Unidade | errorKey | Correção |
|---|---|---|
| U062 | xiamen-hokkien-tone-count | Distinguir oito categorias históricas de sete tons de Xiamen; reconhecer agricultura e comércio. |
| U083 | coastal-cities-all-han | Minnan e Hakka são Han; as cidades também abrigam minorias oficiais. |
| U114 | xiamen-han-share | Em 2020, 96,13% eram Han. |
| U125 | weilongwu-rectangular | Distinguir casas com envoltório semicircular dos conjuntos murados quadrangulares. |
| U126 | hehu-start-year | Hehu começou em 1782; núcleo concluído em 1817 e exterior em 1829 segundo o gazetteer. |
| U311 | nanking-after-opium-wars | Depois da Primeira Guerra do Ópio, o Tratado de Nanquim de 1842 abriu Amoy. |
| U316 | baoan-1979-population | Distinguir a pequena cidade-mercado do território municipal de cerca de 300 mil moradores. |

As datas de início e conclusão de Hehu exigem distinção: o [gazetteer municipal, p. 685](https://pnr.sz.gov.cn/attachment/1/1285/1285348/10537364.pdf) registra início em 1782, núcleo concluído em 1817 e exterior em 1829. Resumos turísticos oficiais dizem simplesmente 1817. Portanto U126, que afirma **iniciada** em 1817, contém erro; U035 e U222 ficaram incertas diante da ambiguidade de uma data de construção sem etapa explícita. O superlativo e a área de U035–U036 também não foram confirmados integralmente.

## Decisões que evitam falsos positivos

- U033 é correta: o [Arquivo Municipal](https://www.szdag.gov.cn/dawh/tqssn/content/post_98517.html) documenta a decisão provincial de 23/01/1979; a aprovação nacional ocorreu em 05/03. São atos distintos.
- U032 ficou incerta, não incorreta: chamar de Bao’an a linhagem administrativa que se chamava Xin’an em 1573 pode ser abreviação pelo nome posterior. A suposta ausência de mistura entre comunidades não foi comprovada.
- U002: a maioria Han entre migrantes resulta de uma inferência por limites, explicitada no JSON. O [censo de 2020, tabela 2-1](https://tjj.sz.gov.cn/attachment/1/1540/1540105/10688160.pdf) registra 93,79% Han na população total; a minoria de 6,21% não poderia representar maioria de um contingente migrante que domina a população municipal.
- U040, U068, U209 e U317: [pesquisa sobre nascimento e hukou](https://pmc.ncbi.nlm.nih.gov/articles/PMC6313338/) confirma o caráter migrante da cidade, mas não autoriza transportar proporções entre datas ou equiparar nascimento, registro e migração. A incerteza se refere à precisão temporal e à intensidade declarada, não à existência da migração.
- U264: cerca de 5,88 milhões de registros locais totais e cerca de 5,14 milhões de residentes registrados pertencem a universos estatísticos diferentes. A locução “dos quais” exige conciliá-los antes de aprovar a conta.
- U118: “dezenas de milhares” é limite inferior compatível com o acervo de qiaopi superior a 160 mil; não foi penalizado por imprecisão.
- U096 e U183 foram lidas no contexto regional Peng/Tujia. A cronologia não foi interpretada como extinção de todos os sistemas tusi da China.
- U160 é fragmento referente a Ong Chun; U414 refere-se a Mazu; U425, a Nanyin. U320 retoma Nantou por pronome: a redação defeituosa não foi convertida em topônimo inventado.

## Fontes principais

As referências completas e a evidência utilizada estão em cada linha do JSON. Esta seleção identifica as bases da auditoria:

| Tema | Fontes |
|---|---|
| Han, Hakka e Minnan | [Conselho de Estado](https://english.www.gov.cn/archive/202007/28/content_WS5f1f8c45c6d029c1c2636d06.html); [Hakka Affairs Council](https://english.hakka.gov.tw/Content/Content?LanguageType=ENG&NodeID=676&PageID=39926); [National Library Board](https://www.nlb.gov.sg/main/article-detail?cmsuuid=4fd3409a-79c9-4b3e-85e4-e321f764f91f) |
| População municipal | [Censo Shenzhen 2020](https://tjj.sz.gov.cn/zwgk/zfxxgkml/tjsj/tjgb/content/post_8771927.html); [etnias Shenzhen](https://tjj.sz.gov.cn/attachment/1/1540/1540105/10688160.pdf); [Xiamen Daily: censo étnico](https://www.fjdaily.com/app/content/2023-06/13/content_1919092.html) |
| História administrativa | [Arquivo: Bao’an/Xin’an](https://www.sz.gov.cn/szstory/202301/content/mpost_10395164.html); [Arquivo: evolução administrativa](https://www.szdag.gov.cn/dawh/tqssn/content/post_98517.html) |
| Habitação Hakka | [UNESCO Tulou](https://whc.unesco.org/en/list/1113/); [gazetteer Hehu](https://pnr.sz.gov.cn/attachment/1/1285/1285348/10537364.pdf); [Longgang: museu Hehu](https://www.lg.gov.cn/xxgk/zwgk/zdlyxxgk/whjg/gwgk/content/post_1389047.html); [pesquisa sobre weilongwu](https://www.nature.com/articles/s40494-026-02359-0); [Dawan](https://www.sz.gov.cn/szstory/202212/content/post_10360615.html) |
| Patrimônio Minnan | [UNESCO Kulangsu](https://whc.unesco.org/en/list/1541/); [UNESCO Nanyin](https://ich.unesco.org/en/RL/nanyin-00199?RL=00199); [UNESCO Ong Chun](https://ich.unesco.org/en/RL/ong-chun-wangchuan-wangkang-ceremony-rituals-and-related-practices-for-maintaining-the-sustainable-connection-between-man-and-the-ocean-01608?RL=01608); [UNESCO Mazu](https://www.unesco.org/archives/multimedia/document-334) |
| Diáspora e educação | [National Heritage Board: Tan Kah Kee](https://www.roots.gov.sg/stories-landing/stories/tan-kah-kee/story); [Xiamen University](https://zzxq.xmu.edu.cn/zzxq_en/info/1004/1031.htm); [Governo Xiamen: Jimei 1913](https://www.prnewswire.com/news-releases/xiamen-china-celebrates-100th-anniversary-of-jimei-school-village-with-opening-of-malaysia-tan-kahkee-memorial-museum-in-kuala-lumpur-227804671.html); [UNESCO qiaopi](https://www.unesco.org/en/memory-world/qiaopi-and-yinxin-correspondence-and-remittance-documents-overseas-chinese?hub=1081) |
| Língua | [Cambridge: descrição linguística](https://assets.cambridge.org/97805215/30828/excerpt/9780521530828_excerpt.pdf); [pesquisa de Dapeng](https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/0/13568/files/2022/05/WICL6_2B-1_Chen.pdf) |
| Urbanização e alimentação | [MIT: Shenzhen](https://web.mit.edu/dusp/dusp_extension_unsec/news/Shenzhen_2008.pdf); [UWA: vilas urbanas](https://research-repository.uwa.edu.au/files/3239567/Wang_Da_Wei_David_2013.pdf); [receita/história local do shachamian](https://www.investxiamen.org.cn/detail/169.html) |
| Portos e tratados | [Tratado de Nanquim, artigo II](https://en.wikisource.org/wiki/Treaty_of_Nanking); [pesquisa Northumbria sobre migração](https://nrl.northumbria.ac.uk/31707/1/neal.stan_phd.pdf); [Office of the Historian: Primeira Guerra e tratado](https://history.state.gov/milestones/1830-1860/china-1) |

## Limitações

A condição institucional do site não torna todos os seus detalhes infalíveis. Páginas turísticas oficiais divergem sobre áreas, início versus conclusão e superlativos; nesses casos a divergência foi preservada. Algumas fontes institucionais republicam imprensa, identificada pelo título/proveniência; pesquisas universitárias e documentos históricos complementam a documentação pública.

Genealogias uniformes, motivações coletivas, origem específica de ornamentos e afirmações causais amplas permaneceram incertas quando não demonstradas. Também permaneceram incertos tempo de deslocamento sem ponto de partida, generalizações sobre moradores atuais e exclusividade de locais dentro de itinerário não auditado. Datas do percurso e links locais não foram validados fora dos inputs autorizados.

As 42 incertezas não equivalem a 42 falsidades. O JSON explicita qual componente está sustentado e qual continua em aberto. Foram validados cardinalidade, unicidade dos identificadores, enums, campos obrigatórios, presença de fontes nas linhas factuais e chaves dos erros materiais.

