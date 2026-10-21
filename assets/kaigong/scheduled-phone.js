/* Browser-local scheduled-task walkthrough and phone copy. No timers or external messages are created. */
const x24Examples=[
 {title:'每日待办',text:'每天09:00整理我的待办和重点事项'},
 {title:'每周工作总结',text:'每周五17:00汇总本周工作，并列出下周计划'},
 {title:'会议纪要',text:'每个工作日18:00整理当天会议纪要和待办'},
 {title:'销售数据',text:'每天10:00汇总销售数据，标出明显变化'},
 {title:'项目进度',text:'每周一09:30汇总项目进度和本周安排'},
 {title:'下班前检查',text:'每个工作日17:30提醒我检查未完成的事项'},
];
if(!x22.timed||!Array.isArray(x22.timed.tasks))x22.timed={tasks:[],draft:null,form:{text:'',employee:'assistant',wechat:false,feishu:false},active:null};
const x24Timed=x22.timed;x24Timed.form={text:'',employee:'assistant',wechat:false,feishu:false,...x24Timed.form};
const x24Pages=['automation','auto-create','auto-thinking','auto-draft','auto-done','auto-task'];
for(const key of x24Pages){screens[key].image=screens.automation.image;screens[key].title=({automation:'定时任务','auto-create':'创建定时任务','auto-thinking':'整理任务需求','auto-draft':'确认定时任务草稿','auto-done':'定时任务已保存','auto-task':'定时任务详情'})[key]}
for(const button of document.querySelectorAll('#guide-grid button'))button.textContent=button.textContent.replaceAll('自动化','定时任务');

pageGuides.automation={name:'定时任务',finish:'auto-task',steps:[
 {page:'automation',title:'想让它按时做事，先点这里',text:'每天整理待办、每周汇总工作，都可以交给定时任务。先点左上角“新建定时任务”，一步步把这件事安排好。',rect:[235,12,116,34],selector:'#x24-new-task',side:'right',cta:'点击新建定时任务 →',action:'timedNew'},
 {page:'auto-create',title:'这6个常用任务，可以先挑一个',text:'点一个示例，就会把需求填入下方输入框，还不会发送。也可以自己写，说明做什么、什么时候做，以及交给哪位数字员工。',rect:[376,300,712,140],selector:'#x24-examples',side:'above',cta:'试试一个常用任务 →',action:'timedExample'},
 {page:'auto-create',title:'检查这句话，再点输入框里的发送',text:'示例已经填好了，可以直接修改。确认任务内容、执行时间和数字员工后，点右下角的发送箭头，先生成一份草稿；这时任务还不会开始执行。',rect:[376,500,712,75],selector:'#x24-task-entry',side:'above',cta:'发送这条需求 →',action:'timedSend'},
 {page:'auto-draft',title:'先看草稿，确认安排有没有写对',text:'这里会列出执行时间、任务内容和负责的数字员工。检查一下是否符合你的想法；需要调整时，修改下面的需求，再点发送更新草稿。',rect:[376,240,712,220],selector:'#x24-draft-card',side:'above',cta:'接着看看提醒和保存 →'},
 {page:'auto-draft',title:'选好提醒方式，再点保存',text:'需要提醒时可以勾选微信或飞书，能否收到通知以实际连接状态为准。不勾选也可以回到任务页查看结果。确认这份安排后，点“保存”。',rect:[376,630,712,100],selector:'#x24-save-area',side:'above',cta:'保存定时任务 →',action:'timedSave'},
 {page:'auto-done',title:'保存好了，再打开任务看看',text:'这条安排已经记录在定时任务里。现在点“查看任务”，就能看到刚才保存的执行时间、内容和负责的数字员工。',rect:[376,300,712,130],selector:'#x24-created-card',side:'above',cta:'点击查看任务 →',action:'timedView'},
 {page:'auto-task',title:'以后在这里查看任务',text:'任务详情里可以核对安排、查看执行记录，也可以暂停任务。这次就停在这里，你可以继续安排其他要定时做的事。',rect:[904,95,535,420],selector:'#x24-task-detail',side:'left',cta:'留在定时任务'},
]};
pageGuides.phone={name:'链接手机',finish:'phone',steps:[
 {page:'phone',title:'在微信说一句，数字员工帮你接着做',text:'先按页面提示关联微信。以后想整理资料、查看进度，或临时交代一件事，在微信里告诉数字员工就行。它会通过电脑上的开工处理任务，完成后你可以在微信查看结果。',rect:[776,64,664,252],side:'below',cta:'看看怎么用 →'},
 {page:'phone',title:'出门在外，也能把工作交代好',text:'比如发一句“把今天的会议要点整理一下”。数字员工接着处理，你在手机查看进度和结果；需要补充要求时，再接着说就好。',rect:[109,382,1325,478],side:'above',cta:'我知道了'},
]};

