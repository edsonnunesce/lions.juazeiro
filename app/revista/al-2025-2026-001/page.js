import React from 'react';
import revistaDb from '../../data/lions-revista-db';
import PrintButton from '../../PrintButton';

const fmt = new Intl.NumberFormat('pt-BR');
const money = new Intl.NumberFormat('pt-BR',{style:'currency',currency:'USD',maximumFractionDigits:0});
const issue = revistaDb.monthlyMagazine.issues[0];
const impact = revistaDb.global.impact;
const lcif = revistaDb.lcif.impact;

const css = `
  .bar{position:sticky;top:0;background:white;border-bottom:1px solid #d9e2ef;z-index:20;padding:12px}.bar div{width:min(980px,92vw);margin:auto;display:flex;justify-content:space-between;gap:12px}.mag{width:min(980px,92vw);margin:28px auto 80px;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;color:#172033}.cover{border-radius:34px;padding:44px;background:linear-gradient(135deg,#061b45,#00338d);color:white;box-shadow:0 24px 70px #00195033}.cover h1{font-size:clamp(3rem,8vw,6rem);line-height:.9;letter-spacing:-.07em}.cover p{color:#dbe7ff;font-size:1.12rem}.page{margin-top:28px;background:white;border:1px solid #d9e2ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px #00195014}.page h2{color:#00338d;margin-top:0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.stat{background:#f8fbff;border:1px solid #d9e2ef;border-radius:18px;padding:16px}.stat b{display:block;color:#00338d;font-size:1.55rem}.btn{border:0;border-radius:999px;background:#ffcc00;color:#172033;font-weight:900;padding:12px 18px;text-decoration:none}.sources li{margin:8px 0;color:#65758b}.sources a{color:#00338d}@media(max-width:760px){.grid{grid-template-columns:1fr}.cover{padding:28px}}@media print{.bar{display:none}.mag{width:100%;margin:0}.cover,.page{box-shadow:none;border-radius:0;border:0}.page{break-before:page}}
`;

export const metadata = { title: issue.title + ' | Lions Clube Juazeiro do Norte' };

function Stat({label,value}){
  return React.createElement('div',{className:'stat'},React.createElement('b',null,value),React.createElement('span',null,label));
}

export default function IssuePage(){
  return React.createElement(React.Fragment,null,
    React.createElement('style',{dangerouslySetInnerHTML:{__html:css}}),
    React.createElement('div',{className:'bar'},React.createElement('div',null,React.createElement('a',{className:'btn',href:'/revista'},'Revista mensal'),React.createElement(PrintButton))),
    React.createElement('main',{className:'mag'},
      React.createElement('section',{className:'cover'},React.createElement('p',null,revistaDb.localClub.name+' · '+revistaDb.dla4.cycle),React.createElement('h1',null,'Revista AL nº 1'),React.createElement('p',null,issue.coverLine+'. Edição modelo para reunir impacto global, LCIF, Distrito LA-4 e ações locais.')),
      React.createElement('section',{className:'page'},React.createElement('h2',null,'Impacto global Lions'),React.createElement('div',{className:'grid'},React.createElement(Stat,{label:'pessoas servidas',value:fmt.format(impact.peopleServed)}),React.createElement(Stat,{label:'projetos de serviço',value:fmt.format(impact.projectsCompleted)}),React.createElement(Stat,{label:'subsídios LCIF desde 1968',value:fmt.format(impact.lcifGrantsSince1968)}))),
      React.createElement('section',{className:'page'},React.createElement('h2',null,'LCIF: a Fundação que amplia o servir'),React.createElement('p',null,revistaDb.lcif.mission),React.createElement('div',{className:'grid'},React.createElement(Stat,{label:'subsídios 2024/2025',value:money.format(lcif.annualReport2024_2025.grantsTotalUSD)}),React.createElement(Stat,{label:'subsídios concedidos',value:fmt.format(lcif.annualReport2024_2025.grantsAwarded)}),React.createElement(Stat,{label:'SightFirst vidas impactadas',value:fmt.format(lcif.sightFirst.impactedLives)}))),
      React.createElement('section',{className:'page'},React.createElement('h2',null,'Distrito LA-4 e Juazeiro do Norte'),React.createElement('p',null,revistaDb.dla4.name+' · '+revistaDb.dla4.state+' · '+revistaDb.dla4.mottoFromLogo),React.createElement('p',null,'As campanhas locais serão atualizadas manualmente com data, local, fotos, parceiros, pessoas atendidas e validação da diretoria.')),
      React.createElement('section',{className:'page'},React.createElement('h2',null,'Fontes'),React.createElement('ol',{className:'sources'},revistaDb.sources.map(s=>React.createElement('li',{key:s.id},React.createElement('a',{href:s.url,target:'_blank'},s.title),' — ',s.scope))))
    )
  );
}
