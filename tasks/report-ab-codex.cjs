const fs=require('fs');const path=require('path');const cp=require('child_process');const crypto=require('crypto');
const root=path.resolve(__dirname,'..');const baseDir=path.join(root,'pesquisa/_revisao/ab-test');const out=path.join(baseDir,'codex-2026-10-01');
const audit=JSON.parse(fs.readFileSync(path.join(out,'audit.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
if(audit.runs.length!==4||audit.runs.some(r=>!r.sha256))throw new Error('Quatro candidatos finais são necessários.');
const names={'gpt-6-astra':'GPT-6 Astra','gpt-5.6-sol':'GPT-5.6 Sol','gpt-6.1-sol':'GPT-6.1 Sol','gpt-5.6-terra':'GPT-5.6 Terra'};
const number=n=>n.toLocaleString('pt-BR');
const blindPath=path.join(out,'candidate-map.json');let map;
if(fs.existsSync(blindPath))map=JSON.parse(fs.readFileSync(blindPath,'utf8'));
else{const order=[...audit.runs.map(r=>r.model)];for(let i=order.length-1;i>0;i--){const j=crypto.randomInt(i+1);[order[i],order[j]]=[order[j],order[i]];}map=Object.fromEntries(order.map((m,i)=>[m,String.fromCharCode(65+i)]));fs.writeFileSync(blindPath,JSON.stringify(map,null,2)+'\n');}
const blindDir=path.join(out,'blind-candidates');fs.mkdirSync(blindDir,{recursive:true});
for(const r of audit.runs){fs.copyFileSync(path.join(out,r.model,'candidate.md'),path.join(blindDir,`candidate-${map[r.model].toLowerCase()}.md`));r.commit=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:r.cwd,encoding:'utf8',windowsHide:true}).trim();}
const link=(r,file)=>`codex-2026-10-01/${r.model}/${file}`;
const harness=r=>r.model==='gpt-6.1-sol'?'Codex · subagente nativo':'Codex CLI';
const short=r=>r.sectionFloors.filter(s=>!s.meetsFloor);
const fmtSeconds=n=>`${Math.floor(n/60)}min ${Math.round(n%60)}s`;
const lines=[
'# Teste A/B de modelos — Codex · `aprofundamento/paises/china/etnias.md`','',
'**Data:** 01/10/2026 · **Tarefa:** reescrever a página “China — Etnias” com `travel-deepdive-writer`, usando o mesmo prompt nos quatro modelos.','',
'**Rubrica para avaliação posterior:** [RUBRICA.md](RUBRICA.md) (v2). **Artefatos desta rodada:** [codex-2026-10-01/](codex-2026-10-01/). **Referência de formato:** [TesteABClaude.md](TesteABClaude.md).','',
'---','','## 1. Resultado','',
'**Quatro candidatos produzidos em branches independentes. Avaliação editorial pendente:** as linhas seguem a ordem solicitada, sem ranking nem notas inventadas. As notas do experimento anterior não foram reaproveitadas.','',
'| Pos. | Letra | Modelo | Ferramenta | Palavras | Aval. 1 | Aval. 2 | **Média** | Leitura |',
'|---|---|---|---|---:|---|---|---|---|',
...audit.runs.map(r=>`| — | ${map[r.model]} | **${names[r.model]}** | ${harness(r)} | ${number(r.words)} | Pendente | Pendente | **—** | ${short(r).length?'⚠ pisos por seção (§4)':'Pronto para avaliação'} |`),'',
'Os avaliadores desta rodada ainda não foram definidos. Os cabeçalhos Haiku/Sonnet do exemplo representam avaliações históricas e não se aplicam automaticamente a estes textos.','',
'## 2. Candidatos e branches','',
'| Letra | Modelo | Branch | Commit | Texto e evidências |','|---|---|---|---|---|',
...audit.runs.map(r=>`| ${map[r.model]} | ${names[r.model]} | \`${r.branch}\` | \`${r.commit.slice(0,8)}\` | [Texto](${link(r,'candidate.md')}) · [Diff](${link(r,'candidate.patch')}) · [Resposta](${link(r,'final-response.md')}) · [Build](${link(r,'verified-build.log')}) |`),'',
`Base comum: \`${audit.base}\`. Os quatro worktrees começaram com o mesmo SHA-256 do arquivo original: \`${manifest.runs[0].sourceHash}\`. Cada commit altera somente \`pesquisa/aprofundamento/paises/china/etnias.md\`. A versão de \`main\` permanece na base original; os registros do experimento estão reunidos nesta pasta para publicação no repositório.`,
'','| Modelo | SHA-256 do candidato (bytes originais) |','|---|---|',
...audit.runs.map(r=>`| ${names[r.model]} | \`${r.sha256}\` |`),'',
'## 3. Método','',
'1. Quatro branches e worktrees separados, criados do mesmo commit. Nenhuma execução recebeu o histórico desta conversa, o relatório anterior, suas notas ou textos candidatos anteriores.','2. Sparse checkout ocultou `pesquisa/_revisao/ab-test/` e `pesquisa/_backup/` de todos os candidatos. Instruções iguais proibiram consultar outros worktrees, branches ou resultados. Trata-se de isolamento de contexto e arquivos, não de uma barreira de segurança contra acesso deliberado ao restante do disco.','3. [Prompt integral](codex-2026-10-01/prompt.txt) idêntico, raciocínio `medium`. [Instruções comuns de execução](codex-2026-10-01/execution-instructions.txt) orientaram o uso da skill, o escopo de um único arquivo e a preservação do modelo em eventual delegação.','4. Astra, GPT-5.6 Sol e Terra rodaram no Codex CLI 0.155.1, com `web_search=live`, configuração pessoal ignorada e execução sem interação. Logs JSONL e respostas finais foram preservados.','5. **Exceção documentada:** o endpoint do CLI recusou GPT-6.1 Sol com HTTP 400 (“model is not supported when using Codex with a ChatGPT account”). A tentativa não alterou o candidato. O modelo foi então executado pelo subagente nativo do Codex, com `model=gpt-6.1-sol`, `reasoning_effort=medium`, histórico não herdado e o mesmo prompt no worktree reservado. O conjunto de ferramentas e as instruções de sistema diferem do CLI. [Registro](codex-2026-10-01/gpt-6.1-sol/native-execution.json).','6. Os resultados foram preservados como entregues pelos modelos. O orquestrador repetiu o build e mediu palavras, front matter, arquivos alterados, links internos e sobreposição de texto; não reescreveu os candidatos para melhorar notas.','7. Cópias neutras foram sorteadas como A–D em [blind-candidates/](codex-2026-10-01/blind-candidates/). Para uma futura avaliação cega, fornecer somente essas cópias, a rubrica e uma nova checagem factual; não fornecer este relatório nem o mapa de autoria.','',
'O registro de eventos por `codex exec --json` segue o mecanismo descrito na [documentação oficial de avaliação de skills](https://developers.openai.com/blog/eval-skills). A disponibilidade efetiva foi comprovada pelas execuções locais, não inferida do catálogo.','',
'## 4. Verificações mecânicas','',
'| Critério | GPT-6 Astra | GPT-5.6 Sol | GPT-6.1 Sol | GPT-5.6 Terra |','|---|---:|---:|---:|---:|',
`| Palavras do corpo | ${audit.runs.map(r=>number(r.words)).join(' | ')} |`,
`| Piso total ≥2.000 | ${audit.runs.map(r=>r.floorMet?'OK':'FALHA').join(' | ')} |`,
`| Seções H2 | ${audit.runs.map(r=>r.sections.length).join(' | ')} |`,
`| Front matter preservado | ${audit.runs.map(r=>r.frontMatterPreserved?'OK':'FALHA').join(' | ')} |`,
`| Abertura e Encerramento | ${audit.runs.map(r=>r.hasOpening&&r.hasClosing?'OK':'FALHA').join(' | ')} |`,
`| Build: código de saída | ${audit.runs.map(r=>r.buildExit).join(' | ')} |`,
`| Avisos totais / novos | ${audit.runs.map(r=>r.warnings+' / '+r.newWarnings.length).join(' | ')} |`,
`| Links internos inexistentes | ${audit.runs.map(r=>r.brokenLinks.length).join(' | ')} |`,
`| Arquivos de fonte alterados | ${audit.runs.map(r=>r.changedFiles.length).join(' | ')} |`,
`| Seções abaixo do piso | ${audit.runs.map(r=>short(r).length).join(' | ')} |`,
`| Tags [VERIFICAR] | ${audit.runs.map(r=>r.verificationTags).join(' | ')} |`,'',
'**Contagem:** corpo sem front matter, dividido por espaços em branco; títulos, marcadores e URLs presentes no corpo entram na contagem, como em uma contagem mecânica de tokens separados por whitespace. A mesma implementação foi aplicada aos quatro arquivos, independentemente da contagem autorreportada. Detalhamento em [audit.json](codex-2026-10-01/audit.json).','',
'**Pisos por seção:** 250 palavras para Abertura/Encerramento e 600 para cada seção temática, conforme a skill. Ultrapassar a faixa total esperada de 2.000–4.000 não é, por si só, falha: os pisos por seção continuam aplicáveis.','',
'| Modelo | Seções abaixo do piso (medição independente) |','|---|---|',
...audit.runs.map(r=>`| ${names[r.model]} | ${short(r).length?short(r).map(s=>`${s.title}: ${s.words}/${s.floor}`).join('; '):'Nenhuma'} |`),'',
'As sete dimensões da rubrica — precisão factual, cobertura, profundidade, ancoragem, qualidade editorial, calibração e conformidade — permanecem sem pontuação. O build e a quantidade de palavras não substituem essa avaliação.','',
'## 5. Integridade e independência','',
'| Par | Parágrafos longos idênticos | Sobreposição de sequências de 8 palavras (Jaccard) |','|---|---:|---:|',
...audit.similarities.map(s=>`| ${names[s.a]} × ${names[s.b]} | ${s.sharedLongParagraphs} | ${(100*s.eightWordJaccard).toFixed(2).replace('.',',')}% |`),'',
'Parágrafo longo = pelo menos 30 palavras, com espaços normalizados. A medida Jaccard usa sequências contíguas de oito palavras normalizadas. Hashes diferentes e baixa sobreposição ajudam a detectar cópias como as do teste anterior; não constituem prova absoluta de independência estatística ou ausência de influências comuns.','',
'## 6. Avisos e anomalias de execução','',
`O build original já produzia **${audit.baselineWarnings} avisos**: 15 avisos de metadados/referências (cinco arquivos de assignment sem título e dez referências a províncias sem página) e seis avisos de imagens não usadas nos módulos. [Lista completa](codex-2026-10-01/baseline-warnings.md).`,
'',...audit.runs.map(r=>`- **${names[r.model]}:** build ${r.buildExit===0?'aprovado':'falhou'}; ${r.warnings} avisos, ${r.newWarnings.length} novos em relação à base. ${r.newWarnings.length?r.newWarnings.join('; '):''}`),
'','O CLI também registrou avisos de infraestrutura sobre snapshots de PowerShell e, em Astra/Sol, acesso ao cache compartilhado de skills/plugins. A skill do projeto foi lida diretamente do worktree. Esses registros são distintos dos avisos do build e estão nos arquivos `stderr.log`. A recusa do GPT-6.1 Sol permanece preservada em seus logs de tentativa CLI.','',
'## 7. Métricas de execução e limitações','',
'| Modelo | Ferramenta | Duração da execução CLI | Buscas web concluídas no log principal | Tokens de entrada / cache / saída no turno principal |','|---|---|---:|---:|---|',
...audit.runs.map(r=>{const run=manifest.runs.find(x=>x.model===r.model),u=r.usage;return `| ${names[r.model]} | ${harness(r)} | ${r.model==='gpt-6.1-sol'?'Não medida de forma equivalente':fmtSeconds(run.durationSeconds)} | ${r.model==='gpt-6.1-sol'?'Não medida de forma equivalente':r.cliWebSearchCalls} | ${u?`${number(u.input_tokens)} / ${number(u.cached_input_tokens)} / ${number(u.output_tokens)}`:'Não disponível em formato equivalente'} |`;}),'',
'- Uma tarefa e uma amostra por modelo. Não é um ranking geral de capacidade.','- A mudança de harness do GPT-6.1 Sol é um fator de confusão explícito: diferenças podem vir do modelo, das ferramentas ou das instruções de sistema.','- Duração inclui pesquisa, chamadas de ferramenta e esperas; houve execuções concorrentes. Tokens e buscas do log principal não são apresentados como custo total de uma árvore de subagentes. Custos monetários não foram estimados.','- Não houve revisão factual independente, dupla avaliação cega nem arbitragem nesta rodada. As referências incluídas nos candidatos ainda precisam de checagem editorial.','- Correção posterior: `audit.mjs` existe em `.claude/skills/travel-final-review/scripts/audit.mjs`; a busca inicial não o localizou na pasta oculta. A rodada unificada o executa em todos os candidatos. `tasks/audit-ab-codex.cjs` é uma verificação complementar diferente.','',
'## 8. Próxima comparação','',
'Usar os quatro arquivos neutros com a mesma rubrica e uma checagem factual nova. Fixar os avaliadores antes de abrir o mapa e registrar suas justificativas por dimensão. Somente depois preencher notas, médias e posições na tabela de resultado. Os resultados históricos podem entrar como outra rodada, com as diferenças de protocolo identificadas.','',
'## 9. Reprodução e arquivos','',
'- [Manifesto da execução](codex-2026-10-01/manifest.json): base, modelos, parâmetros, diretórios, horários e códigos de saída do CLI.','- [Prompt](codex-2026-10-01/prompt.txt) e [instruções comuns](codex-2026-10-01/execution-instructions.txt).','- [Auditoria mecânica](codex-2026-10-01/audit.json) e [mapa A–D](codex-2026-10-01/candidate-map.json).','- Em cada pasta de modelo: `candidate.md`, `candidate.patch`, `final-response.md`, `verified-build.log`, `metrics.json` e logs/procedência disponíveis.','- Worktrees em `.claude/worktrees/codex-<modelo>-etnias/`; versões preservadas nos commits da seção 2.','',
'```powershell','node tasks/ab-status.cjs','node tasks/audit-ab-codex.cjs','node tasks/report-ab-codex.cjs','```','',
'`tasks/run-ab-codex.cjs` preserva o comando de lançamento e impede sobrescrever a execução existente. Uma nova rodada precisa de outro diretório, outros nomes de branch e registro explícito da exceção GPT-6.1 Sol.',''
];
if(fs.existsSync(path.join(baseDir,'test-ab-unified.md')))lines.splice(2,0,'> Atualização: a avaliação factual/editorial foi concluída no [relatório unificado](test-ab-unified.md), incluindo os candidatos anteriores. Abaixo permanece o registro da etapa de geração.','');
fs.writeFileSync(path.join(baseDir,'test-ab-codex.md'),lines.map(line=>line.trimEnd()).join('\n'));
fs.writeFileSync(path.join(out,'final-commits.json'),JSON.stringify(audit.runs.map(({model,branch,commit,sha256})=>({model,branch,commit,sha256})),null,2)+'\n');
console.log(path.join(baseDir,'test-ab-codex.md'));
