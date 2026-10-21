(function(){
'use strict';const C=window.WxCampaign;if(!C)return;
function restart(){location.replace(C.decorateUrl('index.html?fresh=1'))}
addEventListener('wx-demo-reset',restart);if(C.resetting){restart();return}
let resetButton=document.getElementById('reset');
if(!/\/index\.html$/.test(location.pathname))resetButton=null;
if(resetButton){resetButton.textContent='全部重置演示';resetButton.setAttribute('aria-label','全部重置演示');resetButton.onclick=()=>C.resetAll();}
else{resetButton=document.createElement('button');resetButton.type='button';resetButton.id='demo-reset-all';resetButton.className='wx-reset-button';resetButton.textContent='全部重置';resetButton.title='清除订阅、礼包、充值、任务和教学记录，从头演示';resetButton.setAttribute('aria-label','全部重置演示');const header=document.querySelector('.suite-bar,.top');if(header){const replay=header.querySelector('#hint-entry');if(replay)header.insertBefore(resetButton,replay);else header.append(resetButton)}resetButton.onclick=()=>C.resetAll()}
const modal=document.createElement('dialog');modal.id='wx-wallet-dialog';modal.className='wx-reminder';modal.setAttribute('aria-labelledby','wx-wallet-title');modal.innerHTML='<button class="wx-close" type="button" aria-label="关闭积分账户">×</button><span class="wx-notice-tag">演示积分账户</span><h2 id="wx-wallet-title">我的积分</h2><strong id="wx-wallet-balance"></strong><div id="wx-wallet-breakdown"></div><small>充值和礼包积分均为模拟，不会发生真实付款。</small><footer><a class="wx-wallet-recharge" href="index.html?activityRoute=recharge">去充值积分 →</a><button class="wx-later" type="button">关闭</button></footer>';document.body.append(modal);modal.querySelector('.wx-close').onclick=modal.querySelector('.wx-later').onclick=()=>modal.close();
let live=null;const stage=document.getElementById('stage');if(stage){live=document.createElement('button');live.type='button';live.id='wx-live-wallet';live.setAttribute('aria-label','查看演示积分与充值');live.innerHTML='<strong></strong><span>模拟积分</span>';stage.append(live);live.onclick=()=>modal.showModal()}
function update(){const s=C.snapshot();if(live)live.querySelector('strong').textContent=s.balancePoints.toLocaleString();modal.querySelector('#wx-wallet-balance').textContent=s.balancePoints.toLocaleString()+' 积分';modal.querySelector('#wx-wallet-breakdown').textContent='充值积分 '+s.topupPoints.toLocaleString()+' · 礼包积分 '+s.basePoints+' · 任务积分 '+s.claimedPoints+(s.legacyPoints?' · 历史演示奖励 '+s.legacyPoints:'');}
addEventListener('wx-campaign-change',update);addEventListener('storage',e=>{if(e.key===C.key)update()});update();
})();
