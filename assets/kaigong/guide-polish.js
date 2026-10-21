/* Guide refinements: finish on an editable draft; every hiring/configuration transition has an actual click. */
pageGuides.market={name:'人才市场',finish:'employee-chat',steps:[
 {page:'market',title:'先挑一位适合这件事的数字员工',text:'按任务挑选数字员工，先看它擅长什么，再决定是否录用。这次用“高级开发工程师”作例子，点击它的卡片查看档案。',rect:[96,130,438,187],selector:'#x23-market-card',side:'right',cta:'查看这位数字员工 →',action:'profile'},
 {page:'employee',title:'先看能力，再看看做过的案例',text:'档案会介绍它能做什么、可以交付哪些成果。下面的作品也可以帮助你判断是否适合自己的任务。看完后，我们再找到录用入口。',rect:[225,324,1008,449],selector:'#x23-profile-content',side:'above',cta:'接着找到录用入口 →'},
 {page:'employee',title:'确定合适，就点这里的“录用”',text:'录用入口在档案右下角。点“录用”后才会进入工位安排，接下来还需要你确认。',rect:[1148,783,88,36],selector:'#x23-hire-entry',side:'above',cta:'点击录用 →',action:'hire'},
 {page:'hire',title:'选好工位，再确认录用',text:'独立工位用于一对一对话，加入项目用于团队协作。这里先用独立工位演示；看清聘用说明后，点击右下角“确认录用”。',rect:[421,500,624,297],selector:'#x23-hire-options',side:'above',cta:'确认录用 →',action:'confirmHire'},
 {page:'hired',title:'到岗后，就可以开始安排任务',text:'这位数字员工已经录用完成。点“去对话”，接下来我们会在对话列表里找到它，再安排第一件事。',rect:[920,709,124,47],selector:'#x23-hired-chat',side:'above',cta:'点击去对话 →',action:'hiredChat'},
 {page:'employee-chat',title:'这位就是刚录用的数字员工',text:'左侧的“高级开发工程师”就是刚才录用的数字员工。以后点这里就能和它聊；在下方输入任务目标和已有资料，让它开始干活。',rect:[92,190,210,72],selector:'[data-thread="dev"]',side:'right',cta:'开始安排任务'},
]};
pageGuides.skills={name:'能力提升',finish:'skills',steps:[
 {page:'skills',title:'让数字员工用上你常用的工具',text:'需要处理文档、消息或设计任务时，可以在这里接入对应应用。选好应用后，还要按提示完成配置与授权，数字员工才能使用它。',rect:[96,130,1352,150],selector:'#x23-skills-cards',side:'below',cta:'先找到配置入口 →'},
 {page:'skills',title:'卡片右上角的＋，就是配置入口',text:'这个加号不太显眼。我们用“万象画布”作例子，点它右上角的＋打开配置；卡片下方的“配置”按钮也能进入。',rect:[1053,150,34,34],selector:'#x23-skills-plus',side:'below',cta:'点击这个＋ →',action:'skillPlus'},
 {page:'skill-config',title:'按应用说明，补齐连接信息',text:'配置窗口会列出所需信息，例如服务地址和 Agent Token。按照应用的接入说明填写，先测试连接，确认后再保存。这里先认识入口和填写位置。',rect:[412,245,640,390],selector:'.x23-skill-dialog',side:'left',cta:'我知道了'},
]};
screens['skill-config']={title:'配置万象画布',image:screens.skills.image};
pageGuides.files={name:'资料库',finish:'knowledge',steps:[
 {page:'files',title:'数字员工做好的文件，到这里找',text:'这里是“对话产物”。在对话中生成的文档、图片等文件，可以在这里集中查找；也可以按左侧的项目或数字员工筛选。它们不会因此自动变成知识库里的参考资料。',rect:[94,12,1352,430],side:'below',cta:'再看看知识库 →'},
 {page:'files',title:'提供参考资料，点“知识库”',text:'刚才看的是数字员工做出的文件。如果你有产品介绍、品牌规范或工作资料，想让它参考，就点左侧的“知识库”。先切过去，再看看怎么提供资料。',rect:[220,109,123,35],selector:'#x23-knowledge-tab',side:'right',cta:'点击“知识库” →',action:'filesKnowledge'},
 {page:'knowledge',title:'来到知识库，再提供要参考的资料',text:'现在已经切到“知识库”。这里还没有添加参考资料，所以会显示这个提示。点“授权本地文档”，下一步选择你希望数字员工参考的文件或文件夹。',rect:[650,306,520,272],selector:'#x23-knowledge-intro',side:'left',cta:'点击授权 →',action:'filesAuthorize'},
 {page:'authorize',title:'按需要选文件，或选整个文件夹',text:'只用一份产品介绍，就选“选择文件”；有一整套相关资料，就选“选择文件夹”。原文件仍保留在本机。这里先认识入口；正式使用时，再选择自己希望数字员工参考的资料。',rect:[548,343,352,122],selector:'#x23-authorize-window',side:'right',cta:'我知道了'},
]};

