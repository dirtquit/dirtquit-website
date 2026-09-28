import { MapPin, Phone, Sparkles } from "lucide-react";
import finalCtaBg from "@/assets/final-cta.jpg";
import { PHONE_DISPLAY, telLink, track } from "@/lib/dirtquit";
import { BookButton, Container, WhatsAppButton } from "./shared";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 text-white">
      {/* Background Image with Dark Navy Overlay */}
      <div className="absolute inset-0">
        <img
          src={finalCtaBg}
          alt="A beautifully cleaned, bright and immaculate Bengaluru living room"
          className="size-full object-cover"
          loading="lazy"
        />
        {/* Layered dark navy gradient overlay for maximum contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/85" />
        <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-md border border-white/15">
            <Sparkles className="size-3.5 fill-primary" />
            READY FOR A CLEANER SPACE?
          </div>

          <h2 className="mt-6 font-display text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-white">
            Your Space Deserves
            <br />
            <span className="text-primary">A Fresh Start.</span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/80 max-w-xl mx-auto">
            Tell us what needs cleaning. We'll take it from there.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookButton
              source="final_cta"
              size="lg"
              variant="primary"
              label="Book a Cleaning"
              className="text-base px-8 h-14 font-extrabold shadow-lift"
            />
            <WhatsAppButton
              source="final_cta"
              size="lg"
              variant="whatsapp"
              label="💬 WhatsApp Dirt Quit"
              className="text-base px-8 h-14 font-extrabold"
              message="Hi Dirt Quit, I would like to book a cleaning service for my space in Bengaluru."
            />
          </div>

          {/* Contact info below */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/75 font-medium border-t border-white/15 pt-8">
            <a
              href={telLink()}
              onClick={() => track("phone_click", { source: "final_cta" })}
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="size-4 text-primary" />
              <span>
                Call Us: <strong className="text-white">{PHONE_DISPLAY}</strong>
              </span>
            </a>
            <span className="text-white/30 hidden sm:inline">·</span>
            <div className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              <span>Serving Greater Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
