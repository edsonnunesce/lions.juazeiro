import React from 'react';
import revistaDb from '../data/lions-revista-db';

const css = `
  .magWrap{width:min(1180px,92vw);margin:0 auto;padding:64px 0;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;color:#172033}.magHero{border-radius:32px;padding:46px;background:linear-gradient(135deg,#061b45,#00338d);color:white;box-shadow:0 18px 45px #00195022}.magHero small{display:inline-flex;padding:8px 12px;border-radius:999px;background:#ffffff22;border:1px solid #ffffff33;font-weight:800}.magHero h1{font-size:clamp(2.4rem,5vw,4.8rem);line-height:.95;letter-spacing:-.06em;margin:18px 0}.magHero p{font-size:1.1rem;color:#dbe7ff;max-width:820px}.magGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:28px}.magCard{background:white;border:1px solid #d9e2ef;border-radius:24px;padding:24px;box-shadow:0 18px 45px #00195018}.magCard h2{color:#00338d;margin-top:0}.magBtn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;background:#ffcc00;color:#172033;font-weight:900;text-decoration:none;padding:0 18px;margin-top:12px}.issueList{margin-top:28px}.issueRow{display:flex;justify-content:space-between;gap:18px;align-items:center;background:#f8fbff;border:1px solid #d9e2ef;border-radius:22px;padding:18px;margin-top:12px}.issueRow b{color:#00338d}@media(max-width:800px){.magGrid{grid-template-columns:1fr}.issueRow{display:block}.magHero{padding:30px}}
`;

export const metadata = { title: 'Revista Mensal | Lions Clube Juazeiro do Norte' };

export default function RevistaPage(){
  const issue = revistaDb.monthlyMagazine.issues[0];
  return React.createElement(React.Fragment,null,
    React.createElement('style',{dangerouslySetInnerHTML:{__html:css}}),
    React.createElement('main',{className:'magWrap'},
      React.createElement('section',{className:'magHero'},
        React.createElement('small',null,revistaDb.monthlyMagazine.series),
        React.createElement('h1',null,'Revista Virtual do Lions Clube Juazeiro do Norte'),
        React.createElement('p',null,'Banco editorial para transformar campanhas, impacto global, Distrito LA-4, Distrito Múltiplo LA e atividades locais em edições mensais exibidas no site e exportáveis em PDF.'),
        React.createElement('a',{className:'magBtn',href:'/revista/al-2025-2026-001'},'Abrir edição atual nº 1')
      ),
      React.createElement('section',{className:'magGrid'},
        React.createElement('article',{className:'magCard'},React.createElement('h2',null,'Impacto global'),React.createElement('p',null,'Base mensal com dados oficiais de Lions International e LCIF.')),
        React.createElement('article',{className:'magCard'},React.createElement('h2',null,'Brasil, DMLA e LA-4'),React.createElement('p',null,'Estrutura para notícias e campanhas do Brasil, Distrito Múltiplo LA e Distrito LA-4 Ceará.')),
        React.createElement('article',{className:'magCard'},React.createElement('h2',null,'Juazeiro do Norte'),React.createElement('p',null,'Área para registrar atividades locais, pessoas atendidas, parceiros, fotos e relatórios.'))
      ),
      React.createElement('section',{className:'issueList'},
        React.createElement('h2',null,'Edições'),
        React.createElement('div',{className:'issueRow'},
          React.createElement('div',null,React.createElement('b',null,issue.title),React.createElement('p',null,issue.month+' · '+issue.status)),
          React.createElement('a',{className:'magBtn',href:'/revista/'+issue.id},'Ler revista')
        )
      )
    )
  );
}
