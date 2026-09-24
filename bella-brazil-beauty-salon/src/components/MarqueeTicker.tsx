import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  speed?: 'normal' | 'fast';
  theme?: 'dark' | 'cream';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    'AUTHENTIC BRAZILIAN BLOWOUT CERTIFIED',
    '100% FORMALDEHYDE-FREE KERAORGANIC',
    'BIO-COLLAGEN HAIR BOTOX REPAIR',
    'HAND-PAINTED BRAZILIAN BALAYAGE',
    'CLINICAL RUSSIAN DRY MANICURE',
    'SEEF FLAGSHIP & SAAR GARDEN SANCTUARY',
    'KINGDOM OF BAHRAIN',
    'WELLA · K18 · NASHI ARGAN · KADUS · FRAMAR'
  ],
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full overflow-hidden border-y py-3.5 select-none ${
        isDark
          ? 'bg-[#0B2118] border-[#1D4A35] text-[#F2EBDD]'
          : 'bg-[#FAF7F2] border-[#D8CBB5] text-[#0B2118]'
      }`}
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-6 px-4">
            <span className="font-serif tracking-[0.25em] text-xs sm:text-sm uppercase whitespace-nowrap">
              {item}
            </span>
            <span className={`w-1.5 h-1.5 rotate-45 shrink-0 ${isDark ? 'bg-[#B59A62]' : 'bg-[#8A6C50]'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
