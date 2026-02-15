'use client';

import { useState } from 'react';
import { Phone, MapPin, CheckCircle } from 'lucide-react';
import { HeroSegmentedCTA } from '@/components/HeroSegmentedCTA';
import { UrgentCallModule } from '@/components/UrgentCallModule';
import { ServicesGrid } from '@/components/ServicesGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Reviews } from '@/components/Reviews';
import { CTAStrip } from '@/components/CTAStrip';
import { PlannedProjectModal } from '@/components/PlannedProjectModal';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { home, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';

export function HomePageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const phone = getPhone(false);

  const openModal = () => {
    trackEvent({ eventName: 'modal_open', eventData: { modal: 'planned_project' } });
    trackEvent({ eventName: 'modal_step_view', eventData: { step: 1 } });
    setModalOpen(true);
  };

  return (
    <>
      <LocalBusinessSchema />

      <HeroSegmentedCTA onPlannedClick={openModal} />

      {/* SectionGoal: CALL */}
      <UrgentCallModule warningText="Panne de courant, odeur de brûlé, disjoncteur qui saute? On priorise les appels urgents." />

      <ServicesGrid onPlannedClick={openModal} />

      {/* SectionGoal: TRUST → CALL */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{home.pourquoi.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            {home.pourquoi.items.map((item) => (
              <div key={item} className="flex items-start gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <a
            href={phone.tel}
            onClick={() =>
              trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'pourquoi' } })
            }
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Phone className="h-4 w-4" />
            {global.ctaPrimary}
          </a>
        </div>
      </section>

      <HowItWorks onPlannedClick={openModal} />

      {/* SectionGoal: TRUST → CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{home.zones.title}</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <MapPin className="h-5 w-5 text-primary" />
            <p>{home.zones.text}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={phone.tel}
              onClick={() =>
                trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'zones' } })
              }
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              {global.ctaPrimary}
            </a>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors"
            >
              {global.ctaPlanned}
            </button>
          </div>
        </div>
      </section>

      <Reviews />
      <FAQ items={home.faq} />
      <CTAStrip onPlannedClick={openModal} />

      <PlannedProjectModal open={modalOpen} onClose={() => setModalOpen(false)} sourcePage="/" />
    </>
  );
}
