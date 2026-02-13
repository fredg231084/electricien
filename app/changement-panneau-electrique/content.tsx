'use client';

import { panneauPage } from '@/content/pages';
import { ServicePageLayout } from '@/components/ServicePageLayout';

export function PanneauPageContent() {
  return (
    <ServicePageLayout
      h1={panneauPage.h1}
      sections={panneauPage.sections}
      faq={panneauPage.faq}
      sourcePage="/changement-panneau-electrique"
      primaryGoal="FORM"
    />
  );
}
