# Medição de custo — "depois" (Fenghuang, pipeline v2) — CORRIGIDO

> **Correção (27/08/2026):** ver nota equivalente em `CUSTO-CHONGQING.md` — a medição original somava `cache_read`/`cache_write` duplicado em mensagens com chamadas paralelas. Números abaixo deduplicados por `message.id`.

| Etapa | Chamadas | Turnos reais | Custo efetivo | Delta vs. Chongqing |
|---|---|---|---|---|
| Redatores de módulo | 12 | 59 | 1.171.195 | +7% (turnos quase dobraram: 30→59) |
| Orquestrador | 1 | 36 | 1.166.172 | −42% (mas turnos pioraram: 22→36) |
| Curadoria de imagem | 1 | 24 | 298.492 | −20% (turnos inalterados: 23→24) |
| Revisor final | 1 | 8 | 278.919 | −2% |
| Busca de lugares | 1 | 11 | 163.781 | não comparável (3 categorias → 1) |
| Planejador de conteúdo | 1 | 4 | 132.248 | −54% |
| Busca de eventos | 1 | 8 | 124.257 | +11% |
| Validador de brief | 1 | 3 | 108.769 | +6% |
| **Total** | **19** | **153** | **3.443.832** | **−27%** |

## O que a medição corrigida revelou (e muda o diagnóstico anterior)

1. **O real driver de custo é o número de turnos reais de API, não "quanto se lê no início".** O orquestrador do Fenghuang teve **mais** turnos (36) que o de Chongqing (22) — o protocolo de arquivo adicionou passos mecânicos (criar pasta, ler cada referência em turno separado, montar o arquivo final com `Edit`/`Bash` sequenciais, aplicar correções do revisor uma a uma) que compensaram — e mais — a leitura inicial mais leve.

2. **O protocolo "redator escreve em arquivo" quase dobrou os turnos do próprio redator** (30→59 para os mesmos 12 módulos): responder o texto direto cabe em 1 turno; ler pesquisa + escrever arquivo + responder confirmação precisa de 3+. Para uma tarefa de disparo único (sem acumular ao longo de uma sessão longa como o orquestrador), esse turno extra por módulo custou quase tanto quanto economizou do lado do orquestrador.

3. **Curadoria de imagem não melhorou nos turnos** (23→24) — a orientação "prefira WebSearch/curl a WebFetch" não reduziu o número de rodadas, só evitou puxar página inteira em algumas. O gasto aqui é ~1-2 chamadas por slot de imagem × ~10-12 slots, estrutural, não vai cair sem mudar a estrutura da busca.

4. **O ganho real (−27%) veio majoritariamente de texto mais curto trafegando** (achados/confirmações resumidos), não de "menos acumulação de contexto" como eu supunha.

Ver `pesquisa/_pipeline/PLANO-V3.md` para as mudanças propostas a partir deste diagnóstico.
