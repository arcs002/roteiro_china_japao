// Deterministic syntax repairs only; never changes scores or wording.
module.exports=function parseOutput(raw){
 const changes=[];let text=raw.replace(/^\s*```(?:json)?\s*/,'').replace(/\s*```\s*$/,'');
 text=text.split('\n').map((line,index)=>{const m=line.match(/^(\s*"(?:quote|justification|mainStrength|priorityFix)"\s*:\s*")(.*)("[,]?\s*)$/);if(!m)return line;try{JSON.parse('"'+m[2]+'"');return line;}catch{}const fixed=m[2].replace(/(?<!\\)"/g,'\\"');JSON.parse('"'+fixed+'"');changes.push({line:index+1,kind:'escape embedded quotation marks',before:line,after:m[1]+fixed+m[3]});return m[1]+fixed+m[3];}).join('\n');
 let depth=0,inString=false,escaped=false,end=-1;
 for(let i=0;i<text.length;i++){const c=text[i];if(inString){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')inString=false;}else if(c==='"')inString=true;else if(c==='{')depth++;else if(c==='}'&&--depth===0){end=i+1;break;}}
 if(end>0&&text.slice(end).trim()){const tail=text.slice(end);if(!/^[\]\}\s,]+$/.test(tail))throw Error('Unexpected prose after JSON: '+tail.slice(0,100));changes.push({kind:'remove redundant closing delimiters',removed:tail});text=text.slice(0,end);}
 return {data:JSON.parse(text),changes};
};
