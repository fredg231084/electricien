import { getPhone } from '@/lib/phone';
import { siteConfig } from '@/site.config';

interface LocalBusinessSchemaProps {
  isLandingPage?: boolean;
  geoCoordinates?: { lat: number; lng: number };
  areaServed?: string;
}

export function LocalBusinessSchema({ isLandingPage = false, geoCoordinates, areaServed }: LocalBusinessSchemaProps) {
  const phone = getPhone(isLandingPage);

  const schemaBase: any = {
    '@context': 'https://schema.org',
    '@type': siteConfig.business.type,
    name: siteConfig.business.name,
    url: `https://${siteConfig.business.domain}`,
    telephone: phone.display,
    email: siteConfig.contact.email,
    areaServed: areaServed
      ? [{ '@type': 'Neighborhood', name: areaServed }]
      : [
          { '@type': 'City', name: siteConfig.areas.primaryCity },
          { '@type': 'City', name: siteConfig.areas.secondaryCity },
        ],
    openingHoursSpecification: siteConfig.hours.businessHours.map((day) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day.day,
      opens: day.open,
      closes: day.close,
    })),
    priceRange: '$$',
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };

  if (geoCoordinates) {
    schemaBase.geo = {
      '@type': 'GeoCoordinates',
      latitude: geoCoordinates.lat,
      longitude: geoCoordinates.lng,
    };
  } else if (siteConfig.contact.hasPhysicalLocation) {
    schemaBase.address = {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    };
    schemaBase.geo = {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.contact.address.lat,
      longitude: siteConfig.contact.address.lng,
    };
  }

  const schema = schemaBase;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
