import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Check, Sparkles } from 'lucide-react';

interface StripItem {
  id: string;
  title: string;
  kicker: string;
  image: string;
  serviceId: string;
  priceFrom: string;
  duration: string;
  description: string;
  highlights: string[];
}

interface ServiceExpandGalleryProps {
  onBookService: (serviceId: string) => void;
}

export const ServiceExpandGallery: React.FC<ServiceExpandGalleryProps> = ({
  onBookService
}) => {
  const [activeId, setActiveId] = useState<string>('brazilian');
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const strips: StripItem[] = [
    {
      id: 'hair',
      title: 'Hair & Blowouts',
      kicker: 'Cuts & Volume',
      image: '/src/assets/images/ig_blowout_hero_1790209445244.jpg',
      serviceId: 'designer-cut',
      priceFrom: 'BHD 12',
      duration: '45 mins',
      description: 'Couture dry cuts, layered movement, and voluminous Brazilian round-brush blowouts with pracaxi nectar.',
      highlights: ['Custom face framing', 'Hot shear split-end seal', 'Voluminous bounce']
    },
    {
      id: 'color',
      title: 'Hair Color & Balayage',
      kicker: 'Balayage & Glow',
      image: '/src/assets/images/ig_balayage_hair_1790209400030.jpg',
      serviceId: 'balayage-dimensional',
      priceFrom: 'BHD 27.50',
      duration: '90-150 mins',
      description: 'Freehand Brazilian balayage painting caramel, honey, and copper ribbons that grow out seamlessly.',
      highlights: ['Ammonia-free glazes', 'Root melt transitions', 'Lipid bond shield']
    },
    {
      id: 'brazilian',
      title: 'Brazilian Smoothing',
      kicker: 'Smoothing & Mirror Gloss',
      image: '/src/assets/images/ig_botox_gloss_1790209411685.jpg',
      serviceId: 'brazilian-blowout',
      priceFrom: 'BHD 70',
      duration: '120 mins',
      description: 'Our certified gold-standard smoothing ceremonies: Brazilian Blowout, Hair Botox, and 100% Keraorganic.',
      highlights: ['Zero Gulf humidity frizz', '12 weeks longevity', 'Mirror light reflection']
    },
    {
      id: 'beauty',
      title: 'Beauty & Brows',
      kicker: 'Brows & Radiance',
      image: '/src/assets/images/ig_isabela_styling_1790209434003.jpg',
      serviceId: 'facial-glow-infusion',
      priceFrom: 'BHD 25',
      duration: '60 mins',
      description: 'Precision brow architecture, lash lamination, and bespoke Brazilian beauty enhancements.',
      highlights: ['Keratin lash lift', 'Custom brow contouring', 'Dewy finish']
    },
    {
      id: 'nails',
      title: 'Russian Nails & BIAB',
      kicker: 'Russian Detailing',
      image: '/src/assets/images/nails_luxury_editorial_1790208946952.jpg',
      serviceId: 'russian-manicure',
      priceFrom: 'BHD 24',
      duration: '75 mins',
      description: 'Medical-grade dry e-file diamond detailing with Builder in a Bottle (BIAB) apex reinforcement.',
      highlights: ['Microscopic cuticle cleaning', '4+ weeks chip-free', 'Zero soaking lifting']
    },
    {
      id: 'bridal',
      title: 'Bridal & Occasion',
      kicker: 'Haute Occasion',
      image: '/src/assets/images/bridal_beauty_glamour_1790208593187.jpg',
      serviceId: 'brazilian-bridal-package',
      priceFrom: 'BHD 150',
      duration: '180 mins',
      description: 'Dedicated private bridal suites, bespoke veil anchoring, and luminous editorial red-carpet makeup.',
      highlights: ['Private styling suite', 'Airbrush complexion', 'Crown & veil placement']
    },
    {
      id: 'facials',
      title: 'Facials & Spa',
      kicker: 'Hydration Spa',
      image: '/src/assets/images/facial_spa_treatment_1790208960192.jpg',
      serviceId: 'facial-glow-infusion',
      priceFrom: 'BHD 45',
      duration: '75 mins',
      description: 'Amazonian botanical facial infusions, deep cellular hydration, and lymphatic drainage therapies.',
      highlights: ['Cold-pressed plant elixirs', 'Cryo cooling globes', 'Instant barrier glow']
    }
  ];

  const handleScrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth * 0.85;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleScrollEvent = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.clientWidth * 0.85;
    const index = Math.round(container.scrollLeft / cardWidth);
    setCurrentMobileIndex(Math.min(Math.max(0, index), strips.length - 1));
  };

  return (
    <div className="w-full space-y-4">
      
      {/* Mobile Swipe Header with Left & Right Arrows (< lg screens) */}
      <div className="lg:hidden flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold">
            Swipe Rituals ({currentMobileIndex + 1} / {strips.length})
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScrollTo('left')}
            className="w-9 h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md active:scale-95"
            aria-label="Previous Service"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScrollTo('right')}
            className="w-9 h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md active:scale-95"
            aria-label="Next Service"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Swipeable Carousel (< lg screens) */}
      <div className="lg:hidden relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScrollEvent}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-1 scrollbar-none no-scrollbar"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {strips.map((strip, index) => (
            <div
              key={strip.id}
              onClick={() => onBookService(strip.serviceId)}
              className="snap-center shrink-0 w-[84vw] sm:w-[360px] h-[390px] relative overflow-hidden border border-[#1D4A35] hover:border-[#B59A62] bg-[#0A1C14] p-5 flex flex-col justify-between shadow-2xl rounded-xs cursor-pointer group"
            >
              {/* Background Photo */}
              <img
                src={strip.image}
                alt={strip.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.78] group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-[#071710]/50 to-transparent" />

              {/* Top Details */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#B59A62] bg-[#0A1C14]/90 px-2.5 py-0.5 border border-[#1D4A35] font-semibold rounded-xs">
                  {strip.kicker}
                </span>
                <span className="text-[10px] text-[#F2EBDD] bg-[#0A1C14]/90 px-2 py-0.5 border border-[#1D4A35] flex items-center gap-1 rounded-xs">
                  <Clock className="w-3 h-3 text-[#B59A62]" />
                  {strip.duration}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2 text-left">
                <h3 className="font-serif text-2xl text-[#F2EBDD] font-normal leading-snug">
                  {strip.title}
                </h3>
                
                <p className="text-xs text-[#D8CBB5] line-clamp-2 font-light leading-relaxed">
                  {strip.description}
                </p>

                {/* Bottom Action */}
                <div className="pt-2.5 border-t border-[#1D4A35] flex items-center justify-between">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-[#9BAA8C] block">From</span>
                    <span className="font-semibold text-base text-[#B59A62] tabular-nums">
                      {strip.priceFrom}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookService(strip.serviceId);
                    }}
                    className="px-4 py-1.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.14em] font-semibold rounded-xs transition-colors inline-flex items-center gap-1.5 shadow-md"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {strips.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentMobileIndex === idx
                  ? 'w-6 bg-[#B59A62]'
                  : 'w-1.5 bg-[#1D4A35]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Dynamic Expandable Accordion (>= lg screens) */}
      <div className="hidden lg:flex w-full h-[520px] gap-2.5 overflow-hidden">
        {strips.map((strip) => {
          const isActive = activeId === strip.id;
          return (
            <div
              key={strip.id}
              onMouseEnter={() => setActiveId(strip.id)}
              onClick={() => onBookService(strip.serviceId)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-out border flex flex-col justify-end p-6 select-none ${
                isActive
                  ? 'flex-[3.2] border-[#B59A62] shadow-2xl'
                  : 'flex-[1] border-[#D8CBB5]/60 hover:border-[#8A6C50]'
              }`}
            >
              {/* Photo background */}
              <img
                src={strip.image}
                alt={strip.title}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  isActive ? 'scale-105 filter brightness-[0.95]' : 'filter brightness-[0.82] grayscale-[20%]'
                }`}
              />

              {/* Gradient Scrim */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#0B2118] via-[#0B2118]/50 to-transparent transition-opacity duration-500 ${
                  isActive ? 'opacity-95' : 'opacity-85'
                }`}
              />

              {/* Inactive Vertical Title Orientation */}
              {!isActive && (
                <div className="relative z-10 h-full flex flex-col justify-between py-2 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#B59A62] font-semibold">
                    {strip.kicker}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-[#F2EBDD] font-normal leading-tight">
                      {strip.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-[#9BAA8C]">
                      <span>{strip.priceFrom}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Active Expanded State with Rich Details */}
              {isActive && (
                <div className="relative z-10 space-y-3.5 text-left animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#1D4A35] pb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold">
                      {strip.kicker}
                    </span>
                    <span className="text-xs text-[#9BAA8C] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B59A62]" />
                      {strip.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl xl:text-4xl text-[#F2EBDD] font-light leading-tight">
                      {strip.title}
                    </h3>
                    <p className="text-xs text-[#D8CBB5] mt-1.5 leading-relaxed font-light">
                      {strip.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {strip.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#F2EBDD]">
                        <Check className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="pt-3 border-t border-[#1D4A35] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9BAA8C] block">Treatment Fee</span>
                      <span className="font-serif text-2xl font-semibold text-[#F2EBDD] tabular-nums">
                        From {strip.priceFrom}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookService(strip.serviceId);
                      }}
                      className="px-6 py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow-xl inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Reserve Treatment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
