(function(){
'use strict';
const id=window.WxTaskRequest;if(!id)return;
const C=WxCampaign,config={
hire:{title:'新建一个数字员工，并对话一次',steps:['打开数字员工档案，查看能力。','点击录用并确认工位。','进入它的对话，输入需求并模拟发送。'],targets:{market:['先选一位数字员工，打开档案。','录用数字员工 1'],employee:['确认合适后，点击录用。','录用此数字员工'],hire:['选择工位，然后确认录用。','确认录用（演示）'],hired:['录用完成，点击去对话。','去对话'],'employee-chat':['写一项工作需求，再点击发送。','对话输入']}},
automation:{title:'配置一条定时任务',steps:['点击新建定时任务。','填写工作和执行时间，生成草稿。','核对内容后保存。'],targets:{automation:['先点击新建定时任务。','新建定时任务'],'auto-create':['写清安排，再生成任务草稿。','发送定时任务需求（演示）'],'auto-draft':['核对草稿，再点击保存。','保存定时任务（演示）']}},
phone:{title:'关联微信，让手机也能交代工作',steps:['在微信卡片点击关联微信。','查看说明，确认模拟关联。','返回任务页领取积分。'],targets:{phone:['点击微信卡片里的关联按钮，按说明完成演示。','关联微信（演示）']}},
remix:{title:'参考一个案例，做一次同款',steps:['看一看案例的展示效果。','点击做同款，把需求带入输入框。','按自己的内容修改，发送由你决定。'],targets:{'case-preview':['看过效果后，点击做同款。','做同款'],'case-filled':['需求已带入；可以修改，发送由你决定。','对话输入']}},
project:{title:'创建项目，再在项目里聊一次',steps:['从＋菜单选择创建项目。','给项目起名，确认创建。','在项目内输入任务，模拟发送一次。'],targets:{'add-menu':['选择创建项目。','创建项目'],'project-create':['填写项目名称，再确认创建。','项目名称'],project:['在项目里输入一项工作需求，再点击发送。','对话输入']}}
}[id];if(!config)return;
document.body.classList.add('wx-task-active');
const bar=document.createElement('aside');bar.id='wx-task-bar';bar.innerHTML='<span id="wx-task-direction"></span><div><button type="button" id="wx-task-help">查看指引</button><a id="wx-task-return" href="activity.html">查看任务与领取 →</a><button type="button" id="wx-task-hide" aria-label="收起任务提示">×</button></div>';document.body.append(bar);
const d=document.createElement('dialog');d.id='wx-task-arrival';d.className='wx-reminder';d.setAttribute('aria-labelledby','wx-task-arrival-title');d.innerHTML='<button type="button" class="wx-close" aria-label="关闭操作指引">×</button><span class="wx-notice-tag">跟着做，完成这项任务</span><h2 id="wx-task-arrival-title"></h2><ol></ol><small>需要你实际点击完成模拟操作；仅浏览教学不会自动完成任务。</small><footer><button type="button" class="wx-later">我先看看</button><button type="button" class="wx-open">开始操作</button></footer>';document.body.append(d);d.querySelector('h2').textContent=config.title;d.querySelector('ol').replaceChildren(...config.steps.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
let target=null;
function update(){if(!bar.isConnected)return;document.querySelectorAll('.wx-task-focus').forEach(e=>e.classList.remove('wx-task-focus'));const s=C.snapshot(),finished=!!s.completed[id],v=config.targets[window.replica.state];document.getElementById('wx-task-direction').textContent=finished?'✓ 任务已完成，可以返回领取积分。':v?.[0]||'按上方指引继续操作，完成后返回领取积分。';target=id==='phone'?document.getElementById('x25-wechat-link'):v?document.querySelector('[aria-label="'+v[1]+'"]'):null;if(target&&!finished)target.classList.add('wx-task-focus')}
const originalShow=show;show=function(...args){const r=originalShow(...args);update();return r};
d.querySelector('.wx-close').onclick=d.querySelector('.wx-later').onclick=()=>d.close();d.querySelector('.wx-open').onclick=()=>{d.close();update();target?.focus({preventScroll:true})};
bar.querySelector('#wx-task-help').onclick=()=>d.showModal();bar.querySelector('#wx-task-hide').onclick=()=>{document.body.classList.remove('wx-task-active');bar.remove();document.querySelectorAll('.wx-task-focus').forEach(e=>e.classList.remove('wx-task-focus'))};
addEventListener('wx-campaign-change',update);update();d.showModal();
})();
