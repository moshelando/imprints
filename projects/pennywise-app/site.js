(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const consentKey = 'pennywise-consent-v1';

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

  const slider = document.querySelector('[data-budget-slider]');
  if (slider) {
    const output = document.querySelector('[data-budget-output]');
    const sync = () => {
      if (output) output.textContent = `$${Number(slider.value).toLocaleString()}`;
    };
    slider.addEventListener('input', sync);
    sync();
  }

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
        status.textContent = form.dataset.success || 'Your demo is ready.';
        status.hidden = false;
        status.tabIndex = -1;
        status.focus();
      }
    });
  });

  const applyConsent = (value) => {
    document.documentElement.dataset.analytics = value === 'analytics' ? 'preview-on' : 'off';
  };
  const readConsent = () => {
    try { return localStorage.getItem(consentKey); } catch (_) { return null; }
  };
  const writeConsent = (value) => {
    try { localStorage.setItem(consentKey, value); } catch (_) {}
    applyConsent(value);
  };
  const reportConsent = (value) => {
    const status = document.querySelector('[data-consent-status]');
    if (!status) return;
    status.textContent = value === 'analytics'
      ? 'The analytics-allowed demo state is selected. No third-party analytics were loaded.'
      : 'Essential-only is selected. No third-party analytics were loaded.';
    status.hidden = false;
  };
  const saveConsent = (value) => {
    writeConsent(value);
    document.querySelector('[data-penny-consent]')?.remove();
    reportConsent(value);
  };
  const showConsent = () => {
    if (document.querySelector('[data-penny-consent]')) return;
    const panel = document.createElement('aside');
    panel.className = 'penny-consent';
    panel.dataset.pennyConsent = '';
    panel.setAttribute('aria-label', 'Privacy choices');
    panel.innerHTML = `
      <div>
        <strong>Your browsing should be clear, too.</strong>
        <span>This demo stores only your privacy choice. Optional analytics are not connected.</span>
      </div>
      <div class="penny-actions">
        <button type="button" data-choice="essential">Essential only</button>
        <button type="button" class="yes" data-choice="analytics">Preview allowed</button>
        <a class="privacy-link" href="privacy.html#cookie-settings">Review settings</a>
      </div>`;
    document.body.append(panel);
    panel.querySelectorAll('[data-choice]').forEach((button) => {
      button.addEventListener('click', () => saveConsent(button.dataset.choice));
    });
  };

  const consentStyles = document.createElement('link');
  consentStyles.rel = 'stylesheet';
  consentStyles.href = 'consent.css?v=2';
  document.head.append(consentStyles);

  document.querySelectorAll('[data-consent-choice]').forEach((button) => {
    button.addEventListener('click', () => saveConsent(button.dataset.consentChoice));
  });

  const consent = readConsent();
  if (consent) {
    applyConsent(consent);
    reportConsent(consent);
  } else {
    window.setTimeout(showConsent, 350);
  }
})();
