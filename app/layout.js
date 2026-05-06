import React from 'react';
import InstagramButton from './InstagramButton';

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

  .join,
  .donate,
  .headerActions .join,
  .headerActions .donate {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
  }

  @media (max-width: 960px) {
    .siteHeader .utility {
      display: none !important;
    }

    .siteHeader .brandRow {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 12px !important;
    }

    .siteHeader .brand {
      flex: 1 1 auto !important;
      min-width: 0 !important;
    }

    .siteHeader .brand > span:last-child {
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
    }

    .siteHeader .headerActions {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
      width: min(92vw, 680px) !important;
      margin: 12px auto 0 !important;
    }

    .siteHeader .headerActions .join,
    .siteHeader .headerActions .donate {
      display: flex !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 54px !important;
      align-items: center !important;
      justify-content: center !important;
      text-align: center !important;
      padding: 0 14px !important;
      border-radius: 12px !important;
      line-height: 1.05 !important;
    }

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
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px 16px;
      margin: 14px 0 0;
      padding: 16px 0 2px;
      border-top: 1px solid #d9e2ef;
    }

    .globalMobileInstitutional a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      min-height: 42px;
      padding: 6px 0;
      border-radius: 0;
      background: transparent;
      color: #172033;
      font-size: clamp(.9rem, 3.6vw, 1rem);
      line-height: 1.05;
      font-weight: 950;
      letter-spacing: .12em;
      text-transform: uppercase;
      text-decoration: none;
      text-align: left;
    }

    .globalMobileInstitutional .actionDeskStyle,
    .globalMobileInstitutional .directorDeskStyle {
      color: #e44d2e;
      text-shadow: 0 0 14px rgba(228,77,46,.25);
    }

    .globalMobileInstitutional .historyDeskStyle,
    .globalMobileInstitutional .transparencyDeskStyle,
    .globalMobileInstitutional .juazeiroDeskStyle,
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

    .siteHeader .headerActions {
      grid-template-columns: 1fr 1fr !important;
    }

    .globalMobileInstitutional {
      grid-template-columns: 1fr;
      gap: 2px;
    }

    .globalMobileGrid a {
      min-height: 50px;
      font-size: 1rem;
    }

    .globalMobileInstitutional a {
      min-height: 38px;
      font-size: 1rem;
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
        React.createElement('a', { href: '/campanhas' }, 'Campanhas'),
        React.createElement('a', { href: '/voluntariado' }, 'Voluntariado'),
        React.createElement('a', { className: 'adminLink', href: '/admin' }, 'Área administrativa ↗')
      ),
      React.createElement('div', { className: 'globalMobileInstitutional' },
        React.createElement('a', { className: 'actionDeskStyle', href: '/campanhas' }, 'Lions em ação'),
        React.createElement('a', { className: 'historyDeskStyle', href: '/historia' }, 'História'),
        React.createElement('a', { className: 'transparencyDeskStyle', href: '/transparencia' }, 'Transparência'),
        React.createElement('a', { className: 'juazeiroDeskStyle', href: '/juazeiro-do-norte' }, 'Juazeiro'),
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
      React.createElement(MobileMenu),
      React.createElement(InstagramButton)
    )
  );
}
