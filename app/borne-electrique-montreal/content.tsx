'use client';

import { bornePage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function BornePageContent() {
  return (
    <ServicePageLayout
      h1={bornePage.h1}
      sections={bornePage.sections}
      faq={bornePage.faq}
      sourcePage="/borne-electrique-montreal"
      primaryGoal="FORM"
    />
  );
}
