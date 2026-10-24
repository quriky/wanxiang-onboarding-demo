/* Four brief location hints; every step stays in chat and performs no task. */
pageGuides.chat={name:'开工入门',finish:'chat',steps:[
 {page:'chat',title:'先认识你的数字员工',text:'开工助理可以帮你整理资料、分析数据、准备汇报。从一件正在做的事聊起就好。',selector:'#x22-assistant',rect:[92,112,210,72],side:'right'},
 {page:'chat',title:'需要协作时，从这里开始',text:'点这里可以创建项目、挑选数字员工。先了解入口，需要时再用。',selector:'.x22-plus',rect:[268,14,30,31],side:'right'},
 {page:'chat',title:'把想做的事告诉它',text:'在这里输入需求，也可以添加资料。先说目标，细节可以边聊边补充。',selector:'#x22-input',rect:[348,757,1082,66],side:'above'},
 {page:'chat',title:'边用边领新手积分',text:'新手任务在这里，随时能回来查看和领取积分。挑一件你感兴趣的试试吧。',selector:'#wx-starter-launch',rect:[3,678,70,60],side:'right',cta:'开始使用'}
]};
const x29oldPosition=positionPageGuide;
positionPageGuide=function(){
 if(pageGuide!=='chat'){x29oldPosition();return}
 const step=pageGuides.chat.steps[guideIndex],card=document.getElementById('hint-card'),focus=document.getElementById('hint-focus'),frame=stage.getBoundingClientRect(),scale=frame.width/1464;
 const el=document.querySelector(step.selector),r=el?.getBoundingClientRect()||{left:frame.left+step.rect[0]*scale,top:frame.top+step.rect[1]*scale,width:step.rect[2]*scale,height:step.rect[3]*scale};
 const x=Math.max(0,r.left-5),y=Math.max(0,r.top-5),right=Math.min(innerWidth,r.left+r.width+5),bottom=Math.min(innerHeight,r.top+r.height+5);
 hintLayer.querySelector('.page-scrim').style.cssText='inset:0;clip-path:polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,'+x+'px '+y+'px,'+right+'px '+y+'px,'+right+'px '+bottom+'px,'+x+'px '+bottom+'px,'+x+'px '+y+'px)';
 focus.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px';
 const w=card.offsetWidth,h=card.offsetHeight,gap=16,margin=14;
 const choices=step.side==='above'?[{x:r.left+r.width-w,y:r.top-h-gap},{x:r.left,y:r.top+r.height+gap}]:[{x:r.left+r.width+gap,y:r.top},{x:r.left,y:r.top-h-gap},{x:r.left,y:r.top+r.height+gap}];
 for(const p of choices){p.x=Math.max(margin,Math.min(innerWidth-w-margin,p.x));p.y=Math.max(margin,Math.min(innerHeight-h-margin,p.y));p.overlap=Math.max(0,Math.min(p.x+w,r.left+r.width)-Math.max(p.x,r.left))*Math.max(0,Math.min(p.y+h,r.top+r.height)-Math.max(p.y,r.top))}
 const chosen=choices.find(p=>p.overlap===0)||choices.reduce((a,b)=>a.overlap<=b.overlap?a:b);card.style.left=chosen.x+'px';card.style.top=chosen.y+'px';card.className='';
};
const x29oldTour=renderPageGuide;
renderPageGuide=function(){
 if(pageGuide!=='chat'){document.body.classList.remove('x29-short-intro');x29oldTour();return}
 document.body.classList.add('x29-short-intro');const step=pageGuides.chat.steps[guideIndex],last=guideIndex===3,card=document.getElementById('hint-card');
 card.innerHTML='<header><h2 id="hint-title">'+x22esc(step.title)+'</h2><span class="x29-step-count">'+(guideIndex+1)+' / 4</span><button class="hint-close" aria-label="关闭入门提示">×</button></header><p>'+x22esc(step.text)+'</p><footer><button class="guide-skip" id="page-guide-skip">跳过</button>'+(guideIndex?'<button class="guide-back" id="page-guide-back">上一步</button>':'')+'<button class="hint-ok" id="page-guide-next">'+(last?'开始使用':'下一步')+'</button></footer>';
 card.tabIndex=-1;card.setAttribute('aria-label','开工入门 '+(guideIndex+1)+' / 4');card.focus({preventScroll:true});
 card.querySelector('.hint-close').onclick=card.querySelector('#page-guide-skip').onclick=()=>finishPageGuide(false);
 card.querySelector('#page-guide-back')?.addEventListener('click',()=>goPageStep(guideIndex-1));card.querySelector('#page-guide-next').onclick=()=>last?finishPageGuide(true):goPageStep(guideIndex+1);
 hintLayer.classList.add('open');hintEntry.style.display='none';positionPageGuide();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)card.animate([{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'});
};
const x29oldFinish=finishPageGuide;finishPageGuide=function(completed){const short=pageGuide==='chat',saved=draft;x29oldFinish(completed);if(short){document.body.classList.remove('x29-short-intro');if(draft!==saved){draft=saved;storeDraft();show('chat',false)}}};
window.pageOnboarding.finish=finishPageGuide;
const x29oldVisit=x22visit;x22visit=function(...args){if(pageGuide==='chat')finishPageGuide(false);return x29oldVisit(...args)};
const x29oldSend=sendDemo;sendDemo=function(){if(pageGuide==='chat')finishPageGuide(false);return x29oldSend()};
const x29oldRender=render;render=function(){x29oldRender();if(pageGuide!=='chat')document.body.classList.remove('x29-short-intro')};
