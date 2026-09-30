---
name: travel-image-sourcing
description: Encontra e valida imagens reais para ilustrar uma página do guia — prioriza fotos autênticas de viajantes/blogs de viagem sobre bancos de imagem genéricos e evita Wikimedia Commons (histórico de bloqueio de hotlink). Verifica que a URL final funciona antes de referenciá-la no guia. Use ao montar/atualizar qualquer página que precise de imagem.
---

# Travel Image Sourcing

Uma imagem vale mais que mil palavras — o guia deve ser inteiramente ilustrado. Mas a imagem certa é a que parece real, não a foto de banco genérica que poderia ilustrar qualquer lugar do mundo.

## Preferência declarada (nesta ordem)

1. **Fotos reais de blogs de viagem** — cenas específicas, luz real, o lugar como ele realmente é, não composição de banco de imagem. É a preferência declarada para este guia.
2. **Unsplash/Pexels** — como alternativa quando não há foto de blog viável de usar, por serem licenciadas para reuso livre e servidas com CORS habilitado (funcionam de forma confiável embutidas no HTML, ao contrário da maioria dos outros sites).
3. **Evite Wikimedia Commons** — histórico de bloqueio de hotlink registrado neste projeto; não vale o esforço mesmo quando a imagem em si é boa.

## O problema que esta skill precisa resolver conscientemente: direito de uso

Fotos de blog de viagem, diferente de Unsplash/Pexels, **normalmente não são licenciadas para reuso livre** e o servidor de origem pode não ter CORS habilitado (o mesmo problema que already descartou o Wikimedia) — ou seja, mesmo achando a foto perfeita num blog, ela pode simplesmente não carregar quando embutida, ou levantar uma questão de direito de imagem que não existe com Unsplash/Pexels. Trate assim:

- Use blogs de viagem para **decidir o que fotografar/qual cena vale a pena** (ângulo, momento do dia, o que realmente parece autêntico) — isso é pesquisa visual, não sourcing final.
- Para a URL que de fato vai para o `IMGS`/`data-img-key` do guia, **verifique tecnicamente antes de aceitar**: `curl -s -o /dev/null -w "%{http_code} %{content_type}" -L <url>` precisa retornar `200` e `image/*`. Se a foto de blog passar nesse teste (hospedagem própria com CORS aberto, sem hotlink block), pode usar. Se falhar, ou se não houver clareza sobre direito de reuso, prefira uma foto de Unsplash/Pexels que capture a mesma cena/ângulo identificado na pesquisa de blog.
- Isso é uma escolha de risco que vale expor ao usuário quando a diferença importar de verdade (ex.: "achei a foto perfeita num blog X, mas não tem CORS/licença clara — uso uma equivalente do Unsplash, ou você prefere que eu baixe e hospede localmente só para uso pessoal offline?"). Não decida isso silenciosamente quando o trade-off for material.

## Processo

1. Busque na web por descrições específicas da cena desejada (não "Xi'an city wall" genérico — "Xi'an city wall sunset cycling autumn" ou equivalente), incluindo termos que filtrem para blog de viagem pessoal (ex. "my trip", nome de blogueiro, primeira pessoa) em vez de banco de imagem.
2. Encontre 2-3 candidatos por imagem necessária, priorizando a ordem de preferência acima.
3. Verifique tecnicamente a URL final (curl, conforme acima) antes de fixá-la no guia.
4. Documente a fonte de cada imagem usada (URL + de onde veio) para poder trocar depois se quebrar.

## Skill vs. agente

Esta é uma tarefa de busca iterativa + verificação técnica + julgamento de autenticidade — mais pesada que um lookup simples. Recomenda-se um agente dedicado (`travel-image-sourcing`, com WebSearch/WebFetch/Bash) que segue esta skill, em vez de fazer isso inline dentro do planejador ou do redator.

## Gestão de contexto (por custo) — o real problema é número de turnos, não volume lido

Uma medição real (`pesquisa/_pipeline/PLANO-V3.md`) mostrou que o custo escala com o número de turnos de API, e um agente que faz 1 busca + 1 verificação por imagem, repetido para 10-12 módulos, gasta ~20-24 turnos — cada um relendo todo o contexto acumulado. A correção é estrutural, não só "leia menos por busca":

1. **Busque TODOS os módulos numa única mensagem em lote** (uma chamada de `WebSearch` por módulo, todas despachadas juntas) — não busca → decide → busca do próximo.
2. **Verifique TODAS as URLs candidatas num único comando Bash** (loop `for` testando todas de uma vez), não um `curl` por URL.
3. **Prefira o snippet do `WebSearch` a um `WebFetch` de página inteira** sempre que o snippet já bastar para localizar a URL. `WebFetch` completo só quando genuinamente necessário.
4. Escreva a tabela final **de uma vez** (1 `Write`), não incrementalmente ao longo do processo.
5. **Para páginas com 8+ módulos precisando de imagem, quem orquestra deve considerar despachar dois agentes de curadoria em paralelo**, cada um com metade dos módulos, cada um já seguindo o processo em lote acima.
