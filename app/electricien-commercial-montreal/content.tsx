'use client';

import { commercialPage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ServiceSchema } from '@/components/ServiceSchema';

export function CommercialPageContent() {
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Commercial', url: '/electricien-commercial-montreal' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema name="Électricien commercial" description={commercialPage.metaDescription} />
      <ServicePageLayout
        h1={commercialPage.h1}
        sections={commercialPage.sections}
        faq={commercialPage.faq}
        sourcePage="/electricien-commercial-montreal"
        primaryGoal="FORM"
      />
    </>
  );
}
