/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';

import blowoutHero from './assets/images/ig_blowout_hero_1790209445244.jpg';
import officialLogo from './assets/images/official_ig_pfp_logo.jpg';
import isabelaStyling from './assets/images/ig_isabela_styling_1790209434003.jpg';
import salonInterior from './assets/images/ig_salon_interior_1790209422670.jpg';
import botoxGloss from './assets/images/ig_botox_gloss_1790209411685.jpg';
import balayageHair from './assets/images/ig_balayage_hair_1790209400030.jpg';
import saarBoutique from './assets/images/salon_saar_boutique_1790208970976.jpg';
import editorialHairColor from './assets/images/editorial_hair_color_1790208584488.jpg';

import {
  ArrowRight,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  MapPin,
  Clock,
  ChevronDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { BellaBrazilLogo } from './components/BellaBrazilLogo';
import { BookingModal } from './components/BookingModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { JournalModal } from './components/JournalModal';
import { MarqueeTicker } from './components/MarqueeTicker';
import { StatsCounter } from './components/StatsCounter';
import { ServiceExpandGallery } from './components/ServiceExpandGallery';
import { HairRitualMatcher } from './components/HairRitualMatcher';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { InteractiveGlowCursor } from './components/InteractiveGlowCursor';
import { FloatingBrandHub } from './components/FloatingBrandHub';
import { TiltCard } from './components/TiltCard';

import {
  BRANCHES_DATA,
  SERVICES_DATA,
  PRODUCTS_DATA,
  ARTICLES_DATA,
  TEAM_DATA,
  REVIEWS_DATA,
  SALON_LINKS,
  Product,
  Article,
  Service
} from './data/salonData';

export default function App() {
  // Modal & Drawer State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState<string | undefined>();
  const [bookingInitialBranch, setBookingInitialBranch] = useState<'seef' | 'saar'>('seef');

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1 }
  ]);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Carousel Refs
  const branchesScrollRef = useRef<HTMLDivElement>(null);
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const journalScrollRef = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: 'left' | 'right'
  ) => {
    if (!ref.current) return;

    const container = ref.current;
    const scrollAmount =
      container.clientWidth > 640
        ? 380
        : container.clientWidth * 0.85;

    const delta = direction === 'left'
      ? -scrollAmount
      : scrollAmount;

    container.scrollBy({
      left: delta,
      behavior: 'smooth'
    });
  };

  // Booking trigger helper
  const handleOpenBooking = (
    serviceId?: string,
    branchId?: 'seef' | 'saar'
  ) => {
    setBookingInitialService(serviceId);

    if (branchId) {
      setBookingInitialBranch(branchId);
    }

    setBookingModalOpen(true);
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1
        }
      ];
    });

    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter(
          (item) => item.product.id !== productId
        )
      );

      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity
            }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0B2118] text-[#F2EBDD] font-sans selection:bg-[#B59A62]/30 selection:text-[#F2EBDD] relative overflow-x-hidden pb-14 lg:pb-0">

      {/* 120FPS AMBIENT GLOW CURSOR */}
      <InteractiveGlowCursor />

      {/* GLOBAL HEADER */}
      <Navbar
        onOpenBooking={(s, b) => handleOpenBooking(s, b)}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-between overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-12">

        {/* Full-bleed Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={blowoutHero}
            alt="Brazilian Beauty in the Wild - Bella Brazil Salon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_35%] filter brightness-[0.88] contrast-[1.05]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2118]/85 via-[#0B2118]/40 to-[#0B2118]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118] via-transparent to-[#0B2118]/40" />
        </div>

        {/* Bird of paradise flower */}
        <div className="absolute bottom-8 left-4 sm:left-12 z-10 pointer-events-none opacity-90 hidden sm:block animate-sway">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="drop-shadow-lg"
          >
            <path d="M20 90 Q 60 70 80 20 Q 55 45 35 65 Z" fill="#E86C32" />
            <path d="M25 85 Q 70 60 90 15 Q 65 40 40 60 Z" fill="#2A73A4" />
            <path d="M15 95 Q 50 80 70 30 Q 48 50 30 70 Z" fill="#E87A24" />
            <path d="M10 100 Q 30 65 5 40 Q 25 75 20 95 Z" fill="#1D4A35" />
          </svg>
        </div>

        {/* Toucan */}
        <div className="absolute top-24 right-8 sm:right-16 z-10 pointer-events-none opacity-95 hidden lg:block animate-floatGentle">
          <svg
            width="100"
            height="90"
            viewBox="0 0 100 90"
            fill="none"
            className="drop-shadow-xl"
          >
            <ellipse cx="65" cy="50" rx="18" ry="22" fill="#171914" />
            <circle cx="56" cy="42" r="10" fill="#FFFFFF" />
            <circle cx="54" cy="42" r="3" fill="#171914" />
            <path
              d="M 60 36 Q 95 38 88 60 Q 66 52 60 45 Z"
              fill="#E87A24"
            />
            <path
              d="M 75 42 Q 95 38 88 60 Q 80 50 75 42 Z"
              fill="#B02525"
            />
            <path
              d="M 35 75 Q 75 70 95 80"
              stroke="#8A6C50"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl py-8 sm:py-16 lg:py-20 flex flex-col items-start text-left">

          {/* Official Logo */}
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-6 p-1 sm:p-1.5 pr-3.5 sm:pr-4 rounded-full bg-[#0B2118]/85 backdrop-blur-md border border-[#B59A62]/70 shadow-2xl">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white p-0.5 border border-[#B59A62] shadow-sm shrink-0">
              <img
                src={officialLogo}
                alt="Bella Brazil Salon Official Brand Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#B59A62] font-semibold">
                BELLA BRAZIL SALON
              </span>

              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#D8CBB5]">
                Brazilian Sanctuary · Seef & Saar
              </span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#F2EBDD] leading-[0.96] sm:leading-[0.92] mb-4 sm:mb-6 drop-shadow-md">
            BEAUTY <br />
            <span className="italic font-normal">
              IN THE WILD
            </span>
          </h1>

          <p className="text-sm sm:text-xl text-[#F2EBDD]/90 font-light tracking-wide mb-6 sm:mb-8">
            Brazilian beauty, elevated.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">

            <a
              href={SALON_LINKS.freshaBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 sm:py-3 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-xl rounded-xs border border-[#B59A62]/50 group"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Book Fresha</span>
              <ExternalLink className="w-3 h-3 text-[#0B2118]" />
            </a>

            <a
              href="#services"
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-3 border border-[#1D4A35] hover:border-[#B59A62] bg-[#123524]/70 hover:bg-[#123524] text-[#F2EBDD] text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md rounded-xs"
            >
              <span>Our Rituals</span>
              <ArrowRight className="w-3 h-3 text-[#B59A62]" />
            </a>

            <a
              href={SALON_LINKS.onlineStore}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-3 border border-[#1D4A35] hover:border-[#B59A62]/60 bg-[#0A1C14]/80 hover:bg-[#123524] text-[#D8CBB5] hover:text-[#F2EBDD] text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 items-center gap-1.5 rounded-xs"
            >
              <span>Shop Haircare</span>
              <ExternalLink className="w-3 h-3 text-[#B59A62]" />
            </a>
          </div>
        </div>

        {/* Branch Panel */}
        <div className="relative z-10 hidden md:flex flex-col items-start bg-[#0B2118]/80 backdrop-blur-md border border-[#1D4A35]/80 p-6 space-y-4 text-xs text-[#F2EBDD] max-w-xs shadow-2xl">

          <div className="border-b border-[#1D4A35] pb-2 w-full flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold block">
              OUR BRANCHES
            </span>
            <span className="text-[9px] text-[#9BAA8C]">
              Bahrain
            </span>
          </div>

          <div className="space-y-2.5 w-full">

            <div className="flex items-center justify-between gap-2 p-1.5 bg-[#123524]/40 border border-[#1D4A35] rounded-sm">
              <button
                onClick={() => handleOpenBooking(undefined, 'seef')}
                className="flex items-center gap-2 text-left hover:text-[#B59A62] transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
                <span className="font-medium">
                  Seef Flagship
                </span>
              </button>

              <a
                href={SALON_LINKS.mapsSeef}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#B59A62] hover:text-[#F2EBDD] underline flex items-center gap-0.5"
                title="Open Seef on Google Maps"
              >
                <span>Map</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            <div className="flex items-center justify-between gap-2 p-1.5 bg-[#123524]/40 border border-[#1D4A35] rounded-sm">
              <button
                onClick={() => handleOpenBooking(undefined, 'saar')}
                className="flex items-center gap-2 text-left hover:text-[#B59A62] transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
                <span className="font-medium">
                  Saar Garden
                </span>
              </button>

              <a
                href={SALON_LINKS.mapsSaar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#B59A62] hover:text-[#F2EBDD] underline flex items-center gap-0.5"
                title="Open Saar on Google Maps"
              >
                <span>Map</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1D4A35] w-full text-[11px] text-[#D8CBB5]">

            <a
              href="tel:+97313110311"
              className="flex items-center gap-2 hover:text-[#F2EBDD] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B59A62]" />
              <span>+973 13110311</span>
            </a>

            <a
              href={SALON_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>+973 33520102 (WhatsApp)</span>
            </a>

            <a
              href={SALON_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#E1306C] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span className="truncate">
                @BELLABRAZILBEAUTYSALON
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9BAA8C]/80 pointer-events-none">
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-[#F2EBDD]" />
          <span>Scroll</span>
          <ChevronDown className="w-3 h-3 text-[#B59A62] animate-bounce" />
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeTicker theme="cream" />

      {/* SERVICES */}
      <section
        id="services"
        className="bg-[#FAF7F2] text-[#0B2118] py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-t border-[#D8CBB5]/60 transition-colors"
      >
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A6C50] font-semibold block">
                OUR SERVICES
              </span>

              <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#0B2118] leading-[1.05]">
                More Than <br />
                <span className="italic font-normal">
                  Just Beauty
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#171914]/80 font-light leading-relaxed max-w-md pt-2">
                From luxurious hair services to advanced skin treatments, we offer a complete beauty experience — inspired by the natural richness of Brazil.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenBooking()}
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#0B2118] hover:text-[#8A6C50] transition-colors cursor-pointer"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-end text-left sm:text-right space-y-2">
              <span className="font-serif italic text-xl sm:text-2xl text-[#0B2118]">
                "Expand each card to inspect treatment duration, active botanicals, and bespoke pricing."
              </span>

              <p className="text-xs text-[#8A6C50]">
                All treatments performed exclusively with Wella Professionals, K18 Molecular, and authentic Brazilian complexes.
              </p>
            </div>
          </div>

          <ServiceExpandGallery
            onBookService={(id) => handleOpenBooking(id)}
          />
        </div>
      </section>

      {/* STATS */}
      <StatsCounter />

      {/* STORY */}
      <section
        id="story"
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0B2118] relative overflow-hidden border-t border-[#1D4A35]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#1D4A35] shadow-2xl">

              <img
                src={isabelaStyling}
                alt="Isabela Franco - Founder & Master Colorist at Bella Brazil"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118]/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 bg-[#0B2118]/85 backdrop-blur-xs px-3 py-1 border border-[#B59A62]/60 text-[10px] uppercase tracking-widest text-[#B59A62]">
                Isabela Franco · Founder & Colorist
              </div>

              <div className="absolute bottom-4 left-4 pointer-events-none">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                >
                  <circle cx="30" cy="30" r="18" fill="#C9325D" opacity="0.9" />
                  <circle cx="33" cy="32" r="12" fill="#D63D6B" />
                  <circle cx="30" cy="30" r="4" fill="#F0C046" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left relative">

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold block">
              OUR STORY
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl text-[#F2EBDD] font-light leading-[1.08]">
              A Brazilian <br />
              <span className="italic font-normal">
                Soul, in Bahrain.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#D8CBB5] font-light leading-relaxed max-w-lg">
              Founded by master colorist <strong>Isabela Franco</strong>, Bella Brazil Beauty Salon W.L.L. brings genuine Rio & São Paulo hair rituals to Bahrain. Inspired by vibrant Amazonian botanicals, we combine authentic Brazilian Blowout smoothing, hand-painted balayage, and clinical Russian nail artistry — in a tranquil sanctuary where nature, luxury and self-care meet.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleOpenBooking()}
                className="group px-7 py-3 rounded-full border border-[#F2EBDD]/70 hover:border-[#F2EBDD] hover:bg-[#F2EBDD] hover:text-[#0B2118] text-[#F2EBDD] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 inline-flex items-center gap-3 cursor-pointer shadow-lg"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-[#1D4A35]/60">

              <div className="space-y-1">
                <span className="font-script text-3xl sm:text-4xl text-[#D8CBB5] tracking-wide block">
                  Authentic Brazilian Beauty
                </span>

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9BAA8C]">
                  Bahrain Flagship · Seef & Saar
                </span>
              </div>

              <div className="w-20 h-20 shrink-0">
                <svg
                  viewBox="0 0 100 90"
                  fill="none"
                  className="w-full h-full drop-shadow-md"
                >
                  <ellipse cx="65" cy="50" rx="18" ry="22" fill="#171914" />
                  <circle cx="56" cy="42" r="10" fill="#FFFFFF" />
                  <circle cx="54" cy="42" r="3" fill="#171914" />
                  <path
                    d="M 60 36 Q 95 38 88 60 Q 66 52 60 45 Z"
                    fill="#E87A24"
                  />
                  <path
                    d="M 75 42 Q 95 38 88 60 Q 80 50 75 42 Z"
                    fill="#B02525"
                  />
                  <path
                    d="M 35 75 Q 75 70 95 80"
                    stroke="#8A6C50"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAIR RITUAL MATCHER */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0B2118] border-t border-[#1D4A35]">
        <div className="max-w-5xl mx-auto">
          <HairRitualMatcher
            onBookTreatment={(serviceId) =>
              handleOpenBooking(serviceId)
            }
          />
        </div>
      </section>

      {/* SANCTUARY */}
      <section
        id="sanctuary"
        className="bg-[#FAF7F2] text-[#0B2118] py-24 lg:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#D8CBB5]/60"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] overflow-hidden border border-[#D8CBB5] shadow-2xl">

              <img
                src={salonInterior}
                alt="A Sanctuary of Beauty - Bella Brazil Salon Bahrain Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 text-left">

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#8A6C50] font-semibold block">
              THE EXPERIENCE
            </span>

            <h2 className="font-serif text-4xl sm:text-6xl text-[#0B2118] font-light leading-[1.08]">
              A Sanctuary <br />
              <span className="italic font-normal">
                of Beauty
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#171914]/80 font-light leading-relaxed">
              Step into a world of calm and elegance. Our salon is designed to awaken your senses and bring out your most natural, radiant self.
            </p>

            <div className="pt-2">
              <button
                onClick={() => handleOpenBooking()}
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#0B2118] hover:text-[#8A6C50] transition-colors cursor-pointer"
              >
                <span>Explore Our Salon</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BEAUTY GROWS WILD */}
      <section className="relative py-28 lg:py-40 bg-[#0B2118] overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src={botoxGloss}
            alt="Rainforest Foliage Texture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-125"
          />

          <div className="absolute inset-0 bg-[#0B2118]/75" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">

            <div className="lg:col-span-7 bg-[#FAF7F2] text-[#0B2118] p-10 sm:p-14 sm:-rotate-2 shadow-2xl border border-[#D8CBB5] transition-transform hover:rotate-0 duration-500">

              <blockquote className="font-serif text-4xl sm:text-6xl text-[#0B2118] italic font-light leading-[1.08] mb-6">
                “Beauty <br />
                grows wild.”
              </blockquote>

              <div className="text-[10px] uppercase tracking-[0.4em] font-semibold text-[#8A6C50]">
                BELLA BRAZIL
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-square overflow-hidden border border-[#1D4A35] shadow-2xl">

              <img
                src={balayageHair}
                alt="Sunlit Portrait with Botanical Shadows - Bella Brazil Salon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2118]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section
        id="branches"
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-12 bg-[#0A1C14] border-t border-[#1D4A35]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-4 space-y-4 text-left">

            <div className="flex items-center justify-between">

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold block">
                OUR BRANCHES
              </span>

              <div className="flex sm:hidden items-center gap-1.5">

                <button
                  onClick={() =>
                    scrollHorizontally(
                      branchesScrollRef,
                      'left'
                    )
                  }
                  className="w-8 h-8 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors shadow-md"
                  aria-label="Previous Branch"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    scrollHorizontally(
                      branchesScrollRef,
                      'right'
                    )
                  }
                  className="w-8 h-8 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next Branch"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl text-[#F2EBDD] font-light">
              Visit Us
            </h2>

            <p className="text-sm text-[#9BAA8C] font-light leading-relaxed">
              Two locations. The same Brazilian soul.
            </p>

            <div className="pt-2 flex items-center gap-3">

              <button
                onClick={() => handleOpenBooking()}
                className="group px-5 py-2.5 rounded-sm border border-[#1D4A35] hover:border-[#B59A62] bg-[#123524]/60 hover:bg-[#123524] text-[#F2EBDD] text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Select Your Branch</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B59A62] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="hidden sm:flex lg:hidden items-center gap-1.5">

                <button
                  onClick={() =>
                    scrollHorizontally(
                      branchesScrollRef,
                      'left'
                    )
                  }
                  className="w-8 h-8 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors shadow-md"
                  aria-label="Previous Branch"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    scrollHorizontally(
                      branchesScrollRef,
                      'right'
                    )
                  }
                  className="w-8 h-8 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next Branch"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">

            <div
              ref={branchesScrollRef}
              className="flex sm:grid sm:grid-cols-2 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory sm:overflow-visible pb-3 pt-1 scrollbar-none no-scrollbar"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >

              {/* SEEF */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-auto h-full">

                <TiltCard maxTilt={6} className="h-full">

                  <div className="group bg-[#0A1C14] border border-[#1D4A35] hover:border-[#B59A62] transition-all duration-300 overflow-hidden flex flex-col justify-between h-full rounded-xs shadow-xl">

                    <div className="aspect-[16/10] overflow-hidden relative bg-[#123524]">

                      <img
                        src={salonInterior}
                        alt="Bella Brazil Seef Branch"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      />

                      <div className="absolute top-3 left-3 bg-[#0B2118]/90 backdrop-blur-sm border border-[#B59A62]/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#B59A62] font-semibold rounded-xs">
                        Seef Flagship
                      </div>
                    </div>

                    <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm font-serif text-[#F2EBDD] group-hover:text-[#B59A62] transition-colors">
                          <MapPin className="w-4 h-4 text-[#B59A62]" />
                          <span className="text-xl font-normal">
                            Seef Flagship Sanctuary
                          </span>
                        </div>

                        <p className="text-xs text-[#9BAA8C] leading-relaxed">
                          Building 3354, Road 2845, Al Seef District, Bahrain
                        </p>

                        <div className="text-[11px] text-[#B59A62] flex items-center gap-2 pt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            Daily: 10:00 AM – 9:00 PM
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#1D4A35] flex items-center justify-between gap-2">

                        <a
                          href={SALON_LINKS.mapsSeef}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#D8CBB5] hover:text-[#B59A62] flex items-center gap-1 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#B59A62]" />
                          <span>Google Maps ↗</span>
                        </a>

                        <a
                          href={SALON_LINKS.freshaBooking}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm rounded-sm"
                        >
                          <span>Book Fresha</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>

              {/* SAAR */}
              <div className="snap-center shrink-0 w-[85vw] sm:w-auto h-full">

                <TiltCard maxTilt={6} className="h-full">

                  <div className="group bg-[#0A1C14] border border-[#1D4A35] hover:border-[#B59A62] transition-all duration-300 overflow-hidden flex flex-col justify-between h-full rounded-xs shadow-xl">

                    <div className="aspect-[16/10] overflow-hidden relative bg-[#123524]">

                      <img
                        src={saarBoutique}
                        alt="Bella Brazil Saar Branch"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                      />

                      <div className="absolute top-3 left-3 bg-[#0B2118]/90 backdrop-blur-sm border border-[#B59A62]/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#B59A62] font-semibold rounded-xs">
                        Saar Sanctuary
                      </div>
                    </div>

                    <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm font-serif text-[#F2EBDD] group-hover:text-[#B59A62] transition-colors">
                          <MapPin className="w-4 h-4 text-[#B59A62]" />
                          <span className="text-xl font-normal">
                            Saar Botanical Oasis
                          </span>
                        </div>

                        <p className="text-xs text-[#9BAA8C] leading-relaxed">
                          Saar Avenue, Northern Governorate, Bahrain
                        </p>

                        <div className="text-[11px] text-[#B59A62] flex items-center gap-2 pt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            Daily: 10:00 AM – 7:00 PM
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#1D4A35] flex items-center justify-between gap-2">

                        <a
                          href={SALON_LINKS.mapsSaar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#D8CBB5] hover:text-[#B59A62] flex items-center gap-1 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#B59A62]" />
                          <span>Google Maps ↗</span>
                        </a>

                        <a
                          href={SALON_LINKS.freshaBooking}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 inline-flex items-center gap-1.5 shadow-sm rounded-sm"
                        >
                          <span>Book Fresha</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* KSA EXPANSION */}
            <div className="bg-[#123524]/60 border border-[#B59A62]/40 p-4 sm:p-5 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">

              <div className="space-y-1">

                <div className="flex items-center gap-2">
                  <span className="text-base">🇸🇦</span>

                  <span className="text-xs font-semibold text-[#F2EBDD] uppercase tracking-wider">
                    Regional Expansion · Khobar, Saudi Arabia
                  </span>

                  <span className="text-[10px] bg-[#B59A62] text-[#0B2118] px-2 py-0.5 font-bold uppercase tracking-widest rounded-xs">
                    Opening Soon
                  </span>
                </div>

                <p className="text-xs text-[#9BAA8C]">
                  Bringing authentic Brazilian blowouts, hair botox, and luxury rituals to the Eastern Province of KSA.
                </p>
              </div>

              <a
                href={SALON_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0A1C14] hover:bg-[#0B2118] border border-[#1D4A35] hover:border-[#B59A62] text-[#B59A62] hover:text-[#F2EBDD] text-xs uppercase tracking-[0.14em] font-medium transition-colors inline-flex items-center gap-1.5 shrink-0 rounded-sm"
              >
                <span>Follow Updates</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0B2118] border-t border-[#1D4A35]">
        <div className="max-w-6xl mx-auto">

          <BeforeAfterSlider
            beforeImage={editorialHairColor}
            afterImage={botoxGloss}
            title="The Brazilian Transformation"
            subtitle="Drag the interactive slider to see how our authentic Brazilian Blowout formula eliminates Gulf humidity frizz and imparts glass-like mirror shine."
          />

        </div>
      </section>

      {/* INSTAGRAM */}
      <section
        id="instagram"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0B2118] border-t border-[#1D4A35]"
      >
        <div className="max-w-7xl mx-auto">
          <InstagramFeedSection
            onBookService={(s) =>
              handleOpenBooking(s)
            }
          />
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="shop"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#123524]/20 border-t border-[#1D4A35]"
      >
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1D4A35] pb-6">

            <div className="text-left">

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold">
                Salon Retail Boutique
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EBDD] font-light mt-1">
                The Products Behind the Results
              </h2>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">

              <span className="text-xs text-[#9BAA8C] hidden md:inline">
                Bahrain delivery over{' '}
                <strong className="text-[#F2EBDD]">
                  BHD 25
                </strong>
              </span>

              <div className="flex items-center gap-1.5">

                <button
                  onClick={() =>
                    scrollHorizontally(
                      productsScrollRef,
                      'left'
                    )
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md"
                  aria-label="Previous Product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    scrollHorizontally(
                      productsScrollRef,
                      'right'
                    )
                  }
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md"
                  aria-label="Next Product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <a
                href={SALON_LINKS.onlineStore}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 sm:px-4 py-2 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap rounded-sm"
              >
                <span>Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div
            ref={productsScrollRef}
            className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-3 pt-1 scrollbar-none no-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >

            {PRODUCTS_DATA.slice(0, 4).map((product) => (

              <div
                key={product.id}
                className="snap-center shrink-0 w-[78vw] sm:w-[280px] lg:w-auto bg-[#0B2118] border border-[#1D4A35] p-5 flex flex-col justify-between group hover:border-[#B59A62]/60 transition-colors text-left rounded-xs shadow-lg"
              >

                <div className="aspect-square overflow-hidden bg-[#123524] mb-4 flex items-center justify-center relative p-3">

                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  <span className="absolute top-2 left-2 text-[9px] uppercase tracking-widest text-[#B59A62] bg-[#0B2118]/80 px-2 py-0.5 border border-[#1D4A35]">
                    {product.brand}
                  </span>
                </div>

                <div className="space-y-2">

                  <h4 className="font-serif text-base text-[#F2EBDD] line-clamp-1">
                    {product.name}
                  </h4>

                  <p className="text-[11px] text-[#9BAA8C] line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#1D4A35] flex items-center justify-between">

                  <span className="font-semibold text-sm text-[#F2EBDD] tabular-nums">
                    BHD {product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="px-3.5 py-1.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer rounded-xs"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section
        id="journal"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0B2118] border-t border-[#1D4A35]"
      >
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1D4A35] pb-6">

            <div className="text-left">

              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B59A62] font-semibold">
                The Journal
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EBDD] font-light mt-1">
                Beauty Insights & Guides
              </h2>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">

              <button
                onClick={() =>
                  scrollHorizontally(
                    journalScrollRef,
                    'left'
                  )
                }
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md"
                aria-label="Previous Article"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  scrollHorizontally(
                    journalScrollRef,
                    'right'
                  )
                }
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md"
                aria-label="Next Article"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          <div
            ref={journalScrollRef}
            className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-3 pt-1 scrollbar-none no-scrollbar"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >

            {ARTICLES_DATA.map((article) => (

              <div
                key={article.id}
                onClick={() =>
                  setSelectedArticle(article)
                }
                className="snap-center shrink-0 w-[82vw] sm:w-[340px] md:w-auto bg-[#123524]/20 border border-[#1D4A35] hover:border-[#B59A62]/60 cursor-pointer transition-all flex flex-col justify-between group overflow-hidden text-left rounded-xs shadow-lg"
              >

                <div className="aspect-[16/10] overflow-hidden">

                  <img
                    src={article.image}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                </div>

                <div className="p-5 sm:p-6 space-y-2">

                  <span className="text-[10px] uppercase tracking-widest text-[#B59A62]">
                    {article.category}
                  </span>

                  <h4 className="font-serif text-lg sm:text-xl text-[#F2EBDD] group-hover:text-[#B59A62] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#9BAA8C] line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#07150F] border-t border-[#1D4A35] text-[#9BAA8C] pt-16 pb-12 px-4 sm:px-6 lg:px-12">

        <div className="max-w-7xl mx-auto space-y-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 border-b border-[#1D4A35]/80 pb-12 text-left">

            {/* BRAND */}
            <div className="lg:col-span-4 space-y-4">

              <BellaBrazilLogo
                variant="full"
                theme="dark"
              />

              <p className="text-xs text-[#9BAA8C] font-light leading-relaxed max-w-sm pt-2">
                Bahrain's premier Brazilian beauty destination. Authentic smoothing ceremonies, botanical hair botox, dimensional balayage, and clinical Russian nails.
              </p>

              <div className="flex items-center gap-3 pt-2">

                <a
                  href={SALON_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#123524] border border-[#1D4A35] hover:border-[#E1306C] flex items-center justify-center text-[#F2EBDD] hover:text-[#E1306C] transition-colors"
                  title="Instagram @BELLABRAZILBEAUTYSALON"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href={SALON_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#123524] border border-[#1D4A35] hover:border-[#25D366] flex items-center justify-center text-[#F2EBDD] hover:text-[#25D366] transition-colors"
                  title="WhatsApp +973 33520102"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href={SALON_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#123524] border border-[#1D4A35] hover:border-cyan-400 flex items-center justify-center text-[#F2EBDD] hover:text-cyan-400 transition-colors"
                  title="TikTok @bellabrazilbeautysalon"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.96-4.49V8.75a8.16 8.16 0 0 0 4.81 1.54v-3.6z" />
                  </svg>
                </a>

                <a
                  href={SALON_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#123524] border border-[#1D4A35] hover:border-[#1877F2] flex items-center justify-center text-[#F2EBDD] hover:text-[#1877F2] transition-colors"
                  title="Facebook @bellabrazilbeautysalon"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href={SALON_LINKS.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#123524] border border-[#1D4A35] hover:border-yellow-400 flex items-center justify-center text-[#F2EBDD] hover:text-yellow-400 transition-colors"
                  title="Snapchat @bella_brazilbh"
                >
                  <span className="text-sm">👻</span>
                </a>
              </div>
            </div>

            {/* DIRECTORY */}
            <div className="lg:col-span-3 space-y-3">

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold block">
                Directory
              </span>

              <ul className="space-y-2 text-xs">

                <li>
                  <a
                    href="#"
                    className="hover:text-[#F2EBDD] transition-colors"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    className="hover:text-[#F2EBDD] transition-colors"
                  >
                    Services & Rituals
                  </a>
                </li>

                <li>
                  <a
                    href="#story"
                    className="hover:text-[#F2EBDD] transition-colors"
                  >
                    Our Founder: Isabela Franco
                  </a>
                </li>

                <li>
                  <a
                    href="#instagram"
                    className="hover:text-[#F2EBDD] transition-colors"
                  >
                    Instagram Transformations
                  </a>
                </li>

                <li>
                  <a
                    href="#branches"
                    className="hover:text-[#F2EBDD] transition-colors"
                  >
                    Branches (Seef & Saar)
                  </a>
                </li>

                <li>
                  <a
                    href={SALON_LINKS.onlineStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B59A62] text-[#F2EBDD] flex items-center gap-1 transition-colors"
                  >
                    <span>
                      Store: webellabh.com
                    </span>
                    <ExternalLink className="w-3 h-3 text-[#B59A62]" />
                  </a>
                </li>
              </ul>
            </div>

            {/* LOCATIONS */}
            <div className="lg:col-span-5 space-y-4">

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62] font-semibold block">
                Locations & Direct Booking
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

                {/* SEEF */}
                <div className="p-3 bg-[#0B2118] border border-[#1D4A35] space-y-1.5">

                  <div className="font-serif text-[#F2EBDD] font-medium text-sm">
                    Seef Flagship
                  </div>

                  <div className="text-[11px] text-[#9BAA8C]">
                    Building 3354, Road 2845
                  </div>

                  <div className="text-[10px] text-[#B59A62]">
                    Daily: 10 AM – 9 PM
                  </div>

                  <a
                    href={SALON_LINKS.mapsSeef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#D8CBB5] hover:text-[#B59A62] underline flex items-center gap-1 pt-1"
                  >
                    <MapPin className="w-3 h-3 text-[#B59A62]" />
                    <span>
                      View on Google Maps ↗
                    </span>
                  </a>
                </div>

                {/* SAAR */}
                <div className="p-3 bg-[#0B2118] border border-[#1D4A35] space-y-1.5">

                  <div className="font-serif text-[#F2EBDD] font-medium text-sm">
                    Saar Sanctuary
                  </div>

                  <div className="text-[11px] text-[#9BAA8C]">
                    Saar Avenue, Northern Gov.
                  </div>

                  <div className="text-[10px] text-[#B59A62]">
                    Daily: 10 AM – 7 PM
                  </div>

                  <a
                    href={SALON_LINKS.mapsSaar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#D8CBB5] hover:text-[#B59A62] underline flex items-center gap-1 pt-1"
                  >
                    <MapPin className="w-3 h-3 text-[#B59A62]" />
                    <span>
                      View on Google Maps ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* BOOKING */}
              <div className="flex flex-wrap items-center gap-2 pt-1">

                <a
                  href={SALON_LINKS.freshaBooking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>Book on Fresha</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => handleOpenBooking()}
                  className="px-4 py-2.5 border border-[#F2EBDD]/60 hover:border-[#F2EBDD] text-[#F2EBDD] text-xs uppercase tracking-wider font-light transition-colors cursor-pointer"
                >
                  Concierge Request
                </button>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">

            <p className="text-[11px] text-[#61765A]">
              © 2026 Bella Brazil Beauty Salon W.L.L.
              &nbsp;|&nbsp; Seef &nbsp;|&nbsp; Saar &nbsp;|&nbsp; Bahrain
            </p>

            <div className="flex items-center gap-2">

              <span className="font-script text-2xl text-[#D8CBB5]">
                Brazilian beauty, elevated.
              </span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B59A62"
                strokeWidth="1.5"
                className="shrink-0"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BRAND HUB */}
      <FloatingBrandHub
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialServiceId={bookingInitialService}
        initialBranchId={bookingInitialBranch}
      />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* JOURNAL MODAL */}
      <JournalModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
