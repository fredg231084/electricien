import { NextResponse } from 'next/server';
import { listLeads, getLeadStats } from '@/lib/storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');
  const days = parseInt(searchParams.get('days') || '7', 10);

  if (mode === 'stats') {
    const stats = await getLeadStats(days);
    return NextResponse.json(stats);
  }

  const filters: Record<string, string> = {};
  const status = searchParams.get('status');
  const project_type = searchParams.get('project_type');
  const city = searchParams.get('city');
  const utm_campaign = searchParams.get('utm_campaign');

  if (status) filters.status = status;
  if (project_type) filters.project_type = project_type;
  if (city) filters.city = city;
  if (utm_campaign) filters.utm_campaign = utm_campaign;

  const leads = await listLeads(50, 0, filters, days);
  return NextResponse.json(leads);
}
