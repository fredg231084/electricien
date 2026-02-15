import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import { siteConfig } from '@/site.config';

export default function NotFound() {
  const phone = siteConfig.contact.phone.main;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero bg-mesh px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-extrabold text-foreground mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex">
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
          <a href={phone.tel} className="btn-outline inline-flex">
            <Phone className="h-5 w-5" />
            {phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
