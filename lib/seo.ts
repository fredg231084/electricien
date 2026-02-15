import type { Metadata } from 'next';
import { siteConfig } from '@/site.config';

interface GenerateMetadataConfig {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: string;
  path: string;
}

export function generateMetadata(config: GenerateMetadataConfig): Metadata {
  const {
    metaTitle,
    metaDescription,
    canonicalUrl,
    noIndex = false,
    ogImage,
    path,
  } = config;

  const baseUrl = `https://${siteConfig.business.domain}`;
  const url = canonicalUrl || `${baseUrl}${path}`;
  const image = ogImage || siteConfig.seo.defaultOgImage;
  const absoluteImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: url,
      siteName: siteConfig.business.name,
      locale: siteConfig.seo.locale,
      type: 'website',
      images: [
        {
          url: absoluteImageUrl,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [absoluteImageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
