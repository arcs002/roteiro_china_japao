---
name: travel-final-review
description: Revisão final do guia INTEIRO antes de "fechar a edição" — idioma e estilo (PT-BR editorial, sem clichê, sem metalinguagem, sem tag de pesquisa vazada), qualidade de conteúdo (especificidade, módulos mandatórios, stubs) e coerência do roteiro (calendário vs voos/reservas, numeração de dias, city page ↔ BRIEF-DIA ↔ arquivo de dia, transições entre cidades, hotéis). Roda em 3 fases — auditoria mecânica por script, revisão por pacote de cidade em paralelo, revisão transversal do roteiro — e consolida num relatório único. Use quando o usuário pedir revisão final/geral/de consistência de todas as páginas, não para revisar uma página recém-escrita (isso é travel-content-reviewer).
---

# Travel Final Review

Revisão de fechamento de edição, não de página nova. `travel-content-reviewer` julga UMA página contra o brief dela, logo depois de escrita; esta skill julga o **guia como livro**: tudo no mesmo idioma e voz, nada de bastidor vazando para o leitor, e um roteiro que fecha de ponta a ponta com as reservas reais.

Genérica por desenho: nada aqui sabe de China/Japão. O que é específico da viagem mora no config (`pesquisa/_pipeline/final-review.config.json`: paradas com check-in/check-out/hotel, destinos removidos, pisos de palavra, cabeçalhos de bastidor). Para outro guia, copie e ajuste o config.

## Fontes de verdade (nesta ordem de precedência)

1. `pesquisa/voos.md` + reservas reais (tabela do `pesquisa/perfil-viajantes.md`, espelhada no config) — datas, horários, hotéis.
2. `<!--BRIEF-DIA-->` de cada `## Dia N` na city page — é o contrato do dia; o arquivo de dia deriva dele.
3. `## Lugares reais pesquisados` / `## Eventos...pesquisados` da própria página — nomes, horários, preços, nível de confiança.
4. A prosa. Quando a prosa contradiz 1-3, a prosa está errada.

## Fase 0 — Snapshot + auditoria mecânica (1 comando cada, orquestrador)

```bash
tar -czf pesquisa/_backup/pre-revisao-final-$(date +%Y%m%d-%H%M).tar.gz pesquisa/cidades pesquisa/atracoes pesquisa/dias pesquisa/aprofundamento
node .claude/skills/travel-final-review/scripts/audit.mjs
```

O snapshot é **obrigatório antes de qualquer correção** (o repo pode não ter git). O script grava `pesquisa/_revisao/auditoria-mecanica.md` (+ `.json`) com: calendário global_day→data→cidade, extensão de prosa por página viva, e achados por categoria — `front-matter`, `estrutura` (seções mandatórias, `## Dia N` × `days:`, BRIEF-DIA ausente, day summary fora de 400-600), `roteiro` (numeração de dias que quebra, data fora da estadia, dia sem arquivo, hotel reservado nunca citado), `data` (dia da semana errado), `metalinguagem`, `tag-vazada`, `pendência` (placeholder, `[VERIFICAR`, TODO), `clichê`, `pt-PT`, `destino-removido`, `extensão`. Só páginas vivas (o `.expandido.md` sombreia o `.md` irmão, igual ao build) e só tipos que chegam ao leitor (`city`/`dia`/`atracao`/`pais`/`provincia`).

Regex tem falso positivo — os agentes da fase 1 confirmam cada achado no contexto antes de corrigir.

## Fase 1 — Revisão por pacote de cidade (agentes `travel-final-reviewer`, em paralelo, numa única mensagem)

**Pacote** = city page viva + seus arquivos de dia + suas atrações + `pesquisa/dias/00-<cidade>-assignment.md`. Agrupe cidades pequenas (1-2 dias) em pares para ficar em ~8 agentes; pacotes são disjuntos, então os agentes podem editar em paralelo sem conflito. Passe a cada um: lista exata de arquivos, trecho do calendário/estadia do config, e os achados da fase 0 daquele pacote (copie as linhas do relatório — o agente não precisa reler o relatório inteiro).

