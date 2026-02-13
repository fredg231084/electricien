export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  ttclid?: string;
}

const UTM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid',
];

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem('attribution');
    if (stored) return JSON.parse(stored);
  } catch { /* noop */ }

  try {
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('attribution='));
    if (cookie) {
      return JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('=')));
    }
  } catch { /* noop */ }

  return {};
}

export function persistAttribution(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((k) => params.has(k));
  if (!hasUtm) return false;

  const attribution: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) attribution[k] = v;
  });

  try {
    localStorage.setItem('attribution', JSON.stringify(attribution));
  } catch { /* noop */ }

  return true;
}
