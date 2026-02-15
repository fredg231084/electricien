import { siteConfig } from '@/site.config';

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  category: string;
  tags: string[];
  featured: boolean;
  readTime: number;
  content: {
    intro: string;
    sections: Array<{
      title: string;
      content: string;
      list?: string[];
    }>;
    conclusion: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'combien-coute-changement-panneau-200a',
    title: 'Combien coûte le changement d\'un panneau électrique 200A au Québec en 2026?',
    metaTitle: 'Prix changement panneau électrique 200A Québec 2026 | Guide complet',
    metaDescription: 'Découvrez les coûts réels du remplacement d\'un panneau électrique 200A au Québec en 2026. Prix détaillés, facteurs de coût, subventions disponibles et conseils d\'expert.',
    excerpt: 'Le changement d\'un panneau électrique 200A coûte entre 2500$ et 4500$ au Québec. Découvrez tous les facteurs qui influencent le prix et comment économiser.',
    author: siteConfig.business.name,
    publishedDate: '2026-02-10',
    category: 'Rénovation électrique',
    tags: ['panneau électrique', 'prix', 'rénovation', '200A', 'mise aux normes'],
    featured: true,
    readTime: 8,
    content: {
      intro: 'Le remplacement d\'un panneau électrique 200A est une étape cruciale pour moderniser votre installation électrique. En 2026, les coûts varient considérablement selon plusieurs facteurs. Ce guide complet vous aidera à comprendre tous les aspects financiers de ce projet important.',
      sections: [
        {
          title: 'Coûts typiques au Québec',
          content: 'Le prix d\'un remplacement de panneau électrique 200A varie généralement entre 2500$ et 4500$ au Québec. Cette fourchette inclut le matériel, la main-d\'œuvre et les permis nécessaires.',
          list: [
            'Panneau résidentiel standard (200A) : 2500$ - 3200$',
            'Panneau avec mise aux normes complète : 3200$ - 4000$',
            'Panneau avec travaux additionnels : 4000$ - 4500$+',
          ],
        },
        {
          title: 'Facteurs qui influencent le prix',
          content: 'Plusieurs éléments peuvent faire varier le coût total du projet :',
          list: [
            'État de l\'installation existante : un système vétuste nécessitera plus de travaux',
            'Distance entre le panneau et le compteur Hydro-Québec',
            'Nécessité de refaire le câblage principal',
            'Mise aux normes des circuits existants',
            'Ajout de circuits spécialisés (borne électrique, spa, climatisation)',
            'Accessibilité du panneau et complexité de l\'installation',
            'Région du Québec (les prix varient entre Montréal, Québec et les régions)',
          ],
        },
        {
          title: 'Ce qui est inclus dans le prix',
          content: 'Un remplacement de panneau électrique professionnel comprend généralement :',
          list: [
            'Déconnexion sécuritaire de l\'ancien panneau',
            'Installation du nouveau panneau 200A avec disjoncteurs',
            'Raccordement de tous les circuits existants',
            'Étiquetage clair de tous les circuits',
            'Mise à la terre conforme au Code de l\'électricité du Québec',
            'Demande et obtention du permis électrique',
            'Inspection finale par la RBQ',
            'Garantie sur les travaux (typiquement 1 an)',
          ],
        },
        {
          title: 'Subventions et économies disponibles',
          content: 'Plusieurs programmes peuvent réduire vos coûts :',
          list: [
            'Rénoclimat : jusqu\'à 1200$ pour la mise aux normes électriques',
            'Programme Chauffez vert : subventions pour les installations de bornes électriques nécessitant une mise à niveau',
            'Crédit d\'impôt rénovert : crédit d\'impôt remboursable pour travaux de rénovation écoénergétique',
            'Financement disponible via certaines institutions financières',
          ],
        },
        {
          title: 'Quand remplacer votre panneau?',
          content: 'Plusieurs signes indiquent qu\'il est temps de remplacer votre panneau électrique :',
          list: [
            'Panneau de plus de 25 ans avec fusibles',
            'Disjoncteurs qui sautent fréquemment',
            'Manque d\'espace pour de nouveaux circuits',
            'Signes de surchauffe ou d\'oxydation',
            'Installation d\'une borne électrique ou autre équipement majeur',
            'Vente ou achat d\'une propriété (mise aux normes requise)',
          ],
        },
        {
          title: 'Conseils pour économiser',
          content: 'Voici comment optimiser votre investissement :',
          list: [
            'Obtenez 3 soumissions détaillées d\'électriciens licenciés RBQ',
            'Planifiez vos travaux hors saison (automne/hiver)',
            'Profitez de subventions gouvernementales disponibles',
            'Combinez avec d\'autres travaux électriques pour réduire les déplacements',
            'Vérifiez si votre assurance habitation couvre une partie des coûts',
            'Assurez-vous que l\'électricien obtient tous les permis nécessaires',
          ],
        },
      ],
      conclusion: `Le remplacement d\'un panneau électrique 200A est un investissement important mais essentiel pour la sécurité et la fonctionnalité de votre maison. Bien que le coût puisse sembler élevé, il s\'agit d\'un projet qui augmente la valeur de votre propriété et assure votre sécurité pour les décennies à venir. Contactez ${siteConfig.business.name} pour une évaluation gratuite et découvrez comment nous pouvons vous aider à réaliser ce projet en toute conformité et au meilleur prix.`,
    },
  },
  {
    slug: 'borne-niveau-2-vs-niveau-1',
    title: 'Borne de recharge Niveau 1 vs Niveau 2 : Laquelle choisir?',
    metaTitle: 'Borne recharge niveau 1 vs 2 : Guide complet 2026 | Comparatif',
    metaDescription: 'Comparaison détaillée entre bornes de recharge niveau 1 et niveau 2 pour véhicules électriques. Coûts, temps de recharge, installation et économies.',
    excerpt: 'Hésitez-vous entre une borne niveau 1 et niveau 2 pour votre véhicule électrique? Découvrez les différences clés pour faire le bon choix.',
    author: siteConfig.business.name,
    publishedDate: '2026-02-08',
    category: 'Bornes électriques',
    tags: ['borne électrique', 'VE', 'recharge', 'niveau 2', 'installation'],
    featured: true,
    readTime: 7,
    content: {
      intro: 'Avec l\'essor des véhicules électriques au Québec, le choix d\'une borne de recharge adaptée devient crucial. Les bornes niveau 1 et niveau 2 offrent des performances très différentes. Ce guide vous aide à comprendre leurs différences et à choisir la solution optimale pour vos besoins.',
      sections: [
        {
          title: 'Borne niveau 1 : Recharge standard',
          content: 'La borne niveau 1 utilise une prise électrique standard de 120V. C\'est la solution la plus simple mais aussi la plus lente.',
          list: [
            'Voltage : 120V (prise standard)',
            'Puissance : 1.4 à 1.9 kW',
            'Vitesse de recharge : 6 à 8 km d\'autonomie par heure',
            'Temps pour recharge complète : 24 à 48 heures',
            'Coût d\'installation : Minimal (prise existante)',
            'Idéale pour : Hybrides rechargeables, petits trajets quotidiens',
          ],
        },
        {
          title: 'Borne niveau 2 : Recharge rapide résidentielle',
          content: 'La borne niveau 2 nécessite une installation électrique dédiée de 240V, similaire à une sécheuse ou un four électrique.',
          list: [
            'Voltage : 240V (circuit dédié)',
            'Puissance : 7.2 à 19.2 kW',
            'Vitesse de recharge : 40 à 100 km d\'autonomie par heure',
            'Temps pour recharge complète : 4 à 8 heures',
            'Coût d\'installation : 500$ à 1500$ (incluant matériel et installation)',
            'Idéale pour : Véhicules 100% électriques, usage quotidien intensif',
          ],
        },
        {
          title: 'Comparaison des coûts',
          content: 'Analyse complète des investissements requis :',
          list: [
            'Niveau 1 - Coût total : 0$ à 500$ (si câble non fourni avec le véhicule)',
            'Niveau 2 - Équipement : 600$ à 1200$ pour la borne',
            'Niveau 2 - Installation : 500$ à 1500$ selon la distance du panneau',
            'Niveau 2 - Subventions Québec : jusqu\'à 600$ de rabais (programme Roulez vert)',
            'Niveau 2 - Subventions municipales : varie selon votre ville (Montréal, Laval, etc.)',
            'Retour sur investissement : économies de carburant de 1500$ à 2500$ par année',
          ],
        },
        {
          title: 'Avantages de chaque niveau',
          content: 'Points forts selon vos besoins :',
          list: [
            'Niveau 1 - Aucune installation requise, utilise prise existante',
            'Niveau 1 - Parfait comme solution de secours ou temporaire',
            'Niveau 1 - Idéal pour hybrides rechargeables avec petite batterie',
            'Niveau 2 - Recharge 5 à 7 fois plus rapide',
            'Niveau 2 - Maximise l\'utilisation du véhicule électrique',
            'Niveau 2 - Augmente la valeur de revente de votre propriété',
            'Niveau 2 - Permet de profiter des tarifs Hydro-Québec flex D',
          ],
        },
        {
          title: 'Installation d\'une borne niveau 2',
          content: 'Ce qui est nécessaire pour une installation conforme :',
          list: [
            'Circuit dédié 240V de 40A ou 50A selon la borne',
            'Disjoncteur bipolaire au panneau électrique',
            'Câblage en cuivre de calibre approprié',
            'Mise à la terre conforme',
            'Permis électrique et inspection RBQ',
            'Borne certifiée CSA ou UL',
            'Possibilité de gestion intelligente (Wi-Fi, planification)',
          ],
        },
        {
          title: 'Quel niveau choisir selon votre situation?',
          content: 'Guide de décision basé sur vos besoins réels :',
          list: [
            'Choisissez Niveau 1 si : vous conduisez moins de 50 km/jour, vous avez une hybride rechargeable, vous rechargez au travail',
            'Choisissez Niveau 2 si : vous avez un VE 100% électrique, vous parcourez plus de 80 km/jour, vous voulez recharger rapidement la nuit',
            'Considérez aussi : vos plans futurs (achat d\'un 2e VE), disponibilité de bornes publiques près de chez vous, capacité de votre panneau électrique',
          ],
        },
      ],
      conclusion: `Pour la majorité des propriétaires de véhicules électriques au Québec, la borne niveau 2 représente le meilleur investissement à long terme. La recharge rapide, les subventions disponibles et l\'augmentation de la valeur immobilière justifient largement l\'investissement initial. ${siteConfig.business.name} peut vous guider dans le choix et l\'installation de la borne parfaite pour vos besoins. Contactez-nous pour une évaluation gratuite et profitez des subventions disponibles.`,
    },
  },
  {
    slug: 'signes-panneau-electrique-desuet',
    title: '7 signes que votre panneau électrique est désuet et dangereux',
    metaTitle: '7 signes panneau électrique désuet | Quand remplacer? Sécurité 2026',
    metaDescription: 'Découvrez les 7 signes alarmants d\'un panneau électrique désuet. Apprenez à reconnaître les dangers et quand agir pour protéger votre maison et votre famille.',
    excerpt: 'Votre panneau électrique montre-t-il des signes de vieillissement? Ces 7 signaux d\'alarme indiquent qu\'il est temps d\'agir pour votre sécurité.',
    author: siteConfig.business.name,
    publishedDate: '2026-02-05',
    category: 'Sécurité électrique',
    tags: ['sécurité', 'panneau électrique', 'urgence', 'mise aux normes', 'prévention'],
    featured: true,
    readTime: 6,
    content: {
      intro: 'Un panneau électrique désuet représente un risque sérieux pour votre sécurité et celle de votre famille. Chaque année au Québec, des centaines d\'incendies résidentiels sont causés par des installations électriques vétustes. Apprenez à reconnaître les signes avant-coureurs pour agir avant qu\'il ne soit trop tard.',
      sections: [
        {
          title: '1. Votre panneau a plus de 25 ans',
          content: 'L\'âge est le premier indicateur de remplacement nécessaire :',
          list: [
            'Les panneaux installés avant 2000 utilisent souvent des fusibles plutôt que des disjoncteurs',
            'Les normes électriques ont considérablement évolué depuis 25 ans',
            'Les matériaux et composants se dégradent avec le temps',
            'La capacité (souvent 100A) ne suffit plus aux besoins modernes',
            'Les panneaux Federal Pacific et Zinsco sont particulièrement problématiques',
            'Un panneau ancien peut ne pas offrir une protection adéquate contre les surcharges',
          ],
        },
        {
          title: '2. Disjoncteurs qui sautent fréquemment',
          content: 'Des déclenchements répétés indiquent plusieurs problèmes possibles :',
          list: [
            'Surcharge du circuit : trop d\'appareils sur le même circuit',
            'Disjoncteur défectueux qui ne tient plus correctement',
            'Court-circuit dans le câblage mural',
            'Panneau sous-dimensionné pour vos besoins actuels',
            'Détérioration des connexions internes',
            'Signal que le panneau ne peut plus protéger adéquatement votre installation',
          ],
        },
        {
          title: '3. Signes visuels de dégradation',
          content: 'Inspectez régulièrement votre panneau pour ces signaux d\'alarme :',
          list: [
            'Traces de brûlure ou décoloration autour des disjoncteurs',
            'Odeur de brûlé ou de plastique fondu',
            'Corrosion ou rouille visible sur les composants',
            'Disjoncteurs chauds au toucher',
            'Fils desserrés ou effilochés',
            'Bourdonnement, grésillement ou crépitement audible',
            'Ces signes indiquent un danger immédiat - appelez un électricien immédiatement',
          ],
        },
        {
          title: '4. Pas assez d\'espace pour de nouveaux circuits',
          content: 'Un panneau plein limite votre capacité à moderniser votre maison :',
          list: [
            'Impossible d\'ajouter une borne de recharge pour VE',
            'Pas de place pour un circuit de climatisation centrale',
            'Impossibilité d\'installer un spa ou une piscine',
            'Aucun espace pour séparer des circuits surchargés',
            'Utilisation de disjoncteurs "tandem" (2 circuits sur 1 emplacement) - signe de surcharge',
            'Un panneau 200A moderne offre plus d\'emplacements et de capacité',
          ],
        },
        {
          title: '5. Lumières qui vacillent ou scintillent',
          content: 'Ce symptôme courant révèle des problèmes sous-jacents :',
          list: [
            'Connexions desserrées dans le panneau',
            'Câblage d\'aluminium défectueux (commun dans les années 1960-70)',
            'Surcharge du circuit électrique',
            'Problème avec le câble d\'alimentation principal',
            'Neutral bar mal connecté',
            'Ce problème empire avec le temps et peut causer un incendie',
          ],
        },
        {
          title: '6. Vous utilisez beaucoup de rallonges et multiprises',
          content: 'Un signe clair que votre installation électrique est insuffisante :',
          list: [
            'Pas assez de prises dans les pièces',
            'Circuits existants déjà surchargés',
            'Panneau ne peut supporter l\'ajout de nouveaux circuits',
            'Utilisation d\'appareils modernes sur système ancien',
            'Les rallonges permanentes sont un risque d\'incendie',
            'Indication que vous avez besoin d\'une mise à niveau majeure',
          ],
        },
        {
          title: '7. Assurance ou vente de propriété',
          content: 'Ces situations forcent souvent une mise aux normes :',
          list: [
            'Assureur refuse de couvrir une maison avec panneau à fusibles',
            'Inspection pré-achat révèle un panneau non conforme',
            'Impossibilité d\'obtenir un prêt hypothécaire sans mise aux normes',
            'Certificat de conformité requis pour la vente',
            'Prime d\'assurance très élevée à cause du panneau ancien',
            'Obligation légale de mise aux normes dans certaines transactions',
          ],
        },
      ],
      conclusion: `Si vous reconnaissez un ou plusieurs de ces signes, n\'attendez pas. Un panneau électrique défectueux met votre famille et votre propriété en danger. ${siteConfig.business.name} offre des évaluations gratuites pour déterminer l\'état de votre panneau et vous recommander les solutions appropriées. Nos électriciens licenciés RBQ peuvent remplacer votre panneau rapidement et en toute conformité. Appelez-nous dès aujourd\'hui au ${siteConfig.contact.phone.main.display} pour une consultation gratuite et retrouvez votre tranquillité d\'esprit.`,
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}
