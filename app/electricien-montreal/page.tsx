import { generateMetadata as genMeta } from '@/lib/seo';
import { montrealPage } from '@/content/pages';
import { MontrealPageContent } from './content';

export const metadata = genMeta({
  metaTitle: montrealPage.metaTitle,
  metaDescription: montrealPage.metaDescription,
  path: '/electricien-montreal',
});

export default function ElectricienMontreal() {
  return <MontrealPageContent />;
}