// Use one generic term throughout the guide; keep names and literal UI labels recognizable.
function x23Term(text){
 if(typeof text!=='string')return text;
 const names=['数字员工','开工助理','口播剪辑助手','职场办公全能助手','订单对账助手'];
 let value=text;names.forEach((name,i)=>value=value.split(name).join('\uE000'+i+'\uE001'));
 value=value.replace(/智能体|数字人|助手|助理|员工/g,'数字员工');
 names.forEach((name,i)=>value=value.split('\uE000'+i+'\uE001').join(name));return value;
}
for(const group of Object.values(pageGuides))for(const step of group.steps)for(const key of ['title','text','cta'])if(step[key])step[key]=x23Term(step[key]);
pageGuides.chat.steps[0].title='先认识你的第一位数字员工';
pageGuides.chat.steps[0].text='左边这位“开工助理”，就是你的第一位数字员工。分析数据、整理资料、准备汇报，都可以先找它。接下来一起建项目、邀请数字员工，再走一遍做同款。';

function x23Focus(id,rect){const box=x22el('div','x23-focus-region');box.id=id;box.style.cssText=`left:${rect[0]}px;top:${rect[1]}px;width:${rect[2]}px;height:${rect[3]}px`;return box}
function x23Button(label,id,handler){const button=[...hotspots.querySelectorAll('button')].find(b=>b.getAttribute('aria-label')===label);if(button){if(id)button.id=id;button.onclick=handler}return button}
function x23MarketVisit(key,index){if(pageGuide==='market')x22baseGo(index);else show(key)}
function x23ConfirmHire(){
 if(!x22.employees.some(a=>a.id==='dev'))x22.employees.push({...x22pool.find(a=>a.id==='dev'),source:'market'});
 x22.activeEmployee='dev';x22save();WxCampaign.record('hired');x23MarketVisit('hired',4);
}
function x23OpenEmployee(){x22.activeEmployee='dev';x23MarketVisit('employee-chat',5)}
function x23SkillVisit(){if(pageGuide==='skills')x22baseGo(2);else show('skill-config')}
function x23FilesVisit(key,index){if(pageGuide==='files')x22baseGo(index);else show(key)}
function x23KnowledgeIntro(){
 const intro=x22el('section','x23-knowledge-intro','<div class="x23-knowledge-shield"><svg width="30" height="34" viewBox="0 0 30 34" fill="none" aria-hidden="true"><path d="M4 4h22v12c0 8-6 12-11 15C10 28 4 24 4 16V4Z" stroke="currentColor" stroke-width="2"/><path d="m9 16 4 4 8-9" stroke="currentColor" stroke-width="2"/></svg></div><h3>授权访问本地文档</h3><p>选择文件夹或单个文件，让数字员工参考已有资料。原文件保留在本机。</p><button id="x23-authorize-entry" class="x22-button primary">授权本地文档</button><small>所有项目和数字员工都可引用</small>');intro.id='x23-knowledge-intro';intro.querySelector('button').onclick=()=>x23FilesVisit('authorize',3);
}
function x23SkillDialog(){
 const pane=x22dialog('配置万象画布','<p>连接万象画布</p><label for="x23-service">服务地址</label><input id="x23-service" aria-label="服务地址" placeholder="填写应用提供的服务地址" autocomplete="off"><label for="x23-token">Agent Token</label><input id="x23-token" aria-label="Agent Token" placeholder="填写应用提供的密钥" type="password" autocomplete="off"><button class="x23-token-help">如何获取 Agent Token</button>','<button class="x22-button" id="x23-config-cancel">取消</button><button class="x22-button" id="x23-config-test">测试连接</button><button class="x22-button primary" id="x23-config-save">保存</button>','x23-skill-dialog');
 const close=()=>{if(pageGuide==='skills')finishPageGuide(true);else show('skills')};
 pane.querySelector('.x22-close').onclick=pane.querySelector('#x23-config-cancel').onclick=close;
 pane.querySelector('.x23-token-help').onclick=()=>toast('请按所选应用的接入说明获取 Agent Token。');
 pane.querySelector('#x23-config-test').onclick=()=>toast('这里只演示配置入口，不连接外部服务。');
 pane.querySelector('#x23-config-save').onclick=()=>{toast('已完成配置入口演示，未保存密钥或连接真实账号。');close()};
}
const x23Render=render;
render=function(){
 if(current==='skill-config'){current='skills';x23Render();current='skill-config';x23SkillDialog()}
 else x23Render();
 hotspots.classList.toggle('x23-employee-view',current==='employee-chat');
 if(current==='market'){
  x23Focus('x23-market-card',[96,130,438,187]);
  x23Button('查看高级开发工程师档案','x23-profile-entry',()=>x23MarketVisit('employee',1));
  x23Button('录用数字员工 1',null,()=>x23MarketVisit('employee',1));
 }
 if(['employee','employee-cases'].includes(current)){
  x23Focus('x23-profile-content',[225,324,1008,449]);
  x23Button('录用此数字员工','x23-hire-entry',()=>x23MarketVisit('hire',3));
  x23Button('顶部录用',null,()=>x23MarketVisit('hire',3));
 }
 if(current==='hire'){
  x23Focus('x23-hire-options',[421,500,624,297]);
  x23Button('确认录用（演示）','x23-hire-confirm',x23ConfirmHire);
 }
 if(current==='hired')x23Button('去对话','x23-hired-chat',x23OpenEmployee);
 if(current==='employee-chat')blankPatch('chat',1280,730,184,171);
 if(current==='skills'){
  x23Focus('x23-skills-cards',[96,130,1352,150]);
  x23Button('添加应用 3','x23-skills-plus',x23SkillVisit);
  x23Button('配置应用 3',null,x23SkillVisit);
 }
 if(['files','knowledge'].includes(current)){
  x23Button('知识库','x23-knowledge-tab',()=>x23FilesVisit('knowledge',2));
  x23Button('对话产物',null,()=>{if(pageGuide==='files')x22baseGo(0);else show('files')});
 }
 if(current==='files')x22el('span','x23-files-output','定时任务产出');
 if(current==='knowledge'){
  x23KnowledgeIntro();
  x23Button('顶部授权本地文档',null,()=>x23FilesVisit('authorize',3));
 }
 if(current==='authorize'){
  x23Focus('x23-authorize-window',[548,343,352,122]);
  const close=()=>{if(pageGuide==='files')x22baseGo(2);else show('knowledge')};
  x23Button('关闭授权窗口',null,close);x23Button('取消授权',null,close);
 }
 const hired=hotspots.querySelector('[data-thread="dev"]');
 if(hired){hired.querySelector('small').textContent='数字员工 · 开始一次对话';const avatar=hired.querySelector('.x22-avatar');avatar.classList.add('hired');avatar.textContent=''}
};
const x23Tour=renderPageGuide;
renderPageGuide=function(){
 x23Tour();if(!pageGuide)return;
 const s=pageGuides[pageGuide].steps[guideIndex],button=document.getElementById('page-guide-next');
 const actions={profile:'#x23-profile-entry',hire:'#x23-hire-entry',confirmHire:'#x23-hire-confirm',hiredChat:'#x23-hired-chat',skillPlus:'#x23-skills-plus',filesKnowledge:'#x23-knowledge-tab',filesAuthorize:'#x23-authorize-entry'};
 if(actions[s.action])button.onclick=()=>hotspots.querySelector(actions[s.action])?.click();
 if(['chat','remix'].includes(pageGuide)&&s.page==='case-filled'){
  button.textContent='我知道了';button.onclick=()=>finishPageGuide(true);
  document.querySelector('#hint-card .keyboard-help').innerHTML='<kbd>空格</kbd> 结束指引 · 发送请点输入框右下角的箭头';
 }
 positionPageGuide();
};
const x23Group=groupFor;groupFor=function(key){return key==='skill-config'?'skills':x23Group(key)};
