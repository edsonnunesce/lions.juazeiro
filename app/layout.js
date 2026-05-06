import React from 'react';

export const metadata = {
  title: 'Lions Clube Juazeiro do Norte',
  description: 'Site institucional do Lions Clube Juazeiro do Norte: campanhas, diretoria, voluntariado, transparência e painel administrativo.'
};

const mobileMenuFix = `
  .headerActions a.join,
  .headerActions a.donate,
  .headerActions a {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    line-height: 1 !important;
  }

  .mobileFullMenu,
  .mobileMenuTitle,
  .mobileMenuActions {
    display: none;
  }

  @media (max-width: 960px) {
    body.mobile-menu-open { overflow: hidden; }

    .siteHeader {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
      background: #fff !important;
      border-bottom: 1px solid #d9e2ef !important;
      box-shadow: 0 8px 24px rgba(0,25,80,.08) !important;
    }

    .utility {
      display: none !important;
    }

    .brandRow {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
      padding: 10px 0 !important;
      width: min(1180px, 92vw) !important;
      margin: auto !important;
    }

    .brand {
      min-width: 0 !important;
      flex: 1 1 auto !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      font-size: clamp(1rem, 4vw, 1.2rem) !important;
      line-height: 1.05 !important;
      letter-spacing: -.045em !important;
      color: #172033 !important;
    }

    .brand > span:last-child {
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .brand small {
      display: none !important;
    }

    .mark {
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      border-width: 3px !important;
      box-shadow: none !important;
    }

    .mark span {
      width: 24px !important;
      height: 24px !important;
      border-width: 2px !important;
      font-size: .9rem !important;
    }

    .headerActions {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      width: auto !important;
      margin: 0 !important;
      gap: 0 !important;
      flex: 0 0 auto !important;
    }

    .headerActions a,
    .headerActions .join,
    .headerActions .donate {
      display: none !important;
    }

    .searchBtn {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      max-width: 44px !important;
      border-radius: 14px !important;
      border: 1px solid #cfd8e8 !important;
      background: #fff !important;
      color: #111827 !important;
      padding: 0 !important;
      font-size: 0 !important;
      line-height: 0 !important;
      box-shadow: 0 8px 22px rgba(0,25,80,.08) !important;
    }

    .searchBtn::before {
      content: '☰' !important;
      display: block !important;
      font-size: 28px !important;
      line-height: 1 !important;
      font-weight: 900 !important;
      color: #111827 !important;
      transform: translateY(-1px);
    }

    .siteHeader.mobile-open .searchBtn::before {
      content: '×' !important;
      font-size: 34px !important;
      font-weight: 500 !important;
      transform: translateY(-2px);
    }

    .mainNav {
      display: none !important;
      position: fixed !important;
      top: 64px !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: calc(100dvh - 64px) !important;
      overflow-y: auto !important;
      overscroll-behavior: contain !important;
      background: #fff !important;
      padding: 18px 4vw max(26px, env(safe-area-inset-bottom)) !important;
      border-top: 1px solid #d9e2ef !important;
      box-shadow: 0 30px 80px rgba(0,25,80,.18) !important;
    }

    .siteHeader.mobile-open .mainNav {
      display: block !important;
    }

    .siteHeader.mobile-open .mainMenu,
    .siteHeader.mobile-open .memberLink {
      display: none !important;
    }

    .siteHeader.mobile-open .mobileMenuTitle {
      display: block !important;
      margin: 0 0 14px !important;
      color: #00338d !important;
      font-size: 1.05rem !important;
      font-weight: 950 !important;
      letter-spacing: .08em !important;
      text-transform: uppercase !important;
    }

    .siteHeader.mobile-open .mobileFullMenu {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
      width: 100% !important;
    }

    .mobileFullMenu a {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      min-height: 54px !important;
      padding: 13px 14px !important;
      border: 1px solid #d9e2ef !important;
      border-radius: 16px !important;
      background: #f8fbff !important;
      color: #172033 !important;
      font-size: clamp(.94rem, 3.9vw, 1.05rem) !important;
      line-height: 1.1 !important;
      font-weight: 950 !important;
      letter-spacing: -.02em !important;
      text-transform: none !important;
      white-space: normal !important;
      word-break: normal !important;
      box-shadow: none !important;
    }

    .mobileFullMenu a:hover,
    .mobileFullMenu a.active {
      color: #00338d !important;
      border-color: #ffcc00 !important;
      background: #fff8d6 !important;
    }

    .mobileFullMenu a.mobileAdmin {
      grid-column: 1 / -1 !important;
      color: #7a288a !important;
      background: #fbf5ff !important;
      border-color: #e7d7ef !important;
    }

    .siteHeader.mobile-open .mobileMenuActions {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
      margin-top: 14px !important;
    }

    .mobileMenuActions a {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 50px !important;
      border-radius: 16px !important;
      font-size: 1rem !important;
      font-weight: 950 !important;
      text-align: center !important;
      padding: 12px !important;
    }

    .mobileMenuActions .mobileParticipar {
      background: #0a48bd !important;
      color: white !important;
    }

    .mobileMenuActions .mobileApoiar {
      background: #ffcc00 !important;
      color: #111827 !important;
    }

    .topStripe {
      display: none !important;
    }
  }

  @media (max-width: 430px) {
    .siteHeader.mobile-open .mobileFullMenu {
      grid-template-columns: 1fr !important;
    }

    .siteHeader.mobile-open .mobileMenuActions {
      grid-template-columns: 1fr !important;
    }

    .mobileFullMenu a {
      min-height: 50px !important;
      font-size: 1rem !important;
    }
  }
`;

