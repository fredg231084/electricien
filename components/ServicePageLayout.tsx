'use client';

import { useState } from 'react';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { PlannedProjectModal } from './PlannedProjectModal';
import { LeadForm } from './LeadForm';
import { FAQ } from './FAQ';
import { TrustBadges } from './TrustBadges';
import { LocalBusinessSchema } from './LocalBusinessSchema';

interface Section {
  title: string;
  items: string[];
}

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

interface ServicePageProps {
  h1: string;
  intro?: string;
  sections: Section[];
  faq: FAQItem[];
  sourcePage: string;
  primaryGoal: 'CALL' | 'FORM';
}

function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function ServicePageLayout({ h1, intro, sections, faq, sourcePage, primaryGoal }: ServicePageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const phone = getPhone(false);
  const heroReveal = useScrollReveal();

  const openModal = () => {
    trackEvent({ eventName: 'modal_open', eventData: { modal: 'planned_project' } });
    trackEvent({ eventName: 'modal_step_view', eventData: { step: 1 } });
    setModalOpen(true);
  };

  return (
    <>
      <LocalBusinessSchema />

      <section className="relative bg-gradient-hero bg-mesh overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />
        <div
          ref={heroReveal.ref}
          className={`section-padding relative z-10 transition-all duration-700 ease-out ${
            heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
              {h1}
            </h1>
            {intro && (
              <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
                {intro}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              {primaryGoal === 'FORM' ? (
                <>
                  <button onClick={openModal} className="btn-primary gap-2">
                    {global.ctaPlanned} <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={phone.tel}
                    onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'service_hero' } })}
                    className="btn-outline gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {global.ctaPrimary}
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={phone.tel}
                    onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'service_hero' } })}
                    className="btn-primary gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {global.ctaPrimary}
                  </a>
                  <button onClick={openModal} className="btn-outline gap-2">
                    {global.ctaPlanned}
                  </button>
                </>
              )}
            </div>

            <TrustBadges />
          </div>
        </div>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`section-padding relative ${
            index % 2 === 1 ? 'bg-muted/30 bg-mesh' : 'bg-white'
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <RevealSection>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
                {section.title}
              </h2>
            </RevealSection>
            <ul className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <RevealSection key={item} delay={itemIndex * 80}>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground text-base leading-relaxed pt-1">
                      {item}
                    </span>
                  </li>
                </RevealSection>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <RevealSection>
        <FAQ items={faq} />
      </RevealSection>

      <section className="section-padding relative bg-gradient-to-b from-muted/40 via-muted/20 to-transparent bg-mesh">
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="max-w-xl mx-auto px-4 relative z-10">
          <RevealSection>
            <LeadForm sourcePage={sourcePage} title={global.ctaEstimate} />
          </RevealSection>
        </div>
      </section>

      <PlannedProjectModal open={modalOpen} onClose={() => setModalOpen(false)} sourcePage={sourcePage} />
    </>
  );
}
