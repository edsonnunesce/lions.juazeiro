import React from 'react';

export const metadata = {
  title: 'Lions Clube Juazeiro do Norte',
  description: 'Site institucional do Lions Clube Juazeiro do Norte: campanhas, diretoria, voluntariado, transparência e painel administrativo.'
};

const independentMenuCss = `
  .globalMobileToggle,
  .globalMobileButton,
  .globalMobilePanel {
    display: none;
  }

  @media (max-width: 960px) {
    .globalMobileToggle {
      position: fixed;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    .globalMobileButton {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 10px;
      right: 4vw;
      width: 44px;
      height: 44px;
      z-index: 2147483000;
      border-radius: 14px;
      border: 1px solid #cfd8e8;
      background: #fff;
      box-shadow: 0 8px 22px rgba(0,25,80,.12);
      color: #111827;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
      font-size: 0;
    }

    .globalMobileButton::before {
      content: '☰';
      font-size: 28px;
      line-height: 1;
      font-weight: 900;
      color: #111827;
      transform: translateY(-1px);
    }

    .globalMobileToggle:checked + .globalMobileButton::before {
      content: '×';
      font-size: 34px;
      font-weight: 500;
      transform: translateY(-2px);
    }

    .globalMobilePanel {
      display: none;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: calc(100dvh - 64px);
      z-index: 2147482999;
      overflow-y: auto;
      overscroll-behavior: contain;
      background: #fff;
      padding: 18px 4vw max(28px, env(safe-area-inset-bottom));
      border-top: 1px solid #d9e2ef;
      box-shadow: 0 30px 80px rgba(0,25,80,.18);
    }

    .globalMobileToggle:checked ~ .globalMobilePanel {
      display: block;
    }

    .globalMobileTitle {
      margin: 0 0 14px;
      color: #00338d;
      font-size: 1.05rem;
      font-weight: 950;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .globalMobileGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      width: 100%;
    }

    .globalMobileGrid a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      min-height: 54px;
      padding: 13px 14px;
      border: 1px solid #d9e2ef;
      border-radius: 16px;
      background: #f8fbff;
      color: #172033;
      font-size: clamp(.94rem, 3.9vw, 1.05rem);
      line-height: 1.1;
      font-weight: 950;
      letter-spacing: -.02em;
      text-decoration: none;
      white-space: normal;
    }

    .globalMobileGrid a:hover,
    .globalMobileGrid a:focus {
      color: #00338d;
      border-color: #ffcc00;
      background: #fff8d6;
      outline: none;
    }

    .globalMobileGrid .adminLink {
      grid-column: 1 / -1;
      color: #7a288a;
      background: #fbf5ff;
      border-color: #e7d7ef;
    }

    .globalMobileInstitutional {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin: 14px 0 0;
      padding-top: 14px;
      border-top: 1px solid #d9e2ef;
    }

    .globalMobileInstitutional a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 11px 10px;
      border-radius: 14px;
      background: #fff;
      color: #172033;
      font-size: clamp(.82rem, 3.3vw, .95rem);
      line-height: 1.05;
      font-weight: 950;
      letter-spacing: .08em;
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
    }

    .globalMobileInstitutional .directorDeskStyle {
      color: #e44d2e;
      text-shadow: 0 0 14px rgba(228,77,46,.25);
    }

    .globalMobileInstitutional .portalDeskStyle,
    .globalMobileInstitutional .contactDeskStyle {
      color: #172033;
    }

    .globalMobileActions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 14px;
    }

    .globalMobileActions a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      border-radius: 16px;
      font-size: 1rem;
      font-weight: 950;
      text-align: center;
      padding: 12px;
      text-decoration: none;
    }

    .globalParticipar { background: #0a48bd; color: #fff; }
    .globalApoiar { background: #ffcc00; color: #111827; }

    .siteHeader .searchBtn {
      opacity: 0 !important;
      pointer-events: none !important;
    }
  }

  @media (max-width: 430px) {
    .globalMobileGrid,
    .globalMobileActions {
      grid-template-columns: 1fr;
    }

    .globalMobileInstitutional {
      grid-template-columns: 1fr;
    }

    .globalMobileGrid a {
      min-height: 50px;
      font-size: 1rem;
    }

    .globalMobileInstitutional a {
      justify-content: flex-start;
      min-height: 48px;
      font-size: 1rem;
      padding-left: 14px;
      text-align: left;
    }
  }
`;

function MobileMenu() {
  return React.createElement(React.Fragment, null,
    React.createElement('input', { id: 'global-mobile-menu', className: 'globalMobileToggle', type: 'checkbox', 'aria-label': 'Abrir menu principal' }),
    React.createElement('label', { className: 'globalMobileButton', htmlFor: 'global-mobile-menu', 'aria-label': 'Abrir menu principal' }),
    React.createElement('nav', { className: 'globalMobilePanel', 'aria-label': 'Menu principal mobile' },
      React.createElement('div', { className: 'globalMobileTitle' }, 'Menu principal'),
      React.createElement('div', { className: 'globalMobileGrid' },
        React.createElement('a', { href: '/' }, 'Início'),
        React.createElement('a', { href: '/quem-somos' }, 'Quem somos'),
        React.createElement('a', { href: '/historia' }, 'História'),
        React.createElement('a', { href: '/juazeiro-do-norte' }, 'Juazeiro do Norte'),
        React.createElement('a', { href: '/campanhas' }, 'Campanhas'),
        React.createElement('a', { href: '/diretoria' }, 'Diretoria'),
        React.createElement('a', { href: '/voluntariado' }, 'Voluntariado'),
        React.createElement('a', { href: '/transparencia' }, 'Transparência'),
        React.createElement('a', { className: 'adminLink', href: '/admin' }, 'Área administrativa ↗')
      ),
      React.createElement('div', { className: 'globalMobileInstitutional' },
        React.createElement('a', { className: 'directorDeskStyle', href: '/diretoria' }, 'Diretoria'),
        React.createElement('a', { className: 'portalDeskStyle', href: '/admin' }, 'Portal interno'),
        React.createElement('a', { className: 'contactDeskStyle', href: '/voluntariado' }, 'Contato')
      ),
      React.createElement('div', { className: 'globalMobileActions' },
        React.createElement('a', { className: 'globalParticipar', href: '/voluntariado' }, 'Participar'),
        React.createElement('a', { className: 'globalApoiar', href: '/campanhas' }, 'Apoiar')
      )
    )
  );
}

export default function RootLayout(props) {
  return React.createElement(
    'html',
    { lang: 'pt-BR' },
    React.createElement(
      'body',
      null,
      props.children,
      React.createElement('style', { id: 'independent-mobile-menu-css', dangerouslySetInnerHTML: { __html: independentMenuCss } }),
      React.createElement(MobileMenu)
    )
  );
}
