const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const cp=require('child_process');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'pesquisa/_revisao/ab-test/codex-2026-10-01');
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
const {parseFrontMatter}=require(path.join(root,'build/lib/frontmatter'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(args,cwd=root)=>cp.execFileSync('git',args,{cwd,encoding:'utf8',windowsHide:true}).trim();
const baseline=fs.readFileSync(path.join(out,'baseline-build.log'),'utf8');
const warningLines=s=>s.split(/\r?\n/).filter(l=>/^\s*\[(warn|img)\]/.test(l)).map(l=>l.trim());
const oldWarnings=new Set(warningLines(baseline));
const original=git(['show',`${manifest.base}:${manifest.target}`]);
const originalFM=parseFrontMatter(original).data;
const wordCount=s=>s.trim()?s.trim().split(/\s+/u).length:0;
const normalize=s=>s.replace(/\s+/g,' ').trim();
const paragraphs=s=>s.split(/\r?\n\s*\r?\n/).map(normalize).filter(s=>wordCount(s)>=30&&!s.startsWith('#'));
const shingle=s=>{const w=s.toLocaleLowerCase('pt-BR').match(/[\p{L}\p{N}]+/gu)||[];return new Set(w.slice(0,-7).map((_,i)=>w.slice(i,i+8).join(' ')));};
function compare(a,b){
 const pa=new Set(paragraphs(a)),pb=new Set(paragraphs(b));
 const shared=[...pa].filter(p=>pb.has(p));const sa=shingle(a),sb=shingle(b);
 const intersect=[...sa].filter(x=>sb.has(x)).length;
 return {identicalNormalized:normalize(a)===normalize(b),sharedLongParagraphs:shared.length,paragraphsA:pa.size,paragraphsB:pb.size,eightWordJaccard:intersect/(sa.size+sb.size-intersect||1)};
}
const audit={base:manifest.base,generatedAt:new Date().toISOString(),baselineWarnings:oldWarnings.size,runs:[],similarities:[]};
for(const run of manifest.runs){
 const buffer=fs.readFileSync(path.join(run.cwd,manifest.target)); const raw=buffer.toString('utf8');
 const parsed=parseFrontMatter(raw);const body=parsed.body;
 if(hash(buffer)===run.sourceHash){audit.runs.push({model:run.model,status:'unchanged'});continue;}
 const build=cp.spawnSync(process.execPath,['build/build.js'],{cwd:run.cwd,encoding:'utf8',windowsHide:true});
 const log=build.stdout+build.stderr;fs.writeFileSync(path.join(run.dir,'verified-build.log'),log);
 const warnings=warningLines(log); const registry=JSON.parse(fs.readFileSync(path.join(run.cwd,'dist/content/registry.json'),'utf8'));
 const headings=[...body.matchAll(/^## (.+)\r?$/gm)].map(m=>({title:m[1].trim(),index:m.index,end:m.index+m[0].length}));
 const sections=headings.map((h,i)=>({title:h.title,words:wordCount(body.slice(h.end,headings[i+1]?.index??body.length))}));
 const links=[...body.matchAll(/(?<!!)\[[^\]\n]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(m=>m[1].replace(/^<|>$/g,''));
 const internal=links.filter(u=>!/^https?:\/\//.test(u));const broken=[];
 for(const href of internal){
   if(href.startsWith('#')){const route=decodeURIComponent(href.slice(1));if(route.includes('/')&&!registry.routes[route])broken.push(href);}
   else if(!/^[a-z]+:/i.test(href)){const dest=decodeURIComponent(href.split('#')[0]);const resolved=dest.startsWith('pesquisa/')?path.join(run.cwd,dest):path.resolve(run.cwd,path.dirname(manifest.target),dest);if(!fs.existsSync(resolved))broken.push(href);}
 }
 const rawEvents=path.join(run.dir,'events.jsonl');
 const events=fs.existsSync(rawEvents)?fs.readFileSync(rawEvents,'utf8').split(/\r?\n/).filter(Boolean).map(l=>{try{return JSON.parse(l)}catch{return {}}}):[];
 const completed=events.filter(e=>e.type==='item.completed');
 const buildCommands=completed.filter(e=>e.item?.type==='command_execution'&&/node(?:\.exe)?["']?\s+build[\\/]build\.js/.test(e.item.command||''));
 const result={model:run.model,branch:run.branch,cwd:run.cwd,sha256:hash(buffer),bodySha256:hash(body.replace(/\r\n/g,'\n')),words:wordCount(body),frontMatter:parsed.data,frontMatterPreserved:JSON.stringify(originalFM)===JSON.stringify(parsed.data),sections,hasOpening:sections[0]?.title==='Abertura',hasClosing:sections.at(-1)?.title==='Encerramento',floorMet:wordCount(body)>=2000,buildExit:build.status,warnings:warnings.length,newWarnings:warnings.filter(w=>!oldWarnings.has(w)),removedWarnings:[...oldWarnings].filter(w=>!warnings.includes(w)),internalLinks:internal,brokenLinks:broken,externalLinks:links.filter(u=>/^https?:\/\//.test(u)),verificationTags:(body.match(/\[VERIFICAR/gi)||[]).length,oldItineraryMentions:[...body.matchAll(/\b(?:Xi['’]?an|Xijiang|Zhaoxing|Dong Grand Song)\b/gi)].map(m=>m[0]),changedFiles:git(['diff','--name-only',manifest.base],run.cwd).split(/\r?\n/).filter(Boolean),untrackedFiles:git(['ls-files','--others','--exclude-standard'],run.cwd).split(/\r?\n/).filter(Boolean),skillReadInCli:completed.some(e=>e.item?.type==='command_execution'&&/travel-deepdive-writer/.test(e.item.command||'')),agentBuildCommands:buildCommands.map(e=>({command:e.item.command,exitCode:e.item.exit_code})),threadId:events.find(e=>e.type==='thread.started')?.thread_id,usage:events.find(e=>e.type==='turn.completed')?.usage,cliWebSearchCalls:completed.filter(e=>e.item?.type==='web_search').length,cliDelegations:completed.filter(e=>e.item?.type==='collab_tool_call').map(e=>e.item)};
 result.sectionFloors=sections.map(s=>({...s,floor:['Abertura','Encerramento'].includes(s.title)?250:600})).map(s=>({...s,meetsFloor:s.words>=s.floor}));
 result.sourceSimilarity=compare(body,parseFrontMatter(original).body);
 fs.writeFileSync(path.join(run.dir,'candidate.md'),buffer);
 fs.writeFileSync(path.join(run.dir,'candidate.patch'),cp.execFileSync('git',['diff',manifest.base,'--',manifest.target],{cwd:run.cwd,windowsHide:true}));
 fs.writeFileSync(path.join(run.dir,'metrics.json'),JSON.stringify(result,null,2)+'\n');
 audit.runs.push(result);
}
for(let i=0;i<audit.runs.length;i++)for(let j=i+1;j<audit.runs.length;j++){
 const a=audit.runs[i],b=audit.runs[j];if(!a.sha256||!b.sha256)continue;
 const at=parseFrontMatter(fs.readFileSync(path.join(a.cwd,manifest.target),'utf8')).body,bt=parseFrontMatter(fs.readFileSync(path.join(b.cwd,manifest.target),'utf8')).body;
 audit.similarities.push({a:a.model,b:b.model,...compare(at,bt)});
}
fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify(audit,null,2)+'\n');
console.log(JSON.stringify({baselineWarnings:audit.baselineWarnings,runs:audit.runs.map(({model,words,sha256,buildExit,warnings,newWarnings,brokenLinks,changedFiles,untrackedFiles,sections})=>({model,words,sha256,buildExit,warnings,newWarnings,brokenLinks,changedFiles,untrackedFiles,sections})),similarities:audit.similarities},null,2));
