import React from 'react';
import RevistaPage from '../page';
import PrintButton from '../../PrintButton';

const focusCss = `
  .focusPrint{position:fixed;right:18px;bottom:18px;z-index:90;display:flex;gap:10px;align-items:center}.focusPrint a,.focusPrint button{border:0;border-radius:999px;background:#ffcc00;color:#172033;font-weight:950;text-decoration:none;padding:12px 18px;box-shadow:0 12px 30px #00195033;cursor:pointer}.focusPrint a{background:#00338d;color:white}@media print{.focusPrint,.readerTop,.sidebar,.issueHeader{display:none!important}.readerGrid{grid-template-columns:1fr!important}.viewer{width:100%}}
`;

export const metadata = { title: 'Revista AL nº 1 | Lions Clube Juazeiro do Norte' };

export default function IssuePage(){
  return React.createElement(React.Fragment,null,
    React.createElement('style',{dangerouslySetInnerHTML:{__html:focusCss}}),
    React.createElement('div',{className:'focusPrint'},React.createElement('a',{href:'/revista'},'Arquivo'),React.createElement(PrintButton)),
    React.createElement(RevistaPage)
  );
}
