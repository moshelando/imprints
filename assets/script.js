const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

const syncHeader = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
};

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
