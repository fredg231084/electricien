import type { Metadata } from 'next';
import { lavalPage } from '@/content/pages';
import { LavalPageContent } from './content';

export const metadata: Metadata = {
  title: lavalPage.metaTitle,
  description: lavalPage.metaDescription,
};

export default function ElectricienLaval() {
  return <LavalPageContent />;
}
