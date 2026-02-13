import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lp/', '/admin'],
    },
    sitemap: 'https://electricienmtl.ca/sitemap.xml',
  };
}
