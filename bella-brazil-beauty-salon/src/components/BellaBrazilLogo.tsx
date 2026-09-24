import React from 'react';

interface BellaBrazilLogoProps {
  className?: string;
  variant?: 'full' | 'crest' | 'wordmark' | 'emblem-only';
  theme?: 'dark' | 'light' | 'auto';
  showSubtitle?: boolean;
}

export const BellaBrazilLogo: React.FC<BellaBrazilLogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  showSubtitle = true
}) => {
  const isDark = theme === 'dark' || (theme === 'auto' && true);
  const textColor = isDark ? '#F2EBDD' : '#0B2118';
  const subtitleColor = isDark ? '#B59A62' : '#8A6C50';

  // Emblem Only (The exact botanical logo artwork)
  if (variant === 'emblem-only') {
    return (
      <div className={`relative inline-block overflow-hidden rounded-xl shadow-xl bg-white border border-[#B59A62]/40 p-1 ${className}`}>
        <img
          src="/src/assets/images/official_ig_pfp_logo.jpg"
          alt="Bella Brazil Salon Official Brand Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter contrast-105"
        />
      </div>
    );
  }

  // Wordmark only
  if (variant === 'wordmark') {
    return (
      <div className={`flex flex-col items-start leading-none select-none ${className}`}>
        <span
          className="font-serif tracking-[0.24em] text-lg sm:text-xl font-medium uppercase"
          style={{ color: textColor }}
        >
          Bella Brazil
        </span>
        {showSubtitle && (
          <span
            className="text-[9px] uppercase tracking-[0.35em] font-sans mt-0.5 font-medium"
            style={{ color: subtitleColor }}
          >
            Salon · Bahrain
          </span>
        )}
      </div>
    );
  }

  // Crest variant (Compact circle/squircle badge + text)
  if (variant === 'crest') {
    return (
      <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-[#B59A62] shadow-md p-0.5 shrink-0 transition-transform duration-500 group-hover:scale-105">
          <img
            src="/src/assets/images/official_ig_pfp_logo.jpg"
            alt="Bella Brazil Salon Emblem"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="flex flex-col text-left leading-none">
          <span
            className="font-serif tracking-[0.22em] text-sm sm:text-base font-semibold uppercase"
            style={{ color: textColor }}
          >
            Bella Brazil
          </span>
          <span
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] font-sans mt-1"
            style={{ color: subtitleColor }}
          >
            Seef & Saar
          </span>
        </div>
      </div>
    );
  }

  // Default 'full' variant: Official botanical illustrated logo + luxury typography
  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Official Botanical Wreath Emblem with Toucan, Bird of Paradise & Hibiscus */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white border-2 border-[#B59A62]/80 shadow-xl p-0.5 shrink-0 transition-all duration-500 group-hover:scale-105 group-hover:border-[#F2EBDD]">
        <img
          src="/src/assets/images/official_ig_pfp_logo.jpg"
          alt="Bella Brazil Salon Official Brand Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain rounded-full"
        />
        {/* Subtle glass reflection shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-full" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-none">
        <span
          className="font-serif tracking-[0.22em] text-base sm:text-lg lg:text-xl font-medium uppercase"
          style={{ color: textColor }}
        >
          Bella Brazil
        </span>
        {showSubtitle && (
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] font-sans mt-1 font-medium"
            style={{ color: subtitleColor }}
          >
            Salon · Seef & Saar
          </span>
        )}
      </div>
    </div>
  );
};
