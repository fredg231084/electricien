'use client';

import { Phone } from 'lucide-react';
import { getPhone } from '@/lib/phone';
import { global } from '@/content/pages';
import { trackEvent } from '@/lib/tracking';

export function CallBar({ isLandingPage = false }: { isLandingPage?: boolean }) {
  const phone = getPhone(isLandingPage);

  const handleClick = () => {
    trackEvent({
      eventName: 'phone_click',
      eventData: { phone_type: phone.type, placement: 'callbar' },
    });
  };

  return (
    <div className="bg-gradient-cta animate-gradient-x text-white py-2 text-center text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
        <span className="font-medium tracking-wide">{global.availabilityBadge}</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <a
          href={phone.tel}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 font-bold hover:underline underline-offset-2 decoration-white/60"
        >
          <Phone className="h-3.5 w-3.5 animate-pulse-soft" />
          {phone.display}
        </a>
      </div>
    </div>
  );
}
