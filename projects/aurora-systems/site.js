(() => {
  const drawerButton = document.querySelector('[data-drawer-button]');
  const rail = document.querySelector('#control-rail');

  const closeDrawer = () => {
    if (!drawerButton || !rail) return;
    rail.classList.remove('open');
    drawerButton.setAttribute('aria-expanded', 'false');
    drawerButton.textContent = 'Index +';
    document.body.classList.remove('drawer-open');
  };

  drawerButton?.addEventListener('click', () => {
    const open = !rail.classList.contains('open');
    rail.classList.toggle('open', open);
    drawerButton.setAttribute('aria-expanded', String(open));
    drawerButton.textContent = open ? 'Close ×' : 'Index +';
    document.body.classList.toggle('drawer-open', open);
    if (open) rail.querySelector('a')?.focus();
  });
  rail?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });

  document.querySelectorAll('[data-copy-code]').forEach((button) => {
    button.addEventListener('click', async () => {
      const block = button.closest('.code-block');
      const text = block?.querySelector('[data-code-text]')?.innerText || '';
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
      } catch (_) {
        button.textContent = 'Copy unavailable';
      }
      window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
    });
  });

  document.querySelectorAll('form[data-interactive-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector('[data-form-status]');
      if (!status) return;
      status.textContent = form.dataset.success || 'Demo complete. No request was sent or stored.';
      status.hidden = false;
      status.setAttribute('tabindex', '-1');
      status.focus();
    });
  });

  const clearButton = document.querySelector('[data-clear-preferences]');
  clearButton?.addEventListener('click', () => {
    try { localStorage.removeItem('aurora-consent-v1'); } catch (_) {}
    const status = document.querySelector('[data-preference-status]');
    if (status) {
      status.textContent = 'Legacy Aurora preference cleared from this browser.';
      status.hidden = false;
    }
  });
})();
