---
name: travel-place-finder
description: Busca e valida lugares reais e específicos (restaurante, café, doceria, mercado, bar) para uma categoria e localização dadas — nome real, status de funcionamento, avaliação/popularidade, sinal de ser lugar de local vs. armadilha turística. Use sempre que um módulo de gastronomia/compras/vida noturna precisar de nomes reais de estabelecimento, nunca preencha esse tipo de módulo só com tipos de prato/categoria genérica.
---

# Travel Place Finder

Seu trabalho é achar **nomes reais de lugares**, não categorias. "Prove yangrou paomo em Xi'an" não é um resultado desta skill — "Lao Sun Jia (老孙家), fundado em 1898, uma das casas mais antigas de yangrou paomo da cidade" é.

## Processo

1. **Busque por lugar específico, não por prato genérico.** Combine cidade + categoria + termos que filtram para autenticidade local: "onde os locais comem", "local favorite", "hidden gem", "melhor avaliado", em português, inglês e (quando fizer diferença) no idioma local. Rodadas de busca separadas por categoria (restaurante âncora, café, doceria/sorveteria, mercado de comida, bar/vida noturna) tendem a achar mais que uma busca genérica única.

2. **Cuidado com o viés de fonte.** Sites de turismo em inglês (TripAdvisor, blogs de viagem genéricos) tendem a repetir os mesmos 5 lugares turísticos. Para achar o que os locais realmente frequentam, procure também: fóruns de expatriados (Reddit r/<cidade>, r/china, foros de expat locais), blogs escritos por quem mora no lugar (não só quem visitou uma vez), e — em mercados onde a referência ocidental (Google Maps/Reviews) não é a autoridade local, como a China — sinalize isso e busque também por menções a Dianping (大众点评), Xiaohongshu (小红书), Baidu Maps, Meituan, mesmo que você não consiga ler/acessar a plataforma diretamente: procure blogs e threads que citam avaliações dessas plataformas, ou que mencionem "segundo o Dianping..." como evidência indireta.

3. **Valide que o lugar ainda existe.** Restaurantes fecham. Antes de aceitar um nome, procure menção recente (idealmente dos últimos 1-2 anos) confirmando que ainda está aberto. Menção de 2015 sem nada depois é sinal de alerta, não confirmação.

4. **Classifique a confiança de cada achado:**
   - **CONFIRMADO** — múltiplas fontes independentes e recentes concordam que existe, funciona, e é bem avaliado.
   - **PROVÁVEL** — encontrado, mas só numa fonte, ou a fonte mais recente já tem alguns anos.
   - **NÃO CONFIRMADO** — mencionado en passant, sem conseguir validar status atual.
   Sempre declare o nível — nunca apresente PROVÁVEL ou NÃO CONFIRMADO como se fosse CONFIRMADO.

5. **Nunca invente um nome de estabelecimento.** Se a busca não achar nada real e específico para uma categoria, diga explicitamente "não encontrado" — isso é uma saída válida e útil, não uma falha. É melhor a página de gastronomia ficar sem um item específico do que ter um nome fabricado que o viajante não vai encontrar.

5.1. **Para a categoria "hidden gem"/"o que só quem mora aqui sabe" especificamente: nunca pare no primeiro achado.** Busque candidatos em categorias variadas — um parque/ritual matinal, um hábito de fim de tarde, um costume de fim de semana, um lugar de comércio/ofício não-turístico, uma tradição sazonal — e entregue no mínimo 3-4 candidatos distintos, mesmo que alguns fiquem como NÃO CONFIRMADO. Um único achado "bom" não é suficiente para este tipo de módulo, que por natureza é uma coleção de flagrantes da vida real do lugar, não um estudo de caso aprofundado de um único ponto.

6. **Capture o essencial de cada candidato**: nome (com caracteres originais e romanização/nome em inglês se houver), bairro/endereço aproximado, horário se encontrado, o que o torna notável (especialidade, tempo de existência, o que os locais dizem), e por que é ou não recomendado para o perfil deste viajante específico.

## Saída esperada

**Persista o achado completo em arquivo** (nome, nível de confiança, 1-2 linhas do que o torna notável, fonte(s), nota de adequação ao perfil) na seção "Lugares reais pesquisados" do arquivo-fonte da página — não devolva isso em prosa para quem chamou. A resposta final é só uma lista curta (nome — tag, 1 por linha) + o caminho do arquivo. Isso existe por custo: quem chama esta skill (o orquestrador) acumula tudo que recebe em prosa através de vários turnos; escrever direto no arquivo evita essa acumulação. Itens "não encontrado" ainda aparecem explicitamente na lista curta (ex. "doceria — não encontrado"), nunca omitidos silenciosamente.
