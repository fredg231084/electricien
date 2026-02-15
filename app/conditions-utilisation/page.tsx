import { generateMetadata as genMeta } from '@/lib/seo';
import { termsPage } from '@/content/pages';

export const metadata = genMeta({
  metaTitle: termsPage.metaTitle,
  metaDescription: termsPage.metaDescription,
  path: '/conditions-utilisation',
});

export default function ConditionsUtilisation() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">{termsPage.h1}</h1>

        <h2 className="text-xl font-semibold mt-8 mb-3">Acceptation des conditions</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          En accédant à ce site web, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation.
          Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Services</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Les informations présentées sur ce site sont à titre informatif. Toute estimation ou soumission
          fournie est sujette à une évaluation sur place. Les prix et la disponibilité peuvent varier.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Propriété intellectuelle</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Le contenu de ce site, incluant les textes, images et logos, est la propriété de Électricien MTL
          et est protégé par les lois applicables en matière de propriété intellectuelle.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Limitation de responsabilité</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Électricien MTL ne peut être tenu responsable des dommages directs ou indirects résultant de
          l&apos;utilisation de ce site web. Les informations sont fournies &quot;telles quelles&quot;
          sans garantie d&apos;aucune sorte.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Modifications</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
          prennent effet dès leur publication sur ce site.
        </p>
      </div>
    </section>
  );
}
