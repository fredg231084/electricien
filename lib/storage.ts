import { supabase } from './supabase';

export interface Lead {
  id?: string;
  created_at?: string;
  source_page: string;
  landing_type: 'seo' | 'lp';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  project_type: string;
  city: string;
  budget_range: string;
  description: string;
  name: string;
  phone: string;
  email?: string;
  preferred_contact: string;
  status: string;
  notes?: string;
  job_value?: number | null;
}

export interface TrackingEvent {
  event_id: string;
  page_path: string;
  referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  device_type: string;
  event_name: string;
  event_data: Record<string, unknown>;
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ id: string } | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select('id')
    .maybeSingle();

  if (error) {
    console.error('Error saving lead:', error);
    return null;
  }
  return data;
}

export async function saveEvent(event: TrackingEvent): Promise<boolean> {
  const { error } = await supabase.from('events').insert(event);
  if (error) {
    console.error('Error saving event:', error);
    return false;
  }
  return true;
}

export async function listLeads(
  limit = 50,
  offset = 0,
  filters?: Record<string, string>
) {
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters?.status && filters.status !== 'all') query = query.eq('status', filters.status);
  if (filters?.project_type && filters.project_type !== 'all') query = query.eq('project_type', filters.project_type);
  if (filters?.city && filters.city !== 'all') query = query.eq('city', filters.city);
  if (filters?.utm_campaign) query = query.eq('utm_campaign', filters.utm_campaign);

  const { data, error } = await query;
  if (error) {
    console.error('Error listing leads:', error);
    return [];
  }
  return data || [];
}

export async function listEvents(limit = 100, offset = 0, eventName?: string) {
  let query = supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (eventName && eventName !== 'all') query = query.eq('event_name', eventName);

  const { data, error } = await query;
  if (error) {
    console.error('Error listing events:', error);
    return [];
  }
  return data || [];
}

export async function updateLeadStatus(
  leadId: string,
  status: string,
  notes?: string,
  jobValue?: number | null
) {
  const updates: Record<string, unknown> = { status };
  if (notes !== undefined) updates.notes = notes;
  if (jobValue !== undefined) updates.job_value = jobValue;

  const { error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId);

  if (error) {
    console.error('Error updating lead:', error);
    return false;
  }
  return true;
}

export async function getLeadStats() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: recentLeads } = await supabase
    .from('leads')
    .select('id, project_type, budget_range')
    .gte('created_at', sevenDaysAgo);

  const { data: phoneClicks } = await supabase
    .from('events')
    .select('id')
    .eq('event_name', 'phone_click')
    .gte('created_at', sevenDaysAgo);

  return {
    leadsCount: recentLeads?.length || 0,
    phoneClicksCount: phoneClicks?.length || 0,
    leadsByType: (recentLeads || []).reduce((acc: Record<string, number>, l) => {
      const key = l.project_type || 'inconnu';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
    leadsByBudget: (recentLeads || []).reduce((acc: Record<string, number>, l) => {
      const key = l.budget_range || 'inconnu';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {}),
  };
}
