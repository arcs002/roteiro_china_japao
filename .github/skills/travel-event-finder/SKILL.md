---
name: travel-event-finder
description: Pesquisa o que estará acontecendo de fato numa cidade/lugar nas datas exatas da visita — eventos pontuais, festivais recorrentes e atividades/fenômenos sazonais — e monta a matéria-prima da seção mandatória "O que está acontecendo" de toda página de cidade. Use sempre que uma página tiver data de visita conhecida. A seção nunca é omitida: mesmo sem festival, a busca cobre o que está sazonalmente ativo.
---

# Travel Event Finder

Seu trabalho é responder, com evidência real: **o que vai estar acontecendo nesse lugar, nessas datas exatas** — e alimentar a seção **"O que está acontecendo"**, que é módulo mandatório de toda página de cidade (ver guardrail em [[travel-section-selector]]), não um extra descartável. Pense nos exemplos que motivaram esta skill: chegar em Ottawa no dia 1º de julho e ser o Canada Day, ou estar em Montreal durante o Jazz Festival — o tipo de coincidência de calendário que muda a experiência e que um guia sério não pode deixar de mencionar.

## Processo

1. **Cheque a data fixa contra três camadas do que normalmente acontece ali**, nesta ordem de busca:
   - **Eventos pontuais anunciados para o ano da viagem** — festivais, shows, feiras, jogos, aberturas temporárias, obras/interdições conhecidas.
   - **Feriados e datas cívicas/nacionais fixas ou móveis** que caem na janela da visita (feriado nacional do país anfitrião, feriado local da cidade/província, calendário lunar chinês/japonês, Golden Week, etc.) — mesmo sem "festival" nomeado, um feriado nacional muda multidão, horário de comércio e transporte.
   - **Atividades e fenômenos sazonais recorrentes**, ainda que sem nome de evento formal: temporada de determinada comida/fruta, floração ou folhas de outono, temporada de neve/gelo, horário de nascer/pôr do sol naquela época, festivais de luz recorrentes, feiras de rua sazonais, o que a cidade "faz" tipicamente naquele mês.

2. **Distinga o que é conhecido do que é projeção.** Para datas no futuro distante (viagens planejadas com mais de alguns meses de antecedência), eventos pontuais de anos específicos costumam não estar anunciados ainda. Nesse caso, diferencie explicitamente: "evento anual recorrente, historicamente ocorre nesta janela, alta probabilidade de se repetir" vs. "evento pontual, não há anúncio para o ano da viagem, recomendo reconfirmar mais perto da data". Fenômenos puramente sazonais (clima, safra, luz do dia) não têm essa incerteza e podem ser afirmados com confiança normal.

3. **Nunca invente um evento nem a data exata de um evento não confirmado para o ano em questão.**

4. **Monte o conteúdo da seção, proporcional ao que foi encontrado — nunca "nada, logo omitir":**
   - **Achado principal com peso real** — o evento/feriado acontece no local exato e na janela exata da visita, e muda de forma real o que o viajante vê/faz (rota bloqueada, atração fechada, multidão atípica, ou — positivamente — uma experiência única que só existe naquela janela). Isso vira o corpo principal da seção.
   - **Achado de contexto regional** — acontece no país/região mas não afeta diretamente esta cidade/data específica, ou afeta de forma menor (ex.: só aumenta um pouco o movimento). Vira parágrafo de contexto dentro da mesma seção, não nota de rodapé separada.
   - **Nenhum evento pontual** — a seção não desaparece: monte-a com as camadas sazonais do passo 1 (clima, luz do dia, o que está na safra, o que a cidade costuma sediar nessa época mesmo sem edição confirmada para o ano). Declare explicitamente que a checagem de eventos pontuais foi feita e nada específico foi encontrado ("verificado, nenhum evento pontual confirmado para 31/10–02/11/2026 em Xi'an") — isso é diferente de simplesmente não ter pensado no assunto, e continua sendo diferente de a seção ficar vazia.

## Saída esperada

**Persista o material completo em arquivo** (o que foi buscado em cada camada, o que foi encontrado ou "nada encontrado", nível de confiança de cada item) na seção "Eventos/sazonalidade pesquisados" do arquivo-fonte da página. A resposta final para quem chamou é só um resumo curto (3-5 linhas) + o caminho do arquivo — não o material inteiro em prosa, por custo (ver nota equivalente em [[travel-place-finder]]). O [[travel-page-assembler]] despacha esta seção como módulo próprio para o `travel-writer`, apontando para esse arquivo persistido, com piso de palavras definido em [[travel-magazine-writer]], igual a qualquer outro módulo mandatório de cidade.
