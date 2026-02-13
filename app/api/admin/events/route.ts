import { NextResponse } from 'next/server';
import { listEvents } from '@/lib/storage';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const eventName = searchParams.get('event_name') || undefined;
  const events = await listEvents(100, 0, eventName);
  return NextResponse.json(events);
}
