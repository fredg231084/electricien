import type { Metadata } from 'next';
import { lpBorne } from '@/content/pages';
import { LpBorneContent } from './content';

export const metadata: Metadata = {
  title: lpBorne.metaTitle,
  robots: { index: false, follow: false },
};

export default function LpBorne() {
  return <LpBorneContent />;
}
