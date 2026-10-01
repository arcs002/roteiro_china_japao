const http=require('http');const fs=require('fs');const path=require('path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const models=new Set(['gpt-6-astra','gpt-5.6-sol','gpt-6.1-sol','gpt-5.6-terra']);
const server=http.createServer((req,res)=>{
 try {
  const parts=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).split('/').filter(Boolean);
  const model=parts.shift();if(!models.has(model)){res.writeHead(404);return res.end('Modelo não encontrado');}
  const base=path.join(root,'.claude/worktrees',`codex-${model}-etnias`,'dist');
  const file=path.resolve(base,...parts,parts.length?'':'index.html');
  if(!file.startsWith(base+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Arquivo não encontrado');}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
 }catch(e){res.writeHead(500);res.end(String(e));}
});
server.listen(8899,'127.0.0.1',()=>console.log('Preview A/B: http://127.0.0.1:8899/<model>/index.html ; pid='+process.pid));
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
