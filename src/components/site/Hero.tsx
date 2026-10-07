import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  Home,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-cleaner.jpg";
import { BookButton, Container, WhatsAppButton } from "./shared";

const PROMISES = [
  "Trained Professionals",
  "Safe & Effective Cleaning",
  "Flexible Scheduling",
  "Residential & Commercial",
];

const TRUST_BLOCKS = [
  {
    icon: ShieldCheck,
    title: "Trained Professionals",
    text: "Professionals who care about the details.",
  },
  {
    icon: Leaf,
    title: "Safe & Effective",
    text: "Cleaning methods selected for your space.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    text: "Book a convenient time.",
  },
  {
    icon: Building2,
    title: "Home & Commercial",
    text: "One team for different spaces.",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/30"
    >
      {/* Subtle background ambient blur */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-40 size-[42rem] rounded-full bg-brand-tint/80 blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-60 size-[32rem] rounded-full bg-secondary blur-3xl opacity-50"
      />

      <Container className="relative grid items-center gap-12 pb-6 pt-8 sm:pt-12 lg:grid-cols-[48fr_52fr] lg:gap-14 lg:pt-14">
        {/* Left Column (approx 48%) */}
        <div className="reveal flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary w-fit border border-primary/20">
            <Sparkles className="size-3.5 fill-primary" />
            PROFESSIONAL CLEANING SERVICES IN BENGALURU
          </div>

          <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-[4.25rem]">
            Cleaner Spaces.
            <br />
            <span className="text-primary">Brighter Lives.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Professional cleaning services for homes, apartments, offices and commercial spaces
            across Bengaluru. From deep cleaning and kitchens to sofas, bathrooms and move-in
            cleaning, Dirt Quit helps you get a cleaner space without the hassle.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <BookButton source="hero" size="lg" label="Book a Cleaning" />
            <WhatsAppButton
              source="hero"
              size="lg"
              variant="whatsapp-outline"
              label="WhatsApp Us"
            />
          </div>

          {/* Under CTA Promises Checklist */}
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-medium text-foreground/85 border-t border-border/80 pt-6">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column (approx 52%) */}
        <div className="relative reveal lg:pl-4">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/60 bg-card shadow-lift">
            <img
              src={heroImg}
              alt="Professional home cleaning service in Bengaluru - professional cleaner deep cleaning a contemporary living space"
              width={1280}
              height={1408}
              className="h-[28rem] w-full object-cover sm:h-[34rem] lg:h-[38rem]"
              loading="eager"
            />
            {/* Subtle aesthetic gradient rim */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-black/5" />
          </div>

          {/* FLOATING CARD 1: Top Left / Middle */}
          <div className="absolute -left-2 sm:-left-6 top-8 sm:top-12 flex items-center gap-3.5 rounded-2xl border border-white/80 bg-card/95 p-3.5 pr-6 shadow-lift backdrop-blur-md transition-transform hover:-translate-y-1">
            <div className="grid size-11 place-items-center rounded-xl bg-brand-tint text-primary shadow-sm">
              <Home className="size-5" />
            </div>
            <div>
              <div className="font-display text-sm font-bold text-navy">Clean Homes</div>
              <div className="text-xs font-medium text-muted-foreground">Happier Living</div>
            </div>
            <span className="ml-1 text-primary text-xs font-bold">→</span>
          </div>

          {/* FLOATING CARD 2: Bottom Right */}
          <div className="absolute -right-2 sm:-right-6 bottom-8 sm:bottom-12 flex items-center gap-3.5 rounded-2xl border border-white/80 bg-card/95 p-3.5 pr-6 shadow-lift backdrop-blur-md transition-transform hover:-translate-y-1">
            <div className="grid size-11 place-items-center rounded-xl bg-primary text-white shadow-sm">
              <Sparkles className="size-5 fill-white" />
            </div>
            <div>
              <div className="font-display text-sm font-bold text-navy">Deep Cleaning</div>
              <div className="text-xs font-medium text-muted-foreground">Every Detail Matters</div>
            </div>
            <span className="ml-1 text-primary text-xs font-bold">→</span>
          </div>
        </div>
      </Container>

      {/* HERO TRUST STRIP: Section 7 (No fake statistics, exactly 4 compact trust blocks) */}
      <Container className="pb-16 pt-8 lg:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST_BLOCKS.map((t) => (
            <div
              key={t.title}
              className="flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-md"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-tint text-primary">
                <t.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-snug">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
