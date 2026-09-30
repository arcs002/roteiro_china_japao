---
name: travel-page-assembler
description: Orquestra a escrita de uma página completa (cidade ou atração) despachando UMA invocação de travel-writer por módulo do brief aprovado, nunca uma única invocação para a página inteira. Monta o arquivo final na ordem certa, preservando o brief e as tags de confiança. Use sempre depois que o brief passou por travel-brief-validator, antes de considerar a página escrita.
---

# Travel Page Assembler

Esta skill existe porque despachar uma única invocação de escrita para uma página inteira, mesmo com metas de tamanho generosas, produz conteúdo raso — a atenção se divide entre 10-12 módulos e cada um sai curto. A correção é estrutural: **uma sessão de escrita por módulo**, sempre.

## Quem executa esta skill

Você (o agente principal orquestrando o trabalho), não um subagente — despachar agentes é uma ação do orquestrador, e subagentes normalmente não devem despachar outros subagentes neste ambiente. Trate isto como o "maestro" que chama uma seção da orquestra por vez.

**Toda chamada ao Agent tool nesta skill é síncrona (`run_in_background: false`)** — sub-agentes não recebem notificação automática de conclusão de seus próprios filhos, então uma chamada em background aqui trava sem retomar.

## Gestão de contexto (leia antes de começar — é o que controla o custo desta skill)

O custo real deste pipeline escala com o **número de turnos reais de API do orquestrador** (cada chamada de ferramenta — mesmo uma isolada, como `mkdir` ou um `Read` solto — relê todo o contexto acumulado até ali), não com "quanto se lê no início". Uma medição real comparando duas cidades (`pesquisa/_pipeline/CUSTO-CHONGQING.md`/`CUSTO-FENGHUANG.md`/`PLANO-V3.md`) confirmou isso e também mostrou um erro a não repetir: fazer o `travel-writer` escrever em arquivo e só confirmar, em vez de devolver o texto, **quase dobrou os turnos dele** (30→59 para 12 módulos) — pior do que o problema que tentava resolver. As regras abaixo já incorporam essa lição:

- **Leia `pesquisa/_pipeline/CHEATSHEET.md` e `pesquisa/_pipeline/GOLD-STANDARD-DIGEST.md`** (não o `CLAUDE.md` inteiro nem a página-modelo inteira) — e leia-os **numa única mensagem com múltiplos `Read` em paralelo**, junto com perfil do viajante/voos/arquivo-fonte da página. 5 `Read` sequenciais = 5 turnos pagos; 5 `Read` na mesma mensagem = 1 turno.
- **`travel-writer` devolve o texto do módulo na resposta** (não escreve arquivo — ver nota acima). **Você (orquestrador) persiste cada lote inteiro de módulos recebidos com UMA única operação de arquivo** (heredoc num só comando Bash, ou um só `Write`), nunca uma gravação por módulo.
- **Toda etapa mecânica de várias partes (montagem final, correções pós-revisor) é UM comando/UMA reescrita, não uma sequência de pequenas chamadas.** Ver passos 6 e 9b.

## Processo

1. **Confirme que o brief já passou por [[travel-brief-validator]]** (APROVADO). Sem isso, pare — não monte página sobre brief não validado.

2. **Extraia a lista de módulos do brief**, na ordem em que devem aparecer na página, cada um com: nome, propósito/justificativa (lugar×viajante), piso de palavras (ver tabelas de [[travel-magazine-writer]], ajustadas pelo nível de profundidade do brief), e quais achados de pesquisa (place-finder/event-finder/fonte original) são relevantes especificamente a esse módulo.

3. **Para cada módulo, despache uma chamada de agente `travel-writer` separada**, com um prompt que contém: (a) só a especificação daquele módulo — nome, propósito, piso de palavras; (b) **cole diretamente no prompt o texto dos trechos de pesquisa relevantes a esse módulo** (achados de place-finder/event-finder já persistidos, dados do arquivo-fonte) — não aponte para um caminho de arquivo e deixe o writer ir ler/procurar. Uma medição real mostrou que apontar para arquivo custa 1-2 turnos extras de `Glob`/`Read` por módulo (quase dobrou o custo do redator numa página de 14 módulos); colar o trecho já filtrado no prompt elimina isso. Cole só os trechos relevantes a ESSE módulo, não o dossiê inteiro sem filtro (dilui o foco); (c) o ângulo único e um resumo de 2-3 linhas do brief geral, para consistência de tom entre módulos; (d) instrução explícita: "escreva só este módulo, em profundidade total, seguindo travel-magazine-writer, e devolva o texto na resposta — a pesquisa relevante já está acima, não precisa procurar mais nada."

