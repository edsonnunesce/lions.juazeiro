import React from 'react';

const script = `
(function(){
  let moving=false;
  function moveFooter(){
    if(moving) return;
    if(location.pathname !== '/' && location.pathname !== '') return;
    const foot=document.querySelector('footer.foot,.foot');
    const intel=document.querySelector('.intelHome');
    if(!foot || !intel) return;
    const target=intel;
    if(foot.previousElementSibling===target) return;
    moving=true;
    target.after(foot);
    moving=false;
  }
  function boot(){
    moveFooter();
    setTimeout(moveFooter,300);
    setTimeout(moveFooter,900);
    setTimeout(moveFooter,1800);
    setTimeout(moveFooter,3200);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  const obs=new MutationObserver(()=>moveFooter());
  obs.observe(document.documentElement,{childList:true,subtree:true});
})();
`;

export default function FooterFinalPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
