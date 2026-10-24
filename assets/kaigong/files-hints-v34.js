/* Independent, optional hints for output files and reference knowledge. */
pageGuides.automation.steps=[pageGuides.automation.steps[0],{
 page:'automation',title:'保存后，在这里查看安排',text:'新建时先核对草稿再保存。以后从列表点开任务，就能查看执行记录、产出或暂停安排。',selector:'.x24-task-list',rect:[359,0,550,600],side:'right'
}];
pageGuides.remix.steps=[{
 page:'case-preview',title:'这里可以做同款',text:'喜欢这个效果，就点“做同款”。需求会带入输入框，换成自己的内容后再发送。',selector:'#x22-remix',rect:[1205,800,98,35],side:'above'
}];
pageGuides.files={name:'对话产物',finish:'files',steps:[
 {page:'files',title:'先找到做这件事的数字员工',text:'点左侧的数字员工，可以按它查找生成的文档、图片等文件。',selector:'#x34-files-employee',rect:[98,303,242,36],side:'right'},
 {page:'files',title:'它做好的文件，在这里查看',text:'右侧是生成的文件和文件夹。点开即可查看，之后需要找成果时就来这里。',selector:'#x34-files-output',rect:[371,68,716,94],side:'below'}
]};
pageGuides.knowledgeIntro={name:'知识库',finish:'knowledge',steps:[
 {page:'knowledge',title:'从这里添加要参考的资料',text:'需要数字员工参考文件时，点“授权本地文档”，再按需要选择文件或文件夹。原文件保留在本机。',selector:'#x23-knowledge-intro',rect:[640,302,550,280],side:'left'}
]};
x33Groups.add('knowledgeIntro');entryGroups.knowledge='knowledgeIntro';
const x34GroupBefore=groupFor;groupFor=function(key){return key==='knowledge'?'knowledgeIntro':x34GroupBefore(key)};
function x34SyncDots(){document.querySelectorAll('.x34-guide-dot').forEach(dot=>{dot.hidden=seenPages.has(dot.dataset.guideGroup)})}
function x34Dot(group,label,left){
 const dot=x22el('button','x34-guide-dot');dot.type='button';dot.dataset.guideGroup=group;dot.style.cssText='left:'+left+'px;top:114px';dot.setAttribute('aria-label',label);dot.title=label;
 dot.onclick=e=>{e.stopPropagation();if(pageGuide)finishPageGuide(false);startPageGuide(group)};
}
const x34RenderBefore=render;render=function(){
 x34RenderBefore();if(!['files','knowledge'].includes(current))return;
 if(current==='files'){
  const employee=[...hotspots.querySelectorAll('button')].find(b=>b.getAttribute('aria-label')==='开工助理资料');
  if(employee)employee.id='x34-files-employee';else x23Focus('x34-files-employee',[98,303,242,36]);
  x23Focus('x34-files-output',[371,68,716,94]);
 }
 x34Dot('files','查看对话产物提示',207);x34Dot('knowledgeIntro','查看知识库提示',327);x34SyncDots();
};
const x34SaveSeenBefore=saveSeen;saveSeen=function(){x34SaveSeenBefore();x34SyncDots()};
