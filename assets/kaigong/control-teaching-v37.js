/* V37: explicit software control, full scheduled-task teaching, and phone-to-computer flow. */
pageGuides.automation={name:'定时任务',finish:'auto-task',steps:[
 {page:'automation',title:'想让它按时做事，先点这里',text:'每天整理待办、每周汇总工作，都可以交给定时任务。先点左上角“新建定时任务”，一步步把这件事安排好。',rect:[235,12,116,34],selector:'#x24-new-task',side:'right',cta:'点击新建定时任务 →',action:'timedNew'},
 {page:'auto-create',title:'这6个常用任务，可以先挑一个',text:'点一个示例，就会把需求填入下方输入框，还不会发送。也可以自己写，说明做什么、什么时候做，以及交给哪位数字员工。',rect:[376,300,712,140],selector:'#x24-examples',side:'above',cta:'试试一个常用任务 →',action:'timedExample'},
 {page:'auto-create',title:'检查这句话，再点输入框里的发送',text:'示例已经填好了，可以直接修改。确认任务内容、执行时间和数字员工后，点右下角的发送箭头，先生成一份草稿；这时任务还不会开始执行。',rect:[376,500,712,75],selector:'#x24-task-entry',side:'above',cta:'发送这条需求 →',action:'timedSend'},
 {page:'auto-draft',title:'先看草稿，确认安排有没有写对',text:'这里会列出执行时间、任务内容和负责的数字员工。检查一下是否符合你的想法；需要调整时，修改下面的需求，再点发送更新草稿。',rect:[376,240,712,220],selector:'#x24-draft-card',side:'above',cta:'接着看看提醒和保存 →'},
 {page:'auto-draft',title:'选好提醒方式，再点保存',text:'需要提醒时可以勾选微信或飞书，能否收到通知以实际连接状态为准。不勾选也可以回到任务页查看结果。确认这份安排后，点“保存”。',rect:[376,630,712,100],selector:'#x24-save-area',side:'above',cta:'保存定时任务 →',action:'timedSave'},
 {page:'auto-done',title:'保存好了，再打开任务看看',text:'这条安排已经记录在定时任务里。现在点“查看任务”，就能看到刚才保存的执行时间、内容和负责的数字员工。',rect:[376,300,712,130],selector:'#x24-created-card',side:'above',cta:'点击查看任务 →',action:'timedView'},
 {page:'auto-task',title:'以后在这里查看任务',text:'任务详情里可以核对安排、查看执行记录，也可以暂停任务。这次就停在这里，你可以继续安排其他要定时做的事。',rect:[904,95,535,420],selector:'#x24-task-detail',side:'left',cta:'留在定时任务'},
]};

Object.assign(pageGuides.skills.steps[0],{
 title:'让开工操作这些软件',
 text:'接入并授权后，开工里的数字员工就能按你的要求操作这些软件。连接好，再回到开工对话里交代工作。'
});
Object.assign(pageGuides.skills.steps[1],{
 title:'先点＋连接，再让开工操作',
 text:'点软件卡片右上角的＋或“配置”，按该软件的说明完成连接与授权。连接后，由开工调用它支持的能力处理任务。'
});
Object.assign(pageGuides.phone.steps[0],{
 title:'先把手机和电脑上的开工连起来',
 text:'点“关联微信”，按提示完成连接。之后就能从手机微信给电脑上的开工下指令。'
});
Object.assign(pageGuides.phone.steps[1],{
 title:'手机下指令，电脑执行',
 text:'在手机微信交代任务，电脑上的开工负责操作和处理，完成后回到微信看结果。使用时保持电脑开机、联网，开工正常运行。',
 selector:'#x37-phone-flow',rect:[96,344,1340,530],side:'above'
});

const x37RenderBefore=render;
render=function(){
 x37RenderBefore();
 if(current==='skills'){
  const message=x22el('h2','x37-skills-message','让开工操作这些软件');message.id='x37-skills-message';
 }
 if(current==='phone'){
  const heading=hotspots.querySelector('.x24-phone-heading');
  if(heading)heading.textContent='用手机控制电脑，让开工替你干活';
  const sub=hotspots.querySelector('.x24-wechat-sub');if(sub)sub.textContent='手机发指令，电脑上的开工执行';
  const description=hotspots.querySelector('.x24-wechat-desc');if(description)description.textContent='在手机微信交代任务，电脑上的开工处理，进度和结果回到微信查看。';
  const card=hotspots.querySelector('.x25-wechat-card');
  if(card){card.querySelector('small').textContent='手机发指令，电脑上的开工执行';card.querySelector('p').textContent='在手机微信交代任务，电脑上的开工处理，进度和结果回到微信查看。'}
  x23Focus('x37-phone-flow',[96,344,1340,530]);
 }
};

const x37GuideBefore=renderPageGuide;
renderPageGuide=function(){
 x37GuideBefore();
 const card=document.getElementById('hint-card');card.dataset.emphasis=String(['skills','phone'].includes(pageGuide));
 if(pageGuide==='automation'){
  const step=pageGuides.automation.steps[guideIndex],button=document.getElementById('page-guide-next');
  button.textContent=step.cta||'下一步';
  const actions={
   timedNew:()=>hotspots.querySelector('#x24-new-task')?.click(),
   timedExample:()=>{if(x24Timed.form.text.trim())x22baseGo(2);else hotspots.querySelector('[data-timed-example="0"]')?.click()},
   timedSend:x24Generate,timedSave:x24Save,
   timedView:()=>hotspots.querySelector('#x24-view-task')?.click()
  };
  if(actions[step.action])button.onclick=actions[step.action];
 }
 positionPageGuide();
};
