'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyCallButton } from './StickyCallButton';
import { CallBar } from './CallBar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname.startsWith('/lp');
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isLp) {
    return (
      <>
        <CallBar isLandingPage />
        <Header isLandingPage />
        <main className="min-h-screen pb-14 sm:pb-0">{children}</main>
        <Footer minimal />
        <StickyCallButton isLandingPage />
      </>
    );
  }

  return (
    <>
      <CallBar />
      <Header />
      <main className="min-h-screen pb-14 sm:pb-0">{children}</main>
      <Footer />
      <StickyCallButton />
    </>
  );
}
