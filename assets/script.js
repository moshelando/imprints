
const buttons=[...document.querySelectorAll('.filter')];
const projects=[...document.querySelectorAll('.project')];
buttons.forEach(btn=>btn.addEventListener('click',()=>{
  buttons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>{ p.style.display=(f==='all'||p.dataset.tags.includes(f))?'flex':'none'; });
}));
