import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { initScrollTracking } from "@/lib/dirtquit";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyDirtQuit } from "@/components/site/WhyDirtQuit";
import { HowItWorks } from "@/components/site/HowItWorks";
import { BookingForm } from "@/components/site/BookingForm";
import { AreasServed } from "@/components/site/AreasServed";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { JsonLd } from "@/components/site/JsonLd";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Dirt Quit – Professional Cleaning Services in Bengaluru | Cleaner Spaces. Brighter Lives.",
      },
      {
        name: "description",
        content:
          "Professional cleaning services for homes, apartments, and offices across Bengaluru. From deep cleaning to kitchens and bathrooms. Book your cleaning today.",
      },
      { property: "og:title", content: "Dirt Quit – Professional Cleaning Services in Bengaluru" },
      {
        property: "og:description",
        content:
          "Professional cleaning services for homes, apartments, and offices across Bengaluru. From deep cleaning to kitchens and bathrooms. Book your cleaning today.",
      },
      { property: "og:url", content: "https://www.dirtquit.info/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.dirtquit.info/" }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const unbind = initScrollTracking();
    return () => unbind();
  }, []);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-navy pb-16 lg:pb-0">
      {/* Schema.org Structured Data */}
      <JsonLd />

      {/* 1 & 2. Top Utility Bar & Sticky Header */}
      <Header />

      <main id="main-content">
        {/* 3 & 4. Hero & Trust / Service Highlights Strip */}
        <Hero />

        {/* 5. Main Services (18 categories) & Price Intent Section */}
        <Services />

        {/* 8. Why Dirt Quit (Dark Navy) */}
        <WhyDirtQuit />

        {/* 9. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 10. Booking / Quote Form */}
        <BookingForm />

        {/* 11. Bengaluru Service Areas (32 Localities) */}
        <AreasServed />

        {/* 12. Testimonials */}
        <Testimonials />

        {/* 13. FAQ (19 Questions) */}
        <FAQ />

        {/* 14. Final CTA */}
        <FinalCTA />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* 16. Floating WhatsApp (Desktop) */}
      <FloatingWhatsApp />

      {/* 17. Mobile Sticky Action Bar */}
      <MobileActionBar />
    </div>
  );
}
