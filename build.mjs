import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'pack-manifest.json'), 'utf8'));
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const [rel, meta] of Object.entries(manifest)) {
  const b64 = meta.parts.map(name => fs.readFileSync(path.join(root, 'parts', name), 'utf8').trim()).join('');
  const raw = zlib.gunzipSync(Buffer.from(b64, 'base64'));
  const digest = crypto.createHash('sha256').update(raw).digest('hex');
  if (digest !== meta.sha256) throw new Error(`Integrity check failed for ${rel}: ${digest}`);
  const target = path.join(out, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, raw);
}

function replaceExact(source, oldText, newText, label) {
  const at = source.indexOf(oldText);
  if (at < 0) throw new Error(`FluentIA v5 patch anchor not found: ${label}`);
  if (source.indexOf(oldText, at + Math.max(1, oldText.length)) >= 0) throw new Error(`FluentIA v5 patch anchor is ambiguous: ${label}`);
  return source.slice(0, at) + newText + source.slice(at + oldText.length);
}

const patchB64 = fs.readFileSync(path.join(root, 'parts', 'v5_app_patch.b64'), 'utf8').trim();
const patchRaw = zlib.gunzipSync(Buffer.from(patchB64, 'base64'));
const patchDigest = crypto.createHash('sha256').update(patchRaw).digest('hex');
if (patchDigest !== 'f5a36ecddbe766c2b645d643ff3fbd1578ce3e15024ecc959d151580ee4a2519') throw new Error('FluentIA v5 patch integrity check failed');

const patch = JSON.parse(patchRaw.toString('utf8'));
let app = fs.readFileSync(path.join(out, 'app.js'), 'utf8');

app = replaceExact(app, patch[0].old, patch[0].new, 'APP_VERSION');
const skillAnchor = "  function skillBarsHtml(){return Object.entries(SKILL_LABELS).map(([k,v])=>`<div class=\"skill-bar\"><div class=\"row\"><span>\${v}</span><b>\${state.scores[k]||0}%</b></div><div class=\"track\"><i style=\"width:\${state.scores[k]||0}%\"></i></div></div>`).join('');}\n";
app = replaceExact(app, skillAnchor, skillAnchor + patch[1].new, 'Lia helpers');
app = replaceExact(app, patch[2].old, patch[2].new, 'home avatar');
const dailyAnchor = "      goalTask,\n      {icon:'🎧',title:'Treino de escuta'";
app = replaceExact(app, dailyAnchor, "      goalTask,\n" + patch[3].new + "      {icon:'🎧',title:'Treino de escuta'", 'daily Lia mission');
app = replaceExact(app, patch[4].old, patch[4].new, 'talk screen');
app = replaceExact(app, patch[5].old, patch[5].new, 'Lia speaking animation');

const finalDigest = crypto.createHash('sha256').update(Buffer.from(app)).digest('hex');
if (finalDigest !== 'a958d9bf96a15e9ebae92c936f5fa507be60741f2a13fa9b5a262a80a534baef') throw new Error(`FluentIA v5 app.js final hash mismatch: ${finalDigest}`);
fs.writeFileSync(path.join(out, 'app.js'), app);

console.log(`FluentIA v5 build OK: ${Object.keys(manifest).length} assets + Lia patch verified in dist/`);
