# Medição de custo — baseline "antes" (Chongqing, pipeline v1) — CORRIGIDO

> **Correção (27/08/2026):** a primeira versão deste arquivo somava `cache_read`/`cache_write` por linha de transcript sem deduplicar. Uma mensagem do orquestrador com N chamadas de `Agent` em paralelo gera N linhas de log (1 "thinking" + N `tool_use`), todas carregando o **mesmo** valor de `cache_read`/`cache_write` (só `output_tokens` varia) — contar todas infla o total pelo tamanho do lote. Números abaixo já deduplicados por `message.id` (1 registro por turno real de API).

Medido a partir do transcript local da sessão que gerou `pesquisa/cidades/03-chongqing.expandido.md` (~16.200 palavras).

| Etapa | Chamadas | Turnos reais | Custo efetivo |
|---|---|---|---|
| Orquestrador | 1 | 22 | 1.994.564 |
| Redatores de módulo | 12 | 30 | 1.094.754 |
| Busca de lugares | 3 | 31 | 452.034 |
| Curadoria de imagem | 1 | 23 | 371.623 |
| Revisor final | 1 | 6 | 283.729 |
| Planejador de conteúdo | 2 | 7 | 289.065 |
| Busca de eventos | 1 | 5 | 112.052 |
| Validador de brief | 1 | 3 | 102.876 |
| **Total** | **22** | **127** | **4.700.696** |

**Causa raiz real**: o custo escala com o número de **turnos reais de API** (cada chamada de ferramenta — mesmo um `Read` ou `mkdir` isolado — relê todo o contexto acumulado) multiplicado pelo tamanho desse contexto. Não é "pesquisa demais"; é volume de idas-e-voltas × contexto acumulado a cada uma.

Ver `pesquisa/_pipeline/CUSTO-FENGHUANG.md` para a comparação "depois" (pipeline v2: digests condensados + protocolo de handoff por arquivo) e `pesquisa/_pipeline/PLANO-V3.md` para o que essa medição revelou e o que tentar a seguir.
