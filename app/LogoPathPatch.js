import React from 'react';

const script = `
(function(){
  function normalizeLogo(){
    document.querySelectorAll('img').forEach(function(img){
      const src=String(img.getAttribute('src')||'').toLowerCase();
      const alt=String(img.getAttribute('alt')||'').toLowerCase();
      const cls=String(img.className||'').toLowerCase();
      const isClubLogo=alt.includes('lions clube juazeiro')||alt.includes('lions clube de juazeiro')||alt.includes('emblema do lions clube juazeiro')||src.includes('logo_lcjuazeiro')||src.includes('logo-lcjuazeiro')||src.includes('logo_lions_juazeiro')||cls.includes('clublogo');
      if(isClubLogo&&src!=='/logo.png') img.setAttribute('src','/logo.png');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',normalizeLogo,{once:true});else normalizeLogo();
})();
`;

export default function LogoPathPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
