'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, Phone, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/site.config';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const phone = siteConfig.contact.phone.main;

  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero bg-mesh px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-6xl font-extrabold text-foreground mb-4">Oups!</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Une erreur s'est produite
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Désolé, quelque chose s'est mal passé. Veuillez réessayer ou retourner à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary inline-flex">
            <RefreshCw className="h-5 w-5" />
            Réessayer
          </button>
          <Link href="/" className="btn-outline inline-flex">
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>
          <a href={phone.tel} className="btn-outline inline-flex">
            <Phone className="h-5 w-5" />
            Appeler
          </a>
        </div>
      </div>
    </div>
  );
}
