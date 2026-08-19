(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') close();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) close();
    });
  }

  const decisionNote = document.querySelector('[data-decision-note]');
  const decisionSteps = [...document.querySelectorAll('[data-decision-step]')];
  if (decisionNote && decisionSteps.length) {
    const activate = step => {
      decisionSteps.forEach(item => {
        const active = item === step;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      decisionNote.textContent = step.dataset.note;
    };
    decisionSteps.forEach(step => step.addEventListener('click', () => activate(step)));
    activate(decisionSteps[0]);
  }

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      try { localStorage.setItem('northline-inquiry-draft', JSON.stringify({...data, savedAt: new Date().toISOString()})); } catch (_) {}
      status.hidden = false;
      status.textContent = 'Your inquiry has been saved in this browser for review. This static site has not sent it to Northline.';
      status.focus();
    });
  }

  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
})();
