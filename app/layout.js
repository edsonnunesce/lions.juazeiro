import React from 'react';

export const metadata = {
  title: 'Lions Clube Juazeiro do Norte',
  description: 'Site institucional do Lions Clube Juazeiro do Norte: campanhas, diretoria, voluntariado, transparência e painel administrativo.'
};

const buttonFix = `
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
`;

export default function RootLayout(props) {
  return React.createElement(
    'html',
    { lang: 'pt-BR' },
    React.createElement(
      'body',
      null,
      React.createElement('style', { dangerouslySetInnerHTML: { __html: buttonFix } }),
      props.children
    )
  );
}
