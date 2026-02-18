import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Clock, CheckCircle, Zap } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { getAllNeighborhoodPages, getNeighborhoodPageBySlug } from '@/content/neighborhoods';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { LeadForm } from '@/components/LeadForm';
import { TrustBadges } from '@/components/TrustBadges';
import { Reviews } from '@/components/Reviews';
import { CTAStrip } from '@/components/CTAStrip';



// export async function generateStaticParams() {
  // FIXED: Access siteConfig directly for slugs only (build-time optimization)
  // getAllNeighborhoodPages() is still used elsewhere for full page content
  // return siteConfig.areas.neighborhoods.map((neighborhood) => ({
  //   slug: neighborhood.slug,
 // }));
// }


export async function generateStaticParams() {
  console.log('=== generateStaticParams DEBUG ===');
  console.log('neighborhoods:', siteConfig.areas.neighborhoods.map(n => n.slug));
  
  const result = siteConfig.areas.neighborhoods.map((neighborhood) => ({
    slug: neighborhood.slug,
  }));
  
  console.log('Generated slugs:', result.map(r => r.slug));
  console.log('Total pages to generate:', result.length);
  console.log('=== END DEBUG ===');
  
  return result;
}






export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getNeighborhoodPageBySlug(params.slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: page.canonicalUrl,
      siteName: siteConfig.business.name,
      locale: siteConfig.seo.locale,
      type: 'website',
    },
  };
}

export default function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const page = getNeighborhoodPageBySlug(params.slug);
  if (!page) notFound();

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: page.parentCity, url: page.parentCity === 'Montréal' ? '/electricien-montreal' : '/electricien-laval' },
    { name: page.name, url: `/electricien-${page.slug}` },
  ];

  const phone = siteConfig.contact.phone.main;

  return (
    <>
      <LocalBusinessSchema
        isLandingPage={false}
        geoCoordinates={{ lat: page.lat, lng: page.lng }}
        areaServed={page.name}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        name={`Services d'électricien à ${page.name}`}
        description={page.metaDescription}
      />
      <FAQSchema items={page.faq.items} />

      <section className="relative overflow-hidden bg-gradient-hero bg-mesh pt-32 pb-16">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-sm">
            <Zap className="h-4 w-4" />
            Service 24/7 à {page.name}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
            {page.h1}
            <span className="block text-gradient mt-2">{siteConfig.business.tagline}</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
            {page.intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href={phone.tel} className="btn-primary text-base">
              <Phone className="h-5 w-5" />
              {phone.display}
            </a>
            <a href="#estimation" className="btn-outline text-base">
              Estimation gratuite
            </a>
          </div>

          <TrustBadges />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">{page.whyChoose.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            {page.whyChoose.items.map((item, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-cta rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30 bg-mesh">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold">{page.services.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {page.services.items.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-3 text-primary">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="glass-card p-8 rounded-3xl text-center">
            <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{page.coverage.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {page.coverage.description}
            </p>
          </div>
        </div>
      </section>

      <Reviews />

      <section id="estimation" className="section-padding bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">{page.cta.title}</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {page.cta.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cta rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Estimation gratuite et sans engagement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cta rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Réponse rapide sous 24h</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cta rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Service d'urgence 24/7</span>
                </div>
              </div>
              <div className="mt-8">
                <a href={phone.tel} className="btn-primary text-lg inline-flex">
                  <Phone className="h-5 w-5" />
                  Appelez maintenant
                </a>
              </div>
            </div>
            <LeadForm sourcePage={`/electricien-${page.slug}`} />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">{page.faq.title}</h2>
          <div className="space-y-4">
            {page.faq.items.map((item, idx) => (
              <details key={idx} className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden group">
                <summary className="cursor-pointer p-6 font-semibold text-lg hover:bg-muted/30 transition-colors flex justify-between items-center">
                  <span>{item.q}</span>
                  <svg
                    className="w-5 h-5 text-primary transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />
    </>
  );
}