Checklist do pacote:

**A. Idioma e estilo**
- PT-BR em todo o texto: sem lusitanismo (comboio, autocarro, pequeno-almoço, "está a fazer"), sem frase em inglês solta onde existe termo em português ("golden window" → "janela de luz"/"melhor horário"; "day trip" ok como nome de módulo só se consistente no guia todo). Nomes próprios locais mantêm grafia pinyin/romaji + caracteres na 1ª menção.
- Voz de livro-reportagem (ver `pesquisa/_pipeline/GOLD-STANDARD-DIGEST.md`): cena concreta, detalhe sensorial amarrado a fato, transição que muda de registro. Nada de tópico solto que devia ser parágrafo, nada de parágrafos seguidos com a mesma estrutura.
- Clichês de agência (lista em `travel-content-reviewer` §6a).
- **Metalinguagem e bastidor vazado** (§6b do reviewer, com extensões): "a pesquisa encontrou/confirma", "o brief", "BRIEF-DIA", "flag operacional", "golden window", "o perfil", referência a skill/agente, "Flags para revisão", nota para "o escritor da city page". Tudo isso some da prosa.
- **Tags de confiança**: `[CONFIRMADO]`/`(PROVÁVEL)`/`NÃO CONFIRMADO` não aparecem para o leitor. A *confiança* sobrevive, a *tag* não: CONFIRMADO → fato direto; PROVÁVEL → "vale confirmar o horário antes de ir"/"segundo moradores"; NÃO CONFIRMADO → "confira antes de ir" ou omitir. As tags continuam valendo em `## Lugares reais pesquisados` (bastidor).
- Consistência terminológica dentro do pacote (mesmo lugar sempre com o mesmo nome; mesma moeda/formato ¥1.200, 6h30, 400 m).

**B. Qualidade de conteúdo**
- Módulos mandatórios de cidade presentes e não vazios: day summary por dia (400-600 palavras + `Sequência/Logística/Ponto de partida` + `<!--BRIEF-DIA-->`), "O que está acontecendo". Arquivo de dia ≥ 1.800 palavras, hora-a-hora de fato.
- Gastronomia/vida noturna/segredo local com lugares reais nomeados (segredo local ≥ 3 lugares distintos); nada de categoria genérica.
- Especificidade: parágrafo sem nome/número/data/detalhe concreto é genérico.
- Repetição: a mesma anedota/fato contado em city page, dia e atração com as mesmas palavras. Uma vez em profundidade + referência curta nas outras.
- Stubs (atração com placeholder): **não escrever** — listar para o pipeline normal (`travel-content-planner` → … → `travel-page-assembler`). Se o stub é de atração que o roteiro nem visita, sugerir remover.
- Menção a destino removido do roteiro (config `removedDestinations`): ok como comparação/contexto ("como em Xi'an…"), erro quando sugere visita ou quando o texto supõe que o viajante passou/vai passar por lá.

**C. Coerência do roteiro dentro do pacote**
- Cada `## Dia N` da city page ↔ arquivo de dia N: mesmas atividades, mesma ordem, horários compatíveis (±30 min), mesmo almoço/jantar, mesmo ponto de partida e retorno. Divergência: vale o BRIEF-DIA, salvo se o BRIEF-DIA for inviável (aí reportar).
- Datas e dia da semana corretos em todo lugar (city page, dia, atração); feriado/evento citado cai de fato na data da visita; horário de funcionamento citado não conflita com o dia da semana (museu que fecha segunda num dia que é segunda).
- Hotel da reserva é o ponto de partida/retorno usado; bairro coerente com ele.
- Chegada (1º dia) e partida (último dia) batem com a transição declarada (modal, horário, estação) — o lado da outra cidade é checado na fase 2.
- Números internos: mesmo preço/horário/distância para a mesma coisa em arquivos diferentes.

