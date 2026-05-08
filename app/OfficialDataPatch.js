import React from 'react';

const script = `
(function(){
  const officialDirectors = [
    ['Presidente do clube','Arlete de Sá Barreto','AL 2026/2027'],
    ['Primeiro Vice-Presidente de Clube','PDG PMJF Francisco Mauricio Gomes da Silva','AL 2026/2027'],
    ['Segundo Vice-Presidente de Clube','Maria Ozilauba Coelho Batista','AL 2026/2027'],
    ['Secretário do clube','José Batista Neto','AL 2026/2027'],
    ['Tesoureiro do clube','Gildemar Grangeiro Pereira','AL 2026/2027'],
    ['Assessor de Aumento de Associados do clube','Josino Pinheiro Torres','AL 2026/2027'],
    ['Coordenador de LCIF de Clube','PDG PMJF Francisco Mauricio Gomes da Silva','AL 2026/2027'],
    ['Assessor de Serviços do clube','Elizabeth De Sá Barreto Sabiá','AL 2026/2027'],
    ['Assessor de Marketing','Edson Nunes Pereira','AL 2026/2027'],
    ['Diretor de Clube','Vicência da Silva Pinheiro de Sousa','AL 2026/2027']
  ];
  const officialClub = {
    founded:'22/07/1956',
    number:'17173',
    district:'LA-4',
    meetings:'1ª e 3ª quarta-feira, às 20h',
    address:'Sede do Clube · Rua Lions Clube Nº 29, Bairro Leandro Bezerra, Juazeiro do Norte - CE',
    cycle:'AL 2026/2027'
  };
  function esc(v){return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function replaceDirectors(){
    const grid=document.getElementById('directorGrid');
    if(!grid)return;
    grid.innerHTML=officialDirectors.map(d=>'<article><div class="avatar">'+esc(d[0][0])+'</div><h2>'+esc(d[0])+'</h2><p><b>'+esc(d[1])+'</b></p><p>'+esc(d[2])+'</p></article>').join('');
    const notice=document.createElement('section');
    notice.className='notice officialNotice';
    notice.innerHTML='<b>Dados oficiais atualizados:</b> nominata pública do Lions Clubs International para '+officialClub.cycle+'. Contatos pessoais e endereços residenciais não foram publicados na área pública.';
    if(!document.querySelector('.officialNotice')) grid.after(notice);
  }
  function updateHistoryAndTransparency(){
    document.querySelectorAll('.timeline p').forEach(p=>{if(p.textContent.includes('1976'))p.innerHTML='<b>1956</b><span>O documento oficial de Dirigentes de Lions Clube 2026/2027 informa a fundação do Lions Clube Juazeiro do Norte em '+officialClub.founded+'.</span>'});
    document.querySelectorAll('.stats div').forEach(div=>{if(div.textContent.includes('1976'))div.innerHTML='<b>1956</b><span>fundado em '+officialClub.founded+'</span>';if(div.textContent.includes('17173'))div.innerHTML='<b>17173</b><span>número internacional do clube</span>'});
    document.querySelectorAll('.content article').forEach(article=>{
      if(article.textContent.includes('Dados públicos locais')){
        article.innerHTML='<h2>Dados oficiais do clube</h2><p><b>Clube:</b> Lions Clube Juazeiro do Norte</p><p><b>Nº internacional:</b> '+officialClub.number+'</p><p><b>Distrito:</b> '+officialClub.district+'</p><p><b>Fundação:</b> '+officialClub.founded+'</p><p><b>Reuniões:</b> '+officialClub.meetings+'</p><p><b>Sede:</b> '+officialClub.address+'</p>';
      }
    });
  }
  function seedAdminLocal(){
    try{
      const key='lj_directors';
      const current=JSON.parse(localStorage.getItem(key)||'[]');
      const hasOfficial=current.some(x=>String(x[2]||'').includes('2026/2027'));
      if(!hasOfficial)localStorage.setItem(key,JSON.stringify(officialDirectors));
    }catch(e){}
  }
  function boot(){seedAdminLocal();replaceDirectors();updateHistoryAndTransparency();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  setTimeout(boot,500);setTimeout(boot,1500);
})();
`;

export default function OfficialDataPatch(){
  return React.createElement('script',{dangerouslySetInnerHTML:{__html:script}});
}
