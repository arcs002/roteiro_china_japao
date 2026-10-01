# Checagem cega — Miao, Fenghuang, Zhuang e Guangxi

Data: 2026-10-01. Escopo: 135 unidades de `blind/miao-zhuang-claims.json`. Foram lidos somente o inventário designado, a rubrica, o protocolo e trechos de C03 para resolver a referência de “território”. Não houve acesso ao mapa de candidatos ou às avaliações anteriores.

## Método

Pesquisa web por grupos semânticos, com decisão individual por sentença. Priorizadas fontes governamentais chinesas, universidades, arquivo cinematográfico, UNESCO e FAO. A candidatura de Fenghuang no portal UNESCO é declaração submetida pelo Estado chinês, não inscrição na Lista do Patrimônio Mundial. Resultados indexados foram aceitos quando exibiam o trecho relevante, mesmo se a abertura direta falhava.

Cada proposição material foi considerada. Erro demonstrável leva a `incorrect`; ausência de prova suficiente ou divergência documental, a `uncertain`. Limites inferiores verdadeiros não foram penalizados por antiguidade. Datas internas da viagem foram tratadas como dados do texto cego. Links isolados e enquadramentos puramente interpretativos são `not-factual`. Não foi atribuída nota editorial.

## Resultado

- Corretas: 63.
- Incorretas: 11.
- Incertas: 32.
- Não factuais: 29.
- Denominador factual decidido: 74; cobertura decidida: 74/106 unidades factuais.
- Erros relevantes distintos: 11, identificados por `errorKey`/`errorKeys`. As flags não são notas ou tetos.

O JSON contém URLs, evidência e motivo para cada unidade. Validação mecânica: 135 IDs únicos, nenhuma unidade ausente/extra e fontes em todas as unidades factuais.

## Fontes centrais

- [NEAC — Miao](https://www.neac.gov.cn/seac/ztzl/mz/gk.shtml): censo e diversidade.
- [NEAC — Zhuang](https://www.neac.gov.cn/seac/ztzl/201806/1066832.shtml) e [censo de Guangxi](https://tjj.gxzf.gov.cn/zxfb/t8851187.shtml): populações nacional/regional.
- [Xiangxi — história administrativa](https://mzzjj.xxz.gov.cn/mzzs/201912/t20191220_1489581.html): autonomia e separação de Zhangjiajie.
- [Fenghuang — candidatura UNESCO](https://whc.unesco.org/en/tentativelists/5337) e [Muralha do Sul](https://www.fhxww.cn/content/2013/09/24/478545.html): cronologia militar.
- [Hong Kong Observatory](https://www.hko.gov.hk/en/gts/time/calendar/pdf/files/2026e.pdf): calendário.
- [Pesquisa de campo em Longji — Göttingen](https://ediss.uni-goettingen.de/bitstream/handle/11858/00-1735-0000-0028-869C-D/eDiss_Yang.pdf?isAllowed=y&sequence=1): aldeias.
- [Minzu University — línguas Miao](https://nmlr.muc.edu.cn/info/1119/2172.htm): variedades.
- [CUHK — Shen Congwen](https://www.cuhk.edu.hk/rct/renditions/authors/shencw.html): biografia/publicação.

## Limitações e divergências

Genealogia étnica de Shen Congwen: há tradição biográfica difundida e discussão acadêmica, portanto não foi convertida em certeza genealógica. Filme Liu Sanjie: China Film Archive usa 1960, MoMA usa 1961. Fortificação urbana: Hunan publica 1704; candidatura patrimonial discrimina fases e muralha de pedra em 1715. Longji: literatura científica situa terraços estudados na Yuan, mas FAO menciona origem muito anterior. As divergências estão preservadas no JSON.

Não houve observação de campo. Cenas de lavagem matinal do cabelo, proporção étnica de elencos, número de barcos e alegações absolutas sobre casas/aldeias ficaram incertas quando a documentação não bastou. “Quase totalidade” foi distinguida de “maioria”: cerca de 80% sustenta esta última, mas não equivale a praticamente todos. U088 permanece incerta por ambiguidade geográfica; U289 inclui Zhangjiajie explicitamente e é incorreta. U141 refere-se culturalmente a Wuling: seu erro é Qianjiang como condado autônomo.

Fontes complementares de turismo foram admitidas quando a primária não trazia o detalhe, explicitando isso na razão da unidade; não se tratou a indisponibilidade de um link como falsidade da afirmação.
