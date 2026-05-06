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

  @media (max-width: 960px) {
    body.mobile-menu-open { overflow: hidden; }

    .siteHeader {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
      background: #fff !important;
      border-bottom: 1px solid #d9e2ef !important;
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
      padding: 12px 0 !important;
      width: min(1180px, 92vw) !important;
      margin: auto !important;
    }

    .brand {
      min-width: 0 !important;
      flex: 1 1 auto !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      font-size: clamp(1.02rem, 4vw, 1.25rem) !important;
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
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      border-width: 3px !important;
      box-shadow: none !important;
    }

    .mark span {
      width: 25px !important;
      height: 25px !important;
      border-width: 2px !important;
      font-size: .95rem !important;
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
      width: 46px !important;
      height: 46px !important;
      min-width: 46px !important;
      min-height: 46px !important;
      max-width: 46px !important;
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
      font-size: 29px !important;
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
      top: 69px !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100vw !important;
      height: calc(100dvh - 69px) !important;
      overflow-y: auto !important;
      background: #fff !important;
      padding: 22px 4vw 32px !important;
      border-top: 1px solid #d9e2ef !important;
      box-shadow: 0 30px 80px rgba(0,25,80,.18) !important;
    }

    .siteHeader.mobile-open .mainNav {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      justify-content: flex-start !important;
      gap: 14px !important;
    }

    .mainMenu {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 8px !important;
      width: 100% !important;
    }

    .mainMenu a,
    .memberLink {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      width: 100% !important;
      min-height: 52px !important;
      padding: 13px 15px !important;
      border: 1px solid #d9e2ef !important;
      border-radius: 16px !important;
      background: #f8fbff !important;
      color: #172033 !important;
      font-size: 1.05rem !important;
      font-weight: 900 !important;
      text-transform: none !important;
    }

    .mainMenu a.on,
    .mainMenu a:hover,
    .memberLink:hover {
      color: #00338d !important;
      border-color: #ffcc00 !important;
      background: #fff8d6 !important;
    }

    .memberLink {
      margin-top: 8px !important;
      border-left: 1px solid #d9e2ef !important;
      padding-left: 15px !important;
      color: #7a288a !important;
    }

    .topStripe {
      display: none !important;
    }
  }
`;

const mobileMenuScript = `
(function(){
  function isMobile(){ return window.matchMedia('(max-width: 960px)').matches; }

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
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var willOpen = !header.classList.contains('mobile-open');
    header.classList.toggle('mobile-open', willOpen);
    document.body.classList.toggle('mobile-menu-open', willOpen);
  }

  document.addEventListener('click', toggleMenu, true);

  document.addEventListener('click', function(event){
    if (!isMobile()) return;
    if (event.target.closest('.mainNav a')) closeMenu();
  }, true);

  document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function(){ if (!isMobile()) closeMenu(); });
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
