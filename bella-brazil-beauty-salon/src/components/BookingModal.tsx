import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, Clock, MapPin, Sparkles, MessageCircle, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { BRANCHES_DATA, SERVICES_DATA, TEAM_DATA, SALON_LINKS, Service, Branch, TeamMember } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialBranchId?: 'seef' | 'saar';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialBranchId
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBranch, setSelectedBranch] = useState<'seef' | 'saar'>(initialBranchId || 'seef');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (initialBranchId) {
      setSelectedBranch(initialBranchId);
    }
    if (initialServiceId) {
      const found = SERVICES_DATA.find((s) => s.id === initialServiceId);
      if (found) {
        setSelectedService(found);
      }
    }
  }, [initialServiceId, initialBranchId]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Rituals' },
    { id: 'brazilian', label: 'Brazilian Rituals' },
    { id: 'color', label: 'Color & Highlights' },
    { id: 'hair', label: 'Haircuts & Styling' },
    { id: 'nails', label: 'Russian Nails & Spa' },
    { id: 'bridal', label: 'Bridal & Occasion' },
    { id: 'facial', label: 'Facial & Skin' }
  ];

  const filteredServices = SERVICES_DATA.filter((s) => {
    const matchesBranch = s.branchAvailability.includes(selectedBranch);
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesBranch && matchesCategory;
  });

  const availableStylists = TEAM_DATA.filter(
    (t) => t.branch === 'Both Branches' || (selectedBranch === 'seef' && t.branch === 'Seef') || (selectedBranch === 'saar' && t.branch === 'Saar')
  );

  const timeSlots = [
    '10:30 AM', '11:45 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM', '7:00 PM'
  ];

  // Tomorrow as default date helper
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleScheduleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      return;
    }
    setBookingConfirmed(true);
  };

  const currentBranchObj = BRANCHES_DATA.find((b) => b.id === selectedBranch) || BRANCHES_DATA[0];

  const createWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Bella Brazil Salon! I would like to confirm my appointment request:\n\n` +
      `• Branch: ${currentBranchObj.name}\n` +
      `• Service: ${selectedService?.name} (BHD ${selectedService?.priceFrom})\n` +
      `• Date: ${selectedDate} at ${selectedTime}\n` +
      `• Stylist: ${selectedStylist === 'any' ? 'First Available Specialist' : selectedStylist}\n` +
      `• Client Name: ${clientName}\n` +
      `• Phone: ${clientPhone}\n` +
      (clientNotes ? `• Notes: ${clientNotes}\n` : '') +
      `\nPlease let me know if this slot is available.`
    );
    window.open(`https://wa.me/97333520102?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0B2118] border border-[#1D4A35] text-[#F2EBDD] shadow-2xl overflow-hidden">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D4A35] bg-[#123524]/60">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold">
              Bella Brazil Concierge
            </span>
            <h2 className="font-serif text-xl sm:text-2xl tracking-wide text-[#F2EBDD]">
              Reserve Your Salon Experience
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BAA8C] hover:text-[#F2EBDD] transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Direct Fresha Instant Booking Banner */}
        <div className="bg-gradient-to-r from-[#123524] via-[#1A4230] to-[#123524] border-b border-[#B59A62]/40 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#F2EBDD]">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-medium text-[#D8CBB5]">
              Real-time slot calendar & instant confirmation available on Fresha:
            </span>
          </div>
          <a
            href={SALON_LINKS.freshaBooking}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-[10px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Book on Fresha</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Branch Segmented Selector */}
        <div className="px-6 pt-4 pb-2 bg-[#0B2118] border-b border-[#1D4A35]/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-[#123524] p-1 border border-[#1D4A35]">
            <button
              onClick={() => setSelectedBranch('seef')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedBranch === 'seef'
                  ? 'bg-[#F2EBDD] text-[#0B2118]'
                  : 'text-[#9BAA8C] hover:text-[#F2EBDD]'
              }`}
            >
              Seef Flagship
            </button>
            <button
              onClick={() => setSelectedBranch('saar')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                selectedBranch === 'saar'
                  ? 'bg-[#F2EBDD] text-[#0B2118]'
                  : 'text-[#9BAA8C] hover:text-[#F2EBDD]'
              }`}
            >
              Saar Garden
            </button>
          </div>
          <div className="text-[11px] text-[#9BAA8C] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B59A62]" />
            <span>Hours: {currentBranchObj.hours}</span>
          </div>
        </div>

        {/* Booking Process Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {bookingConfirmed ? (
            /* Confirmation View */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-[#123524] border border-[#B59A62] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#B59A62]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#B59A62]">Appointment Requested</span>
                <h3 className="font-serif text-3xl text-[#F2EBDD]">We Look Forward to Welcoming You</h3>
                <p className="text-sm text-[#9BAA8C] max-w-md mx-auto leading-relaxed">
                  Your ritual request has been logged with our salon reservation team at{' '}
                  <strong className="text-[#F2EBDD]">{currentBranchObj.name}</strong>.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-[#123524]/60 border border-[#1D4A35] p-5 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#1D4A35] pb-2">
                  <span className="text-[#9BAA8C]">Service</span>
                  <span className="font-medium text-[#F2EBDD]">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#1D4A35] pb-2">
                  <span className="text-[#9BAA8C]">Branch</span>
                  <span className="font-medium text-[#F2EBDD]">{currentBranchObj.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#1D4A35] pb-2">
                  <span className="text-[#9BAA8C]">Date & Time</span>
                  <span className="font-medium text-[#F2EBDD]">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between border-b border-[#1D4A35] pb-2">
                  <span className="text-[#9BAA8C]">Client</span>
                  <span className="font-medium text-[#F2EBDD]">{clientName} ({clientPhone})</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#9BAA8C]">Starting From</span>
                  <span className="font-semibold text-[#B59A62] tabular-nums text-sm">BHD {selectedService?.priceFrom}</span>
                </div>
              </div>

              {/* Immediate WhatsApp Forward CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={createWhatsAppInquiry}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#0B2118] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Confirm Instantly on WhatsApp (+973 33520102)
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 border border-[#1D4A35] hover:border-[#9BAA8C] text-[#F2EBDD] text-xs uppercase tracking-wider transition-colors"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1: Select Service */
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#9BAA8C] mb-3">
                  Step 1 · Choose Your Treatment
                </p>
                {/* Category filters */}
                <div className="flex flex-wrap gap-2 pb-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-[#1D4A35] text-[#F2EBDD] font-medium border border-[#B59A62]/40'
                          : 'bg-[#123524]/60 text-[#9BAA8C] hover:text-[#F2EBDD] border border-transparent'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedService?.id === service.id
                        ? 'border-[#B59A62] bg-[#123524]'
                        : 'border-[#1D4A35] bg-[#123524]/30 hover:border-[#9BAA8C]/50 hover:bg-[#123524]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#B59A62]">
                          {service.categoryLabel}
                        </span>
                        <span className="text-xs font-semibold text-[#F2EBDD] tabular-nums">
                          From BHD {service.priceFrom}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#F2EBDD] mb-1">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#9BAA8C] line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#1D4A35]/60 flex items-center justify-between text-[11px] text-[#9BAA8C]">
                      <span>Approx. {service.durationMinutes} mins</span>
                      <span className="inline-flex items-center gap-1 text-[#F2EBDD] group-hover:text-[#B59A62]">
                        Select <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Step 2: Date, Time & Client Details */
            <form onSubmit={handleScheduleConfirm} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1D4A35]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B59A62]">
                    Selected Ritual
                  </span>
                  <h4 className="font-serif text-xl text-[#F2EBDD]">
                    {selectedService?.name}
                  </h4>
                  <p className="text-xs text-[#9BAA8C]">
                    Duration: ~{selectedService?.durationMinutes} mins · Starting from BHD {selectedService?.priceFrom}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#B59A62] hover:underline"
                >
                  Change Ritual
                </button>
              </div>

              {/* Stylist Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-2">
                  Specialist / Artist
                </label>
                <select
                  value={selectedStylist}
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B59A62]"
                >
                  <option value="any">First Available Senior Specialist</option>
                  {availableStylists.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name} — {st.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    min={getTomorrowDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B59A62]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-2">
                    Preferred Time Slot
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-1 text-[11px] text-center transition-colors border ${
                          selectedTime === slot
                            ? 'bg-[#B59A62] text-[#0B2118] border-[#B59A62] font-semibold'
                            : 'bg-[#123524] border-[#1D4A35] text-[#F2EBDD] hover:border-[#9BAA8C]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Contact Info */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Al-Mansoor"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B59A62] placeholder:text-[#9BAA8C]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-1">
                      Bahrain Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+973 XXXXXXXX"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2.5 focus:outline-none focus:border-[#B59A62] placeholder:text-[#9BAA8C]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9BAA8C] mb-1">
                    Special Hair or Skin Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Previously bleached hair, natural curly texture, allergic to certain fragrances..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2 focus:outline-none focus:border-[#B59A62] placeholder:text-[#9BAA8C]/50 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1D4A35]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#9BAA8C] hover:text-[#F2EBDD]"
                >
                  ← Back to Treatments
                </button>
                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !clientName || !clientPhone}
                  className="px-6 py-3 bg-[#F2EBDD] text-[#0B2118] hover:bg-[#B59A62] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Confirm Reservation Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
