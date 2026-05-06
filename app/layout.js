import React from 'react';

export const metadata = {
  title: 'Lions Clube Juazeiro do Norte',
  description: 'Site institucional do Lions Clube Juazeiro do Norte: campanhas, diretoria, voluntariado, transparência e painel administrativo.'
};

const globalEnhancements = `
  .headerActions a.join,
  .headerActions a.donate,
  .headerActions a {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    line-height: 1 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .heroCard > p { display: none !important; }
  .heroCard .stats { grid-template-columns: repeat(3, 1fr) !important; }
  .heroCard .stats > div:nth-child(4) { display: none !important; }

  .searchOverlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding: 7vh 18px 24px;
    background: rgba(5, 17, 42, .72);
    backdrop-filter: blur(10px);
  }

  .searchOverlay.open { display: flex; }

  .searchModal {
    width: min(760px, 96vw);
    max-height: 84vh;
    overflow: auto;
    background: #fff;
    border-radius: 24px;
    border: 1px solid #d9e2ef;
    box-shadow: 0 30px 80px rgba(0, 25, 80, .35);
    padding: 22px;
  }

  .searchHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
  }

  .searchHead h2 {
    margin: 0;
    color: #00338d;
    font-size: 1.55rem;
  }

  .searchClose {
    width: 42px !important;
    height: 42px !important;
    max-width: 42px !important;
    min-height: 42px !important;
    border-radius: 50% !important;
    padding: 0 !important;
    background: #eef4ff !important;
    color: #00338d !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .searchForm {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    margin-bottom: 14px;
  }

  .searchForm input {
    width: 100%;
    min-height: 52px;
    border: 1px solid #d9e2ef;
    border-radius: 16px;
    padding: 0 15px;
    font: inherit;
    outline: none;
  }

  .searchForm input:focus { border-color: #00338d; box-shadow: 0 0 0 4px rgba(0, 51, 141, .10); }

  .searchForm button {
    min-height: 52px !important;
    border-radius: 16px !important;
    max-width: none !important;
    padding: 0 20px !important;
    background: #ffcc00 !important;
    color: #111827 !important;
  }

  .searchHint {
    margin: 0 0 14px;
    color: #65758b;
    font-size: .92rem;
  }

  .searchResults {
    display: grid;
    gap: 10px;
  }

  .searchResult {
    display: block;
    border: 1px solid #d9e2ef;
    border-radius: 18px;
    padding: 15px;
    background: #fff;
  }

  .searchResult:hover { background: #f5f8fc; border-color: #b9c9e6; }
  .searchResult b { display: block; color: #00338d; margin-bottom: 3px; }
  .searchResult span { color: #65758b; font-size: .94rem; }

  .searchEmpty {
    padding: 16px;
    border-radius: 18px;
    background: #fff8d6;
    border: 1px solid #fde68a;
    color: #634900;
  }

  @media (max-width: 560px) {
    .heroCard .stats { grid-template-columns: 1fr !important; }
    .searchForm { grid-template-columns: 1fr; }
    .searchForm button { width: 100% !important; }
  }
`;

