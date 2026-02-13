'use client';

import { useState } from 'react';
import { Phone, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { lpPanneau, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { TrustBadges } from '@/components/TrustBadges';
import { LeadForm } from '@/components/LeadForm';
import { PlannedProjectModal } from '@/components/PlannedProjectModal';

export function LpPanneauContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const phone = getPhone(true);

  const openModal = () => {
    trackEvent({ eventName: 'modal_open', eventData: { modal: 'planned_project' } });
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{lpPanneau.h1}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto mb-8">
            <div>
              <p className="font-semibold text-foreground mb-3">Signes</p>
              <ul className="space-y-2">
                {lpPanneau.signs.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-3">Avantages</p>
              <ul className="space-y-2">
                {lpPanneau.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {global.ctaPlanned} <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={phone.tel}
              onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: phone.type, placement: 'lp_panneau_hero' } })}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-7 py-3.5 rounded-lg font-bold text-sm hover:bg-primary/5 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {phone.display}
            </a>
          </div>

          <TrustBadges />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-xl mx-auto px-4">
          <LeadForm sourcePage="/lp/panneau-electrique-200a-mtl" isLandingPage title={global.ctaEstimate} />
        </div>
      </section>

      <PlannedProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sourcePage="/lp/panneau-electrique-200a-mtl"
        isLandingPage
      />
    </>
  );
}
