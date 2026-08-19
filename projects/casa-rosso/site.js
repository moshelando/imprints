(()=>{
  const toggle=document.querySelector('[data-menu-toggle]');
  const mobile=document.querySelector('[data-mobile-menu]');
  const closeMenu=()=>{if(!toggle||!mobile)return;mobile.classList.remove('open');toggle.setAttribute('aria-expanded','false')};
  if(toggle&&mobile){toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));}
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

  const shots=[...document.querySelectorAll('[data-crossfade] img')];
  if(shots.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){let i=0;setInterval(()=>{shots[i].classList.remove('active');i=(i+1)%shots.length;shots[i].classList.add('active')},6500)}

  const tabs=[...document.querySelectorAll('[role="tab"][data-menu-tab]')];
  const panels=[...document.querySelectorAll('[role="tabpanel"][data-menu-panel]')];
  function activate(name){tabs.forEach(t=>{const on=t.dataset.menuTab===name;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1});panels.forEach(p=>p.classList.toggle('active',p.dataset.menuPanel===name));}
  tabs.forEach((t,idx)=>{t.addEventListener('click',()=>activate(t.dataset.menuTab));t.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const n=e.key==='ArrowRight'?(idx+1)%tabs.length:(idx-1+tabs.length)%tabs.length;tabs[n].focus();activate(tabs[n].dataset.menuTab)})});

  document.querySelectorAll('form[data-local-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-form-status]');const payload=Object.fromEntries(new FormData(form).entries());try{localStorage.setItem('casa-rosso:'+form.id,JSON.stringify({savedAt:new Date().toISOString(),fields:payload}))}catch(_){}if(status){status.hidden=false;status.textContent=form.dataset.success;status.tabIndex=-1;status.focus()}}));
})();