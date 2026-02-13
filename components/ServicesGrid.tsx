'use client';

import Link from 'next/link';
import { Zap, Car, Gauge, Building2, ArrowRight } from 'lucide-react';
import { home } from '@/content/pages';
import { trackEvent } from '@/lib/tracking';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const icons = [Zap, Car, Gauge, Building2];
const iconBgs = [
  'from-red-500/10 to-orange-500/10',
  'from-blue-500/10 to-sky-500/10',
  'from-emerald-500/10 to-teal-500/10',
  'from-slate-500/10 to-slate-400/10',
];
const iconColors = ['text-red-600', 'text-blue-600', 'text-emerald-600', 'text-slate-600'];

export function ServicesGrid({ onPlannedClick }: { onPlannedClick?: () => void }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Ce que nous faisons</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Nos services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {home.services.map((service, i) => {
            const Icon = icons[i];
            const isUrgent = service.goal === 'CALL';

            return (
              <div
                key={service.title}
                className={`group relative bg-white border border-border rounded-2xl p-7 card-hover transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${i * 100 + 200}ms` : '0ms' }}
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${iconBgs[i]} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${iconColors[i]}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{service.text}</p>
                {isUrgent ? (
                  <Link
                    href={service.href}
                    onClick={() => trackEvent({ eventName: 'service_card_click', eventData: { service: service.title } })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
                  >
                    En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      trackEvent({ eventName: 'service_card_click', eventData: { service: service.title } });
                      onPlannedClick?.();
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all"
                  >
                    Obtenir une soumission <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
