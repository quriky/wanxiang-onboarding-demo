(function(){
'use strict';
const KEY='wx-activity-demo-v7',VERSION=1,RESET_KEY='wx-unified-demo-reset-v1';
const RESET_KEYS=[KEY,'wx-unified-portal-state-v1','wx-unified-portal-status-v1','wx-unified-handoff-v1','wx-unified-kaigong-draft-v1','wx-unified-kaigong-guide-v1','wx-unified-kaigong-nav-read-v1'];let resetting=false,resetChannel=null;
function readEpoch(){try{return Number(localStorage.getItem(RESET_KEY))||0}catch{return 0}}
function clearForReset(epoch){try{for(const key of RESET_KEYS)localStorage.removeItem(key);localStorage.setItem(RESET_KEY,String(epoch))}catch{}}
const TASKS=[
 {id:'join',stage:1,title:'开通新手体验礼包',description:'模拟开通后自动记录，基础权益立即到账。',points:20,route:'activity',auto:true},
 {id:'case',stage:1,title:'看看一个感兴趣的案例',description:'打开案例详情，找到适合自己的创作方向。',points:30,route:'cases'},
 {id:'app',stage:1,title:'打开万象开工',description:'进入开工网页演示，认识对话入口。',points:50,route:'app-detail'},
 {id:'visit2',stage:2,title:'第 2 天签到',description:'第二个不同日期回来后可签到领奖，同一天不重复累计。',points:60,route:'activity',auto:true},
 {id:'hire',stage:2,title:'录用员工，完成一次工作对话',description:'可提前探索；正式任务需录用和回复均成功。',points:70,route:'market'},
 {id:'phone',stage:2,title:'连接手机，或完成一次资料引用',description:'不方便关联手机时，可选择资料引用替代。',points:80,route:'phone'},
 {id:'visit3',stage:3,title:'第 3 天签到',description:'第三个不同日期回来后可签到领奖，不要求连续三天。',points:80,route:'activity',auto:true},
 {id:'create',stage:3,title:'创建专属员工，并交给它一件事',description:'创建和工作对话都完成后记录进度。',points:100,route:'createAgent'},
 {id:'automation',stage:3,title:'保存一条自动化任务',description:'检查执行内容和时间后，模拟保存成功。',points:110,route:'automation'}
];
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function dateNumber(d){return Date.parse(d+'T00:00:00+08:00')/86400000}
function datePlus(d,n){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date((dateNumber(d)+n)*86400000))}
function empty(epoch=readEpoch()){return {resetEpoch:epoch,topups:[],version:VERSION,purchased:false,start:'',demoDay:1,visits:[],completed:{},claimed:{},flags:{},noticeSeen:{}}}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY));if(!x||x.version!==VERSION||Number(x.resetEpoch||0)<readEpoch())return empty();return {...empty(),...x,topups:Array.isArray(x.topups)?x.topups.filter(t=>t&&typeof t.id==='string'&&Number.isInteger(t.amount)&&t.amount>=10&&t.amount<=1000000&&t.points===t.amount*100&&Number.isFinite(t.at)):[],visits:Array.isArray(x.visits)?x.visits.filter(n=>Number.isInteger(n)&&n>=1&&n<=7):[],completed:x.completed&&typeof x.completed==='object'?x.completed:{},claimed:x.claimed&&typeof x.claimed==='object'?x.claimed:{},flags:x.flags&&typeof x.flags==='object'?x.flags:{}}}catch{return empty()}}
let fallback=empty();
// Carry the demonstration ledger between separate file:// pages as well as HTTP pages.
try{const h=new URLSearchParams(location.hash.slice(1)),raw=h.get('campaign');if(raw){const value=JSON.parse(raw),incomingEpoch=Number(value?.resetEpoch||0),localEpoch=readEpoch();if(value?.version===VERSION&&incomingEpoch>=localEpoch){if(incomingEpoch>localEpoch)clearForReset(incomingEpoch);fallback={...empty(),...value,resetEpoch:incomingEpoch};try{localStorage.setItem(KEY,JSON.stringify(fallback))}catch{}}else if(incomingEpoch<localEpoch)h.delete('handoff');h.delete('campaign');try{window.history.replaceState(null,'',location.pathname+location.search+(h.size?'#'+h.toString():''))}catch{}}}catch{}
function load(){try{if(localStorage.getItem(KEY)===null)return Number(fallback.resetEpoch||0)>=readEpoch()?fallback:empty();return read()}catch{return fallback}}
function day(s){return s.purchased?Math.max(1,s.demoDay,Math.floor(dateNumber(today())-dateNumber(s.start))+1):1}
function save(s){if(Number(s.resetEpoch||0)<readEpoch())return;fallback=s;try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}window.dispatchEvent(new CustomEvent('wx-campaign-change'))}
function sync(s){if(!s.purchased)return s;const d=day(s);if(d<=7&&!s.visits.includes(d))s.visits.push(d);s.visits=[...new Set(s.visits)].sort((a,b)=>a-b);if(s.visits.length>=2&&!s.completed.visit2)s.completed.visit2={day:s.visits[1],source:'return'};if(s.visits.length>=3&&!s.completed.visit3)s.completed.visit3={day:s.visits[2],source:'return'};return s}
function snapshot(){const s=load();return {...s,currentDay:day(s),uses:s.visits.length,basePoints:s.purchased?200:0,claimedPoints:TASKS.reduce((n,t)=>n+(s.claimed[t.id]?t.points:0),0),topupPoints:(s.topups||[]).reduce((n,t)=>n+t.points,0),balancePoints:(s.purchased?200:0)+TASKS.reduce((n,t)=>n+(s.claimed[t.id]?t.points:0),0)+(s.topups||[]).reduce((n,t)=>n+t.points,0),taskDeadline:s.purchased?datePlus(s.start,6):'',claimDeadline:s.purchased?datePlus(s.start,14):'',rightsDeadline:s.purchased?datePlus(s.start,29):''}}
function status(t,s=snapshot()){
 if(s.claimed[t.id])return 'claimed';if(!s.purchased)return 'unopened';if(s.currentDay>15)return 'expired';
 if(!s.completed[t.id])return s.currentDay>7?'closed':'todo';
 if(s.uses<t.stage)return s.currentDay>7?'locked-closed':'early';return 'claimable';
}
function touch(){const s=load();if(!s.purchased)return;const before=JSON.stringify(s);sync(s);if(JSON.stringify(s)!==before)save(s)}
function purchase(){let s=load();if(s.purchased)return false;s={...empty(),topups:s.topups||[],noticeSeen:s.noticeSeen||{},resetEpoch:s.resetEpoch||readEpoch(),purchased:true,start:today()};s.completed.join={day:1,source:'purchase'};sync(s);save(s);return true}
function complete(id,source='control'){
 const t=TASKS.find(t=>t.id===id),s=load();if(!t||!s.purchased||day(s)>7||t.auto||s.completed[id])return false;
 sync(s);s.completed[id]={day:day(s),source};save(s);return true;
}
function claim(ids){const s=load();sync(s);const v={...s,currentDay:day(s),uses:s.visits.length};let points=0;const claimed=[];for(const t of TASKS){if(ids.includes(t.id)&&status(t,v)==='claimable'){s.claimed[t.id]={day:day(s)};points+=t.points;claimed.push(t.id)}}if(claimed.length)save(s);return {points,ids:claimed}}
function claimAll(){return claim(TASKS.map(t=>t.id))}
function simulateDay(n){const s=load();if(!s.purchased||!Number.isInteger(n)||n<day(s)||n>31)return false;s.demoDay=n;sync(s);save(s);return true}
function simulateAll(){let n=0;for(const t of TASKS)if(!t.auto&&complete(t.id,'control'))n++;return n}
function record(event){const s=load();if(!s.purchased||day(s)>7)return;const direct={case:'case',app:'app',reference:'phone',automation:'automation'};if(direct[event]){complete(direct[event],'page-event');return}const allowed=['hired','employee-reply','created','created-reply'];if(!allowed.includes(event))return;s.flags[event]=true;save(s);if(s.flags.hired&&s.flags['employee-reply'])complete('hire','page-event');if(s.flags.created&&s.flags['created-reply'])complete('create','page-event')}
function reset(){const s=load();save({...empty(),resetEpoch:s.resetEpoch||readEpoch(),topups:s.topups||[]})}
function recharge(amount,id){const s=load();if(!Number.isInteger(amount)||amount<10||amount>1000000||typeof id!=='string'||!id||id.length>100)return {ok:false,points:0};s.topups=s.topups||[];if(s.topups.some(t=>t.id===id))return {ok:true,duplicate:true,points:0};const entry={id,amount,points:amount*100,at:Date.now()};s.topups.push(entry);save(s);return {ok:true,points:entry.points}}
function acceptReset(epoch){if(resetting||!Number.isInteger(epoch)||epoch<readEpoch())return;resetting=true;clearForReset(epoch);fallback=empty(epoch);save(fallback);window.dispatchEvent(new CustomEvent('wx-demo-reset',{detail:{epoch}}))}
function resetAll(){const epoch=Math.max(Date.now(),readEpoch()+1);acceptReset(epoch);try{resetChannel?.postMessage({epoch})}catch{}return epoch}
try{resetChannel=new BroadcastChannel('wx-unified-demo-reset-v1');resetChannel.onmessage=e=>acceptReset(Number(e.data?.epoch))}catch{}
addEventListener('storage',e=>{if(e.key===RESET_KEY&&Number(e.newValue)>0)acceptReset(Number(e.newValue))});
function decorateUrl(href){const u=new URL(href,location.href),h=new URLSearchParams(u.hash.slice(1));h.set('campaign',JSON.stringify(load()));u.hash=h.toString();return u.href}
function reminder(){const s=snapshot();if(!s.purchased)return {key:'offer-v9',title:'来看看新手体验礼包',text:'9.9 元礼包包含 30 天体验和基础积分。7 天内来 3 天，完成任务后还可领取积分奖励。',cta:'查看新手礼包',stage:1};if(s.currentDay>15)return null;const ready=TASKS.filter(t=>status(t,s)==='claimable'),points=ready.reduce((n,t)=>n+t.points,0);if(!points&&s.currentDay>7)return null;if(!points&&TASKS.every(t=>s.claimed[t.id]))return null;return {key:'paid:'+s.start+':'+s.currentDay,title:s.currentDay>7?'还有奖励，记得来领取':s.uses>1&&ready.some(t=>t.id==='visit2'||t.id==='visit3')?'欢迎回来，签到奖励可以领了':points?'你有新手积分待领取':'今天也来完成一件小事',text:s.currentDay>7?'当前有 '+points+' 积分可补领，请在 '+s.claimDeadline+' 23:59 前领取。补领期不再增加任务和签到进度。':points?'你有 '+points+' 积分满足领取条件。点击进入任务页，签到与任务奖励均需手动领取。':'任务进度已经保留。继续做一项感兴趣的任务，奖励按累计签到日期解锁。',cta:points?(s.currentDay>7?'去补领奖励':ready.some(t=>t.id.startsWith('visit'))?'去签到领奖':'去领取积分'):'继续新手任务',stage:ready.find(t=>t.id.startsWith('visit'))?.stage||(ready.length?ready[0].stage:Math.min(3,Math.max(1,s.uses)))};}
function reminderSeen(){const n=reminder();return !n||!!(load().noticeSeen||{})[n.key]}
function ackReminder(){const n=reminder();if(!n)return;const s=load();s.noticeSeen={...(s.noticeSeen||{}),[n.key]:true};save(s)}
window.WxCampaign={recharge,resetAll,get resetting(){return resetting},reminder,reminderSeen,ackReminder,tasks:TASKS,snapshot,status,purchase,complete,claim,claimAll,simulateDay,simulateAll,record,reset,touch,decorateUrl,key:KEY};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;try{const u=new URL(a.href,location.href);if(u.origin===location.origin&&/\/(index|kaigong|activity)\.html$/.test(u.pathname))a.href=decorateUrl(a.href)}catch{}},true);
touch();
})();
