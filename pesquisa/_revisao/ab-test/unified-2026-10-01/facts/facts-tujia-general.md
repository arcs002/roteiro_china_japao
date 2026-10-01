# Checagem factual cega — Tujia e contexto geral

Verificação concluída em 01/10/2026. Escopo: 135 unidades de `blind/tujia-general-claims.json`; consulta aos textos cegos somente para contexto. Não foram acessados identificação de candidatos, resultados históricos ou nomes de modelos.

## Método

A unidade é a sentença completa. Todas as proposições materiais foram consideradas; erro material implica `incorrect`, evidência incompleta implica `uncertain`. Recomendações, enquadramentos do roteiro e linhas exclusivamente bibliográficas foram classificadas como `not-factual`. Datas internas da viagem não foram tratadas como acontecimentos históricos. Limites inferiores numericamente verdadeiros foram aceitos.

Pesquisas repetidas foram agrupadas semanticamente, mantendo uma linha por unidade. `relatedUnits` indica repetições relevantes; `errorKey`/`errorKeys` permitem contar erros distintos, sem duplicar reformulações. O JSON inclui URLs e evidência resumida em todas as unidades factuais. Nenhuma nota editorial foi atribuída.

## Resultado

- Corretas: 88.
- Incorretas: 9.
- Incertas: 8.
- Não factuais: 30.
- Unidades com erro relevante: 9.
- Unidades com erro em armadilha da rubrica: 1.

## Erros materiais identificados

- **U076**: Atribui a governança de oito séculos a Wangcun. A fonte estadual enumera sucessivos centros Peng em Huixiping, Longtan, Laosicheng e Kesha; Wangcun aparece como palácio temporário, não base durante todo esse período.
- **U085**: A frase liga as mais de 400 autoidentificações à fundação em 1949; o levantamento que produziu esse número foi o censo de 1953.
- **U092**: O turismo étnico com aldeias comerciais, apresentações e visitantes domésticos está documentado nos anos 1980–1990; a indústria não o descobriu apenas nos anos 2000.
- **U094**: Os 818 anos designam o domínio regional Peng; Laosicheng foi sede apenas desde 1135 até a mudança para Kesha em 1724. O começo convencional em 910 já pertence às Cinco Dinastias, não à dinastia Tang.
- **U095**: Inscrição e três componentes estão corretos, mas Laosicheng não foi capital por oito séculos e não está a poucos quilômetros de Furong: fonte de roteiro regional informa cerca de 48 km até Laosicheng Tusi Daying.
- **U098**: No contexto genealógico ('ramo tibeto-birmanês'), 'sem relação com o chinês' é falso: Tujia pertence à família sino-tibetana. A distribuição 'apenas norte de Xiangxi' também omite a variedade meridional de Luxi e localidades limítrofes documentadas; o total atual e 'quase todas idosas' não foram corroborados.
- **U100**: A inscrição Baishou em 2006 e vários ritos são confirmados. Maogusi, porém, encena pesca, caça e agricultura; defini-la como representação de ancestrais anteriores à agricultura é restrição historicamente indevida. A combinação exata do programa atual de ambos os shows não foi corroborada.
- **U291**: A abertura 'entre 8 e 9 milhões' contradiz o próprio parêntese e o valor de 2020, 9.587.732. O marcador de verificação não corrige essa contradição.
- **U329**: Defumados e o prato do menu têm suporte, mas 'pimenta seca em vez de pasta' generaliza incorretamente a cozinha de Xiangxi, que também produz pimenta picada fermentada e molho picante.

## Fontes centrais

- [NEAC — Perfil Tujia](https://www.neac.gov.cn/seac/ztzl/tjz/gk.shtml): população de 2020, distribuição, autodenominação e língua.
- [NBS — Censo 2020](https://www.stats.gov.cn/english/PressRelease/202105/t20210510_1817185.html): proporções Han e minorias.
- [UNESCO — Tusi Sites](https://whc.unesco.org/en/list/1474/): conjunto e inscrição.
- [Hunan — Topônimos Tujia](https://mzt.hunan.gov.cn/mzt/sxdmx/202008/t20200807_13352559.html): sucessão das sedes Peng.
- [NEAC — Gaitu guiliu](https://www.neac.gov.cn/seac/c103391/202306/1165317.shtml): cronologia regional da reforma.
- [Inventário nacional — Maogusi](https://www.ihchina.cn/art/detail/id/12975.html) e [Baishou](https://www.ihchina.cn/project_details/12922.html): patrimônio e conteúdo das danças.
- [Tim Oakes — Turismo étnico em Qiandongnan](https://spot.colorado.edu/~toakes/authenticity.htm): pesquisa de campo sobre comercialização nos anos 1980.
- [Hunan Statistics — Produtos de Xiangxi](https://tjj.hunan.gov.cn/hntj/tjfx/sxfx/xxz/201608/t20160810_3809971.html): ingredientes e conservas locais.

## Limitações e calibração

Predominam instituições públicas, inventários patrimoniais e pesquisa acadêmica; imprensa e operadores turísticos complementam materiais construtivos, menu e capacidade de teatro. Uma página turística oficial de Hunan informa renomeação de Furong em 1997; a informação conflita com a notícia contemporânea de 2007 e com o operador oficial do destino. A checagem adota agosto de 2007, sem presumir infalibilidade de domínio governamental.

A literatura distingue solicitação em 1727 e formalização em 1728 para Yongshun. Por isso, uma janela expressa 1727–1728 foi aceita; não foi convertida artificialmente em erro por diferença de fase. As fontes também divergem sobre abandono da sede em 1724 ou término político em 1728; ambas mostram que os 818 anos se referem ao domínio regional, não à permanência em Laosicheng.

Explicações dos 56 grupos oficiais foram lidas no contexto continental, sem transformar a omissão de categorias residuais censitárias em erro material. “Oeste de Hunan” foi aceito como descrição abrangente do noroeste; nenhuma dessas frases desloca expressamente os Tujia para o sudoeste da província.

Permaneceram incertos: posição hidrológica precisa de Laosicheng em relação a Furong; funções militares e causalidade arquitetônica específicas de Furong; explicações biológicas dos alimentos; generalizações culinárias; número atual de comunidades reivindicantes; autoria exclusiva Tujia da tipologia arquitetônica; expressão histórica Han “atrasados”; causalidade entre classificação estatal e letreiros Bizika. Para a sentença extensa sobre os espetáculos, a programação completa atual também não foi estabelecida, mas há erro material independente no conteúdo atribuído à Maogusi.

O inventário inclui 11 linhas apenas bibliográficas. Elas não elevam o denominador factual. Não foi feita auditoria completa de disponibilidade de cada URL citada pelos candidatos quando a linha não contém uma proposição; as afirmações efetivas foram verificadas com as fontes registradas no JSON.

