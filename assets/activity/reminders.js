(function(){
'use strict';
const C=window.WxCampaign;if(!C)return;
const d=document.createElement('dialog');d.id='wx-reminder-dialog';d.className='wx-reminder';d.setAttribute('aria-labelledby','wx-reminder-title');d.innerHTML='<button type="button" class="wx-close" aria-label="关闭活动提醒">×</button><span class="wx-notice-tag">新手任务提醒 · 演示</span><h2 id="wx-reminder-title"></h2><p id="wx-reminder-text"></p><small>仅演示站内提醒，不会发送微信、短信或联系客户。</small><footer><button type="button" class="wx-later">稍后再看</button><button type="button" class="wx-open">查看任务</button></footer>';document.body.append(d);
let timer,notice=null,lastDay=C.snapshot().currentDay,lastPaid=C.snapshot().purchased;
function blocked(){if(document.body.classList.contains('wx-task-active'))return true;if(document.querySelector('dialog[open]'))return true;const g=document.querySelector('#guide');if(g&&getComputedStyle(g).display!=='none')return true;if(window.pageOnboarding?.group)return true;return document.visibilityState==='hidden'}
function show(force=false){if(blocked())return false;notice=C.reminder();if(!force&&!C.snapshot().purchased&&/\/activity\.html$/.test(location.pathname))return false;if(!notice||(!force&&C.reminderSeen()))return false;d.querySelector('h2').textContent=notice.title;d.querySelector('p').textContent=notice.text;d.querySelector('.wx-open').textContent=notice.cta;C.ackReminder();d.showModal();document.dispatchEvent(new CustomEvent('wx-reminder-open'));return true}
function queue(){clearTimeout(timer);if(!C.reminderSeen())timer=setTimeout(()=>show(),1500)}
d.querySelector('.wx-close').onclick=d.querySelector('.wx-later').onclick=()=>d.close();d.querySelector('.wx-open').onclick=()=>{const stage=notice?.stage||1;d.close();if(/\/activity\.html$/.test(location.pathname)){window.WxActivity?.selectDay(stage);document.querySelector('#day-tabs')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}else location.href=C.decorateUrl('activity.html?day='+stage)};
document.addEventListener('click',e=>{if(!d.contains(e.target))queue()});document.addEventListener('close',e=>{if(e.target!==d)queue()},true);
addEventListener('wx-campaign-change',()=>{const s=C.snapshot();if(s.purchased!==lastPaid){lastPaid=s.purchased;lastDay=s.currentDay;if(s.purchased)C.ackReminder();return}if(s.currentDay!==lastDay){lastDay=s.currentDay;queue()}});
window.WxReminders={show,queue};queue();
})();
