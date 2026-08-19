(() => {
  const menuBtn = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');
  const menuClose = document.querySelector('[data-menu-close]');
  const closeMenu = () => { if (!menu || !menuBtn) return; menu.hidden = true; menuBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
  const openMenu = () => { if (!menu || !menuBtn) return; menu.hidden = false; menuBtn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; menu.querySelector('a,button')?.focus(); };
  menuBtn?.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu());
  menuClose?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const mapData = {
    brooks:{title:'Brooks Range Traverse', body:'8 days · tundra foot travel · moving camp · highest exposure', href:'trip.html'},
    yukon:{title:'Yukon River by Canoe', body:'6 days · moving river camp · cold-water systems · intermediate', href:'expeditions.html#yukon'},
    wrangell:{title:'Wrangell Basecamp', body:'7 days · fixed backcountry camp · glacier-country day routes', href:'expeditions.html#wrangell'}
  };
  const detail = document.querySelector('[data-map-detail]');
  document.querySelectorAll('[data-map-marker]').forEach(btn => btn.addEventListener('click', () => {
    const key=btn.dataset.mapMarker, data=mapData[key]; if(!data||!detail) return;
    document.querySelectorAll('[data-map-marker]').forEach(b=>b.setAttribute('aria-expanded',String(b===btn)));
    detail.innerHTML=`<span class="coordinate">ROUTE ${btn.querySelector('span')?.textContent || ''}</span><strong>${data.title}</strong><p>${data.body}</p><p><a href="${data.href}">Open route details</a></p>`;
  }));

  const hero=document.querySelector('.map-hero');
  const stages=document.querySelectorAll('[data-route-stage]');
  if(hero && stages.length && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting) hero.classList.toggle('route-active', Number(entry.target.dataset.routeStage)>=2);});},{threshold:.25});
    stages.forEach(s=>observer.observe(s));
  }

  const conditionData={
    june:[['DAY','4–16°C','planning range'],['NIGHT','-2–6°C','planning range'],['LIGHT','20+ hr','usable daylight'],['GROUND','WET / SOFT','snowmelt common']],
    july:[['DAY','7–19°C','planning range'],['NIGHT','1–9°C','planning range'],['LIGHT','18–20 hr','usable daylight'],['INSECTS','HIGH','headnet window']],
    august:[['DAY','3–15°C','planning range'],['NIGHT','-4–6°C','planning range'],['LIGHT','14–17 hr','usable daylight'],['WEATHER','FASTER','autumn shifts']]
  };
  const panel=document.querySelector('[data-condition-panel]');
  document.querySelectorAll('[data-condition]').forEach(btn=>btn.addEventListener('click',()=>{
    const rows=conditionData[btn.dataset.condition]; if(!rows||!panel)return;
    document.querySelectorAll('[data-condition]').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
    panel.innerHTML=rows.map(r=>`<div><b>${r[0]}</b><strong>${r[1]}</strong><span>${r[2]}</span></div>`).join('');
  }));

  const checklist=document.querySelector('[data-checklist]');
  if(checklist){
    const boxes=[...checklist.querySelectorAll('input[type="checkbox"]')], count=document.querySelector('[data-check-count]'), meter=document.querySelector('[data-check-meter]');
    try{const saved=JSON.parse(localStorage.getItem('wildnorth-readiness')||'[]');boxes.forEach(b=>b.checked=saved.includes(b.value));}catch(_){ }
    const sync=()=>{const checked=boxes.filter(b=>b.checked).map(b=>b.value);if(count)count.textContent=`${checked.length} / ${boxes.length}`;if(meter)meter.style.width=`${checked.length/boxes.length*100}%`;try{localStorage.setItem('wildnorth-readiness',JSON.stringify(checked));}catch(_){}};
    boxes.forEach(b=>b.addEventListener('change',sync));sync();
  }

  document.querySelectorAll('form[data-local-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;const status=form.querySelector('[data-form-status]');const data=Object.fromEntries(new FormData(form).entries());
    try{localStorage.setItem('wildnorth-profile:'+form.dataset.formKey,JSON.stringify({savedAt:new Date().toISOString(),fields:data}));}catch(_){ }
    if(status){status.textContent='Saved in this browser only. No inquiry or booking was sent.';status.hidden=false;status.setAttribute('tabindex','-1');status.focus();}
  }));

  const queryForm=document.querySelector('[data-trip-query]');
  if(queryForm){const trip=new URLSearchParams(location.search).get('trip');const select=queryForm.querySelector('select[name="trip"]');if(trip&&select&&[...select.options].some(o=>o.value===trip))select.value=trip;}
})();
