'use client';

import { Phone } from 'lucide-react';
import { global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';

export function CTAStrip({
  title,
  onPlannedClick,
  isLandingPage = false,
}: {
  title?: string;
  onPlannedClick?: () => void;
  isLandingPage?: boolean;
}) {
  const phone = getPhone(isLandingPage);

  return (
    <section className="section-padding bg-gradient-cta relative overflow-hidden">
      {/* SectionGoal: CALL + FORM */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 leading-tight">
          {title || "Besoin d'un électricien maintenant?"}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={phone.tel}
            onClick={() =>
              trackEvent({
                eventName: 'phone_click',
                eventData: { phone_type: phone.type, placement: 'cta_strip' },
              })
            }
            className="inline-flex items-center gap-2.5 bg-white text-primary px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone className="h-5 w-5" />
            {global.ctaPrimary}
          </a>
          {onPlannedClick && (
            <button
              onClick={() => {
                trackEvent({ eventName: 'planned_cta_click', eventData: { placement: 'cta_strip' } });
                onPlannedClick();
              }}
              className="inline-flex items-center gap-2.5 border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
            >
              {global.ctaPlanned}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
