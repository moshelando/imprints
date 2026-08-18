(() => {
  const header = document.querySelector('.site-header');
  const setHeaderState = () => header && header.classList.toggle('is-scrolled', window.scrollY > 12);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, {passive:true});

  const btn = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-mobile-nav]');
  const closeMenu = () => { if (!nav || !btn) return; nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); };
  if (btn && nav) btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  if (nav) nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  document.querySelectorAll('[data-accordion]').forEach((item) => {
    const q = item.querySelector('button'); if (!q) return;
    q.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
    q.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', String(open));
    });
  });

  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    const group = button.closest('[data-filter-group]'); if (!group) return;
    group.querySelectorAll('[data-filter]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    button.classList.add('active'); button.setAttribute('aria-pressed','true');
    const value = button.dataset.filter;
    document.querySelectorAll('[data-filter-item]').forEach(item => { item.hidden = value !== 'all' && item.dataset.filterItem !== value; });
  }));

  document.querySelectorAll('form[data-demo-form]').forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('[data-form-status]');
    if (status) { status.textContent = 'Demo form submitted — connect this form to your preferred service before launch.'; status.hidden = false; status.focus?.(); }
  }));

  const slider = document.querySelector('[data-budget-slider]');
  if (slider) {
    const out = document.querySelector('[data-budget-output]');
    const sync = () => { if(out) out.textContent = '$' + Number(slider.value).toLocaleString(); };
    slider.addEventListener('input', sync); sync();
  }
})();