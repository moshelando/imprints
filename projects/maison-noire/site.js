(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  let lastFocused = null;

  const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu +';
    document.body.classList.remove('menu-open');
    if (lastFocused) lastFocused.focus();
  };

  const openMenu = () => {
    if (!menu || !menuButton) return;
    lastFocused = document.activeElement;
    menu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.textContent = 'Close ×';
    document.body.classList.add('menu-open');
    menu.querySelector('a')?.focus();
  };

  menuButton?.addEventListener('click', () => {
    menuButton.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu();
    if (event.key !== 'Tab' || !menu || menu.hidden) return;
    const focusable = [...menu.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])'), menuButton];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const looks = {
    '01': {name:'Long jacket', image:'assets/look-01.svg', cloth:'Wool barathea', colour:'Black', construction:'Half canvas / horn closure', description:'A long, quiet line with room through the body and a controlled shoulder.'},
    '02': {name:'Column dress', image:'assets/hero-look.svg', cloth:'Washed silk', colour:'Black', construction:'Bias cut / hand-finished hem', description:'A single line that follows movement without holding it too closely.'},
    '03': {name:'Soft trouser', image:'assets/atelier.svg', cloth:'Wool twill', colour:'Black', construction:'Deep pleat / clean waistband', description:'Volume gathered at the waist and released through a long, fluid leg.'},
    '04': {name:'Evening coat', image:'assets/hero-look.svg', cloth:'Double wool', colour:'Ink', construction:'Full length / concealed closure', description:'A protective outer line with an open volume and a restrained finish.'},
    '05': {name:'Bias shirt', image:'assets/look-01.svg', cloth:'Silk crepe', colour:'Bone', construction:'Soft collar / fine seam', description:'A pale counterpoint to the collection, cut to fall away from the body.'},
    '06': {name:'Narrow skirt', image:'assets/atelier.svg', cloth:'Wool satin', colour:'Black', construction:'Clean waist / back vent', description:'A precise column balanced by enough ease to preserve movement.'}
  };

  const params = new URLSearchParams(location.search);
  const requestedLook = params.get('look');
  const lookNumber = looks[requestedLook] ? requestedLook : '01';
  const look = looks[lookNumber];
  const lookPage = document.querySelector('[data-look-page]');

  if (lookPage) {
    const nextNumber = String((Number(lookNumber) % Object.keys(looks).length) + 1).padStart(2, '0');
    const image = document.querySelector('[data-look-image]');
    const menuImage = document.querySelector('[data-look-menu-image]');
    image.src = look.image;
    image.alt = `Abstract silhouette of the ${look.name.toLowerCase()}`;
    if (menuImage) menuImage.src = look.image;
    document.querySelector('[data-look-number]').textContent = `Look ${lookNumber} / Edition 07`;
    document.querySelector('[data-look-title]').textContent = `${look.name}.`;
    document.querySelector('[data-look-description]').textContent = look.description;
    document.querySelector('[data-look-cloth]').textContent = look.cloth;
    document.querySelector('[data-look-colour]').textContent = look.colour;
    document.querySelector('[data-look-construction]').textContent = look.construction;
    document.querySelector('[data-look-menu-label]').textContent = `Look ${lookNumber}`;
    const enquiry = document.querySelector('[data-look-enquiry]');
    enquiry.href = `contact.html?look=${lookNumber}`;
    enquiry.textContent = `Enquire about Look ${lookNumber} →`;
    const next = document.querySelector('[data-look-next]');
    next.href = `look.html?look=${nextNumber}`;
    next.textContent = `Next / Look ${nextNumber} →`;
    document.title = `Look ${lookNumber} — Maison Noire`;
  }

  const contactMessage = document.querySelector('#contact-message');
  if (contactMessage && requestedLook && looks[requestedLook]) {
    contactMessage.value = `I'm interested in Look ${requestedLook} — ${looks[requestedLook].name}.`;
    const enquiryType = document.querySelector('#contact-enquiry');
    if (enquiryType) enquiryType.value = 'Edition 07 availability';
  }

  document.querySelectorAll('form[data-interactive-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const status = form.querySelector('[data-form-status]');
      const note = form.querySelector('[data-form-note]');
      if (note) note.hidden = true;
      if (status) {
        status.textContent = form.dataset.success || 'Demo received. No message was sent.';
        status.hidden = false;
        status.setAttribute('tabindex', '-1');
        status.focus();
      }
    });
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.08});
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
