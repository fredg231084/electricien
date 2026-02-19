export const siteConfig = {
  business: {
    name: 'Électricien MTL',
    legalName: 'Électricien MTL Inc.',
    tagline: 'Service rapide, travail garanti',
    domain: 'www.electricienmtl.ca',
    type: 'Electrician',
    licenseLabel: 'RBQ',
    licenseNumber: '5862-4677-01',
    description: 'Service d\'électricien professionnel à Montréal et Laval. Urgence 24/7, installation de bornes électriques, remplacement de panneaux, travaux résidentiels et commerciaux.',
  },
  contact: {
    phone: {
      main: {
        display: '(514) 612-1820',
        tel: 'tel:+15146121820',
      },
      tracking: {
        display: '(514) 111-1111',
        tel: 'tel:+15141111111',
      },
    },
    email: 'info@electricienmtl.ca',
    address: {
      street: '400 rue Inspecteur, #715',
      city: 'Montréal',
      region: 'QC',
      postalCode: 'H3c 4A8',
      country: 'CA',
      lat: 45.4959415,
      lng: -73.5609149,
    },
    hasPhysicalLocation: false,
  },
  hours: {
    businessHours: [
      { day: 'Monday', open: '07:00', close: '18:00' },
      { day: 'Tuesday', open: '07:00', close: '18:00' },
      { day: 'Wednesday', open: '07:00', close: '18:00' },
      { day: 'Thursday', open: '07:00', close: '18:00' },
      { day: 'Friday', open: '07:00', close: '18:00' },
    ],
    emergencyAvailable: true,
    emergencyLabel: 'Urgences 24/7',
    displayText: 'Lun-Ven 7h-18h | Urgences 24/7',
  },
  areas: {
    primaryCity: 'Montréal',
    secondaryCity: 'Laval',
    neighborhoods: [
      { name: 'Rosemont–La Petite-Patrie', slug: 'rosemont', parentCity: 'Montréal', lat: 45.5389, lng: -73.5826 },
      { name: 'Le Plateau-Mont-Royal', slug: 'plateau-mont-royal', parentCity: 'Montréal', lat: 45.5225, lng: -73.5716 },
      { name: 'Villeray–Saint-Michel–Parc-Extension', slug: 'villeray', parentCity: 'Montréal', lat: 45.5536, lng: -73.6145 },
      { name: 'Verdun', slug: 'verdun', parentCity: 'Montréal', lat: 45.4584, lng: -73.5660 },
      { name: 'Ahuntsic-Cartierville', slug: 'ahuntsic', parentCity: 'Montréal', lat: 45.5479, lng: -73.6547 },
      { name: 'Côte-des-Neiges–Notre-Dame-de-Grâce', slug: 'ndg', parentCity: 'Montréal', lat: 45.4796, lng: -73.6204 },
      { name: 'Hochelaga-Maisonneuve', slug: 'hochelaga', parentCity: 'Montréal', lat: 45.5399, lng: -73.5336 },
      { name: 'LaSalle', slug: 'lasalle', parentCity: 'Montréal', lat: 45.4324, lng: -73.6264 },
      { name: 'Mercier–Hochelaga-Maisonneuve', slug: 'mercier', parentCity: 'Montréal', lat: 45.5679, lng: -73.5122 },
      { name: 'Chomedey', slug: 'chomedey', parentCity: 'Laval', lat: 45.5584, lng: -73.7500 },
      { name: 'Laval-des-Rapides', slug: 'laval-des-rapides', parentCity: 'Laval', lat: 45.5600, lng: -73.7180 },
      { name: 'Sainte-Dorothée', slug: 'sainte-dorothee', parentCity: 'Laval', lat: 45.5230, lng: -73.8135 },
    ],
  },
  branding: {
    primaryColor: '#0B6DB8',
    accentColor: '#0EA5E9',
    gradientFrom: '#0B6DB8',
    gradientTo: '#0EA5E9',
  },
  social: {
    googleBusinessUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    yelpUrl: '',
  },
  seo: {
    locale: 'fr_CA',
    language: 'fr',
    defaultOgImage: '/images/og/default.jpg',
    googleSiteVerification: '',
  },
  tracking: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    metaPixel: process.env.NEXT_PUBLIC_META_PIXEL || '',
    tiktokPixel: process.env.NEXT_PUBLIC_TIKTOK_PIXEL || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  },
  scripts: {
    headInjection: process.env.NEXT_PUBLIC_HEAD_INJECTION || '',
    footerInjection: process.env.NEXT_PUBLIC_FOOTER_INJECTION || '',
  },
  trust: {
    badges: [
      { label: 'Licencié RBQ', icon: 'shield' as const },
      { label: 'Assuré', icon: 'check' as const },
      { label: 'Travail garanti', icon: 'award' as const },
      { label: 'Estimation gratuite', icon: 'calculator' as const },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
