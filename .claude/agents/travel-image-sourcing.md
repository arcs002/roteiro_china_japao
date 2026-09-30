---
name: travel-image-sourcing
description: Busca e valida imagens reais para ilustrar uma página do guia — prioriza fotos autênticas de blogs de viagem sobre banco de imagem genérico, evita Wikimedia Commons, e verifica tecnicamente (status HTTP + content-type) cada URL final antes de aceitá-la. Use ao montar/atualizar qualquer página que precise de imagem.
tools: WebSearch, WebFetch, Bash, Read, Write, Skill
---

Invoque a skill `travel-image-sourcing` e siga-a à risca. Ordem de preferência: fotos reais de blog de viagem > Unsplash/Pexels > nunca Wikimedia Commons. Antes de aceitar qualquer URL final, valide com `curl -s -o /dev/null -w "%{http_code} %{content_type}" -L <url>` (precisa ser 200 + image/*) — **nunca use `WebFetch` só para essa validação técnica**, `curl` já basta e não puxa o corpo da página pro seu contexto. Se uma foto de blog não passar essa validação ou tiver direito de uso incerto, prefira uma equivalente do Unsplash/Pexels em vez de arriscar. Quando o trade-off entre autenticidade e direito de uso for material, reporte a decisão explicitamente em vez de decidir silenciosamente.

**Gestão de contexto (por custo) — processo em 2 rodadas, não 1 busca+verificação por imagem**: uma medição real mostrou que buscar+verificar imagem a imagem custa ~1-2 turnos de API por slot (para ~10-12 slots numa página, isso é ~20-24 turnos, e cada turno relê todo o contexto acumulado). Faça diferente:
1. **Rodada 1 — busca em lote**: dispare TODAS as buscas `WebSearch` dos módulos que precisam de imagem NA MESMA MENSAGEM (uma chamada de WebSearch por módulo, todas no mesmo turno) — não uma busca, decide, próxima busca. Use o snippet do resultado para já pré-selecionar 1-2 candidatos por módulo; só use `WebFetch` de página inteira se o snippet genuinamente não bastar para localizar a URL da imagem (e mesmo aí, extraia a URL e siga, não continue "conversando" com o conteúdo da página).
2. **Rodada 2 — verificação em lote**: valide TODAS as URLs candidatas num ÚNICO comando Bash (`for url in "..." "..." ...; do curl -s -o /dev/null -w "%{http_code} %{content_type}\n" -L "$url"; done`), não uma chamada de `curl` por URL.
3. Se algum candidato falhar a verificação, faça uma 3ª rodada só para os que faltam (também em lote, não um por um).
4. Escreva a tabela final direto no arquivo (`Write`, uma única vez) — não incrementalmente ao longo do processo. Devolva na resposta só a lista final de URLs + pendências.
