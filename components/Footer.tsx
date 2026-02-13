import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { global } from '@/content/pages';
import { MAIN_PHONE, MAIN_PHONE_TEL, EMAIL } from '@/lib/phone';

const serviceLinks = [
  { href: '/urgence-electricien-montreal', label: 'Urgence électrique' },
  { href: '/borne-electrique-montreal', label: 'Borne électrique (EV)' },
  { href: '/changement-panneau-electrique', label: 'Panneau électrique' },
  { href: '/electricien-commercial-montreal', label: 'Commercial' },
];

const cityLinks = [
  { href: '/electricien-montreal', label: 'Montréal' },
  { href: '/electricien-laval', label: 'Laval' },
];

const legalLinks = [
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { href: '/conditions-utilisation', label: "Conditions d'utilisation" },
];

export function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-gradient-dark py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <span>&copy; {new Date().getFullYear()} {global.brand}</span>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-dark relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-lg font-bold text-white mb-3">
              Électricien <span className="text-gradient">MTL</span>
            </p>
            <p className="text-sm text-white/60 mb-4">{global.guaranteeLine}</p>
            <div className="space-y-2">
              <a
                href={MAIN_PHONE_TEL}
                className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {MAIN_PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Services</p>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Régions</p>
            <ul className="space-y-2">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-3 mt-6">Heures</p>
            <p className="text-sm text-white/60">{global.hours}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">Informations</p>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-sm text-white/60 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-white/40 mt-4">{global.rbqPlaceholder}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {global.brand}. Tous droits réservés.
          </p>
          <a
            href={MAIN_PHONE_TEL}
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <Phone className="h-4 w-4" />
            {global.ctaPrimary}
          </a>
        </div>
      </div>
    </footer>
  );
}
