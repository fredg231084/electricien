import { generateMetadata as genMeta } from '@/lib/seo';
import { lavalPage } from '@/content/pages';
import { LavalPageContent } from './content';

export const metadata = genMeta({
  metaTitle: lavalPage.metaTitle,
  metaDescription: lavalPage.metaDescription,
  path: '/electricien-laval',
});

export default function ElectricienLaval() {
  return <LavalPageContent />;
}
