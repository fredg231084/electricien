import { getAttribution } from './attribution';

interface TrackEventParams {
  eventName: string;
  eventData?: Record<string, unknown>;
  pagePath?: string;
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  if (window.innerWidth < 768) return 'mobile';
  if (window.innerWidth < 1024) return 'tablet';
  return 'desktop';
}

export async function trackEvent({ eventName, eventData = {}, pagePath }: TrackEventParams) {
  const attribution = getAttribution();

  const event = {
    event_id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    utm_source: attribution.utm_source || '',
    utm_medium: attribution.utm_medium || '',
    utm_campaign: attribution.utm_campaign || '',
    utm_content: attribution.utm_content || '',
    utm_term: attribution.utm_term || '',
    device_type: getDeviceType(),
    event_name: eventName,
    event_data: eventData,
  };

  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch { /* noop */ }

  forwardToPixels(eventName, eventData);
}

function forwardToPixels(eventName: string, eventData: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const w = window as unknown as Record<string, unknown>;

  if (typeof w.gtag === 'function') {
    (w.gtag as Function)('event', eventName, eventData);
  }

  if (typeof w.fbq === 'function') {
    const fbq = w.fbq as Function;
    if (eventName === 'phone_click') fbq('track', 'Contact');
    if (eventName === 'lead_success') fbq('track', 'Lead');
  }

  if (w.ttq && typeof (w.ttq as Record<string, unknown>).track === 'function') {
    const ttq = w.ttq as { track: Function };
    if (eventName === 'phone_click') ttq.track('ClickButton');
    if (eventName === 'lead_success') ttq.track('SubmitForm');
  }
}
