(function(){
'use strict';
const C=window.WxCampaign;if(!C)return;
const inApp=!!window.replica;
if(inApp){
 const originalAvatar=x22avatar;x22avatar=a=>typeof x27avatar==='function'&&x26catalog.some(e=>e.id===a.id)?x27avatar(a,32):originalAvatar(a);
 const home=document.getElementById('back-portal');if(home){home.textContent='← 开工首页';home.href='kaigong.html';home.onclick=e=>{e.preventDefault();window.WxTaskJourney?.clear();if(pageGuide)pageOnboarding.finish(false);show('chat')}}
 const wallet=document.getElementById('wx-wallet-dialog'),entry=wallet?.querySelector('.wx-wallet-recharge');
 const recharge=document.createElement('dialog');recharge.id='x28-recharge';recharge.className='wx-reminder x28-recharge';recharge.setAttribute('aria-label','积分充值');document.body.append(recharge);
 function shell(body){recharge.innerHTML='<button class="wx-close" type="button" aria-label="关闭充值">×</button>'+body;recharge.querySelector('.wx-close').onclick=()=>recharge.close()}
 function amountForm(){
  shell('<span class="wx-notice-tag">万象开工</span><h2>积分充值</h2><p>¥1 = 100积分 · 10元起，仅支持整数</p><div class="x28-amounts">'+[10,30,50,100,200].map(n=>'<button type="button" data-topup-amount="'+n+'">¥'+n+'<small>'+Number(n*100).toLocaleString()+'积分</small></button>').join('')+'</div><label for="x28-amount">充值金额（元）</label><input id="x28-amount" type="number" min="10" max="1000000" step="1" value="10" inputmode="numeric"><p class="x28-amount-error" id="x28-amount-error" role="status"></p><p>预计到账 <strong id="x28-estimate">1,000积分</strong></p><small>仅模拟充值到账，不会扣款或发起真实支付。</small><footer><button type="button" class="wx-later" id="x28-gift">查看9.9元礼包</button><button type="button" class="wx-wallet-recharge" id="x28-review">下一步</button></footer>');
  const input=recharge.querySelector('#x28-amount'),error=recharge.querySelector('#x28-amount-error');
  const valid=()=>{const n=input.value===''?NaN:Number(input.value);return Number.isInteger(n)&&n>=10&&n<=1000000?n:null};
  const preview=()=>{const n=valid();error.textContent=n===null?'请输入10至1,000,000元之间的整数金额。':'';recharge.querySelector('#x28-estimate').textContent=n===null?'—':(n*100).toLocaleString()+'积分';recharge.querySelectorAll('[data-topup-amount]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.topupAmount)===n)))};
  input.oninput=preview;recharge.querySelectorAll('[data-topup-amount]').forEach(b=>b.onclick=()=>{input.value=b.dataset.topupAmount;preview()});preview();
  recharge.querySelector('#x28-gift').onclick=()=>{recharge.close();window.WxStarterTasks?.open()};
  recharge.querySelector('#x28-review').onclick=()=>{const n=valid();if(n===null){preview();input.focus();return}review(n)};
 }
 function review(amount){
  const id='kaigong-topup-'+Date.now()+'-'+Math.random().toString(36).slice(2);let committed=false;
  shell('<span class="wx-notice-tag">确认模拟充值</span><h2>核对充值金额</h2><div class="x28-review"><span>本次金额</span><strong>¥'+amount.toLocaleString()+'</strong><span>预计到账</span><strong>'+(amount*100).toLocaleString()+'积分</strong></div><p>确认后增加演示积分，不发生真实付款。</p><footer><button class="wx-later" type="button" id="x28-edit">返回修改</button><button class="wx-wallet-recharge" type="button" id="x28-confirm">确认模拟充值</button></footer>');
  recharge.querySelector('#x28-edit').onclick=amountForm;
  recharge.querySelector('#x28-confirm').onclick=e=>{if(committed)return;committed=true;e.currentTarget.disabled=true;const r=C.recharge(amount,id);if(!r.ok){committed=false;e.currentTarget.disabled=false;return}
   shell('<span class="wx-notice-tag">模拟充值成功</span><h2>积分已到账</h2><strong class="x28-recharge-result">+'+(amount*100).toLocaleString()+'积分</strong><p>当前余额：'+C.snapshot().balancePoints.toLocaleString()+'积分</p><small>本次未发生真实付款。</small><footer><button class="wx-wallet-recharge" type="button" id="x28-done">完成</button></footer>');recharge.querySelector('#x28-done').onclick=()=>recharge.close();
  };
 }
 if(entry)entry.onclick=e=>{e.preventDefault();wallet.close();amountForm();recharge.showModal()};
 const url=new URL(location.href);if(url.searchParams.get('starter')==='1'){
  url.searchParams.delete('starter');window.history.replaceState(null,'',url.pathname+url.search+url.hash);
  window.WxStarterTasks?.open();document.querySelector('[data-starter-group="organize"]>summary')?.click();
 }
}
if(window.portalDemo){
 const header=document.querySelector('.demo-label');if(header){header.innerHTML='<a class="x28-return" id="x28-return-kaigong" href="kaigong.html?starter=1">← 返回万象开工</a><span class="x28-case-note">案例暂在百应查看</span>'}
 function returnLink(){const a=document.getElementById('wx-task-return');if(a&&window.WxTaskRequest==='case'){a.href='kaigong.html?starter=1';a.textContent=C.snapshot().completed.case?'返回开工领积分':'返回开工'}}
 returnLink();addEventListener('wx-campaign-change',returnLink);
}
})();
