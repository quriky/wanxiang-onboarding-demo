/* One first-run path inside conversation; all effects stay browser-local. */
const X22_KEY='wx-kaigong-team-v22',X22_SEEN='wx-kaigong-welcome-v22';
const x22pool=[
 {id:'dev',name:'高级开发工程师',role:'用文字描述需求，开发网站、小程序或应用，确认需求与边界后再开始。'},
 {id:'douyin',name:'抖音一键发布',role:'说需求、传图文或素材路径，帮助安排发布并核对结果。'},
 {id:'office',name:'职场办公全能助手',role:'分析数据、做表格、写报告和汇报PPT，整理资料与项目进度。'},
 {id:'writing',name:'长篇内容创作师',role:'写小说和剧本、梳理课程与讲义，检查前后情节。'},
 {id:'visual',name:'电商视觉运营师',role:'根据商品照片和卖点，准备主图、详情页和促销素材。'},
];
let x22={employees:[],project:null,drafts:{},messages:{},activeEmployee:null};
try{const saved=JSON.parse(localStorage.getItem(X22_KEY)||'null');if(saved&&Array.isArray(saved.employees)){x22={...x22,...saved};x22.employees=saved.employees.filter(a=>a&&typeof a.id==='string'&&typeof a.name==='string'&&typeof a.role==='string');if(x22.project&&(!Array.isArray(x22.project.members)||typeof x22.project.name!=='string'))x22.project=null;}}catch{}
// Upgrade only the former example names; preserve custom names and all project content.
if(x22.project&&['运营','我的项目'].includes(x22.project.name)){x22.project.name='数据分析';x22save()}
const x22esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function x22save(){if(WxCampaign.resetting)return;try{localStorage.setItem(X22_KEY,JSON.stringify(x22))}catch{}}
function x22people(){return [...new Map([...x22pool,...x22.employees].map(a=>[a.id,a])).values()]}
function x22members(){return x22.project?x22people().filter(a=>x22.project.members.includes(a.id)):[]}
function x22el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;hotspots.append(e);return e}
function x22avatar(a){return `<span class="x22-avatar ${a.id==='dev'?'hired':''}">${a.id==='dev'?'':x22esc(a.name.slice(0,1))}</span>`}
function x22visit(key,index){if(pageGuide==='chat'&&index!==undefined)goPageStep(index);else show(key)}
let x22thread='assistant',x22selected=new Set(),x22query='',x22at=false,x22promptOpen=false;
if(!x22.drafts||typeof x22.drafts!=='object')x22.drafts={};if(!x22.messages||typeof x22.messages!=='object')x22.messages={};
if(incomingDraft)x22.drafts.assistant=incomingDraft;else if(typeof x22.drafts.assistant==='string')draft=x22.drafts.assistant;
const x22storeDraft=storeDraft;storeDraft=function(){x22.drafts[x22thread]=draft;x22save();x22storeDraft();if(hotspots.querySelector('.x22-session-tabs'))x22sessionTabs()};
screens.chat.image='assets/kaigong/fresh/chat.png';screens.automation.image='assets/kaigong/fresh/automation.png';screens.files.image='assets/kaigong/fresh/files.png';
for(const key of ['add-menu','agent-create','agent-created','project-create','case-preview','case-filled'])screens[key].image=screens.chat.image;
screens.project.image='assets/kaigong/fresh/project.png';screens['project-members']={title:'项目成员',image:screens.project.image};
const x22groupFor=groupFor;groupFor=function(key){return key==='project-members'?'chat':x22groupFor(key)};
const x22saveSeen=saveSeen;saveSeen=function(){x22saveSeen();if(WxCampaign.resetting)return;try{localStorage.setItem(X22_SEEN,JSON.stringify([...seenPages]))}catch{}};
try{const own=JSON.parse(localStorage.getItem(X22_SEEN)||'null');if(!Array.isArray(own)||!own.includes('chat'))seenPages.delete('chat')}catch{seenPages.delete('chat')}
// The main tour covers employees, projects, teamwork and a complete remix example.
pageGuides.chat={name:'开工入门',finish:'case-filled',steps:[
 {page:'chat',title:'先认识你的开工助理',text:'左边这位开工助理，就是帮你做事的数字员工。分析数据、整理资料、准备汇报，都可以先找它。接下来一起建项目、邀请数字员工，再走一遍做同款，看看怎么从案例开始。',rect:[92,112,210,72],selector:'#x22-assistant',side:'right',cta:'接着建一个项目 →'},
 {page:'chat',title:'建项目，先点这里的＋',text:'在左边“对话”标题的右侧，找到这个加号。先点开它，再选择“创建项目”。',rect:[268,14,30,31],selector:'.x22-plus',side:'right',cta:'点开加号 →',action:'menuProject'},
 {page:'add-menu',title:'把同一件事，放进一个项目',text:'分析一份数据、整理一批资料，或准备一次工作汇报，都可以建成项目，把相关讨论和数字员工放在一起。这里选“创建项目”。',rect:[70,61,223,61],selector:'#x22-create-project-entry',side:'right',cta:'选择创建项目 →',action:'projectEntry'},
 {page:'project-create',title:'给这项工作起个名字',text:'这里用“数据分析”作例子，你也可以改成自己正在做的事，比如“资料整理”或“工作汇报”。确认后点“创建项目”，再邀请需要的数字员工。',rect:[477,324,510,240],selector:'.x22-dialog',side:'left',cta:'创建项目 →',action:'project'},
 {page:'project',title:'项目建好了，把数字员工请进来',text:'以后点左边的项目，就能回到这项工作。现在点项目名称旁的成员图标，选几位适合这件事的数字员工，一起做。',rect:[450,8,170,43],selector:'#x22-open-members',side:'below',cta:'邀请项目成员 →',action:'invite'},
 {page:'project-members',title:'勾选数字员工，把团队组起来',text:'可以搜索数字员工，也可以直接勾选。按任务挑选需要的搭档，至少选一位，再点“添加”。',rect:[421,134,622,500],selector:'.x22-dialog',side:'left',cta:'添加选中的数字员工 →',action:'members'},
 {page:'project',title:'同一件事，可以让数字员工一起做',text:'在项目里说清目标，也可以输入 @ 指定一位成员。例如请它分析表格、整理资料或写一份汇报。项目和成员都会留在这里。接下来，我们换个起步方式：借一个现成案例试试做同款。',rect:[348,708,1082,154],selector:'#x22-composer',side:'above',cta:'接着体验做同款 →'},
]};
pageGuides.createAgent={name:'自定义数字员工',finish:'agent-created',steps:[
 {page:'agent-create',title:'需要固定分工时，再自定义数字员工',text:'如果希望有一位固定负责整理资料、分析数据或写报告的搭档，就给它起个名字、写清职责。临时任务也可以直接交给开工助理。',rect:[477,205,510,400],selector:'.x22-dialog',side:'left',cta:'继续填写 →'},
 {page:'agent-create',title:'检查名字和职责，再创建',text:'下面的示例可以直接修改。确认后点“创建并去对话”，就能给这位数字员工安排第一件事。',rect:[477,205,510,400],selector:'.x22-dialog',side:'left',cta:'创建并去对话 →',action:'employee'},
]};
pageGuides.remix={name:'做同款',finish:'case-filled',steps:[
 {page:'case-preview',title:'先看看效果，再借用这份需求',text:'左下角可以展开查看提示词。喜欢这个方向，就点“做同款”：它会把需求带入输入框，方便你换上自己的产品、卖点和素材。',rect:[1205,800,98,35],selector:'#x22-remix',side:'above',cta:'做同款 →',action:'remix'},
 {page:'case-filled',title:'把内容换成自己的，就可以开始了',text:'提示词已经带入下方输入框。把名称、卖点和素材换成自己的，检查后，想发送就点输入框右下角的发送箭头；还没准备好，也可以先留着草稿。之后可通过顶部会话标签切换查看聊天。',rect:[348,574,1082,288],selector:'#x22-composer',side:'above',cta:'我知道了',action:undefined},
]};
// Explicitly return through the assistant row before opening its sample.
pageGuides.chat.steps.push(
 {page:'project',title:'先回到开工助理，项目会保留',text:'做同款的案例在开工助理的对话首页。点左侧“开工助理”，回去看看现成效果；刚建好的项目和成员都还在，需要时可以随时回来。',rect:[92,190,210,72],selector:'#x22-assistant',side:'right',cta:'点击开工助理 →',action:'assistant'},
 {page:'chat',title:'从现成案例开始，少一点摸索',text:'工作汇报、宣传图片等任务，都可以先参考案例的效果和写法。这次用“产品宣传图”走一遍：点开案例，再把需求换成自己的内容。',rect:[456,325,275,225],selector:'[aria-label="橙意 · 产品宣传图"]',side:'right',cta:'打开这个案例 →',action:'caseEntry'},
 ...pageGuides.remix.steps.map(s=>({...s}))
);
// New-session pages are set to the active employee or project when opened.
pageGuides.newSession={name:'新会话',finish:'chat',steps:[
 {page:'chat',title:'换一件事，就开一个新会话',text:'新会话不会带入上一段聊天的完整上下文。适合一件事做完后，开始不相关的新任务，减少无关内容占用。数字员工已经提炼保存的记忆，后续仍可能用到；并不是整段聊天都会记住。同一件事还没做完，就继续在原会话里聊。',rect:[360,717,80,33],selector:'[data-mode="new"]',side:'above',cta:'新建会话 →',action:'newSession'},
 {page:'chat',title:'新会话开始了，旧聊天还在',text:'这里已经换成空白会话。想找回之前的讨论，可以点顶部会话标签，也可以打开右上角的会话记录。现在可以说说新的任务；这段新聊天不会自动带入旧聊天的上下文。',rect:[1340,8,42,40],selector:'.x22-session-tabs',side:'below',cta:'开始新的任务 →'},
]};
screens['case-result']={title:'做同款效果示例',image:screens.chat.image};
function x22sidebar(){
 const side=x22el('aside','x22-sidebar',`<header>对话<button class="x22-plus" aria-label="创建项目或添加数字员工">＋</button></header><input class="x22-search" aria-label="搜索对话" placeholder="搜索对话"><div id="x22-thread-list"></div>`);
 const rows=[];if(x22.project)rows.push({id:'project',name:x22.project.name,sub:'开始一次对话',mark:'project'});rows.push({id:'assistant',name:'开工助理',sub:'开始一次对话',mark:'assistant'});for(const a of x22.employees)rows.push({...a,sub:'开始一次对话'});
 const list=side.querySelector('#x22-thread-list');
 function draw(q=''){list.innerHTML=rows.filter(a=>a.name.includes(q)).map(a=>`<button class="x22-thread ${x22thread===(a.id==='project'?'project':a.id)?'active':''}" data-thread="${x22esc(a.id)}" id="${a.id==='assistant'?'x22-assistant':a.id===x22.activeEmployee?'x22-created-employee':a.id==='project'?'x22-project-row':'x22-row-'+x22esc(a.id)}"><span class="x22-avatar ${a.mark||''}">${a.mark==='assistant'?'':x22esc(a.name.slice(0,1))}</span><span><b>${x22esc(a.name)}</b><small>${a.sub}</small></span></button>`).join('');list.querySelectorAll('[data-thread]').forEach(b=>b.onclick=()=>{const id=b.dataset.thread;if(id==='assistant')x22visit('chat');else if(id==='project')show('project');else{x22.activeEmployee=id;show(id==='dev'?'employee-chat':'agent-created')}})}
 draw();side.querySelector('.x22-search').oninput=e=>draw(e.target.value.trim());side.querySelector('.x22-plus').onclick=()=>x22visit('add-menu');
}
function x22identity(){const a=x22.employees.find(a=>a.id===x22.activeEmployee),isProject=['project','project-members'].includes(current),isEmployee=['agent-created','employee-chat'].includes(current)&&a;
 const head=x22el('div','x22-top-identity',`${isProject?'<span class="x22-avatar project">'+x22esc((x22.project?.name||'项').slice(0,1))+'</span>':isEmployee?x22avatar(a):'<span class="x22-avatar assistant"></span>'}<span>${x22esc(isProject?x22.project?.name:isEmployee?a.name:'开工助理')}</span>${isProject?'<div class="x22-member-pills">'+x22members().slice(0,3).map(a=>'<span>'+x22esc(a.name.slice(0,1))+'</span>').join('')+'</div><button id="x22-open-members" aria-label="管理项目成员">♟＋</button>':'<span style="color:#999;margin-left:8px">⋯</span>'}`);
 head.querySelector('#x22-open-members')?.addEventListener('click',()=>{x22selected=new Set(x22.project.members);x22query='';x22visit('project-members')});
}
function x22composer(){const filled=current==='case-filled';const box=x22el('div','x22-composer-cover'+(filled?' filled':''),`<div class="x22-composer-tabs"><button data-mode="new">＋ 新会话</button><button data-mode="image">♧ 图片生成</button><button data-mode="video">▣ 视频生成</button></div><textarea class="x22-input" id="x22-input" aria-label="对话输入" placeholder="${current==='project'?'在 '+x22esc(x22.project?.name)+' 中安排一件事…':'随心输入，拖入素材或用 @ 引用…'}"></textarea><div class="x22-composer-foot"><button aria-label="引用数字员工或资料" id="x22-reference">⊕ @ 引用</button><button class="x22-model-label" data-model="text" aria-label="文本模型选择">${x22esc(selected.text)}⌄</button><button class="x22-model-label" data-model="image" aria-label="图片模型选择">${x22esc(selected.image)}⌄</button><button class="x22-model-label" data-model="video" aria-label="视频模型选择">${x22esc(selected.video)}⌄</button><button class="x22-send" aria-label="发送消息（演示）">↑</button></div>`);box.id='x22-composer';const input=box.querySelector('textarea'),send=box.querySelector('.x22-send');input.value=draft;send.disabled=!draft.trim();input.oninput=()=>{draft=input.value;send.disabled=!draft.trim();storeDraft();if(input.value.endsWith('@'))x22showAt(box,input)};input.onkeydown=e=>{if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();sendDemo()}};send.onclick=sendDemo;box.querySelector('#x22-reference').onclick=()=>x22showAt(box,input);box.querySelector('[data-mode=new]').onclick=x22requestNewSession;box.querySelector('[data-mode=image]').onclick=()=>show('model-image');box.querySelector('[data-mode=video]').onclick=()=>show('video-settings');box.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>show('model-'+b.dataset.model));
}
function x22showAt(box,input){box.querySelector('.x22-at-menu')?.remove();const menu=document.createElement('div');menu.className='x22-at-menu';const members=current==='project'?x22members():[{id:'assistant',name:'开工助理'},...x22.employees];menu.innerHTML='<p>选择当前'+(current==='project'?'项目成员':'数字员工')+'</p>'+members.map(a=>`<button data-mention="${x22esc(a.id)}">@ ${x22esc(a.name)}</button>`).join('');box.append(menu);menu.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=members.find(a=>a.id===b.dataset.mention);draft=(input.value.endsWith('@')?input.value.slice(0,-1):input.value)+'@'+a.name+' ';input.value=draft;storeDraft();menu.remove();input.focus()})}
function x22dialog(title,body,footer,cls=''){x22el('div','x22-shade');return x22el('section','x22-dialog '+cls,`<header><h2>${title}</h2><button class="x22-close" aria-label="关闭弹窗">×</button></header>${body}<footer>${footer}</footer>`)}
function x22createEmployee(){const form=x22dialog('添加数字员工',`<div id="x22-employee-fields"><label for="agent-name">数字员工名称</label><input id="agent-name" maxlength="30" value="${x22esc(customAgent.name)}"><label for="agent-role">职责与擅长的工作</label><textarea id="agent-role">${x22esc(customAgent.role)}</textarea></div><p>填写名称和职责，在本地演示里添加一位数字员工。</p>`,'<button class="x22-button" id="x22-employee-cancel">取消</button><button class="x22-button primary" id="agent-submit">创建并去对话</button>');form.querySelector('.x22-close').onclick=form.querySelector('#x22-employee-cancel').onclick=()=>show('chat');form.querySelector('#agent-name').oninput=e=>customAgent.name=e.target.value;form.querySelector('#agent-role').oninput=e=>customAgent.role=e.target.value;form.querySelector('#agent-submit').onclick=()=>{const name=customAgent.name.trim(),role=customAgent.role.trim();if(!name||!role){toast('把数字员工名称和职责都填写一下。');form.querySelector(!name?'#agent-name':'#agent-role').focus();return}let a=pageGuide==='chat'&&x22.employees.find(a=>a.id===x22.tourEmployee);if(a){a.name=name;a.role=role}else{a={id:'custom-'+Date.now()+'-'+Math.random().toString(36).slice(2,6),name,role};x22.employees.push(a)}x22.activeEmployee=a.id;if(pageGuide==='chat')x22.tourEmployee=a.id;x22save();WxCampaign.record('created');x22visit('agent-created',4)};}
function x22createProject(){const form=x22dialog('创建项目',`<input id="x22-project-name" aria-label="项目名称" maxlength="40" value="${x22esc(x22.project?.name||'数据分析')}"><p>给这项工作起个名字，创建后再邀请成员。</p>`,'<button class="x22-button" id="x22-project-cancel">取消</button><button class="x22-button primary" id="x22-project-submit">创建项目</button>');form.style.top='324px';form.querySelector('.x22-close').onclick=form.querySelector('#x22-project-cancel').onclick=()=>show('chat');form.querySelector('#x22-project-submit').onclick=()=>{const name=form.querySelector('input').value.trim();if(!name){toast('先给项目起个名字。');form.querySelector('input').focus();return}x22.project={id:x22.project?.id||'project-'+Date.now(),name,members:x22.project?.members||[]};x22save();x22visit('project',8)}}
function x22memberDialog(){const form=x22dialog('项目成员 · '+x22esc(x22.project?.name),'<input id="x22-member-search" aria-label="搜索可邀请的数字员工" placeholder="搜索可邀请的数字员工"><div class="x22-member-list" id="x22-member-options"></div>','<button class="x22-button" id="x22-member-cancel">取消</button><button class="x22-button primary" id="x22-member-add">添加</button>','x22-members');const draw=()=>{const list=form.querySelector('.x22-member-list'),pool=x22people().filter(a=>(a.name+a.role).includes(x22query));list.innerHTML=pool.map(a=>`<label class="x22-option"><input type="checkbox" value="${x22esc(a.id)}" ${x22selected.has(a.id)?'checked':''}>${x22avatar(a)}<span><b>${x22esc(a.name)}</b><small>${x22esc(a.role)}</small></span></label>`).join('')||'<div class="x22-pick-empty">没有找到这位数字员工，换个关键词试试。</div>';list.querySelectorAll('input').forEach(input=>input.onchange=()=>{if(input.checked)x22selected.add(input.value);else x22selected.delete(input.value);count()});count()};const count=()=>{const add=form.querySelector('#x22-member-add');add.textContent=x22selected.size?'添加 '+x22selected.size:'添加';add.disabled=!x22selected.size};form.querySelector('input').value=x22query;form.querySelector('input').oninput=e=>{x22query=e.target.value;draw()};form.querySelector('.x22-close').onclick=form.querySelector('#x22-member-cancel').onclick=()=>show('project');form.querySelector('#x22-member-add').onclick=()=>{if(!x22selected.size){toast('先勾选一位项目成员。');return}x22.project.members=[...x22selected].filter(id=>x22people().some(a=>a.id===id));x22save();x22visit('project',10)};draw()}
function x22remix(){if(x22thread!=='assistant')show('chat');draft=casePrompt;storeDraft();x22visit('case-filled',13);toast('已填入输入框，调整后再发送。')}
function x22case(){x22el('div','x22-shade');const pane=x22el('section','x22-case-dialog','<header>橙意 · 产品宣传图<button class="x22-close" aria-label="关闭案例">×</button></header><div class="x22-case-art"></div><footer><button id="x22-view-prompt">查看提示词⌃</button><button class="x22-button primary" id="x22-remix">✧ 做同款</button></footer>');pane.querySelector('.x22-close').onclick=()=>show('chat');pane.querySelector('#x22-remix').onclick=x22remix;pane.querySelector('#x22-view-prompt').onclick=()=>{const old=pane.querySelector('.x22-prompt-preview');if(old)old.remove();else{const pre=document.createElement('div');pre.className='x22-prompt-preview';pre.textContent=casePrompt;pane.append(pre)}};}
function x22messages(){const list=x22.messages[x22thread]||[];if(!list.length||(pageGuide&&pageGuide!=='newSession')||current==='case-filled'||!['chat','project','agent-created','case-result','employee-chat'].includes(current))return;const view=x22el('div','x22-messages');for(const m of list){const e=document.createElement('div');e.className='x22-msg '+m.type;if(m.name){const s=document.createElement('small');s.textContent=m.name; e.append(s)}e.append(document.createTextNode(m.text));if(m.image==='result'){const b=document.createElement('button');b.className='x22-result-thumb';b.setAttribute('aria-label','查看产品宣传图效果示例');b.innerHTML='<img src="assets/kaigong/fresh/result.png" alt="橙意产品宣传图教学效果示例"><span>教学效果示例 · 点击看大图</span>';b.onclick=x22resultPreview;e.append(b)}view.append(e)}view.scrollTop=view.scrollHeight}
const x22baseRender=render;render=function(){
 const special=['chat','add-menu','agent-create','agent-created','project-create','project','project-members','case-preview','case-filled','case-result','employee-chat'].includes(current);
 if(!special){x22baseRender();if(chatStates.includes(current))x22sidebar();return}
 nav();x22sidebar();x22identity();x22composer();
 if(['agent-created','employee-chat'].includes(current)){const a=x22.employees.find(a=>a.id===x22.activeEmployee);if(a){x22el('div','x22-welcome-label','和'+x22esc(a.name)+'聊聊');x22el('div','x22-welcome-desc',x22esc(a.role))}}
 if(['project','project-members'].includes(current)){x22el('div','x22-project-title','一起推进 '+x22esc(x22.project?.name));x22el('div','x22-project-intro','把目标、资料和需要的数字员工放在一起。<br>在下方说清任务，也可以 @ 选择项目成员。');for(let i=0;i<3;i++)spot('项目任务示例 '+(i+1),560+i*221,375,210,203,()=>{draft=['请先梳理项目目标，列出需要我补充的信息。','请根据我提供的资料整理重点和待办。','请先列出研究问题和需要核实的来源。'][i];storeDraft();const input=hotspots.querySelector('#x22-input');input.value=draft;input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()})}
 else if(current==='employee-chat'){for(let i=0;i<3;i++)spot('数字员工作品示例 '+(i+1),456+i*292,336,275,225,()=>toast('这里展示这位数字员工的作品，可以参考它擅长的任务。'))}else for(const [i,x]of [456,748,1040].entries())spot(['橙意 · 产品宣传图','星越街舞 · 品牌官网','季度复盘 · 业务汇报PPT'][i],x,325,275,225,()=>i===0?x22visit('case-preview'):toast('这次先用产品宣传图演示做同款。'));
 if(current==='add-menu'){const menu=x22el('div','x22-menu','<button id="x22-create-project-entry">创建项目<small>把同一件事，放进一个项目</small></button><button id="x22-market-entry">逛人才市场<small>挑选适合的数字员工，加入你的团队</small></button><button id="x22-add-employee">添加数字员工<small>自定义数字员工资料，按需扩展技能</small></button>');menu.querySelector('#x22-create-project-entry').onclick=()=>x22visit('project-create');menu.querySelector('#x22-add-employee').onclick=()=>x22visit('agent-create');menu.querySelector('#x22-market-entry').onclick=()=>show('market')}
 if(current==='agent-create')x22createEmployee();if(current==='project-create')x22createProject();if(current==='project-members')x22memberDialog();if(current==='case-preview')x22case();x22messages();x22contextControls();x22sessionTabs();
};
const x22baseShow=show;show=function(key,push=true){if(['project','project-members'].includes(key)&&!x22.project)key='project-create';storeDraft();const target=['project','project-members'].includes(key)?'project':['agent-created','employee-chat'].includes(key)&&x22.activeEmployee?x22.activeEmployee:['chat','case-preview','case-filled','case-result'].includes(key)?'assistant':x22thread;if(target!==x22thread){x22thread=target;draft=x22.drafts[target]||''}x22baseShow(key,push)};
const x22baseTour=renderPageGuide;
renderPageGuide=function(){
 if(!pageGuide)return;x22baseTour();const s=pageGuides[pageGuide].steps[guideIndex],btn=document.getElementById('page-guide-next');btn.textContent=s.cta||'下一步 →';
 const actions={assistant:()=>hotspots.querySelector('#x22-assistant')?.click(),caseEntry:()=>hotspots.querySelector('[aria-label="橙意 · 产品宣传图"]')?.click(),employee:()=>hotspots.querySelector('#agent-submit')?.click(),project:()=>hotspots.querySelector('#x22-project-submit')?.click(),members:()=>{const b=hotspots.querySelector('#x22-member-add');if(b?.disabled){toast('先勾选至少一位项目成员。');hotspots.querySelector('.x22-option input')?.focus()}else b?.click()},remix:x22remix,example:x22sendExample,menuProject:()=>hotspots.querySelector('.x22-plus')?.click(),projectEntry:()=>hotspots.querySelector('#x22-create-project-entry')?.click(),invite:()=>hotspots.querySelector('#x22-open-members')?.click(),newSession:()=>{x22newSession();x22baseGo(1)}};
 if(s.action&&actions[s.action])btn.onclick=actions[s.action];

 if(pageGuide==='newSession'&&guideIndex===1)document.getElementById('page-guide-back')?.remove();

 positionPageGuide();
};
const x22baseGo=goPageStep;
goPageStep=function(index){const s=pageGuides[pageGuide]?.steps[guideIndex];if(index>guideIndex&&s?.action){document.getElementById('page-guide-next')?.click();return}x22baseGo(index)};
x22visit=function(key){
 if(pageGuide==='chat'){
  if(key==='case-preview'){seenPages.add('remix');saveSeen()}
  const target=key==='chat'&&guideIndex===7?8:key==='case-preview'?9:key==='case-filled'?10:key==='add-menu'?2:key==='project-create'?3:key==='project-members'?5:key==='project'?(guideIndex===5?6:4):undefined;
  if(target!==undefined){x22baseGo(target);return}
 }
 if(pageGuide==='createAgent'&&key==='agent-created'){finishPageGuide(true);return}
 if(pageGuide==='remix'&&key==='case-filled'){x22baseGo(1);return}
 if(key==='case-preview'&&!seenPages.has('remix')){if(pageGuide)finishPageGuide(false);startPageGuide('remix');return}
 show(key);
};
const x22baseSend=sendDemo;sendDemo=function(){if(current==='case-filled'&&(!pageGuide||pageGuide==='remix'||(pageGuide==='chat'&&guideIndex===10))){if(pageGuide)x22chooseRemix(true);else x22sendExample();return}if(!['chat','agent-created','project','case-filled','case-result','employee-chat'].includes(current))return x22baseSend();if(pageGuide){toast('先完成这次入门指引，再发送你的任务。');return}if(!draft.trim()){toast('先写一句你想完成的事。');return}const messages=x22.messages[x22thread]||(x22.messages[x22thread]=[]),text=draft;messages.push({type:'user',text});if(current==='project'){const members=x22members(),mentioned=members.filter(a=>text.includes('@'+a.name)),responders=(mentioned.length?mentioned:members.slice(0,2));for(const a of responders)messages.push({type:'assistant',name:a.name+' · 演示回复',text:'收到这项任务。可以先补充目标、资料和交付要求，再按我的职责推进。'});if(!responders.length)messages.push({type:'assistant',name:'项目提示',text:'可以先邀请项目成员，再安排具体工作。'})}else{const a=x22.employees.find(a=>a.id===x22thread);messages.push({type:'assistant',name:(a?.name||'开工助理')+' · 演示回复',text:'先确认你想完成什么、已有资料和交付形式，再一起拆解下一步。此处未调用真实模型，不消耗积分。'});if(a)WxCampaign.record(a.source==='market'?'employee-reply':'created-reply')}if(text.includes('@'))WxCampaign.record('reference');draft='';storeDraft();const key=current;show(key);};
const x22baseFinish=finishPageGuide;
finishPageGuide=function(completed){
 const group=pageGuide;if(!group)return;
 if(['chat','remix'].includes(group)&&current==='case-filled'){completed=true;incomingDraft=''}
 if(!completed&&['remix','newSession'].includes(group)){
  const target=current;seenPages.add(group);saveSeen();pageGuide=null;hintLayer.classList.remove('open');internalGuideChange=true;show(target);internalGuideChange=false;hintEntry.style.display='block';return;
 }
 x22baseFinish(completed);if(completed)hotspots.querySelector('#x22-input')?.focus({preventScroll:true});
};

