(()=>{
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const drawer=$('[data-mobile-drawer]'), menu=$('[data-menu-toggle]');
  const setDrawer=open=>{if(!drawer||!menu)return;drawer.hidden=!open;menu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)};
  if(menu){menu.addEventListener('click',()=>setDrawer(drawer.hidden));$$('a',drawer).forEach(a=>a.addEventListener('click',()=>setDrawer(false)))}

  const backdrop=$('[data-command-backdrop]'); let lastFocus=null;
  const openCommand=()=>{if(!backdrop)return;lastFocus=document.activeElement;backdrop.hidden=false;document.body.classList.add('command-open');$('[data-command-close]',backdrop)?.focus()};
  const closeCommand=()=>{if(!backdrop)return;backdrop.hidden=true;document.body.classList.remove('command-open');lastFocus?.focus?.()};
  backdrop?.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusable=$$('a[href],button:not([disabled])',backdrop).filter(x=>!x.hidden);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
  $$('[data-command-open]').forEach(b=>b.addEventListener('click',openCommand));$('[data-command-close]')?.addEventListener('click',closeCommand);backdrop?.addEventListener('click',e=>{if(e.target===backdrop)closeCommand()});
  addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand()}if(e.key==='Escape'){closeCommand();setDrawer(false)}});

  const routeData={quality:{label:'quality tier',reason:'quality floor 0.91'},balanced:{label:'balanced tier',reason:'latency ceiling 450 ms'},economy:{label:'economy tier',reason:'budget pressure high'}};
  const selectRoute=key=>{const data=routeData[key];if(!data)return;$$('[data-route-choice]').forEach(b=>{const active=b.dataset.routeChoice===key;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});$$('[data-route-path]').forEach(p=>p.classList.toggle('is-route-active',p.dataset.routePath===key));$$('[data-route-label]').forEach(el=>el.textContent=data.label);$$('[data-route-reason]').forEach(el=>el.textContent=data.reason)};
  $$('[data-route-choice]').forEach(b=>b.addEventListener('click',()=>selectRoute(b.dataset.routeChoice)));

  const mapMeta=$('[data-map-metadata]');$$('[data-node-meta]').forEach(node=>{const show=()=>{if(mapMeta)mapMeta.textContent=node.dataset.nodeMeta};node.addEventListener('mouseenter',show);node.addEventListener('focus',show)});

  const traceGroup=$('[data-trace-filter-group]');if(traceGroup){$$('[data-trace-filter]',traceGroup).forEach(b=>b.addEventListener('click',()=>{const kind=b.dataset.traceFilter;$$('[data-trace-filter]',traceGroup).forEach(x=>{const active=x===b;x.classList.toggle('is-active',active);x.setAttribute('aria-pressed',String(active))});$$('[data-trace-kind]').forEach(row=>row.hidden=kind!=='all'&&row.dataset.traceKind!==kind)}))}

  $$('[data-policy-env]').forEach(b=>b.addEventListener('click',()=>{const env=b.dataset.policyEnv;$$('[data-policy-env]').forEach(x=>{const active=x===b;x.classList.toggle('is-active',active);x.setAttribute('aria-pressed',String(active))});$$('[data-policy-matrix] b').forEach(cell=>cell.textContent=cell.dataset[env]);$$('[data-policy-env-label]').forEach(x=>x.textContent=env)}));

  $$('[data-code-tab]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.codeTab;$$('[data-code-tab]').forEach(x=>{const active=x===b;x.classList.toggle('is-active',active);x.setAttribute('aria-selected',String(active))});$$('[data-code-panel]').forEach(p=>p.hidden=p.dataset.codePanel!==key)}));

  const form=$('[data-access-form]');if(form){form.addEventListener('submit',e=>{e.preventDefault();const result=$('[data-form-result]',form);if(!form.checkValidity()){form.reportValidity();if(result){result.hidden=false;result.textContent='Check the required fields before recording this request.';result.focus()}return}const data=Object.fromEntries(new FormData(form).entries());data.recordedAt=new Date().toISOString();try{localStorage.setItem('aurora-access-request',JSON.stringify(data));if(result){result.hidden=false;result.textContent='Recorded locally in this browser. No network submission was made.';result.focus()}}catch(_){if(result){result.hidden=false;result.textContent='The form is valid, but browser storage is unavailable. Nothing was transmitted.';result.focus()}}})}
})();
