import React from 'react';
import { MAIN_NAV, UTILITY_NAV, SITE_NAME, TAGLINE } from '../page';

export const metadata={title:'Quem somos | Lions Clube Juazeiro do Norte',description:'Conheça o Lions Clube Juazeiro do Norte, sua atuação, valores e o Hino do Lions.'};

const css=`
:root{--b:#00338d;--n:#061b45;--y:#ffcc00;--t:#172033;--m:#65758b;--l:#d9e2ef}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,Segoe UI,Arial,sans-serif;color:var(--t)}a{text-decoration:none;color:inherit}.w{width:min(1180px,92vw);margin:auto}.siteHeader{position:sticky;top:0;z-index:10;background:#fffffff2;backdrop-filter:blur(14px);border-bottom:1px solid var(--l)}.utility{border-bottom:1px solid var(--l);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase}.utility .w,.brandRow,.mainNav{display:flex;align-items:center;justify-content:space-between;gap:22px}.utility .w{padding:9px 0}.utilityLinks,.mainMenu,.headerActions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}.utilityLinks a,.mainMenu a{font-weight:900}.brandRow{padding:22px 0 18px}.brand{display:flex;align-items:center;gap:16px;font-weight:950;font-size:clamp(1.45rem,3vw,2.1rem)}.brand img{width:72px;height:72px;object-fit:contain}.brand small{display:block;color:var(--b);font-size:.9rem}.headerActions a{min-height:44px;border-radius:10px;padding:0 18px;display:flex;align-items:center;justify-content:center;font-weight:950}.join{background:#0a48bd;color:#fff}.donate{background:var(--y)}.mainNav{padding-bottom:18px}.mainMenu a{padding:8px 0;border-bottom:3px solid transparent}.mainMenu a.on{color:var(--b);border-color:var(--y)}.hero{background:linear-gradient(135deg,#eef5ff,#fff8d6);padding:72px 0}.ey{display:inline-flex;align-items:center;gap:8px;font-weight:900;color:#e44d2e;text-transform:uppercase;letter-spacing:.1em;font-size:.82rem}.hero h1{font-size:clamp(2.8rem,6vw,5.2rem);line-height:.92;letter-spacing:-.07em;color:var(--b);margin:14px 0}.hero p{font-size:1.15rem;color:var(--m);max-width:780px}.content{padding:54px 0}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card,.hinoCard{border:1px solid var(--l);border-radius:24px;background:#fff;padding:24px;box-shadow:0 18px 45px #00195016}.card h2,.hinoCard h2{color:var(--b);margin-top:0}.card p,.hinoCard p{color:var(--m)}.hinoCard{margin-top:22px;background:linear-gradient(135deg,#061b45,#00338d);color:white;display:flex;justify-content:space-between;gap:24px;align-items:center}.hinoCard h2,.hinoCard p{color:white}.hinoCard a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 18px;border-radius:999px;background:var(--y);color:#172033;font-weight:950;white-space:nowrap}.foot{background:var(--n);color:#dbe7ff;padding:42px 0;margin-top:50px}.foot h2{color:white}.foot p{color:#cbd7f2}@media(max-width:900px){.utility .w,.brandRow,.mainNav{align-items:flex-start;flex-direction:column}.grid{grid-template-columns:1fr}.hinoCard{display:block}.hinoCard a{margin-top:12px}.brand img{width:60px;height:60px}}
`;

function Header(){
  return <header className="siteHeader">
    <div className="utility"><div className="w"><div className="utilityLinks">{UTILITY_NAV.map(x=><a href={x[0]} key={x[0]}>{x[1]}</a>)}</div></div></div>
    <div className="brandRow w">
      <a className="brand" href="/"><img src="/logo.png" alt={SITE_NAME}/><span>{SITE_NAME}<small>{TAGLINE}</small></span></a>
      <div className="headerActions"><a className="join" href="/voluntariado">Participar</a><a className="donate" href="/campanhas">Apoiar</a></div>
    </div>
    <nav className="mainNav w"><div className="mainMenu">{MAIN_NAV.map(x=><a href={x[0]} className={x[0]==='/quem-somos'?'on':''} key={x[0]}>{x[1]}</a>)}</div></nav>
  </header>;
}

export default function QuemSomosPage(){
  return <>
    <style dangerouslySetInnerHTML={{__html:css}}/>
    <Header/>
    <section className="hero"><div className="w"><span className="ey">Serviço local</span><h1>Quem somos</h1><p>O Lions Clube Juazeiro do Norte transforma necessidades da comunidade em campanhas, parcerias e ações concretas.</p></div></section>
    <main className="w content">
      <section className="grid">
        <article className="card"><h2>Rede global</h2><p>Integramos a tradição de Lions International: clubes formados por voluntários que servem suas comunidades.</p></article>
        <article className="card"><h2>Atuação no Cariri</h2><p>Organizamos iniciativas em visão, fome, juventude, meio ambiente, diabetes, romarias e apoio humanitário.</p></article>
        <article className="card"><h2>Valores</h2><p>Serviço, integridade, colaboração, diversidade, inovação e excelência orientam a atuação do clube.</p></article>
      </section>
      <section className="hinoCard"><div><h2>Hino do Lions</h2><p>Acesse a página oficial do hino e acompanhe sua letra completa.</p></div><a href="/hino">Abrir página do Hino</a></section>
      <section className="card" style={{marginTop:22}}><h2>Propósito do portal</h2><p>Centralizar campanhas, diretoria, voluntariado, transparência e comunicação oficial do Lions Clube Juazeiro do Norte.</p></section>
    </main>
    <footer className="foot"><div className="w"><h2>{SITE_NAME}</h2><p>{TAGLINE}</p></div></footer>
  </>;
}
