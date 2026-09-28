const buckets=new Map();
const WINDOW=60_000, LIMIT=20;
function allow(key){
  const now=Date.now();
  let b=buckets.get(key)||{t:now,n:0};
  if(now-b.t>WINDOW)b={t:now,n:0};
  b.n++;
  buckets.set(key,b);
  return b.n<=LIMIT;
}
const clean=(s,max=1200)=>String(s||'').replace(/[<>]/g,'').trim().slice(0,max);

function localCoach({message,nextPrompt,goal,level}){
  const t=clean(message), low=t.toLowerCase(), fixes=[];
  if(/\bi am agree\b/i.test(t))fixes.push('Use “I agree”, sem “am”.');
  if(/\bi have \d+ years/i.test(t))fixes.push('Para idade, prefira “I am … years old”.');
  if(/\bi no understand\b/i.test(t))fixes.push('Use “I don’t understand.”');
  if(/\bmore better\b/i.test(t))fixes.push('Use apenas “better”.');
  if(/\bi make deliveries yesterday\b/i.test(t))fixes.push('Para ontem, use “I made deliveries yesterday.”');
  if(/\bpeople is\b/i.test(t))fixes.push('Use “people are”.');
  const wc=t.split(/\s+/).filter(Boolean).length;
  const expansion=wc<6
    ?'Try one complete sentence with one extra detail.'
    :wc<12?'Add one reason, example, or result.'
    :'Good expansion. Now make the response more natural by connecting your ideas.';
  const levelHint=['A0','A1'].includes(clean(level,4))
    ?'Keep it simple and clear.'
    :['B2','C1','C2'].includes(clean(level,4))?'Use a connector and add nuance when you can.':'';
  const objective=clean(goal,180);
  const next=clean(nextPrompt,240);
  const parts=[
    fixes.length?'Good attempt. '+fixes.join(' '):'Good. I understood your message.',
    expansion,
    levelHint,
    objective?'Goal: '+objective+'.':'',
    next?next:''
  ].filter(Boolean);
  return {mode:'local',reply:parts.join(' ')};
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});

  const site=String(req.headers['sec-fetch-site']||'');
  if(site && !['same-origin','same-site','none'].includes(site)) return res.status(403).json({error:'cross_site_blocked'});
  const type=String(req.headers['content-type']||'');
  if(type && !type.toLowerCase().includes('application/json')) return res.status(415).json({error:'json_required'});

  const ip=(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').toString().split(',')[0].trim();
  if(!allow(ip))return res.status(429).json({error:'rate_limited',retryAfter:60});

  const body=typeof req.body==='string'?(()=>{try{return JSON.parse(req.body)}catch{return {}}})():req.body||{};
  const message=clean(body.message);
  if(!message)return res.status(400).json({error:'empty_message'});

  return res.status(200).json(localCoach({
    message,
    nextPrompt:body.nextPrompt,
    goal:body.goal,
    level:body.level
  }));
}
