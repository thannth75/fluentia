import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import crypto from 'node:crypto';

const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

for(const rel of ['index.html','manifest.webmanifest','sw.js','icons/icon.svg']){
  const src=path.join(root,rel);
  const dst=path.join(out,rel);
  if(!fs.existsSync(src)) throw new Error('Missing '+rel);
  fs.mkdirSync(path.dirname(dst),{recursive:true});
  fs.copyFileSync(src,dst);
}

const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
const requiredMarkers=[
  'FluentIA',
  "APP_VERSION='6.4.0'",
  'renderSprint',
  'renderShadowing',
  'levelExamPassed',
  'Provas e certificado'
];
for(const marker of requiredMarkers){
  if(!html.includes(marker)) throw new Error('index.html missing required production marker: '+marker);
}

const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const tmp=path.join(out,'.inline-check.js');
fs.writeFileSync(tmp,scripts);
const chk=spawnSync(process.execPath,['--check',tmp],{encoding:'utf8'});
fs.unlinkSync(tmp);
if(chk.status!==0) throw new Error(chk.stderr||chk.stdout||'Inline JS syntax error');

JSON.parse(fs.readFileSync(path.join(out,'manifest.webmanifest'),'utf8'));
const sw=spawnSync(process.execPath,['--check',path.join(out,'sw.js')],{encoding:'utf8'});
if(sw.status!==0) throw new Error(sw.stderr||sw.stdout||'Service worker syntax error');

if(/AIza[0-9A-Za-z_-]{25,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(html)){
  throw new Error('Possible secret detected in client bundle');
}

const sha=x=>crypto.createHash('sha256').update(fs.readFileSync(x)).digest('hex');
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({
  app:'FluentIA',
  version:'6.4.0',
  builtAt:new Date().toISOString(),
  validation:'inline-js+manifest+service-worker+secret-scan',
  indexSha256:sha(path.join(out,'index.html'))
},null,2));

console.log('FluentIA 6.4.0 production build verified.');
