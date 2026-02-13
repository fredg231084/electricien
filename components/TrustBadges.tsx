import { Shield, CheckCircle, Award, Calculator } from 'lucide-react';
import { trustBadges } from '@/content/pages';

const iconMap = {
  shield: Shield,
  check: CheckCircle,
  award: Award,
  calculator: Calculator,
};

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {trustBadges.map((badge) => {
        const Icon = iconMap[badge.icon];
        return (
          <div
            key={badge.label}
            className="glass-card flex items-center gap-3 rounded-full px-4 py-2.5 border border-white/40 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
