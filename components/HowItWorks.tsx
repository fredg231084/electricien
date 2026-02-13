'use client';

import { home, global } from '@/content/pages';
import { Phone } from 'lucide-react';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function HowItWorks({ onPlannedClick }: { onPlannedClick?: () => void }) {
  const phone = getPhone(false);
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 relative">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Simple et rapide
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {home.howItWorks.title}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-0.5">
            <div className="h-full w-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full" />
          </div>

          {home.howItWorks.steps.map((step, i) => (
            <div
              key={step.step}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
            >
              <div className="relative mx-auto mb-5 h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-primary/15 blur-lg animate-pulse-soft" />
                <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/25">
                  {step.step}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href={phone.tel}
            onClick={() =>
              trackEvent({
                eventName: 'phone_click',
                eventData: { phone_type: 'main', placement: 'how_it_works' },
              })
            }
            className="btn-primary"
          >
            <Phone className="h-4 w-4" />
            {global.ctaPrimary}
          </a>
          <button
            onClick={() => {
              trackEvent({
                eventName: 'planned_cta_click',
                eventData: { placement: 'how_it_works' },
              });
              onPlannedClick?.();
            }}
            className="btn-outline"
          >
            {global.ctaPlanned}
          </button>
        </div>
      </div>
    </section>
  );
}
