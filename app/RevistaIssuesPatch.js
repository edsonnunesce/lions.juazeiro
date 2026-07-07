import React from 'react';

const script = `
(function(){
  const issues=[
    {id:'al-2025-2026-003',number:3,month:'Agosto de 2026',status:'em breve',from:'2026-07-01',to:'2026-07-31',cover:'Em breve'},
    {id:'al-2025-2026-002',number:2,month:'Julho de 2026',status:'publicada',from:'2026-06-01',to:'2026-06-30',cover:'Julho registra as ações de junho e o fechamento do AL 2025/2026'},
    {id:'al-2025-2026-001',number:1,month:'Junho de 2026',status:'publicada',from:'2026-05-01',to:'2026-05-31',cover:'Nós servimos Juazeiro, o Cariri e o mundo'}
  ];
  function current(){
    const parts=location.pathname.split('/').filter(Boolean);
    const id=parts.find(part=>issues.some(issue=>issue.id===part));
    if(id) return issues.find(issue=>issue.id===id)||issues[1];
    return issues[1];
  }
  function ensureStyles(){
    let s=document.getElementById('revista-issues-style');
    if(!s){s=document.createElement('style');s.id='revista-issues-style';document.head.appendChild(s);}
    s.textContent='.issueThumb.soon{border-color:#cbd5e1;background:#f8fbff}.issueThumb.activeIssue{outline:3px solid #ffcc00}.soonPage{display:grid;place-items:center;text-align:center}.soonPage h2{font-size:54pt}.issueBadge{display:inline-flex;border-radius:999px;background:#fff8d6;border:1px solid #ffcc00;padding:4px 10px;color:#00338d;font-weight:950;margin-top:8px}.futureIssue{display:none!important}';
  }
  function rewriteSidebar(issue){
    const side=document.querySelector('.sideIssues');
    if(!side)return;
    side.innerHTML=issues.map(x=>'<a class="issueThumb '+(x.status==='em breve'?'soon':'')+' '+(x.id===issue.id?'activeIssue':'')+'" href="/revista/'+x.id+'"><div class="thumbCover"><span>'+(x.status==='em breve'?'Em breve':'Edição disponível')+'</span><b>AL nº '+x.number+'</b><span>'+x.month+' · campanhas de '+x.from.slice(5,7)+'/'+x.from.slice(0,4)+'</span></div><div class="thumbMeta"><strong>Revista Mensal AL 2025/2026 número '+x.number+'</strong><small>'+x.month+(x.status==='em breve'?' · em breve':' · ações do mês anterior')+'</small></div></a>').join('');
  }
  function replaceText(issue){
    const newTitle='Revista Mensal AL 2025/2026 número '+issue.number;
    document.querySelectorAll('.issueHeader h2').forEach(el=>{el.textContent=newTitle;});
    document.querySelectorAll('.issueHeader p').forEach(el=>{el.textContent=issue.status==='em breve'?'Edição preparada para publicação futura.':'Leitor de revista em páginas A4. Role para ler página por página.';});
    document.querySelectorAll('.issueHeader .btn').forEach(el=>{el.href='/revista/'+issue.id;el.textContent=issue.status==='em breve'?'Edição em breve':'Visualização focada';});
    document.querySelectorAll('.coverPage h1').forEach(el=>{el.textContent='Revista AL nº '+issue.number;});
    document.querySelectorAll('.coverPage .headline').forEach(el=>{el.textContent=issue.cover;});
    document.querySelectorAll('.coverStrip div:first-child b').forEach(el=>{el.textContent=issue.month;});
    document.querySelectorAll('.coverStrip div:first-child span').forEach(el=>{el.textContent='AL 2025/2026';});
    document.querySelectorAll('.pageFooter span:last-child').forEach(el=>{el.textContent=el.textContent.replace(/Revista nº \d+/,'Revista nº '+issue.number);});
    document.querySelectorAll('.backCover p').forEach(el=>{el.textContent=el.textContent.replace(/Edição nº \d+/,'Edição nº '+issue.number);});
  }
  function pageByNumber(n){return document.querySelector('.magPage[data-page="'+n+'"]');}
  function fillIssue2Research(){
    const p6=pageByNumber('06');
    if(p6){const h=p6.querySelector('h2'); if(h) h.textContent='LCIF: fechamento de ciclo e novos projetos.'; const first=p6.querySelector('p'); if(first) first.textContent='A edição de julho registra o fechamento do Ano Leonístico 2025/2026 e mantém a LCIF como referência permanente para transformar campanhas locais em impacto ampliado por meio de subsídios, programas de visão, socorro após catástrofes, juventude e esforços humanitários.';}
    const p7=pageByNumber('07');
    if(p7){const h=p7.querySelector('h2'); if(h) h.textContent='Lions International: fechamento do AL 2025/2026.'; const first=p7.querySelector('p'); if(!first){const x=document.createElement('p');x.textContent='Junho marca o encerramento do Ano Leonístico 2025/2026 e a preparação dos clubes para a continuidade de MISSION 1.5, crescimento associativo e fortalecimento das causas globais.'; h.after(x);} }
    const p8=pageByNumber('08');
    if(p8){const h=p8.querySelector('h2'); if(h) h.textContent='Distrito Múltiplo LA e Distrito LA-4 em transição de AL.'; const first=p8.querySelector('p'); if(first) first.textContent='A edição de julho reserva espaço para comunicados distritais, registros de encerramento do AL 2025/2026, agenda de posse, visitas oficiais, campanhas do Ceará e orientações do Distrito Múltiplo LA.';}
    const p11=pageByNumber('11');
    if(p11){const h=p11.querySelector('h2'); if(h) h.textContent='Fontes pesquisadas para julho'; const ol=p11.querySelector('ol'); if(ol&&!ol.querySelector('.julySource')){const li=document.createElement('li');li.className='julySource';li.textContent='Pesquisa editorial de junho/julho: Lions International, LCIF, LION Magazine, Lions Brasil, Distrito Múltiplo LA e Distrito LA-4. Os campos locais seguem alimentados por campanhas cadastradas no banco.';ol.prepend(li);} }
  }
  function showSoon(issue){
    const stack=document.querySelector('.pageStack');
    if(!stack)return;
    stack.innerHTML='<section class="magPage soonPage" data-page="Em breve"><div><div class="kicker">Revista Mensal AL 2025/2026</div><h2>Em breve</h2><p>A Revista nº '+issue.number+' — '+issue.month+' ficará disponível após o cadastro e validação das campanhas do mês anterior.</p><p class="issueBadge">Campanhas de julho/2026</p></div><div class="pageFooter"><span>Lions Clube Juazeiro do Norte · AL 2025/2026</span><span>Revista nº '+issue.number+'</span></div></section>';
  }
  function patch(){
    if(!location.pathname.startsWith('/revista'))return;
    ensureStyles();
    const issue=current();
    rewriteSidebar(issue);
    replaceText(issue);
    if(issue.id==='al-2025-2026-003'){showSoon(issue);return;}
    if(issue.id==='al-2025-2026-002') fillIssue2Research();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
  setTimeout(patch,700);setTimeout(patch,1800);setTimeout(patch,3200);
})();
`;

export default function RevistaIssuesPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
