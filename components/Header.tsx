'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';
import { siteConfig } from '@/site.config';

const navLinks = [
  { href: '/urgence-electricien-montreal', label: 'Urgence' },
  { href: '/borne-electrique-montreal', label: 'Bornes EV' },
  { href: '/changement-panneau-electrique', label: 'Panneau' },
  { href: '/electricien-commercial-montreal', label: 'Commercial' },
  { href: '/electricien-montreal', label: 'Montréal' },
  { href: '/electricien-laval', label: 'Laval' },
  { href: '/contact', label: 'Contact' },
];

export function Header({ isLandingPage = false }: { isLandingPage?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const phone = getPhone(isLandingPage);

  const handlePhoneClick = () => {
    trackEvent({
      eventName: 'phone_click',
      eventData: { phone_type: phone.type, placement: 'header' },
    });
  };

  const brandParts = siteConfig.business.name.split(' ');
  const firstWord = brandParts[0] || '';
  const restOfBrand = brandParts.slice(1).join(' ');

  if (isLandingPage) {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            {firstWord} {restOfBrand && <span className="text-gradient">{restOfBrand}</span>}
          </Link>
          <a
            href={phone.tel}
            onClick={handlePhoneClick}
            className="btn-primary inline-flex items-center gap-2 text-sm group"
          >
            <Phone className="h-4 w-4 group-hover:animate-phone-ring" />
            {phone.display}
          </a>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-foreground">
          {firstWord} {restOfBrand && <span className="text-gradient">{restOfBrand}</span>}
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={phone.tel}
            onClick={handlePhoneClick}
            className="hidden sm:inline-flex btn-primary items-center gap-2 text-sm group"
          >
            <Phone className="h-4 w-4 group-hover:animate-phone-ring" />
            {phone.display}
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/20 bg-white/90 backdrop-blur-xl">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 py-3">
              <a
                href={phone.tel}
                onClick={() => {
                  handlePhoneClick();
                  setMobileOpen(false);
                }}
                className="btn-primary inline-flex items-center justify-center gap-2 text-sm w-full group"
              >
                <Phone className="h-4 w-4 group-hover:animate-phone-ring" />
                {phone.display}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
