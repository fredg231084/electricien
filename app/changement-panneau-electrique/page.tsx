import { generateMetadata as genMeta } from '@/lib/seo';
import { panneauPage } from '@/content/pages';
import { PanneauPageContent } from './content';

export const metadata = genMeta({
  metaTitle: panneauPage.metaTitle,
  metaDescription: panneauPage.metaDescription,
  path: '/changement-panneau-electrique',
});

export default function ChangementPanneauElectrique() {
  return <PanneauPageContent />;
}
