'use client';

import { Phone, CheckCircle } from 'lucide-react';
import { aboutPage, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { TrustBadges } from '@/components/TrustBadges';

export function AboutPageContent() {
  const phone = getPhone(false);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{aboutPage.h1}</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            {aboutPage.intro}
          </p>

          <h2 className="text-xl font-bold text-foreground mb-5">Nos engagements</h2>
          <ul className="space-y-3 mb-10">
            {aboutPage.engagements.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{e}</span>
              </li>
            ))}
          </ul>

          <a
            href={phone.tel}
            onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'about' } })}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            {global.ctaPrimary}
          </a>

          <div className="mt-10">
            <TrustBadges />
          </div>
        </div>
      </section>
    </>
  );
}
