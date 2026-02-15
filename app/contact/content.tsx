'use client';

import { Phone, Mail, Clock } from 'lucide-react';
import { contactPage, global } from '@/content/pages';
import { MAIN_PHONE, MAIN_PHONE_TEL, EMAIL } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { LeadForm } from '@/components/LeadForm';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

export function ContactPageContent() {
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-10">{contactPage.h1}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Téléphone</p>
                  <a
                    href={MAIN_PHONE_TEL}
                    onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'contact' } })}
                    className="text-primary hover:underline font-medium"
                  >
                    {MAIN_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Courriel</p>
                  <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Heures</p>
                  <p className="text-muted-foreground">{global.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <LeadForm sourcePage="/contact" title={global.ctaEstimate} />
        </div>
      </div>
    </section>
    </>
  );
}
