import type { Metadata } from 'next';
import { urgencePage } from '@/content/pages';
import { UrgencePageContent } from './content';

export const metadata: Metadata = {
  title: urgencePage.metaTitle,
  description: urgencePage.metaDescription,
};

export default function UrgenceElectricienMontreal() {
  return <UrgencePageContent />;
}
