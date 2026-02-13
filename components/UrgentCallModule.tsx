'use client';

import { Phone, AlertTriangle } from 'lucide-react';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function UrgentCallModule({
  warningText,
  isLandingPage = false,
}: {
  warningText: string;
  isLandingPage?: boolean;
}) {
  const phone = getPhone(isLandingPage);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`py-12 sm:py-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} id="urgence">
      {/* SectionGoal: CALL */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative bg-red-50 border-2 border-red-300 rounded-2xl p-8 sm:p-10 text-center shadow-lg shadow-red-100/50 animate-pulse-soft" style={{ animationDuration: '3s' }}>
          <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 animate-pulse-soft" style={{ animationDuration: '2s' }} />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <AlertTriangle className="h-7 w-7 text-red-600 animate-pulse-soft" />
              <p className="text-sm font-bold text-red-600 uppercase tracking-wider">Situation urgente</p>
              <AlertTriangle className="h-7 w-7 text-red-600 animate-pulse-soft" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-900 mb-4">Urgence électrique</h2>
            <p className="text-red-800 mb-8 leading-relaxed max-w-xl mx-auto text-base">{warningText}</p>
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-xl bg-red-400/30 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -inset-2 rounded-2xl bg-red-400/15 animate-ping" style={{ animationDuration: '2.5s' }} />
              <a
                href={phone.tel}
                onClick={() => {
                  trackEvent({ eventName: 'urgent_cta_click', eventData: { placement: 'urgent_module' } });
                  trackEvent({ eventName: 'phone_click', eventData: { phone_type: phone.type, placement: 'urgent_module' } });
                }}
                className="btn-danger relative inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="h-6 w-6 animate-phone-ring" />
                Appeler maintenant — {phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
