'use client';

import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { projectTypes, cities, budgetRanges, contactMethods, global } from '@/content/pages';
import { trackEvent } from '@/lib/tracking';
import { getAttribution } from '@/lib/attribution';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  sourcePage?: string;
  isLandingPage?: boolean;
}

interface FormData {
  projectType: string;
  city: string;
  budgetRange: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  preferredContact: string;
  consent: boolean;
}

const initialForm: FormData = {
  projectType: '',
  city: '',
  budgetRange: '',
  name: '',
  phone: '',
  email: '',
  description: '',
  preferredContact: 'Appel',
  consent: false,
};

export function PlannedProjectModal({ open, onClose, sourcePage = '/', isLandingPage = false }: ModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const totalSteps = 4;
  const isLowBudget = form.budgetRange === 'Moins de 1 000 $';

  const canProceed = () => {
    switch (step) {
      case 1: return !!form.projectType;
      case 2: return !!form.city;
      case 3: return !!form.budgetRange;
      case 4: return !!form.phone && !!form.description && form.consent;
      default: return false;
    }
  };

  const goNext = () => {
    trackEvent({ eventName: 'modal_step_complete', eventData: { step, value: step === 1 ? form.projectType : step === 2 ? form.city : form.budgetRange } });
    setStep((s) => Math.min(s + 1, totalSteps));
    trackEvent({ eventName: 'modal_step_view', eventData: { step: step + 1 } });
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleClose = () => {
    trackEvent({ eventName: 'modal_abandon', eventData: { last_step: step } });
    setStep(1);
    setForm(initialForm);
    setSubmitted(false);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    const attribution = getAttribution();
    const payload = {
      source_page: sourcePage,
      landing_type: isLandingPage ? 'lp' : 'seo',
      ...attribution,
      project_type: form.projectType,
      city: form.city,
      budget_range: form.budgetRange,
      description: form.description,
      name: form.name,
      phone: form.phone,
      email: form.email,
      preferred_contact: form.preferredContact,
    };

    trackEvent({ eventName: 'lead_submit', eventData: { lead_type: 'modal', project_type: form.projectType, city: form.city, budget_range: form.budgetRange } });

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
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur';
      trackEvent({ eventName: 'lead_error', eventData: { error_code: msg } });
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const SelectOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
        selected
          ? 'border-primary bg-primary/5 text-primary shadow-sm'
          : 'border-border hover:border-primary/40 text-foreground hover:bg-muted/30'
      }`}
    >
      <span className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full shrink-0 transition-colors duration-200 ${selected ? 'bg-primary' : 'bg-border'}`} />
        <span className="flex-1">{label}</span>
        {selected && <Check className="h-4 w-4 shrink-0" />}
      </span>
    </button>
  );

  const stepDots = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '200ms' }} onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <p className="font-bold text-foreground text-lg">Projet planifié</p>
            <div className="flex items-center gap-2 mt-1.5">
              {stepDots.map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-6 bg-primary' : s < step ? 'w-2 bg-primary/60' : 'w-2 bg-border'
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1.5">{step}/{totalSteps}</span>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-muted transition-colors" aria-label="Fermer">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
          <div className="h-1.5 rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 ease-out" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-10">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 h-20 w-20 rounded-full bg-green-200/50 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="relative h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto animate-scale-in">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full animate-scale-in"
                    style={{
                      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i],
                      animationDelay: `${300 + i * 100}ms`,
                      animationFillMode: 'both',
                    }}
                  />
                ))}
              </div>
              <p className="text-xl font-bold text-foreground mb-2">Merci!</p>
              <p className="text-muted-foreground text-sm">On vous contacte rapidement.</p>
              <button onClick={handleClose} className="mt-8 btn-primary px-8 py-2.5 rounded-xl text-sm font-medium">
                Fermer
              </button>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div>
                  <p className="font-semibold text-foreground mb-1 text-base">Type de projet</p>
                  <p className="text-sm text-muted-foreground mb-5">Sélectionnez le type de travaux souhaité</p>
                  <div className="space-y-2.5">
                    {projectTypes.map((t) => (
                      <SelectOption key={t} label={t} selected={form.projectType === t} onClick={() => setForm({ ...form, projectType: t })} />
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="font-semibold text-foreground mb-1 text-base">Ville</p>
                  <p className="text-sm text-muted-foreground mb-5">Indiquez votre municipalité</p>
                  <div className="space-y-2.5">
                    {cities.map((c) => (
                      <SelectOption key={c} label={c} selected={form.city === c} onClick={() => setForm({ ...form, city: c })} />
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="font-semibold text-foreground mb-1 text-base">Budget estimé</p>
                  <p className="text-sm text-muted-foreground mb-5">Donnez-nous une idée de votre budget</p>
                  <div className="space-y-2.5">
                    {budgetRanges.map((b) => (
                      <SelectOption key={b} label={b} selected={form.budgetRange === b} onClick={() => setForm({ ...form, budgetRange: b })} />
                    ))}
                  </div>
                  {isLowBudget && (
                    <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      Pour les petits travaux, appelez-nous pour vérifier la disponibilité et la faisabilité.
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-1 text-base">Coordonnées</p>
                    <p className="text-sm text-muted-foreground mb-4">Comment pouvons-nous vous joindre?</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-modern w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-modern w-full"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Courriel (optionnel)"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-modern w-full"
                  />
                  <textarea
                    placeholder="Brève description *"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="input-modern w-full resize-none"
                    required
                  />
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Méthode de contact préférée</p>
                    <div className="flex gap-2">
                      {contactMethods.map((m) => (
                        <button
                          key={m}
                          onClick={() => setForm({ ...form, preferredContact: m })}
                          className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                            form.preferredContact === m
                              ? 'border-primary bg-primary text-white shadow-sm'
                              : 'border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/30'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">{global.formConsent}</span>
                  </label>
                  {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
                {step > 1 ? (
                  <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                    <ArrowLeft className="h-4 w-4" /> Retour
                  </button>
                ) : (
                  <div />
                )}
                {step < totalSteps ? (
                  <button
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="btn-primary inline-flex items-center gap-1.5 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Suivant <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitting}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    Envoyer
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
