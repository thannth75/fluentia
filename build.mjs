import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const write=(rel,buf)=>{const p=path.join(out,rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,buf);};

const base=JSON.parse(fs.readFileSync(path.join(root,'pack-manifest.json'),'utf8'));
for(const [rel,meta] of Object.entries(base)){
  const b64=meta.parts.map(n=>fs.readFileSync(path.join(root,'parts',n),'utf8').trim()).join('');
  const raw=zlib.gunzipSync(Buffer.from(b64,'base64'));
  if(sha256(raw)!==meta.sha256) throw new Error('Base integrity failed: '+rel);
  write(rel,raw);
}

function replaceExact(source,oldText,newText,label){
  const at=source.indexOf(oldText);
  if(at<0) throw new Error('v5 patch anchor not found: '+label);
  if(source.indexOf(oldText,at+Math.max(1,oldText.length))>=0) throw new Error('v5 patch anchor ambiguous: '+label);
  return source.slice(0,at)+newText+source.slice(at+oldText.length);
}
const patchRaw=zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(root,'parts','v5_app_patch.b64'),'utf8').trim(),'base64'));
if(sha256(patchRaw)!=='f5a36ecddbe766c2b645d643ff3fbd1578ce3e15024ecc959d151580ee4a2519') throw new Error('v5 patch integrity failed');
const patch=JSON.parse(patchRaw.toString('utf8'));
let app=fs.readFileSync(path.join(out,'app.js'),'utf8');
app=replaceExact(app,patch[0].old,patch[0].new,'version');
const skillAnchor="  function skillBarsHtml(){return Object.entries(SKILL_LABELS).map(([k,v])=>\`<div class=\\\"skill-bar\\\"><div class=\\\"row\\\"><span>\${v}</span><b>\${state.scores[k]||0}%</b></div><div class=\\\"track\\\"><i style=\\\"width:\${state.scores[k]||0}%\\\"></i></div></div>\`).join('');}\n";
app=replaceExact(app,skillAnchor,skillAnchor+patch[1].new,'Lia helpers');
app=replaceExact(app,patch[2].old,patch[2].new,'home avatar');
const dailyAnchor="      goalTask,\n      {icon:'🎧',title:'Treino de escuta'";
app=replaceExact(app,dailyAnchor,"      goalTask,\n"+patch[3].new+"      {icon:'🎧',title:'Treino de escuta'",'daily mission');
app=replaceExact(app,patch[4].old,patch[4].new,'talk');
app=replaceExact(app,patch[5].old,patch[5].new,'speaking animation');
if(sha256(Buffer.from(app))!=='a958d9bf96a15e9ebae92c936f5fa507be60741f2a13fa9b5a262a80a534baef') throw new Error('v5 final app hash failed');
write('app.js',Buffer.from(app));

const relDir=path.join(root,'release-v63');
const release=JSON.parse(fs.readFileSync(path.join(relDir,'manifest.json'),'utf8'));
for(const [rel,meta] of Object.entries(release)){
  const b64=meta.parts.map(n=>fs.readFileSync(path.join(relDir,n),'utf8').trim()).join('');
  let raw=Buffer.from(b64,'base64');
  if(meta.gzip) raw=zlib.gunzipSync(raw);
  const got=sha256(raw);
  if(got!==meta.sha256) throw new Error(`FluentIA 6.3 integrity failed for ${rel}: ${got}`);
  write(rel,raw);
}

const required=['index.html','styles.css','data.js','data-v4.js','data-v5.js','data-v6.js','app.js','sw.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','assets/lia-3d.webp'];
for(const rel of required) if(!fs.existsSync(path.join(out,rel))) throw new Error('Missing production asset: '+rel);
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({app:'FluentIA',version:'6.3.0',builtAt:new Date().toISOString()},null,2));
console.log('FluentIA 6.3.0 build OK — final exams + certificate release verified.');
