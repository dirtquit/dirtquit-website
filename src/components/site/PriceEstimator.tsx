import { Calculator, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  BOOKING_SERVICES,
  PROPERTY_TYPES,
  selectBookingService,
  track,
  whatsappLink,
} from "@/lib/dirtquit";
import { Action, Arrow, WhatsAppIcon } from "./shared";

const CONDITIONS = [
  {
    id: "standard",
    label: "Standard / Periodic Maintenance",
    desc: "Routine cleaning, minimal dust accumulation.",
  },
  {
    id: "deep",
    label: "Heavy Deep Clean / Neglected",
    desc: "Built-up grease, tile grout discoloration, corners.",
  },
  {
    id: "move",
    label: "Pre-Move In / Post-Tenancy",
    desc: "Complete top-to-bottom sanitize before unpacking.",
  },
  {
    id: "renovation",
    label: "Post-Construction / Renovation",
    desc: "Cement dust, paint specks, fine debris removal.",
  },
];

export function PriceEstimator() {
  const [service, setService] = useState("Deep Cleaning");
  const [propertyType, setPropertyType] = useState("2 BHK");
  const [condition, setCondition] = useState("standard");

  const selectedCondition = CONDITIONS.find((c) => c.id === condition) ?? CONDITIONS[0]!;

  const handleWhatsAppQuote = () => {
    const text = `Hi Dirt Quit, I am looking for pricing and availability for:
• Service: ${service}
• Property: ${propertyType}
• Condition: ${selectedCondition.label}
Location: Bengaluru. Please share the pricing estimate and available slots.`;
    track("quote_request", { source: "price_estimator", service, propertyType, condition });
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const handleBookingFormPrefill = () => {
    track("quote_request", { source: "price_estimator_form", service, propertyType });
    selectBookingService(service);
  };

  return (
    <div className="mt-14 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-card via-card to-secondary/40 p-6 sm:p-10 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Calculator className="size-3.5" />
            Instant Scope & Estimate Guide
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-navy">
            Looking for Cleaning Prices?
          </h3>
          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Cleaning requirements vary by property size, service type, condition and scope of work.
            Tell us what needs cleaning and we'll help you choose the right service and provide the
            relevant pricing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Action
            href="#book"
            onClick={handleBookingFormPrefill}
            variant="primary"
            size="lg"
            className="font-bold"
          >
            Get a Quote
            <Arrow />
          </Action>
          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 text-sm font-bold shadow-soft hover:bg-[#20bd5a] hover:shadow-lift hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <WhatsAppIcon className="size-4 fill-white" />
            WhatsApp for Rates
          </button>
        </div>
      </div>

      {/* Interactive Scope Configuration */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {/* Step 1: Select Service */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-navy">
            1. Select Service Type
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {BOOKING_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            Covers dedicated equipment, scrubbers, and specialized cleaners.
          </p>
        </div>

        {/* Step 2: Property Type */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-navy">
            2. Property / Space Size
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="mt-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">
            Determines crew size, estimated duration, and chemical quantities.
          </p>
        </div>

        {/* Step 3: Space Condition */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <label className="block text-xs font-bold uppercase tracking-wider text-navy">
            3. Condition Level
          </label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="mt-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {CONDITIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-muted-foreground">{selectedCondition.desc}</p>
        </div>
      </div>

      {/* Transparent Scope Breakdown Card */}
      <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              Transparent Scope Assessment
            </div>
            <div className="mt-1 text-lg font-bold text-navy">
              {service} for {propertyType} ({selectedCondition.label})
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-foreground/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-whatsapp" /> Real-time pricing based on
                verified square footage
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-whatsapp" /> No hidden travel or equipment
                surcharges across Bengaluru
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-whatsapp" /> Pay securely after inspection
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleWhatsAppQuote}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#20bd5a] shadow-soft hover:shadow-lift hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <WhatsAppIcon className="size-4 fill-white" />
            <span>Request Instant Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
