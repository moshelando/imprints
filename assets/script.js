(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  const setMenu = (open) => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenu(false);
        menuButton.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  const rows = [...document.querySelectorAll('[data-project-row]')];
  const stageLink = document.querySelector('[data-stage-link]');
  const stageImage = document.querySelector('[data-stage-image]');
  const stageTitle = document.querySelector('[data-stage-title]');
  const stageCount = document.querySelector('[data-stage-count]');
  const stageScope = document.querySelector('[data-stage-scope]');

  if (rows.length && stageLink && stageImage && stageTitle && stageCount && stageScope) {
    let active = null;
    let swapTimer = null;

    const activate = (row) => {
      if (!row || row === active) return;
      active = row;
      rows.forEach((item) => item.classList.toggle('is-active', item === row));
      stageLink.classList.add('is-switching');
      window.clearTimeout(swapTimer);
      swapTimer = window.setTimeout(() => {
        stageImage.src = row.dataset.image;
        stageImage.alt = `${row.dataset.name} website preview`;
        stageTitle.textContent = row.dataset.name;
        stageCount.textContent = `${row.dataset.number} / 10`;
        stageScope.textContent = row.dataset.sector;
        stageLink.href = row.getAttribute('href');
        stageLink.setAttribute('aria-label', `Open ${row.dataset.name} project site in a new tab`);
        stageImage.addEventListener('load', () => stageLink.classList.remove('is-switching'), { once: true });
        if (stageImage.complete) stageLink.classList.remove('is-switching');
      }, 90);
    };

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => activate(row));
      row.addEventListener('focus', () => activate(row));
    });
    activate(rows[0]);
  }
})();
