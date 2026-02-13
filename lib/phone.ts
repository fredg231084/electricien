export const MAIN_PHONE = '(514) 000-0000';
export const MAIN_PHONE_TEL = 'tel:+15140000000';
export const TRACKING_PHONE = '(514) 111-1111';
export const TRACKING_PHONE_TEL = 'tel:+15141111111';
export const EMAIL = 'leads@electricienmtl.ca';

export function getPhone(isLandingPage: boolean) {
  return isLandingPage
    ? { display: TRACKING_PHONE, tel: TRACKING_PHONE_TEL, type: 'tracking' as const }
    : { display: MAIN_PHONE, tel: MAIN_PHONE_TEL, type: 'main' as const };
}