**Política de correção** — o agente corrige direto (Edit) só a **Classe A**, e registra cada correção:
- Classe A (corrige): metalinguagem, tag vazada, clichê, lusitanismo/erro de português, jargão em inglês, dia da semana errado com data inequívoca, divergência pontual dia↔BRIEF-DIA (horário, nome de restaurante) quando o BRIEF-DIA é viável, número interno inconsistente quando a fonte (Lugares reais pesquisados) resolve, front matter faltante derivável.
- Classe B (só reporta, com correção proposta): mudança de estrutura do dia/roteiro, renumeração de dias, fato duvidoso sem fonte no próprio arquivo, conteúdo faltante (stub, seção mandatória ausente), contradição que depende de decisão do viajante, qualquer coisa em arquivo fora do pacote.

Nunca reescreva seção inteira por gosto — correção cirúrgica, preservando voz e extensão. Nunca invente lugar/horário/preço para "consertar" uma lacuna.

## Fase 2 — Revisão transversal do roteiro (1 agente `travel-final-reviewer` em modo `roteiro`, junto com a fase 1)

Lê: config, `voos.md`, tabela de datas do perfil, calendário da fase 0, front matter + `## Dia N` (summary + BRIEF-DIA) de todas as city pages, e o primeiro/último bloco de cada arquivo de dia (não os hora-a-hora inteiros). Só reporta (arquivos se sobrepõem aos da fase 1).

- **Calendário**: toda data entre chegada e partida tem dono (dia de cidade, trânsito explícito ou "chegada tardia"); numeração `global_day` contínua e com offset fixo em relação à data; dia de transição não contado duas vezes nem sumido. Propor UMA numeração canônica com tabela de-para, se a atual quebra.
- **Transições**: para cada par de cidades adjacentes, a saída no último dia da cidade A (modal, horário, estação) = chegada no 1º dia da cidade B; duração plausível; nenhum dia assume estar em dois lugares.
- **Energia e ritmo no livro todo**: sequências de madrugadas seguidas, dias vazios, mesmo tipo de experiência repetido em cidades seguidas.
- **Estilo entre cidades**: mesma terminologia, mesmo formato de números/horários, mesmo esqueleto de day summary; aberturas intercambiáveis entre cidades; o mesmo "truque" narrativo repetido em várias aberturas.
- **Aprofundamento**: páginas `pais`/`provincia` coerentes com o roteiro confirmado (não citam destino removido como visita).
- **Coerência com o perfil**: trabalho remoto noturno onde o perfil diz; interesses prioritários presentes em proporção.

## Fase 3 — Consolidação (orquestrador, 1 Write)

Cada agente grava seu próprio relatório em `pesquisa/_revisao/<pacote>.md` (é o produto final dele — mesma regra do place-finder) e devolve só um resumo curto. O orquestrador escreve `pesquisa/_revisao/REVISAO-FINAL.md`:

1. Veredito por pacote (PRONTO / PRONTO COM RESSALVAS / NÃO PRONTO) em uma tabela.
2. Correções Classe A aplicadas — contagem por categoria e por pacote (detalhe fica nos relatórios de pacote).
3. Classe B priorizada: bloqueadores de roteiro primeiro (calendário, transições), depois conteúdo faltante, depois o resto — cada item com arquivo, problema, correção proposta e quem executa (usuário decide / pipeline X).
4. Re-rodar `node .claude/skills/travel-final-review/scripts/audit.mjs` e `node build/build.js` depois das correções e colar o resumo antes/depois.

Máximo 1 rodada de correção automática. O que sobrar vai para o usuário — não itere até "zerar" o relatório.

## Custo

Mesma disciplina de `pesquisa/_pipeline/CHEATSHEET.md`: fase 1 + fase 2 disparadas numa única mensagem; cada agente lê seu pacote em 1-2 mensagens de `Read` em paralelo; correções Classe A por arquivo agrupadas (várias `Edit` na mesma mensagem, ou 1 script quando for substituição mecânica repetida, como tags vazadas).
