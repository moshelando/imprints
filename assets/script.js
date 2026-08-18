const nav=document.querySelector('.nav');
const syncNav=()=>nav&&nav.classList.toggle('is-scrolled',scrollY>12);
syncNav();
addEventListener('scroll',syncNav,{passive:true});

const previewFrames=document.querySelectorAll('.case-preview iframe, .project-preview iframe');
previewFrames.forEach(frame=>{
  const cleanPreview=()=>{
    try{
      const doc=frame.contentDocument;
      if(!doc||!doc.head)return;
      let style=doc.getElementById('mosaic-preview-mode');
      if(!style){
        style=doc.createElement('style');
        style.id='mosaic-preview-mode';
        style.textContent=`
          html,body{scrollbar-width:none!important;overflow:hidden!important}
          html::-webkit-scrollbar,body::-webkit-scrollbar,*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
          .desktop-nav a:after,.desktop-nav a:before,.desktop-nav a.active:after,.desktop-nav a.active:before,.desktop-nav a:hover:after,.desktop-nav a:hover:before{display:none!important;content:none!important}
          .desktop-nav a,.desktop-nav a.active{text-decoration:none!important;box-shadow:none!important}
          .site-header{position:relative!important;top:auto!important;box-shadow:none!important;transform:none!important}
          [data-aurora-consent],[data-penny-consent],.aurora-consent,.penny-consent,.cookie-banner,.cookie-consent,.consent-banner{display:none!important}
          *,*:before,*:after{animation-play-state:paused!important;transition:none!important}
        `;
        doc.head.appendChild(style);
      }
    }catch(e){}
  };
  frame.addEventListener('load',()=>{cleanPreview();setTimeout(cleanPreview,120);setTimeout(cleanPreview,600)});
  cleanPreview();
});
