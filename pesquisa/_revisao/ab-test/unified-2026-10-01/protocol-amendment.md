# Ajuste de execução após validação da primeira passagem

Data: 01/10/2026. A rubrica e os candidatos permanecem inalterados. Os vereditos factuais foram fechados antes de ambas as passagens.

A primeira execução enviou os onze textos juntos a Haiku 4.5 e GPT-6 Sol. A conferência automática detectou citações inexatas e troca de trechos entre candidatos, especialmente no Haiku. Houve ainda uma falha de serialização JSON (aspas internas não escapadas), reparada sem mudar o conteúdo para permitir a inspeção. As respostas, notas e validação originais permanecem em `judges/score/`, mas foram descartadas integralmente do ranking.

A pontuação foi refeita nos MESMOS dois modelos, agora em uma sessão nova por candidato: 22 sessões independentes, no máximo quatro execuções simultâneas. Cada par de sessões recebeu exatamente o mesmo texto, rubrica, subconjunto de fatos já auditados, métricas e contexto das páginas existentes. Nenhuma sessão recebeu a avaliação anterior, notas de outro avaliador ou identidades dos candidatos.

Para garantir citações literais, cada pacote inclui um banco de trechos extraído mecanicamente somente daquele candidato. O avaliador escolhe um `quoteId`; o coletor insere o trecho correspondente, sem alterar nota ou justificativa. Os bancos incluem front matter e fragmentos contíguos do texto. Os IDs e o pertencimento de cada trecho ao candidato são validados por script.

Falhas estritamente sintáticas de JSON (aspas internas sem escape ou delimitadores finais redundantes) podem ser reparadas deterministicamente pelo coletor. Cada reparo fica em `normalization-log.json`, junto da resposta bruta preservada. Essa operação não altera palavras das justificativas, números ou IDs escolhidos.

A mudança reduz a possibilidade de confusão entre textos em contexto longo. Não altera pesos, faixas, tetos, fatos, critérios de aprovação ou composição da dupla. Os pacotes de cada candidato e seus hashes foram registrados antes da execução. Resultados da primeira passagem nunca são combinados com a segunda.
