/* Brief introductions identify entrances; they never perform the workflow. */
Object.assign(pageGuides,{
 market:{name:'人才市场',finish:'market',steps:[
  {page:'market',title:'按工作需要，挑一位数字员工',text:'这里有不同岗位。先看看它擅长什么，选择适合你这件事的数字员工。',selector:'#x26-market-grid',rect:[96,130,1352,650],side:'above'},
  {page:'market',title:'先看档案，合适再录用',text:'点卡片了解能力和作品，再决定是否录用。确认后，它会出现在你的对话列表里。',selector:'[data-market-hire="office"]',rect:[1320,245,38,24],side:'below'}
 ]},
 skills:{name:'能力提升',finish:'skills',steps:[
  {page:'skills',title:'需要更多工具时，到这里找',text:'在这里接入你常用的应用，让数字员工能处理更多工作。按需要选择就好。',selector:'#x23-skills-cards',rect:[96,130,1352,150],side:'below'},
  {page:'skills',title:'点＋，按应用说明连接',text:'卡片右上角的＋或“配置”可打开连接设置。需要时再填写信息、测试并保存。',selector:'#x23-skills-plus',rect:[1053,150,34,34],side:'below'}
 ]},
 automation:{name:'定时任务',finish:'automation',steps:[
  {page:'automation',title:'定时要做的事，从这里新建',text:'比如每天整理待办、每周汇总工作。点“新建定时任务”，说清做什么、什么时候做。',selector:'#x24-new-task',rect:[235,12,116,34],side:'right'},
  {page:'automation',title:'保存的安排，都在任务列表里',text:'新建时会先生成草稿，核对后再保存。以后在这里找到任务，查看或调整安排。',selector:'.x24-task-list',rect:[359,0,550,600],side:'right'},
  {page:'automation',title:'执行情况，点开任务查看',text:'选中一项任务，就能查看详情、执行记录与产出，也可以暂停。需要时再回来看看。',selector:'#x24-task-detail',rect:[904,95,535,420],side:'left'}
 ]},
 phone:{name:'链接手机',finish:'phone',steps:[
  {page:'phone',title:'先关联微信，再从手机交代工作',text:'点这里，按页面提示完成关联。连接后，就可以从微信给数字员工安排任务。',selector:'#x25-wechat-link',rect:[1200,230,160,40],side:'below'},
  {page:'phone',title:'手机交代，电脑接着处理',text:'使用时保持电脑开机、联网，开工正常运行。处理进度和结果可在微信里查看。',selector:'.x25-wechat-card',rect:[776,64,664,252],side:'below'}
 ]},
 files:{name:'资料库',finish:'files',steps:[
  {page:'files',title:'数字员工做好的文件，到这里找',text:'“对话产物”集中保存工作中生成的文件，可以按项目或数字员工查找。',rect:[94,12,1352,430],side:'below'},
  {page:'files',title:'想让它参考资料，就用知识库',text:'点“知识库”添加需要参考的文件或文件夹。回到对话后，可以用 @ 选择要用的资料。',selector:'#x23-knowledge-tab',rect:[220,109,123,35],side:'right'}
 ]},
 createAgent:{name:'自定义数字员工',finish:'agent-create',steps:[
  {page:'agent-create',title:'给固定分工，配一位数字员工',text:'起个好记的名字，再写清它负责什么、擅长什么。职责具体一些，之后更好交代任务。',selector:'#x22-employee-fields',rect:[496,268,488,229],side:'left'},
  {page:'agent-create',title:'确认后创建，再交第一件事',text:'检查好名称和职责，点“创建并去对话”。创建前，你可以继续修改这些内容。',selector:'#agent-submit',rect:[842,568,142,42],side:'above'}
 ]},
 remix:{name:'做同款',finish:'case-preview',steps:[
  {page:'case-preview',title:'喜欢这个效果，就试试做同款',text:'点“做同款”会把需求带入输入框。换上你自己的产品、卖点和素材，检查好后再发送。',selector:'#x22-remix',rect:[1205,800,98,35],side:'above'}
 ]},
 newSession:{name:'新会话',finish:'chat',steps:[
  {page:'chat',title:'换一件事，就开一个新会话',text:'同一件事继续在原会话聊。不相关的新任务可以另开会话，旧聊天仍可从会话记录里找到。',selector:'[data-mode="new"]',rect:[360,717,80,33],side:'above'}
 ]}
});
const x33Groups=new Set(Object.keys(pageGuides));
const x33IsLight=()=>!!pageGuide&&x33Groups.has(pageGuide);
const x33PositionBefore=positionPageGuide;
positionPageGuide=function(){
 if(!x33IsLight()){x33PositionBefore();return}
 const s=pageGuides[pageGuide].steps[guideIndex],card=document.getElementById('hint-card'),focus=document.getElementById('hint-focus'),f=stage.getBoundingClientRect(),scale=f.width/1464;
 const el=s.selector&&document.querySelector(s.selector),live=el?.getBoundingClientRect();
 const r=live?.width&&live.height?live:{left:f.left+s.rect[0]*scale,top:f.top+s.rect[1]*scale,width:s.rect[2]*scale,height:s.rect[3]*scale};
 const x=Math.max(0,r.left-5),y=Math.max(0,r.top-5),right=Math.min(innerWidth,r.left+r.width+5),bottom=Math.min(innerHeight,r.top+r.height+5);
 hintLayer.querySelector('.page-scrim').style.cssText='inset:0;clip-path:polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,'+x+'px '+y+'px,'+right+'px '+y+'px,'+right+'px '+bottom+'px,'+x+'px '+bottom+'px,'+x+'px '+y+'px)';
 focus.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
 const w=card.offsetWidth,h=card.offsetHeight,gap=16,m=14;
 const sides={right:{x:r.left+r.width+gap,y:r.top},left:{x:r.left-w-gap,y:r.top},above:{x:r.left+r.width-w,y:r.top-h-gap},below:{x:r.left,y:r.top+r.height+gap}};
 const first=sides[s.side]||sides.right,choices=[first,...Object.values(sides).filter(p=>p!==first)];
 for(const p of choices){p.x=Math.max(m,Math.min(innerWidth-w-m,p.x));p.y=Math.max(m,Math.min(innerHeight-h-m,p.y));p.overlap=Math.max(0,Math.min(p.x+w,r.left+r.width)-Math.max(p.x,r.left))*Math.max(0,Math.min(p.y+h,r.top+r.height)-Math.max(p.y,r.top))}
 const p=choices.find(p=>!p.overlap)||choices.reduce((a,b)=>a.overlap<=b.overlap?a:b);card.style.left=p.x+'px';card.style.top=p.y+'px';card.className='';
};
const x33TourBefore=renderPageGuide;
renderPageGuide=function(){
 if(!x33IsLight()){x33TourBefore();return}
 document.body.classList.add('x29-short-intro');const group=pageGuides[pageGuide],s=group.steps[guideIndex],last=guideIndex===group.steps.length-1,card=document.getElementById('hint-card');
 card.innerHTML='<header><h2 id="hint-title">'+x22esc(s.title)+'</h2><span class="x29-step-count">'+(guideIndex+1)+' / '+group.steps.length+'</span><button class="hint-close" aria-label="关闭入门提示">×</button></header><p>'+x22esc(s.text)+'</p><footer><button class="guide-skip" id="page-guide-skip">跳过</button>'+(guideIndex?'<button class="guide-back" id="page-guide-back">上一步</button>':'')+'<button class="hint-ok" id="page-guide-next">'+(last?(pageGuide==='chat'?'开始使用':'知道了'):'下一步')+'</button></footer>';
 card.tabIndex=-1;card.setAttribute('aria-label',group.name+' '+(guideIndex+1)+' / '+group.steps.length);card.focus({preventScroll:true});
 card.querySelector('.hint-close').onclick=card.querySelector('#page-guide-skip').onclick=()=>finishPageGuide(false);
 card.querySelector('#page-guide-back')?.addEventListener('click',()=>goPageStep(guideIndex-1));card.querySelector('#page-guide-next').onclick=()=>last?finishPageGuide(true):goPageStep(guideIndex+1);
 hintLayer.classList.add('open');hintEntry.style.display='none';positionPageGuide();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)card.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'});
};
const x33FinishBefore=finishPageGuide;
finishPageGuide=function(completed){
 if(!x33IsLight()){x33FinishBefore(completed);return}
 const group=pageGuide;seenPages.add(group);saveSeen();pageGuide=null;hintLayer.classList.remove('open');document.body.classList.remove('x29-short-intro');hintEntry.style.display=groupFor(current)?'block':'none';
 if(['chat','project','employee-chat','agent-created'].includes(current)&&!hotspots.querySelector('.x22-messages'))x22messages();
};
window.pageOnboarding.finish=finishPageGuide;
/* Actual user actions end the introduction before legacy click handlers run.
   This avoids their former hardcoded tutorial indices performing extra steps. */
function x33BeforeAction(e){if(x33IsLight()&&pageGuide!=='automation'&&!hintLayer.contains(e.target)&&e.target.closest('button,a,input,textarea,select,summary,[role="button"]'))finishPageGuide(false)}
document.addEventListener('pointerdown',x33BeforeAction,true);
document.addEventListener('click',x33BeforeAction,true);
