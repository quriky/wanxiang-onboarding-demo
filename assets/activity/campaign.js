(function(){
'use strict';
const KEY='wx-activity-demo-v7',VERSION=1,RESET_KEY='wx-unified-demo-reset-v1';
const RESET_KEYS=[KEY,'wx-kaigong-welcome-v22','wx-kaigong-team-v22','wx-unified-portal-state-v1','wx-unified-portal-status-v1','wx-unified-handoff-v1','wx-unified-kaigong-draft-v1','wx-unified-kaigong-guide-v1','wx-unified-kaigong-nav-read-v1'];let resetting=false,resetChannel=null;
function readEpoch(){try{return Number(localStorage.getItem(RESET_KEY))||0}catch{return 0}}
function clearForReset(epoch){try{for(const key of RESET_KEYS)localStorage.removeItem(key);localStorage.setItem(RESET_KEY,String(epoch))}catch{}}
const TASKS=[
 {id:'remix',stage:1,title:'做一次同款',description:'挑选案例，点击做同款，把需求带入输入框。',points:100,route:'remix'},
 {id:'hire',stage:1,title:'新建一个数字员工，并对话一次',description:'在人才市场录用一位数字员工，再给它发送一项任务。',points:100,route:'market'},
 {id:'automation',stage:1,title:'配置一条定时任务',description:'写清工作和时间，核对草稿后保存。',points:100,route:'automation'},
 {id:'phone',stage:1,title:'关联微信',description:'进入链接手机，完成一次微信关联演示。',points:80,route:'phone'},
 {id:'case',stage:1,title:'看一个案例，点一次赞',description:'打开案例详情，再点击点赞。',points:50,route:'cases'},
 {id:'project',stage:1,title:'创建一个项目，并对话一次',description:'给项目起名，再在项目里发送一项工作需求。',points:70,route:'project'}
];
const OFFER={id:2,price:9.9,basePoints:1000,taskPoints:500,totalPoints:1500,rightsDays:30,duration:null};
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function dateNumber(d){return Date.parse(d+'T00:00:00+08:00')/86400000}
function datePlus(d,n){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date((dateNumber(d)+n)*86400000))}
function empty(epoch=readEpoch()){return {resetEpoch:epoch,topups:[],version:VERSION,offerVersion:OFFER.id,purchased:false,start:'',demoDay:1,visits:[],completed:{},claimed:{},flags:{},noticeSeen:{},legacyPoints:0}}
function migrate(s){if(s.offerVersion===OFFER.id)return s;const oldPoints={join:20,case:30,app:50,visit2:60,hire:70,phone:80,visit3:80,create:100,automation:110},completed={};for(const id of ['hire','automation'])if(s.completed?.[id])completed[id]=s.completed[id];return {...s,offerVersion:OFFER.id,legacyPoints:Number(s.legacyPoints||0)+Object.keys(s.claimed||{}).reduce((n,id)=>n+(oldPoints[id]||0),0),legacyActivity:{completed:s.completed||{},claimed:s.claimed||{}},completed,claimed:{},flags:{},noticeSeen:{}}}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY));if(!x||x.version!==VERSION||Number(x.resetEpoch||0)<readEpoch())return empty();return {...empty(),...x,offerVersion:x.offerVersion||1,topups:Array.isArray(x.topups)?x.topups.filter(t=>t&&typeof t.id==='string'&&Number.isInteger(t.amount)&&t.amount>=10&&t.amount<=1000000&&t.points===t.amount*100&&Number.isFinite(t.at)):[],visits:Array.isArray(x.visits)?x.visits.filter(n=>Number.isInteger(n)&&n>=1&&n<=7):[],completed:x.completed&&typeof x.completed==='object'?x.completed:{},claimed:x.claimed&&typeof x.claimed==='object'?x.claimed:{},flags:x.flags&&typeof x.flags==='object'?x.flags:{}}}catch{return empty()}}
let fallback=empty();
// Carry the demonstration ledger between separate file:// pages as well as HTTP pages.
try{const h=new URLSearchParams(location.hash.slice(1)),raw=h.get('campaign');if(raw){const value=JSON.parse(raw),incomingEpoch=Number(value?.resetEpoch||0),localEpoch=readEpoch();if(value?.version===VERSION&&incomingEpoch>=localEpoch){if(incomingEpoch>localEpoch)clearForReset(incomingEpoch);fallback={...empty(),...value,offerVersion:value.offerVersion||1,resetEpoch:incomingEpoch};try{localStorage.setItem(KEY,JSON.stringify(fallback))}catch{}}else if(incomingEpoch<localEpoch)h.delete('handoff');h.delete('campaign');try{window.history.replaceState(null,'',location.pathname+location.search+(h.size?'#'+h.toString():''))}catch{}}}catch{}
function load(){try{if(localStorage.getItem(KEY)===null)return migrate(Number(fallback.resetEpoch||0)>=readEpoch()?fallback:empty());return migrate(read())}catch{return migrate(fallback)}}
function day(s){return s.purchased?Math.max(1,s.demoDay,Math.floor(dateNumber(today())-dateNumber(s.start))+1):1}
function save(s){if(Number(s.resetEpoch||0)<readEpoch())return;fallback=s;try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}window.dispatchEvent(new CustomEvent('wx-campaign-change'))}
function sync(s){if(!s.purchased)return s;const d=day(s);if(!s.visits.includes(d))s.visits.push(d);s.visits=[...new Set(s.visits)].sort((a,b)=>a-b);return s}
function snapshot(){const s=load(),claimedPoints=TASKS.reduce((n,t)=>n+(s.claimed[t.id]?t.points:0),0),topupPoints=(s.topups||[]).reduce((n,t)=>n+t.points,0),basePoints=s.purchased?OFFER.basePoints:0;return {...s,currentDay:day(s),uses:s.visits.length,basePoints,claimedPoints,topupPoints,balancePoints:basePoints+claimedPoints+topupPoints+Number(s.legacyPoints||0),taskDeadline:'',claimDeadline:'',rightsDeadline:s.purchased?datePlus(s.start,29):''}}
function status(t,s=snapshot()){
 if(s.claimed[t.id])return 'claimed';if(!s.purchased)return 'unopened';return s.completed[t.id]?'claimable':'todo';
}
function touch(){const s=load();if(!s.purchased)return;const before=JSON.stringify(s);sync(s);if(JSON.stringify(s)!==before)save(s)}
function purchase(){let s=load();if(s.purchased)return false;s={...empty(),topups:s.topups||[],noticeSeen:s.noticeSeen||{},resetEpoch:s.resetEpoch||readEpoch(),purchased:true,start:today()};sync(s);save(s);return true}
function complete(id,source='control'){
 const t=TASKS.find(t=>t.id===id),s=load();if(!t||!s.purchased||s.completed[id])return false;
 sync(s);s.completed[id]={day:day(s),source};save(s);return true;
}
function claim(ids){const s=load();sync(s);const v={...s,currentDay:day(s),uses:s.visits.length};let points=0;const claimed=[];for(const t of TASKS){if(ids.includes(t.id)&&status(t,v)==='claimable'){s.claimed[t.id]={day:day(s)};points+=t.points;claimed.push(t.id)}}if(claimed.length)save(s);return {points,ids:claimed}}
function claimAll(){return claim(TASKS.map(t=>t.id))}
function simulateDay(n){const s=load();if(!s.purchased||!Number.isInteger(n)||n<day(s)||n>31)return false;s.demoDay=n;sync(s);save(s);return true}
function simulateAll(){let n=0;for(const t of TASKS)if(!t.auto&&complete(t.id,'control'))n++;return n}
function record(event){const s=load();if(!s.purchased)return;const direct={remix:'remix','phone-linked':'phone',automation:'automation'};if(direct[event]){complete(direct[event],'page-event');return}const allowed=['hired','employee-reply','case','case-like','project-created','project-reply'];if(!allowed.includes(event))return;s.flags[event]=true;save(s);if(s.flags.hired&&s.flags['employee-reply'])complete('hire','page-event');if(s.flags.case&&s.flags['case-like'])complete('case','page-event');if(s.flags['project-created']&&s.flags['project-reply'])complete('project','page-event')}
function reset(){const s=load();save({...empty(),resetEpoch:s.resetEpoch||readEpoch(),topups:s.topups||[]})}
function recharge(amount,id){const s=load();if(!Number.isInteger(amount)||amount<10||amount>1000000||typeof id!=='string'||!id||id.length>100)return {ok:false,points:0};s.topups=s.topups||[];if(s.topups.some(t=>t.id===id))return {ok:true,duplicate:true,points:0};const entry={id,amount,points:amount*100,at:Date.now()};s.topups.push(entry);save(s);return {ok:true,points:entry.points}}
function acceptReset(epoch){if(resetting||!Number.isInteger(epoch)||epoch<readEpoch())return;resetting=true;clearForReset(epoch);fallback=empty(epoch);save(fallback);window.dispatchEvent(new CustomEvent('wx-demo-reset',{detail:{epoch}}))}
function resetAll(){const epoch=Math.max(Date.now(),readEpoch()+1);acceptReset(epoch);try{resetChannel?.postMessage({epoch})}catch{}return epoch}
try{resetChannel=new BroadcastChannel('wx-unified-demo-reset-v1');resetChannel.onmessage=e=>acceptReset(Number(e.data?.epoch))}catch{}
addEventListener('storage',e=>{if(e.key===RESET_KEY&&Number(e.newValue)>0)acceptReset(Number(e.newValue))});
function decorateUrl(href){const u=new URL(href,location.href),h=new URLSearchParams(u.hash.slice(1));h.set('campaign',JSON.stringify(load()));u.hash=h.toString();return u.href}
function reminder(){const s=snapshot();if(!s.purchased)return {key:'offer-1500',title:'9.9元，先领1000积分开始用',text:'开通立即到账1000积分，完成6项新手任务再领500积分，合计1500积分，并享30天应用使用权。',cta:'查看新手礼包',stage:1};const ready=TASKS.filter(t=>status(t,s)==='claimable'),points=ready.reduce((n,t)=>n+t.points,0);if(!points&&TASKS.every(t=>s.claimed[t.id]))return null;return {key:'paid-1500:'+s.start+':'+s.currentDay,title:points?'你有新手积分待领取':'再试一项，领一份新手积分',text:points?'已有'+points+'积分可以领取，返回任务页手动领取即可。':'从做同款、数字员工对话等6项任务里挑一项，完成后分别领取奖励，合计可领500积分。',cta:points?'去领取积分':'继续新手任务',stage:1}}
function reminderSeen(){const n=reminder();return !n||!!(load().noticeSeen||{})[n.key]}
function ackReminder(){const n=reminder();if(!n)return;const s=load();s.noticeSeen={...(s.noticeSeen||{}),[n.key]:true};save(s)}
window.WxCampaign={recharge,resetAll,get resetting(){return resetting},offer:OFFER,reminder,reminderSeen,ackReminder,tasks:TASKS,snapshot,status,purchase,complete,claim,claimAll,simulateDay,simulateAll,record,reset,touch,decorateUrl,key:KEY};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;try{const u=new URL(a.href,location.href);if(u.origin===location.origin&&/\/(index|kaigong|activity)\.html$/.test(u.pathname))a.href=decorateUrl(a.href)}catch{}},true);
touch();
})();
