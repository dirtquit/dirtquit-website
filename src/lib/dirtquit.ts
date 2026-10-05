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

import { CATEGORIES } from "@/data/categories";
import { getDefaultCity } from "@/data/cities";
import type { CategoryData } from "@/data/types";

export type ServiceCategory = CategoryData;
export const SERVICES: ServiceCategory[] = CATEGORIES;

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

export const AREAS = getDefaultCity().localities;

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
