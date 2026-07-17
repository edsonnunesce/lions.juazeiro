import React from 'react';

const script = `
(function(){
  const issues=[
    {id:'al-2025-2026-003',number:3,month:'Agosto de 2026',status:'em breve',from:'2026-07-01',to:'2026-07-31',cover:'Hong Kong, nova liderança e o início de um novo ciclo de serviço'},
    {id:'al-2025-2026-002',number:2,month:'Julho de 2026',status:'publicada',from:'2026-06-01',to:'2026-06-30',cover:'Junho encerra um ciclo e prepara a 108ª Convenção Internacional'},
    {id:'al-2025-2026-001',number:1,month:'Junho de 2026',status:'publicada',from:'2026-05-01',to:'2026-05-31',cover:'Serviço, crescimento e preparação para um novo Ano Leonístico'}
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
    s.textContent='.issueThumb.soon{border-color:#cbd5e1;background:#f8fbff}.issueThumb.activeIssue{outline:3px solid #ffcc00}.soonPage{display:flex;flex-direction:column;text-align:left}.soonPage h2{font-size:40pt}.soonIntro{font-size:14pt!important}.soonHighlights{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:6mm}.soonHighlights article{border:1px solid #d9e2ef;border-radius:6mm;padding:5mm;background:#fff}.soonHighlights h3{margin:0 0 2mm}.issueBadge{display:inline-flex;border-radius:999px;background:#fff8d6;border:1px solid #ffcc00;padding:4px 10px;color:#00338d;font-weight:950;margin-top:8px}.futureIssue{display:none!important}@media(max-width:620px){.soonHighlights{grid-template-columns:1fr}}';
  }
  function rewriteSidebar(issue){
    const side=document.querySelector('.sideIssues');
    if(!side)return;
    side.innerHTML=issues.map(x=>'<a class="issueThumb '+(x.status==='em breve'?'soon':'')+' '+(x.id===issue.id?'activeIssue':'')+'" href="/revista/'+x.id+'"><div class="thumbCover"><span>'+(x.status==='em breve'?'Em preparação':'Edição disponível')+'</span><b>AL nº '+x.number+'</b><span>'+x.month+' · conteúdo de '+x.from.slice(5,7)+'/'+x.from.slice(0,4)+'</span></div><div class="thumbMeta"><strong>Revista Mensal AL 2025/2026 número '+x.number+'</strong><small>'+x.month+(x.status==='em breve'?' · prévia editorial':' · ações e notícias do período')+'</small></div></a>').join('');
  }
  function replaceText(issue){
    const newTitle='Revista Mensal AL 2025/2026 número '+issue.number;
    document.querySelectorAll('.issueHeader h2').forEach(el=>{el.textContent=newTitle;});
    document.querySelectorAll('.issueHeader p').forEach(el=>{el.textContent=issue.status==='em breve'?'Prévia editorial com informações oficiais do período e espaço reservado às campanhas locais de julho.':'Leitor de revista em páginas A4. Role para ler página por página.';});
    document.querySelectorAll('.issueHeader .btn').forEach(el=>{el.href='/revista/'+issue.id;el.textContent=issue.status==='em breve'?'Abrir prévia':'Visualização focada';});
    document.querySelectorAll('.coverPage h1').forEach(el=>{el.textContent='Revista AL nº '+issue.number;});
    document.querySelectorAll('.coverPage .headline').forEach(el=>{el.textContent=issue.cover;});
    document.querySelectorAll('.coverStrip div:first-child b').forEach(el=>{el.textContent=issue.month;});
    document.querySelectorAll('.coverStrip div:first-child span').forEach(el=>{el.textContent='AL 2025/2026';});
    document.querySelectorAll('.pageFooter span:last-child').forEach(el=>{el.textContent=el.textContent.replace(/Revista nº \d+/,'Revista nº '+issue.number);});
    document.querySelectorAll('.backCover p').forEach(el=>{el.textContent=el.textContent.replace(/Edição nº \d+/,'Edição nº '+issue.number);});
  }
  function pageByNumber(n){return document.querySelector('.magPage[data-page="'+n+'"]');}
  function setFirstParagraph(page,text){if(!page)return;let p=page.querySelector('p');if(!p){p=document.createElement('p');const h=page.querySelector('h2');if(h)h.after(p);else page.prepend(p);}p.textContent=text;}
  function addOfficialBox(page,id,title,text,url){if(!page||page.querySelector('#'+id))return;const box=document.createElement('div');box.id=id;box.className='card';box.innerHTML='<h3>'+title+'</h3><p>'+text+'</p><p><a href="'+url+'" target="_blank" rel="noreferrer" style="color:#00338d;font-weight:900">Fonte oficial ↗</a></p>';const footer=page.querySelector('.pageFooter');page.insertBefore(box,footer||null);}
  function addSource(page,id,text,url){if(!page)return;const ol=page.querySelector('ol');if(ol&&!ol.querySelector('#'+id)){const li=document.createElement('li');li.id=id;li.innerHTML=text+' · <a href="'+url+'" target="_blank" rel="noreferrer">'+url+'</a>';ol.prepend(li);}}
  function fillIssue1Research(){
    const p4=pageByNumber('04');
    if(p4){const h=p4.querySelector('h2');if(h)h.textContent='Maio: crescimento que se transforma em serviço.';setFirstParagraph(p4,'A edição de junho registra maio como mês de preparação para o encerramento do Ano Leonístico. O movimento internacional reforçou a importância de relatar resultados, acolher novos associados e organizar metas para que o crescimento da MISSÃO 1.5 gere mais capacidade de servir.');}
    const p6=pageByNumber('06');
    if(p6){const h=p6.querySelector('h2');if(h)h.textContent='LCIF: apoio permanente às comunidades.';setFirstParagraph(p6,'A LCIF permanece como braço humanitário dos Leões, oferecendo subsídios para visão, juventude, catástrofes, fome, diabetes e projetos comunitários. A organização local de registros, metas e resultados fortalece futuras propostas e prestações de contas.');}
    const p7=pageByNumber('07');
    if(p7){const h=p7.querySelector('h2');if(h)h.textContent='MISSÃO 1.5 e preparação para o novo ciclo.';addOfficialBox(p7,'issue1-mission','Crescer para servir mais','Em maio, dirigentes e clubes avançaram na preparação das cúpulas regionais da MISSÃO 1.5 e do novo Ano Leonístico. Para a Área Jurisdicional III, que inclui América do Sul, América Central, Caribe e México, a cúpula foi programada para 12 a 14 de junho de 2026, em Bogotá.','https://www.lionsclubs.org/pt/resources-for-members/mission-to-grow/summits');}
    const p10=pageByNumber('10');
    if(p10){const h=p10.querySelector('h2');if(h)h.textContent='Agenda internacional: serviço, liderança e convenção.';setFirstParagraph(p10,'A agenda seguinte apontava para as cúpulas da MISSÃO 1.5 em junho e para a 108ª Convenção Internacional, programada para 3 a 7 de julho de 2026, em Hong Kong. O clube local acompanha essas referências para alinhar comunicação, crescimento e planejamento.');}
    addSource(pageByNumber('11'),'issue1-source','Conteúdo editorial de maio/junho: MISSÃO 1.5, calendário internacional e recursos para associados','https://www.lionsclubs.org/pt/member-resource-center');
  }
  function fillIssue2Research(){
    const p4=pageByNumber('04');
    if(p4){const h=p4.querySelector('h2');if(h)h.textContent='Junho: encerramento com continuidade.';setFirstParagraph(p4,'Junho encerrou o Ano Leonístico 2025/2026 com foco em prestação de contas, transição de lideranças e continuidade do serviço. As campanhas locais permanecem como centro da revista, conectadas ao movimento internacional e às prioridades comunitárias do Cariri.');}
    const p6=pageByNumber('06');
    if(p6){const h=p6.querySelector('h2');if(h)h.textContent='LCIF: fechamento de ciclo e novos projetos.';setFirstParagraph(p6,'A edição de julho registra o fechamento do Ano Leonístico 2025/2026 e mantém a LCIF como referência permanente para transformar campanhas locais em impacto ampliado por meio de subsídios, programas de visão, socorro após catástrofes, juventude e esforços humanitários.');}
    const p7=pageByNumber('07');
    if(p7){const h=p7.querySelector('h2');if(h)h.textContent='Lions International: a caminho de Hong Kong.';setFirstParagraph(p7,'Em junho, Lions International concentrou a comunicação na preparação da 108ª Convenção Internacional, realizada de 3 a 7 de julho de 2026 em Hong Kong. A programação anunciou celebração do serviço, Cerimônia das Bandeiras, reconhecimentos, atualizações da LCIF e da MISSÃO 1.5.');addOfficialBox(p7,'issue2-convention','Unidade internacional','A Cerimônia das Bandeiras representa a diversidade e o alcance mundial dos Leões e Leos. A convenção também reservou sessões para histórias de serviço, reconhecimento humanitário e preparação da nova liderança internacional.','https://lionscon.lionsclubs.org/pt-br/');}
    const p8=pageByNumber('08');
    if(p8){const h=p8.querySelector('h2');if(h)h.textContent='Distrito Múltiplo LA e Distrito LA-4 em transição de AL.';setFirstParagraph(p8,'A edição de julho reserva espaço para comunicados distritais, registros de encerramento do AL 2025/2026, agendas de posse, visitas oficiais, campanhas do Ceará e orientações do Distrito Múltiplo LA.');}
    const p10=pageByNumber('10');
    if(p10){const h=p10.querySelector('h2');if(h)h.textContent='Próximos passos: novo AL e comunicação contínua.';setFirstParagraph(p10,'Com o início do novo Ano Leonístico em 1º de julho, o portal mantém o compromisso de registrar campanhas, divulgar resultados e acompanhar as novas orientações internacionais, sem perder a memória do ciclo encerrado.');}
    addSource(pageByNumber('11'),'issue2-source','Pesquisa editorial de junho/julho: Centro de Recursos, MISSÃO 1.5 e LionsCon Hong Kong 2026','https://lionscon.lionsclubs.org/pt-br/');
  }
  function showSoon(issue){
    const stack=document.querySelector('.pageStack');
    if(!stack)return;
    stack.innerHTML='<section class="magPage soonPage" data-page="Prévia"><div class="kicker">Revista Mensal AL 2025/2026 · prévia editorial</div><h2>Agosto de 2026</h2><p class="soonIntro">A terceira edição reunirá as campanhas locais de julho e os principais marcos do início do AL 2026/2027. O conteúdo internacional já está preparado; os registros locais permanecem abertos até o fechamento do mês.</p><span class="issueBadge">Campanhas de julho/2026</span><div class="soonHighlights"><article><h3>108ª Convenção Internacional</h3><p>Hong Kong recebeu Leões e Leos de 3 a 7 de julho de 2026 para celebrar o serviço, reconhecer iniciativas e compartilhar atualizações da LCIF e da MISSÃO 1.5.</p></article><article><h3>Nova liderança internacional</h3><p>Mark Lyon iniciou sua presidência com o lema “Com as raízes no serviço”, destacando serviço significativo, crescimento, liderança e apoio à LCIF.</p></article><article><h3>Último ano da MISSÃO 1.5</h3><p>O movimento internacional renovou a mobilização para ampliar clubes e associados, fortalecendo a capacidade de atender mais comunidades.</p></article><article><h3>Semanas de Serviços 2026/2027</h3><p>O calendário oficial destaca visão em outubro de 2026, juventude em fevereiro de 2027 e meio ambiente entre maio e junho de 2027.</p></article><article><h3>Agenda de agosto</h3><p>O Fórum ANZI-Pacífico está previsto para 21 a 23 de agosto de 2026, em Auckland, integrando o calendário internacional de formação e intercâmbio.</p></article><article><h3>Memória local</h3><p>As ações cadastradas no portal durante julho serão incorporadas à edição após validação, preservando fotos, parceiros, resultados e histórias do clube.</p></article></div><p style="margin-top:7mm"><a href="https://www.lionsclubs.org/pt/member-resource-center" target="_blank" rel="noreferrer" style="color:#00338d;font-weight:900">Centro de Recursos para Associados ↗</a> · <a href="https://www.lionsclubs.org/pt/discover-our-clubs/presidential-theme" target="_blank" rel="noreferrer" style="color:#00338d;font-weight:900">Lema presidencial ↗</a></p><div class="pageFooter"><span>Lions Clube Juazeiro do Norte · AL 2025/2026</span><span>Revista nº '+issue.number+'</span></div></section>';
  }
  function patch(){
    if(!location.pathname.startsWith('/revista'))return;
    ensureStyles();
    const issue=current();
    rewriteSidebar(issue);
    replaceText(issue);
    if(issue.id==='al-2025-2026-003'){showSoon(issue);return;}
    if(issue.id==='al-2025-2026-001')fillIssue1Research();
    if(issue.id==='al-2025-2026-002')fillIssue2Research();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
  setTimeout(patch,700);setTimeout(patch,1800);setTimeout(patch,3200);
})();
`;

export default function RevistaIssuesPatch(){return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});}
