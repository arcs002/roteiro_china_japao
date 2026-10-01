// Repairs JSON serialization only. Scores, explanations and citation characters are unchanged.
const fs=require('fs'),path=require('path');
const out=path.resolve(__dirname,'../pesquisa/_revisao/ab-test/unified-2026-10-01/judges/score');
for(const judge of ['judge-haiku','judge-gpt']){
 const dir=path.join(out,judge),raw=fs.readFileSync(path.join(dir,'response.txt'),'utf8');
 const changes=[];
 let text=raw.replace(/^\s*```(?:json)?\s*/,'').replace(/\s*```\s*$/,'');
 text=text.split('\n').map((line,index)=>{
  const m=line.match(/^(\s*"(?:quote|justification|mainStrength|priorityFix)"\s*:\s*")(.*)("[,]?\s*)$/);
  if(!m)return line;
  try{JSON.parse('"'+m[2]+'"');return line;}catch{}
  const escaped=m[2].replace(/(?<!\\)"/g,'\\"');
  JSON.parse('"'+escaped+'"');changes.push({line:index+1,kind:'escape embedded quotation marks',before:line,after:m[1]+escaped+m[3]});return m[1]+escaped+m[3];
 }).join('\n');
 const parsed=JSON.parse(text);
 fs.writeFileSync(path.join(dir,'normalized-response.json'),JSON.stringify(parsed,null,2)+'\n');
 fs.writeFileSync(path.join(dir,'normalization-log.json'),JSON.stringify({syntaxOnly:true,changes},null,2)+'\n');
 console.log(judge+': '+changes.length+' JSON string repairs');
}