const searchScript = `
(function(){
  const pages = [
    { title: 'Início', url: '/', text: 'home inicio nós servimos cariri ceará lions clube juazeiro do norte campanhas diretoria voluntariado transparência comunicação institucional' },
    { title: 'Quem somos', url: '/quem-somos', text: 'quem somos rede global serviço local atuação cariri valores propósito portal lions clube juazeiro do norte' },
    { title: 'História', url: '/historia', text: 'história lions melvin jones chicago associação clubes helen keller lcif fundação 1917 1920 1925 1968 1976' },
    { title: 'Juazeiro do Norte', url: '/juazeiro-do-norte', text: 'juazeiro do norte cariri ceará romarias comércio cultura padre cícero população território escolarização acolhimento mobilização' },
    { title: 'Campanhas', url: '/campanhas', text: 'campanhas mutirão visão cariri fome mesa solidária juventude paz meio ambiente diabetes acolher romarias ação comunitária voluntários resultados' },
    { title: 'Diretoria', url: '/diretoria', text: 'diretoria governança presidência secretaria tesouraria comunicação marketing campanhas lcif leo juventude conselho fiscal nominata' },
    { title: 'Voluntariado', url: '/voluntariado', text: 'voluntariado participar voluntário parceiro empresa escola saúde imprensa ajudar apoiar registrar interesse contato mensagem' },
    { title: 'Transparência', url: '/transparencia', text: 'transparência relatórios campanhas parceiros metas resultados prestação de contas cnpj endereço dados públicos situação ativa' },
    { title: 'Área administrativa', url: '/admin', text: 'admin área administrativa painel acesso restrito login usuários campanhas diretoria exportar portal interno senha perfis' }
  ];

  function normalize(value){
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  }

  function ensureOverlay(){
    let overlay = document.getElementById('globalSearchOverlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'globalSearchOverlay';
    overlay.className = 'searchOverlay';
    overlay.innerHTML = '<div class="searchModal" role="dialog" aria-modal="true" aria-label="Busca no site"><div class="searchHead"><h2>Buscar no site</h2><button class="searchClose" type="button" aria-label="Fechar busca">×</button></div><form class="searchForm"><input id="globalSearchInput" type="search" placeholder="Busque por campanhas, diretoria, voluntariado, transparência..." autocomplete="off"><button type="submit">Buscar</button></form><p class="searchHint">Digite uma palavra ou tema. Exemplo: visão, diretoria, CNPJ, voluntariado, Juazeiro, campanhas.</p><div id="globalSearchResults" class="searchResults"></div></div>';
    document.body.appendChild(overlay);

    const close = overlay.querySelector('.searchClose');
    const form = overlay.querySelector('.searchForm');
    const input = overlay.querySelector('#globalSearchInput');

    close.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function(event){ if (event.target === overlay) closeSearch(); });
    form.addEventListener('submit', function(event){ event.preventDefault(); runSearch(input.value); });
    input.addEventListener('input', function(){ runSearch(input.value); });

    return overlay;
  }

  function openSearch(){
    const overlay = ensureOverlay();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const input = overlay.querySelector('#globalSearchInput');
    input.focus();
    input.select();
    runSearch(input.value);
  }

  function closeSearch(){
    const overlay = document.getElementById('globalSearchOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function runSearch(query){
    const overlay = ensureOverlay();
    const box = overlay.querySelector('#globalSearchResults');
    const q = normalize(query).trim();

    if (!q) {
      box.innerHTML = pages.map(function(page){
        return '<a class="searchResult" href="' + page.url + '"><b>' + page.title + '</b><span>' + page.text.slice(0, 145) + '...</span></a>';
      }).join('');
      return;
    }

    const terms = q.split(/\\s+/).filter(Boolean);
    const results = pages.map(function(page){
      const haystack = normalize(page.title + ' ' + page.text);
      const score = terms.reduce(function(total, term){ return total + (haystack.includes(term) ? 1 : 0); }, 0);
      return Object.assign({}, page, { score: score });
    }).filter(function(page){ return page.score > 0; }).sort(function(a,b){ return b.score - a.score || a.title.localeCompare(b.title); });

    if (!results.length) {
      box.innerHTML = '<div class="searchEmpty">Nenhum resultado encontrado. Tente buscar por campanhas, diretoria, voluntariado, transparência ou Juazeiro.</div>';
      return;
    }

    box.innerHTML = results.map(function(page){
      return '<a class="searchResult" href="' + page.url + '"><b>' + page.title + '</b><span>' + page.text.slice(0, 165) + '...</span></a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.searchBtn').forEach(function(button){
      button.setAttribute('type', 'button');
      button.addEventListener('click', openSearch);
    });
  });

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') closeSearch();
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });
})();
`;

export default function RootLayout(props) {
  return React.createElement(
    'html',
    { lang: 'pt-BR' },
    React.createElement(
      'body',
      null,
      React.createElement('style', { dangerouslySetInnerHTML: { __html: globalEnhancements } }),
      props.children,
      React.createElement('script', { dangerouslySetInnerHTML: { __html: searchScript } })
    )
  );
}
