import React, { useState, useRef } from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CheckCircle,
  Grid,
  MapPin,
  Calendar,
  Layers,
  Phone,
  Link2,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { SALON_LINKS } from '../data/salonData';

interface LookbookPost {
  id: string;
  category: 'blowout' | 'balayage' | 'botox' | 'salon' | 'nails';
  image: string;
  likes: number;
  commentsCount: number;
  caption: string;
  tags: string[];
  location: string;
  date: string;
  serviceId?: string;
}

export const InstagramFeedSection: React.FC<{
  onBookService: (serviceName?: string) => void;
}> = ({ onBookService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'nails' | 'sanctuary'>('all');
  const [selectedPost, setSelectedPost] = useState<LookbookPost | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const posts: LookbookPost[] = [
    {
      id: 'post-1',
      category: 'blowout',
      image: '/src/assets/images/ig_blowout_hero_1790209445244.jpg',
      likes: 1248,
      commentsCount: 68,
      location: 'Bella Brazil Salon · Seef Flagship',
      date: '2 DAYS AGO',
      serviceId: 'brazilian-blowout',
      caption: '✨ The mirror reflection of our Authentic Brazilian Blowout! Say goodbye to Bahrain humidity frizz for 12 solid weeks. Notice the natural bounce and healthy weight of the hair. Zero wait time before washing. Book your transformation at Seef or Saar! 🌿🇧🇷',
      tags: ['#BellaBrazilSalon', '#BrazilianBlowoutBahrain', '#BahrainHair', '#AntiFrizz', '#Seef']
    },
    {
      id: 'post-2',
      category: 'balayage',
      image: '/src/assets/images/ig_balayage_hair_1790209400030.jpg',
      likes: 982,
      commentsCount: 43,
      location: 'Bella Brazil Salon · Saar Sanctuary',
      date: '4 DAYS AGO',
      serviceId: 'balayage-dimensional',
      caption: 'Caramel Macadamia Ribbons 🍯 Painted freehand by our master colorist @isabela_franco_hairdresser. Designed specifically for natural dark bases craving sun-kissed warmth without high maintenance root grow-out. Finished with our signature Wella acidic gloss glaze. 🤎',
      tags: ['#BrazilianBalayage', '#CaramelBalayage', '#BahrainColorist', '#Saar', '#LuxuryHair']
    },
    {
      id: 'post-3',
      category: 'botox',
      image: '/src/assets/images/ig_botox_gloss_1790209411685.jpg',
      likes: 1876,
      commentsCount: 114,
      location: 'Bella Brazil Salon · Seef Flagship',
      date: '1 WEEK AGO',
      serviceId: 'hair-botox',
      caption: 'LIQUID GLASS HAIR 🧬 Our Bio-Collagen Hair Botox ceremony in action! Deep molecular cortex repair with Amazonian murumuru and pure botanical keratin. Notice how the cuticle lies completely flat, reflecting maximum light. Perfect for colored or bleached hair damaged by mineral water. 💎',
      tags: ['#HairBotoxBahrain', '#GlassHair', '#HairRepair', '#BellaBrazil', '#BahrainSalons']
    },
    {
      id: 'post-4',
      category: 'salon',
      image: '/src/assets/images/ig_isabela_styling_1790209434003.jpg',
      likes: 1420,
      commentsCount: 89,
      location: 'Bella Brazil Salon · Seef Flagship',
      date: '1 WEEK AGO',
      serviceId: 'designer-cut',
      caption: 'Behind the chair with founder & master colorist @isabela_franco_hairdresser! ✨ “Every client that walks through our doors receives a bespoke consultation tailored to her lifestyle, hair history, and facial structure.” Thank you for making us Bahrain’s favorite Brazilian salon! 🤍',
      tags: ['#IsabelaFranco', '#MasterColorist', '#BahrainHairdresser', '#BrazilianSoul', '#SalonLife']
    },
    {
      id: 'post-5',
      category: 'salon',
      image: '/src/assets/images/ig_salon_interior_1790209422670.jpg',
      likes: 1105,
      commentsCount: 37,
      location: 'Bella Brazil Salon · Seef & Saar',
      date: '2 WEEKS AGO',
      caption: 'A tropical sanctuary in the heart of Bahrain 🌿 Brass arches, emerald velvet, and lush living rainforest greenery. Step into our world of calm and relaxation while our Brazilian experts take care of your crown. Which branch do you visit most: Seef or Saar? ☕',
      tags: ['#SalonInterior', '#TropicalLuxury', '#BahrainSpots', '#SeefDistrict', '#SaarAvenue']
    },
    {
      id: 'post-6',
      category: 'nails',
      image: '/src/assets/images/nails_luxury_editorial_1790208946952.jpg',
      likes: 874,
      commentsCount: 29,
      location: 'Bella Brazil Nail Studio · Saar',
      date: '2 WEEKS AGO',
      serviceId: 'russian-manicure',
      caption: 'Precision Russian Manicure & BIAB milky nude overlay. 🤍 100% dry e-file technique removing all proximal dead cuticle tissue for clean nail contouring that lasts 4+ weeks without chipping. Have you booked your weekly pampering session yet? 💅',
      tags: ['#RussianManicureBahrain', '#BIABNails', '#CleanNails', '#NailArtBahrain', '#BellaBrazil']
    }
  ];

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'hair') return p.category === 'blowout' || p.category === 'balayage' || p.category === 'botox';
    if (activeTab === 'nails') return p.category === 'nails';
    if (activeTab === 'sanctuary') return p.category === 'salon';
    return true;
  });

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!scrollTrackRef.current) return;
    const container = scrollTrackRef.current;
    const itemWidth = container.clientWidth > 640 ? 360 : container.clientWidth * 0.82;
    const delta = direction === 'left' ? -itemWidth : itemWidth;
    container.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const onTrackScroll = () => {
    if (!scrollTrackRef.current) return;
    const container = scrollTrackRef.current;
    const itemWidth = container.clientWidth > 640 ? 360 : container.clientWidth * 0.82;
    const index = Math.round(container.scrollLeft / itemWidth);
    setCurrentSlideIndex(Math.min(Math.max(0, index), filteredPosts.length - 1));
  };

  return (
    <div className="w-full space-y-6 text-left">
      {/* Exact Instagram Profile Header Card matching Screenshot 1 */}
      <div className="bg-[#0A1C14] border border-[#1D4A35] p-4 sm:p-8 relative overflow-hidden shadow-2xl rounded-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
          
          {/* Avatar and Profile Details */}
          <div className="flex items-center gap-3.5 sm:gap-6 w-full lg:w-auto">
            <div className="relative shrink-0">
              {/* Instagram Story Gradient Ring */}
              <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-full p-[2.5px] sm:p-[3px] bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-[#0A1C14]">
                  <img
                    src="/src/assets/images/official_ig_pfp_logo.jpg"
                    alt="Bella Brazil Salon Official Instagram Profile"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#3897f0] border-2 border-[#0A1C14] flex items-center justify-center text-[8px] sm:text-[11px] text-white shadow-sm" title="Verified Brand">
                ✓
              </div>
            </div>

            <div className="space-y-0.5 sm:space-y-1 text-left flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-sans font-bold text-base sm:text-2xl text-[#F2EBDD] tracking-tight">
                  bellabrazilbeautysalon
                </h3>
                {/* Instagram Blue Verified Badge */}
                <span className="inline-flex items-center gap-1 bg-[#3897f0]/15 text-[#3897f0] text-[9px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 border border-[#3897f0]/40 rounded-full">
                  <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#3897f0] text-white" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#F2EBDD] font-medium">Bella Brazil Salon</span>
                <span className="text-[#B59A62] text-[10px] uppercase font-semibold">· Beauty Sanctuary</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-[#F2EBDD] pt-0.5 pb-0.5">
                <span><strong className="text-[#F2EBDD] font-bold">1,152</strong> <span className="text-[#9BAA8C]">posts</span></span>
                <span><strong className="text-[#F2EBDD] font-bold">39.9K</strong> <span className="text-[#9BAA8C]">followers</span></span>
              </div>

              {/* Bio text (Desktop & Tablet) */}
              <div className="hidden sm:block text-xs text-[#D8CBB5] space-y-0.5 leading-relaxed pt-1">
                <p>The Favorite Brazilian Salon <span className="tracking-widest">🇧🇷🇧🇭🇸🇦</span></p>
                <p>🇧🇭 <strong>Bahrain:</strong> Seef / Saar · 🇸🇦 <strong>KSA:</strong> Khobar (Opening Soon)</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-1 lg:pt-0">
            <a
              href="https://www.instagram.com/bellabrazilbeautysalon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white text-xs uppercase tracking-[0.14em] font-semibold rounded-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Follow</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={SALON_LINKS.freshaBooking}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2 sm:py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.14em] font-semibold rounded-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>Book Fresha</span>
            </a>
          </div>

        </div>

        {/* Tab Filters & Left/Right Arrows Bar */}
        <div className="flex items-center justify-between border-t border-[#1D4A35] mt-6 pt-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs uppercase tracking-widest text-[#9BAA8C]">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer text-[11px] sm:text-xs ${
                activeTab === 'all'
                  ? 'border-[#B59A62] text-[#F2EBDD] font-semibold'
                  : 'border-transparent hover:text-[#F2EBDD]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hair')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer text-[11px] sm:text-xs ${
                activeTab === 'hair'
                  ? 'border-[#B59A62] text-[#F2EBDD] font-semibold'
                  : 'border-transparent hover:text-[#F2EBDD]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hair</span>
            </button>

            <button
              onClick={() => setActiveTab('nails')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer text-[11px] sm:text-xs ${
                activeTab === 'nails'
                  ? 'border-[#B59A62] text-[#F2EBDD] font-semibold'
                  : 'border-transparent hover:text-[#F2EBDD]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Nails</span>
            </button>

            <button
              onClick={() => setActiveTab('sanctuary')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-colors cursor-pointer text-[11px] sm:text-xs ${
                activeTab === 'sanctuary'
                  ? 'border-[#B59A62] text-[#F2EBDD] font-semibold'
                  : 'border-transparent hover:text-[#F2EBDD]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Spaces</span>
            </button>
          </div>

          {/* Left & Right Arrow Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSwipe('left')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md active:scale-95"
              aria-label="Previous Post"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#123524] border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] hover:text-[#B59A62] flex items-center justify-center transition-colors cursor-pointer shadow-md active:scale-95"
              aria-label="Next Post"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Swipeable Lookbook Track (Responsive Swipe on Mobile + Desktop) */}
      <div className="relative">
        <div
          ref={scrollTrackRef}
          onScroll={onTrackScroll}
          className="flex lg:grid lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-4 pt-1 px-1 scrollbar-none no-scrollbar"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="snap-center shrink-0 w-[82vw] sm:w-[340px] lg:w-auto group relative bg-[#0A1C14] border border-[#1D4A35] hover:border-[#B59A62] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg rounded-xs"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-[#123524]">
                <img
                  src={post.image}
                  alt={post.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                
                {/* Instagram Icon Badge */}
                <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-xs p-1.5 rounded-full text-white">
                  <Instagram className="w-3.5 h-3.5" />
                </div>

                {/* Hover Overlay with Likes & Comments Count */}
                <div className="absolute inset-0 bg-[#0B2118]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-[#F2EBDD] font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-current text-[#E1306C]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 fill-current text-[#F2EBDD]" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>
              </div>

              {/* Post Metadata Card */}
              <div className="p-4 space-y-2 text-left">
                <div className="flex items-center justify-between text-[11px] text-[#9BAA8C]">
                  <span className="text-[#B59A62] font-medium truncate max-w-[180px]">{post.location}</span>
                  <span>{post.date}</span>
                </div>

                <p className="text-xs text-[#D8CBB5] line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] text-[#9BAA8C] hover:text-[#B59A62]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slide Counter Indicator */}
        <div className="lg:hidden flex items-center justify-between px-2 pt-1 text-xs text-[#9BAA8C]">
          <span>Swipe or tap arrows to view looks</span>
          <span className="text-[#B59A62] font-mono">{currentSlideIndex + 1} / {filteredPosts.length}</span>
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#0B2118] border border-[#B59A62] text-[#F2EBDD] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            
            {/* Media side */}
            <div className="relative aspect-square md:aspect-auto bg-black flex items-center justify-center">
              <img
                src={selectedPost.image}
                alt={selectedPost.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content & Action side */}
            <div className="p-6 flex flex-col justify-between space-y-4 text-left">
              {/* Top user bar */}
              <div className="flex items-center justify-between border-b border-[#1D4A35] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#B59A62] p-0.5">
                    <img
                      src="/src/assets/images/official_ig_pfp_logo.jpg"
                      alt="Bella Brazil"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F2EBDD] flex items-center gap-1">
                      <span>bellabrazilbeautysalon</span>
                      <CheckCircle className="w-3 h-3 fill-[#3897f0] text-white inline" />
                    </h4>
                    <p className="text-[10px] text-[#9BAA8C]">{selectedPost.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs text-[#9BAA8C] hover:text-[#F2EBDD] px-2 py-1 border border-[#1D4A35] rounded-xs"
                >
                  ✕
                </button>
              </div>

              {/* Full Caption */}
              <div className="space-y-3 overflow-y-auto max-h-56 pr-2">
                <p className="text-xs sm:text-sm text-[#D8CBB5] leading-relaxed">
                  {selectedPost.caption}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedPost.tags.map((t, idx) => (
                    <span key={idx} className="text-xs text-[#B59A62] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Stats & CTA */}
              <div className="border-t border-[#1D4A35] pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#9BAA8C]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[#F2EBDD]">
                      <Heart className="w-4 h-4 fill-current text-[#E1306C]" />
                      <strong>{selectedPost.likes}</strong> likes
                    </span>
                    <span className="flex items-center gap-1.5 text-[#F2EBDD]">
                      <MessageCircle className="w-4 h-4" />
                      <strong>{selectedPost.commentsCount}</strong> comments
                    </span>
                  </div>
                  <span className="text-[10px]">{selectedPost.date}</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onBookService(selectedPost.serviceId);
                    }}
                    className="flex-1 py-2.5 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs uppercase tracking-[0.16em] font-semibold transition-colors cursor-pointer text-center rounded-sm"
                  >
                    Book This Service
                  </button>
                  <a
                    href="https://www.instagram.com/bellabrazilbeautysalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-[#1D4A35] hover:border-[#B59A62] text-[#F2EBDD] transition-colors rounded-sm"
                    title="View post on Instagram"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
