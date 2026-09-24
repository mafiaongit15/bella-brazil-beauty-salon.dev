export interface Service {
  id: string;
  name: string;
  category: 'brazilian' | 'hair' | 'color' | 'treatments' | 'nails' | 'facial' | 'bridal' | 'brows';
  categoryLabel: string;
  description: string;
  priceFrom: number;
  durationMinutes: number;
  featured?: boolean;
  branchAvailability: ('seef' | 'saar')[];
  image: string;
  benefits?: string[];
}

export interface Branch {
  id: 'seef' | 'saar';
  name: string;
  badge: string;
  address: string;
  road: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  hours: string;
  operatingDays: string;
  image: string;
  googleMapsUrl: string;
  description: string;
  features: string[];
}

export interface Product {
  id: string;
  brand: 'Wella' | 'Kadus' | 'K18' | 'Nashi' | 'Framar' | 'Bella Rituals';
  name: string;
  category: string;
  description: string;
  volume: string;
  price: number;
  stock: number;
  image: string;
  rating: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  branch: 'Seef' | 'Saar' | 'Both Branches';
  experience: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  service: string;
  branch: 'Seef' | 'Saar';
  rating: number;
  verifiedSource: string;
  comment: string;
  date: string;
}

export const SALON_LINKS = {
  freshaBooking: 'https://www.fresha.com/providers/bella-brazil-salon-bf1h5ofv?share=&pId=672441&dppub=true&menu=true',
  onlineStore: 'https://www.webellabh.com/',
  mapsSaar: 'https://www.google.com/maps/place/Bella+Brazil+Beauty+Salon,+Saar/data=!4m2!3m1!1s0x3e49b10040772faf:0xdb8ca2e8460a65e3?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjE1My4xMDEYACDXggMqfiw5NDI0MjU4OSw5NDIyMzI5OSw5NDIxNjQxMyw5NDIxMjQ5Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIwODUwNiw5NDIxNzUyMyw5NDIxODY1Myw5NDIyOTgzOSw5NDIzOTEyNyw0NzA4NzExOCw0NzA4NDM5Myw5NDIxMzIwMEICQkg%3D',
  mapsSeef: 'https://www.google.com/maps/place/Bella+Brazil+Beauty+Salon,+Building.+3354,Road.+2845,+Al,+Seef/data=!4m2!3m1!1s0x3e49a55dd1ea1c87:0xe35e214e0c29e067?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjE1My4xMDEYACCIJyp-LDk0MjQyNTg5LDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDk0MjM5MTI3LDQ3MDg3MTE4LDQ3MDg0MzkzLDk0MjEzMjAwQgJCSA%3D%3D',
  instagram: 'https://www.instagram.com/BELLABRAZILBEAUTYSALON',
  whatsapp: 'https://wa.me/97333520102',
  tiktok: 'https://www.tiktok.com/@bellabrazilbeautysalon',
  facebook: 'https://www.facebook.com/bellabrazilbeautysalon?rdid=xvHYxnOPvUzK6X6e&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fbv9NbFa5sxFxt7JA%2F#',
  snapchat: 'https://www.snapchat.com/add/bella_brazilbh'
};

