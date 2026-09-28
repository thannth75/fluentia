import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import crypto from 'node:crypto';

const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const publish=['index.html','manifest.webmanifest','sw.js','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
for(const rel of publish){
  const src=path.join(root,rel);
  const dst=path.join(out,rel);
  if(!fs.existsSync(src)) throw new Error('Missing '+rel);
  fs.mkdirSync(path.dirname(dst),{recursive:true});
  fs.copyFileSync(src,dst);
}

const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
const requiredMarkers=[
  'FluentIA',
  "APP_VERSION='7.0.0'",
  'FLUENTIA_LIA_3D_V1',
  'FLUENTIA_6_6_PREMIUM_UI',
  'FLUENTIA_7_SPEAK_FIRST',
  'function liaAvatarHtml',
  'function setLiaMood',
  "setLiaMood('listening'",
  "setLiaMood('speaking'",
  "setLiaMood('thinking'",
  "setLiaMood(fb.corrected!==text?'correcting':'happy'",
  "setLiaMood(passed?'celebrate':'coach'",
  'data-lia-avatar',
  'renderSprint',
  'renderShadowing',
  'renderArcade',
  'conversationHistory',
  'lessonTransferScore',
  'data-save-word',
  'levelExamPassed',
  'Provas e certificado',
  "fetch('/api/lia'"
];
for(const marker of requiredMarkers){
  if(!html.includes(marker)) throw new Error('index.html missing required production marker: '+marker);
}
for(const m of html.matchAll(/<(?:link|script)[^>]+(?:href|src)=["']([^"'?#]+)["']/gi)){
  const ref=m[1];
  if(/^(?:https?:|data:|#)/i.test(ref)) continue;
  const rel=ref.replace(/^\//,'');
  if(!fs.existsSync(path.join(out,rel))) throw new Error('HTML references missing production asset: '+ref);
}

const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const tmp=path.join(out,'.inline-check.js');
fs.writeFileSync(tmp,scripts);
const chk=spawnSync(process.execPath,['--check',tmp],{encoding:'utf8'});
fs.unlinkSync(tmp);
if(chk.status!==0) throw new Error(chk.stderr||chk.stdout||'Inline JS syntax error');

JSON.parse(fs.readFileSync(path.join(out,'manifest.webmanifest'),'utf8'));
for(const js of ['sw.js']){
  const c=spawnSync(process.execPath,['--check',path.join(out,js)],{encoding:'utf8'});
  if(c.status!==0) throw new Error(c.stderr||c.stdout||('Syntax error: '+js));
}
if(!fs.readFileSync(path.join(out,'icons/icon.svg'),'utf8').includes('<svg')) throw new Error('Invalid SVG: icons/icon.svg');
for(const rel of ['icons/icon-192.png','icons/icon-512.png']){
  const b=fs.readFileSync(path.join(out,rel));
  if(b.length<100 || b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a') throw new Error('Invalid PNG: '+rel);
}
if(/AIza[0-9A-Za-z_-]{25,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(html)){
  throw new Error('Possible secret detected in client bundle');
}

const sha=x=>crypto.createHash('sha256').update(fs.readFileSync(x)).digest('hex');
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({
  app:'FluentIA',
  version:'7.0.0',
  builtAt:new Date().toISOString(),
  validation:'inline-js+lia-3d+lia-api+speak-first+voice-gates+arcade+transcript+vocab-save+manifest+service-worker+assets+secret-scan',
  indexSha256:sha(path.join(out,'index.html'))
},null,2));

console.log('FluentIA 7.0.0 production build verified — Speak First engine enabled.');
