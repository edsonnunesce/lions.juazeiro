import React from 'react';
import revistaDb from '../data/lions-revista-db';

const fmt = new Intl.NumberFormat('pt-BR');
const money = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD',maximumFractionDigits:0});
const l = revistaDb.lcif;

const css = `
  .lcif{width:min(1180px,92vw);margin:0 auto;padding:64px 0;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;color:#172033}.heroLcif{border-radius:34px;padding:48px;background:radial-gradient(circle at 82% 18%,#ffcc0066,transparent 30%),linear-gradient(135deg,#061b45,#00338d);color:white;box-shadow:0 24px 70px #00195033}.heroLcif small{display:inline-flex;border:1px solid #ffffff40;background:#ffffff22;border-radius:999px;padding:8px 12px;font-weight:900}.heroLcif h1{font-size:clamp(2.8rem,6vw,5.6rem);line-height:.9;letter-spacing:-.07em;margin:18px 0}.heroLcif p{color:#dbe7ff;font-size:1.12rem;max-width:850px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:22px}.card{background:white;border:1px solid #d9e2ef;border-radius:24px;padding:24px;box-shadow:0 18px 45px #00195016}.card h2{color:#00338d;margin:0 0 8px}.card b{display:block;color:#00338d;font-size:1.8rem}.wide{grid-column:1/-1}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;border-radius:999px;background:#ffcc00;color:#172033;font-weight:950;text-decoration:none;padding:0 18px;margin-top:12px}.blue{background:#0a48bd;color:white}.list{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:16px}.list div{background:#f8fbff;border:1px solid #d9e2ef;border-radius:18px;padding:16px}@media(max-width:760px){.grid,.list{grid-template-columns:1fr}.heroLcif{padding:30px}}
`;

export const metadata = { title: 'LCIF | Lions Clube Juazeiro do Norte' };

export default function LcifPage(){
  return React.createElement(React.Fragment,null,
    React.createElement('style',{dangerouslySetInnerHTML:{__html:css}}),
    React.createElement('main',{className:'lcif'},
      React.createElement('section',{className:'heroLcif'},
        React.createElement('small',null,'LCIF'),
        React.createElement('h1',null,'A Fundação que amplia o servir.'),
        React.createElement('p',null,l.mission),
        React.createElement('a',{className:'btn',href:'/revista/al-2025-2026-001'},'Ver LCIF na revista')
      ),
      React.createElement('section',{className:'grid'},
        React.createElement('article',{className:'card'},React.createElement('h2',null,'Fundação'),React.createElement('b',null,l.foundedAt),React.createElement('p',null,'LCIF foi criada para ampliar a capacidade de serviço dos Lions clubes.')),
        React.createElement('article',{className:'card'},React.createElement('h2',null,'Subsídios desde 1968'),React.createElement('b',null,fmt.format(l.impact.grantsSince1968)),React.createElement('p',null,'Base oficial para histórias de impacto e oportunidades.')),
        React.createElement('article',{className:'card'},React.createElement('h2',null,'Socorro em catástrofes'),React.createElement('b',null,money.format(l.impact.disasterReliefSupportUSD)),React.createElement('p',null,'Apoio humanitário em momentos de emergência.')),
        React.createElement('article',{className:'card'},React.createElement('h2',null,'Subsídios 2024/2025'),React.createElement('b',null,fmt.format(l.impact.annualReport2024_2025.grantsAwarded)),React.createElement('p',null,money.format(l.impact.annualReport2024_2025.grantsTotalUSD)+' em subsídios no ciclo.')),
        React.createElement('article',{className:'card'},React.createElement('h2',null,'Lions Quest'),React.createElement('b',null,fmt.format(l.impact.lionsQuestStudents)),React.createElement('p',null,'Estudantes beneficiados por programas de habilidades para a vida.')),
        React.createElement('article',{className:'card'},React.createElement('h2',null,'SightFirst'),React.createElement('b',null,fmt.format(l.impact.sightFirst.impactedLives)),React.createElement('p',null,'Vidas impactadas em projetos de visão.')),
        React.createElement('article',{className:'card wide'},
          React.createElement('h2',null,'Como isso alimenta o site e a revista'),
          React.createElement('div',{className:'list'},
            l.magazineSections.map(item=>React.createElement('div',{key:item},React.createElement('b',null,item),React.createElement('span',null,'Bloco editorial mensal para conectar dados globais, Distrito LA-4 e campanhas locais.')))
          ),
          React.createElement('a',{className:'btn blue',href:'/revista'},'Abrir revista mensal')
        )
      )
    )
  );
}
