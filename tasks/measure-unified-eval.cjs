const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),out=path.join(root,'pesquisa/_revisao/ab-test/unified-2026-10-01'),blind=path.join(out,'blind');
const target='pesquisa/aprofundamento/paises/china/etnias.md',base='d8de411c19ce21847fe0cb1c717d65e3f5c794d5';
const hash=x=>crypto.createHash('sha256').update(x).digest('hex'),write=(f,v)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');};
const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'travel-unified-eval-')),archive=path.join(sandbox,'base.tar');
cp.execFileSync('git',['archive','--format=tar','--output='+archive,base,'build','site','pesquisa/cidades','pesquisa/atracoes','pesquisa/aprofundamento','pesquisa/dias'],{cwd:root,windowsHide:true});
cp.execFileSync('tar',['-xf',archive,'-C',sandbox],{windowsHide:true});
const {parseFrontMatter}=require(path.join(sandbox,'build/lib/frontmatter'));
const sourceFM=parseFrontMatter(fs.readFileSync(path.join(sandbox,target),'utf8')).data;
const cfg=JSON.parse(fs.readFileSync(path.join(root,'pesquisa/_pipeline/final-review.config.json'),'utf8'));
const auditor=path.join(root,'.claude/skills/travel-final-review/scripts/audit.mjs');
const wc='C:/Program Files/Git/usr/bin/wc.exe';
const normal=s=>s.replace(/\s+/g,' ').trim(),paras=s=>s.split(/\r?\n\s*\r?\n/).map(normal).filter(s=>s.split(/\s+/).length>=30&&!s.startsWith('#'));
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
// git archive preserves repository CRLF; audit.mjs only recognizes LF front matter.
for(const f of walk(path.join(sandbox,'pesquisa')).filter(f=>f.endsWith('.md')))fs.writeFileSync(f,fs.readFileSync(f,'utf8').replace(/\r\n/g,'\n'));
const otherPages=walk(path.join(sandbox,'pesquisa')).filter(f=>f.endsWith('.md')&&!f.endsWith('etnias.md')&&(!fs.existsSync(f.replace(/\.md$/,'.expandido.md'))||f.endsWith('.expandido.md')));
const allOtherParas=new Map();for(const f of otherPages)for(const p of paras(parseFrontMatter(fs.readFileSync(f,'utf8')).body)){if(!allOtherParas.has(p))allOtherParas.set(p,[]);allOtherParas.get(p).push(path.relative(sandbox,f).replaceAll('\\','/'));}
const support=[];
for(const f of otherPages.filter(f=>/pesquisa[\\/](?:cidades|atracoes)[\\/](?:\d+-)?(?:furong|hongyadong|fenghuang|gulangyu|dafen|shenzhen|xiamen|guilin|yangshuo|zhangjiajie|chongqing|longsheng|muralha-fenghuang|shen-congwen|rio-tuojiang|impressao-liu|universidade-xiamen)/.test(f))){
 const pageBody=parseFrontMatter(fs.readFileSync(f,'utf8')).body;
 const selected=paras(pageBody).filter(p=>/Tujia|Miao|Zhuang|Minnan|Hakka|palafita|tusi|diáspora|migrant/i.test(p));
 support.push({file:path.relative(sandbox,f).replaceAll('\\','/'),bodyWords:pageBody.trim().split(/\s+/).length,excerptMethod:pageBody.length<4000?'corpo integral':'parágrafos culturais por regex, até 4000 caracteres',excerpts:pageBody.length<4000?pageBody:selected.join('\n\n').slice(0,4000)});
}
write(path.join(blind,'existing-page-context.json'),support);
const run=(id)=>{
 const dir=path.join(out,'mechanical',id);fs.mkdirSync(dir,{recursive:true});
 const build=cp.spawnSync(process.execPath,['build/build.js'],{cwd:sandbox,encoding:'utf8',windowsHide:true});
 const log=build.stdout+build.stderr;write(path.join(dir,'build.log'),log);
 const config={...cfg,reportDir:dir};const configPath=path.join(dir,'audit-config.json');write(configPath,config);
 const audit=cp.spawnSync(process.execPath,[auditor,configPath],{cwd:sandbox,encoding:'utf8',windowsHide:true});write(path.join(dir,'audit.log'),audit.stdout+audit.stderr);
 const data=JSON.parse(fs.readFileSync(path.join(dir,'auditoria-mecanica.json'),'utf8'));
 // Keep only the compact target report; whole-guide baseline findings have separate counts.
 const targetFindings=data.findings.filter(x=>x.file.replaceAll('\\','/')===target);
 write(path.join(dir,'target-audit.json'),{target,findings:targetFindings,page:data.pages.find(x=>x.file.replaceAll('\\','/')===target),wholeGuideCounts:{pages:data.pages.length,errors:data.findings.filter(x=>x.sev==='erro').length,warnings:data.findings.filter(x=>x.sev==='aviso').length}});
 return {buildExit:build.status,auditExit:audit.status,buildWarnings:log.split(/\r?\n/).filter(l=>/^\s*\[(warn|img)\]/.test(l)).map(l=>l.trim()),auditFindings:targetFindings};
};
const baseline=run('baseline');write(path.join(out,'mechanical','baseline.json'),baseline);
const map=JSON.parse(fs.readFileSync(path.join(out,'candidate-map.json'),'utf8')),metrics=[];
for(const c of map){
 const buffer=fs.readFileSync(path.join(blind,c.id+'.md')),raw=buffer.toString('utf8').replace(/\r\n/g,'\n'),parsed=parseFrontMatter(raw),body=parsed.body;
 fs.writeFileSync(path.join(sandbox,target),raw);const checked=run(c.id);
 const wcRun=cp.spawnSync(wc,['-w'],{input:body,encoding:'utf8',windowsHide:true,env:{...process.env,LC_ALL:'C.UTF-8'}});if(wcRun.status!==0)throw Error(wcRun.stderr);
 const headings=[...body.matchAll(/^## (.+)$/gm)];
 const sections=headings.map((h,i)=>({title:h[1],words:body.slice(h.index+h[0].length,headings[i+1]?.index??body.length).trim().split(/\s+/u).length,floor:/^(Abertura|Encerramento)$/.test(h[1])?250:600}));
 const registry=JSON.parse(fs.readFileSync(path.join(sandbox,'dist/content/registry.json'),'utf8'));
 const links=[...body.matchAll(/(?<!!)\[[^\]\n]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map(m=>m[1]);const broken=[];
 for(const href of links.filter(x=>!/^https?:\/\//i.test(x))){if(href.startsWith('#')){const route=decodeURIComponent(href.slice(1));if(route.includes('/')&&!registry.routes[route])broken.push(href);}else if(!/^[a-z]+:/i.test(href)){const d=decodeURIComponent(href.split('#')[0]);if(!fs.existsSync(d.startsWith('pesquisa/')?path.join(sandbox,d):path.resolve(sandbox,path.dirname(target),d)))broken.push(href);}}
 const rhetoric=[...body.matchAll(/\b[Nn]ão\s+(?:é|são)\b[^.!?\n]{0,180}?(?:—|–|;|:)\s*(?:\*\*)?(?:é|são)\b[^.!?\n]*/gu)].map(x=>x[0]);
 const shared=paras(body).filter(p=>allOtherParas.has(p)).map(p=>({text:p,files:allOtherParas.get(p)}));
 const r={id:c.id,sha256:hash(buffer),wordsWc:Number(wcRun.stdout.trim()),wordsWhitespace:body.trim().split(/\s+/u).length,wcCommand:'wc -w (stdin: corpo sem front matter, LC_ALL=C.UTF-8)',frontMatter:parsed.data,frontMatterPreserved:JSON.stringify(parsed.data)===JSON.stringify(sourceFM),sections,verificationTags:(body.match(/\[VERIFICAR/gi)||[]).length,rhetoric,brokenInternalLinks:broken,internalLinks:links.filter(x=>!/^https?:\/\//.test(x)),oldItineraryOccurrences:[...body.matchAll(/\b(?:Xi['’]?an|Xijiang|Zhaoxing|Dong Grand Song|Hui)\b/gi)].map(m=>({text:m[0],context:body.slice(Math.max(0,m.index-100),m.index+150)})),scopeEvidence:c.historicalLetter?'Registro histórico declara edição exclusiva; diff original não disponível':'Commit individual verificado na rodada de geração; apenas etnias.md',scopeOnlyTarget:true,...checked,newBuildWarnings:checked.buildWarnings.filter(w=>!baseline.buildWarnings.includes(w)),exactDuplicateParagraphsInExistingPages:shared};
 metrics.push(r);console.log(c.id+' words='+r.wordsWc+' build='+r.buildExit+' findings='+r.auditFindings.length);
}
const texts=map.map(c=>({id:c.id,body:parseFrontMatter(fs.readFileSync(path.join(blind,c.id+'.md'),'utf8')).body}));const similarities=[];
for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i],b=texts[j],pa=paras(a.body),pb=new Set(paras(b.body));const shared=pa.filter(p=>pb.has(p));similarities.push({a:a.id,b:b.id,identicalNormalized:normal(a.body)===normal(b.body),sharedLongParagraphs:shared.length,paragraphsA:pa.length,paragraphsB:pb.size});}
write(path.join(blind,'metrics.json'),metrics);write(path.join(out,'similarities.json'),similarities);
write(path.join(out,'mechanical','execution.json'),{base,sandbox,auditScript:'.claude/skills/travel-final-review/scripts/audit.mjs',auditScriptSha256:hash(fs.readFileSync(auditor)),configSha256:hash(fs.readFileSync(path.join(root,'pesquisa/_pipeline/final-review.config.json'))),completedAt:new Date().toISOString(),baselineWarnings:baseline.buildWarnings.length,candidates:metrics.length});
console.log('Complete '+sandbox);
