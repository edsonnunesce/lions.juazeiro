'use client';

import React from 'react';
import revistaDb from './data/lions-revista-db';

const fmt = new Intl.NumberFormat('pt-BR');
const money = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD',maximumFractionDigits:0});

const css = `
  .intelHome{width:min(1180px,92vw);margin:0 auto;padding:54px 0 10px;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;color:#172033}.intelHeader{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:22px}.intelHeader small{color:#e44d2e;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.intelHeader h2{font-size:clamp(2rem,4vw,3.3rem);line-height:.95;letter-spacing:-.06em;margin:8px 0;color:#00338d}.intelHeader p{max-width:650px;color:#65758b}.intelGrid{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}.intelCard{background:white;border:1px solid #d9e2ef;border-radius:26px;padding:24px;box-shadow:0 18px 45px #00195016}.intelCard.dark{background:linear-gradient(135deg,#061b45,#00338d);color:white}.intelCard.dark p{color:#dbe7ff}.intelCard h3{margin:0 0 10px;color:#00338d}.intelCard.dark h3{color:white}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:18px}.metric{border-radius:18px;background:#f8fbff;border:1px solid #d9e2ef;padding:16px}.dark .metric{background:#ffffff14;border-color:#ffffff2e}.metric b{display:block;font-size:1.5rem;color:#00338d}.dark .metric b{color:#ffcc00}.causeRow{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:18px}.causePill{border:1px solid #d9e2ef;background:#fff;border-radius:18px;padding:13px;font-weight:900}.causePill span{display:block;color:#65758b;font-weight:700;font-size:.86rem}.intelActions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.intelBtn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;border-radius:999px;background:#ffcc00;color:#172033;font-weight:950;text-decoration:none;padding:0 16px}.intelBtn.blue{background:#0a48bd;color:white}.automation{margin-top:18px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.automation div{border-radius:18px;padding:16px;background:#fff8d6;border:1px solid #fde68a}.automation b{display:block;color:#634900}@media(max-width:900px){.intelHeader,.intelGrid{display:block}.metrics,.causeRow,.automation{grid-template-columns:1fr}.intelCard{margin-top:14px}}
`;

export default function HomeIntelligence(){
  const db = revistaDb;
  const impact = db.global.impact;
  const lcif = db.lcif.impact;
  const causes = db.global.causes.slice(0,4);
  return React.createElement(React.Fragment,null,
    React.createElement('style',{dangerouslySetInnerHTML:{__html:css}}),
    React.createElement('section',{className:'intelHome'},
      React.createElement('div',{className:'intelHeader'},
        React.createElement('div',null,React.createElement('small',null,'Site inteligente e revista mensal'),React.createElement('h2',null,'Dados que se transformam em serviço, memória e revista.')),
        React.createElement('p',null,'O portal deixa de ser apenas institucional: fontes oficiais de Lions International, LCIF, LION Magazine, DMLA e LA-4 alimentam os blocos editoriais e a revista. As campanhas locais do Lions Juazeiro continuam com atualização manual e validação da diretoria.')
      ),
      React.createElement('div',{className:'intelGrid'},
        React.createElement('article',{className:'intelCard dark'},
          React.createElement('h3',null,'Impacto global Lions'),
          React.createElement('p',null,'Base oficial para contextualizar as campanhas locais dentro do movimento internacional.'),
          React.createElement('div',{className:'metrics'},
            React.createElement('div',{className:'metric'},React.createElement('b',null,fmt.format(impact.peopleServed)),React.createElement('span',null,'pessoas servidas')),
            React.createElement('div',{className:'metric'},React.createElement('b',null,fmt.format(impact.projectsCompleted)),React.createElement('span',null,'projetos')),
            React.createElement('div',{className:'metric'},React.createElement('b',null,fmt.format(impact.lcifGrantsSince1968)),React.createElement('span',null,'subsídios LCIF'))
          ),
          React.createElement('div',{className:'intelActions'},React.createElement('a',{className:'intelBtn',href:'/revista'},'Abrir revista mensal'),React.createElement('a',{className:'intelBtn blue',href:'/campanhas'},'Campanhas locais'))
        ),
        React.createElement('article',{className:'intelCard'},
          React.createElement('h3',null,'Cantinho LCIF'),
          React.createElement('p',null,'A fundação global amplia o serviço dos clubes por meio de subsídios, programas, socorro em catástrofes, visão, juventude e apoio humanitário.'),
          React.createElement('div',{className:'metrics'},
            React.createElement('div',{className:'metric'},React.createElement('b',null,money.format(lcif.annualReport2024_2025.grantsTotalUSD)),React.createElement('span',null,'subsídios 2024/2025')),
            React.createElement('div',{className:'metric'},React.createElement('b',null,fmt.format(lcif.annualReport2024_2025.grantsAwarded)),React.createElement('span',null,'subsídios concedidos')),
            React.createElement('div',{className:'metric'},React.createElement('b',null,fmt.format(lcif.cataractSurgeries)),React.createElement('span',null,'cirurgias de catarata'))
          ),
          React.createElement('div',{className:'intelActions'},React.createElement('a',{className:'intelBtn',href:'/lcif'},'Abrir cantinho LCIF'),React.createElement('a',{className:'intelBtn blue',href:'/revista/al-2025-2026-001'},'Ver na revista'))
        )
      ),
      React.createElement('article',{className:'intelCard'},
        React.createElement('h3',null,'Causas globais que orientam nossas campanhas'),
        React.createElement('p',null,'Cada campanha local poderá ser classificada por causa global para formar relatórios mensais, matérias e PDFs.'),
        React.createElement('div',{className:'causeRow'},causes.map(c=>React.createElement('div',{className:'causePill',key:c.name},c.name,React.createElement('span',null,fmt.format(c.peopleServed)+' pessoas servidas'))))
      ),
      React.createElement('div',{className:'automation'},
        React.createElement('div',null,React.createElement('b',null,'Automático'),React.createElement('span',null,'Lions International, LCIF, LION Magazine, DMLA e LA-4.')),
        React.createElement('div',null,React.createElement('b',null,'Manual'),React.createElement('span',null,'Campanhas locais, fotos, parceiros e pessoas atendidas em Juazeiro.')),
        React.createElement('div',null,React.createElement('b',null,'Mensal'),React.createElement('span',null,'Atualiza blocos do site e monta a edição da revista AL.'))
      )
    )
  );
}
