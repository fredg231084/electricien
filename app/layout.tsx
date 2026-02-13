import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TrackingProvider } from '@/components/TrackingProvider';
import { LayoutWrapper } from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://electricienmtl.ca'),
  title: 'Électricien à Montréal & Laval | Service rapide 24/7 | Électricien MTL',
  description:
    "Besoin d'un électricien à Montréal ou Laval? Urgence 24/7, bornes électriques, panneaux 100A→200A, résidentiel & commercial. Estimation gratuite.",
  openGraph: {
    title: 'Électricien à Montréal & Laval | Électricien MTL',
    description:
      "Urgence 24/7, bornes électriques, panneaux, résidentiel & commercial. Estimation gratuite.",
    url: 'https://electricienmtl.ca',
    siteName: 'Électricien MTL',
    locale: 'fr_CA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <TrackingProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </TrackingProvider>
      </body>
    </html>
  );
}
