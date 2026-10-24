(function(){
'use strict';
const C=window.WxCampaign;if(!C)return;
const inApp=!!window.replica;
const configs={
 hire:{entry:'market',fallback:'任选一位数字员工，录用后发送一次消息。',targets:{market:['#x26-market-grid','任选适合自己工作的数字员工，点它的“录用”。'],employee:['#x23-hire-entry','了解这位数字员工后，点“录用”。'],hire:['#x23-hire-confirm','核对所选数字员工，再确认录用。'],hired:['#x23-hired-chat','已录用。点“去对话”，发送一次消息就能完成任务。'],'employee-chat':['#x22-input','问候语已准备好，点发送后才能完成任务。'],'agent-created':['#x22-input','给这位数字员工发送一次消息。']}},
 automation:{entry:'automation',fallback:'说清要做什么、什么时候做，检查草稿后保存。',targets:{automation:['#x24-new-task','点“新建定时任务”，安排要做的事。'],'auto-create':['#x24-task-entry','写清工作和时间，再点输入框里的发送箭头。'],'auto-draft':['#x24-task-save','核对草稿与提醒方式，再保存任务。'],'auto-done':['#x24-created-card','任务已保存，可以查看刚才的安排。']}},
 phone:{entry:'phone',fallback:'在微信卡片完成关联演示。',targets:{phone:['#x25-wechat-link','点微信卡片里的关联按钮，按提示完成关联演示。']}},
 remix:{entry:'case-preview',fallback:'看过案例后，点“做同款”，将需求带入输入框。',targets:{'case-preview':['#x22-remix','喜欢这个效果，就点“做同款”。'],'case-filled':['#x22-input','需求已带入。你可以修改，是否发送由你决定。']}},
 project:{entry:'add-menu',fallback:'从对话旁的＋创建项目，再加入至少一名数字员工。',targets:{'add-menu':['#x22-create-project-entry','点“创建项目”，给这件工作起个名字。'],'project-create':['#x22-project-name','填写项目名，再点“创建项目”。'],project:['#x22-open-members','项目建好了，点这里的成员按钮，加入一位数字员工。'],'project-members':['#x22-member-options','勾选至少一位数字员工，再点击“添加”。']}},
 case:{fallback:'选一个案例，查看详情，再点一次赞。'}
};
let active=null,target=null,rewardTask=null;let knownCompleted=new Set(Object.keys(C.snapshot().completed));
const bar=document.createElement('aside');bar.id='wx-task-bar';bar.hidden=true;bar.setAttribute('aria-label','当前任务提示');bar.innerHTML='<span id="wx-task-direction" role="status" aria-live="polite"></span><div><button type="button" id="wx-task-claim" hidden></button><a id="wx-task-return" href="activity.html">查看任务</a><button type="button" id="wx-task-hide" aria-label="收起任务提示">×</button></div>';document.body.append(bar);
function position(){if(bar.hidden)return;const w=Math.min(330,innerWidth-24);bar.style.width=w+'px';const h=bar.getBoundingClientRect().height,r=(target?.closest(".x22-dialog,.x27-profile,.x27-letter,#x22-composer")||target)?.getBoundingClientRect();let left=innerWidth-w-18,top=58;if(r&&r.width&&r.height){if(innerWidth>650&&r.right+12+w<innerWidth-12){left=r.right+12;top=r.top}else{left=Math.max(12,Math.min(innerWidth-w-12,r.left));top=r.bottom+11;if(top+h>innerHeight-12)top=r.top-h-11}}bar.style.left=Math.max(12,Math.min(innerWidth-w-12,left))+'px';bar.style.top=Math.max(12,Math.min(innerHeight-h-12,top))+'px'}
function update(){
 document.querySelectorAll('.wx-task-focus').forEach(el=>el.classList.remove('wx-task-focus'));
 const snapshot=C.snapshot(),claimButton=document.getElementById('wx-task-claim'),returnLink=document.getElementById('wx-task-return');
 const reward=C.tasks.find(t=>t.id===(rewardTask||active));
 claimButton.hidden=true;returnLink.hidden=false;bar.classList.remove('wx-task-reward');
 if(reward&&snapshot.completed[reward.id]){
  target=null;bar.classList.add('wx-task-reward');
  const ready=C.status(reward,snapshot)==='claimable';
  document.getElementById('wx-task-direction').textContent=ready?'✓ 这项已完成，领取你的奖励。':'✓ '+reward.points+'积分已到账';
  claimButton.hidden=!ready;claimButton.textContent='领取'+reward.points+'积分';returnLink.hidden=ready;
  bar.hidden=false;position();return;
 }
 if(!active){bar.hidden=true;return}
 const config=configs[active],finished=!!snapshot.completed[active];
 let hint=config.fallback;target=null;
 if(inApp){const v=config.targets?.[window.replica.state];if(v){target=document.querySelector(v[0]);hint=v[1]}}
 else if(active==='case'){target=document.getElementById('case-like')||document.querySelector('[data-case]');hint=document.getElementById('case-like')?'看过案例后，点这里的“点赞”。':'选择一个感兴趣的案例，点开看一看。'}
 if(finished){hint='✓ 任务已完成，点“查看任务”领取积分。';target=null;}
 document.getElementById('wx-task-direction').textContent=hint;
 if(target&&!finished){if(active==='hire'&&window.replica?.state==='market')document.querySelectorAll('[data-market-hire]').forEach(el=>el.classList.add('wx-task-focus'));else target.classList.add('wx-task-focus')}bar.hidden=false;position();
}
function clear(){active=null;rewardTask=null;bar.hidden=true;document.querySelectorAll('.wx-task-focus').forEach(el=>el.classList.remove('wx-task-focus'))}
let originalShow;
if(inApp){originalShow=show;show=function(...args){const was=internalGuideChange;if(active)internalGuideChange=true;let result;try{result=originalShow(...args)}finally{internalGuideChange=was}update();return result}}
else if(typeof render==='function'){const originalRender=render;render=function(...args){const result=originalRender(...args);update();return result}}
function start(id){
 if(id==='create')id='hire';if(!configs[id]||(inApp?id==='case':id!=='case'))return false;
 active=id;rewardTask=null;window.WxTaskRequest=id;C.ackReminder();
 if(inApp){if(pageGuide)pageOnboarding.finish(false);show(configs[id].entry)}
 else{document.querySelectorAll('dialog[open]').forEach(d=>d.close());if(typeof step!=='undefined'&&step>=0){step=-1;document.getElementById('guide').style.display='none';if(typeof setGuideInert==='function')setGuideInert(false)}render('cases')}
 update();return true;
}
bar.querySelector('#wx-task-hide').onclick=clear;
function changed(){const s=C.snapshot(),fresh=C.tasks.find(t=>s.completed[t.id]&&!knownCompleted.has(t.id)&&!s.claimed[t.id]);knownCompleted=new Set(Object.keys(s.completed));if(fresh)rewardTask=fresh.id;update()}
bar.querySelector('#wx-task-claim').onclick=()=>{const id=rewardTask||active;if(id)C.claim([id]);update()};
addEventListener('wx-campaign-change',changed);addEventListener('storage',e=>{if(e.key===C.key)changed()});addEventListener('resize',position);addEventListener('scroll',position,{passive:true,capture:true});
window.WxTaskJourney={start,update,clear};
if(window.WxTaskRequest)start(window.WxTaskRequest);
})();
