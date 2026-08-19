(() => {
  const body=document.body;
  const here=location.pathname.split('/').pop()||'index.html'; document.querySelectorAll('nav a[href]').forEach(a=>{if(a.getAttribute('href').split('?')[0]===here)a.setAttribute('aria-current','page');});
  const setScroll=()=>body.classList.toggle('is-scrolled',window.scrollY>12); setScroll(); addEventListener('scroll',setScroll,{passive:true});
  const menuBtn=document.querySelector('[data-menu]'), drawer=document.querySelector('[data-drawer]');
  const closeMenu=()=>{if(!menuBtn||!drawer)return;drawer.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');body.style.overflow=''};
  if(menuBtn&&drawer){menuBtn.addEventListener('click',()=>{const open=!drawer.classList.contains('open');drawer.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',String(open));body.style.overflow=open?'hidden':'';}); drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
  addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeArticle();}});

  const phone=document.querySelector('[data-phone]');
  const phoneStates={
    today:{title:'Safe to spend',money:'$684',sub:'after bills + goals',kind:'mint',cardTitle:'You’re on track',cardText:'Dining is a little high, but Friday’s bills are already covered.'},
    change:{title:'What changed',money:'+$186',sub:'dining vs. your usual range',kind:'peach',cardTitle:'One thing to notice',cardText:'Three dinners out explain most of the change. Your monthly plan still works.'},
    goals:{title:'Travel goal',money:'72%',sub:'$1,440 of $2,000',kind:'mint',cardTitle:'Next easy move',cardText:'You can move $180 after Friday’s recurring payments clear.'}
  };
  function renderPhone(key){if(!phone)return;const s=phoneStates[key];phone.querySelector('[data-phone-title]').textContent=s.title;phone.querySelector('[data-phone-money]').textContent=s.money;phone.querySelector('[data-phone-sub]').textContent=s.sub;const card=phone.querySelector('[data-phone-card]');card.className='app-card '+s.kind;card.querySelector('strong').textContent=s.cardTitle;card.querySelector('span').textContent=s.cardText;document.querySelectorAll('[data-phone-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.phoneTab===key)));}
  document.querySelectorAll('[data-phone-tab]').forEach(b=>b.addEventListener('click',()=>renderPhone(b.dataset.phoneTab)));

  const slider=document.querySelector('[data-spend-slider]');
  if(slider){const out=document.querySelector('[data-safe-out]'), flex=document.querySelector('[data-flex-out]'), goals=document.querySelector('[data-goal-out]'); const sync=()=>{const income=Number(slider.value);const bills=2140, goal=Math.round(income*.12), safe=Math.max(0,income-bills-goal);out.textContent='$'+safe.toLocaleString();flex.textContent='$'+Math.max(0,income-bills).toLocaleString();goals.textContent='$'+goal.toLocaleString();};slider.addEventListener('input',sync);sync();}

  const toggle=document.querySelector('[data-billing-toggle]');
  if(toggle){toggle.addEventListener('click',()=>{const yearly=toggle.getAttribute('aria-checked')!=='true';toggle.setAttribute('aria-checked',String(yearly));document.querySelectorAll('[data-price]').forEach(el=>el.textContent=yearly?el.dataset.yearly:el.dataset.monthly);document.querySelector('[data-billing-label]').textContent=yearly?'Billed yearly':'Billed monthly';});}

  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const group=btn.closest('[data-filter-group]');group.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');const v=btn.dataset.filter;document.querySelectorAll('[data-article]').forEach(a=>a.hidden=v!=='all'&&a.dataset.article!==v);}));

  const reader=document.querySelector('[data-reader]');
  function closeArticle(){if(!reader)return;reader.classList.remove('open');body.style.overflow='';}
  const articles={
    'safe-spend':['What “safe to spend” actually means','Safe to spend starts with what has already been promised: upcoming bills, the goal transfers you chose, and known recurring costs. What remains is flexible money. It is a planning number, not permission from an app.','The useful part is that the number can move as life moves. If a bill changes or a goal is adjusted, the plan changes with it.'],
    'subscriptions':['A calmer way to review subscriptions','A subscription review works better when it starts with frequency and use, not guilt. Group recurring charges by monthly impact, then ask which ones still earn their place.','Pennywise surfaces the recurring pattern so you can make the decision yourself.'],
    'irregular':['Budgeting for months that are not normal','A good money plan expects irregular expenses. Car repairs, annual renewals, gifts, and travel do not become surprises simply because they are not monthly.','Create room for them before they arrive, and judge a month against the plan you actually meant to live.'],
    'categories':['Why categories are only the beginning','Categories can tell you where money went. They rarely explain why this month feels different.','Change detection compares the current pattern with your own recent baseline so the meaningful movement is easier to see.'],
    'goals':['Goals without pretending every month is identical','A goal should bend before it breaks. Fixed transfers can be useful, but real life sometimes needs a different pace.','Pennywise lets the goal stay visible while the contribution changes.'],
  };
  document.querySelectorAll('[data-read]').forEach(btn=>btn.addEventListener('click',()=>{if(!reader)return;const data=articles[btn.dataset.read];reader.querySelector('h2').textContent=data[0];reader.querySelector('.body').innerHTML='<p>'+data[1]+'</p><p>'+data[2]+'</p>';reader.classList.add('open');body.style.overflow='hidden';reader.querySelector('[data-close-reader]').focus();}));
  document.querySelector('[data-close-reader]')?.addEventListener('click',closeArticle);reader?.addEventListener('click',e=>{if(e.target===reader)closeArticle();});

  const form=document.querySelector('[data-onboarding]');
  if(form){const qp=new URLSearchParams(location.search).get('plan'); if(qp){const pick=form.querySelector('input[name="plan"][value="'+qp+'"]'); if(pick)pick.checked=true;} let step=0;const panels=[...form.querySelectorAll('[data-step]')], bars=[...document.querySelectorAll('[data-step-bar]')];const show=n=>{step=Math.max(0,Math.min(n,panels.length-1));panels.forEach((p,i)=>p.hidden=i!==step);bars.forEach((b,i)=>b.classList.toggle('active',i<=step));};show(0);form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{const panel=panels[step];const req=[...panel.querySelectorAll('input[required],select[required]')];if(req.some(x=>!x.checkValidity())){req.find(x=>!x.checkValidity())?.reportValidity();return;}show(step+1);}));form.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(step-1)));form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-status]');status.hidden=false;status.textContent='Your setup choices are saved in this browser. No account was created and nothing was sent.';try{localStorage.setItem('pennywise-onboarding',JSON.stringify(Object.fromEntries(new FormData(form).entries())));}catch(_){}status.tabIndex=-1;status.focus();});}

  const consentKey='pennywise-consent-v2'; const footerSettings=document.querySelector('[data-cookie-settings]');
  const removeConsent=()=>document.querySelector('[data-cookie]')?.remove();
  const saveConsent=v=>{try{localStorage.setItem(consentKey,v)}catch(_){}document.documentElement.dataset.analytics=v==='analytics'?'on':'off';removeConsent();};
  const showConsent=()=>{removeConsent();const el=document.createElement('aside');el.className='cookie';el.dataset.cookie='';el.setAttribute('aria-label','Privacy choices');el.innerHTML='<div><strong>Your browsing should be private, too.</strong><p>Essential storage keeps preferences working. Optional analytics can be allowed separately.</p></div><div class="cookie-actions"><button class="essential" type="button" data-consent="essential">Essential only</button><button class="analytics" type="button" data-consent="analytics">Allow analytics</button></div>';document.body.append(el);el.querySelectorAll('[data-consent]').forEach(b=>b.addEventListener('click',()=>saveConsent(b.dataset.consent)));};
  footerSettings?.addEventListener('click',showConsent);let stored=null;try{stored=localStorage.getItem(consentKey)}catch(_){}if(stored)document.documentElement.dataset.analytics=stored==='analytics'?'on':'off';else setTimeout(showConsent,350);
})();