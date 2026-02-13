import type { Metadata } from 'next';
import { bornePage } from '@/content/pages';
import { BornePageContent } from './content';

export const metadata: Metadata = {
  title: bornePage.metaTitle,
  description: bornePage.metaDescription,
};

export default function BorneElectriqueMontreal() {
  return <BornePageContent />;
}
