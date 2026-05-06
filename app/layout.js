import React from 'react';

export const metadata = {
  title: 'Lions Clube de Juazeiro do Norte - CE',
  description: 'Site institucional do Lions Clube de Juazeiro do Norte: campanhas, diretoria, voluntariado, transparência e painel administrativo.'
};

export default function RootLayout(props) {
  return React.createElement(
    'html',
    { lang: 'pt-BR' },
    React.createElement('body', null, props.children)
  );
}
