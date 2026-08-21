(() => {
  const looks = {
    '01': {name:'Long jacket', image:'assets/look-01-long-jacket.webp', alt:'Model wearing the long black wool jacket', cloth:'Wool barathea', colour:'Black', construction:'Half canvas / horn closure', description:'A long, quiet line with room through the body and a controlled shoulder.'},
    '02': {name:'Column dress', image:'assets/look-02-column-dress.webp', alt:'Model wearing the full-length black silk column dress', cloth:'Washed silk', colour:'Black', construction:'Bias cut / hand-finished hem', description:'A single line that follows movement without holding it too closely.'},
    '03': {name:'Soft trouser', image:'assets/look-03-soft-trouser.webp', alt:'Model wearing high-waisted black wool trousers', cloth:'Wool twill', colour:'Black', construction:'Deep pleat / clean waistband', description:'Volume gathered at the waist and released through a long, fluid leg.'},
    '04': {name:'Evening coat', image:'assets/look-04-evening-coat.webp', alt:'Model wearing the full-length black evening coat', cloth:'Double wool', colour:'Ink', construction:'Full length / concealed closure', description:'A protective outer line with an open volume and a restrained finish.'},
    '05': {name:'Bias shirt', image:'assets/look-05-bias-shirt.webp', alt:'Model wearing a bone silk bias shirt with black trousers', cloth:'Silk crepe', colour:'Bone', construction:'Soft collar / fine seam', description:'A pale counterpoint to the collection, cut to fall away from the body.'},
    '06': {name:'Narrow skirt', image:'assets/look-06-narrow-skirt.webp', alt:'Model wearing the full-length black wool-satin skirt', cloth:'Wool satin', colour:'Black', construction:'Clean waist / back vent', description:'A precise column balanced by enough ease to preserve movement.'}
  };

  const params = new URLSearchParams(location.search);
  const requestedLook = params.get('look');
  const lookNumber = looks[requestedLook] ? requestedLook : '01';
  const look = looks[lookNumber];
  const lookPage = document.querySelector('[data-look-page]');

  if (lookPage) {
    const nextNumber = String((Number(lookNumber) % Object.keys(looks).length) + 1).padStart(2, '0');
    const image = document.querySelector('[data-look-image]');
    image.src = look.image;
    image.alt = look.alt;
    document.querySelector('[data-look-number]').textContent = `Look ${lookNumber} / Edition 07`;
    document.querySelector('[data-look-title]').textContent = `${look.name}.`;
    document.querySelector('[data-look-description]').textContent = look.description;
    document.querySelector('[data-look-cloth]').textContent = look.cloth;
    document.querySelector('[data-look-colour]').textContent = look.colour;
    document.querySelector('[data-look-construction]').textContent = look.construction;
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
        status.textContent = form.dataset.success || 'Enquiry received.';
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
