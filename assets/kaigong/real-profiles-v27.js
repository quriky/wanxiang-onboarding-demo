/* Product-faithful employee profiles. Account operations remain local demos. */
let x27scroll={},x27placement='independent';
function x27avatar(a,size=72){
 const i=x26catalog.findIndex(e=>e.id===a.id),scale=size/48,x=112+(i%3)*452,y=144+Math.floor(i/3)*201;
 return '<span class="x27-avatar" role="img" aria-label="'+x22esc(a.name)+'头像" style="width:'+size+'px;height:'+size+'px;background-size:'+1464*scale+'px '+900*scale+'px;background-position:-'+x*scale+'px -'+y*scale+'px"></span>';
}
const x27badge='<span class="x27-verified" aria-label="已认证">✓</span>';
function x27close(){if(pageGuide==='market')finishPageGuide(false);else show('market')}
x26choose=function(id,page='employee'){
 x26selected=x26catalog.find(a=>a.id===id);if(!x26selected)return;
 x27placement='independent';x22.marketSelected=id;x22save();x23MarketVisit(page,page==='employee'?1:3);
};
function x27section([title,...parts]){
 return '<section class="x27-section">'+(title?'<h3>'+x22esc(title)+'</h3>':'')+parts.map(p=>{
  if(!Array.isArray(p))return '<p>'+x22esc(p)+'</p>';
  const labelled=Array.isArray(p[0]);return '<'+(labelled?'ul':'ol')+'>'+p.map(v=>'<li>'+(Array.isArray(v)?'<b>'+x22esc(v[0])+'：</b>'+x22esc(v[1]):x22esc(v))+'</li>').join('')+'</'+(labelled?'ul':'ol')+'>';
 }).join('')+'</section>';
}
function x27cases(a){const data=x27profiles[a.id];if(!data?.cases)return '';
 return '<section class="x27-portfolio"><div class="x27-portfolio-heading"><h3>我的作品 <small>'+data.cases.length+'</small></h3><span>从案例中，找到下一次合作的灵感</span></div><div class="x27-case-grid">'+data.cases.map(([title,desc,kind],i)=>'<button type="button" class="x27-case" data-profile-case="'+i+'" aria-label="查看'+x22esc(title)+'"><span class="x27-case-thumb" style="background-image:url('+data.image+');background-position:-'+[230,567,903][i]+'px -'+data.y+'px"></span><span class="x27-case-copy"><b>'+x22esc(title)+'</b><small>'+x22esc(desc)+'</small></span></button>').join('')+'</div></section>';
}
function x27remember(){const body=hotspots.querySelector('.x27-profile-body');if(body&&x26selected)x27scroll[x26selected.id]=body.scrollTop}
function x27toHire(){x27remember();x23MarketVisit('hire',3)}
function x27profile(){
 const a=x26selected,data=x27profiles[a.id],hired=x22.employees.some(e=>e.id===a.id);
 x22el('div','x22-shade');
 const pane=x22el('section','x27-profile','<header class="x27-profile-header"><span>员工档案</span><button type="button" class="x27-close" aria-label="关闭员工档案">×</button></header><div class="x27-profile-body"><div class="x27-profile-hero"><div class="x27-person">'+x27avatar(a)+'<div><h2>'+x22esc(a.name)+' '+x27badge+'</h2><p>'+x22esc(a.role)+'</p><div class="x27-tags"><span>'+x22esc(a.category)+'</span><span>♧ 服务 <b>'+x22esc(a.service)+'</b> 人</span></div></div></div>'+(!hired?'<aside class="x27-price"><strong>免费</strong><small>当前聘用费用</small><button class="x27-primary" data-profile-hire>录用　→</button><p>专业就绪，随时到岗</p></aside>':'')+'</div><div id="x23-profile-content">'+(data?data.sections.map(x27section).join(''):'<section class="x27-section"><h3>我能帮你做什么</h3><p>'+x22esc(a.role)+'</p></section>')+x27cases(a)+'</div></div><footer class="x27-profile-footer"><span>让每一份专业，都有施展的空间。</span><div>'+(hired?'<button class="x27-secondary" id="x27-update-employee">更新员工</button>':'')+'<button class="x27-primary" id="x23-hire-entry">'+(hired?'去对话':'录用　→')+'</button></div></footer>');
 pane.setAttribute('role','dialog');pane.setAttribute('aria-label',a.name+'员工档案');
 pane.querySelector('.x27-close').onclick=x27close;
 const open=()=>{x27remember();if(hired){const employee=x22.employees.find(e=>e.id===a.id);if(employee?.source==='market')WxCampaign.record('hired',a.id);x23OpenEmployee()}else x27toHire()};
 pane.querySelector('#x23-hire-entry').onclick=open;pane.querySelector('[data-profile-hire]')?.addEventListener('click',open);
 pane.querySelector('#x27-update-employee')?.addEventListener('click',()=>{const employee=x22.employees.find(e=>e.id===a.id);if(employee){employee.role=a.role;x22save();toast('这位数字员工的资料已在本地更新。')}});
 pane.querySelectorAll('[data-profile-case]').forEach(b=>b.onclick=()=>x27preview(a,Number(b.dataset.profileCase),b));
 const body=pane.querySelector('.x27-profile-body');body.scrollTop=x27scroll[a.id]||0;body.addEventListener('scroll',()=>{x27scroll[a.id]=body.scrollTop},{passive:true});return pane;
}
function x27preview(a,index,trigger){
 const data=x27profiles[a.id],item=data.cases[index],scale=2.5;
 const shade=x22el('div','x27-preview-shade'),pane=x22el('section','x27-case-preview','<header><h3>'+x22esc(item[0])+'</h3><button class="x27-close" aria-label="关闭作品预览">×</button></header><div class="x27-case-large" style="background-image:url('+data.image+');background-size:'+1464*scale+'px '+900*scale+'px;background-position:-'+[230,567,903][index]*scale+'px -'+data.y*scale+'px"></div><p>'+x22esc(item[1])+'</p><small>'+(item[2]==='video'?'视频案例封面':'作品案例预览')+'</small>');
 pane.setAttribute('role','dialog');pane.setAttribute('aria-label','作品预览');const close=()=>{pane.remove();shade.remove();document.removeEventListener('keydown',key,true);trigger.focus({preventScroll:true})},key=e=>{if(e.key==='Escape'){e.stopImmediatePropagation();close()}};
 pane.querySelector('button').onclick=shade.onclick=close;document.addEventListener('keydown',key,true);pane.querySelector('button').focus({preventScroll:true});
}
function x27letter(success){
 const a=x26selected; x22el('div','x27-letter-shade');
 const title=success?'入职确认书':'录用意向书';
 const pane=x22el('section','x27-letter '+(success?'x27-letter-success':''),'<header class="x27-letter-art" aria-label="'+(success?'好搭档，已就位。':'向下一位搭档，发出邀请。')+'"><button class="x27-close" aria-label="关闭'+title+'">×</button></header><div class="x27-letter-body"><h3>'+title+'</h3><div class="x27-letter-person">'+x27avatar(a,54)+'<div><small>致我们的新搭档</small><h2>'+x22esc(a.name)+' '+x27badge+'</h2></div>'+(success?'<span class="x27-arrived">✓ 已到岗</span>':'')+'</div>'+(success?'<p><b>'+x22esc(a.name)+'</b> 已加入 '+(x27placement==='project'?x22esc(x22.project?.name):'独立工位 · 一对一对话')+'。</p><ul class="x27-ready-list"><li>专业能力已就绪</li><li>协作工位已安排</li><li>现在就可以开始协作</li></ul>':'<p>我们期待与你并肩工作，发挥你在 <b>'+x22esc(a.category)+'</b> 领域的专长。欢迎加入，把每一个好想法，变成看得见的成果。</p><div class="x27-letter-rates"><div><span>聘用费用</span><b>免费</b></div><div><span>到岗时间</span><strong>确认录用，即刻到岗</strong></div></div><div id="x23-hire-options"><h4>安排入职岗位 <small>选择你们开始合作的地方</small></h4><div class="x27-placement"><button aria-pressed="'+(x27placement==='independent')+'" data-placement="independent"><b>♧　独立工位</b><small>一对一对话，随时协作</small></button><button aria-pressed="'+(x27placement==='project')+'" data-placement="project" '+(!x22.project?'disabled':'')+'><b>▣　加入项目</b><small>'+(x22.project?x22esc(x22.project.name):'先创建项目，再邀请协作')+'</small></button></div></div>')+'</div><footer><span>● '+(success?'期待与你的第一次合作':'无需付费 · 随时开始协作')+'</span><button class="x27-primary" id="'+(success?'x23-hired-chat':'x23-hire-confirm')+'">'+(success?'去对话':'确认录用')+'　→</button></footer>');
 pane.setAttribute('role','dialog');pane.setAttribute('aria-label',title);
 pane.querySelector('.x27-close').onclick=()=>x23MarketVisit('employee',1);
 pane.querySelectorAll('[data-placement]').forEach(b=>b.onclick=()=>{x27placement=b.dataset.placement;pane.querySelectorAll('[data-placement]').forEach(e=>e.setAttribute('aria-pressed',String(e===b)))});
 pane.querySelector('#'+(success?'x23-hired-chat':'x23-hire-confirm')).onclick=success?x23OpenEmployee:()=>{
  if(x27placement==='project'&&x22.project&&!x22.project.members.includes(a.id))x22.project.members.push(a.id);
  x23ConfirmHire();
 };
}
x26dialog=function(){
 if(!x26selected){show('market');return}
 x27profile();if(['hire','hired'].includes(current))x27letter(current==='hired');
};
function x27replaceAvatar(el,a){if(!el||!a)return;const shell=document.createElement('span');shell.innerHTML=x27avatar(a,Number.parseFloat(getComputedStyle(el).width)||32);el.replaceWith(shell.firstChild)}
const x27render=render;render=function(){
 x27render();hotspots.querySelectorAll('.x22-thread[data-thread]').forEach(row=>{const a=x26catalog.find(a=>a.id===row.dataset.thread);if(a)x27replaceAvatar(row.querySelector('.x22-avatar'),a)});
 if(['employee-chat','agent-created'].includes(current)){
  const a=x26catalog.find(a=>a.id===x22.activeEmployee);if(a){x27replaceAvatar(hotspots.querySelector('.x22-top-identity .x22-avatar'),a);x27replaceAvatar(hotspots.querySelector('.x26-welcome .x26-avatar'),a)}
 }
};
