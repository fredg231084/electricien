import type { Metadata } from 'next';
import { panneauPage } from '@/content/pages';
import { PanneauPageContent } from './content';

export const metadata: Metadata = {
  title: panneauPage.metaTitle,
  description: panneauPage.metaDescription,
};

export default function ChangementPanneauElectrique() {
  return <PanneauPageContent />;
}
