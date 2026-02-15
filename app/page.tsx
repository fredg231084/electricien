import type { Metadata } from 'next';
import { HomePageContent } from './content';
import { home } from '@/content/pages';
import { generateMetadata as generateMeta } from '@/lib/seo';

export const metadata: Metadata = generateMeta({
  metaTitle: home.metaTitle,
  metaDescription: home.metaDescription,
  canonicalUrl: home.canonicalUrl,
  noIndex: home.noIndex,
  ogImage: home.ogImage,
  path: '/',
});

export default function HomePage() {
  return <HomePageContent />;
}
