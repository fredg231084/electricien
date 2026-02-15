'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FAQSchema } from '@/components/FAQSchema';

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export function FAQ({ items, title = 'Questions fréquentes' }: { items: FAQItem[]; title?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();

  const toggle = (id: string) => {
    const isOpening = open !== id;
    setOpen(isOpening ? id : null);
    if (isOpening) {
      trackEvent({ eventName: 'faq_open', eventData: { question_id: id } });
    }
  };

  return (
    <section ref={ref} className={`section-padding transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* SectionGoal: OBJECTION HANDLING */}
      <FAQSchema items={items} />
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">On répond à vos questions</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors rounded-2xl"
              >
                <span className="font-medium text-foreground pr-4">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ease-out ${
                    open === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open === item.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
