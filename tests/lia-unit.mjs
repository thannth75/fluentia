import handler from '../api/lia.js';

function mockReq(method='POST',body={}){
  return {
    method,
    body,
    headers:{
      'content-type':'application/json',
      'sec-fetch-site':'same-origin',
      'x-forwarded-for':'127.0.0.1'
    },
    socket:{remoteAddress:'127.0.0.1'}
  };
}
function mockRes(){
  return {
    statusCode:200,
    headers:{},
    body:null,
    setHeader(k,v){this.headers[String(k).toLowerCase()]=v;},
    status(n){this.statusCode=n;return this;},
    json(v){this.body=v;return this;}
  };
}

{
  const res=mockRes();
  await handler(mockReq('POST',{
    message:'I no understand',
    level:'A1',
    goal:'Ask for clarification',
    nextPrompt:'Could you say that again, please?'
  }),res);
  if(res.statusCode!==200) throw new Error('Expected Lia POST 200, got '+res.statusCode);
  if(!res.body?.reply || !/don.t understand/i.test(res.body.reply)) throw new Error('Expected correction in Lia reply');
  if(res.body.mode!=='local') throw new Error('Expected explicit local fallback mode');
}
{
  const res=mockRes();
  await handler(mockReq('POST',{}),res);
  if(res.statusCode!==400 || res.body?.error!=='empty_message') throw new Error('Empty message validation failed');
}
{
  const res=mockRes();
  await handler(mockReq('GET',{}),res);
  if(res.statusCode!==405 || res.body?.error!=='method_not_allowed') throw new Error('GET protection failed');
}
console.log('Lia endpoint unit test OK.');
