import { NextResponse } from 'next/server';
import { listEvents, getEventStats, getTopPages } from '@/lib/storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode');
  const days = parseInt(searchParams.get('days') || '7', 10);

  if (mode === 'stats') {
    const stats = await getEventStats(days);
    return NextResponse.json(stats);
  }

  if (mode === 'top_pages') {
    const topPages = await getTopPages(days);
    return NextResponse.json(topPages);
  }

  const eventName = searchParams.get('event_name') || undefined;
  const events = await listEvents(100, 0, eventName);
  return NextResponse.json(events);
}
