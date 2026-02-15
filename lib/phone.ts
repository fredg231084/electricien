import { siteConfig } from '@/site.config';

export const MAIN_PHONE = siteConfig.contact.phone.main.display;
export const MAIN_PHONE_TEL = siteConfig.contact.phone.main.tel;
export const TRACKING_PHONE = siteConfig.contact.phone.tracking.display;
export const TRACKING_PHONE_TEL = siteConfig.contact.phone.tracking.tel;
export const EMAIL = siteConfig.contact.email;

export function getPhone(isLandingPage: boolean) {
  return isLandingPage
    ? { display: TRACKING_PHONE, tel: TRACKING_PHONE_TEL, type: 'tracking' as const }
    : { display: MAIN_PHONE, tel: MAIN_PHONE_TEL, type: 'main' as const };
}
