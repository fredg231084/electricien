'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { lavalPage, global } from '@/content/pages';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { TrustBadges } from '@/components/TrustBadges';
import { FAQ } from '@/components/FAQ';
import { LeadForm } from '@/components/LeadForm';
import { PlannedProjectModal } from '@/components/PlannedProjectModal';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { getAllNeighborhoodPages } from '@/content/neighborhoods';

export function LavalPageContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const phone = getPhone(false);
  const lavalNeighborhoods = getAllNeighborhoodPages().filter((n) => n.parentCity === 'Laval');

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Laval', url: '/electricien-laval' },
  ];

  const openModal = () => {
    trackEvent({ eventName: 'modal_open', eventData: { modal: 'planned_project' } });
    setModalOpen(true);
  };

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{lavalPage.h1}</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{lavalPage.intro}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href={phone.tel}
              onClick={() => trackEvent({ eventName: 'phone_click', eventData: { phone_type: 'main', placement: 'laval_hero' } })}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              {global.ctaPrimary}
            </a>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/5 transition-colors"
            >
              {global.ctaPlanned} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <TrustBadges />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{lavalPage.servicesTitle}</h2>
          <ul className="space-y-3 mb-8">
            {lavalPage.services.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{s}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm">{lavalPage.sectors}</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Secteurs de Laval desservis</h2>
          <p className="text-muted-foreground mb-6">
            Nous intervenons dans tous les secteurs de Laval. Cliquez sur votre quartier pour plus d'informations :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {lavalNeighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.slug}
                href={`/electricien-${neighborhood.slug}`}
                className="glass-card p-4 rounded-xl text-sm font-medium text-foreground hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <MapPin className="h-4 w-4 text-primary inline mr-2" />
                {neighborhood.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={lavalPage.faq} />

      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-xl mx-auto px-4">
          <LeadForm sourcePage="/electricien-laval" title={global.ctaEstimate} />
        </div>
      </section>

      <PlannedProjectModal open={modalOpen} onClose={() => setModalOpen(false)} sourcePage="/electricien-laval" />
    </>
  );
}
