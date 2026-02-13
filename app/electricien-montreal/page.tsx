import type { Metadata } from 'next';
import { montrealPage } from '@/content/pages';
import { MontrealPageContent } from './content';

export const metadata: Metadata = {
  title: montrealPage.metaTitle,
  description: montrealPage.metaDescription,
};

export default function ElectricienMontreal() {
  return <MontrealPageContent />;
}
