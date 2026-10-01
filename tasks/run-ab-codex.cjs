const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'pesquisa/_revisao/ab-test/codex-2026-10-01');
const target = 'pesquisa/aprofundamento/paises/china/etnias.md';
const base = 'd8de411c19ce21847fe0cb1c717d65e3f5c794d5';
const cli = 'C:/Users/MarcoMattos/AppData/Roaming/npm/node_modules/@openai/codex/bin/codex.js';
const models = ['gpt-6-astra', 'gpt-5.6-sol', 'gpt-6.1-sol', 'gpt-5.6-terra'];
const prompt = `Reescreva pesquisa/aprofundamento/paises/china/etnias.md usando a skill travel-deepdive-writer.
Contexto: o arquivo foi escrito para um roteiro antigo (Hui/Xi'an, Miao/Xijiang, Dong/Zhaoxing) e
links para atrações removidas. O roteiro atual é Chongqing → Zhangjiajie/Furong → Fenghuang →
Guilin/Yangshuo → Shenzhen → Xiamen → Fukuoka/Kurokawa/Beppu. Cubra: Tujia (Zhangjiajie, Furong,
SE de Chongqing), Miao e Tujia em Fenghuang, Zhuang (Guangxi), Minnan/diáspora (Xiamen), Hakka e
migrantes (Shenzhen). Mantenha o front matter obrigatório, respeite o piso de tamanho da skill, não
linke atrações inexistentes, rode node build/build.js ao final e reporte os avisos.
Não edite nenhum outro arquivo.`;
const instructions = `Execute a tarefa do usuário integralmente neste worktree isolado. A skill solicitada está em .claude/skills/travel-deepdive-writer/SKILL.md; leia-a e suas referências pertinentes. Você não está sozinho no repositório: outros agentes trabalham em worktrees separados; não reverta, leia nem modifique o trabalho deles. Sua única responsabilidade de edição de fonte é pesquisa/aprofundamento/paises/china/etnias.md. O build pode gerar dist/ ignorado pelo Git. Não edite tasks/, documentação, skills ou outros arquivos, não crie commits e não faça push: o orquestrador cuidará dos registros e commits. Não consulte outros branches/worktrees, pesquisa/_revisao/ab-test, backups, candidatos anteriores ou relatórios comparativos, nem tente identificar outros modelos. Utilize apenas o checkout atual e fontes públicas para a tarefa. Se delegar seções conforme a skill, preserve o mesmo modelo desta sessão em todas as chamadas de escrita. Não substitua o modelo. Na resposta final, informe arquivo alterado, verificação de tamanho, resultado do build e avisos ou limitações reais. Não deixe servidores ou processos em background ao terminar.`;

function git(args, cwd=root, input) {
  return cp.execFileSync('git', args, {cwd, encoding:'utf8', input, windowsHide:true}).trim();
}
fs.mkdirSync(out, {recursive:true});
if (fs.existsSync(path.join(out, 'manifest.json'))) throw new Error('Experimento já iniciado; não sobrescrever.');
fs.writeFileSync(path.join(out, 'prompt.txt'), prompt+'\n');
fs.writeFileSync(path.join(out, 'execution-instructions.txt'), instructions+'\n');
const baseline = cp.spawnSync(process.execPath, ['build/build.js'], {cwd:root,encoding:'utf8',windowsHide:true});
fs.writeFileSync(path.join(out,'baseline-build.log'), baseline.stdout + baseline.stderr);
const manifest = {
  date:'2026-10-01', base, target, harness:'Codex CLI 0.155.1', reasoning:'medium',
  webSearch:'live', ignoredUserConfig:true, maxConcurrent:3,
  baselineBuildExit:baseline.status, supervisorPid:process.pid,
  promptSha256:require('crypto').createHash('sha256').update(prompt+'\n').digest('hex'),
  isolation:'Worktrees independentes; sparse checkout exclui /pesquisa/_revisao/ab-test/ e /pesquisa/_backup/.',
  runs:[]
};
function save() { fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n'); }
for (const model of models) {
  const branch = `ab/codex-${model}-etnias`;
  const cwd = path.join(root,'.claude/worktrees',`codex-${model}-etnias`);
  const dir = path.join(out,model);
  fs.mkdirSync(dir,{recursive:true});
  git(['worktree','add','-b',branch,cwd,base]);
  git(['sparse-checkout','set','--no-cone','--stdin'],cwd,'/*\n!/pesquisa/_revisao/ab-test/\n!/pesquisa/_backup/\n');
  const sourceHash = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(cwd,target))).digest('hex');
  const args = [cli,'exec','--ignore-user-config','--model',model,
    '--config','model_reasoning_effort="medium"',
    '--config','web_search="live"',
    '--config','approval_policy="never"',
    '--config','developer_instructions='+JSON.stringify(instructions),
    '--sandbox','danger-full-access','--cd',cwd,'--json','--color','never',
    '--output-last-message',path.join(dir,'final-response.md'),'-'];
  manifest.runs.push({model,branch,cwd,dir,sourceHash,args,status:'queued'});
}
save();
const children = new Map();
async function run(item) {
  const stdout = fs.openSync(path.join(item.dir,'events.jsonl'),'w');
  const stderr = fs.openSync(path.join(item.dir,'stderr.log'),'w');
  item.startedAt = new Date().toISOString(); item.status='running';
  const child=cp.spawn(process.execPath,item.args,{cwd:item.cwd,stdio:['pipe',stdout,stderr],windowsHide:true});
  item.pid=child.pid; children.set(item.model,child); save();
  console.log('START '+item.model+' pid='+child.pid);
  child.stdin.end(prompt+'\n');
  await new Promise(resolve=>{
    child.on('error',error=>{item.error=String(error); resolve();});
    child.on('close',(code,signal)=>{item.exitCode=code; item.signal=signal; resolve();});
  });
  fs.closeSync(stdout);fs.closeSync(stderr);children.delete(item.model);
  item.finishedAt=new Date().toISOString();
  item.durationSeconds=(Date.parse(item.finishedAt)-Date.parse(item.startedAt))/1000;
  item.status=item.exitCode===0?'completed':'failed';save();
  console.log('END '+item.model+' exit='+item.exitCode+' seconds='+item.durationSeconds);
}
let next=0;
async function worker(){while(next<manifest.runs.length){const item=manifest.runs[next++];await run(item);}}
Promise.all(Array.from({length:3},worker)).then(()=>{manifest.finishedAt=new Date().toISOString();save();console.log('ALL FINISHED');});
