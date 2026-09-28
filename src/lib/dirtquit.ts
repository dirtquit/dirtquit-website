// Business contact details. Replace the placeholders below with the real
// Dirt Quit phone / WhatsApp number when supplied by the business owner.
export const PHONE_DISPLAY = "+91 82966 82403";
export const PHONE_TEL = "+918296682403";
export const WHATSAPP_NUMBER = "918296682403";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Dirt Quit, I would like to enquire about your cleaning services in Bengaluru.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const text = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function telLink() {
  return PHONE_TEL ? `tel:${PHONE_TEL}` : "#book";
}

/** Analytics event hook for Google Ads, Meta Pixel, and GTM. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params);
  }
  if (typeof w.fbq === "function") {
    w.fbq("trackCustom", event, params);
  }
}

/** Helper to preselect a service in the booking form and scroll to #book */
export function selectBookingService(service: string) {
  track("service_selection", { service });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dirtquit:select-service", { detail: { service } }));
    const target = document.getElementById("book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/** Helper to preselect a Bengaluru area in the booking form and scroll to #book */
export function selectBookingArea(area: string) {
  track("area_selection", { area });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dirtquit:select-area", { detail: { area } }));
    const target = document.getElementById("book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
}

/** Scroll depth tracking for 50% and 90% */
export function initScrollTracking() {
  if (typeof window === "undefined") return () => {};
  let tracked50 = false;
  let tracked90 = false;

  const onScroll = () => {
    const scrollPercent =
      (window.scrollY + window.innerHeight) / (document.documentElement.scrollHeight || 1);
    if (!tracked50 && scrollPercent >= 0.5) {
      tracked50 = true;
      track("scroll_50");
    }
    if (!tracked90 && scrollPercent >= 0.9) {
      tracked90 = true;
      track("scroll_90");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
  cta: string;
  chips?: string[];
  group: "residential" | "specialist" | "commercial";
};

export const SERVICES: ServiceCategory[] = [
  {
    id: "home-cleaning",
    title: "Home & House Cleaning",
    description:
      "Professional cleaning services designed to keep your home fresh, comfortable and ready for everyday life.",
    items: [
      "Home Cleaning",
      "House Cleaning",
      "Residential Cleaning",
      "Professional Home Cleaning",
      "Full House Cleaning",
      "Complete Home Cleaning",
      "Regular Home Cleaning",
      "Intensive Home Cleaning",
    ],
    cta: "Book Home Cleaning",
    group: "residential",
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    description:
      "A detailed top-to-bottom clean for homes and spaces that need more than everyday cleaning.",
    items: [
      "Deep Cleaning",
      "Home Deep Cleaning",
      "House Deep Cleaning",
      "Apartment Deep Cleaning",
      "Flat Deep Cleaning",
      "Full House Deep Cleaning",
      "Complete Home Cleaning",
      "Intensive Home Cleaning",
      "Residential Deep Cleaning",
      "Professional Deep Cleaning",
    ],
    cta: "Book Deep Cleaning",
    group: "residential",
  },
  {
    id: "apartment-cleaning",
    title: "Apartment & Flat Cleaning",
    description:
      "Detailed cleaning for apartments, flats, villas and duplex homes of different sizes.",
    items: [
      "Apartment Cleaning",
      "Flat Cleaning",
      "Apartment Deep Cleaning",
      "Flat Deep Cleaning",
      "1 BHK Cleaning",
      "1 BHK Deep Cleaning",
      "2 BHK Cleaning",
      "2 BHK Deep Cleaning",
      "3 BHK Cleaning",
      "3 BHK Deep Cleaning",
      "4 BHK Cleaning",
      "4 BHK Deep Cleaning",
      "Villa Cleaning",
      "Villa Deep Cleaning",
      "Duplex Cleaning",
      "Furnished Apartment Cleaning",
      "Unfurnished Apartment Cleaning",
    ],
    chips: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Duplex"],
    cta: "Book Apartment Cleaning",
    group: "residential",
  },
  {
    id: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    description: "Bring back the fresh, clean feel with detailed bathroom and washroom cleaning.",
    items: [
      "Bathroom Cleaning",
      "Bathroom Deep Cleaning",
      "Toilet Cleaning",
      "Toilet Deep Cleaning",
      "Washroom Cleaning",
      "Washroom Deep Cleaning",
      "Bathroom Tile Cleaning",
      "Bathroom Floor Cleaning",
      "Bathroom Grout Cleaning",
      "Shower Cleaning",
      "Sanitary Cleaning",
      "Bathroom Stain Removal",
    ],
    cta: "Book Bathroom Cleaning",
    group: "residential",
  },
  {
    id: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    description: "Remove grease, stains and built-up grime with detailed kitchen cleaning.",
    items: [
      "Kitchen Cleaning",
      "Kitchen Deep Cleaning",
      "Modular Kitchen Cleaning",
      "Kitchen Chimney Cleaning",
      "Chimney Cleaning",
      "Kitchen Hood Cleaning",
      "Kitchen Exhaust Cleaning",
      "Kitchen Grease Cleaning",
      "Kitchen Tile Cleaning",
      "Kitchen Platform Cleaning",
      "Kitchen Cabinet Cleaning",
      "Kitchen Sink Cleaning",
      "Kitchen Appliance Cleaning",
    ],
    cta: "Book Kitchen Cleaning",
    group: "residential",
  },
  {
    id: "sofa-cleaning",
    title: "Sofa & Upholstery Cleaning",
    description: "Give your sofas and upholstered furniture a deeper, fresher clean.",
    items: [
      "Sofa Cleaning",
      "Sofa Deep Cleaning",
      "Sofa Shampooing",
      "Sofa Shampoo Cleaning",
      "Sofa Dry Cleaning",
      "Sofa Steam Cleaning",
      "Couch Cleaning",
      "Upholstery Cleaning",
      "Fabric Sofa Cleaning",
      "Leather Sofa Cleaning",
      "Sofa Stain Removal",
    ],
    cta: "Book Sofa Cleaning",
    group: "specialist",
  },
  {
    id: "carpet-cleaning",
    title: "Carpet & Rug Cleaning",
    description: "Remove accumulated dust, stains and dirt from carpets, rugs and floor coverings.",
    items: [
      "Carpet Cleaning",
      "Carpet Deep Cleaning",
      "Carpet Shampooing",
      "Carpet Steam Cleaning",
      "Carpet Washing",
      "Carpet Dry Cleaning",
      "Office Carpet Cleaning",
      "Commercial Carpet Cleaning",
      "Rug Cleaning",
      "Rug Cleaning Services",
      "Carpet Stain Removal",
    ],
    cta: "Book Carpet Cleaning",
    group: "specialist",
  },
  {
    id: "mattress-cleaning",
    title: "Mattress Cleaning",
    description: "Give your mattress a deeper clean with professional cleaning and sanitization.",
    items: [
      "Mattress Cleaning",
      "Mattress Deep Cleaning",
      "Mattress Shampooing",
      "Mattress Steam Cleaning",
      "Mattress Sanitization",
      "Bed Mattress Cleaning",
      "Foam Mattress Cleaning",
      "Mattress Stain Removal",
    ],
    cta: "Book Mattress Cleaning",
    group: "specialist",
  },
  {
    id: "floor-cleaning",
    title: "Floor & Tile Cleaning",
    description:
      "Restore the clean finish of your floors with professional floor and tile cleaning.",
    items: [
      "Floor Cleaning",
      "Floor Deep Cleaning",
      "Tile Cleaning",
      "Tile Deep Cleaning",
      "Floor Scrubbing",
      "Floor Polishing",
      "Marble Floor Cleaning",
      "Granite Floor Cleaning",
      "Wooden Floor Cleaning",
      "Vitrified Floor Cleaning",
      "Grout Cleaning",
      "Tile Grout Cleaning",
    ],
    cta: "Book Floor Cleaning",
    group: "specialist",
  },
  {
    id: "window-cleaning",
    title: "Window & Glass Cleaning",
    description:
      "Crystal-clear windows and cleaner glass surfaces for homes and commercial spaces.",
    items: [
      "Window Cleaning",
      "Window Deep Cleaning",
      "Window Washing",
      "Glass Cleaning",
      "Glass Cleaning Services",
      "Balcony Glass Cleaning",
      "Apartment Window Cleaning",
      "Residential Window Cleaning",
      "Commercial Window Cleaning",
    ],
    cta: "Book Window Cleaning",
    group: "specialist",
  },
  {
    id: "move-cleaning",
    title: "Move-In & Move-Out Cleaning",
    description: "Moving in or moving out? Leave the cleaning behind and start fresh.",
    items: [
      "Move-In Cleaning",
      "Move-In Cleaning Services",
      "Move-Out Cleaning",
      "Move-Out Cleaning Services",
      "Moving Cleaning",
      "Rental House Cleaning",
      "Rental Apartment Cleaning",
      "Tenant Move-Out Cleaning",
      "Pre Move-In Cleaning",
      "Post Move-Out Cleaning",
      "House Handover Cleaning",
      "Apartment Handover Cleaning",
      "End of Tenancy Cleaning",
      "Rental Property Cleaning",
    ],
    cta: "Book Move-In / Move-Out Cleaning",
    group: "residential",
  },
  {
    id: "office-cleaning",
    title: "Office & Commercial Cleaning",
    description: "Professional cleaning for workplaces, retail spaces and commercial properties.",
    items: [
      "Office Cleaning",
      "Office Cleaning Services",
      "Commercial Cleaning",
      "Commercial Cleaning Services",
      "Corporate Office Cleaning",
      "Office Deep Cleaning",
      "Office Cleaners",
      "Office Housekeeping",
      "Workplace Cleaning",
      "Business Cleaning Services",
      "Commercial Cleaners",
      "Shop Cleaning",
      "Showroom Cleaning",
      "Retail Store Cleaning",
      "Restaurant Cleaning",
      "Hotel Cleaning",
      "Warehouse Cleaning",
      "Factory Cleaning",
      "Industrial Cleaning",
    ],
    cta: "Request Commercial Cleaning",
    group: "commercial",
  },
  {
    id: "post-construction",
    title: "Post-Construction & Renovation Cleaning",
    description:
      "Remove construction dust, paint residue and post-renovation mess before you move in.",
    items: [
      "Post Construction Cleaning",
      "Post Construction Cleaning Services",
      "Construction Cleaning",
      "Builders Cleaning",
      "Post Renovation Cleaning",
      "Renovation Cleaning",
      "After Construction Cleaning",
      "After Painting Cleaning",
      "Paint Dust Cleaning",
      "Cement Dust Cleaning",
      "Construction Dust Cleaning",
      "New House Cleaning",
      "Newly Constructed House Cleaning",
      "New Apartment Cleaning",
    ],
    cta: "Book Post-Construction Cleaning",
    group: "commercial",
  },
  {
    id: "balcony-cleaning",
    title: "Balcony & Outdoor Cleaning",
    description: "Refresh neglected outdoor spaces and bring back a cleaner finish.",
    items: [
      "Balcony Cleaning",
      "Balcony Deep Cleaning",
      "Balcony Washing",
      "Terrace Cleaning",
      "Terrace Cleaning Services",
      "Outdoor Cleaning",
      "Patio Cleaning",
      "Balcony Floor Cleaning",
      "Balcony Glass Cleaning",
      "Balcony Railing Cleaning",
    ],
    cta: "Book Outdoor Cleaning",
    group: "specialist",
  },
  {
    id: "appliance-cleaning",
    title: "Appliance Cleaning",
    description: "Professional cleaning for the appliances that work hard every day.",
    items: [
      "Fridge Cleaning",
      "Refrigerator Cleaning",
      "Washing Machine Cleaning",
      "Microwave Cleaning",
      "Oven Cleaning",
      "Dishwasher Cleaning",
      "Chimney Cleaning",
      "Exhaust Fan Cleaning",
      "AC Cleaning",
      "Air Conditioner Cleaning",
    ],
    cta: "Book Appliance Cleaning",
    group: "specialist",
  },
  {
    id: "regular-cleaning",
    title: "Regular Home Cleaning",
    description: "Keep your home consistently clean with recurring cleaning support.",
    items: [
      "Maid Services",
      "House Maid",
      "Home Maid Service",
      "Part-Time Maid",
      "Cleaning Maid",
      "Domestic Cleaning",
      "Regular House Cleaning",
      "Daily House Cleaning",
      "Weekly House Cleaning",
      "Monthly House Cleaning",
      "Recurring Cleaning Services",
      "Regular Cleaning Services",
      "Housekeeping Services",
    ],
    cta: "Ask About Regular Cleaning",
    group: "residential",
  },
  {
    id: "specialized-cleaning",
    title: "Specialized Cleaning",
    description: "For those cleaning jobs that need extra attention.",
    items: [
      "Sanitization",
      "Home Sanitization",
      "House Sanitization",
      "Disinfection",
      "Home Disinfection",
      "Office Sanitization",
      "Office Disinfection",
      "Dust Removal",
      "Cobweb Cleaning",
      "Stain Removal",
      "Odour Removal",
      "Mold Cleaning",
      "Mould Cleaning",
      "Grease Cleaning",
      "Upholstery Cleaning",
      "Furniture Cleaning",
      "Chair Cleaning",
      "Dining Chair Cleaning",
      "Curtain Cleaning",
    ],
    cta: "Talk to a Cleaning Expert",
    group: "specialist",
  },
];

export const BOOKING_SERVICES = [
  "Home Cleaning",
  "Deep Cleaning",
  "Apartment Cleaning",
  "Bathroom Cleaning",
  "Kitchen Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Mattress Cleaning",
  "Floor Cleaning",
  "Window Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Office Cleaning",
  "Commercial Cleaning",
  "Post-Construction Cleaning",
  "Balcony Cleaning",
  "Appliance Cleaning",
  "Regular Cleaning",
  "Specialized Cleaning",
  "Other",
];

export const PROPERTY_TYPES = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Villa",
  "Duplex",
  "Office",
  "Shop / Showroom",
  "Restaurant / Hotel",
  "Warehouse / Factory",
  "Other",
];

export const AREAS = [
  "Whitefield",
  "Marathahalli",
  "Brookefield",
  "Hoodi",
  "KR Puram",
  "Mahadevapura",
  "Bellandur",
  "Sarjapur Road",
  "HSR Layout",
  "Koramangala",
  "Electronic City",
  "Bommanahalli",
  "BTM Layout",
  "Indiranagar",
  "CV Raman Nagar",
  "Hebbal",
  "Yelahanka",
  "Jayanagar",
  "JP Nagar",
  "Banashankari",
  "Rajajinagar",
  "Malleshwaram",
  "RT Nagar",
  "Kalyan Nagar",
  "Banaswadi",
  "Thanisandra",
  "Nagawara",
  "Hennur",
  "Devanahalli",
  "Kanakapura Road",
  "Bannerghatta Road",
  "Hosur Road",
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What cleaning services does Dirt Quit provide?",
    a: "Dirt Quit provides home and house cleaning, deep cleaning, apartment and villa cleaning, kitchen and bathroom cleaning, sofa, carpet and mattress cleaning, floor, tile and window cleaning, move-in and move-out cleaning, office and commercial cleaning, post-construction cleaning, appliance cleaning, regular cleaning and specialized cleaning such as sanitization and stain removal.",
  },
  {
    q: "Do you provide deep cleaning services in Bengaluru?",
    a: "Yes. Deep cleaning covers a detailed top-to-bottom clean of your home or space, including kitchens, bathrooms, floors and hard-to-reach areas. Tell us the property size and condition and we'll suggest the right scope.",
  },
  {
    q: "Do you clean 1 BHK, 2 BHK, 3 BHK and 4 BHK apartments?",
    a: "Yes. We handle apartments and flats of all sizes, furnished or unfurnished. Choose your property size in the booking form so we can plan the team and time needed.",
  },
  {
    q: "Do you provide villa cleaning?",
    a: "Yes. Villas and duplex homes are cleaned as a planned job because of the larger area and multiple floors. Share the layout and we'll recommend a suitable service.",
  },
  {
    q: "Do you provide bathroom deep cleaning?",
    a: "Yes. Bathroom deep cleaning includes tiles, grout, floors, shower areas, sanitary fittings and stain removal.",
  },
  {
    q: "Do you provide kitchen deep cleaning?",
    a: "Yes. Kitchen deep cleaning covers platforms, cabinets, tiles, sinks, chimney and hood surfaces, exhausts and grease build-up.",
  },
  {
    q: "Do you provide sofa cleaning?",
    a: "Yes. We clean fabric and leather sofas, couches and other upholstered furniture, including shampooing, dry cleaning and steam cleaning depending on the material.",
  },
  {
    q: "Do you provide carpet cleaning?",
    a: "Yes. Carpets and rugs can be shampooed, steam cleaned or dry cleaned for homes and offices.",
  },
  {
    q: "Do you provide mattress cleaning?",
    a: "Yes. Mattress cleaning includes vacuuming, shampooing or steam cleaning and sanitization based on the mattress type.",
  },
  {
    q: "Do you provide office cleaning?",
    a: "Yes. We clean offices, corporate workspaces and workstations, including office deep cleaning and housekeeping support.",
  },
  {
    q: "Do you provide commercial cleaning?",
    a: "Yes. Shops, showrooms, retail stores, restaurants, hotels, warehouses and factories are all covered under our commercial cleaning services.",
  },
  {
    q: "Do you provide move-in and move-out cleaning?",
    a: "Yes. We clean rental homes and apartments before you move in or after you move out, including handover cleaning for tenants and owners.",
  },
  {
    q: "Do you provide post-construction cleaning?",
    a: "Yes. We remove construction dust, cement and paint residue from newly built or freshly renovated homes and commercial spaces.",
  },
  {
    q: "Do you provide regular cleaning services?",
    a: "Yes. Recurring cleaning can be arranged on a schedule that works for you. Share how often you need it and we'll suggest a plan.",
  },
  {
    q: "Do you provide appliance cleaning?",
    a: "Yes. Fridges, washing machines, microwaves, ovens, dishwashers, chimneys, exhaust fans and air conditioners can be cleaned individually or with a larger job.",
  },
  {
    q: "How do I book a cleaning service?",
    a: "Fill the booking form on this page with your service, property type, location and preferred time, or message us on WhatsApp. We'll confirm the details with you.",
  },
  {
    q: "How can I contact Dirt Quit through WhatsApp?",
    a: "Tap any WhatsApp button on this page. It opens a chat with a short message already written so you only have to describe what needs cleaning.",
  },
  {
    q: "Can I request a quote?",
    a: "Yes. Cleaning requirements vary by property size, service type and condition. Send us the details and we'll share the relevant pricing.",
  },
  {
    q: "Can I schedule cleaning for a specific date?",
    a: "Yes. Choose your preferred date and time in the booking form and we'll confirm availability with you.",
  },
];
