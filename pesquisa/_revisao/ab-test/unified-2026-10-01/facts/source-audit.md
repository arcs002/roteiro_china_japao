# Source Audit Report

**Documento**: registros factuais cegos de `unified-2026-10-01`
**Tipo**: GENERAL — história, cultura, geografia e roteiro de viagem
**Data da auditoria / Last verified**: 2026-10-01
**Modo**: auditoria independente dirigida, antes da pontuação editorial; não é auditoria integral de todas as citações dos onze textos.
**Catálogo Tier 1 carregado**: sim, em `C:/Users/MarcoMattos/.agents/skills/e3-standards/sources-tier1-compact.md`; caminho legado `~/.Codex/skills/e3-standards/` inexistente.
**Registro do projeto**: não acessado; leitura local limitada ao pacote cego autorizado.
**Universo recebido**: 426 unidades — Tujia/geral 135; Miao/Zhuang 135; costa 156.
**Cobertura**: todos os **27/27 vereditos incorrect** reabertos; mais **12 unidades** corretas/incertas examinadas por amostragem, algumas apenas nas subafirmações indicadas abaixo.
**Resultado**: 8 overrides; cinco incorrect → uncertain, um incorrect → correct, uma remoção de armadilha indevida e um ajuste de deduplicação/gravidade.
**Identidades e notas**: nenhuma identidade de modelo, histórico de avaliação ou mapa de candidatos foi acessado; nenhuma nota de candidato foi atribuída.

A maior parte dos erros materiais resistiu à conferência. As correções concentram-se em diferenças entre periodização e erro de data, nomenclatura regional e tipologia geral, e linguagem narrativa e afirmação universal. O único erro integralmente derrubado com evidência positiva foi a datação 1795–1797 de U190. Os cinco casos rebaixados a incertos não receberam aprovação factual. O JSON de overrides é a decisão operacional desta auditoria.

## Citation Verification Detail

A tabela abaixo registra TODOS os incorrect recebidos. P = fonte institucional primária ou pesquisa original; S = síntese, notícia ou compilação. “Busca” indica evidência indexada após falha de extração, não acesso integral. Datas históricas não são rejeitadas por terem mais de 24 meses.

