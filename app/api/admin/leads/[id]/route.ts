import { NextResponse } from 'next/server';
import { updateLeadStatus, saveEvent } from '@/lib/storage';

 export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }  // ← Change to "props" here
) {
  const params = await props.params; // ← Now props exists!
  try {
    const body = await request.json();
    const { status, notes, job_value } = body;

    if (!status) {
      return NextResponse.json({ ok: false, error: 'Status required' }, { status: 400 });
    }

    const success = await updateLeadStatus(params.id, status, notes, job_value);

    if (success) {
      await saveEvent({
        event_id: crypto.randomUUID(),
        page_path: '/admin',
        referrer: '',
        device_type: '',
        event_name: 'lead_status_update',
        event_data: { lead_id: params.id, status, notes, job_value },
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: 'Update failed' }, { status: 500 });
  } catch {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
