import React from 'react';
import { Award, ShieldCheck, Star, Users } from 'lucide-react';

interface StatMetric {
  value: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
}

export const StatsCounter: React.FC = () => {
  const stats: StatMetric[] = [
    {
      value: '14,800+',
      label: 'Brazilian Ceremonies',
      detail: 'Perfected across Seef & Saar',
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#B59A62]" />
    },
    {
      value: '100%',
      label: 'Formaldehyde-Free',
      detail: 'Certified botanical formulas',
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B59A62]" />
    },
    {
      value: '4.9 ★',
      label: 'Client Excellence',
      detail: '850+ verified reviews',
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#B59A62]" />
    },
    {
      value: '12',
      label: 'Master Artists',
      detail: 'Rio & São Paulo certified',
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#B59A62]" />
    }
  ];

  return (
    <div className="w-full bg-[#071710] border-y border-[#1D4A35] py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col space-y-1 sm:space-y-2 border-l border-[#1D4A35] pl-3 sm:pl-6 hover:border-[#B59A62] transition-colors group text-left"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              {stat.icon}
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9BAA8C]">
                Authority
              </span>
            </div>
            <div className="font-serif text-2xl sm:text-4xl text-[#F2EBDD] font-light group-hover:text-[#B59A62] transition-colors tabular-nums">
              {stat.value}
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-[#D8CBB5] font-semibold">
              {stat.label}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#9BAA8C] leading-snug">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
