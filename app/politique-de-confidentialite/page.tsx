import { generateMetadata as genMeta } from '@/lib/seo';
import { privacyPage } from '@/content/pages';

export const metadata = genMeta({
  metaTitle: privacyPage.metaTitle,
  metaDescription: privacyPage.metaDescription,
  path: '/politique-de-confidentialite',
});

export default function PolitiqueDeConfidentialite() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 prose prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-8">{privacyPage.h1}</h1>

        <h2 className="text-xl font-semibold mt-8 mb-3">Collecte de renseignements</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Nous recueillons les renseignements que vous nous fournissez volontairement via nos formulaires de contact,
          incluant votre nom, numéro de téléphone, adresse courriel et description de projet. Ces informations sont
          utilisées uniquement pour répondre à votre demande de soumission ou de service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Utilisation des renseignements</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Vos renseignements personnels sont utilisés pour vous contacter au sujet de votre demande, vous fournir
          une estimation ou planifier une intervention. Nous ne vendons ni ne partageons vos informations avec des tiers
          à des fins commerciales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Témoins (Cookies)</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Notre site utilise des témoins pour améliorer votre expérience de navigation et pour des fins d&apos;analyse
          de trafic. Vous pouvez désactiver les témoins dans les paramètres de votre navigateur.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Sécurité</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Nous prenons des mesures raisonnables pour protéger vos renseignements personnels contre la perte,
          le vol et l&apos;accès non autorisé.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour toute question concernant cette politique, contactez-nous à leads@electricienmtl.ca.
        </p>
      </div>
    </section>
  );
}
