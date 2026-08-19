const header=document.querySelector('.site-header');
const syncHeader=()=>header&&header.classList.toggle('is-scrolled',window.scrollY>10);
syncHeader();
window.addEventListener('scroll',syncHeader,{passive:true});