const mobileMenuScript = `
(function(){
  var links = [
    ['/', 'Início'],
    ['/quem-somos', 'Quem somos'],
    ['/historia', 'História'],
    ['/juazeiro-do-norte', 'Juazeiro do Norte'],
    ['/campanhas', 'Campanhas'],
    ['/diretoria', 'Diretoria'],
    ['/voluntariado', 'Voluntariado'],
    ['/transparencia', 'Transparência'],
    ['/admin', 'Área administrativa ↗']
  ];

  function isMobile(){ return window.matchMedia('(max-width: 960px)').matches; }

  function ensureFullMenu(){
    var nav = document.querySelector('.mainNav');
    if (!nav || nav.querySelector('.mobileFullMenu')) return;

    var current = window.location.pathname.replace(/\/$/, '') || '/';
    var title = document.createElement('div');
    title.className = 'mobileMenuTitle';
    title.textContent = 'Menu principal';

    var grid = document.createElement('div');
    grid.className = 'mobileFullMenu';
    grid.innerHTML = links.map(function(item){
      var path = item[0];
      var label = item[1];
      var normalized = path.replace(/\/$/, '') || '/';
      var cls = [];
      if (normalized === current) cls.push('active');
      if (path === '/admin') cls.push('mobileAdmin');
      return '<a class="' + cls.join(' ') + '" href="' + path + '">' + label + '</a>';
    }).join('');

    var actions = document.createElement('div');
    actions.className = 'mobileMenuActions';
    actions.innerHTML = '<a class="mobileParticipar" href="/voluntariado">Participar</a><a class="mobileApoiar" href="/campanhas">Apoiar</a>';

    nav.insertBefore(title, nav.firstChild);
    nav.insertBefore(grid, title.nextSibling);
    nav.appendChild(actions);
  }

  function closeMenu(){
    var header = document.querySelector('.siteHeader');
    if (!header) return;
    header.classList.remove('mobile-open');
    document.body.classList.remove('mobile-menu-open');
  }

  function toggleMenu(event){
    if (!isMobile()) return;
    var button = event.target.closest('.searchBtn');
    if (!button) return;
    var header = document.querySelector('.siteHeader');
    if (!header) return;
    ensureFullMenu();
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var willOpen = !header.classList.contains('mobile-open');
    header.classList.toggle('mobile-open', willOpen);
    document.body.classList.toggle('mobile-menu-open', willOpen);
  }

  function init(){ ensureFullMenu(); }

  document.addEventListener('click', toggleMenu, true);

  document.addEventListener('click', function(event){
    if (!isMobile()) return;
    if (event.target.closest('.mainNav a')) closeMenu();
  }, true);

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function(){ if (!isMobile()) closeMenu(); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
`;

export default function RootLayout(props) {
  return React.createElement(
    'html',
    { lang: 'pt-BR' },
    React.createElement(
      'body',
      null,
      React.createElement('style', { dangerouslySetInnerHTML: { __html: mobileMenuFix } }),
      props.children,
      React.createElement('script', { dangerouslySetInnerHTML: { __html: mobileMenuScript } })
    )
  );
}
