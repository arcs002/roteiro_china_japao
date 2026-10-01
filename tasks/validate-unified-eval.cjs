const fs=require('fs'),path=require('path'),crypto=require('crypto');
const out=path.resolve(__dirname,'../pesquisa/_revisao/ab-test/unified-2026-10-01');
const summary=JSON.parse(fs.readFileSync(path.join(out,'blind/fact-summary.json'),'utf8'));
const metrics=JSON.parse(fs.readFileSync(path.join(out,'blind/metrics.json'),'utf8'));
const lock=JSON.parse(fs.readFileSync(path.join(out,'input-lock.json'),'utf8'));
const digest=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
if(digest(path.join(out,'judge-prompt.txt'))!==lock.promptSha256)throw Error('Prompt changed after input lock');
const map=JSON.parse(fs.readFileSync(path.join(out,'candidate-map.json'),'utf8'));
for(const c of map){if(digest(path.join(out,'blind',c.id+'.md'))!==c.sha256||digest(path.join(out,'..',c.source))!==c.sha256)throw Error('Candidate changed: '+c.id);}
if(digest(path.join(out,'blind/RUBRICA.md'))!==digest(path.join(out,'../RUBRICA.md')))throw Error('Rubric changed');
const max=[30,15,15,10,15,10,5],norm=s=>s.replace(/\s+/g,' ').trim();
const mode=process.argv[2]||'score',judges=['judge-haiku','judge-gpt'],report=[];
for(const judge of judges){
 const normalized=path.join(out,'judges',mode,judge,'normalized-response.json');
 const file=fs.existsSync(normalized)?normalized:path.join(out,'judges',mode,judge,'response.txt');if(!fs.existsSync(file)){report.push({judge,errors:['Missing response']});continue;}
 let data;try{data=JSON.parse(fs.readFileSync(file,'utf8').replace(/^\s*```(?:json)?\s*/,'').replace(/\s*```\s*$/,''));}catch(e){report.push({judge,errors:['Invalid JSON: '+e.message]});continue;}
 const errors=[];if(data.evaluations?.length!==11)errors.push('Expected 11 evaluations');
 const ids=new Set();
 for(const e of data.evaluations||[]){
  if(ids.has(e.id))errors.push(e.id+' duplicate');ids.add(e.id);
  const s=summary.find(x=>x.id===e.id),m=metrics.find(x=>x.id===e.id);if(!s||!m){errors.push(e.id+' invalid ID');continue;}
  const source=norm(fs.readFileSync(path.join(out,'blind',e.id+'.md'),'utf8'));
  if(e.dimensions?.length!==7){errors.push(e.id+' needs seven dimensions');continue;}
  const ds=new Set();for(const d of e.dimensions){if(ds.has(d.dimension))errors.push(e.id+' duplicate dimension');ds.add(d.dimension);if(!Number.isInteger(d.score)||d.score<0||d.score>max[d.dimension-1])errors.push(e.id+' D'+d.dimension+' invalid score');if(!d.justification||d.justification.length<20)errors.push(e.id+' D'+d.dimension+' lacks justification');if(!d.quote||!source.includes(norm(d.quote)))errors.push(e.id+' D'+d.dimension+' quote not verbatim: '+d.quote);}
  const d1=e.dimensions.find(d=>d.dimension===1)?.score;if(s.d1Range&&(d1<s.d1Range[0]||d1>s.d1Range[1]))errors.push(e.id+' D1 '+d1+' outside '+s.d1Range.join('–'));
  const sum=e.dimensions.reduce((a,d)=>a+d.score,0);if(sum!==e.sum)errors.push(e.id+' sum '+e.sum+' != '+sum);
  if(e.cap!==null&&![60,75,70,65,50].includes(e.cap))errors.push(e.id+' cap invalid '+e.cap);
  if(e.cap===70&&s.trapErrors.length<2)errors.push(e.id+' cap 70 lacks two distinct trap errors');
  if(e.cap===60&&m.buildExit===0)errors.push(e.id+' cap 60 lacks build failure');
  if(e.cap===65&&m.wordsWc>=2000)errors.push(e.id+' cap 65 lacks word-floor failure');
  if(e.cap===50)errors.push(e.id+' cap 50 requires a verified invention, absent from this fact check');
  if(e.cap===75)errors.push(e.id+' cap 75 requires confirmed old itinerary, absent from this corpus');
  if(s.trapErrors.length>=2&&(e.cap===null||e.cap>70))errors.push(e.id+' requires cap 70');
  if(m.buildExit!==0&&(e.cap===null||e.cap>60))errors.push(e.id+' requires build cap 60');
  if(m.wordsWc<2000&&(e.cap===null||e.cap>65))errors.push(e.id+' requires word cap 65');
  const expected=Math.min(sum,e.cap??100);if(e.final!==expected)errors.push(e.id+' final '+e.final+' != '+expected);
 }
 const status=JSON.parse(fs.readFileSync(path.join(out,'judges',mode,judge,'status.json'),'utf8'));
 if(mode==='score'&&status.promptSha256!==lock.promptSha256)errors.push('Judge input differs from locked prompt');
 if(mode==='isolated'){
  const batch=JSON.parse(fs.readFileSync(path.join(out,'judges/isolated/batch.json'),'utf8'));
  for(const input of batch.inputs){const j=batch.jobs.find(j=>j.judge===judge&&j.id===input.id);if(j?.promptSha256!==input.promptSha256||digest(path.join(out,'judges/isolated/inputs',input.id+'.txt'))!==input.promptSha256)errors.push('Changed isolated input '+input.id);}
 }
 if(status.exitCode!==0||status.isError)errors.push('Execution failed');if(status.toolCalls?.length)errors.push('Unexpected tool use '+status.toolCalls.join(','));
 fs.writeFileSync(path.join(out,'judges',mode,judge,'scores.json'),JSON.stringify(data,null,2)+'\n');
 report.push({judge,model:status.actualModels?.[0]||status.model,promptSha256:status.promptSha256,errors,totals:data.evaluations?.map(e=>({id:e.id,sum:e.sum,cap:e.cap,final:e.final}))});
}
if(report[0]?.promptSha256!==report[1]?.promptSha256)report.push({errors:['Judges received different prompts']});
fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(report.some(r=>r.errors.length))process.exitCode=1;
