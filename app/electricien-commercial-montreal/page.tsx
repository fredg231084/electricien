import type { Metadata } from 'next';
import { commercialPage } from '@/content/pages';
import { CommercialPageContent } from './content';

export const metadata: Metadata = {
  title: commercialPage.metaTitle,
  description: commercialPage.metaDescription,
};

export default function ElectricienCommercialMontreal() {
  return <CommercialPageContent />;
}
