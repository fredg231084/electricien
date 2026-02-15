'use client';

import { useState, useEffect, useCallback } from 'react';
import { BarChart3, Phone, Users, DollarSign, Search, RefreshCw, Download, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  city: string;
  budget_range: string;
  status: string;
  source_page: string;
  landing_type: string;
  utm_campaign: string;
  notes: string;
  job_value: number | null;
  description: string;
}

interface TrackingEvent {
  id: string;
  created_at: string;
  event_name: string;
  page_path: string;
  device_type: string;
  event_data: Record<string, unknown>;
}

interface Stats {
  leadsCount: number;
  phoneClicksCount: number;
  leadsByType: Record<string, number>;
  leadsByBudget: Record<string, number>;
}

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

const statusOptions = ['new', 'dispatched', 'closed', 'rejected'];
const projectTypeOptions = ['all', 'Borne électrique', 'Changement panneau', 'Commercial', 'Rénovation majeure', 'Autre', ''];
const cityOptions = ['all', 'Montréal', 'Laval', 'Autre'];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(!ADMIN_PASS);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'leads' | 'events'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [filters, setFilters] = useState({ status: 'all', project_type: 'all', city: 'all' });
  const [eventFilter, setEventFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('7');

  const fetchStats = useCallback(async () => {
    const params = new URLSearchParams();
    params.set('mode', 'stats');
    params.set('days', dateRange);
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setStats(data);
  }, [dateRange]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('days', dateRange);
    if (filters.status !== 'all') params.set('status', filters.status);
    if (filters.project_type !== 'all') params.set('project_type', filters.project_type);
    if (filters.city !== 'all') params.set('city', filters.city);
    const res = await fetch(`/api/admin/leads?${params}`);
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  }, [filters, dateRange]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (eventFilter !== 'all') params.set('event_name', eventFilter);
    const res = await fetch(`/api/admin/events?${params}`);
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  }, [eventFilter]);

  useEffect(() => {
    if (!authenticated) return;
    fetchStats();
    fetchLeads();
  }, [authenticated, fetchStats, fetchLeads]);

  useEffect(() => {
    if (!authenticated) return;
    if (tab === 'events') fetchEvents();
  }, [tab, eventFilter, authenticated, fetchEvents]);

  const updateLead = async (leadId: string, status: string, notes: string, jobValue: string) => {
    await fetch(`/api/admin/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        notes,
        job_value: jobValue ? Number(jobValue) : null,
      }),
    });
    fetchLeads();
    fetchStats();
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Nom', 'Téléphone', 'Email', 'Type', 'Ville', 'Budget', 'Statut', 'Source', 'Campagne', 'Notes'];
    const rows = leads.map((lead) => [
      new Date(lead.created_at).toLocaleString('fr-CA'),
      lead.name || '',
      lead.phone || '',
      lead.email || '',
      lead.project_type || '',
      lead.city || '',
      lead.budget_range || '',
      lead.status || '',
      lead.source_page || '',
      lead.utm_campaign || '',
      (lead.notes || '').replace(/"/g, '""'),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white border border-border rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-foreground mb-4">Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && password === ADMIN_PASS && setAuthenticated(true)}
            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={() => password === ADMIN_PASS && setAuthenticated(true)}
            className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm font-medium bg-transparent border-none outline-none"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
              </select>
            </div>
            {!ADMIN_PASS && (
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
                Demo mode (non protégé)
              </span>
            )}
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users} label={`Leads (${dateRange}j)`} value={stats.leadsCount} />
            <StatCard icon={Phone} label={`Clics tél. (${dateRange}j)`} value={stats.phoneClicksCount} />
            <StatCard
              icon={BarChart3}
              label="Par type"
              value={Object.entries(stats.leadsByType).map(([k, v]) => `${k}: ${v}`).join(', ') || '—'}
            />
            <StatCard
              icon={DollarSign}
              label="Par budget"
              value={Object.entries(stats.leadsByBudget).map(([k, v]) => `${k}: ${v}`).join(', ') || '—'}
            />
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('leads')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'leads' ? 'bg-primary text-white' : 'bg-white text-foreground border border-border'
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setTab('events')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'events' ? 'bg-primary text-white' : 'bg-white text-foreground border border-border'
            }`}
          >
            Événements
          </button>
        </div>

        {tab === 'leads' && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap gap-3">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
              >
                <option value="all">Tous les statuts</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={filters.project_type}
                onChange={(e) => setFilters({ ...filters, project_type: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
              >
                {projectTypeOptions.map((p) => (
                  <option key={p} value={p}>{p || 'Non spécifié'}</option>
                ))}
              </select>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
              >
                {cityOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={fetchLeads}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-white hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              </div>
              <button
                onClick={exportToCSV}
                disabled={leads.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                Exporter CSV
              </button>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Nom</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Tél.</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Ville</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Budget</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Source</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Chargement...</td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Aucun lead</td></tr>
                  ) : (
                    leads.map((lead) => (
                      <LeadRow key={lead.id} lead={lead} onUpdate={updateLead} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'events' && (
          <>
            <div className="flex gap-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filtrer par nom d'événement"
                  value={eventFilter === 'all' ? '' : eventFilter}
                  onChange={(e) => setEventFilter(e.target.value || 'all')}
                  className="pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-white w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                onClick={fetchEvents}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-border rounded-lg text-sm bg-white hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="bg-white border border-border rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Événement</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Page</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Appareil</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Données</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Chargement...</td></tr>
                  ) : events.length === 0 ? (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Aucun événement</td></tr>
                  ) : (
                    events.map((event) => (
                      <tr key={event.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 whitespace-nowrap">{new Date(event.created_at).toLocaleString('fr-CA')}</td>
                        <td className="px-4 py-3">
                          <span className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{event.event_name}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{event.page_path}</td>
                        <td className="px-4 py-3 text-muted-foreground">{event.device_type}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs font-mono max-w-xs truncate">
                          {JSON.stringify(event.event_data)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="bg-white border border-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
      </div>
      <p className="text-lg font-bold text-foreground truncate">
        {typeof value === 'number' ? value : value || '—'}
      </p>
    </div>
  );
}

function LeadRow({ lead, onUpdate }: { lead: Lead; onUpdate: (id: string, status: string, notes: string, jobValue: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [jobValue, setJobValue] = useState(lead.job_value?.toString() || '');

  const save = () => {
    onUpdate(lead.id, status, notes, jobValue);
    setEditing(false);
  };

  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30">
      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
        {new Date(lead.created_at).toLocaleString('fr-CA')}
      </td>
      <td className="px-4 py-3 font-medium">{lead.name || '—'}</td>
      <td className="px-4 py-3">
        <a href={`tel:${lead.phone}`} className="text-primary hover:underline">{lead.phone}</a>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{lead.project_type || '—'}</td>
      <td className="px-4 py-3 text-muted-foreground">{lead.city || '—'}</td>
      <td className="px-4 py-3 text-muted-foreground">{lead.budget_range || '—'}</td>
      <td className="px-4 py-3 text-muted-foreground text-xs">
        {lead.landing_type === 'lp' ? 'LP' : 'SEO'} {lead.utm_campaign && `| ${lead.utm_campaign}`}
      </td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="space-y-2 min-w-[200px]">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
            />
            <input
              type="number"
              placeholder="Valeur ($)"
              value={jobValue}
              onChange={(e) => setJobValue(e.target.value)}
              className="w-full px-2 py-1 border border-border rounded text-xs"
            />
            <div className="flex gap-1">
              <button onClick={save} className="px-2 py-1 bg-primary text-white rounded text-xs">OK</button>
              <button onClick={() => setEditing(false)} className="px-2 py-1 border border-border rounded text-xs">X</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className={`px-2 py-1 rounded text-xs font-medium ${
              lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
              lead.status === 'dispatched' ? 'bg-amber-100 text-amber-800' :
              lead.status === 'closed' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}
          >
            {lead.status}
          </button>
        )}
      </td>
    </tr>
  );
}
