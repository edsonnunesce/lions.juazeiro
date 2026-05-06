'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function InstagramButton() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

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
            font-weight: 950;
            text-decoration: none;
            box-shadow: 0 18px 42px rgba(0,25,80,.22);
            letter-spacing: -.02em;
          }

          .instagramFloatHome::before {
            content: '◎';
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            border: 2px solid rgba(255,255,255,.9);
            border-radius: 9px;
            font-size: 23px;
            line-height: 1;
            font-weight: 900;
          }

          @media (max-width: 960px) {
            .instagramFloatHome {
              right: 16px;
              bottom: calc(92px + env(safe-area-inset-bottom));
              min-height: 50px;
              padding: 0 14px;
              font-size: .94rem;
            }

            .instagramFloatHome::before {
              width: 25px;
              height: 25px;
              font-size: 20px;
              border-radius: 8px;
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
    }, '@lcjuazeiro')
  );
}
