import { siteConfig } from '@/site.config';

export const global = {
  brand: siteConfig.business.name,
  domain: siteConfig.business.domain,
  availabilityBadge: 'Intervention rapide \u2022 Estimation gratuite',
  guaranteeLine: 'Travail propre, sécuritaire, conforme au Code.',
  ctaPrimary: 'Appeler maintenant',
  ctaSecondary: 'Obtenir une soumission',
  ctaEstimate: 'Demander une estimation gratuite',
  ctaUrgent: 'URGENCE IMMÉDIATE',
  ctaPlanned: 'PROJET PLANIFIÉ',
  formIntro: 'Décrivez votre besoin et on vous rappelle rapidement.',
  formConsent: "J'accepte d'être contacté à propos de ma demande.",
  sameDayLine: 'Disponibilité le jour même',
  hours: siteConfig.hours.displayText,
  rbqPlaceholder: `${siteConfig.business.licenseLabel} #${siteConfig.business.licenseNumber}`,
};

export const home = {
  metaTitle: 'Électricien à Montréal & Laval | Service rapide 24/7 | Électricien MTL',
  metaDescription:
    "Besoin d'un électricien à Montréal ou Laval? Urgence 24/7, bornes électriques, panneaux 100A→200A, résidentiel & commercial. Estimation gratuite. Appelez maintenant.",
  canonicalUrl: `https://${siteConfig.business.domain}/`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'électricien Montréal',
  h1: 'Électricien à Montréal & Laval — service rapide, travail garanti',
  heroSubtext:
    'Pour une urgence, une borne électrique ou un panneau à mettre à niveau, on vous répond vite et on vous propose une solution claire.',
  heroBullets: [
    'Estimation gratuite',
    'Intervention rapide (Montréal & Laval)',
    'Résidentiel, commercial, condos',
  ],
  services: [
    {
      title: 'Urgence électrique',
      text: 'Panne de courant, odeur de brûlé, disjoncteur qui saute? On priorise les appels urgents.',
      href: '/urgence-electricien-montreal',
      goal: 'CALL' as const,
    },
    {
      title: 'Borne électrique (EV)',
      text: 'Conseils, installation, mise aux normes et sécurisation du circuit.',
      href: '/borne-electrique-montreal',
      goal: 'FORM' as const,
    },
    {
      title: 'Panneau électrique',
      text: 'Remplacement, correction, 100A→200A, ajout de circuits.',
      href: '/changement-panneau-electrique',
      goal: 'FORM' as const,
    },
    {
      title: 'Commercial',
      text: 'Maintenance, ajouts, conformité, urgences sur site.',
      href: '/electricien-commercial-montreal',
      goal: 'FORM' as const,
    },
  ],
  pourquoi: {
    title: 'Pourquoi nous choisir',
    items: [
      'On explique avant d\u2019agir (pas de surprises).',
      'Priorité à la sécurité et à la conformité.',
      'Ponctuel, propre, respectueux de votre espace.',
      'Estimation gratuite sur place.',
    ],
  },
  howItWorks: {
    title: 'Comment ça marche',
    steps: [
      { step: '1', title: 'Contactez-nous', text: 'Vous appelez ou remplissez le formulaire' },
      { step: '2', title: 'Qualification', text: 'On qualifie le besoin et on planifie une visite' },
      { step: '3', title: 'Intervention', text: 'On fait le travail proprement, en toute sécurité' },
    ],
  },
  zones: {
    title: 'Zones desservies',
    text: 'Montréal (tous les arrondissements) et Laval. Autres secteurs sur demande.',
  },
  faq: [
    {
      id: 'home-1',
      q: 'Faites-vous des urgences 24/7?',
      a: "Oui. Selon la nature de l'urgence et la disponibilité, on priorise les situations à risque (odeur de brûlé, court-circuit, panne critique).",
    },
    {
      id: 'home-2',
      q: "Est-ce que l'estimation est vraiment gratuite?",
      a: 'Oui, pour la majorité des travaux standards. Pour les projets complexes, on vous le dira avant de vous déplacer.',
    },
    {
      id: 'home-3',
      q: 'Installez-vous des bornes pour véhicules électriques?',
      a: 'Oui. On vérifie la capacité électrique, le panneau et la protection requise.',
    },
    {
      id: 'home-4',
      q: 'Travaillez-vous dans les condos et plex?',
      a: "Oui. On s'adapte aux règles de bâtiment et aux accès.",
    },
  ],
  finalCta: {
    title: "Besoin d'un électricien maintenant?",
  },
};

