import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Natural Texture & Gulf Humidity Damage',
  afterLabel = 'Authentic Brazilian Blowout & Botanical Seal',
  title = 'The Luminous Transformation',
  subtitle = 'Observe the transition from unmanageable frizz to high-gloss mirror alignment.'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62]">
          Clinical Before & After
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EBDD]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#9BAA8C] leading-relaxed">{subtitle}</p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full max-w-4xl mx-auto aspect-[16/9] select-none overflow-hidden cursor-ew-resize border border-[#1D4A35] shadow-2xl bg-[#0B2118]"
      >
        {/* AFTER Image (Full background layer) */}
        <img
          src={afterImage}
          alt={afterLabel}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[1.03]"
        />

        {/* BEFORE Image (Clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none filter contrast-90 brightness-95"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Divider line and luxury brass handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#F2EBDD] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#0B2118] border-2 border-[#B59A62] text-[#F2EBDD] flex items-center justify-center shadow-lg text-[10px] tracking-tighter">
            <span className="font-mono">‹ ›</span>
          </div>
        </div>

        {/* Badges / Labels on images */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-[#0B2118]/80 text-[#F2EBDD] backdrop-blur-xs border border-[#1D4A35]">
            Before
          </span>
        </div>
        <div className="absolute top-4 right-4 pointer-events-none">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-[#0B2118]/80 text-[#B59A62] backdrop-blur-xs border border-[#B59A62]/40">
            After Bella Ritual
          </span>
        </div>

        {/* Bottom subtle captions */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#F2EBDD]/90 pointer-events-none bg-gradient-to-t from-[#0B2118]/90 via-[#0B2118]/50 to-transparent p-2">
          <span className="hidden sm:inline font-light drop-shadow-sm">{beforeLabel}</span>
          <span className="text-[10px] text-[#9BAA8C] uppercase tracking-wider mx-auto sm:mx-0">
            Drag to inspect transformation
          </span>
          <span className="hidden sm:inline font-light text-right drop-shadow-sm">{afterLabel}</span>
        </div>
      </div>
    </div>
  );
};
