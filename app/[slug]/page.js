import React from 'react';
import { SitePage, ROUTES } from '../page';

export function generateStaticParams() {
  return Object.keys(ROUTES).map(function(slug) {
    return { slug: slug };
  });
}

export function generateMetadata(context) {
  const page = ROUTES[context.params.slug];
  return {
    title: page ? page.title + ' | Lions Clube Juazeiro do Norte' : 'Lions Clube Juazeiro do Norte',
    description: page ? page.lead : 'Site institucional do Lions Clube Juazeiro do Norte.'
  };
}

export default function DynamicPage(context) {
  return React.createElement(SitePage, { slug: context.params.slug });
}
