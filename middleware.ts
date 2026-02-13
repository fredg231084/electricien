import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'ttclid'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const allKeys = [...UTM_PARAMS, ...CLICK_IDS];
  const hasUtm = allKeys.some((p) => url.searchParams.has(p));

  if (hasUtm) {
    const attribution: Record<string, string> = {};
    allKeys.forEach((p) => {
      const val = url.searchParams.get(p);
      if (val) attribution[p] = val;
    });

    response.cookies.set('attribution', JSON.stringify(attribution), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
