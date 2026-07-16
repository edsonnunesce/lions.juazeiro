'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function InstagramIcon() {
  return React.createElement(
    'svg',
    {
      className: 'instagramIcon',
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      'aria-hidden': 'true'
    },
    React.createElement('rect', {
      x: '3',
      y: '3',
      width: '18',
      height: '18',
      rx: '5',
      stroke: 'currentColor',
      strokeWidth: '2'
    }),
    React.createElement('circle', {
      cx: '12',
      cy: '12',
      r: '4',
      stroke: 'currentColor',
      strokeWidth: '2'
    }),
    React.createElement('circle', {
      cx: '17.5',
      cy: '6.5',
      r: '1.2',
      fill: 'currentColor'
    })
  );
}

export default function InstagramButton() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    document.querySelectorAll('img').forEach((img) => {
      const src = String(img.getAttribute('src') || '').toLowerCase();
      const alt = String(img.getAttribute('alt') || '').toLowerCase();
      const className = String(img.className || '').toLowerCase();
      const isClubLogo =
        alt.includes('lions clube juazeiro') ||
        alt.includes('lions clube de juazeiro') ||
        alt.includes('emblema do lions clube juazeiro') ||
        src.includes('logo_lcjuazeiro') ||
        src.includes('logo-lcjuazeiro') ||
        src.includes('logo_lions_juazeiro') ||
        className.includes('clublogo');

      if (isClubLogo && src !== '/logo.png') {
        img.setAttribute('src', '/logo.png');
      }
    });
  }, [pathname]);

  if (!isHome) return null;

  return React.createElement(React.Fragment, null,
    React.createElement('style', {
      dangerouslySetInnerHTML: {
        __html: `
          .instagramFloatHome {
            position: fixed;
            right: 22px;
            bottom: 22px;
            z-index: 2147482500;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 54px;
            padding: 0 18px;
            border-radius: 999px;
            background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
            color: #fff;
            font-weight: 400;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            text-decoration: none;
            box-shadow: 0 18px 42px rgba(0,25,80,.22);
            letter-spacing: 0;
          }

          .instagramIcon {
            width: 24px;
            height: 24px;
            flex: 0 0 24px;
            color: #fff;
          }

          .instagramHandle {
            font-weight: 400;
          }

          @media (max-width: 960px) {
            .instagramFloatHome {
              right: 16px;
              bottom: calc(92px + env(safe-area-inset-bottom));
              min-height: 50px;
              padding: 0 14px;
              font-size: .94rem;
            }

            .instagramIcon {
              width: 22px;
              height: 22px;
              flex-basis: 22px;
            }
          }
        `
      }
    }),
    React.createElement('a', {
      className: 'instagramFloatHome',
      href: 'https://www.instagram.com/lcjuazeiro/',
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': 'Instagram @lcjuazeiro'
    },
      React.createElement(InstagramIcon),
      React.createElement('span', { className: 'instagramHandle' }, '@lcjuazeiro')
    )
  );
}
