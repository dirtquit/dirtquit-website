import type { CategoryImages } from "./types";

// Kitchen Cleaning
import kitchenHero from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-hero.webp";
import kitchenHero800 from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-hero-800.webp";
import kitchenHero480 from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-hero-480.webp";
import kitchenOg from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-og.jpg";
import kitchenDetail from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-detail.webp";
import kitchenContext from "@/assets/categories/kitchen-cleaning/kitchen-cleaning-bengaluru-context.webp";

export const CATEGORY_IMAGES: Record<string, CategoryImages> = {
  "kitchen-cleaning": {
    hero: {
      src: kitchenHero,
      alt: "Clean modular kitchen countertop, sink, and backsplash tiles",
      width: 1024,
      height: 768,
      srcset: `${kitchenHero480} 480w, ${kitchenHero800} 800w, ${kitchenHero} 1024w`,
      sizes: "(min-width: 1024px) 45vw, 100vw",
    },
    detail: {
      src: kitchenDetail,
      alt: "Stainless steel gas burner hob and polished granite counter surface",
      width: 800,
      height: 600,
    },
    context: {
      src: kitchenContext,
      alt: "Modern modular kitchen layout with clean cabinets and storage shelves",
      width: 800,
      height: 600,
    },
    og: {
      src: kitchenOg,
    },
  },
};

export function getCategoryImages(slug: string): CategoryImages | undefined {
  return CATEGORY_IMAGES[slug];
}
