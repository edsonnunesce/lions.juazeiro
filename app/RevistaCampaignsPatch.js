import React from 'react';

const script = `
(function(){
  const fmtDate=(value)=>{try{const d=new Date(String(value).includes('T')?String(value):String(value)+'T12:00:00');return d.toLocaleDateString('pt-BR');}catch(e){return value||''}};
  const esc=(v)=>String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
  const issueMap={
    'al-2025-2026-001':{number:1,month:'Junho de 2026',label:'maio de 2026',title:'Campanhas locais de maio',from:'2026-05-01',to:'2026-05-31'},
    'al-2025-2026-002':{number:2,month:'Julho de 2026',label:'junho de 2026',title:'Campanhas locais de junho',from:'2026-06-01',to:'2026-06-30'},
    'al-2025-2026-003':{number:3,month:'Agosto de 2026',label:'julho de 2026',title:'Em breve',from:'2026-07-01',to:'2026-07-31',soon:true}
  };
  function currentIssue(){const m=location.pathname.match(/\/revista\/(al-2025-2026-00[123])/);return issueMap[m?m[1]:'al-2025-2026-002']||issueMap['al-2025-2026-002'];}
  function monthRangeForIssue(){const i=currentIssue();return {start:new Date(i.from+'T00:00:00'),end:new Date(i.to+'T23:59:59'),label:i.label,issueLabel:i.month,issue:i};}
  function asDate(value){if(!value)return null;const d=new Date(String(value).includes('T')?String(value):String(value)+'T12:00:00');return isNaN(d.getTime())?null:d;}
  function inRange(c,start,end){const main=asDate(c.data_inicio||c.date||c[2]);if(main&&main>=start&&main<=end)return true;const created=asDate(c.criado_em||c.created_at);if(created&&created>=start&&created<=end)return true;return false;}
  function displayDate(c){return fmtDate(c.data_inicio||c[2]||c.criado_em||'');}
  function photos(c){const f=c.fotos||c[5]||[];if(Array.isArray(f))return f.filter(Boolean);return String(f||'').split(',').map(x=>x.trim()).filter(Boolean);}
  function card(c){const ph=photos(c);return '<div class="card localCampaignCard">'+(ph[0]?'<img class="localCampaignPhoto" src="'+esc(ph[0])+'" alt="'+esc(c.titulo||c[0]||'Campanha local')+'">':'')+'<h3>'+esc(c.titulo||c[0]||'Campanha local')+'</h3><p><b>'+esc(c.causa_global||c[1]||'Campanha local')+'</b></p><p>'+esc(displayDate(c))+' · '+esc(c.local||c[3]||'Juazeiro do Norte')+'</p><p>'+esc(c.resumo||c[4]||'')+'</p></div>';}
  function ensureStyles(){let s=document.getElementById('revista-campanhas-patch-style');if(!s){s=document.createElement('style');s.id='revista-campanhas-patch-style';document.head.appendChild(s);}s.textContent='.localCampaignCard{break-inside:avoid}.localCampaignPhoto{width:100%;aspect-ratio:1/1;height:auto;object-fit:cover;border-radius:6mm;margin-bottom:5mm;border:1px solid #d6d3c3}.localCampaignRule{font-size:9.5pt;color:#65758b;margin-top:4mm}.magPage .localCampaignGrid{display:grid;grid-template-columns:1fr 1fr;gap:6mm}@media(max-width:620px){.magPage .localCampaignGrid{grid-template-columns:1fr}}';}
  async function loadCampaigns(){try{const r=await fetch('/api/campanhas',{cache:'no-store'});const j=await r.json();if(j&&j.ok&&Array.isArray(j.data))return j.data;}catch(e){}try{return JSON.parse(localStorage.getItem('lj_campaigns')||'[]').map(x=>({titulo:x[0],causa_global:x[1],data_inicio:x[2],local:x[3],resumo:x[4],fotos:String(x[5]||'').split(',').map(v=>v.trim()).filter(Boolean)}));}catch(e){return []}}
  async function patchRevista(){
    if(!location.pathname.startsWith('/revista'))return;ensureStyles();const range=monthRangeForIssue();if(range.issue.soon)return;
    const pages=Array.from(document.querySelectorAll('.magPage'));const page=pages.find(p=>(p.textContent||'').includes('Campanhas locais validadas')||(p.textContent||'').includes('Campanhas locais do mês')||(p.textContent||'').includes('Campanhas locais de maio')||(p.textContent||'').includes('Campanhas locais de junho'));
    if(!page)return;const all=await loadCampaigns();const selected=all.filter(c=>inRange(c,range.start,range.end));
    const title=page.querySelector('h2');if(title)title.textContent=range.issue.title;const kicker=page.querySelector('.kicker');if(kicker)kicker.textContent='Revista de '+range.issue.month.toLowerCase();const footer=page.querySelector('.pageFooter');
    const html=selected.length?'<p>Esta edição de '+esc(range.issueLabel)+' reúne automaticamente as campanhas locais realizadas ou cadastradas de '+esc(range.issue.from.split('-').reverse().join('/'))+' a '+esc(range.issue.to.split('-').reverse().join('/'))+'.</p><div class="localCampaignGrid">'+selected.map(card).join('')+'</div>':'<p>Esta edição de '+esc(range.issueLabel)+' será alimentada automaticamente pelas campanhas cadastradas no período de '+esc(range.issue.from.split('-').reverse().join('/'))+' a '+esc(range.issue.to.split('-').reverse().join('/'))+'.</p><div class="photoBox">Aguardando campanhas locais de '+esc(range.label)+' cadastradas no banco.</div>';
    Array.from(page.children).forEach(el=>{if(!el.classList.contains('kicker')&&el.tagName!=='H2'&&!el.classList.contains('pageFooter'))el.remove();});const wrap=document.createElement('div');wrap.innerHTML=html;while(wrap.firstChild)page.insertBefore(wrap.firstChild,footer||null);
  }
  function patchCampanhasPage(){if(location.pathname!=='/campanhas')return;const h1=document.querySelector('.pageHero h1');if(h1)h1.textContent='Campanhas locais';const lead=document.querySelector('.pageHero p');if(lead)lead.textContent='Acompanhe as ações cadastradas pelo Lions Clube Juazeiro do Norte, com fotos, datas, causas globais, locais e resultados.';document.querySelectorAll('.panel,article,section').forEach(el=>{const t=(el.textContent||'').toLowerCase();if(t.includes('fluxo de campanha')||t.includes('diagnóstico da necessidade')||t.includes('planejamento com meta')||t.includes('execução com registro')||t.includes('prestação de contas e relatório'))el.remove();});}
  function boot(){patchCampanhasPage();patchRevista();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();setTimeout(boot,700);setTimeout(boot,1800);setTimeout(boot,3200);
})();
`;

export default function RevistaCampaignsPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
