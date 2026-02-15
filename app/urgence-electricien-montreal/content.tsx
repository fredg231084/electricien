'use client';

import { Phone, AlertTriangle, CheckCircle } from 'lucide-react';
import { urgencePage, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { UrgentCallModule } from '@/components/UrgentCallModule';
import { FAQ } from '@/components/FAQ';
import { LeadForm } from '@/components/LeadForm';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import { TrustBadges } from '@/components/TrustBadges';

export function UrgencePageContent() {
  const phone = getPhone(false);

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Urgence électrique', url: '/urgence-electricien-montreal' },
  ];

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema name="Urgence électrique" description={urgencePage.metaDescription} />

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{urgencePage.h1}</h1>
          <TrustBadges />
        </div>
      </section>

      {/* SectionGoal: CALL */}
      <UrgentCallModule warningText={urgencePage.warningBox} />

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Situations prises en charge</h2>
          <ul className="space-y-3 mb-8">
            {urgencePage.situations.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-foreground">{s}</span>
              </li>
            ))}
          </ul>
          <a
            href={phone.tel}
            onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'urgence_situations' } })}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-red-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            {global.ctaPrimary} — {phone.display}
          </a>
        </div>
      </section>

      <FAQ items={urgencePage.faq} />

      {/* SectionGoal: FORM secondary */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-xl mx-auto px-4">
          <LeadForm sourcePage="/urgence-electricien-montreal" title="Demander un rappel" />
        </div>
      </section>
    </>
  );
}
