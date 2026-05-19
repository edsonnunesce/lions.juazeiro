import React from 'react';

const script = `
(function(){
  function addButton(){
    const aside=document.querySelector('#adminApp aside');
    if(!aside || aside.querySelector('[data-link="revista-imagens"]')) return;
    const a=document.createElement('a');
    a.dataset.link='revista-imagens';
    a.href='/admin/revista-imagens';
    a.textContent='Imagens da revista';
    a.style.cssText='display:flex;align-items:center;justify-content:flex-start;text-decoration:none;background:#eaf2ff;color:#00338d;border:0;border-radius:999px;min-height:44px;padding:0 18px;font-weight:950;margin:0 0 10px;box-sizing:border-box;width:100%;font-family:inherit;font-size:inherit;';
    const exportBtn=aside.querySelector('[data-tab="export"]');
    if(exportBtn) aside.insertBefore(a, exportBtn); else aside.appendChild(a);
  }
  function boot(){addButton();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  setTimeout(boot,700);setTimeout(boot,1800);
})();
`;

export default function AdminRevistaImagesPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
