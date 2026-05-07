'use client';

import React from 'react';

export default function PrintButton(){
  return React.createElement('button',{className:'printBtn',onClick:()=>window.print()},'Exportar / salvar PDF');
}
