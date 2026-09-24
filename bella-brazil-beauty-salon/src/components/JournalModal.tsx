import React from 'react';
import { X, Calendar, Clock, User, ArrowRight, Share2 } from 'lucide-react';
import { Article } from '../data/salonData';

interface JournalModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  article,
  onClose,
  onOpenBooking
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0B2118] border border-[#1D4A35] text-[#F2EBDD] shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#0B2118]/80 text-[#F2EBDD] hover:text-[#B59A62] border border-[#1D4A35] flex items-center justify-center transition-colors"
          aria-label="Close article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118] via-[#0B2118]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold">
              {article.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F2EBDD] leading-tight">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Meta Bar */}
        <div className="px-6 py-3 border-y border-[#1D4A35] bg-[#123524]/40 flex flex-wrap items-center justify-between text-xs text-[#9BAA8C] gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#B59A62]" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B59A62]" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B59A62]" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#D8CBB5] text-sm sm:text-base leading-relaxed font-light">
          <p className="font-serif text-lg sm:text-xl text-[#F2EBDD] italic border-l-2 border-[#B59A62] pl-4 py-1">
            "{article.excerpt}"
          </p>

          {article.content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Editorial Callout */}
          <div className="p-6 bg-[#123524]/60 border border-[#1D4A35] space-y-3 mt-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold">
              The Salon Recommendation
            </span>
            <h4 className="font-serif text-xl text-[#F2EBDD]">
              Experience This Treatment in Bahrain
            </h4>
            <p className="text-xs text-[#9BAA8C] leading-relaxed">
              Consult with our Brazilian styling specialists at our Seef flagship or Saar boutique sanctuary to tailor this ritual for your individual hair texture.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                Schedule Consultation <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
