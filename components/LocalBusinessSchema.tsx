import { getPhone } from '@/lib/phone';

export function LocalBusinessSchema({ isLandingPage = false }: { isLandingPage?: boolean }) {
  const phone = getPhone(isLandingPage);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: 'Électricien MTL',
    url: 'https://electricienmtl.ca',
    telephone: phone.display,
    email: 'leads@electricienmtl.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 rue Exemple',
      addressLocality: 'Montréal',
      addressRegion: 'QC',
      postalCode: 'H2X 1Y1',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.5017,
      longitude: -73.5673,
    },
    areaServed: [
      { '@type': 'City', name: 'Montréal' },
      { '@type': 'City', name: 'Laval' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
