'use client';

import { Phone, AlertTriangle } from 'lucide-react';
import { lpUrgence } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { TrustBadges } from '@/components/TrustBadges';
import { FAQ } from '@/components/FAQ';

export function LpUrgenceContent() {
  const phone = getPhone(true);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{lpUrgence.h1}</h1>

          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="font-bold text-red-900 text-lg">Urgence</span>
            </div>
            <p className="text-red-800 mb-6">{lpUrgence.warningBox}</p>
            <a
              href={phone.tel}
              onClick={() => {
                trackEvent({ eventName: 'urgent_cta_click', eventData: { placement: 'lp_urgence_hero' } });
                trackEvent({ eventName: 'phone_click', eventData: { phone_type: phone.type, placement: 'lp_urgence_hero' } });
              }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Appeler maintenant — {phone.display}
            </a>
          </div>

          <TrustBadges />
        </div>
      </section>

      <FAQ items={lpUrgence.faq} />

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href={phone.tel}
            onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: phone.type, placement: 'lp_urgence_bottom' } })}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            Appeler maintenant — {phone.display}
          </a>
        </div>
      </section>
    </>
  );
}