export const montrealPage = {
  metaTitle: 'Électricien Montréal | Urgence, panneau, borne EV | Électricien MTL',
  metaDescription:
    "Électricien à Montréal: urgence 24/7, installation de borne électrique, remplacement de panneau, travaux résidentiels et commerciaux. Estimation gratuite.",
  canonicalUrl: `https://${siteConfig.business.domain}/electricien-montreal`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'électricien Montréal',
  h1: 'Électricien à Montréal — rapide, sécuritaire, conforme',
  intro:
    'On intervient partout à Montréal. Notre priorité: régler le problème correctement, en respectant la sécurité et les normes.',
  servicesTitle: 'Services populaires à Montréal',
  services: [
    'Urgence électrique',
    'Borne électrique (EV)',
    'Changement / mise à niveau de panneau',
    'Ajout de prises, luminaires, circuits',
    'Diagnostic de pannes',
  ],
  arrondissements: 'Plateau, Rosemont, Ville-Marie, NDG, Verdun, Ahuntsic, Saint-Laurent\u2026',
  faq: [
    {
      id: 'mtl-1',
      q: "Combien de temps pour une intervention?",
      a: "On vous donne une fenêtre claire dès le premier contact. Les urgences à risque sont priorisées.",
    },
  ],
};

export const lavalPage = {
  metaTitle: 'Électricien Laval | Urgence, panneau, borne EV | Électricien MTL',
  metaDescription:
    "Électricien à Laval: urgence, bornes électriques, panneaux 100A→200A, travaux résidentiels et commerciaux. Estimation gratuite.",
  canonicalUrl: `https://${siteConfig.business.domain}/electricien-laval`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'électricien Laval',
  h1: 'Électricien à Laval — estimation gratuite, service rapide',
  intro:
    'On dessert toute la ville de Laval. Service rapide, estimation gratuite, travail conforme.',
  servicesTitle: 'Services populaires à Laval',
  services: [
    'Urgence électrique',
    'Borne électrique (EV)',
    'Changement / mise à niveau de panneau',
    'Ajout de prises, luminaires, circuits',
    'Diagnostic de pannes',
  ],
  sectors: 'Chomedey, Laval-des-Rapides, Sainte-Dorothée, Vimont, Duvernay\u2026',
  faq: [
    {
      id: 'laval-1',
      q: 'Faites-vous les maisons unifamiliales et jumelées?',
      a: 'Oui. On vérifie la capacité, la sécurité et la conformité avant de proposer la solution.',
    },
  ],
};

export const urgencePage = {
  metaTitle: 'Urgence électricien Montréal 24/7 | Intervention rapide | Électricien MTL',
  metaDescription:
    "Urgence électricien à Montréal: panne, disjoncteur, court-circuit, odeur de brûlé. Intervention rapide et sécuritaire. Appelez maintenant.",
  canonicalUrl: `https://${siteConfig.business.domain}/urgence-electricien-montreal`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'urgence électricien Montréal',
  h1: 'Urgence électricien à Montréal — on priorise les situations à risque',
  warningBox:
    "Si vous sentez une odeur de brûlé, voyez des étincelles ou avez une panne dangereuse: coupez le courant (si sécuritaire) et appelez.",
  situations: [
    'Disjoncteur qui saute',
    'Court-circuit',
    'Prises chaudes / odeur suspecte',
    'Panne partielle ou totale',
    'Fils endommagés',
  ],
  faq: [
    {
      id: 'urg-1',
      q: "Quand appeler Hydro-Québec vs un électricien?",
      a: "Si c'est le réseau (panne de quartier) → Hydro. Si c'est votre panneau/prise/circuit → nous.",
    },
    {
      id: 'urg-2',
      q: 'Est-ce que vous donnez un prix au téléphone?',
      a: 'On peut donner une fourchette, mais un diagnostic sur place est souvent nécessaire.',
    },
  ],
};