// Contextual hints are opt-in. Session history stays separate from saved memory.
if(!x22.archives||typeof x22.archives!=='object')x22.archives={};
if(!x22.sessions||typeof x22.sessions!=='object')x22.sessions={};
function x22contextControls(){
 if(!['chat','project','agent-created','case-filled','case-result','employee-chat'].includes(current))return;
 const button=hotspots.querySelector('[data-mode="new"]');
 if(button&&!seenPages.has('newSession')){button.classList.add('x22-unread');button.title='了解新会话与记忆'}
 const h=x22el('button','x22-history-button','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10a8 8 0 1 1 2 8M4 5v5h5M12 7v5l3 2"/></svg>');h.setAttribute('aria-label','会话记录');h.title='会话记录';h.onclick=x22history;
 const card=hotspots.querySelector('[aria-label="橙意 · 产品宣传图"]');if(card&&!seenPages.has('remix'))card.classList.add('x22-case-unread');
}
function x22sessionPage(){return x22thread==='project'?'project':x22thread==='assistant'?'chat':x22thread==='dev'?'employee-chat':'agent-created'}
function x22requestNewSession(){
 if(pageGuide){toast('先完成或关闭当前介绍，再开始新会话。');return}
 if(!seenPages.has('newSession')){const target=x22sessionPage();pageGuides.newSession.finish=target;pageGuides.newSession.steps.forEach(s=>s.page=target);startPageGuide('newSession')}
 else{x22newSession();show(x22sessionPage());hotspots.querySelector('#x22-input')?.focus();toast('新会话已开始，旧聊天可在右上角找回。')}
}
function x22sessionMeta(){
 return x22.sessions[x22thread]||(x22.sessions[x22thread]={id:'session-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),time:new Date().toISOString(),customTitle:''});
}
function x22sessionTitle(messages,draftText,customTitle){return customTitle||(messages.find(m=>m.type==='user')?.text||draftText||'未命名会话').slice(0,50)}
function x22archiveCurrent(){
 const messages=x22.messages[x22thread]||[],savedDraft=x22.drafts[x22thread]||'';
 if(!messages.length&&!savedDraft.trim())return;
 const meta=x22sessionMeta(),list=x22.archives[x22thread]||(x22.archives[x22thread]=[]);
 const snapshot={id:meta.id,time:meta.time,customTitle:meta.customTitle||'',title:x22sessionTitle(messages,savedDraft,meta.customTitle),messages:JSON.parse(JSON.stringify(messages)),draft:savedDraft};
 const index=list.findIndex(a=>a.id===meta.id);if(index>=0)list.splice(index,1);list.unshift(snapshot);
}
function x22newSession(){storeDraft();x22archiveCurrent();x22.sessions[x22thread]=null;x22.messages[x22thread]=[];draft='';storeDraft();/* Saved agent memory is not cleared or extracted from chat here. */}
function x22restoreSession(id){
 if(pageGuide){toast('先完成或关闭介绍，再切换会话。');return}
 const list=x22.archives[x22thread]||[],index=list.findIndex(a=>a.id===id);if(index<0)return;
 storeDraft();const [a]=list.splice(index,1);x22archiveCurrent();x22.messages[x22thread]=JSON.parse(JSON.stringify(a.messages||[]));draft=a.draft||'';x22.sessions[x22thread]={id:a.id,time:a.time,customTitle:a.customTitle||''};storeDraft();show(x22sessionPage());
}
function x22sessionTabs(){
 hotspots.querySelector('.x22-session-tabs')?.remove();
 if(!['chat','project','agent-created','case-filled','case-result','employee-chat'].includes(current))return;
 const messages=x22.messages[x22thread]||[],savedDraft=x22.drafts[x22thread]||'',meta=x22sessionMeta();
 const tabs=(x22.archives[x22thread]||[]).filter(a=>(a.messages||[]).length||a.draft).slice().reverse().map(a=>({...a,active:false}));
 if(messages.length||savedDraft.trim())tabs.push({id:meta.id,title:x22sessionTitle(messages,savedDraft,meta.customTitle),active:true});
 if(!tabs.length)return;
 const bar=x22el('nav','x22-session-tabs');bar.setAttribute('aria-label','当前数字员工或项目的会话');
 for(const a of tabs){const chip=document.createElement('div');chip.className='x22-session-chip'+(a.active?' active':'');chip.dataset.session=a.id;
  const title=document.createElement('button');title.className='x22-session-title';title.textContent=a.title||'未命名会话';title.title=title.textContent;title.setAttribute('aria-pressed',String(a.active));title.onclick=()=>{if(!a.active)x22restoreSession(a.id)};
  const rename=document.createElement('button');rename.className='x22-tab-tool';rename.setAttribute('aria-label','重命名会话');rename.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 14l-.5 3.5L6 17l10-10-3-3L3 14zm8-8l3 3"/></svg>';rename.onclick=()=>x22editSession(a.id,false);
  const del=document.createElement('button');del.className='x22-tab-tool';del.setAttribute('aria-label','删除会话');del.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M7 5V3h6v2M5 5l1 12h8l1-12M8 8v6m4-6v6"/></svg>';del.onclick=()=>x22editSession(a.id,true);
  chip.append(title,rename,del);bar.append(chip);
 }
 bar.scrollLeft=bar.scrollWidth;x22save();
}
function x22editSession(id,deleting){
 if(pageGuide){toast('先完成或关闭介绍，再管理会话。');return}
 const meta=x22sessionMeta(),active=meta.id===id,item=active?{title:x22sessionTitle(x22.messages[x22thread]||[],draft,meta.customTitle)}:(x22.archives[x22thread]||[]).find(a=>a.id===id);if(!item)return;
 const returnPage=current,close=()=>show(returnPage);
 const pane=x22dialog(deleting?'删除这段会话？':'重命名会话',deleting?'<p>删除后，这段聊天和草稿会从会话列表移除。</p>':'<input id="x22-session-name" aria-label="会话名称" maxlength="50" value="'+x22esc(item.title)+'">','<button class="x22-button" id="x22-session-cancel">取消</button><button class="x22-button primary" id="x22-session-confirm">'+(deleting?'删除':'保存')+'</button>');
 pane.querySelector('.x22-close').onclick=pane.querySelector('#x22-session-cancel').onclick=close;
 pane.querySelector('#x22-session-confirm').onclick=()=>{
  if(deleting){if(active){x22.messages[x22thread]=[];draft='';x22.sessions[x22thread]=null;storeDraft()}else x22.archives[x22thread]=(x22.archives[x22thread]||[]).filter(a=>a.id!==id)}
  else{const name=pane.querySelector('input').value.trim();if(!name){pane.querySelector('input').focus();return}if(active)meta.customTitle=name;else{item.customTitle=name;item.title=name}}
  x22save();close();
 };
}
function x22history(){
 if(pageGuide){toast('先完成或关闭介绍，再查看会话记录。');return}
 const list=x22.archives[x22thread]||[];
 const pane=x22dialog('会话记录','<p>也可以点击顶部的会话标签，切换当前数字员工或项目的旧聊天。</p><div class="x22-history-list"></div>','<button class="x22-button" id="x22-history-close">关闭</button>','x22-history-dialog');
 const close=()=>show(x22sessionPage());pane.querySelector('.x22-close').onclick=pane.querySelector('#x22-history-close').onclick=close;
 const host=pane.querySelector('.x22-history-list');if(!list.length)host.textContent='还没有旧会话，开始新会话后可以在这里找回。';
 for(const a of list){const button=document.createElement('button');button.className='x22-history-row';button.textContent=a.title||'未命名会话';const time=document.createElement('small');time.textContent=new Date(a.time).toLocaleString('zh-CN');button.append(time);button.onclick=()=>x22restoreSession(a.id);host.append(button)}
}
function x22chooseRemix(send){
 if(send&&!draft.trim()){toast('先写下要做的内容。');hotspots.querySelector('#x22-input')?.focus();return}
 if(pageGuide)finishPageGuide(true);
 if(send)x22sendExample();else hotspots.querySelector('#x22-input')?.focus({preventScroll:true});
}
function x22sendExample(){
 if(!draft.trim()){toast('先写下要做的内容。');return}
 const list=x22.messages.assistant||(x22.messages.assistant=[]);list.push({type:'user',text:draft},{type:'assistant',name:'开工助理 · 教学效果示例',text:'这是一张产品宣传图的效果示例。正式生成后，图片会回到这段对话；需要调整时，可以继续告诉我。此处未实时生成，不消耗积分。',image:'result'});draft='';storeDraft();
 show('case-result');
}
function x22resultPreview(){
 if(pageGuide)finishPageGuide(true);
 const shade=x22el('div','x22-shade');shade.style.zIndex=20;const pane=x22el('section','x22-result-dialog','<header>橙意 · 产品宣传图效果示例<button class="x22-close" aria-label="关闭效果大图">×</button></header><img src="assets/kaigong/fresh/result.png" alt="橙意产品宣传图效果示例"><p>教学效果示例 · 未实时生成</p>');
 const close=()=>{shade.remove();pane.remove()};pane.querySelector('button').onclick=close;shade.onclick=close;
}
const x22contextGroupFor=groupFor;groupFor=function(key){return ['case-preview','case-filled','case-result'].includes(key)?'remix':x22contextGroupFor(key)};
window.WxWelcomeV22={get state(){return JSON.parse(JSON.stringify(x22))},get members(){return x22members().map(a=>a.name)},get thread(){return x22thread}};
