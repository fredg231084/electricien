'use client';

import { panneauPage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ServiceSchema } from '@/components/ServiceSchema';

export function PanneauPageContent() {
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Panneau électrique', url: '/changement-panneau-electrique' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema name="Changement panneau électrique" description={panneauPage.metaDescription} />
      <ServicePageLayout
        h1={panneauPage.h1}
        sections={panneauPage.sections}
        faq={panneauPage.faq}
        sourcePage="/changement-panneau-electrique"
        primaryGoal="FORM"
      />
    </>
  );
}