export const bornePage = {
  metaTitle: 'Installation borne électrique Montréal | EV résidentiel | Électricien MTL',
  metaDescription:
    "Installation de borne électrique à Montréal: vérification de capacité, panneau, disjoncteur dédié, installation sécuritaire et conforme. Estimation gratuite.",
  canonicalUrl: `https://${siteConfig.business.domain}/borne-electrique-montreal`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'installation borne électrique Montréal',
  h1: 'Installation de borne électrique à Montréal — simple, conforme, sécuritaire',
  sections: [
    {
      title: "Ce qu'on vérifie avant l'installation",
      items: [
        'Capacité du panneau électrique actuel',
        'Ampérage disponible',
        'Distance entre le panneau et le stationnement',
        'Conformité du câblage existant',
      ],
    },
    {
      title: 'Installation typique',
      items: [
        'Disjoncteur dédié 40A ou 50A',
        'Câblage conforme au Code',
        'Borne murale Level 2',
        'Test et mise en service',
      ],
    },
    {
      title: 'Erreurs fréquentes à éviter',
      items: [
        'Brancher sur un circuit partagé',
        'Ignorer la capacité du panneau',
        'Utiliser un câblage sous-dimensionné',
        'Négliger le permis ou l\u2019inspection',
      ],
    },
  ],
  faq: [
    {
      id: 'borne-1',
      q: 'Dois-je passer à 200A?',
      a: "Pas toujours. On l'évalue selon la charge actuelle et votre borne.",
    },
  ],
};

export const panneauPage = {
  metaTitle: 'Changement panneau électrique | 100A à 200A | Montréal & Laval | Électricien MTL',
  metaDescription:
    "Remplacement ou mise à niveau de panneau électrique: 100A→200A, correction de conformité, ajout de circuits. Estimation gratuite à Montréal et Laval.",
  canonicalUrl: `https://${siteConfig.business.domain}/changement-panneau-electrique`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'changement panneau électrique',
  h1: 'Changement de panneau électrique — sécurité, capacité, tranquillité d\u2019esprit',
  sections: [
    {
      title: "Signes qu'un panneau doit être évalué",
      items: [
        'Disjoncteurs qui sautent régulièrement',
        'Panneau de plus de 25 ans',
        'Panneau à fusibles (Federal Pioneer, Sylvania)',
        'Ajout de charge (borne EV, thermopompe, spa)',
      ],
    },
    {
      title: 'Mise à niveau 100A → 200A',
      items: [
        'Évaluation complète de la charge',
        'Remplacement du panneau',
        'Mise à jour du filage d\u2019entrée',
        'Inspection et conformité',
      ],
    },
    {
      title: 'Ajout de circuits pour rénovation',
      items: [
        'Circuits dédiés cuisine / salle de bain',
        'Ajout de sous-panneau',
        'Circuits pour équipements spéciaux',
      ],
    },
  ],
  faq: [
    {
      id: 'pan-1',
      q: 'Combien de temps ça prend?',
      a: "Souvent une journée, selon la complexité. On confirme après évaluation.",
    },
  ],
};

export const commercialPage = {
  metaTitle: 'Électricien commercial Montréal | Maintenance & urgences | Électricien MTL',
  metaDescription:
    "Services d'électricien commercial à Montréal: maintenance, ajout de circuits, conformité, urgences, diagnostics. Estimation gratuite.",
  canonicalUrl: `https://${siteConfig.business.domain}/electricien-commercial-montreal`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: 'électricien commercial Montréal',
  h1: 'Électricien commercial à Montréal — fiable, rapide, orienté opérations',
  sections: [
    {
      title: "Types d'interventions",
      items: [
        'Maintenance préventive',
        'Ajout de circuits et prises',
        'Mises aux normes / conformité',
        'Urgences et diagnostics',
        'Éclairage commercial',
      ],
    },
    {
      title: 'Approche',
      items: [
        'Intervention planifiée pour minimiser l\u2019impact',
        'Communication claire avec le gestionnaire',
        'Travail propre et sécuritaire',
        'Documentation et rapports si requis',
      ],
    },
  ],
  faq: [
    {
      id: 'com-1',
      q: 'Intervenez-vous en dehors des heures?',
      a: "Selon disponibilité, oui — pour limiter l'impact sur vos opérations.",
    },
  ],
};

export const aboutPage = {
  metaTitle: 'À propos | Électricien MTL',
  metaDescription:
    'Électricien MTL: service rapide, approche honnête, travail conforme et sécuritaire à Montréal et Laval.',
  canonicalUrl: `https://${siteConfig.business.domain}/a-propos`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: undefined,
  h1: 'Une approche simple: sécurité, transparence, travail bien fait',
  intro:
    "On mise sur une communication claire, des estimations honnêtes et un travail propre. Notre objectif: que vous soyez en confiance, du premier appel jusqu'à la fin.",
  engagements: [
    'Vous expliquer les options',
    'Recommander ce qui est nécessaire (pas ce qui est payant)',
    'Respecter votre temps et votre espace',
  ],
};

