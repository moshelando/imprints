(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const navigation = document.querySelector('[data-navigation]');

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Close' : 'Menu';
      document.body.classList.toggle('menu-open', open);
    });
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const bookingForm = document.querySelector('[data-booking-form]');
  if (bookingForm) {
    const dateField = bookingForm.querySelector('[name="date"]');
    if (dateField) dateField.min = new Date().toISOString().slice(0, 10);
    const requestedService = new URLSearchParams(window.location.search).get('service');
    const serviceField = bookingForm.querySelector('[name="service"]');
    if (requestedService && serviceField && [...serviceField.options].some((option) => option.value === requestedService)) {
      serviceField.value = requestedService;
    }
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const status = bookingForm.querySelector('[data-form-status]');
      const name = bookingForm.querySelector('[name="name"]').value.trim().split(' ')[0] || 'there';
      status.textContent = `Thanks, ${name}. Your request is in. Milemarker will call to confirm the time and any details before the appointment.`;
      status.hidden = false;
      status.tabIndex = -1;
      status.focus();
      bookingForm.querySelector('button[type="submit"]').disabled = true;
    });
  }
})();
