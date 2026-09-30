# Medição de custo — "v3" (Guizhou, protocolo corrigido) — resultado misto, honesto

| Etapa | Chamadas | Turnos reais | Custo efetivo |
|---|---|---|---|
| Redatores de módulo (14 — página tem 3 dias de roteiro) | 14 | 58 | 1.357.910 |
| Orquestrador | 1 | 30 | 1.123.044 |
| Revisor (2 rodadas — reprovou 1x por redundância/volume) | 2 | 25 | 567.511 |
| Curadoria de imagem | 1 | 13 | 237.202 |
| Busca de lugares | 1 | 15 | 224.721 |
| Busca de eventos | 1 | 11 | 146.166 |
| Planejador de conteúdo | 1 | 3 | 141.107 |
| Validador de brief | 1 | 3 | 114.024 |
| **Total** | **22** | **158** | **3.911.686** |

Comparação: Chongqing (v1) 4.700.696 → Fenghuang (v2) 3.443.832 → **Guizhou (v3) 3.911.686**. Guizhou ficou **16,8% abaixo do baseline v1**, mas **13,6% ACIMA do v2 (Fenghuang)** — resultado misto, não uma melhora linear. Reportando sem maquiar.

## O que funcionou como esperado (confirmado)

- **Curadoria de imagem**: real ganho limpo. 13 turnos (Guizhou, busca+verificação em lote) vs 24 turnos (Fenghuang, 1 busca+1 verificação por imagem) — quase a metade, com custo efetivo 237k vs 298k. Essa mudança específica (processo em 2 rodadas em lote) funcionou como desenhado.
- **Orquestrador**: 30 turnos (Guizhou, com 14 módulos) vs 36 turnos (Fenghuang, com 12 módulos) — melhorou em termos absolutos E por módulo. As correções (leituras em lote, persistência por lote, montagem em 1 comando) tiveram efeito real, mesmo que modesto.
- **`travel-writer` confirmado sem usar `Write`** (checado no transcript — a reversão do protocolo de arquivo funcionou, nenhum writer tentou persistir em arquivo).

## O que NÃO funcionou / achado novo

- **`travel-writer` continua caro**: 58 turnos para 14 módulos (~4,1/módulo) — bem acima do baseline do Chongqing v1 (30 turnos/12 módulos ≈ 2,5/módulo), mesmo sem usar `Write`. Inspecionando os transcripts: os writers estão gastando turnos extras com `Glob`/`Read` **procurando os arquivos de pesquisa persistidos** (achados de place-finder/event-finder) em vez de já receberem os trechos relevantes embutidos no prompt do orquestrador. No v1, o orquestrador aparentemente já embutia o material relevante direto no prompt de cada `travel-writer`; nos testes v2/v3, o writer teve que ir buscar.
- **Revisor com 2 rodadas** (reprovou por redundância/volume) — isso é variância de qualidade do conteúdo, não do protocolo; mas é caro (567k, quase metade do custo do orquestrador) e infla a comparação total de forma não controlada pelo teste.

## Correção proposta para a próxima rodada (v4)

**Fazer o orquestrador embutir o trecho de pesquisa relevante DIRETO no prompt de cada `travel-writer`** (é literalmente o que o passo 3(b) do `travel-page-assembler` já pedia — "só os trechos de pesquisa relevantes a esse módulo", não "vá ler o arquivo você mesmo") — eliminando a necessidade de `Glob`/`Read` dentro do writer. Isso deve trazer o writer de volta para ~2-3 turnos/módulo.

Não vale a pena tentar eliminar variância de rodadas de revisão — isso é sinal de qualidade real (o revisor pegando redundância de verdade), não desperdício de protocolo.
