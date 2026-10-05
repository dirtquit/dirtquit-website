import { FAQS, PHONE_DISPLAY, SERVICES } from "@/lib/dirtquit";
import { BusinessJsonLd } from "./BusinessJsonLd";

export function JsonLd() {

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
    logo: "https://www.dirtquit.info/logo.png",
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
      <BusinessJsonLd />
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
