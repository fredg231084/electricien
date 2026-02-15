import { generateMetadata as genMeta } from '@/lib/seo';
import { commercialPage } from '@/content/pages';
import { CommercialPageContent } from './content';

export const metadata = genMeta({
  metaTitle: commercialPage.metaTitle,
  metaDescription: commercialPage.metaDescription,
  path: '/electricien-commercial-montreal',
});

export default function ElectricienCommercialMontreal() {
  return <CommercialPageContent />;
}
