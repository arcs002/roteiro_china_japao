const fs=require('fs'),path=require('path'),crypto=require('crypto');
const out=path.resolve(__dirname,'../pesquisa/_revisao/ab-test/unified-2026-10-01'),read=f=>JSON.parse(fs.readFileSync(path.join(out,f),'utf8'));
const parseOutput=require('./eval-output-parser.cjs');
const batch=read('judges/isolated/batch.json'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const promptSetSha256=hash(JSON.stringify(batch.inputs.map(i=>({id:i.id,promptSha256:i.promptSha256}))));
const errors=[];
for(const j of batch.jobs)if(j.status!=='completed')errors.push(j.judge+'/'+j.id+' '+j.status);
for(const i of batch.inputs)if(hash(fs.readFileSync(path.join(out,'judges/isolated/inputs',i.id+'.txt')))!==i.promptSha256)errors.push('Changed input '+i.id);
if(errors.length)throw Error(errors.join('\n'));
for(const judge of ['judge-haiku','judge-gpt']){
 const evaluations=[],jobs=batch.jobs.filter(j=>j.judge===judge),methodNotes=[];
 for(const job of jobs){
  const base='judges/isolated/'+judge+'/'+job.id,raw=fs.readFileSync(path.join(out,base,'response.txt'),'utf8');
  const parsed=parseOutput(raw),data=parsed.data;
  fs.writeFileSync(path.join(out,base,'normalization-log.json'),JSON.stringify({syntaxOnly:true,changes:parsed.changes},null,2)+'\n');
  fs.writeFileSync(path.join(out,base,'normalized-response.json'),JSON.stringify(data,null,2)+'\n');
  if(data.evaluations?.length!==1||data.evaluations[0].id!==job.id)throw Error('Wrong candidate '+base);
  const e=data.evaluations[0],bank=read('judges/isolated/inputs/'+job.id+'-quotes.json');
  for(const d of e.dimensions){const q=bank.find(q=>q.quoteId===d.quoteId);if(!q)throw Error('Unknown quote ID '+base+' D'+d.dimension+' '+d.quoteId);d.quote=q.text;}
  evaluations.push(e);methodNotes.push({id:job.id,notes:data.methodNotes});
 }
 const dir=path.join(out,'judges/isolated',judge),assembled={evaluations,methodNotes};
 fs.writeFileSync(path.join(dir,'response.txt'),JSON.stringify(assembled,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'scores.json'),JSON.stringify(assembled,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'status.json'),JSON.stringify({id:judge,inputMode:'per-candidate',promptSha256:promptSetSha256,promptHashes:batch.inputs.map(i=>({id:i.id,promptSha256:i.promptSha256})),actualModels:[...new Set(jobs.flatMap(j=>j.actualModels||[]))],model:jobs[0].model,exitCode:0,isError:false,toolCalls:jobs.flatMap(j=>j.toolCalls||[]),jobs:jobs.map(j=>({id:j.id,startedAt:j.startedAt,endedAt:j.endedAt,usage:j.usage})),citationAssembly:'quoteId resolved deterministically against that candidate\'s verbatim bank; no scores or reasoning changed'},null,2)+'\n');
}
console.log(JSON.stringify({promptSetSha256,judges:2,candidates:batch.inputs.length},null,2));
