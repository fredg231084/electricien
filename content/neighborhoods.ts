import { siteConfig } from '@/site.config';

export interface NeighborhoodPage {
  slug: string;
  name: string;
  parentCity: string;
  lat: number;
  lng: number;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  focusKeyword: string;
  h1: string;
  intro: string;
  whyChoose: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  coverage: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
}

export function generateNeighborhoodPage(
  neighborhood: typeof siteConfig.areas.neighborhoods[number]
): NeighborhoodPage {
  const { name, slug, parentCity, lat, lng } = neighborhood;
  const businessName = siteConfig.business.name;
  const phone = siteConfig.contact.phone.main.display;

  return {
    slug,
    name,
    parentCity,
    lat,
    lng,
    metaTitle: `Électricien ${name} | Service 24/7 ${parentCity}`,
    metaDescription: `Besoin d'un électricien à ${name}? ${businessName} offre des services électriques résidentiels et commerciaux 24/7 dans ${name}, ${parentCity}. Urgence, bornes EV, panneaux. Appelez ${phone}`,
    canonicalUrl: `https://${siteConfig.business.domain}/electricien-${slug}`,
    focusKeyword: `électricien ${name}`,
    h1: `Électricien à ${name}`,
    intro: `Vous recherchez un électricien professionnel à ${name}, ${parentCity}? ${businessName} est votre partenaire de confiance pour tous vos besoins électriques. Que vous ayez besoin d'une intervention d'urgence, d'installer une borne de recharge pour véhicule électrique, de remplacer un panneau électrique ou de réaliser des travaux commerciaux, notre équipe d'électriciens licenciés RBQ intervient rapidement dans tout ${name}.`,
    whyChoose: {
      title: `Pourquoi choisir ${businessName} à ${name}?`,
      items: [
        {
          title: 'Intervention rapide',
          description: `Nous intervenons rapidement partout à ${name}. Service d'urgence disponible 24h/24, 7j/7 pour tous vos besoins électriques urgents.`,
        },
        {
          title: 'Licenciés RBQ et assurés',
          description: `Tous nos électriciens sont certifiés RBQ et entièrement assurés pour votre tranquillité d'esprit. Travail professionnel garanti.`,
        },
        {
          title: 'Estimation gratuite',
          description: `Nous offrons des estimations gratuites et sans engagement pour tous vos projets électriques résidentiels ou commerciaux.`,
        },
        {
          title: 'Expertise locale',
          description: `Notre équipe connaît parfaitement ${name} et peut intervenir rapidement dans votre quartier.`,
        },
      ],
    },
    services: {
      title: `Nos services d'électricité à ${name}`,
      items: [
        {
          title: 'Urgence électrique 24/7',
          description: `Panne de courant, disjoncteur qui saute, odeur de brûlé? Notre service d'urgence électrique est disponible 24h/24 à ${name}.`,
        },
        {
          title: 'Installation de bornes électriques',
          description: `Installation complète de bornes de recharge niveau 2 pour véhicules électriques, incluant les démarches avec Hydro-Québec.`,
        },
        {
          title: 'Remplacement de panneau électrique',
          description: `Mise à niveau de panneaux électriques de 100A à 200A ou 400A. Installation conforme aux normes en vigueur.`,
        },
        {
          title: 'Travaux commerciaux',
          description: `Services électriques pour commerces, bureaux et industries à ${name}. Projets de rénovation et nouvelle construction.`,
        },
        {
          title: 'Rénovation résidentielle',
          description: `Ajout de prises, interrupteurs, luminaires, ventilateurs de plafond. Installation de systèmes d'éclairage DEL.`,
        },
        {
          title: 'Inspection et mise aux normes',
          description: `Inspection complète de votre installation électrique et mise en conformité selon les normes du Code de l'électricité.`,
        },
      ],
    },
    coverage: {
      title: `Secteurs couverts près de ${name}`,
      description: `En plus de ${name}, nous intervenons dans tous les quartiers de ${parentCity}. Notre proximité nous permet d'offrir un temps de réponse rapide et un service personnalisé à notre clientèle locale.`,
    },
    cta: {
      title: `Besoin d'un électricien à ${name}?`,
      description: `Contactez-nous dès maintenant pour une estimation gratuite ou une intervention d'urgence. Notre équipe est prête à vous servir.`,
    },
    faq: {
      title: 'Questions fréquentes',
      items: [
        {
          q: `Combien coûte une intervention d'électricien à ${name}?`,
          a: `Le coût varie selon la nature des travaux. Nous offrons des estimations gratuites pour tous les projets. Pour les urgences, nous fournissons un tarif clair avant de commencer. Appelez-nous au ${phone} pour obtenir un prix précis.`,
        },
        {
          q: `Êtes-vous disponibles pour les urgences à ${name}?`,
          a: `Oui, notre service d'urgence est disponible 24h/24, 7j/7 dans tout ${name} et ${parentCity}. En cas de panne électrique, disjoncteur défectueux ou toute situation d'urgence, appelez-nous immédiatement.`,
        },
        {
          q: `Offrez-vous des garanties sur vos travaux?`,
          a: `Absolument. Tous nos travaux sont garantis. Nous sommes licenciés RBQ et entièrement assurés. Votre satisfaction et votre sécurité sont nos priorités.`,
        },
        {
          q: `Combien de temps faut-il pour installer une borne électrique à ${name}?`,
          a: `L'installation d'une borne de recharge niveau 2 prend généralement entre 4 et 8 heures, selon votre installation électrique existante. Nous gérons également les démarches avec Hydro-Québec pour les subventions disponibles.`,
        },
      ],
    },
  };
}

export function getAllNeighborhoodPages(): NeighborhoodPage[] {
  return siteConfig.areas.neighborhoods.map(generateNeighborhoodPage);
}

export function getNeighborhoodPageBySlug(slug: string): NeighborhoodPage | undefined {
  const neighborhood = siteConfig.areas.neighborhoods.find((n) => n.slug === slug);
  if (!neighborhood) return undefined;
  return generateNeighborhoodPage(neighborhood);
}
