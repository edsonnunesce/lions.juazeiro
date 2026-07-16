import React from 'react';

const script = `
(function(){
  if(!location.pathname.startsWith('/revista')) return;
  const fmtDate=(value)=>{try{const d=new Date(String(value).includes('T')?String(value):String(value)+'T12:00:00');return d.toLocaleDateString('pt-BR');}catch(e){return value||''}};
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const issueMap={
    'al-2025-2026-001':{number:1,month:'Junho de 2026',label:'maio de 2026',title:'Campanhas locais de maio',from:'2026-05-01',to:'2026-05-31'},
    'al-2025-2026-002':{number:2,month:'Julho de 2026',label:'junho de 2026',title:'Campanhas locais de junho',from:'2026-06-01',to:'2026-06-30'},
    'al-2025-2026-003':{number:3,month:'Agosto de 2026',label:'julho de 2026',title:'Em breve',from:'2026-07-01',to:'2026-07-31',soon:true}
  };
  function currentIssue(){const parts=location.pathname.split('/').filter(Boolean);const id=parts.find(part=>issueMap[part]);return issueMap[id||'al-2025-2026-002']||issueMap['al-2025-2026-002'];}
  function asDate(value){if(!value)return null;const d=new Date(String(value).includes('T')?String(value):String(value)+'T12:00:00');return isNaN(d.getTime())?null:d;}
  function inRange(c,start,end){const main=asDate(c.data_inicio);if(main&&main>=start&&main<=end)return true;const created=asDate(c.criado_em);return Boolean(created&&created>=start&&created<=end);}
  function photos(c){return Array.isArray(c.fotos)?c.fotos.filter(Boolean):[];}
  function card(c){const ph=photos(c);return '<div class="card localCampaignCard">'+(ph[0]?'<img class="localCampaignPhoto" src="'+esc(ph[0])+'" alt="'+esc(c.titulo||'Campanha local')+'">':'')+'<h3>'+esc(c.titulo||'Campanha local')+'</h3><p><b>'+esc(c.causa_global||'Campanha local')+'</b></p><p>'+esc(fmtDate(c.data_inicio))+' · '+esc(c.local||'Juazeiro do Norte')+'</p><p>'+esc(c.resumo||'')+'</p></div>';}
  function ensureStyles(){let s=document.getElementById('revista-campanhas-patch-style');if(!s){s=document.createElement('style');s.id='revista-campanhas-patch-style';document.head.appendChild(s);}s.textContent='.localCampaignCard{break-inside:avoid}.localCampaignPhoto{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;border-radius:6mm;margin-bottom:5mm;border:1px solid #d6d3c3}.magPage .localCampaignGrid{display:grid;grid-template-columns:1fr 1fr;gap:6mm}@media(max-width:620px){.magPage .localCampaignGrid{grid-template-columns:1fr}}';}
  async function patchRevista(){
    ensureStyles();const issue=currentIssue();if(issue.soon)return;
    const pages=Array.from(document.querySelectorAll('.magPage'));
    const page=pages.find(p=>(p.textContent||'').includes('Campanhas locais validadas')||(p.textContent||'').includes('Campanhas locais do mês')||(p.textContent||'').includes('Campanhas locais de maio')||(p.textContent||'').includes('Campanhas locais de junho'));
    if(!page)return;
    const r=await fetch('/api/campanhas',{cache:'no-store'});const j=await r.json();if(!r.ok||!j||!j.ok||!Array.isArray(j.data))return;
    const start=new Date(issue.from+'T00:00:00'),end=new Date(issue.to+'T23:59:59');const selected=j.data.filter(c=>inRange(c,start,end));
    const title=page.querySelector('h2');if(title)title.textContent=issue.title;const footer=page.querySelector('.pageFooter');
    const html=selected.length?'<p>Esta edição reúne as campanhas locais do período.</p><div class="localCampaignGrid">'+selected.map(card).join('')+'</div>':'<p>Nenhuma campanha cadastrada para este período.</p>';
    Array.from(page.children).forEach(el=>{if(!el.classList.contains('kicker')&&el.tagName!=='H2'&&!el.classList.contains('pageFooter'))el.remove();});
    const wrap=document.createElement('div');wrap.innerHTML=html;while(wrap.firstChild)page.insertBefore(wrap.firstChild,footer||null);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patchRevista,{once:true});else patchRevista();
})();
`;

export default function RevistaCampaignsPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