| Unidade | Afirmação contestada | Conferência independente e fonte | Acesso | Resultado |
|---|---|---|---|---|
| U076 | Peng governaram oito séculos desde Wangcun | [Assuntos Civis de Hunan](https://mzt.hunan.gov.cn/mzt/sxdmx/202008/t20200807_13352559.html), P/S institucional: enumera sedes sucessivas e 589 anos em Laosicheng. Wangcun não é sede contínua nessa lista. | Timeout; texto recuperado por busca | Mantido incorrect |
| U085 | Mais de 400 autoidentificações em 1949 | [Zhou, 2019](https://link.springer.com/article/10.1007/s42379-019-00034-5), pesquisa: o número aparece no primeiro censo de 1953. A frase vincula convocação e recebimento à fundação em 1949. | Integral | Mantido incorrect; redação deve explicitar 1953 |
| U092 | Turismo doméstico descobriu minorias nos anos 2000 | [Oakes, 1997](https://spot.colorado.edu/~toakes/authenticity.htm), pesquisa original: visitas domésticas, cobrança e comercialização já nos anos 1980–1990. | Integral | Mantido incorrect |
| U094 | 818 anos desde Laosicheng; fim Tang | [Hunan](https://mzt.hunan.gov.cn/mzt/sxdmx/202008/t20200807_13352559.html) e [Jishou University](https://skxb.jsu.edu.cn/CN/10.3969/j.issn.1007-4074.2013.06.020): sede transferida em 1724, antes do encerramento do domínio. | Busca; resumo acadêmico | Mantido incorrect, somente chave da duração/sede |
| U095 | Capital por oito séculos e a poucos km de Furong | [Ministério da Cultura](https://zhuanti.mct.gov.cn/mmyghcyt2023/hjgn/detail/5010.html), P: 48 km até o complexo turístico de Laosicheng, ainda 5–8 minutos do parque; [UNESCO](https://whc.unesco.org/en/list/1474/) confirma 2015. | Integral | Mantido incorrect; chave de duração compartilhada com U094 |
| U098 | Tujia sem relação com chinês | [NEAC](https://www.neac.gov.cn/seac/ztzl/tjz/gk.shtml), institucional: família sino-tibetana; variedades norte e sul. O contexto da frase é genealógico, não inteligibilidade cotidiana. | Integral | Mantido incorrect |
| U100 | Maogusi representa ancestrais anteriores à agricultura | [Cultura de Hunan](https://whhlyt.hunan.gov.cn/whhlyt/wldhwhls/202208/t20220816_27583929.html), institucional: representação inclui agricultura, pesca e caça. | Busca; URL original ihchina com timeout | Mantido incorrect; não contar programação não comprovada como erro extra |
| U291 | Tujia entre 8 e 9 milhões, mas 2020 perto de 9,6 | [NEAC](https://www.neac.gov.cn/seac/ztzl/tjz/gk.shtml): 9.587.732 em 2020. Contradição interna explícita, não apenas número antigo ou limite inferior. | Integral | Mantido incorrect e trapError |
| U329 | Cozinha usa pimenta seca em vez de pasta | [Costumes alimentares de Hunan](https://www.hunan.gov.cn/hnszf/jxxx/hxwh/cwd/201711/t20171111_4685388.html) e [Agricultura de Hunan](https://agri.hunan.gov.cn/agri/xxgk/jyta/201908/t20190807_5411025.html): vários preparos; inventário não mede preferência relativa nem uso do prato citado. | Busca | Override uncertain |
| U017 | Reação à revolta deu aspecto de fortaleza a Fenghuang | [Candidatura à UNESCO](https://whc.unesco.org/en/tentativelists/5337) registra obras anteriores; [registro local](https://www.fhxww.cn/content/2020/10/26/8544123.html) documenta expansão de defesas ao redor da cidade após 1797. | Integral | Override uncertain; “inicial” foi acrescentado pelo fact-check |
| U020 | Décimo mês lunar começa por volta de 10/11, depois de 08–09/11 | [Hong Kong Observatory](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2026e.pdf), P: início em 09/11. “Por volta de 10” isoladamente é aceitável; “logo depois da passagem” contradiz o intervalo expresso. | PDF integral | Mantido incorrect, sem armadilha |
| U061 | Quase todos os Zhuang vivem em Guangxi | [NEAC](https://www.neac.gov.cn/seac/ztzl/201806/1066832.shtml) e [censo de Guangxi](https://tjj.gxzf.gov.cn/zxfb/t8851187.shtml): aproximadamente 15,722/19,569 milhões, cerca de 80%. | Busca; censo direto com timeout | Mantido incorrect por concentração; “mais de 16 milhões” continua verdadeiro; sem armadilha |
| U103 | Miao são quinta maior minoria | [Southwest University](https://epc.swu.edu.cn/info/1078/4026.htm) e perfis NEAC: Miao 11.067.929; Zhuang, Uyghur e Hui à frente. | Universidade integral; perfis indexados | Mantido incorrect; override trapError=false |
| U104 | Qo Xiong é ramo ocidental | [Southwest University](https://epc.swu.edu.cn/info/1078/4026.htm): Xiangxi é ramo oriental na classificação tripartida. | Integral | Mantido incorrect |
| U106 | Reconstrução da muralha depois do conflito 1795–1806 | [Fenghuang, 2020](https://www.fhxww.cn/content/2020/10/26/8544123.html): reconstrução em 1797 durante a repressão. | Integral; URL de 2013 falhou | Mantido incorrect; período 1795–1806 foi explicitado na unidade |
| U141 | Qianjiang é condado autônomo | [Governo de Chongqing](https://www.cq.gov.cn/zwgk/zfxxgkml/szfwj/zfgz/zfgz/200612/t20061225_8836341_app.html) identifica Qianjiang entre distritos. Não confundir com a antiga designação de condado. | Busca; lista em inglês falhou | Mantido incorrect; percurso ferroviário não demonstrado não vira segundo erro |
| U190 | Levante de 1795 a 1797 | [Sutton, Asia Major](https://www1.ihp.sinica.edu.tw/en/Publications/AsiaMajor/638/Article/118) e [fonte original UW](https://uw.manifoldapp.org/read/f53eaa89-d3e1-42d9-a820-bce1265b853f/section/e692a3de-4f81-434d-aad6-85bba195d40a) usam 1795–1797. | Integral | Override correct |
| U289 | Zhangjiajie pertence oficialmente à prefeitura Xiangxi | [NEAC Tujia](https://www.neac.gov.cn/seac/ztzl/tjz/gk.shtml) distingue as jurisdições; [órgão estatístico Hunan](https://tjj.hunan.gov.cn/tjfx/sxfx/zjj/201809/t20180927_5103738.html) registra cidade desde 1988. | NEAC integral; histórico por busca; URL original falhou | Mantido incorrect e trapError |
| U302 | Xuebaya é pato com sangue defumado | [Cultura e Turismo de Hunan](https://whhlyt.hunan.gov.cn/whhlyt/english/TourismInRegions/Xiangxi/XiangxiFood/202206/t20220602_24799525.html) descreve pato com bolo de sangue; processo documentado usa sangue e arroz, não o suposto sangue defumado. | Integral; relatório CBD também aberto | Mantido incorrect; sazonalidade não comprovada fica ressalva, não erro adicional |
| U306 | Mulheres Yao de Dazhai nunca cortam cabelo | [China Tourism News, relato em Dazhai](https://www.ctnews.com.cn/paper/att/202304/04/7be05c3b-01ef-4e79-aee5-f2a6dbb262fc.pdf) descreve que deixam de cortar depois de 18; [ECNS](https://www.ecns.cn/video/2021-06-01/detail-ihamvkwq9614372.shtml) confirma corte único em Huangluo. | PDFs/página integrais | Mantido incorrect; fonte específica de Dazhai adicionada na auditoria |
| U062 | Oito tons Hokkien | [ICPhS](https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/643.pdf): sete em Xiamen; [Singapore Chinese Cultural Centre](https://culturepaedia.singaporeccc.org.sg/language-education/the-hokkien-dialect-in-singapore/): oito em Hokkien de Singapura. | Integral e texto indexado | Override uncertain por variante não fixada |
| U083 | “Ali todos são Han” | [Xiamen Daily](https://www.fjdaily.com/app/content/2023-06/13/content_1919092.html): população não é toda Han; contexto do parágrafo também admite referente nos grupos culturais mencionados. | Integral e contexto cego lido | Override uncertain; não valida universalização |
| U114 | 99% dos moradores de Xiamen são Han | [Xiamen Daily](https://www.fjdaily.com/app/content/2023-06/13/content_1919092.html), S com atribuição estatística municipal: 96,13% em 2020. Aqui há denominador explícito. | Integral | Mantido incorrect |
| U125 | Weilongwu e weiwu de Bao'an são retangulares | [Pesquisa](https://www.nature.com/articles/s40494-026-02359-0) caracteriza cauda semicircular; [prefeitura de Shenzhen](https://cgj.sz.gov.cn/xsmh/szlh/jpld/content/post_2053158.html) chama Dawan de weilongwu com planta quadrada. | Integral/redirect Nature; texto municipal indexado | Override uncertain por conflito de uso tipológico/local |
| U126 | Hehu Xinju começou em 1817 | [Gazetteer de Shenzhen](https://pnr.sz.gov.cn/attachment/1/1285/1285348/10537364.pdf), P: início em 1782; núcleo concluído em 1817; exterior em 1829. | Fetch falhou; trecho do PDF indexado | Mantido incorrect |
| U311 | Tratado de 1842 depois das Guerras do Ópio | [Tratado de Nanquim](https://en.wikisource.org/wiki/Treaty_of_Nanking), documento primário transcrito: 1842; cronologia é posterior à primeira guerra, anterior à segunda. | Integral | Mantido incorrect; corrigir plural para Primeira Guerra |
| U316 | Condado/região de Shenzhen tinha dezenas de milhares em 1979 | [Arquivo municipal, história dos ônibus](https://www.sz.gov.cn/szstory/202303/content/post_10458576.html): mais de 300 mil residentes em 1979. A frase tem região/condado como sujeito. | Página móvel parcial; versão canônica indexada | Mantido incorrect; não confundir núcleo urbano com município |

## Failed Citations (Action Required)

Os 21 incorrect restantes são os da tabela, após aplicação dos seis overrides de veredito. A auditoria não transforma esses 21 registros em 21 erros relevantes distintos: a deduplicação deve usar chaves dentro de cada candidato.

- U094 e U095 compartilham `laosicheng-entire-818-years`: a permanência da capital não pode gerar dois descontos de gravidade. U095 mantém a chave própria de distância.
- U094 perde `peng-start-tang`. A [literatura sobre ascensão Peng](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003260455) usa o recorte Tang tardio/Cinco Dinastias. Continua recomendado escrever 910–1728, mas a expressão de época não sustenta um segundo erro autônomo.
- U103 mantém `miao-minority-rank`; sua população aproximada está correta, portanto ranking não aciona a armadilha populacional.
- U083 não gera mais chave de erro. U114 conserva o erro explícito de percentual; assim, o mesmo problema de população Han em Xiamen não recebe dois descontos a partir de um enunciado ambíguo e outro preciso.
- U017, U062, U125 e U329 não geram chaves de gravidade enquanto estiverem incertos.
- Hipóteses adicionais não provadas dentro de uma unidade incorreta não devem multiplicar suas chaves.

## Warnings

1. Fontes oficiais chinesas têm boa competência para censos, atos administrativos e inventários; textos sobre identidade e história política também refletem a perspectiva institucional. Não generalizar sua confiabilidade para toda interpretação antropológica.
2. Um domínio oficial não torna toda narrativa primária: candidatura UNESCO é relato submetido pelo Estado; notícia estatal pode ser secundária; pesquisa original foi distinguida de compilação.
3. A fonte de corte de cabelo inicialmente usada falava de Huangluo, enquanto U306 fala de Dazhai. Foi encontrada evidência adicional específica para Dazhai, preservando o veredito sem transportar silenciosamente costumes entre aldeias.
4. Os 48 km de U095 terminam no complexo turístico próximo a Laosicheng, não no portão exato do sítio arqueológico. A fonte permite afirmar distância de dezenas de quilômetros; não apresentar 48 como distância exata até as ruínas.
5. “Por volta de 10/11” não foi tratado como erro isolado. Em U020 o problema restante é situar a data depois de uma visita que inclui 09/11.
6. Em U062, a oposição entre agricultura e mar é ênfase narrativa. Não foi convertida em alegação literal de inexistência de agricultores.
7. O presente relatório não verificou todas as subafirmações de toda unidade mantida incorrect; verificou o fundamento necessário para a condenação e examinou fundamentos adicionais quando afetavam gravidade ou armadilha.

## Uncited Claims Found

Não foi feito novo inventário exaustivo de afirmações sem citação. O escopo foi auditar o inventário já extraído mecanicamente, sem acrescentar amostra oportunista nem alterar textos.

## Internal Consistency Check

| Caso | Resultado |
|---|---|
| U291, 8–9 milhões versus ~9,6 milhões na mesma sentença | Contradição confirmada; ressalva VERIFICAR não a elimina |
| U094/U095, 818 anos de capital | Um mesmo erro histórico; chave compartilhada preservada |
| U190, 1795–1797 versus ciclo 1795–1806 | Recortes historiográficos distintos; não é contradição automática |
| U033, 23/01 versus 05/03/1979 | Decisão provincial versus aprovação nacional; mantido correto |
| U023, filme 1960 versus 1961 | Fontes de catálogo divergem; não transformar em erro sem esclarecer produção/lançamento |
| U061, mais de 16 milhões versus 19,57 milhões | Limite inferior verdadeiro; erro remanescente diz respeito à concentração geográfica |

## Source Quality Metrics

| Métrica | Resultado |
|---|---|
| Incorrect reabertos | 27/27 |
| Armadilhas marcadas no snapshot final reexaminadas | U103, U289 e U291; U103 retificada |
| Outros registros examinados | 12; cobertura parcial explicitada abaixo |
| Fontes com data de verificação nesta auditoria | Todas as evidências novas deste relatório: 2026-10-01 |
| Tier 1/Tier 3 e concentração em todo o universo | Não medidos; auditoria dirigida, sem falsa estatística de cobertura integral |
| Atualidade de dados | Censo 2020 usado como referência definida pela rubrica; não rejeitado por idade |
| URLs falhadas declaradas mortas | Nenhuma; falha de ferramenta não foi tomada como HTTP 404 do servidor |

O catálogo compacto foi usado como referência. Ele não enumera diversas instituições pertinentes a história e turismo (por exemplo, NEAC e UNESCO); fontes institucionais especializadas não listadas foram tratadas como Tier 2 segundo a regra do catálogo, artigos noticiosos como Tier 3. Esta taxonomia não substitui a análise de competência e de correspondência entre afirmação e evidência. Não há base nesta amostra para percentuais do conjunto completo.

## Scope Compliance

Blindagem preservada. Leituras locais restritas aos arquivos autorizados do pacote, mais o catálogo de padrões requerido para a auditoria. Não houve acesso a `candidate-map`, nomes de modelos, relatórios históricos ou avaliações. Arquivos-base de fatos e textos não foram editados.

## Source Classification Audit

A classificação P/S é registrada qualitativamente na tabela, sem exigir mudança do schema fixado para a avaliação. As referências novas do JSON trazem URL, título e evidência. “Last verified” está no cabeçalho comum. A ausência de classificação P/S nos JSONs-base não foi transformada em erro de candidato.

## Rigor Spot-Check (GENERAL)

| Verificação | Resultado |
|---|---|
| Evidência independente dos incorrect | 27/27 reabertos; todos os resultados explicitados |
| Contexto e causalidade | U017, U083 e U329 rebaixados; pressupostos adicionais removidos |
| Diferenças de data e nomenclatura | U190 revertido; U033 preservado; U062/U125 incertos |
| Deduplicação de gravidade | U094/U095 e classificação trap de U103 ajustadas |
| Aprovação por ausência de prova | Nenhuma: cinco reversões foram para uncertain; correct de U190 tem evidência positiva |

Não se atribui pontuação aos candidatos neste relatório.

## Amostra adicional de correct e uncertain

| Domínio | Unidade | Cobertura e conclusão |
|---|---|---|
| Tujia/geral | U009 correct | População e distribuição confrontadas com [NEAC](https://www.neac.gov.cn/seac/ztzl/tjz/gk.shtml); mantido |
| Tujia/geral | U011 correct | Três componentes e 2015 confrontados com [UNESCO](https://whc.unesco.org/en/list/1474/); mantido |
| Tujia/geral | U010 uncertain | Sede e rio têm suporte; posição “rio acima de Furong” não resolvida pela evidência examinada; mantido, sem erro inferido |
| Tujia/geral | U165 uncertain | [NEAC, costumes](https://www.neac.gov.cn/seac/ztzl/201806/1067449.shtml) associa tipologia aos Tujia, mas não demonstra invenção exclusiva; mantido |
| Miao/Zhuang | U016 correct | Subafirmação populacional confrontada com [SWU](https://epc.swu.edu.cn/info/1078/4026.htm); diáspora não reaudidata integralmente |
| Miao/Zhuang | U021 correct | Valores populacionais e 1958 examinados com NEAC e [Arquivo de Guangxi](https://www.gxdag.org.cn/tjqy/); mantido |
| Miao/Zhuang | U015 uncertain | [Registro local](https://www.fhxww.cn/content/2020/10/26/8544123.html) diz 1555, não 1554; variação de fontes não resolvida; mantido |
| Miao/Zhuang | U023 uncertain | [MoMA](https://www.moma.org/momaorg/shared/pdfs/docs/press_archives/5930/releases/MOMA_1981_0061_62.pdf) registra 1961, enquanto [China Film Archive](https://www.cfa.org.cn/cfaen/gz/dymlcx/dy/2023060214300993466/index.html) foi recuperado com conteúdo parcial; incerteza preservada, sem condenar 1961 |
| Costa | U002 correct | Subafirmação de classificação Minnan/Hakka como Han confirmada no [Conselho de Estado](https://english.www.gov.cn/archive/202007/28/content_WS5f1f8c45c6d029c1c2636d06.html); não refeito cálculo migratório inteiro |
| Costa | U033 correct | Distinção entre decisão provincial e aprovação nacional sustentada pela [cronologia municipal reproduzida](https://www.sznews.com/news/content/mb/2019-03/05/content_21447485.htm); mantido; arquivo original bloqueado na extração |
| Costa | U028 uncertain | [UNESCO Kulangsu](https://whc.unesco.org/en/list/1541/) confirma 2017 e intercâmbios, mas não quantifica maioria dos construtores; mantido |
| Costa | U027 uncertain | Reaberto componente de porto em 1842 no [tratado](https://en.wikisource.org/wiki/Treaty_of_Nanking); volume, destinos e causalidade conjunta não resolvidos; mantido |

## Editorial Quality Check

JSON de overrides analisado com `ConvertFrom-Json`; oito unidades únicas, com enumerações de veredito válidas. Os hashes dos três arquivos de fatos permaneceram iguais ao snapshot final. Não houve revisão editorial integral das onze páginas nesta etapa.

## Overturned Findings

| Unidade | Original | Resultado | Fundamentação |
|---|---|---|---|
| U190 | incorrect | correct | Periodização acadêmica 1795–1797 comprovada |
| U017 | incorrect | uncertain | Fonte distingue fortificação anterior e expansão posterior; sentença não diz construção inicial |
| U062 | incorrect | uncertain | Hokkien amplo não fixa o inventário fonético de Xiamen |
| U083 | incorrect | uncertain | Referente narrativo ambíguo; população total é leitura possível, não única |
| U125 | incorrect | uncertain | Fonte municipal aplica weilongwu a planta quadrada |
| U329 | incorrect | uncertain | Diversidade de produtos não resolve caracterização relativa de uso culinário |
| U103 | incorrect + trap | incorrect sem trap | Ranking não é armadilha de população |
| U094 | incorrect com duas chaves | incorrect com uma chave | Retira erro autônomo baseado em expressão ampla de época |

## Limitações de acesso

Não houve acesso integral bem-sucedido aos endereços abaixo durante a tentativa inicial. Usou-se busca indexada ou outra fonte; não houve sequência de tentativas repetidas do mesmo URL.

- Hunan Assuntos Civis: `mzt.hunan.gov.cn/.../t20200807_13352559.html` — timeout; texto histórico indexado.
- Hunan museu Laosicheng: `www.hunan.gov.cn/.../t20210830_20409890.html` — timeout.
- Hunan Furong 2026: `enghunan.gov.cn/.../t20260106_33887388.html` — timeout.
- IHChina Maogusi: `www.ihchina.cn/art/detail/id/12975.html` — timeout; substituído por cultura provincial.
- Estatística Hunan produtos: `tjj.hunan.gov.cn/.../t20160810_3809971.html` — falha de extração.
- Estatística Guangxi: `tjj.gxzf.gov.cn/zxfb/t8851187.shtml` — timeout; dado corroborado por publicação que o atribui ao censo.
- Fenghuang 2013: `www.fhxww.cn/content/2013/09/24/478545.html` — falha de extração; página local de 2020 aberta.
- Divisão administrativa CQ em inglês: `english.cq.gov.cn/government/administrativedistricts/` — falha; documentos municipais em chinês corroboram distrito Qianjiang.
- História Xiangxi: `mzzjj.xxz.gov.cn/.../t20191220_1489581.html` — falha; NEAC e histórico estatístico distinguiram jurisdições.
- Cambridge excerto: `assets.cambridge.org/97805215/30828/excerpt/9780521530828_excerpt.pdf` — timeout; artigo ICPhS acessível confirma sete tons de Xiamen.
- Gazetteer Shenzhen: `pnr.sz.gov.cn/attachment/1/1285/1285348/10537364.pdf` — falha de fetch; datas 1782/1817/1829 indexadas.
- Arquivo Shenzhen: `www.szdag.gov.cn/dawh/tqssn/content/post_98517.html` — falha; cronologia municipal alternativa.
- Artigo KCI sobre Peng: URL em U094 — falha; título/resumo indexados.
- NEAC Zhuang: `www.neac.gov.cn/seac/ztzl/201806/1066832.shtml` — falha; trecho censitário indexado.
- Algumas buscas dentro de páginas previamente abertas retornaram “No matching text” apesar do texto indexado disponível. Isso foi tratado como limitação do extrator, não ausência probatória automática.

## Recommendations

1. Aplicar `audited-corrections.json` por `unit`, substituindo integralmente os campos de veredito, relevância, armadilha e chaves; não manter chaves antigas em overrides incertos/corretos.
2. Calcular taxa por unidade como manda o protocolo; deduplicar apenas gravidade por chave e candidato.
3. Entregar a ambos os avaliadores exatamente a mesma versão consolidada dos fatos com esta auditoria.
4. Preservar as incertezas; não transformá-las em desconto D1 por “fato duvidoso”, nem em acerto por falta de refutação.
5. Em revisão futura do texto, especificar datas, variantes linguísticas, referente de “todos”, formas arquitetônicas locais e preferência culinária.

## Snapshot final auditado

| Arquivo | SHA-256 |
|---|---|
| facts-tujia-general.json | A530BC0107BA6801CD356C92A376B4522F7F7F5DDA604C5A6CFBDAB7D1B2F58E |
| facts-miao-zhuang.json | CD4D985D968AFB799D92D8634C43DC51E113A35865EC4F9F58D8F19470D608FD |
| facts-coast.json | 0F5EC5B0C50924C341872DF322EAEC4B37E9C30990F2EB5B046D6D76FF409869 |

