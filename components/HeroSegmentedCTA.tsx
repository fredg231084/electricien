'use client';

import { Phone, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { home, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { TrustBadges } from './TrustBadges';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function HeroSegmentedCTA({
  onPlannedClick,
  isLandingPage = false,
}: {
  onPlannedClick: () => void;
  isLandingPage?: boolean;
}) {
  const phone = getPhone(isLandingPage);
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative overflow-hidden bg-gradient-hero bg-mesh" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 sm:py-32 text-center">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-primary/20 text-primary text-sm font-medium px-5 py-2 rounded-full mb-8 shadow-sm">
            <Zap className="h-4 w-4" />
            {global.sameDayLine}
          </div>
        </div>

        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="text-foreground">Électricien à Montréal & Laval</span>
          <br />
          <span className="text-gradient">service rapide, travail garanti</span>
        </h1>

        <p className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {home.heroSubtext}
        </p>

        <ul className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {home.heroBullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
              </div>
              {bullet}
            </li>
          ))}
        </ul>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href={phone.tel}
            onClick={() => {
              trackEvent({ eventName: 'urgent_cta_click', eventData: { placement: 'hero' } });
              trackEvent({ eventName: 'phone_click', eventData: { phone_type: phone.type, placement: 'hero' } });
            }}
            className="btn-danger w-full sm:w-auto group"
          >
            <Phone className="h-4 w-4 group-hover:animate-phone-ring" />
            {global.ctaUrgent}
          </a>
          <button
            onClick={() => {
              trackEvent({ eventName: 'planned_cta_click', eventData: { placement: 'hero' } });
              onPlannedClick();
            }}
            className="btn-primary w-full sm:w-auto"
          >
            {global.ctaPlanned}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
