import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Calendar,
  ShoppingBag,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  Share2
} from 'lucide-react';
import { SALON_LINKS } from '../data/salonData';

export const FloatingBrandHub: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscGainRef = useRef<GainNode | null>(null);

  // Synthesize gentle calming tropical spa acoustic waves on demand
  const toggleSpaAmbience = () => {
    if (isAudioPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsAudioPlaying(false);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        oscGainRef.current = masterGain;

        // Warm drone chord (Spa warmth)
        const freqs = [174, 217.5, 261, 348]; // Solfeggio relaxation harmony
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);

          osc.connect(filter);
          if (panner) {
            filter.connect(panner);
            panner.connect(masterGain);
          } else {
            filter.connect(masterGain);
          }
          osc.start();
        });
      } else {
        audioCtxRef.current.resume();
      }

      setIsAudioPlaying(true);
    } catch {
      // Audio autoplay restrictions
      setIsAudioPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-30 flex-col items-end">
      
      {/* Expanded Quick Hub Panel */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#0B2118]/95 backdrop-blur-md border border-[#B59A62] shadow-2xl p-5 text-[#F2EBDD] space-y-4 animate-fadeIn">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1D4A35] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 border border-[#B59A62]">
                <img
                  src="/src/assets/images/official_ig_pfp_logo.jpg"
                  alt="Bella Brazil"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#F2EBDD]">
                  Bella Brazil Quick Hub
                </h4>
                <p className="text-[10px] text-[#B59A62] uppercase tracking-wider">
                  Official Direct Links
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9BAA8C] hover:text-[#F2EBDD] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            {/* Direct Fresha Online Booking */}
            <a
              href={SALON_LINKS.freshaBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Fresha</span>
              </div>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Official Online Store */}
            <a
              href={SALON_LINKS.onlineStore}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-[#123524] hover:bg-[#1D4A35] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-between shadow-sm group"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5 text-[#B59A62]" />
                <span>Store BH</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#9BAA8C] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Branch Google Maps Locations */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9BAA8C] block font-semibold">
              Visit Branches (Google Maps)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={SALON_LINKS.mapsSaar}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-[#123524] border border-[#1D4A35] flex items-center gap-1.5 text-[#D8CBB5] hover:text-[#F2EBDD] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
                <span className="truncate">Saar Branch ↗</span>
              </a>
              <a
                href={SALON_LINKS.mapsSeef}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-[#123524] border border-[#1D4A35] flex items-center gap-1.5 text-[#D8CBB5] hover:text-[#F2EBDD] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
                <span className="truncate">Seef Branch ↗</span>
              </a>
            </div>
          </div>

          {/* Direct Social Channels Grid */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9BAA8C] block font-semibold">
              Official Social Media
            </span>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              
              {/* WhatsApp */}
              <a
                href={SALON_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-[#25D366]/20 border border-[#1D4A35] hover:border-[#25D366] text-[#F2EBDD] flex flex-col items-center justify-center transition-all group"
                title="WhatsApp +973 33520102"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span className="text-[8px] uppercase tracking-wider mt-1 text-[#9BAA8C] group-hover:text-[#F2EBDD]">WA</span>
              </a>

              {/* Instagram */}
              <a
                href={SALON_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-[#E1306C]/20 border border-[#1D4A35] hover:border-[#E1306C] text-[#F2EBDD] flex flex-col items-center justify-center transition-all group"
                title="Instagram @BELLABRAZILBEAUTYSALON"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span className="text-[8px] uppercase tracking-wider mt-1 text-[#9BAA8C] group-hover:text-[#F2EBDD]">IG</span>
              </a>

              {/* TikTok */}
              <a
                href={SALON_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-cyan-500/20 border border-[#1D4A35] hover:border-cyan-400 text-[#F2EBDD] flex flex-col items-center justify-center transition-all group"
                title="TikTok @bellabrazilbeautysalon"
              >
                <svg className="w-4 h-4 text-cyan-400 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.49V8.75a8.16 8.16 0 0 0 4.81 1.54v-3.6z" />
                </svg>
                <span className="text-[8px] uppercase tracking-wider mt-1 text-[#9BAA8C] group-hover:text-[#F2EBDD]">TT</span>
              </a>

              {/* Facebook */}
              <a
                href={SALON_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-[#1877F2]/20 border border-[#1D4A35] hover:border-[#1877F2] text-[#F2EBDD] flex flex-col items-center justify-center transition-all group"
                title="Facebook @bellabrazilbeautysalon"
              >
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span className="text-[8px] uppercase tracking-wider mt-1 text-[#9BAA8C] group-hover:text-[#F2EBDD]">FB</span>
              </a>

              {/* Snapchat */}
              <a
                href={SALON_LINKS.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#0A1C14] hover:bg-yellow-400/20 border border-[#1D4A35] hover:border-yellow-400 text-[#F2EBDD] flex flex-col items-center justify-center transition-all group"
                title="Snapchat @bella_brazilbh"
              >
                <span className="text-yellow-400 font-bold text-xs">👻</span>
                <span className="text-[8px] uppercase tracking-wider mt-1 text-[#9BAA8C] group-hover:text-[#F2EBDD]">SC</span>
              </a>

            </div>
          </div>

          {/* Tropical Spa Ambience Audio Switch */}
          <div className="pt-2 border-t border-[#1D4A35] flex items-center justify-between text-xs">
            <button
              onClick={toggleSpaAmbience}
              className="flex items-center gap-2 text-[#9BAA8C] hover:text-[#B59A62] transition-colors cursor-pointer"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-[#25D366] animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="text-[11px]">
                {isAudioPlaying ? 'Playing Spa Ambience 🌿' : 'Enable Spa Ambience'}
              </span>
            </button>

            <span className="text-[9px] text-[#9BAA8C] font-mono">120 FPS</span>
          </div>

        </div>
      )}

      {/* Main Trigger Floating Pill */}
      <div className="flex items-center gap-2">
        {/* Direct Quick Fresha Pill */}
        <a
          href={SALON_LINKS.freshaBooking}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-wider font-semibold rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 group hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Book on Fresha</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Toggle Hub Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full bg-[#0B2118] border border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          title="Open Official Links & Quick Hub"
          aria-label="Open Links Hub"
        >
          {isOpen ? <ChevronUp className="w-5 h-5 rotate-180 transition-transform" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

    </div>
  );
};
