'use client';

import { bornePage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ServiceSchema } from '@/components/ServiceSchema';

export function BornePageContent() {
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Borne électrique', url: '/borne-electrique-montreal' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema name="Installation borne électrique" description={bornePage.metaDescription} />
      <ServicePageLayout
        h1={bornePage.h1}
        sections={bornePage.sections}
        faq={bornePage.faq}
        sourcePage="/borne-electrique-montreal"
        primaryGoal="FORM"
      />
    </>
  );
}
