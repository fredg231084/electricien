'use client';

import { commercialPage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function CommercialPageContent() {
  return (
    <ServicePageLayout
      h1={commercialPage.h1}
      sections={commercialPage.sections}
      faq={commercialPage.faq}
      sourcePage="/electricien-commercial-montreal"
      primaryGoal="FORM"
    />
  );
}
