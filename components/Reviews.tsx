'use client';

import { Star } from 'lucide-react';
import { reviews } from '@/content/pages';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Reviews() {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Avis clients
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ce que nos clients disent
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            La satisfaction de nos clients est notre priorite. Voici leurs temoignages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className={`relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : '0ms' }}
            >
              <span className="absolute top-4 right-5 text-6xl font-serif leading-none text-primary/[0.07] select-none pointer-events-none">
                &ldquo;
              </span>

              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
