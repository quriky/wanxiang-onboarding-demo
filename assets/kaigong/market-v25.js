/* Any market employee may be hired. Greeting stays an editable, unsent draft. */
const x26catalog=[
 ['dev','高级开发工程师','用文字描述需求，开发网站、小程序或应用，确认需求与边界后再开始。','梳理应用需求','设计页面流程','检查代码问题'],
 ['douyin','抖音一键发布','整理短视频素材、文案和发布计划，发布前和你核对内容。','准备视频文案','整理发布计划','检查素材清单'],
 ['office','职场办公全能助手','分析数据、做表格、写报告和汇报PPT，整理资料与项目进度。','整理工作资料','准备工作汇报','分析一份表格'],
 ['writing','长篇内容创作师','梳理故事、课程与讲义，撰写长篇内容，检查前后情节。','梳理故事大纲','准备课程讲义','润色一段内容'],
 ['visual','电商视觉运营师','根据商品照片和卖点，准备主图、详情页和促销素材。','梳理商品卖点','准备主图需求','规划详情页'],
 ['cad','CAD建模与制图师','根据文字、图片和尺寸说明，梳理建模与制图需求。','梳理尺寸要求','检查图纸信息','准备建模说明'],
 ['clip','口播剪辑助手','整理口播素材、字幕和剪辑思路，协助准备视频内容。','整理口播素材','检查字幕内容','准备剪辑清单'],
 ['short','短视频内容制作人','准备短视频选题、脚本、封面与发布安排。','挑选视频选题','撰写视频脚本','准备拍摄清单'],
 ['investing','投资与量化分析师','整理公开市场资料与历史数据，帮助梳理研究问题。','整理研究资料','解读历史数据','梳理研究问题'],
 ['prompts','提示词优化工程师','把需求变成清楚、可复用的提示词，结合使用结果持续修改。','优化一段提示词','说清输出要求','整理常用模板'],
 ['redbook','小红书一键发布','整理小红书选题、图文素材和发布安排，发布前和你核对。','整理笔记选题','准备图文文案','安排发布计划'],
 ['wechat','微信公众号运营师','从账号定位、选题到图文排版与数据整理，协助公众号日常运营。','整理公众号选题','撰写推文大纲','检查排版内容']
].map(([id,name,role,...ideas])=>({id,name,role,ideas}));
for(const a of x26catalog)if(!x22pool.some(p=>p.id===a.id))x22pool.push(a);
let x26selected=x26catalog.find(a=>a.id===x22.marketSelected)||null,x26typing=null;
const x26greeting='你好，你能帮我做什么？';
function x26choose(id,page='hire'){
 x26selected=x26catalog.find(a=>a.id===id);if(!x26selected)return;
 x22.marketSelected=id;x22save();x23MarketVisit(page,page==='employee'?1:3);
}
x23ConfirmHire=function(){
 const a=x26selected;if(!a)return;
 if(!x22.employees.some(e=>e.id===a.id))x22.employees.push({id:a.id,name:a.name,role:a.role,source:'market'});
 x22.activeEmployee=a.id;x22.marketSelected=a.id;x22save();
 WxCampaign.record('hired',a.id);x23MarketVisit('hired',4);
};
x23OpenEmployee=function(){
 if(!x26selected)return;x22.activeEmployee=x26selected.id;
 if(pageGuide==='market')finishPageGuide(false);
 const before=internalGuideChange;internalGuideChange=true;
 try{show('employee-chat')}finally{internalGuideChange=before}
};
for(const key of ['employee','employee-cases','hire','hired'])screens[key].image=screens.market.image;
screens['employee-chat'].image=screens.chat.image;
function x26market(){
 hotspots.querySelectorAll('button').forEach(b=>{if(/^(录用数字员工 \d+|查看高级开发工程师档案)$/.test(b.getAttribute('aria-label')||''))b.remove()});
 hotspots.querySelector('#x23-market-card')?.remove();
 x23Focus('x26-market-grid',[96,130,1352,790]);
 for(const [i,a]of x26catalog.entries()){
  const col=i%3,row=Math.floor(i/3),hired=x22.employees.some(e=>e.id===a.id);
  spot('查看'+a.name+'档案',111+col*452,141+row*201,337,114,()=>x26choose(a.id,'employee'));
  const b=spot((hired?'已录用，查看 ':'录用 ')+a.name,467+col*452,265+row*201,50,34,()=>x26choose(a.id));
  // spot appends a button; use its dataset for all-entry task highlighting.
  const button=b||hotspots.lastElementChild;button.dataset.marketHire=a.id;button.id='x26-hire-'+a.id;
  if(hired){button.textContent='已录用';button.classList.add('x26-hired-button')}
  if(i===0)button.dataset.firstMarketEntry='true';
 }
}
function x26dialog(){
 const a=x26selected;if(!a){show('market');return}
 const isProfile=['employee','employee-cases'].includes(current),success=current==='hired';
 const title=isProfile?'数字员工档案':success?'录用成功':'确认录用数字员工';
 const body='<div class="x26-person"><span class="x26-avatar">'+x22esc(a.name.slice(0,1))+'</span><div><h3>'+x22esc(a.name)+'</h3><small>数字员工</small></div></div><p class="x26-role">'+x22esc(a.role)+'</p>'+(isProfile?'<div id="x23-profile-content"><h4>可以从这些工作开始</h4><ul>'+a.ideas.map(t=>'<li>'+x22esc(t)+'</li>').join('')+'</ul></div>':success?'<p>已加入你的对话列表。去打个招呼，了解它能帮你做什么。</p>':'<div id="x23-hire-options"><h4>独立工位</h4><p>录用后加入对话列表，可以随时安排工作，也可以在项目中邀请它。</p></div>');
 const action=isProfile?'录用':success?'去对话':'确认录用（演示）',id=isProfile?'x23-hire-entry':success?'x23-hired-chat':'x23-hire-confirm';
 const pane=x22dialog(title,body,'<button class="x22-button" id="x26-market-cancel">返回人才市场</button><button class="x22-button primary" id="'+id+'">'+action+'</button>','x26-market-dialog');
 pane.querySelector('.x22-close').onclick=pane.querySelector('#x26-market-cancel').onclick=()=>{if(pageGuide==='market')finishPageGuide(false);else show('market')};
 pane.querySelector('#'+id).onclick=isProfile?()=>x23MarketVisit('hire',3):success?x23OpenEmployee:x23ConfirmHire;
}
function x26stopTyping(){if(x26typing){clearTimeout(x26typing.timer);x26typing=null}}
function x26greet(a){
 const input=hotspots.querySelector('#x22-input');if(!input||pageGuide)return;
 if(!x22.greetings||typeof x22.greetings!=='object')x22.greetings={};
 if(x22.greetings[a.id]||draft||(x22.messages[a.id]||[]).length)return;
 x22.greetings[a.id]=true;x22save();
 const state={input,id:a.id,index:0,timer:null};x26typing=state;
 const write=()=>{if(x26typing!==state||!input.isConnected||x22thread!==state.id){x26stopTyping();return}
  state.index++;input.value=x26greeting.slice(0,state.index);input.oninput();input.setSelectionRange(input.value.length,input.value.length);
  if(state.index<x26greeting.length)state.timer=setTimeout(write,75);else x26typing=null;
 };
 input.addEventListener('input',x26stopTyping,{once:true});
 input.addEventListener('keydown',x26stopTyping,{once:true});
 input.focus({preventScroll:true});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){state.index=x26greeting.length-1;write()}else state.timer=setTimeout(write,220);
}
function x26chat(){
 const a=x22.employees.find(e=>e.id===x22.activeEmployee);if(a?.source!=='market')return;
 const meta=x26catalog.find(e=>e.id===a.id)||a;
 if(!(x22.messages[a.id]||[]).length){
  const welcome=x22el('section','x26-welcome','<span class="x26-avatar">'+x22esc(a.name.slice(0,1))+'</span><h2>和'+x22esc(a.name)+'聊聊</h2><p>'+x22esc(a.role)+'</p><div class="x26-ideas">'+(meta.ideas||['介绍你能做的工作']).map(t=>'<button>'+x22esc(t)+'</button>').join('')+'</div>');
  welcome.querySelectorAll('button').forEach(b=>b.onclick=()=>{x26stopTyping();const input=hotspots.querySelector('#x22-input');input.value=b.textContent;input.oninput();input.focus()});
 }
 x26greet(a);
}
const x26render=render;render=function(){
 x26stopTyping();const modal=['employee','employee-cases','hire','hired'].includes(current),key=current;
 if(modal){current='market';x26render();current=key;x26market();x26dialog()}
 else{x26render();if(current==='market')x26market();if(['employee-chat','agent-created'].includes(current))x26chat()}
};
// The introductory market tour leaves the choice to the customer too.
Object.assign(pageGuides.market.steps[0],{text:'按自己的工作需要挑选数字员工。可以先看档案，也可以直接点任意一位的“录用”。',rect:[96,130,1352,790],selector:'#x26-market-grid',cta:'我来挑选',action:undefined});
Object.assign(pageGuides.market.steps[5],{text:'左侧会保留你录用的数字员工。在下方给它发送一次消息，就能完成这项新手任务。',selector:'#x22-created-employee'});
const x26tour=renderPageGuide;renderPageGuide=function(){
 x26tour();if(pageGuide==='market'&&guideIndex===0){document.getElementById('page-guide-next').onclick=()=>finishPageGuide(false);hotspots.querySelectorAll('[data-market-hire]').forEach(b=>b.classList.add('wx-task-focus'))}
};