export const contactPage = {
  metaTitle: 'Contact | Électricien Montréal & Laval | Électricien MTL',
  metaDescription:
    "Contactez Électricien MTL pour une urgence, une borne électrique ou un panneau. Estimation gratuite à Montréal et Laval.",
  canonicalUrl: `https://${siteConfig.business.domain}/contact`,
  noIndex: false,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: undefined,
  h1: 'Contact — on vous répond rapidement',
};

export const privacyPage = {
  metaTitle: 'Politique de confidentialité | Électricien MTL',
  metaDescription: 'Politique de confidentialité de Électricien MTL.',
  canonicalUrl: `https://${siteConfig.business.domain}/politique-de-confidentialite`,
  noIndex: true,
  ogImage: undefined,
  focusKeyword: undefined,
  h1: 'Politique de confidentialité',
};

export const termsPage = {
  metaTitle: "Conditions d'utilisation | Électricien MTL",
  metaDescription: "Conditions d'utilisation du site Électricien MTL.",
  canonicalUrl: `https://${siteConfig.business.domain}/conditions-utilisation`,
  noIndex: true,
  ogImage: undefined,
  focusKeyword: undefined,
  h1: "Conditions d'utilisation",
};

export const lpUrgence = {
  metaTitle: 'Urgence électricien MTL | Intervention rapide 24/7',
  canonicalUrl: `https://${siteConfig.business.domain}/lp/urgence-electricien-mtl`,
  noIndex: true,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: undefined,
  h1: 'Urgence électricien — intervention rapide à Montréal',
  warningBox:
    "Panne? Odeur de brûlé? Étincelles? Coupez le courant si possible et appelez immédiatement.",
  faq: [
    {
      id: 'lp-urg-1',
      q: "C'est une urgence. Combien de temps?",
      a: 'On priorise les situations dangereuses. Appelez pour une évaluation immédiate.',
    },
    {
      id: 'lp-urg-2',
      q: 'Combien ça coûte?',
      a: 'On peut donner une fourchette au téléphone selon la situation.',
    },
  ],
};

export const lpBorne = {
  metaTitle: 'Installation borne électrique MTL | Estimation gratuite',
  canonicalUrl: `https://${siteConfig.business.domain}/lp/borne-electrique-mtl`,
  noIndex: true,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: undefined,
  h1: 'Installation de borne électrique — rapide, conforme',
  bullets: [
    'Vérification de la capacité de votre panneau',
    'Installation conforme au Code électrique',
    'Estimation gratuite avant les travaux',
  ],
};

export const lpPanneau = {
  metaTitle: 'Panneau 200A MTL | Mise à niveau 100A→200A',
  canonicalUrl: `https://${siteConfig.business.domain}/lp/panneau-electrique-200a-mtl`,
  noIndex: true,
  ogImage: siteConfig.seo.defaultOgImage,
  focusKeyword: undefined,
  h1: 'Mise à niveau de panneau 100A→200A — estimation gratuite',
  signs: [
    'Disjoncteurs qui sautent',
    'Panneau de plus de 25 ans',
    'Ajout de charge (EV, thermopompe)',
  ],
  benefits: [
    'Capacité suffisante pour vos besoins',
    'Conformité au Code',
    'Tranquillité d\u2019esprit',
  ],
};

export const reviews = [
  {
    name: 'Marc D.',
    location: 'Rosemont',
    text: "Intervention rapide pour une panne. Travail propre et explications claires. Je recommande.",
  },
  {
    name: 'Sophie L.',
    location: 'Laval',
    text: 'Installation de borne EV sans problème. Le panneau a été évalué et tout était conforme.',
  },
  {
    name: 'Jean-Pierre R.',
    location: 'Verdun',
    text: 'Changement de panneau 100A à 200A. Travail fait en une journée, très professionnel.',
  },
];

export const trustBadges = siteConfig.trust.badges;

export const projectTypes = [
  'Borne électrique',
  'Changement panneau',
  'Commercial',
  'Rénovation majeure',
  'Autre',
];

export const cities = ['Montréal', 'Laval', 'Autre'];

export const budgetRanges = [
  'Moins de 1 000 $',
  '1 000 $ – 3 000 $',
  '3 000 $ – 10 000 $',
  '10 000 $ +',
];

export const contactMethods = ['Appel', 'Texto', 'Courriel'];
