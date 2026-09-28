import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';

const root=process.cwd();
const out=path.join(root,'dist');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const sha256=b=>crypto.createHash('sha256').update(b).digest('hex');
const write=(rel,buf)=>{const p=path.join(out,rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,buf);};

function decodePacked(rel,meta,baseDir,gzip=true){
  const b64=meta.parts.map(n=>{
    const p=path.join(baseDir,n);
    if(!fs.existsSync(p)) throw new Error('Missing packed part: '+p);
    return fs.readFileSync(p,'utf8').trim();
  }).join('');
  let raw=Buffer.from(b64,'base64');
  if(gzip) raw=zlib.gunzipSync(raw);
  if(!raw.length) throw new Error('Decoded empty asset: '+rel);
  write(rel,raw);
  return raw;
}

// Legacy packs are used only for curriculum data that v6.3 still imports.
const legacy=JSON.parse(fs.readFileSync(path.join(root,'pack-manifest.json'),'utf8'));
for(const rel of ['data.js','data-v4.js','data-v5.js']){
  if(!legacy[rel]) throw new Error('Missing legacy manifest entry: '+rel);
  decodePacked(rel,legacy[rel],path.join(root,'parts'),true);
}

// v6.3 is the authoritative application/UI release.
const relDir=path.join(root,'release-v63');
const release=JSON.parse(fs.readFileSync(path.join(relDir,'manifest.json'),'utf8'));
for(const [rel,meta] of Object.entries(release)){
  decodePacked(rel,meta,relDir,!!meta.gzip);
}

const required=[
  'index.html','styles.css','data.js','data-v4.js','data-v5.js','data-v6.js',
  'app.js','sw.js','manifest.webmanifest',
  'icons/icon-192.png','icons/icon-512.png','assets/lia-3d.webp'
];
for(const rel of required){
  if(!fs.existsSync(path.join(out,rel))) throw new Error('Missing production asset: '+rel);
}

// Structural validation is performed on the exact bytes Vercel will publish.
for(const rel of ['app.js','data.js','data-v4.js','data-v5.js','data-v6.js','sw.js']){
  const p=path.join(out,rel);
  const chk=spawnSync(process.execPath,['--check',p],{encoding:'utf8'});
  if(chk.status!==0) throw new Error('JavaScript syntax failed for '+rel+'\n'+(chk.stderr||chk.stdout||''));
}
JSON.parse(fs.readFileSync(path.join(out,'manifest.webmanifest'),'utf8'));

const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
for(const needle of ['FluentIA','app.js','styles.css']){
  if(!html.includes(needle)) throw new Error('index.html missing required marker: '+needle);
}

const png192=fs.readFileSync(path.join(out,'icons/icon-192.png'));
const png512=fs.readFileSync(path.join(out,'icons/icon-512.png'));
for(const [name,b] of [['icon-192.png',png192],['icon-512.png',png512]]){
  if(b.length<100 || b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a') throw new Error('Invalid PNG: '+name);
}
const webp=fs.readFileSync(path.join(out,'assets/lia-3d.webp'));
if(webp.length<100 || webp.subarray(0,4).toString()!=='RIFF' || webp.subarray(8,12).toString()!=='WEBP') throw new Error('Invalid Lia WebP asset');

for(const rel of ['index.html','app.js','data.js','data-v4.js','data-v5.js','data-v6.js','sw.js']){
  const txt=fs.readFileSync(path.join(out,rel),'utf8');
  if(/AIza[0-9A-Za-z_-]{25,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(txt)){
    throw new Error('Possible secret detected in production asset: '+rel);
  }
}

const hashes={};
for(const rel of required){
  const b=fs.readFileSync(path.join(out,rel));
  hashes[rel]=sha256(b);
}
fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({
  app:'FluentIA',
  version:'6.3.1',
  builtAt:new Date().toISOString(),
  validation:'syntax-json-assets-secrets',
  hashes
},null,2));

console.log('FluentIA 6.3.1 build OK — production bytes structurally validated.');
