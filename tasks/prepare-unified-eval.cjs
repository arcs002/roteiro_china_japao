const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process'),os=require('os');
const root=path.resolve(__dirname,'..'),base=path.join(root,'pesquisa/_revisao/ab-test');
const out=path.join(base,'unified-2026-10-01');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const body=x=>x.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
const write=(f,v)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');};
if(fs.existsSync(path.join(out,'candidate-map.json'))&&!process.argv.includes('--refresh-extraction'))throw Error('Already prepared');
const historical=[['A','Gemini 3.8 Flash','Copilot'],['B','Fable 5.1','Claude Code'],['C','Sonnet 5.5','Claude Code'],['D','Opus 5.5','Claude Code'],['E','GPT-6.1 Sol','Copilot'],['F','Opus 5.5','Copilot'],['G','GPT-5.6 Sol','Copilot']];
const files=fs.readdirSync(path.join(base,'candidatos'));
const all=historical.map(([letter,model,harness])=>({model,harness,historicalLetter:letter,source:'candidatos/'+files.find(f=>f.startsWith('etnias.'+letter+'-'))}));
for(const model of ['gpt-6-astra','gpt-5.6-sol','gpt-6.1-sol','gpt-5.6-terra'])all.push({model,harness:model==='gpt-6.1-sol'?'Codex — subagente nativo':'Codex CLI 0.155.1',source:`codex-2026-10-01/${model}/candidate.md`});
if(process.argv.includes('--refresh-extraction'))all.splice(0,all.length,...JSON.parse(fs.readFileSync(path.join(out,'candidate-map.json'),'utf8')));
else for(let i=all.length-1;i>0;i--){const j=crypto.randomInt(i+1);[all[i],all[j]]=[all[j],all[i]];}
const inventory=[],selected=[],blind=path.join(out,'blind');
write(path.join(out,'.gitattributes'),'# Snapshots imutáveis: bytes e espaços originais fazem parte da evidência.\n* -text -whitespace\n');
for(let i=0;i<all.length;i++){
 const c=all[i];c.id='C'+String(i+1).padStart(2,'0');const raw=fs.readFileSync(path.join(base,c.source));c.sha256=hash(raw);
 write(path.join(blind,c.id+'.md'),raw.toString('utf8'));const prose=body(raw.toString('utf8')).replace(/\r\n/g,'\n');
 let n=0,section='';
 for(const [lineIdx,line] of prose.split('\n').entries()){
  if(/^## /.test(line)){section=line.slice(3);continue;}if(!line.trim()||/^#|^\|/.test(line))continue;
  const sentences=line.split(/(?<=[.!?])\s+(?=[\p{Lu}“"\[])/u);
  for(const s0 of sentences){const text=s0.trim();if(text.length<40)continue;
   const numbers=text.match(/\b\d[\d.,]*(?:\s*(?:mil|milhões|século|%))?/g)||[];
   const names=text.match(/\b\p{Lu}[\p{L}'’-]+(?:\s+\p{Lu}[\p{L}'’-]+)*/gu)||[];
   if(!numbers.length&&!names.length)continue;
   const trap=/Zhangjiajie.*(?:Xiangxi|prefeitura|1988)|Xiangxi.*Zhangjiajie|(?:Tujia|tujia).*(?:noroeste|nordeste|sudeste|milh|censo)|(?:Miao|miao|Zhuang|zhuang).*(?:milh|censo)|(?:Minnan|Hakka|minnan|hakka).*(?:han|Han|minoria|etnia oficial)|Guangxi.*(?:1958|autônom)|Laosicheng|Hongyadong.*(?:réplica|recent|recria|constr|2006|antig)|Ping.an|Dazhai|Huangluo/i.test(text);
   const numeric=numbers.length>0;const record={id:c.id+'-F'+String(++n).padStart(3,'0'),candidate:c.id,bodyLine:lineIdx+1,section,text,numbers,names,priority:trap?'trap':numeric?'numeric':'uniform-pool'};
   inventory.push(record);
  }
 }
 const own=inventory.filter(x=>x.candidate===c.id),mandatory=own.filter(x=>x.priority!=='uniform-pool');
 const sample=own.filter(x=>x.priority==='uniform-pool').sort((a,b)=>hash('uniform-v2|'+a.text).localeCompare(hash('uniform-v2|'+b.text))).slice(0,10);
 selected.push(...mandatory,...sample);
}
// Preserve exact duplicates in the inventory, deduplicate exact sentences in research groups.
const grouped=new Map();
for(const s of selected){const key=s.text.replace(/\s+/g,' ').trim();if(!grouped.has(key))grouped.set(key,{...s,occurrences:[]});grouped.get(key).occurrences.push({id:s.id,candidate:s.candidate,bodyLine:s.bodyLine});}
const units=[...grouped.values()].map((u,i)=>({...u,unit:'U'+String(i+1).padStart(3,'0'),theme:/Hakka|Shenzhen|Minnan|Xiamen|Gulangyu|Dafen|Hehu|Bao.an|Mazu|Zheng|Koxinga|Qiaopi|Fujian|Nanyang|Keji|Hoklo|Hokkien/i.test(u.section+' '+u.text)?'coast':/Miao|Fenghuang|Zhuang|Guangxi|Longji|Ping.an|Yao|Dazhai|Huangluo|Liu Sanjie|San Yue/i.test(u.section+' '+u.text)?'miao-zhuang':'tujia-general'}));
write(path.join(out,'candidate-map.json'),all);write(path.join(out,'claim-inventory.json'),inventory);write(path.join(blind,'selected-claims.json'),units);
for(const theme of ['coast','miao-zhuang','tujia-general'])write(path.join(blind,theme+'-claims.json'),units.filter(x=>x.theme===theme));
write(path.join(blind,'RUBRICA.md'),fs.readFileSync(path.join(base,'RUBRICA.md'),'utf8'));
write(path.join(out,'protocol.md'),`# Protocolo da avaliação unificada\n\nFixado antes da pontuação em ${new Date().toISOString()}. Rubrica v2 preservada integralmente. Onze textos distintos, sorteados com crypto.randomInt, avaliados novamente pela mesma dupla, sem nomes, histórico de notas ou relatórios de geração. O original não concorre. Terra/Copilot histórico é alias de uma amostra já incluída, sem observação independente.\n\nInventário extraído antes da leitura editorial: sentenças com números ou sequências de iniciais maiúsculas (heurística, não reconhecimento linguístico perfeito); mantidos texto, seção, linha do corpo, números e nomes. Checagem prioritária de ocorrências das armadilhas e todas as sentenças numéricas; dez sentenças adicionais por candidato selecionadas por ordenação SHA-256 determinística de texto, com salt uniform-v2. Duplicatas literais pesquisadas uma vez e propagadas. Contradições e discordâncias encontradas são checadas adicionalmente e identificadas como tais, sem substituir a amostra uniforme.\n\nUnidade de checagem é a sentença extraída: contém às vezes várias afirmações; um erro material torna a unidade incorreta, incerteza não resolvida torna-a incerta. Taxa de acerto = corretas / (corretas + incorretas), excluindo incertezas e unidades não factuais; sempre publicar denominadores e abrangência amostral. Uma frase com limite inferior numericamente verdadeiro não é falsa só por usar número antigo: ausência de ano/atualização é julgada em calibração quando induz ao erro; contradição explícita com 2020 é erro factual. Qualificações honestas não transformam erro em acerto. Não criar tetos ou descontos além da v2.\n\nBuild e audit.mjs em cópia isolada da mesma base; normalizar CRLF para LF somente na cópia de execução porque audit.mjs exige LF. Originais e cópias cegas preservados. Comando wc -w do corpo quando disponível, acompanhado de contagem equivalente por whitespace. Findings do audit são evidências a interpretar: menção histórica a destino removido não implica automaticamente resquício do itinerário; [VERIFICAR] não é vazamento de tag; piso configurado no audit (1.500) não substitui o piso 2.000 da rubrica.\n\nEscopo de edição: quatro candidatos novos possuem commits e logs verificáveis; sete históricos possuem apenas a declaração do experimento anterior. A nota de escopo histórico é informada como evidência histórica, sem simular reverificação do diff original.\n\nDois avaliadores novos recebem o mesmo pacote de textos cegos, rubrica, fatos e métricas derivadas, incluindo contexto das páginas existentes para D3. O orquestrador mantém o mapa, que nunca é enviado aos avaliadores; as notas são associadas aos nomes na tabela final somente após salvar ambas as avaliações. Divergência estritamente maior que dez em dimensão requer arbitragem do usuário; divergência no total também será destacada, mas não inventará regra da rubrica. A média é calculada após tetos individuais. Notas antigas não entram na média.\n`);
console.log(JSON.stringify({out,candidates:all.length,inventory:inventory.length,selectedOccurrences:selected.length,units:units.length,groups:Object.fromEntries(['coast','miao-zhuang','tujia-general'].map(t=>[t,units.filter(x=>x.theme===t).length]))},null,2));