export const BRANCHES_DATA: Branch[] = [
  {
    id: 'seef',
    name: 'Bella Brazil — Seef',
    badge: 'Flagship Sanctuary',
    address: 'Building 3354, Road 2845',
    road: 'Al Seef District',
    city: 'Manama',
    country: 'Bahrain',
    phone: '+973 13110311',
    whatsapp: '+973 33520102',
    hours: '10:00 AM – 9:00 PM',
    operatingDays: 'Daily',
    image: '/src/assets/images/ig_salon_interior_1790209422670.jpg',
    googleMapsUrl: SALON_LINKS.mapsSeef,
    description: 'Our flagship beauty destination situated in the heart of Al Seef. Designed with organic dark jungle palettes, natural travertine textures, and private styling suites for an elevated beauty journey.',
    features: ['Private VIP Hair Suites', 'Full Brazilian Smoothing Bar', 'Nail Bar & Spa Pedicure Lounge', 'Complimentary Valet Parking']
  },
  {
    id: 'saar',
    name: 'Bella Brazil — Saar',
    badge: 'Boutique Garden Oasis',
    address: 'Saar Avenue',
    road: 'Northern Governorate',
    city: 'Saar',
    country: 'Bahrain',
    phone: '+973 13110311',
    whatsapp: '+973 33520102',
    hours: '10:00 AM – 7:00 PM',
    operatingDays: 'Daily',
    image: '/src/assets/images/salon_saar_boutique_1790208970976.jpg',
    googleMapsUrl: SALON_LINKS.mapsSaar,
    description: 'An intimate botanical sanctuary designed for serene hair transformations and unhurried beauty rituals in the peaceful residential enclave of Saar.',
    features: ['Botanical Garden Styling Stations', 'Express Blowdry & Color Bar', 'Russian Manicure Studio', 'Dedicated Bridal Consultation Suite']
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'brazilian-blowout',
    name: 'Authentic Brazilian Blowout',
    category: 'brazilian',
    categoryLabel: 'Brazilian Rituals',
    description: 'The world-renowned professional smoothing treatment. Uses a nutrient-rich Brazilian super-nutrient complex to smooth cuticle layers, eliminate frizz, and impart mirror-like gloss for up to 12 weeks.',
    priceFrom: 70,
    durationMinutes: 120,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    benefits: ['Zero frizz even in high Gulf humidity', 'Retains natural body and bounce', 'Wash and style immediately with zero downtime']
  },
  {
    id: 'hair-botox',
    name: 'Nutritive Hair Botox',
    category: 'brazilian',
    categoryLabel: 'Brazilian Rituals',
    description: 'A deep conditioning anti-aging hair repair ritual infused with Brazilian botanical peptides, collagen, and amino acids to plump hollow hair fibers and restore youthful elasticity.',
    priceFrom: 65,
    durationMinutes: 90,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    benefits: ['Repairs chemical and heat damage', 'Seals split ends with botanical proteins', 'Provides luminous weightless hydration']
  },
  {
    id: 'keraorganic',
    name: 'Keraorganic Smoothing Ritual',
    category: 'brazilian',
    categoryLabel: 'Brazilian Rituals',
    description: 'An organic, 100% formaldehyde-free smoothing solution powered by Amazonian fruit acids, pracaxi oil, and certified organic plant extracts. Silky discipline with gentle holistic care.',
    priceFrom: 80,
    durationMinutes: 150,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    benefits: ['100% formaldehyde-free formula', 'Safe for sensitive scalps and expectant mothers', 'Deep internal fiber realignment']
  },
  {
    id: 'balayage-dimensional',
    name: 'Brazilian Balayage & Foilayage',
    category: 'color',
    categoryLabel: 'Color & Light',
    description: 'Hand-painted dimensional contouring tailored to your face shape. Blends sun-kissed caramel, honey, and warm chestnut reflections mimicking the effortless warmth of Brazilian shores.',
    priceFrom: 75,
    durationMinutes: 180,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg',
    benefits: ['Seamless seamless grow-out transition', 'Custom toning glaze included', 'Bond-building protection during lift']
  },
  {
    id: 'roots-color',
    name: 'Signature Roots Touch-up',
    category: 'color',
    categoryLabel: 'Color & Light',
    description: 'Flawless 100% grey coverage and root revitalization with ammonia-reduced European formulations that protect the scalp barrier and seal hair cuticles.',
    priceFrom: 27.5,
    durationMinutes: 60,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg'
  },
  {
    id: 'gloss-toner',
    name: 'Luminous Gloss & Toner',
    category: 'color',
    categoryLabel: 'Color & Light',
    description: 'An acidic demi-permanent glaze that revitalizes faded highlights, cancels brassy undertones, and locks in high-shine botanical luster.',
    priceFrom: 27.5,
    durationMinutes: 45,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg'
  },
  {
    id: 'designer-cut',
    name: 'Precision Haircut & Dry Texture',
    category: 'hair',
    categoryLabel: 'Hair Design',
    description: 'Consultation-driven precision haircut sculpted to your personal facial architecture, hair density, and daily routine. Includes wash and finished styling.',
    priceFrom: 20,
    durationMinutes: 45,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/hero_brazilian_beauty_1790208553834.jpg'
  },
  {
    id: 'signature-blowdry',
    name: 'Brazilian Voluminous Blowdry',
    category: 'hair',
    categoryLabel: 'Hair Design',
    description: 'Full-bodied Brazilian blowout styling using ceramic round brushes and thermal protective rainforest elixirs for bouncy movement that lasts days.',
    priceFrom: 12,
    durationMinutes: 45,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/hero_brazilian_beauty_1790208553834.jpg'
  },
  {
    id: 'russian-manicure',
    name: 'Russian Clean Gel Manicure',
    category: 'nails',
    categoryLabel: 'Nails & Hands',
    description: 'Dry e-file precision cuticle detailing followed by strengthening BIAB base coat and high-gloss gel lacquer with flawless under-cuticle application.',
    priceFrom: 24,
    durationMinutes: 75,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/salon_interior_luxury_1790208575500.jpg'
  },
  {
    id: 'botanical-pedicure',
    name: 'Rainforest Botanical Spa Pedicure',
    category: 'nails',
    categoryLabel: 'Nails & Hands',
    description: 'Exfoliating Amazonian sugar scrub, calluses treatment, warm botanical oil massage, and lasting gel polish finish in our ergonomic spa loungers.',
    priceFrom: 28,
    durationMinutes: 60,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/salon_interior_luxury_1790208575500.jpg'
  },
  {
    id: 'brazilian-bridal-package',
    name: 'Haute Bridal Beauty Package',
    category: 'bridal',
    categoryLabel: 'Bridal & Occasion',
    description: 'Comprehensive VIP bridal experience including full bridal hair trial, wedding day architectural updo, luxury long-wear makeup, and bridal party pampering.',
    priceFrom: 150,
    durationMinutes: 240,
    featured: true,
    branchAvailability: ['seef', 'saar'],
    image: '/src/assets/images/bridal_beauty_glamour_1790208593187.jpg',
    benefits: ['Dedicated private bridal suite', 'Pre-wedding skin & hair timeline', 'Complimentary veil and hair jewelry placement']
  },
  {
    id: 'facial-glow-infusion',
    name: 'Amazonian Hydration Facial',
    category: 'facial',
    categoryLabel: 'Facial & Skin',
    description: 'Multi-step clinical facial featuring gentle ultrasonic exfoliation, lymphatic facial drainage massage, and high-potency vitamin C botanical infusion.',
    priceFrom: 45,
    durationMinutes: 60,
    branchAvailability: ['seef'],
    image: '/src/assets/images/salon_interior_luxury_1790208575500.jpg'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'k18-leave-in-mask',
    brand: 'K18',
    name: 'Biomimetic Hair Science Molecular Repair Mask',
    category: 'Damaged Hair',
    description: 'Patented K18Peptide formula that reverses damage from bleach, color, chemical services, and heat in just 4 minutes.',
    volume: '50ml',
    price: 32,
    stock: 18,
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    rating: 4.9
  },
  {
    id: 'wella-elements-renewing',
    brand: 'Wella',
    name: 'Elements Renewing Paraben-Free Shampoo',
    category: 'Dry Hair',
    description: 'Formulated with up to 99% natural origin ingredients. Gently cleanses and restores hair vitality without stripping moisture.',
    volume: '250ml',
    price: 14.5,
    stock: 24,
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    rating: 4.8
  },
  {
    id: 'nashi-argan-oil',
    brand: 'Nashi',
    name: 'Argan Deep Infusion Instant Elixir',
    category: 'Frizzy Hair',
    description: 'Enriched with organic certified Argan and Linseed oil to eliminate frizz, seal split ends, and add radiant shine without greasy weight.',
    volume: '100ml',
    price: 26,
    stock: 12,
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    rating: 5.0
  },
  {
    id: 'kadus-color-radiance',
    brand: 'Kadus',
    name: 'Color Radiance Intensive Treatment',
    category: 'Color-Treated Hair',
    description: 'Shields colored hair from fading, keeps pigments locked deep inside cuticles, and provides instantaneous silky softness.',
    volume: '200ml',
    price: 16,
    stock: 15,
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg',
    rating: 4.7
  },
  {
    id: 'framar-detangle-brush',
    brand: 'Framar',
    name: 'Botanical Edition Wide Cushion Detangle Brush',
    category: 'All Hair Types',
    description: 'Flexible bristles effortlessly glide through wet or dry hair without snagging or pulling sensitive Brazilian-treated hair.',
    volume: '1 Unit',
    price: 11,
    stock: 30,
    image: '/src/assets/images/salon_interior_luxury_1790208575500.jpg',
    rating: 4.9
  },
  {
    id: 'bella-botanical-serum',
    brand: 'Bella Rituals',
    name: 'Amazonian Pracaxi & Buriti Gloss Oil',
    category: 'Straightening & Frizz',
    description: 'Our proprietary salon finish oil containing cold-pressed Brazilian Pracaxi oil for unmatched shine, thermal defense, and humid-proof discipline.',
    volume: '60ml',
    price: 22.5,
    stock: 40,
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    rating: 5.0
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'brazilian-hair-rituals-explained',
    slug: 'why-brazilian-hair-rituals-are-having-a-moment',
    title: 'Why Brazilian Hair Rituals Are Transforming Modern Hair Care',
    category: 'Hair Science',
    excerpt: 'From organic smoothing botanicals to fiber-rebuilding botox, understand why Brazilian haircare has become the gold standard in Bahrain.',
    readTime: '4 min read',
    date: 'September 2026',
    author: 'Camila Santos · Master Stylist',
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg',
    content: [
      'For decades, Brazilian stylists have pioneered methods to preserve hair health under intense sun, saltwater, and humidity. Today, those exact principles provide the ultimate solution for women in Bahrain facing high gulf humidity and treated tap water.',
      'Unlike older, harsh keratin techniques of the 2000s, modern Brazilian rituals such as our Authentic Brazilian Blowout and Keraorganic systems preserve the natural molecular integrity of the hair strand. They seal the cuticle with plant amino acids and Amazonian oils rather than plasticizing coatings.',
      'The result is hair that moves naturally, reflects pure sunlight, and cuts drying time by more than 50% without compromising natural curl pattern when desired.'
    ]
  },
  {
    id: 'balayage-in-gulf-climate',
    slug: 'caring-for-balayage-in-the-gulf-climate',
    title: 'Caring for Balayage and Highlights in the Gulf Climate',
    category: 'Color & Care',
    excerpt: 'Bespoke advice on protecting blonde tones, neutralizing brassiness, and keeping hair cuticles hydrated during hot months.',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Mariana Silva · Color Director',
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg',
    content: [
      'Maintaining luminous dimension in the Arabian Gulf requires a distinct color strategy. High mineral content in desalted water combined with intense UV radiation quickly strips delicate toner molecules, causing blondes to tilt brassy.',
      'We recommend our clients schedule a 30-minute Acidic Gloss Toner every 6 weeks. Pairing this in-salon treatment with weekly molecular masks like K18 protects the cortex from oxidation.',
      'When you protect the hair cuticle with Brazilian protective botanical oils before heading outdoors, your color remains as fresh as the day you stepped out of our salon.'
    ]
  },
  {
    id: 'the-art-of-russian-manicure',
    slug: 'the-secret-behind-flawless-russian-nails',
    title: 'The Discipline Behind Flawless Russian Nails & BIAB Care',
    category: 'Nails & Handcare',
    excerpt: 'How precision dry e-file cuticle techniques result in four weeks of immaculate, clean nail growth.',
    readTime: '3 min read',
    date: 'July 2026',
    author: 'Larissa Lima · Senior Nail Artist',
    image: '/src/assets/images/salon_interior_luxury_1790208575500.jpg',
    content: [
      'Traditional wet manicures soften the natural nail plate with water, causing the nail to expand temporarily. When polish is applied and the nail later dehydrates and shrinks, premature chipping occurs.',
      'The Russian manicure method uses diamond-coated electronic bits under gentle dry conditions to sculpt the cuticle with surgical precision. Polish is then applied microscopic millimeters beneath the proximal fold, granting up to 4 full weeks of pristine wear.'
    ]
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'camila',
    name: 'Camila Rocha',
    role: 'Artistic Director & Master Stylist',
    specialty: 'Brazilian Blowout & Precision Cuts',
    branch: 'Both Branches',
    experience: '14+ years Brazilian salon expertise',
    image: '/src/assets/images/hero_brazilian_beauty_1790208553834.jpg'
  },
  {
    id: 'gabriela',
    name: 'Gabriela Mendes',
    role: 'Head Color Specialist',
    specialty: 'Balayage & Dimensional Lightening',
    branch: 'Seef',
    experience: '10+ years European & Latin American techniques',
    image: '/src/assets/images/editorial_hair_color_1790208584488.jpg'
  },
  {
    id: 'isabela',
    name: 'Isabela Fontes',
    role: 'Senior Hair Therapy Specialist',
    specialty: 'Hair Botox, Keraorganic & Scalp Detox',
    branch: 'Saar',
    experience: '8+ years organic haircare formulation',
    image: '/src/assets/images/brazilian_treatment_gloss_1790208564296.jpg'
  },
  {
    id: 'valentina',
    name: 'Valentina Cruz',
    role: 'Nail & Bridal Artistry Lead',
    specialty: 'Russian Manicure & Haute Bridal Hair',
    branch: 'Seef',
    experience: '9+ years luxury event & runway beauty',
    image: '/src/assets/images/bridal_beauty_glamour_1790208593187.jpg'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    name: 'Noor Al-Khalifa',
    service: 'Authentic Brazilian Blowout',
    branch: 'Seef',
    rating: 5,
    verifiedSource: 'Fresha Verified Booking',
    comment: 'The best hair treatment in Bahrain by far. My curls were completely unmanageable in the summer humidity until Camila worked her magic. Zero frizz, mirror shine, and so soft.',
    date: '2 weeks ago'
  },
  {
    id: 'rev-2',
    name: 'Fatima H.',
    service: 'Balayage & K18 Treatment',
    branch: 'Saar',
    rating: 5,
    verifiedSource: 'Google Reviews (5.0)',
    comment: 'The aesthetic of the Saar branch feels like a secluded botanical sanctuary. Gabriela achieved the exact caramel blend I asked for without any breakage. Truly exceptional artistry.',
    date: '1 month ago'
  },
  {
    id: 'rev-3',
    name: 'Elena Rostova',
    service: 'Russian Gel Manicure',
    branch: 'Seef',
    rating: 5,
    verifiedSource: 'Fresha Verified Booking',
    comment: 'Impeccable hygiene and meticulous attention to detail. My Russian manicure lasted a full month without a single lift. Bella Brazil is in a class of its own.',
    date: '3 weeks ago'
  }
];

