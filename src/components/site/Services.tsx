import {
  Armchair,
  Bath,
  Building,
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Compass,
  Hammer,
  Home,
  Layers,
  MessageCircle,
  PaintBucket,
  Refrigerator,
  ShieldAlert,
  Sparkles,
  SunMedium,
  Trees,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-cleaner.jpg";
import kitchenImg from "@/assets/kitchen-after.jpg";
import bathImg from "@/assets/bath-after.jpg";
import sofaImg from "@/assets/sofa-after.jpg";
import finalCtaImg from "@/assets/final-cta.jpg";
import { cn } from "@/lib/utils";
import { useCity } from "@/lib/useCity";
import {
  SERVICES,
  selectBookingService,
  track,
  whatsappLink,
  type ServiceCategory,
} from "@/lib/dirtquit";
import { Action, Arrow, Container, SectionHeading, WhatsAppButton, WhatsAppIcon } from "./shared";
import { PriceEstimator } from "./PriceEstimator";

const FILTERS = [
  { id: "all", label: "All Services" },
  { id: "residential", label: "Homes & Apartments" },
  { id: "specialist", label: "Deep & Specialist" },
  { id: "commercial", label: "Offices & Commercial" },
] as const;

// Domain-native icons for each service category
const ICONS: Record<string, React.ElementType> = {
  "home-cleaning": Home,
  "deep-cleaning": Sparkles,
  "apartment-cleaning": Building,
  "bathroom-cleaning": Bath,
  "kitchen-cleaning": UtensilsCrossed,
  "sofa-cleaning": Armchair,
  "carpet-cleaning": Layers,
  "mattress-cleaning": ShieldAlert,
  "floor-cleaning": PaintBucket,
  "window-cleaning": SunMedium,
  "move-cleaning": CalendarCheck,
  "office-cleaning": Building2,
  "post-construction": Hammer,
  "balcony-cleaning": Trees,
  "appliance-cleaning": Refrigerator,
  "regular-cleaning": Clock,
  "specialized-cleaning": Compass,
};

// Stock photography mapped for each service category
const SERVICE_IMAGES: Record<string, string> = {
  "home-cleaning": heroImg,
  "deep-cleaning":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  "apartment-cleaning":
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  "bathroom-cleaning": bathImg,
  "kitchen-cleaning": kitchenImg,
  "sofa-cleaning": sofaImg,
  "carpet-cleaning":
    "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80",
  "mattress-cleaning":
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80",
  "floor-cleaning":
    "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
  "window-cleaning":
    "https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&w=800&q=80",
  "move-cleaning":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "office-cleaning":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  "post-construction":
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  "balcony-cleaning":
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  "appliance-cleaning":
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
  "regular-cleaning":
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
  "specialized-cleaning":
    "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80",
};

function ServiceCard({
  service,
  onOpenDetails,
}: {
  service: ServiceCategory;
  onOpenDetails: (service: ServiceCategory) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { city } = useCity();
  const Icon = ICONS[service.id] || Sparkles;
  const imageUrl = SERVICE_IMAGES[service.id] || heroImg;
  const visibleItems = expanded ? service.items : service.items.slice(0, 6);
  const categoryUrl = `/${city.slug}/${service.slug || service.id}/`;

  const handleBook = () => {
    selectBookingService(service.title);
  };

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift">
      <div>
        {/* Visual Stock Image Header linking to Category Page */}
        <a href={categoryUrl} className="block relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-secondary/50 mb-5 border border-border/50">
          <img
            src={imageUrl}
            alt={`${service.title} service in Bengaluru`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/15 to-transparent" />

          {/* Floating Icon Badge & Category Tag on Top of Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-white/95 text-navy shadow-sm backdrop-blur">
                <Icon className="size-4.5 text-primary" />
              </div>
              <span className="rounded-full bg-navy/85 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur border border-white/10">
                {service.group === "residential"
                  ? "Residential"
                  : service.group === "commercial"
                    ? "Commercial"
                    : "Specialized"}
              </span>
            </div>
          </div>
        </a>

        {/* Title & Description */}
        <a href={categoryUrl} className="block">
          <h3 className="text-xl font-extrabold text-navy group-hover:text-primary transition-colors">
            {service.title}
          </h3>
        </a>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

        {/* Selectable BHK Chips for Apartment Cleaning */}
        {service.chips ? (
          <div className="mt-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-navy/70 mb-2">
              Select Property Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => selectBookingService(`Apartment Cleaning (${chip})`)}
                  className="rounded-lg bg-navy/5 hover:bg-navy hover:text-white px-2.5 py-1 text-xs font-semibold text-navy transition-all active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Visible Service Tags */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {visibleItems.map((item) => (
            <li
              key={item}
              className="rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Expand / View All Link */}
        {service.items.length > 6 ? (
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              {expanded ? "Show fewer" : `+ ${service.items.length - 6} more sub-services`}
              <ChevronDown
                className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
              />
            </button>
            <span className="text-muted-foreground/30">·</span>
            <button
              type="button"
              onClick={() => onOpenDetails(service)}
              className="text-xs font-semibold text-muted-foreground hover:text-navy"
            >
              Full Scope
            </button>
          </div>
        ) : null}
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBook}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-brand-dark group/cta"
        >
          {service.cta}
          <Arrow />
        </button>
        <a
          href={whatsappLink(
            `Hi Dirt Quit, I would like to enquire about ${service.title} in Bengaluru.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { source: `service_card_${service.id}` })}
          className="size-8 rounded-full flex items-center justify-center text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          aria-label={`Enquire about ${service.title} on WhatsApp`}
        >
          <WhatsAppIcon className="size-4" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [activeModal, setActiveModal] = useState<ServiceCategory | null>(null);

  const list = filter === "all" ? SERVICES : SERVICES.filter((s) => s.group === filter);

  return (
    <section id="services" className="section-pad bg-background">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              One Team.
              <br />
              <span className="text-primary">Every Kind of Clean.</span>
            </>
          }
          subtitle="From everyday cleaning to detailed deep cleaning, choose the service your space needs."
        />

        {/* Filter Segmented Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-bold transition-all",
                filter === f.id
                  ? "border-navy bg-navy text-white shadow-soft"
                  : "border-border bg-card text-foreground/75 hover:border-primary/50 hover:text-primary",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 18 Main Service Categories Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.id} service={s} onOpenDetails={(cat) => setActiveModal(cat)} />
          ))}

          {/* 18th Category: Custom Cleaning with visual background image */}
          <article className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-soft p-5 sm:p-6 text-white shadow-lift border border-white/10">
            <div>
              {/* Image banner for Custom Category */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white/10 mb-5 border border-white/10">
                <img
                  src={finalCtaImg}
                  alt="Custom space and specialty cleaning in Bengaluru"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="grid size-9 place-items-center rounded-xl bg-white/15 text-primary backdrop-blur">
                    <MessageCircle className="size-5 text-primary" />
                  </div>
                  <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                    Flexible Scope
                  </span>
                </div>
              </div>

              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary">
                Custom Requirements
              </span>
              <h3 className="mt-1 text-2xl font-extrabold text-white">
                Need Something Else Cleaned?
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                Tell us what needs cleaning and our team can help you identify the right service,
                tailored checklists, and pricing for your unique space in Bengaluru.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10">
              <WhatsAppButton
                source="services_custom_card"
                variant="whatsapp"
                size="lg"
                className="w-full justify-center font-bold"
                message="Hi Dirt Quit, I need help choosing the right cleaning service for my space in Bengaluru."
                label="WhatsApp Us"
              />
            </div>
          </article>
        </div>

        {/* Section 48: Price Intent & Scope Estimator */}
        <PriceEstimator />
      </Container>

      {/* Scope Details Modal */}
      {activeModal ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-6 sm:p-8 shadow-lift border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute right-5 top-5 z-10 grid size-9 place-items-center rounded-full bg-secondary/80 text-foreground hover:bg-border backdrop-blur"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Modal Image Header */}
            <div className="relative -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 h-48 overflow-hidden rounded-t-3xl bg-secondary/60">
              <img
                src={SERVICE_IMAGES[activeModal.id] || heroImg}
                alt={activeModal.title}
                referrerPolicy="no-referrer"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Full Service Scope
            </span>
            <h3 className="mt-1 text-2xl font-bold text-navy">{activeModal.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {activeModal.description}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
                Included Cleaning Checklist & Sub-Services ({activeModal.items.length})
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs font-medium text-foreground">
                {activeModal.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2.5"
                  >
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  selectBookingService(activeModal.title);
                  setActiveModal(null);
                }}
                className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark transition-all text-center"
              >
                Book This Service →
              </button>
              <WhatsAppButton
                source={`modal_${activeModal.id}`}
                variant="whatsapp-outline"
                size="md"
                label="WhatsApp"
                message={`Hi Dirt Quit, I would like to enquire about ${activeModal.title} in Bengaluru.`}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
