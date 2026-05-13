import React from 'react';

const script = `
(function(){
  const fmtDate=(value)=>{try{const d=new Date(String(value)+'T12:00:00');return d.toLocaleDateString('pt-BR');}catch(e){return value||''}};
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  function monthRangeForIssue(){
    const now=new Date();
    const issueMonth=now.getMonth();
    const issueYear=now.getFullYear();
    const start=new Date(issueYear, issueMonth-1, 1);
    const end=new Date(issueYear, issueMonth, 0);
    return {start,end,label:start.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})};
  }
  function inRange(c,start,end){
    const raw=c.data_inicio||c.date||c[2];
    if(!raw)return false;
    const d=new Date(String(raw)+'T12:00:00');
    return d>=start && d<=end;
  }
  function photos(c){
    const f=c.fotos||c[5]||[];
    if(Array.isArray(f))return f.filter(Boolean);
    return String(f||'').split(',').map(x=>x.trim()).filter(Boolean);
  }
  function card(c){
    const ph=photos(c);
    return '<div class="card localCampaignCard">'+
      (ph[0]?'<img class="localCampaignPhoto" src="'+esc(ph[0])+'" alt="'+esc(c.titulo||c[0]||'Campanha local')+'">':'')+
      '<h3>'+esc(c.titulo||c[0]||'Campanha local')+'</h3>'+
      '<p><b>'+esc(c.causa_global||c[1]||'Campanha local')+'</b></p>'+
      '<p>'+esc(fmtDate(c.data_inicio||c[2]))+' · '+esc(c.local||c[3]||'Juazeiro do Norte')+'</p>'+
      '<p>'+esc(c.resumo||c[4]||'')+'</p>'+
      '</div>';
  }
  function ensureStyles(){
    if(document.getElementById('revista-campanhas-patch-style'))return;
    const s=document.createElement('style');s.id='revista-campanhas-patch-style';
    s.textContent='.localCampaignCard{break-inside:avoid}.localCampaignPhoto{width:100%;height:42mm;object-fit:cover;border-radius:6mm;margin-bottom:5mm;border:1px solid #d6d3c3}.localCampaignRule{font-size:9.5pt;color:#65758b;margin-top:4mm}.magPage .localCampaignGrid{display:grid;grid-template-columns:1fr 1fr;gap:6mm}@media(max-width:620px){.magPage .localCampaignGrid{grid-template-columns:1fr}.localCampaignPhoto{height:180px}}';
    document.head.appendChild(s);
  }
  async function loadCampaigns(){
    try{const r=await fetch('/api/campanhas',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&Array.isArray(j.data))return j.data;}catch(e){}
    try{return JSON.parse(localStorage.getItem('lj_campaigns')||'[]').map(x=>({titulo:x[0],causa_global:x[1],data_inicio:x[2],local:x[3],resumo:x[4],fotos:String(x[5]||'').split(',').map(v=>v.trim()).filter(Boolean)}));}catch(e){return []}
  }
  async function patchRevista(){
    if(!location.pathname.startsWith('/revista'))return;
    ensureStyles();
    const pages=Array.from(document.querySelectorAll('.magPage'));
    const page=pages.find(p=>(p.textContent||'').includes('Campanhas locais validadas'));
    if(!page)return;
    const range=monthRangeForIssue();
    const all=await loadCampaigns();
    const selected=all.filter(c=>inRange(c,range.start,range.end));
    const title=page.querySelector('h2'); if(title)title.textContent='Campanhas locais do mês';
    const kicker=page.querySelector('.kicker'); if(kicker)kicker.textContent='Lions Juazeiro';
    const footer=page.querySelector('.pageFooter');
    const html=selected.length
      ? '<p>Campanhas realizadas em '+esc(range.label)+' para publicação na revista do mês subsequente.</p><div class="localCampaignGrid">'+selected.map(card).join('')+'</div>'
      : '<p>As campanhas cadastradas no período de '+esc(range.label)+' aparecerão nesta página da revista do mês subsequente.</p><div class="photoBox">Aguardando campanhas locais cadastradas no banco.</div>';
    Array.from(page.children).forEach(el=>{if(!el.classList.contains('kicker') && el.tagName!=='H2' && !el.classList.contains('pageFooter'))el.remove();});
    const wrap=document.createElement('div');wrap.innerHTML=html;while(wrap.firstChild)page.insertBefore(wrap.firstChild,footer||null);
  }
  function patchCampanhasPage(){
    if(location.pathname!=='/campanhas')return;
    const h1=document.querySelector('.pageHero h1'); if(h1)h1.textContent='Campanhas locais';
    const lead=document.querySelector('.pageHero p'); if(lead)lead.textContent='Acompanhe as ações cadastradas pelo Lions Clube Juazeiro do Norte, com fotos, datas, causas globais, locais e resultados.';
    document.querySelectorAll('.panel,article,section').forEach(el=>{
      const t=(el.textContent||'').toLowerCase();
      if(t.includes('fluxo de campanha')||t.includes('diagnóstico da necessidade')||t.includes('planejamento com meta')||t.includes('execução com registro')||t.includes('prestação de contas e relatório')) el.remove();
    });
  }
  function boot(){patchCampanhasPage();patchRevista();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(boot,700);setTimeout(boot,1800);
})();
`;

export default function RevistaCampaignsPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});
}
