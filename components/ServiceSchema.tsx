import { siteConfig } from '@/site.config';

interface ServiceSchemaProps {
  name: string;
  description: string;
}

export function ServiceSchema({ name, description }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `https://${siteConfig.business.domain}/#organization`,
      name: siteConfig.business.legalName,
    },
    areaServed: [
      {
        '@type': 'City',
        name: siteConfig.areas.primaryCity,
      },
      {
        '@type': 'City',
        name: siteConfig.areas.secondaryCity,
      },
    ],
    serviceType: siteConfig.business.type,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
