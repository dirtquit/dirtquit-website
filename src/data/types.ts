export interface LocalityZone {
  id: string;
  label: string;
  areas: string[];
}

export interface City {
  slug: string;
  name: string; // e.g. "Bengaluru"
  altName: string; // e.g. "Bangalore"
  state: string; // "Karnataka"
  isLive: boolean;
  isDefault: boolean;
  zones: LocalityZone[];
  localities: string[];
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CategoryImageSlot {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcset?: string;
  sizes?: string;
}

export interface CategoryImages {
  hero?: CategoryImageSlot;
  detail?: CategoryImageSlot;
  context?: CategoryImageSlot;
  og?: { src: string };
}

export interface CategoryData {
  slug: string;
  id: string; // same as slug, keeps backward compatibility with ServiceCategory
  name: string; // e.g. "Deep Cleaning"
  title: string; // same as name, backwards compatibility
  shortName: string;
  group: "residential" | "specialist" | "commercial";
  summary: string;
  description: string; // same as summary
  metaDescription?: string;
  propertyOptions?: string[]; // e.g. 1 BHK, 2 BHK, 3 BHK
  chips?: string[]; // same as propertyOptions for backwards compatibility
  subServices: string[];
  items: string[]; // same as subServices for backwards compatibility
  cta: string;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  process: ProcessStep[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  image?: string;
  imageAlt?: string;
  whoItsFor?: string;
  whenToBook?: string;
  comparisonNote?: string;
  preparation?: string[];
  images?: CategoryImages;
}
