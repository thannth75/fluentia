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

function unpack(rel,meta,baseDir){
  const b64=meta.parts.map(n=>fs.readFileSync(path.join(baseDir,n),'utf8').trim()).join('');
  let raw=Buffer.from(b64,'base64');
  raw=zlib.gunzipSync(raw);
  const got=sha256(raw);
  if(got!==meta.sha256) throw new Error(`Integrity failed for ${rel}: expected ${meta.sha256}, got ${got}`);
  write(rel,raw);
}

// Only the curriculum files that predate v6 remain in the legacy pack.
// Do not rebuild old UI/app versions or reapply historical patches.
const legacy=JSON.parse(fs.readFileSync(path.join(root,'pack-manifest.json'),'utf8'));
for(const rel of ['data.js','data-v4.js','data-v5.js']){
  if(!legacy[rel]) throw new Error('Missing legacy manifest entry: '+rel);
  unpack(rel,legacy[rel],path.join(root,'parts'));
}

// v6.3 is the authoritative production release.
const relDir=path.join(root,'release-v63');
const release=JSON.parse(fs.readFileSync(path.join(relDir,'manifest.json'),'utf8'));
for(const [rel,meta] of Object.entries(release)){
  const b64=meta.parts.map(n=>fs.readFileSync(path.join(relDir,n),'utf8').trim()).join('');
  let raw=Buffer.from(b64,'base64');
  if(meta.gzip) raw=zlib.gunzipSync(raw);
  const got=sha256(raw);
  if(got!==meta.sha256) throw new Error(`FluentIA 6.3 integrity failed for ${rel}: expected ${meta.sha256}, got ${got}`);
  write(rel,raw);
}

const required=[
  'index.html','styles.css','data.js','data-v4.js','data-v5.js','data-v6.js',
  'app.js','sw.js','manifest.webmanifest',
  'icons/icon-192.png','icons/icon-512.png','assets/lia-3d.webp'
];
for(const rel of required){
  if(!fs.existsSync(path.join(out,rel))) throw new Error('Missing production asset: '+rel);
}

// Prevent accidental publication of obvious secrets.
for(const rel of ['index.html','app.js','data.js','data-v4.js','data-v5.js','data-v6.js','sw.js']){
  const txt=fs.readFileSync(path.join(out,rel),'utf8');
  if(/AIza[0-9A-Za-z_-]{25,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/.test(txt)){
    throw new Error('Possible secret detected in production asset: '+rel);
  }
}

fs.writeFileSync(path.join(out,'build-info.json'),JSON.stringify({
  app:'FluentIA',
  version:'6.3.1',
  builtAt:new Date().toISOString(),
  integrity:'sha256-verified'
},null,2));

console.log('FluentIA 6.3.1 build OK — authoritative release reconstructed and verified.');
