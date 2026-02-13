'use client';

import { Phone } from 'lucide-react';
import { getPhone } from '@/lib/phone';
import { trackEvent } from '@/lib/tracking';

export function StickyCallButton({ isLandingPage = false }: { isLandingPage?: boolean }) {
  const phone = getPhone(isLandingPage);

  const handleClick = () => {
    trackEvent({
      eventName: 'phone_click',
      eventData: { phone_type: phone.type, placement: 'sticky' },
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <a
        href={phone.tel}
        onClick={handleClick}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white py-4 font-semibold text-base w-full shadow-[0_-4px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform"
      >
        <Phone className="h-5 w-5 animate-phone-ring" />
        Appeler maintenant — {phone.display}
      </a>
    </div>
  );
}
