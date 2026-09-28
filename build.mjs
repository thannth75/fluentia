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
  if (digest !== meta.sha256) throw new Error(`Integrity check failed for ${rel}`);
  const target = path.join(out, rel);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, raw);
}
console.log(`FluentIA build OK: ${Object.keys(manifest).length} files reconstructed in dist/`);