function x24Go(page,index){if(pageGuide==='automation')x22baseGo(index);else show(page)}
function x24Name(id){return id==='assistant'?'开工助理':x22.employees.find(a=>a.id===id)?.name||'开工助理'}
function x24Active(){return x24Timed.tasks.find(t=>t.id===x24Timed.active)||x24Timed.tasks[0]}
function x24Refresh(){const key=current;internalGuideChange=true;show(key,false);internalGuideChange=false;if(pageGuide)renderPageGuide()}
function x24Pick(index){x24Timed.form.text=x24Examples[index].text;x24Timed.draft=null;x22save();if(pageGuide==='automation'&&guideIndex<=2)x22baseGo(2);else show('auto-create');hotspots.querySelector('#x24-request')?.focus({preventScroll:true})}
function x24Generate(){
 const form=x24Timed.form,text=form.text.trim();if(!text){toast('先说说想定时做什么，或者选一个上面的示例。');hotspots.querySelector('#x24-request')?.focus();return}
 const time=text.match(/(?:[01]?\d|2[0-3]):[0-5]\d/),repeat=text.match(/每个工作日|每周[一二三四五六日天]|每天/);
 if(!time||!repeat){toast('再补充一下执行时间，例如“每天09:00”。');hotspots.querySelector('#x24-request')?.focus();return}
 const sample=x24Examples.find(e=>e.text===text),id=x24Timed.draft?.id||'timed-'+Date.now()+'-'+Math.random().toString(36).slice(2,6);
 x24Timed.draft={id,title:sample?.title||text.slice(0,28),when:repeat[0]+' '+time[0],request:text,employee:form.employee,channels:[form.wechat?'微信':'',form.feishu?'飞书':''].filter(Boolean)};x22save();x24Go('auto-draft',3);
}
function x24Save(){
 if(!x24Timed.draft){toast('先点输入框里的发送箭头，生成并检查任务草稿。');return}
 const task={...x24Timed.draft,channels:[x24Timed.form.wechat?'微信':'',x24Timed.form.feishu?'飞书':''].filter(Boolean),enabled:true,savedAt:new Date().toISOString()};
 const index=x24Timed.tasks.findIndex(t=>t.id===task.id);if(index>=0)x24Timed.tasks[index]=task;else x24Timed.tasks.unshift(task);
 x24Timed.active=task.id;x22save();WxCampaign.record('automation');x24Go('auto-done',5);
}
function x24View(){x24Go('auto-task',6)}
function x24TaskPage(){
 const tasks=x24Timed.tasks,task=x24Active(),page=x22el('section','x24-timed-page');
 page.innerHTML=`<aside class="x24-task-sidebar"><header><h1>定时任务</h1><button id="x24-new-task" aria-label="新建定时任务">＋ 新建定时任务</button></header><input class="x24-search" placeholder="搜索定时任务或执行记录" aria-label="搜索定时任务"><button class="x24-all-tasks">ϟ　全部定时任务 <small>${tasks.length}</small></button><p>项目组</p><div class="x24-owner">${x22esc(x22.project?.name||'暂无项目')}</div><p>数字员工</p><div class="x24-owner selected">开工助理 <small>${tasks.filter(t=>t.employee==='assistant').length}</small></div></aside><main class="x24-task-list"><header><b>ϟ　任务 ${tasks.length}</b><span>执行记录及产出</span></header><div class="x24-task-items"></div></main><section class="x24-task-detail" id="x24-task-detail"></section>`;
 page.querySelector('#x24-new-task').onclick=()=>{x24Timed.draft=null;x24Timed.form.text='';x22save();x24Go('auto-create',1)};
 const list=page.querySelector('.x24-task-items');
 if(!tasks.length){list.innerHTML='<div class="x24-task-empty"><span>ϟ</span><b>还没有定时任务</b><p>说清要做的事和时间，数字员工会帮你整理成安排。</p><button class="x22-button" id="x24-create-empty">新建定时任务</button></div>';list.querySelector('button').onclick=()=>page.querySelector('#x24-new-task').click()}
 for(const t of tasks){const row=document.createElement('button');row.className='x24-task-row'+(t.id===task?.id?' active':'');row.innerHTML=`<span>ϟ</span><div><b>${x22esc(t.title)}</b><small>${x22esc(t.when)} · ${x22esc(x24Name(t.employee))}</small></div><em>${t.enabled?'已保存':'已暂停'}</em>`;row.onclick=()=>{x24Timed.active=t.id;x22save();show('auto-task')};list.append(row)}
 page.querySelector('.x24-search').oninput=e=>{const q=e.target.value.trim();list.querySelectorAll('.x24-task-row').forEach(row=>row.hidden=!row.textContent.includes(q))};
 const detail=page.querySelector('#x24-task-detail');
 if(!task)detail.innerHTML='<div class="x24-task-empty"><span>ϟ</span><b>选择左侧任务，查看这项安排</b><p>保存后的任务会保留内容与执行记录。</p></div>';
 else{detail.innerHTML=`<header><small>定时任务 / ${x22esc(task.title)}</small><h2>${x22esc(task.title)}</h2><span class="x24-demo-status">本地演示 · ${task.enabled?'已保存':'已暂停'}</span></header><dl><dt>执行时间</dt><dd>${x22esc(task.when)}</dd><dt>负责的数字员工</dt><dd>${x22esc(x24Name(task.employee))}</dd><dt>任务内容</dt><dd>${x22esc(task.request)}</dd><dt>提醒方式</dt><dd>${x22esc(task.channels.join('、')||'在任务页查看结果')}</dd></dl><div class="x24-records"><h3>执行记录</h3><p>还没有执行记录。</p></div><button class="x22-button" id="x24-pause-task">${task.enabled?'暂停任务':'继续任务'}</button>`;detail.querySelector('#x24-pause-task').onclick=()=>{task.enabled=!task.enabled;x22save();x24Refresh()}}
}
function x24TaskDialog(){
 const isDone=current==='auto-done',draftTask=x24Timed.draft,form=x24Timed.form,task=x24Active();
 const workers=[{id:'assistant',name:'开工助理'},...x22.employees];
 const worker=`<div class="x24-worker"><label for="x24-assignee">交给谁</label><select id="x24-assignee" aria-label="执行数字员工">${workers.map(a=>`<option value="${x22esc(a.id)}" ${form.employee===a.id?'selected':''}>${x22esc(a.name)}</option>`).join('')}</select></div>`;
 const examples=`<div id="x24-examples" class="x24-examples">${x24Examples.map((a,i)=>`<button data-timed-example="${i}"><b>${a.title}</b><span>${a.text}</span></button>`).join('')}</div>`;
 const draftCard=draftTask?`<div class="x24-request-bubble">${x22esc(draftTask.request)}</div><section id="x24-draft-card" class="x24-draft-card"><b>待确认草稿 · ${x22esc(draftTask.title)}</b><dl><dt>执行时间</dt><dd>${x22esc(draftTask.when)}</dd><dt>数字员工</dt><dd>${x22esc(x24Name(draftTask.employee))}</dd><dt>任务内容</dt><dd>${x22esc(draftTask.request)}</dd></dl><p>确认内容和提醒方式后，点击“保存”才会记录这项安排。</p></section>`:'';
 const editor=`<div class="x24-task-entry" id="x24-task-entry"><textarea id="x24-request" aria-label="定时任务需求" placeholder="例如：每天09:00整理我的待办和重点事项"></textarea><button id="x24-task-send" aria-label="发送定时任务需求（演示）">↑</button></div><p class="x24-draft-note">先生成草稿，检查并保存后再开始。</p>`;
 const created=`<section class="x24-created-card" id="x24-created-card"><small>✓　定时任务已保存</small><h3>${x22esc(task?.title||'这项任务')}</h3><p>${x22esc(task?.when||'')} · ${x22esc(x24Name(task?.employee))}</p><button class="x22-button primary" id="x24-view-task">查看任务 →</button></section>`;
 const notifications=`<div id="x24-save-area" class="x24-save-area"><div class="x24-notifications"><b>通知我</b><label><input type="checkbox" id="x24-notify-wechat" ${form.wechat?'checked':''}> 微信</label><label><input type="checkbox" id="x24-notify-feishu" ${form.feishu?'checked':''}> 飞书</label></div><div class="x24-task-footer"><button class="x22-button" id="x24-task-cancel">取消</button><button class="x22-button primary" id="x24-task-save" aria-label="保存定时任务（演示）" ${draftTask?'':'disabled'}>保存</button></div></div>`;
 const pane=x22dialog('对话创建定时任务','<p class="x24-task-intro">说清做什么、什么时候做，其余细节可以再一起确认。</p>'+worker+(isDone?created:draftTask?draftCard:'<div class="x24-task-greeting">把任务交给数字员工，告诉它要做什么、什么时候执行。</div>'+examples)+(isDone?'':editor),isDone?'<button class="x22-button" id="x24-task-finish">完成</button>':notifications,'x24-task-dialog');
 const close=()=>{if(pageGuide==='automation')finishPageGuide(false);else show('automation')};pane.querySelector('.x22-close').onclick=close;pane.querySelector('#x24-task-cancel')?.addEventListener('click',close);
 pane.querySelector('#x24-assignee').disabled=isDone;pane.querySelector('#x24-assignee').onchange=e=>{form.employee=e.target.value;if(x24Timed.draft)x24Timed.draft.employee=form.employee;x22save();x24Refresh()};
 pane.querySelectorAll('[data-timed-example]').forEach(button=>button.onclick=()=>x24Pick(Number(button.dataset.timedExample)));
 const input=pane.querySelector('#x24-request'),send=pane.querySelector('#x24-task-send');
 if(input){input.value=form.text;send.disabled=!form.text.trim();input.oninput=()=>{form.text=input.value;send.disabled=!form.text.trim();if(x24Timed.draft&&form.text!==x24Timed.draft.request){x24Timed.draft=null;pane.querySelector('#x24-task-save').disabled=true;pane.querySelector('#x24-draft-card').innerHTML='<b>需求已修改，请点发送更新草稿。</b>'}x22save()};input.onkeydown=e=>{if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();x24Generate()}};send.onclick=x24Generate}
 for(const id of ['wechat','feishu'])pane.querySelector('#x24-notify-'+id)?.addEventListener('change',e=>{form[id]=e.target.checked;x22save()});
 pane.querySelector('#x24-task-save')?.addEventListener('click',x24Save);pane.querySelector('#x24-view-task')?.addEventListener('click',x24View);pane.querySelector('#x24-task-finish')?.addEventListener('click',()=>show('auto-task'));
}
function x24NavLabel(){
 const label=x22el('span','x24-nav-label'+(x24Pages.includes(current)?' active':''),'定时任务');label.setAttribute('aria-hidden','true');
 const native=[...hotspots.querySelectorAll('button')].find(b=>['自动化','定时任务'].includes(b.getAttribute('aria-label')));if(native){native.setAttribute('aria-label','定时任务');native.title='定时任务'}
}
function x24PhoneCopy(){
 const sub=x22el('div','x24-wechat-sub','微信说一句，工作接着做');
 const desc=x22el('div','x24-wechat-desc','在微信交代任务，让数字员工帮你处理，完成后在微信查看结果。');
 x22el('h2','x24-phone-heading','微信里说一句，数字员工接着做');
 const labels=['扫码关联','微信交代任务','数字员工处理任务','微信查看结果'];
 labels.forEach((text,i)=>{const item=x22el('div','x24-phone-step',`<span>${i+1}</span>${text}`);item.style.left=([210,548,870,1218][i])+'px'});
}
const x24Render=render;render=function(){
 if(x24Pages.includes(current)){nav();x24TaskPage();if(!['automation','auto-task'].includes(current))x24TaskDialog()}
 else x24Render();
 x24NavLabel();if(current==='phone')x24PhoneCopy();
};
const x24Tour=renderPageGuide;renderPageGuide=function(){
 x24Tour();if(!pageGuide||pageGuide!=='automation')return;
 const step=pageGuides.automation.steps[guideIndex],button=document.getElementById('page-guide-next');
 const actions={timedNew:()=>hotspots.querySelector('#x24-new-task')?.click(),timedExample:()=>{if(x24Timed.form.text.trim())x22baseGo(2);else hotspots.querySelector('[data-timed-example="0"]')?.click()},timedSend:()=>x24Generate(),timedSave:()=>x24Save(),timedView:()=>hotspots.querySelector('#x24-view-task')?.click()};
 if(actions[step.action])button.onclick=actions[step.action];positionPageGuide();
};
