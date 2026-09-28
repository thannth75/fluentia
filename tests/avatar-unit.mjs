import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');

const required=[
  'FLUENTIA_LIA_3D_V1',
  'function liaAvatarHtml',
  'function setLiaMood',
  "data-lia-avatar",
  "setLiaMood('listening'",
  "setLiaMood('thinking'",
  "setLiaMood('speaking'",
  "setLiaMood('correcting'",
  "setLiaMood('happy'",
  "setLiaMood(passed?'celebrate':'coach'",
  'lia-companion',
  'lia-mouth3d',
  'lia-eye3d',
  'pointermove'
];

for(const marker of required){
  assert.ok(html.includes(marker), 'Missing avatar marker: '+marker);
}

const moods=['idle','listening','thinking','speaking','correcting','happy','celebrate','coach'];
for(const mood of moods){
  assert.ok(html.includes(mood), 'Missing Lia mood: '+mood);
}

assert.ok(html.includes("u.onstart=()=>setLiaMood('speaking'"), 'Speech start is not linked to Lia');
assert.ok(html.includes("r.onstart=()=>setLiaMood('listening'"), 'Recognition start is not linked to Lia');
assert.ok(html.includes("aria-label="Lia, professora virtual 3D interativa""), 'Avatar accessibility label missing');

console.log('FluentIA Lia 3D interaction tests passed.');
