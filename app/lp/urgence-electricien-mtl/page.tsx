import type { Metadata } from 'next';
import { lpUrgence } from '@/content/pages';
import { LpUrgenceContent } from './content';

export const metadata: Metadata = {
  title: lpUrgence.metaTitle,
  robots: { index: false, follow: false },
};

export default function LpUrgence() {
  return <LpUrgenceContent />;
}
