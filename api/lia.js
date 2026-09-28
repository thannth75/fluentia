const buckets=new Map();
const WINDOW=60_000, LIMIT=20;
function allow(key){const now=Date.now();let b=buckets.get(key)||{t:now,n:0};if(now-b.t>WINDOW)b={t:now,n:0};b.n++;buckets.set(key,b);return b.n<=LIMIT;}
const clean=s=>String(s||'').replace(/[<>]/g,'').trim().slice(0,1200);
function localCoach(text){
  const t=clean(text); const low=t.toLowerCase();
  const fixes=[];
  if(/\bi am agree\b/i.test(t))fixes.push('Use “I agree”, sem “am”.');
  if(/\bi have \d+ years/i.test(t))fixes.push('Para idade, prefira “I am … years old”.');
  if(/\bi no understand\b/i.test(t))fixes.push('Use “I don’t understand.”');
  if(/\bmore better\b/i.test(t))fixes.push('Use apenas “better”.');
  const wc=t.split(/\s+/).filter(Boolean).length;
  const next=low.includes('?')?'Now answer your own question with one reason.':'Add one reason, example, or result to make the answer more natural.';
  return {mode:'local',reply:fixes.length?`Good attempt. ${fixes.join(' ')} ${next}`:`Good. I understood you. ${wc<6?'Try a complete sentence with one extra detail.':next}`};
}
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
  const ip=(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').toString().split(',')[0].trim();
  if(!allow(ip))return res.status(429).json({error:'rate_limited',retryAfter:60});
  const body=typeof req.body==='string'?(()=>{try{return JSON.parse(req.body)}catch{return {}}})():req.body||{};
  const message=clean(body.message);
  if(!message)return res.status(400).json({error:'empty_message'});
  return res.status(200).json(localCoach(message));
}
