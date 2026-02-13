import type { Metadata } from 'next';
import { aboutPage } from '@/content/pages';
import { AboutPageContent } from './content';

export const metadata: Metadata = {
  title: aboutPage.metaTitle,
  description: aboutPage.metaDescription,
};

export default function APropos() {
  return <AboutPageContent />;
}
