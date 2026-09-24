import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, RefreshCw } from 'lucide-react';

interface QuestionOption {
  label: string;
  desc: string;
  icon: string;
}

interface DiagnosisResult {
  treatmentName: string;
  tagline: string;
  description: string;
  idealFor: string;
  duration: string;
  priceFrom: number;
  serviceId: string;
  botanicalKey: string;
  maintenanceTip: string;
}

export const HairRitualMatcher: React.FC<{
  onBookTreatment: (serviceId: string) => void;
}> = ({ onBookTreatment }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hairType, setHairType] = useState<string>('frizzy');
  const [primaryGoal, setPrimaryGoal] = useState<string>('anti_frizz');

  const hairTypeOptions: Record<string, QuestionOption> = {
    frizzy: {
      label: 'Frizzy & Humidity Sensitive',
      desc: 'Puffs up in Bahrain heat, unruly texture, loses sleekness quickly.',
      icon: '🌊'
    },
    damaged: {
      label: 'Bleached, Dry or Chemically Stressed',
      desc: 'Brittle ends, porous texture from balayage or chlorine/tap water.',
      icon: '✨'
    },
    thick: {
      label: 'Thick, Coarse or Resistant Curls',
      desc: 'Takes hours to blowdry, requires high heat to tame.',
      icon: '🌿'
    },
    fine: {
      label: 'Fine, Dull or Lacking Volume',
      desc: 'Weighed down easily, craves mirror gloss without losing movement.',
      icon: '💎'
    }
  };

  const goalOptions: Record<string, QuestionOption> = {
    anti_frizz: {
      label: 'Eliminate Gulf Humidity Frizz for 12 Weeks',
      desc: 'Wash-and-go sleekness, 80% faster morning blowdrying.',
      icon: '🛡️'
    },
    repair: {
      label: 'Deep Fiber Restructuring & Collagen Plumping',
      desc: 'Restore elasticity, seal split ends, stop breakage.',
      icon: '🧬'
    },
    smooth_organic: {
      label: 'Formaldehyde-Free Natural Smoothing',
      desc: '100% plant-based organic discipline with pracaxi bio-lipids.',
      icon: '🌱'
    },
    color_gloss: {
      label: 'Sun-Kissed Brazilian Balayage & Mirror Gloss',
      desc: 'Multi-dimensional caramel, honey, or copper contouring.',
      icon: '🎨'
    }
  };

  const getRecommendation = (): DiagnosisResult => {
    if (primaryGoal === 'repair' || hairType === 'damaged') {
      return {
        treatmentName: 'Bio-Collagen Hair Botox Ritual',
        tagline: 'Intensive Structural Reconstruction for Porous Strands',
        description: 'An advanced micro-molecular treatment that deposits bio-identical collagen, plant peptides, and hyaluronic acid directly into the depleted cortex.',
        idealFor: 'Bleached, colored, heat-styled, or fragile hair suffering from mineral water exposure.',
        duration: '~90 minutes',
        priceFrom: 65,
        serviceId: 'hair-botox',
        botanicalKey: 'Amazonian Murumuru Butter & Hydrolyzed Plant Keratin',
        maintenanceTip: 'Use sulfate-free K18 or Wella Elements to retain internal hydration for 8-10 weeks.'
      };
    }

    if (primaryGoal === 'smooth_organic') {
      return {
        treatmentName: 'Keraorganic 100% Formaldehyde-Free',
        tagline: 'Clean Amazonian Bio-Smoothing Ceremony',
        description: 'Certified formaldehyde-free smoothing powered by cold-pressed Pracaxi oil, organic fruit acids, and nano-proteins that align the cuticle safely.',
        idealFor: 'Sensitive scalps, expectant mothers, or clients demanding a pure botanical smoothing ceremony.',
        duration: '~120 minutes',
        priceFrom: 80,
        serviceId: 'keraorganic',
        botanicalKey: 'Cold-Pressed Pracaxi Tree Oil & Glyoxylic Botanical Complex',
        maintenanceTip: 'Wash with warm rather than boiling water; style using low to medium heat.'
      };
    }

    if (primaryGoal === 'color_gloss') {
      return {
        treatmentName: 'Bespoke Brazilian Balayage & Glaze',
        tagline: 'Custom Dimensional Hair Contouring',
        description: 'Freehand painted ribbons designed to complement your facial structure and skin undertones, finished with an acidic shine glaze.',
        idealFor: 'Brunettes seeking sun-kissed honey warmth or blondes craving seamless root grow-out.',
        duration: '~150 minutes',
        priceFrom: 75,
        serviceId: 'balayage-dimensional',
        botanicalKey: 'Bond-protecting antioxidant oils and Kadus tone pigments',
        maintenanceTip: 'Schedule a tone glaze refresher every 6 weeks to maintain mirror warmth.'
      };
    }

    return {
      treatmentName: 'Authentic Brazilian Blowout Original',
      tagline: 'The Gold Standard Anti-Humidity Barrier',
      description: 'The world’s most effective professional smoothing treatment. Creates a protective protein layer around each hair shaft to completely seal out Gulf humidity.',
      idealFor: 'Frizzy, wavy, or unruly hair demanding maximum morning blowdry reduction and glass-like shine.',
      duration: '~120 minutes',
      priceFrom: 70,
      serviceId: 'brazilian-blowout',
      botanicalKey: 'Brazilian Super-Nutrient Complex & Acai Berry Bio-Extracts',
      maintenanceTip: 'Wash and swim immediately without 72-hour wait times; results endure up to 12 weeks.'
    };
  };

  const result = getRecommendation();

  return (
    <div className="w-full bg-[#0A1C14] border border-[#1D4A35] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1D4A35]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mb-8 space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#B59A62]" />
          <span>Bespoke Hair Diagnostic</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl text-[#F2EBDD] font-light">
          Find Your Ideal Brazilian Ritual
        </h3>
        <p className="text-xs sm:text-sm text-[#9BAA8C]">
          Answer two brief questions to diagnose your strand condition and reveal the tailored formula prescribed by our master Brazilian colorists.
        </p>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center gap-2 mb-8 relative z-10 border-b border-[#1D4A35] pb-4">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center gap-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            step === 1 ? 'text-[#F2EBDD] font-semibold' : 'text-[#9BAA8C] hover:text-[#F2EBDD]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
            step === 1 ? 'bg-[#B59A62] text-[#0B2118]' : 'bg-[#123524] text-[#9BAA8C]'
          }`}>
            1
          </span>
          <span>Strand Texture</span>
        </button>

        <span className="text-[#1D4A35] text-xs">/</span>

        <button
          onClick={() => setStep(2)}
          className={`flex items-center gap-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            step === 2 ? 'text-[#F2EBDD] font-semibold' : 'text-[#9BAA8C] hover:text-[#F2EBDD]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
            step === 2 ? 'bg-[#B59A62] text-[#0B2118]' : 'bg-[#123524] text-[#9BAA8C]'
          }`}>
            2
          </span>
          <span>Primary Goal</span>
        </button>

        <span className="text-[#1D4A35] text-xs">/</span>

        <button
          onClick={() => setStep(3)}
          className={`flex items-center gap-2 text-xs uppercase tracking-wider transition-colors cursor-pointer ${
            step === 3 ? 'text-[#F2EBDD] font-semibold' : 'text-[#9BAA8C] hover:text-[#F2EBDD]'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
            step === 3 ? 'bg-[#B59A62] text-[#0B2118]' : 'bg-[#123524] text-[#9BAA8C]'
          }`}>
            3
          </span>
          <span>Prescription</span>
        </button>
      </div>

      {/* Step 1: Hair Type */}
      {step === 1 && (
        <div className="space-y-6 relative z-10 animate-fadeIn">
          <p className="text-xs uppercase tracking-widest text-[#B59A62]">
            Step 1 of 2: How would you describe your hair right now?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(hairTypeOptions).map(([key, opt]) => (
              <div
                key={key}
                onClick={() => {
                  setHairType(key);
                  setStep(2);
                }}
                className={`p-5 border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  hairType === key
                    ? 'border-[#B59A62] bg-[#123524] shadow-lg'
                    : 'border-[#1D4A35] bg-[#0B2118]/60 hover:border-[#9BAA8C]'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#F2EBDD]">{opt.label}</h4>
                  <p className="text-xs text-[#9BAA8C] leading-relaxed">{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Primary Goal */}
      {step === 2 && (
        <div className="space-y-6 relative z-10 animate-fadeIn">
          <p className="text-xs uppercase tracking-widest text-[#B59A62]">
            Step 2 of 2: What is your primary transformation objective?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(goalOptions).map(([key, opt]) => (
              <div
                key={key}
                onClick={() => {
                  setPrimaryGoal(key);
                  setStep(3);
                }}
                className={`p-5 border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  primaryGoal === key
                    ? 'border-[#B59A62] bg-[#123524] shadow-lg'
                    : 'border-[#1D4A35] bg-[#0B2118]/60 hover:border-[#9BAA8C]'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-[#F2EBDD]">{opt.label}</h4>
                  <p className="text-xs text-[#9BAA8C] leading-relaxed">{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#9BAA8C] hover:text-[#F2EBDD] transition-colors"
            >
              ← Back to Step 1
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Diagnostic Prescription */}
      {step === 3 && (
        <div className="relative z-10 space-y-6 animate-fadeIn">
          <div className="bg-[#123524] border border-[#B59A62] p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#1D4A35] pb-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold">
                  Prescribed Clinical Ceremony
                </span>
                <h4 className="font-serif text-2xl sm:text-4xl text-[#F2EBDD] font-light">
                  {result.treatmentName}
                </h4>
                <p className="text-xs text-[#D8CBB5] italic font-serif">
                  "{result.tagline}"
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] text-[#9BAA8C] uppercase tracking-wider block">Estimated Fee</span>
                <span className="font-serif text-2xl font-semibold text-[#F2EBDD] tabular-nums">
                  From BHD {result.priceFrom}
                </span>
                <span className="text-[11px] text-[#9BAA8C] block">{result.duration}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D8CBB5] leading-relaxed font-light">
              {result.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 bg-[#0B2118]/80 border border-[#1D4A35] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#B59A62] block">
                  Active Botanical Core
                </span>
                <p className="text-[#F2EBDD]">{result.botanicalKey}</p>
              </div>

              <div className="p-3 bg-[#0B2118]/80 border border-[#1D4A35] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#B59A62] block">
                  Stylist Home Prescription
                </span>
                <p className="text-[#9BAA8C]">{result.maintenanceTip}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#1D4A35]">
              <button
                onClick={() => onBookTreatment(result.serviceId)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Reserve This Prescribed Ritual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#9BAA8C] hover:text-[#F2EBDD] inline-flex items-center gap-1.5 transition-colors cursor-pointer py-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart Diagnostic</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
