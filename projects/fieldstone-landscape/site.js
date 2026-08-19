(()=> {
  const menu=document.querySelector('.menu');
  const nav=document.querySelector('.nav-links');
  if(menu&&nav){
    const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')};
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href')===current)a.classList.add('active');
  });
  const form=document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      const status=form.querySelector('[data-form-status]');
      if(status){
        status.hidden=false;
        status.textContent='Thank you. Your project inquiry has been recorded for this portfolio demo.';
        status.focus();
      }
    });
  }
})();
