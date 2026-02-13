import { NextResponse } from 'next/server';
import { saveLead, saveEvent } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.phone) {
      return NextResponse.json({ ok: false, error: 'Téléphone requis' }, { status: 400 });
    }

    const result = await saveLead({
      source_page: body.source_page || '',
      landing_type: body.landing_type || 'seo',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_content: body.utm_content || '',
      utm_term: body.utm_term || '',
      project_type: body.project_type || '',
      city: body.city || '',
      budget_range: body.budget_range || '',
      description: body.description || '',
      name: body.name || '',
      phone: body.phone,
      email: body.email || '',
      preferred_contact: body.preferred_contact || 'Appel',
      status: 'new',
    });

    if (!result) {
      return NextResponse.json({ ok: false, error: 'Failed to save lead' }, { status: 500 });
    }

    await saveEvent({
      event_id: crypto.randomUUID(),
      page_path: body.source_page || '',
      referrer: '',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_content: body.utm_content || '',
      utm_term: body.utm_term || '',
      device_type: '',
      event_name: 'lead_success',
      event_data: { lead_id: result.id },
    });

    return NextResponse.json({ ok: true, leadId: result.id });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
