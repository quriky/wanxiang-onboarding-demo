/* Explicit actions for the revised six-task offer. All account and connection effects are local demos. */
const x25Remix=x22remix;x22remix=function(){x25Remix();WxCampaign.record('remix')};
const x25Send=sendDemo;sendDemo=function(){const project=current==='project'&&!pageGuide&&draft.trim(),count=(x22.messages.project||[]).length;x25Send();if(project&&(x22.messages.project||[]).length>count)WxCampaign.record('project-reply')};
function x25WechatDialog(){
 if(pageGuide)finishPageGuide(false);
 const pane=x22dialog('关联微信（演示）','<p>正式使用时，在开工的微信关联页按提示扫码。关联后，可以在微信交代任务、查看进度和结果。</p><p>这里仅模拟关联完成，不访问微信账号。</p>','<button class="x22-button" id="x25-wechat-cancel">稍后再说</button><button class="x22-button primary" id="x25-wechat-confirm">确认模拟关联</button>','x25-wechat-dialog');
 const close=()=>show('phone');pane.querySelector('.x22-close').onclick=pane.querySelector('#x25-wechat-cancel').onclick=close;
 pane.querySelector('#x25-wechat-confirm').onclick=()=>{x22.phoneLinked=true;x22save();WxCampaign.record('phone-linked');show('phone');toast('微信关联演示已完成，未连接真实账号。')};
}
const x25Render=render;render=function(){
 x25Render();
 if(current==='project-create'){
  const button=hotspots.querySelector('#x22-project-submit'),create=button?.onclick;
  if(button)button.onclick=()=>{create();if(current==='project'&&x22.project)WxCampaign.record('project-created')};
 }
 if(current==='phone'){
  hotspots.querySelectorAll('.x24-wechat-sub,.x24-wechat-desc').forEach(e=>e.remove());
  const linked=x22.phoneLinked||WxCampaign.snapshot().completed.phone,card=x22el('section','x25-wechat-card',`<header><h3>微信</h3><span>${linked?'✓ 已完成关联演示':'尚未关联'}</span></header><small>微信说一句，工作接着做</small><p>在微信交代任务，让数字员工帮你处理，完成后在微信查看结果。</p><footer><span>演示不会连接真实微信</span><button class="x22-button primary" id="x25-wechat-link">${linked?'重新演示关联':'关联微信（演示）'}</button></footer>`);card.querySelector('button').onclick=x25WechatDialog;
 }
};