export const FAQS_DATA = [
  {
    q: 'What is the main difference between Brazilian Blowout and Hair Botox?',
    a: 'Brazilian Blowout is specifically engineered to eliminate frizz, smooth the hair cuticle, and create sleek, humidity-resistant discipline for up to 12 weeks. Hair Botox is primarily an intensive restorative treatment that infuses collagen, amino acids, and botanical nutrients into damaged fibers without altering curl structure.'
  },
  {
    q: 'Can I wash my hair immediately after the treatment?',
    a: 'Yes! Unlike older generation keratin treatments that required waiting 72 hours without washing, our Authentic Brazilian Blowout is completed entirely in-salon. You can wash your hair, tie it up, or exercise the very same day.'
  },
  {
    q: 'Which branch should I visit: Seef or Saar?',
    a: 'Both branches deliver the identical standard of Brazilian expertise and signature treatments. Our Seef branch (Building 3354, Road 2845) is a spacious flagship salon open until 9:00 PM, while our Saar branch offers a more intimate, tranquil boutique garden setting open until 7:00 PM.'
  },
  {
    q: 'How can I book an appointment?',
    a: 'You can book directly using our online booking concierge, message us on WhatsApp at +973 33520102, or call our central line at +973 13110311. We look forward to welcoming you into the sanctuary.'
  }
];
