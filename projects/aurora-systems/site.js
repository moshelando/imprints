(() => {
  const header=document.querySelector('.site-header');
  const setHeader=()=>header&&header.classList.toggle('is-scrolled',scrollY>12); setHeader(); addEventListener('scroll',setHeader,{passive:true});
  const btn=document.querySelector('[data-menu-button]'), nav=document.querySelector('[data-mobile-nav]');
  const close=()=>{if(!nav||!btn)return;nav.classList.remove('open');btn.setAttribute('aria-expanded','false')};
  if(btn&&nav)btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))});
  if(nav)nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close)); addEventListener('keydown',e=>e.key==='Escape'&&close());
  document.querySelectorAll('[data-accordion]').forEach(item=>{const q=item.querySelector('button');if(!q)return;q.setAttribute('aria-expanded',item.classList.contains('open')?'true':'false');q.addEventListener('click',()=>{const open=item.classList.toggle('open');q.setAttribute('aria-expanded',String(open))})});
  document.querySelectorAll('form[data-interactive-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-form-status]');if(status){status.textContent=form.dataset.success||'Thanks — your request has been recorded.';status.hidden=false;status.tabIndex=-1;status.focus()}try{const entries=Object.fromEntries(new FormData(form).entries());localStorage.setItem('mosaic-form:'+location.pathname+':'+Date.now(),JSON.stringify({submittedAt:new Date().toISOString(),fields:entries}))}catch(_){}form.classList.add('is-complete')}));

  const css=document.createElement('link');css.rel='stylesheet';css.href='consent.css';document.head.append(css);
  const key='aurora-consent-v1';
  const apply=value=>{document.documentElement.dataset.analytics=value==='analytics'?'on':'off'};
  const store=value=>{try{localStorage.setItem(key,value)}catch(_){}apply(value)};
  const report=value=>{const status=document.querySelector('[data-consent-status]');if(status){status.textContent=value==='analytics'?'Analytics are allowed in this browser.':'Only essential storage is enabled in this browser.';status.hidden=false}};
  const save=value=>{store(value);document.querySelector('[data-aurora-consent]')?.remove();report(value)};
  const show=()=>{document.querySelector('[data-aurora-consent]')?.remove();const el=document.createElement('aside');el.className='aurora-consent';el.dataset.auroraConsent='';el.setAttribute('aria-label','Privacy choices');el.innerHTML='<div class="consent-status"><i></i><span>PRIVACY CONTROL</span></div><h2>Keep the signal useful.</h2><p>Essential storage keeps the site working. Optional analytics help us understand product interest.</p><div class="consent-actions"><button data-choice="essential">Essential only</button><button class="allow" data-choice="analytics">Allow analytics</button></div><a class="consent-more" href="privacy.html#cookie-settings">Review settings →</a>';document.body.append(el);el.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>save(b.dataset.choice)))};
  document.querySelectorAll('[data-consent-choice]').forEach(b=>b.addEventListener('click',()=>save(b.dataset.consentChoice)));
  let choice=null;try{choice=localStorage.getItem(key)}catch(_){} if(choice){apply(choice);report(choice)}else setTimeout(show,450);
})();
