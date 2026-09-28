import { FAQS, PHONE_DISPLAY, SERVICES } from "@/lib/dirtquit";

export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Dirt Quit",
    alternateName: "Dirt Quit Bengaluru",
    description:
      "Professional cleaning services for homes, apartments, offices and commercial spaces across Bengaluru. From deep cleaning and kitchens to sofas, bathrooms and move-in cleaning.",
    slogan: "Cleaner Spaces. Brighter Lives.",
    url: "https://dirtquit.in",
    telephone: PHONE_DISPLAY,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dirt Quit",
    legalName: "Dirt Quit Cleaning Services",
    slogan: "Cleaner Spaces. Brighter Lives.",
    logo: "https://dirtquit.in/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_DISPLAY,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Kannada", "Hindi"],
    },
  };

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.slice(0, 10).map((srv, index) => ({
      "@type": "Service",
      position: index + 1,
      name: srv.title,
      description: srv.description,
      provider: {
        "@type": "LocalBusiness",
        name: "Dirt Quit",
      },
      areaServed: {
        "@type": "City",
        name: "Bengaluru",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogSchema) }}
      />
    </>
  );
}
