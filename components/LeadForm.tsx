'use client';

import { useState } from 'react';
import { Loader2, Check, Send } from 'lucide-react';
import { global, contactMethods } from '@/content/pages';
import { trackEvent } from '@/lib/tracking';
import { getAttribution } from '@/lib/attribution';

export function LeadForm({
  sourcePage = '/',
  isLandingPage = false,
  title,
}: {
  sourcePage?: string;
  isLandingPage?: boolean;
  title?: string;
}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    preferredContact: 'Appel',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.description || !form.consent) return;

    setSubmitting(true);
    setError('');

    const attribution = getAttribution();
    const payload = {
      source_page: sourcePage,
      landing_type: isLandingPage ? 'lp' : 'seo',
      ...attribution,
      project_type: '',
      city: '',
      budget_range: '',
      description: form.description,
      name: form.name,
      phone: form.phone,
      email: form.email,
      preferred_contact: form.preferredContact,
    };

    trackEvent({ eventName: 'lead_submit', eventData: { lead_type: 'page_form' } });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        trackEvent({ eventName: 'lead_success', eventData: { lead_id: data.leadId } });
        setSubmitted(true);
      } else {
        throw new Error(data.error || 'Erreur');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur';
      trackEvent({ eventName: 'lead_error', eventData: { error_code: msg } });
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 border border-border/50 p-10 text-center animate-scale-in">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-200">
          <Check className="h-8 w-8 text-white" strokeWidth={3} />
        </div>
        <p className="text-xl font-bold text-foreground">Merci!</p>
        <p className="text-muted-foreground mt-2">On vous contacte rapidement.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-primary/5 border border-border/50 p-6 sm:p-8">
      {title && (
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{title}</h3>
      )}
      <p className="text-sm text-muted-foreground/80 mb-6">{global.formIntro}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input-modern"
        />
        <input
          type="tel"
          placeholder="Téléphone *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="input-modern"
          required
        />
        <input
          type="email"
          placeholder="Courriel (optionnel)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input-modern"
        />
        <textarea
          placeholder="Décrivez votre besoin *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="input-modern resize-none"
          required
        />

        <div>
          <p className="text-sm font-medium text-foreground mb-2.5">Méthode de contact préférée</p>
          <div className="flex gap-2">
            {contactMethods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setForm({ ...form, preferredContact: m })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  form.preferredContact === m
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            {global.formConsent}
          </span>
        </label>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!form.phone || !form.description || !form.consent || submitting}
          className="btn-primary w-full justify-center gap-2"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {global.ctaSecondary}
        </button>
      </form>
    </div>
  );
}
