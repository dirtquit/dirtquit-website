import { PHONE_DISPLAY } from "@/lib/dirtquit";

export interface BusinessSchemaCity {
  name: string;
  state?: string;
}

export function getHouseCleaningSchema(city?: BusinessSchemaCity) {
  const cityName = city?.name || "Bengaluru";
  const stateName = city?.state || "Karnataka";

  return {
    "@type": "HouseCleaning",
    "@id": "https://www.dirtquit.info/#organization",
    name: "Dirt Quit",
    alternateName: "Dirt Quit Bengaluru",
    description:
      "Professional cleaning services for homes, apartments, offices and commercial spaces across Bengaluru. From deep cleaning and kitchens to sofas, bathrooms and move-in cleaning.",
    slogan: "Cleaner Spaces. Brighter Lives.",
    url: "https://www.dirtquit.info/",
    telephone: PHONE_DISPLAY,
    image: "https://www.dirtquit.info/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: stateName,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      sameAs: `https://en.wikipedia.org/wiki/${cityName === "Bengaluru" ? "Bangalore" : cityName}`,
    },
  };
}

export function BusinessJsonLd({ city }: { city?: BusinessSchemaCity }) {
  const schema = {
    "@context": "https://schema.org",
    ...getHouseCleaningSchema(city),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
