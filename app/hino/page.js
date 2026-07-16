import React from 'react';

export const metadata = {
  title: 'Hino Oficial | Lions Clube Juazeiro do Norte',
  description: 'Página institucional dedicada ao Hino Oficial dos Lions Clubes do Brasil — Ser Leão.'
};

const css = `
  :root{--blue:#00338d;--navy:#061b45;--yellow:#ffcc00;--ink:#172033;--muted:#65758b;--line:#d9e2ef;--soft:#f5f8fc}
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--ink);background:#fff;line-height:1.6}
  a{text-decoration:none;color:inherit}
  .page{min-height:100vh;background:linear-gradient(180deg,#fff 0%,#f6f9fd 100%)}
  .top{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5}
  .topInner{width:min(1180px,92vw);margin:auto;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:16px 0}
  .brand{display:flex;align-items:center;gap:14px;color:#4f5360;font-weight:950;font-size:clamp(1.15rem,2.4vw,1.8rem);letter-spacing:-.04em}
  .brand img{width:66px;height:66px;object-fit:contain}
  .brand small{display:block;color:var(--blue);font-size:.8rem;letter-spacing:0}
  .actions{display:flex;gap:10px;flex-wrap:wrap}
  .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;border-radius:999px;background:var(--yellow);font-weight:950;color:#111827}
  .btn.blue{background:var(--blue);color:#fff}
  .hero{background:radial-gradient(circle at 80% 20%,#ffcc0055,transparent 30%),linear-gradient(135deg,var(--navy),var(--blue));color:#fff;overflow:hidden}
  .heroInner{width:min(1180px,92vw);margin:auto;display:grid;grid-template-columns:1fr .72fr;gap:42px;align-items:center;padding:70px 0}
  .eyebrow{display:inline-flex;align-items:center;gap:9px;border:1px solid #ffffff44;background:#ffffff18;border-radius:999px;padding:7px 12px;font-weight:850}
  .eyebrow i{width:9px;height:9px;border-radius:50%;background:var(--yellow)}
  h1{font-size:clamp(3.1rem,7vw,6.6rem);line-height:.9;letter-spacing:-.075em;margin:18px 0 16px}
  .hero p{font-size:clamp(1.05rem,2vw,1.28rem);color:#dbe7ff;max-width:720px;margin:0}
  .seal{display:grid;place-items:center}
  .seal img{width:min(320px,80vw);aspect-ratio:1/1;object-fit:contain;filter:drop-shadow(0 24px 35px #00133877)}
  .content{width:min(960px,92vw);margin:40px auto 70px}
  .intro{background:#fff;border:1px solid var(--line);border-radius:28px;padding:28px;box-shadow:0 18px 45px #00195014}
  .intro h2{margin:0 0 8px;color:var(--blue);font-size:clamp(1.8rem,4vw,2.8rem);letter-spacing:-.04em}
  .meta{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:22px 0}
  .meta article{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:16px}
  .meta b{display:block;color:var(--blue);font-size:.82rem;text-transform:uppercase;letter-spacing:.08em}
  .lyrics{margin-top:22px;background:linear-gradient(180deg,#fffdf4,#fff);border:1px solid #f1df94;border-radius:28px;padding:30px;text-align:center}
  .lyrics h2{margin:0 0 12px;color:var(--navy);font-size:2rem}
  .lyrics p{max-width:700px;margin:0 auto 12px;color:var(--muted)}
  .placeholder{border:1px dashed #e1c95f;border-radius:22px;background:#fffaf0;padding:34px 24px;margin-top:20px;color:#6b5600;font-weight:800}
  .source{margin-top:22px;padding:18px;border-left:5px solid var(--yellow);background:#fff;border-radius:0 16px 16px 0;color:var(--muted)}
  .foot{background:var(--navy);color:#fff;padding:34px 0;margin-top:60px}
  .footInner{width:min(1180px,92vw);margin:auto;display:flex;justify-content:space-between;gap:20px;align-items:center;flex-wrap:wrap}
  .foot small{color:#c8d6f0}
  @media(max-width:760px){.heroInner{grid-template-columns:1fr;padding:48px 0}.seal{order:-1}.seal img{width:190px}.meta{grid-template-columns:1fr}.actions{display:none}.brand img{width:56px;height:56px}.content{margin-top:26px}}
`;

export default function HinoPage(){
  return <main className="page">
    <style dangerouslySetInnerHTML={{__html:css}} />
    <header className="top">
      <div className="topInner">
        <a className="brand" href="/">
          <img src="/logo.png" alt="Lions Clube Juazeiro do Norte" />
          <span>Lions Clube Juazeiro do Norte<small>Nós Servimos — Cariri — Ceará</small></span>
        </a>
        <nav className="actions" aria-label="Navegação da página">
          <a className="btn blue" href="/">Início</a>
          <a className="btn" href="/quem-somos">Quem somos</a>
        </nav>
      </div>
    </header>

    <section className="hero">
      <div className="heroInner">
        <div>
          <span className="eyebrow"><i></i>Identidade leonística</span>
          <h1>Ser Leão</h1>
          <p>Hino Oficial dos Lions Clubes do Brasil, preservado como parte da memória, da cultura e do espírito de serviço do movimento leonístico.</p>
        </div>
        <div className="seal"><img src="/logo.png" alt="Emblema do Lions Clube Juazeiro do Norte" /></div>
      </div>
    </section>

    <section className="content">
      <article className="intro">
        <h2>Hino Oficial dos Lions Clubes do Brasil</h2>
        <p>Esta página foi preparada para reunir a apresentação institucional, os créditos da obra, a letra autorizada e, futuramente, uma versão oficial em áudio.</p>
        <div className="meta">
          <article><b>Título</b>Ser Leão</article>
          <article><b>Uso institucional</b>Reuniões, solenidades e eventos leonísticos</article>
        </div>
      </article>

      <article className="lyrics">
        <h2>Letra do hino</h2>
        <p>A estrutura visual está pronta para receber a letra integral exatamente como utilizada oficialmente pelo clube.</p>
        <div className="placeholder">Espaço reservado para a letra oficial de “Ser Leão”.</div>
      </article>

      <aside className="source">
        <strong>Próxima etapa:</strong> inserir a transcrição oficial validada pelo clube e, quando disponível, acrescentar um arquivo ou link de áudio autorizado.
      </aside>
    </section>

    <footer className="foot">
      <div className="footInner">
        <div><strong>Lions Clube Juazeiro do Norte</strong><br/><small>Nós Servimos — Cariri — Ceará</small></div>
        <a className="btn" href="/">Voltar ao início</a>
      </div>
    </footer>
  </main>;
}