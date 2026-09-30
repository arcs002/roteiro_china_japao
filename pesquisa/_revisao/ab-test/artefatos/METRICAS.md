# Métricas mecânicas — medidas com o mesmo comando nos 7 arquivos

Corpo = palavras após o front matter (`wc -w`). Todos os 7 têm front matter idêntico e válido (`type: pais`, `slug: china`, `topico: etnias`, `title: "China — Etnias"`, `order: 2`). Nenhum tem link markdown `](...)`. Nenhum menciona Xi'an, Hui, Xijiang, Zhaoxing ou Dong Grand Song. Nenhum usa "Dia N". Nenhum usa o padrão retórico "Não é X — é Y".

| Arq. | Corpo (palavras) | Seções `##` | `[VERIFICAR]` | Caminhos de arquivo na prosa | Build | audit.mjs (linhas sobre etnias) |
|---|---|---|---|---|---|---|
| A | 4.815 | 8 | 0 | 0 | ok | 2 avisos `destino-removido` (menções a "Hong Kong" e à palavra "terracota" = tijolo, falso positivo) |
| B | 5.621 | 8 | 0 | 0 | ok | 5 avisos `destino-removido` (menções geográficas a Guizhou / Hong Kong) |
| C | 3.842 | 8 | 6 | **11** (ex.: "Hongyadong (`pesquisa/atracoes/hongyadong.md`)", "pano de fundo de `pesquisa/atracoes/muralha-fenghuang.md`") | ok | 6 erros `pendência` = as 6 tags `[VERIFICAR]` (não contam como tag vazada nesta avaliação — ver D5) |
| D | 4.483 | 8 | 0 | 0 | ok | 5 avisos `destino-removido` (Guizhou / Hong Kong) |
| E | 3.322 | 7 | 0 | 0 | ok | 2 avisos `destino-removido` (Guizhou) |
| F | 4.375 | 8 | 0 | 0 | ok | nenhum |
| G | 3.781 | 8 | 0 | 0 | ok | 2 avisos `destino-removido` (Guizhou) |

Notas:
- Avisos `destino-removido` por "Guizhou"/"Hong Kong" são menções geográficas legítimas (onde vivem os Miao, fronteira de Shenzhen), não resquício do roteiro antigo. Não penalizar por si; verificar apenas se a menção é pertinente.
- Piso da skill: 2.000 palavras. Todos passam. Tamanho não pontua (D3).
- Em C, os caminhos de arquivo dentro da prosa do leitor são jargão de bastidor (D5). O texto antigo da página usava essa convenção; a skill não a prescreve e o renderizador não a transforma em link.