4. **Despache módulos independentes NA MESMA MENSAGEM, em lotes de 3-4** (múltiplas chamadas de Agent no mesmo turno, não uma por vez) — a maioria dos módulos de uma página são independentes entre si. Módulos que precisam citar algo específico de outro (raro) podem ser despachados depois. O mesmo vale para `travel-place-finder`/`travel-event-finder`: dispare todas as categorias necessárias na mesma mensagem, não uma por turno.

5. **Colete os textos de cada módulo do lote e persista o lote inteiro numa única operação de arquivo** (um `Write`/heredoc por lote — ex. 4 módulos → 1 gravação salvando os 4 arquivos de `pesquisa/_rascunhos/<slug>/`, não 4 gravações separadas). Isso é o meio-termo correto: evita reler os módulos em memória depois (ficam em arquivo), sem custar 1 turno extra de API por módulo (custa 1 turno por lote).

6. **Monte o arquivo final com UM comando Bash só** (não uma sequência de `Read`+`Edit`+`Bash` espalhada por vários turnos): algo como `cat pesquisa/_rascunhos/<slug>/*.md` concatenado com o front matter/blockquote/tabela final, redirecionado direto para o arquivo de destino, numa única chamada. Ordem do conteúdo: (a) **front matter YAML obrigatório** — `type: city|atracao`, `slug`, `title` (formato `"<Nome> — <subtítulo/tagline>"`), `emoji`, `order`, `days: [n, n, ...]`, e para atração também `city: <slug-da-cidade-mãe>` — schema completo em `pesquisa/README.md`; sem isso o build falha ou a página não aparece; (b) `# Título`; (c) bloco de brief citado com `>`; (d) cada módulo com seu `##`, na ordem definida; (e) se houver imagens de [[travel-image-sourcing]], fecha com `## Imagens por seção — pesquisadas` (cabeçalho filtrado do lado do leitor). Depois de confirmar que o arquivo final está correto, apague a pasta de rascunho (`rm -rf`, mesmo comando ou o próximo).

7. **Verifique consistência entre módulos antes de finalizar**: releia rapidamente as transições — como cada módulo foi escrito de forma independente, pode haver repetição entre módulos vizinhos. Corte a redundância você mesmo neste passo.

8. **Entregue o arquivo montado para [[travel-content-reviewer]]** como um todo.

9. **Se o revisor pedir correções, aplique-as como UMA reescrita completa do arquivo (`Write` do conteúdo já corrigido), não como uma sequência de `Edit` pontuais** — a menos que seja literalmente 1 único ponto isolado (nesse caso 1 `Edit` é mais barato que reescrever tudo). A regra é: **1 chamada de ferramenta por rodada de correção**, não N chamadas por N pontos apontados pelo revisor.

10. **Depois de salvar o arquivo, rode `node build/build.js`** e confirme: nenhum erro novo em `validate.js`, a página aparece no lugar certo, as seções foram quebradas corretamente. Combine a checagem (grep/wc) e a ação seguinte no mesmo comando quando possível, em vez de um turno só para checar e outro só para agir.

## Por que não revisar módulo a módulo também

A escrita se beneficia de ser fragmentada (evita diluição de atenção); a revisão se beneficia de ver o todo (pega redundância entre módulos, ângulo inconsistente, desequilíbrio de tom) — são fases com necessidades opostas. Não fragmente a revisão do mesmo jeito que a escrita.

## Sinal de que este processo está funcionando

Se o total de palavras da página final está na faixa de milhares (não de centenas), e você conseguir apontar, por módulo, pelo menos 3-4 parágrafos desenvolvidos — não frases soltas — o processo funcionou. Se a página final ainda sair curta, o problema não é mais estrutural (a fragmentação por módulo já resolveu isso) — é a fonte de pesquisa que não sustenta a profundidade pedida, ou o piso de palavras não foi de fato aplicado na hora de despachar cada módulo.
