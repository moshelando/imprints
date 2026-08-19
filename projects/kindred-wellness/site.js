
(() => {
  const masthead = document.querySelector('[data-masthead]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const setMenu = (open) => {
    if (!toggle || !menu || !masthead) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    masthead.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });
  }

  document.querySelectorAll('[data-service]').forEach(row => {
    const button = row.querySelector('button');
    const panel = row.querySelector('.service-detail');
    if (!button || !panel) return;
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      row.classList.toggle('open', !open);
    });
  });

  const form = document.querySelector('[data-book-form]');
  if (form) {
    const select = form.querySelector('#practitioner');
    const params = new URLSearchParams(location.search);
    const practitioner = params.get('practitioner');
    if (select && ['maya','jordan','elena'].includes(practitioner)) select.value = practitioner;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) { status.hidden = false; status.className = 'form-status'; status.textContent = 'Please complete the required fields above.'; }
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      try { localStorage.setItem('kindred:last-request', JSON.stringify({savedAt:new Date().toISOString(), ...data})); } catch (_) {}
      if (status) { status.hidden = false; status.className = 'form-status success'; status.textContent = 'Your request has been recorded in this browser only. Nothing was sent to a clinic or scheduling service.'; status.setAttribute('tabindex','-1'); status.focus(); }
    });
  }
})();
