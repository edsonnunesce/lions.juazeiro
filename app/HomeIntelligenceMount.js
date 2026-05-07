'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HomeIntelligence from './HomeIntelligence';

export default function HomeIntelligenceMount(){
  const pathname = usePathname();
  if (pathname !== '/' && pathname !== '') return null;
  return React.createElement(HomeIntelligence);
}
