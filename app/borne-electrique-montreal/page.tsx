import { generateMetadata as genMeta } from '@/lib/seo';
import { bornePage } from '@/content/pages';
import { BornePageContent } from './content';

export const metadata = genMeta({
  metaTitle: bornePage.metaTitle,
  metaDescription: bornePage.metaDescription,
  path: '/borne-electrique-montreal',
});

export default function BorneElectriqueMontreal() {
  return <BornePageContent />;
}
