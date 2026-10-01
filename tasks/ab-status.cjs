const fs=require('fs');const path=require('path');
const out=path.resolve(__dirname,'../pesquisa/_revisao/ab-test/codex-2026-10-01');
const m=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
for(const r of m.runs){
 const file=path.join(r.dir,'events.jsonl');
 const events=fs.existsSync(file)?fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(l=>{try{return JSON.parse(l)}catch{return {}}}):[];
 const completed=events.filter(e=>e.type==='item.completed');
 const source=path.join(r.cwd,m.target);
 const body=fs.existsSync(source)?fs.readFileSync(source,'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,''):'';
 const nativePath=path.join(r.dir,'native-execution.json');
 const native=fs.existsSync(nativePath)?JSON.parse(fs.readFileSync(nativePath,'utf8')):null;
 console.log(JSON.stringify({model:r.model,status:native?.status||r.status,cliStatus:r.status,harness:native?.harness||m.harness,events:events.length,words:body.trim()?body.trim().split(/\s+/).length:0,lastMessage:completed.filter(e=>e.item?.type==='agent_message').at(-1)?.item.text?.slice(0,600),lastItemType:events.at(-1)?.item?.type,webSearches:completed.filter(e=>e.item?.type==='web_search').length}));
}
