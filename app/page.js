import React from 'react';
import fs from 'node:fs';
import path from 'node:path';

export default function Page() {
  const htmlPath = path.join(process.cwd(), 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  return React.createElement('iframe', {
    title: 'Lions Clube de Juazeiro do Norte - CE',
    srcDoc: html,
    style: {
      width: '100%',
      minHeight: '100vh',
      height: '100vh',
      border: 0,
      display: 'block'
    }
  });
}
