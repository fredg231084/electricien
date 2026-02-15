import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TrackingProvider } from '@/components/TrackingProvider';
import { LayoutWrapper } from '@/components/LayoutWrapper';
import { HeadInjection } from '@/components/HeadInjection';
import { FooterInjection } from '@/components/FooterInjection';
import { siteConfig } from '@/site.config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.business.domain}`),
  title: `${siteConfig.business.name} | ${siteConfig.business.tagline}`,
  description: siteConfig.business.description,
  openGraph: {
    title: `${siteConfig.business.name} | ${siteConfig.business.tagline}`,
    description: siteConfig.business.description,
    url: `https://${siteConfig.business.domain}`,
    siteName: siteConfig.business.name,
    locale: siteConfig.seo.locale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = siteConfig.tracking.gtmId;

  return (
    <html lang={siteConfig.seo.language}>
      <head>
        <link rel="alternate" hrefLang="fr-CA" href={`https://${siteConfig.business.domain}`} />
        {siteConfig.seo.googleSiteVerification && (
          <meta name="google-site-verification" content={siteConfig.seo.googleSiteVerification} />
        )}
        <HeadInjection />
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <TrackingProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </TrackingProvider>
        <FooterInjection />
      </body>
    </html>
  );
}
