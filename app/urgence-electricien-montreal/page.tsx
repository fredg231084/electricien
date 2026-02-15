import { generateMetadata as genMeta } from '@/lib/seo';
import { urgencePage } from '@/content/pages';
import { UrgencePageContent } from './content';

export const metadata = genMeta({
  metaTitle: urgencePage.metaTitle,
  metaDescription: urgencePage.metaDescription,
  path: '/urgence-electricien-montreal',
});

export default function UrgenceElectricienMontreal() {
  return <UrgencePageContent />;
}
