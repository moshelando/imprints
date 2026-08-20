(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  };

  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Close' : 'Menu';
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (event) => {
      if (!mobileNav.classList.contains('open')) return;
      if (!header.contains(event.target)) closeMenu();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const planSelect = document.querySelector('[data-plan-select]');
  if (planSelect) {
    const requestedPlan = new URLSearchParams(window.location.search).get('plan');
    if (requestedPlan && [...planSelect.options].some((option) => option.value === requestedPlan)) {
      planSelect.value = requestedPlan;
    }
  }

  document.querySelectorAll('form[data-interactive-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = form.dataset.success || 'Your preview is ready.';
        status.hidden = false;
        status.tabIndex = -1;
        status.focus();
      }
    });
  });

})();
