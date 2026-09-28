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
const safeHistory=h=>Array.isArray(h)?h.slice(-8).map(x=>({role:x?.role==='ai'?'model':'user',text:clean(x?.text,500)})).filter(x=>x.text):[];

function localCoach({message,nextPrompt,goal,level}){
  const t=clean(message),fixes=[];
  if(/\bi am agree\b/i.test(t))fixes.push('Use “I agree”, sem “am”.');
  if(/\bi have \d+ years/i.test(t))fixes.push('Para idade, prefira “I am … years old”.');
  if(/\bi no understand\b/i.test(t))fixes.push('Use “I don’t understand.”');
  if(/\bmore better\b/i.test(t))fixes.push('Use apenas “better”.');
  if(/\bi make deliveries yesterday\b/i.test(t))fixes.push('Para ontem, use “I made deliveries yesterday.”');
  if(/\bpeople is\b/i.test(t))fixes.push('Use “people are”.');
  const wc=t.split(/\s+/).filter(Boolean).length;
  const expansion=wc<6?'Try one complete sentence with one extra detail.':wc<12?'Add one reason, example, or result.':'Good expansion. Now connect your ideas more naturally.';
  const levelHint=['A0','A1'].includes(clean(level,4))?'Keep it simple and clear.':['B2','C1','C2'].includes(clean(level,4))?'Use a connector and add nuance when you can.':'';
  const next=clean(nextPrompt,240);
  return {mode:'local',reply:[fixes.length?'Good attempt. '+fixes.join(' '):'Good. I understood your message.',expansion,levelHint,next].filter(Boolean).join(' ')};
}

async function geminiCoach(input){
  const key=process.env.GEMINI_API_KEY;
  if(!key)return null;
  const model=process.env.GEMINI_MODEL||'gemini-3.5-flash-lite';
  const history=safeHistory(input.history);
  const system=[
    'You are Lia, the English speaking coach inside FluentIA.',
    'Teach through conversation, not lectures.',
    'The learner level is '+clean(input.level,8)+'.',
    'Scenario: '+clean(input.scenario,100)+'. Goal: '+clean(input.goal,180)+'.',
    'Reply mainly in English at the learner level. Use brief Portuguese only when a correction would otherwise be unclear.',
    'When there is an error, follow this compact pattern: Entendi você → Forma melhor → Por quê → Como soaria natural.',
    'Correct only the most important 1-2 issues so the conversation keeps flowing.',
    'Always continue the conversation with one natural question or prompt.',
    'Never claim the learner passed a level, is fluent, native, certified, or approved. The assessment engine controls that.',
    'Do not ask for sensitive personal data.',
    'Keep the response under 120 words.'
  ].join('\n');
  const contents=[
    ...history.map(x=>({role:x.role,parts:[{text:x.text}]})),
    {role:'user',parts:[{text:'Learner message: '+clean(input.message,1200)+'\nCurrent prompt: '+clean(input.currentPrompt,240)+'\nSuggested next task: '+clean(input.nextPrompt,240)}]}
  ];
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),6500);
  try{
    const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':key},
      body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents,generationConfig:{maxOutputTokens:260}}),
      signal:ctrl.signal
    });
    if(!res.ok)return null;
    const data=await res.json();
    const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('').trim();
    return reply?{mode:'ai',model,reply:clean(reply,1800)}:null;
  }catch{return null;}finally{clearTimeout(timer);}
}

export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST')return res.status(405).json({error:'method_not_allowed'});
  const site=String(req.headers['sec-fetch-site']||'');
  if(site&&!['same-origin','same-site','none'].includes(site))return res.status(403).json({error:'cross_site_blocked'});
  const type=String(req.headers['content-type']||'');
  if(type&&!type.toLowerCase().includes('application/json'))return res.status(415).json({error:'json_required'});
  const ip=(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').toString().split(',')[0].trim();
  if(!allow(ip))return res.status(429).json({error:'rate_limited',retryAfter:60});
  const body=typeof req.body==='string'?(()=>{try{return JSON.parse(req.body)}catch{return {}}})():req.body||{};
  const message=clean(body.message);
  if(!message)return res.status(400).json({error:'empty_message'});
  const input={message,nextPrompt:body.nextPrompt,goal:body.goal,level:body.level,scenario:body.scenario,currentPrompt:body.currentPrompt,history:body.history};
  const ai=await geminiCoach(input);
  return res.status(200).json(ai||localCoach(input));
}
