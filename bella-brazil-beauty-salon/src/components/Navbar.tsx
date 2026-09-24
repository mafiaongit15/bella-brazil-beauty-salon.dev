import React, { useState, useEffect } from 'react';
import { BellaBrazilLogo } from './BellaBrazilLogo';
import { MessageCircle, Instagram, ShoppingBag, Menu, X, ChevronDown, ArrowRight, ExternalLink, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';
import { SALON_LINKS } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, branchId?: 'seef' | 'saar') => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenCart,
  cartCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const serviceCategories = [
    {
      category: 'Brazilian Smoothing & Hair Care',
      items: [
        { title: 'Authentic Brazilian Blowout', desc: '12-week anti-frizz mirror gloss ceremony', id: 'brazilian-blowout' },
        { title: 'Hair Botox & Deep Repair', desc: 'Amino acid cortex reconstruction & hydration', id: 'hair-botox' },
        { title: 'Keraorganic Smoothing', desc: '100% formaldehyde-free organic formula', id: 'keraorganic' },
        { title: 'Designer Cut & Blowdry', desc: 'Bespoke Brazilian volume styling', id: 'designer-cut' }
      ]
    },
    {
      category: 'Color Artistry & Beauty',
      items: [
        { title: 'Brazilian Balayage & Foilayage', desc: 'Sun-kissed dimensional contour painting', id: 'balayage-dimensional' },
        { title: 'Roots Touch-Up & Acidic Gloss', desc: 'Wella Professionals seamless coverage', id: 'roots-color' },
        { title: 'Russian Manicure & BIAB', desc: '100% dry e-file precision nail architecture', id: 'russian-manicure' },
        { title: 'VIP Bridal Transformation', desc: 'Haute hair & glowing bridal aesthetics', id: 'brazilian-bridal-package' }
      ]
    }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B2118]/95 backdrop-blur-md border-b border-[#1D4A35] py-2 sm:py-2.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B2118]/95 via-[#0B2118]/70 to-transparent py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 sm:h-14">
            
            {/* Left: Official Logo with Brazilian botanical emblem */}
            <a
              href="#"
              className="flex items-center gap-2 group focus:outline-none shrink-0"
              aria-label="Bella Brazil Salon"
            >
              <BellaBrazilLogo variant="full" theme="dark" showSubtitle={false} className="h-9 sm:h-11" />
            </a>

            {/* Center: Streamlined Editorial Desktop Navigation (Separate container with ample right margin) */}
            <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 text-xs font-medium text-[#F2EBDD]/90 tracking-wider uppercase ml-auto mr-8">
              <a href="#" className="hover:text-[#B59A62] transition-colors py-2">
                Home
              </a>

              {/* Unified Services Mega-Dropdown */}
              <div
                className="relative py-2"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    const el = document.getElementById('services');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 hover:text-[#B59A62] transition-colors cursor-pointer uppercase tracking-wider"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#B59A62] transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-[#0A1C14] border border-[#1D4A35] p-5 shadow-2xl animate-fadeIn grid grid-cols-2 gap-5 z-50">
                    {serviceCategories.map((group, gIdx) => (
                      <div key={gIdx} className="space-y-2 text-left">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold pb-1.5 border-b border-[#1D4A35]">
                          {group.category}
                        </div>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                setServicesDropdownOpen(false);
                                onOpenBooking(item.id);
                              }}
                              className="w-full text-left p-2 hover:bg-[#123524] transition-colors group cursor-pointer rounded-xs"
                            >
                              <div className="text-xs text-[#F2EBDD] group-hover:text-[#B59A62] font-medium flex items-center justify-between">
                                <span>{item.title}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#B59A62]" />
                              </div>
                              <div className="text-[10px] text-[#9BAA8C] line-clamp-1 mt-0.5 normal-case">
                                {item.desc}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-[#1D4A35] flex items-center justify-between text-[11px] normal-case">
                      <span className="text-[#9BAA8C]">Available at both Seef & Saar branches</span>
                      <a
                        href={SALON_LINKS.freshaBooking}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B59A62] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]"
                      >
                        <span>View Full Treatment Menu on Fresha</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="#branches" className="hover:text-[#B59A62] transition-colors py-2">
                Branches
              </a>

              <a
                href={SALON_LINKS.onlineStore}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B59A62] transition-colors py-2 flex items-center gap-1"
              >
                <span>Shop</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#B59A62]" />
              </a>

              <a href="#story" className="hover:text-[#B59A62] transition-colors py-2">
                About
              </a>

              <a href="#instagram" className="hover:text-[#B59A62] transition-colors py-2">
                Feed
              </a>

              <a href="#journal" className="hover:text-[#B59A62] transition-colors py-2">
                Journal
              </a>
            </nav>

            {/* Right: Sleek Luxury Action Buttons & Icons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Primary Desktop & Tablet Booking Button (Clear separation) */}
              <a
                href={SALON_LINKS.freshaBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-semibold text-[#0B2118] bg-[#F2EBDD] hover:bg-[#B59A62] border border-[#B59A62]/50 rounded-sm transition-all duration-300 shadow-md hover:shadow-[#B59A62]/20 cursor-pointer whitespace-nowrap group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>Book via Fresha</span>
                <ExternalLink className="w-3 h-3 text-[#0B2118] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Mobile Fast Book Button (Direct on Mobile Header) */}
              <a
                href={SALON_LINKS.freshaBooking}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#0B2118] bg-[#F2EBDD] hover:bg-[#B59A62] rounded-sm shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                <span>Book</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>

              {/* Secondary Desktop Concierge */}
              <button
                onClick={() => onOpenBooking()}
                className="hidden 2xl:inline-flex items-center px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] font-medium text-[#D8CBB5] hover:text-[#F2EBDD] bg-[#123524]/70 hover:bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62]/70 rounded-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <span>Concierge</span>
              </button>

              {/* Social & Utility Icons */}
              <div className="flex items-center gap-1 border-l border-[#1D4A35] pl-1.5 sm:pl-3">
                {/* Direct WhatsApp */}
                <a
                  href={SALON_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-[#D8CBB5] hover:text-[#25D366] transition-colors rounded-sm hover:bg-[#123524]"
                  title="WhatsApp Concierge +973 33520102"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                {/* Direct Instagram */}
                <a
                  href={SALON_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex p-2 text-[#D8CBB5] hover:text-[#E1306C] transition-colors rounded-sm hover:bg-[#123524]"
                  title="Instagram @bellabrazilbeautysalon"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Shopping Bag */}
                <button
                  onClick={onOpenCart}
                  className="relative p-1.5 sm:p-2 text-[#D8CBB5] hover:text-[#B59A62] transition-colors rounded-sm hover:bg-[#123524]"
                  aria-label="Shopping bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-[#B59A62] text-[#0B2118] text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full tabular-nums">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Hamburger Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 text-[#F2EBDD] xl:hidden hover:text-[#B59A62] rounded-sm focus:outline-none ml-1"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-[#B59A62]" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu with Luxury Editorial Styling */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#071710] text-[#F2EBDD] flex flex-col justify-between p-5 pt-20 sm:p-8 xl:hidden overflow-y-auto animate-fadeIn">
          
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1D4A35]">
            <BellaBrazilLogo variant="full" theme="dark" showSubtitle={false} className="h-8" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#9BAA8C] hover:text-[#F2EBDD] border border-[#1D4A35] rounded-sm"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold block text-left">
              Menu & Navigation
            </span>
            
            <nav className="flex flex-col space-y-3.5 font-serif text-xl sm:text-2xl tracking-wide text-left">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#B59A62]" />
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Services & Rituals</span>
                <span className="text-xs font-sans text-[#B59A62] uppercase tracking-wider">7 Rituals</span>
              </a>
              <a
                href="#story"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#B59A62]" />
              </a>
              <a
                href="#branches"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Branches (Seef & Saar)</span>
                <span className="text-[10px] font-sans bg-[#123524] text-[#B59A62] px-2 py-0.5 border border-[#1D4A35] rounded-xs">
                  + KSA Soon
                </span>
              </a>
              <a
                href="#instagram"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Instagram Lookbook</span>
                <span className="text-xs font-sans text-[#E1306C]">@bellabrazil</span>
              </a>
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between border-b border-[#1D4A35]/40"
              >
                <span>Haircare Boutique</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B59A62]" />
              </a>
              <a
                href="#journal"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#B59A62] transition-colors py-1 flex items-center justify-between"
              >
                <span>The Hair Journal</span>
                <ArrowRight className="w-4 h-4 text-[#B59A62]" />
              </a>
            </nav>
          </div>

          {/* Action CTAs in Drawer */}
          <div className="pt-4 border-t border-[#1D4A35] space-y-2.5">
            <a
              href={SALON_LINKS.freshaBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.16em] font-semibold text-center flex items-center justify-center gap-2 rounded-sm shadow-lg transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Book Instantly on Fresha</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={SALON_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-[#123524] hover:bg-[#1a4731] border border-[#1D4A35] text-[#25D366] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+97313110311"
                className="py-2.5 bg-[#123524] hover:bg-[#1a4731] border border-[#1D4A35] text-[#F2EBDD] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-sm"
              >
                <Phone className="w-3.5 h-3.5 text-[#B59A62]" />
                <span>Call 13110311</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#9BAA8C] pt-2">
              <span>🇧🇭 Seef Flagship & Saar Sanctuary</span>
              <span>🇸🇦 Khobar Soon</span>
            </div>
          </div>

        </div>
      )}

      {/* Sticky Luxury Mobile Bottom Navigation Bar (< lg screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071710]/95 backdrop-blur-md border-t border-[#1D4A35] px-3 py-2 flex items-center justify-between shadow-2xl safe-bottom">
        
        {/* Services shortcut */}
        <button
          onClick={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex-1 flex flex-col items-center justify-center text-[#9BAA8C] hover:text-[#F2EBDD] transition-colors py-1"
        >
          <Sparkles className="w-4 h-4 text-[#B59A62]" />
          <span className="text-[9px] uppercase tracking-wider mt-0.5">Services</span>
        </button>

        {/* Primary Central Instant Book Button */}
        <a
          href={SALON_LINKS.freshaBooking}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.8] mx-2 py-2 px-3 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-[11px] font-bold uppercase tracking-[0.14em] text-center flex items-center justify-center gap-1.5 rounded-sm shadow-lg transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>Book Online</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>

        {/* WhatsApp direct */}
        <a
          href={SALON_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center text-[#9BAA8C] hover:text-[#25D366] transition-colors py-1"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span className="text-[9px] uppercase tracking-wider mt-0.5">WhatsApp</span>
        </a>

        {/* Call direct */}
        <a
          href="tel:+97313110311"
          className="flex-1 flex flex-col items-center justify-center text-[#9BAA8C] hover:text-[#F2EBDD] transition-colors py-1"
        >
          <Phone className="w-4 h-4 text-[#B59A62]" />
          <span className="text-[9px] uppercase tracking-wider mt-0.5">Call</span>
        </a>

      </div>
    </>
  );
};
