import { NextResponse } from 'next/server';
import { saveEvent } from '@/lib/storage';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!rateLimit(ip, 100, 60000)) {
    return NextResponse.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();

    if (!body.event_name) {
      return NextResponse.json({ ok: false, error: 'Missing event_name' }, { status: 400 });
    }

    await saveEvent({
      event_id: body.event_id || crypto.randomUUID(),
      page_path: body.page_path || '',
      referrer: body.referrer || '',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_content: body.utm_content || '',
      utm_term: body.utm_term || '',
      device_type: body.device_type || '',
      event_name: body.event_name,
      event_data: body.event_data || {},
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
