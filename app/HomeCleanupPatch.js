import React from 'react';

const script = `
(function(){
  function isHome(){return location.pathname==='/' || location.pathname==='';}
  function removeNode(el){if(el && el.parentNode)el.parentNode.removeChild(el);}
  function cleanTextNodes(){
    if(!isHome())return;
    document.querySelectorAll('article,.panel,.card,.stats div,section,aside,p,h2,h3,span').forEach(el=>{
      const t=(el.textContent||'').toLowerCase();
      if(t.includes('cariri território prioritário') || t.includes('cariri territorio prioritario')) removeNode(el.closest('article')||el.closest('.card')||el.closest('.panel')||el);
      if(t.includes('conteúdo estruturado no padrão institucional lions') || t.includes('conteudo estruturado no padrao institucional lions')){
        if(el.tagName==='P') el.textContent='Campanhas, voluntariado, transparência e comunicação institucional do Lions Clube Juazeiro do Norte.';
        else removeNode(el.closest('article')||el.closest('.card')||el.closest('.panel')||el);
      }
      if(t.includes('diretoria') && (t.includes('cargos') || t.includes('responsáveis') || t.includes('responsaveis'))){
        removeNode(el.closest('article')||el.closest('.card')||el.closest('.panel')||el.closest('.stats div')||el);
      }
      if((t.includes('admin') || t.includes('área administrativa') || t.includes('area administrativa')) && (t.includes('perfis locais') || t.includes('comunicação') || t.includes('comunicacao'))){
        removeNode(el.closest('article')||el.closest('.card')||el.closest('.panel')||el.closest('.stats div')||el);
      }
    });
  }
  function cleanHomeStats(){
    if(!isHome())return;
    document.querySelectorAll('.stats div').forEach(div=>{
      const t=(div.textContent||'').toLowerCase();
      if(t.includes('diretoria') || t.includes('admin') || t.includes('perfis')) removeNode(div);
    });
  }
  function boot(){cleanTextNodes();cleanHomeStats();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(boot,400);setTimeout(boot,1200);setTimeout(boot,2500);
})();
`;

export default function HomeCleanupPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});
}
