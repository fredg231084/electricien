import type { Metadata } from 'next';
import { lpPanneau } from '@/content/pages';
import { LpPanneauContent } from './content';

export const metadata: Metadata = {
  title: lpPanneau.metaTitle,
  robots: { index: false, follow: false },
};

export default function LpPanneau() {
  return <LpPanneauContent />;
}
