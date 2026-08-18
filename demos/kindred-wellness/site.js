(() => {
  const btn = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (btn && nav) btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('[data-accordion]').forEach((item) => {
    const q=item.querySelector('button'); if(!q)return;
    q.addEventListener('click',()=>item.classList.toggle('open'));
  });
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    const group=button.closest('[data-filter-group]'); if(!group)return;
    group.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active')); button.classList.add('active');
    const value=button.dataset.filter;
    document.querySelectorAll('[data-filter-item]').forEach(item=>{item.hidden = value!=='all' && item.dataset.filterItem!==value;});
  }));
  document.querySelectorAll('form[data-demo-form]').forEach(form => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status=form.querySelector('[data-form-status]');
    if(status){status.textContent='Demo form submitted — connect this form to your preferred service before launch.';status.hidden=false;}
  }));
  const slider=document.querySelector('[data-budget-slider]');
  if(slider){const out=document.querySelector('[data-budget-output]'); const sync=()=>{out.textContent='$'+Number(slider.value).toLocaleString()}; slider.addEventListener('input',sync);sync();}
})();