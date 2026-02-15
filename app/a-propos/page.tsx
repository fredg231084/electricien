import { generateMetadata as genMeta } from '@/lib/seo';
import { aboutPage } from '@/content/pages';
import { AboutPageContent } from './content';

export const metadata = genMeta({
  metaTitle: aboutPage.metaTitle,
  metaDescription: aboutPage.metaDescription,
  path: '/a-propos',
});

export default function APropos() {
  return <AboutPageContent />;
}
