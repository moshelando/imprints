const toggle=document.querySelector('.mobile-toggle');
const links=document.querySelector('.nav-links');
const closeMenu=()=>{if(!toggle||!links)return;links.classList.remove('open');toggle.setAttribute('aria-expanded','false')};
if(toggle&&links){
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
}
const current=window.location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active')});
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const form=document.querySelector('[data-contact-form]');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const subject=`Northline inquiry — ${data.get('organization')||data.get('name')}`;
    const body=[
      `Name: ${data.get('name')}`,
      `Organization: ${data.get('organization')||'—'}`,
      `Email: ${data.get('email')}`,
      `Topic: ${data.get('topic')}`,
      `Timing: ${data.get('timing')}`,
      '',
      data.get('message')
    ].join('\n');
    window.location.href=`mailto:moishlando@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
