import { useState } from "react";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  HelpCircle,
  Layers,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import type { CategoryData, City } from "@/data/types";
import { getCategoryBySlug } from "@/data/categories";
import { getCategoryImages } from "@/data/categoryImages";
import {
  selectBookingArea,
  selectBookingService,
  telLink,
  track,
  whatsappLink,
  PHONE_DISPLAY,
} from "@/lib/dirtquit";
import { Breadcrumbs } from "./Breadcrumbs";
import { WhyDirtQuit } from "./WhyDirtQuit";
import { BookingForm } from "./BookingForm";
import { MobileActionBar } from "./MobileActionBar";
import { Action, Arrow, Container, SectionHeading, WhatsAppButton, WhatsAppIcon } from "./shared";
import { getHouseCleaningSchema } from "./BusinessJsonLd";

interface CategoryPageTemplateProps {
  category: CategoryData;
  city: City;
}

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

export function CategoryPageTemplate({ category, city }: CategoryPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [areaQuery, setAreaQuery] = useState("");
  const [activeZone, setActiveZone] = useState("all");

  const pagePath = `/${city.slug}/${category.slug}/`;
  const canonicalUrl = `https://www.dirtquit.info${pagePath}`;

  // Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getHouseCleaningSchema(city),
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: `${category.name} in ${city.name}`,
        serviceType: category.name,
        description: category.description,
        provider: {
          "@id": "https://www.dirtquit.info/#organization",
        },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        ...(category.images?.hero
          ? {
              image: category.images.hero.src.startsWith("http")
                ? category.images.hero.src
                : `https://www.dirtquit.info${category.images.hero.src}`,
            }
          : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${category.name} Sub-Services`,
          itemListElement: category.subServices.map((sub, i) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: sub,
            },
            position: i + 1,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: category.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  // Filter localities by zone & search
  const filteredAreas = city.localities.filter((area) => {
    const matchesQuery = area.toLowerCase().includes(areaQuery.toLowerCase());
    if (activeZone === "all") return matchesQuery;
    const zoneObj = city.zones.find((z) => z.id === activeZone);
    return matchesQuery && (zoneObj?.areas.includes(area) ?? false);
  });

  // Resolve related services
  const relatedCategories = category.relatedSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is CategoryData => Boolean(c));

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 lg:pb-0">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <div className="border-b border-border/40 bg-secondary/20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: city.name, href: `/${city.slug}/` },
              { label: category.name },
            ]}
          />
        </Container>
      </div>

      <main>
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-10 sm:py-16">
          <Container>
            <div
              className={
                category.images?.hero ? "grid gap-8 lg:grid-cols-12 lg:items-center" : "max-w-3xl"
              }
            >
              <div className={category.images?.hero ? "lg:col-span-7" : ""}>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  <MapPin className="size-3.5" />
                  <span>
                    {city.name} ({city.altName}) · Professional Cleaning
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-5xl">
                  {category.name} in <span className="text-primary">{city.name}</span>
                </h1>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {category.description}
                </p>
                <p className="mt-2 text-sm text-foreground/80 font-medium">
                  Serving homes, apartments, and workspaces across {city.name} with trained
                  professionals, safe and effective cleaning, and flexible scheduling.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Action
                    href="#book"
                    size="lg"
                    variant="primary"
                    onClick={() => selectBookingService(category.name)}
                  >
                    Book {category.name}
                    <Arrow />
                  </Action>

                  <WhatsAppButton
                    source={`category_hero_${category.slug}`}
                    size="lg"
                    variant="whatsapp-outline"
                    label="WhatsApp Us"
                    message={`Hi Dirt Quit, I would like to enquire about ${category.name} in ${city.name}.`}
                  />
                </div>

                {/* Mobile Hero Image: placed below intro & CTAs so H1, intro & CTAs are visible without scrolling */}
                {category.images?.hero && (
                  <div className="mt-8 block lg:hidden">
                    <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
                      <img
                        src={category.images.hero.src}
                        alt={category.images.hero.alt}
                        width={category.images.hero.width}
                        height={category.images.hero.height}
                        srcSet={category.images.hero.srcset}
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        loading="eager"
                        // @ts-expect-error fetchpriority is a standard HTML attribute
                        fetchpriority="high"
                        className="h-auto w-full object-cover aspect-[4/3]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Hero Image: beside H1 on desktop */}
              {category.images?.hero && (
                <div className="hidden lg:col-span-5 lg:block">
                  <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
                    <img
                      src={category.images.hero.src}
                      alt={category.images.hero.alt}
                      width={category.images.hero.width}
                      height={category.images.hero.height}
                      srcSet={category.images.hero.srcset}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      loading="eager"
                      // @ts-expect-error fetchpriority is a standard HTML attribute
                      fetchpriority="high"
                      className="h-auto w-full object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Trust Chips (4 blocks from homepage) */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-8 border-t border-border/80">
              {TRUST_BLOCKS.map((t) => (
                <div
                  key={t.title}
                  className="flex flex-col gap-1.5 rounded-xl bg-card p-3 shadow-2xs border border-border/60"
                >
                  <t.icon className="size-5 text-primary shrink-0" />
                  <span className="text-xs font-bold text-navy">{t.title}</span>
                  <span className="text-[11px] text-muted-foreground leading-tight">{t.text}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 3. What's Included & Sub-services */}
        <section className="section-pad bg-background border-t border-border/60">
          <Container>
            <SectionHeading
              eyebrow="Comprehensive Scope"
              title={`What's Included in ${category.name}`}
              subtitle={`From routine touchpoints to hard-to-reach areas, see exactly what our ${category.name.toLowerCase()} covers in ${city.name}.`}
            />

            {/* Property Options (BHK Chips) if available */}
            {category.propertyOptions && category.propertyOptions.length > 0 && (
              <div className="mt-8 mx-auto max-w-2xl text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Property Size to Pre-fill Booking:
                </span>
                <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                  {category.propertyOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => selectBookingService(`${category.name} (${opt})`)}
                      className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-navy transition-all hover:border-primary hover:bg-secondary/60 hover:text-primary active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions Grid */}
            <div
              className={`mt-10 grid gap-8 items-start ${category.images?.detail ? "lg:grid-cols-12" : "lg:grid-cols-2"}`}
            >
              {/* Inclusions */}
              <div
                className={`rounded-3xl border border-primary/20 bg-card p-6 sm:p-8 shadow-soft ${category.images?.detail ? "lg:col-span-7" : ""}`}
              >
                <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-primary">
                  <CheckCircle2 className="size-4 text-primary" />
                  Cleaning Checklist & Key Inclusions
                </div>
                <ul className="mt-5 space-y-3.5 text-xs sm:text-sm text-foreground/90">
                  {category.whatsIncluded.length > 0
                    ? category.whatsIncluded.map((inc) => (
                        <li key={inc} className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{inc}</span>
                        </li>
                      ))
                    : category.subServices.map((sub) => (
                        <li key={sub} className="flex items-start gap-2.5">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{sub}</span>
                        </li>
                      ))}
                </ul>
              </div>

              {/* Detail Image & Exclusions Column */}
              <div className={`space-y-6 ${category.images?.detail ? "lg:col-span-5" : ""}`}>
                {category.images?.detail && (
                  <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
                    <img
                      src={category.images.detail.src}
                      alt={category.images.detail.alt}
                      width={category.images.detail.width}
                      height={category.images.detail.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full object-cover aspect-[4/3]"
                    />
                    <div className="p-3.5 bg-card border-t border-border/50">
                      <p className="text-xs font-medium text-muted-foreground leading-snug">
                        {category.images.detail.alt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Exclusions & Scope Boundaries */}
                <div className="rounded-3xl border border-border bg-secondary/30 p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
                    <XCircle className="size-4 text-muted-foreground" />
                    What's Excluded & Important Guidelines
                  </div>
                  <ul className="mt-5 space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                    {category.whatsNotIncluded.length > 0 ? (
                      category.whatsNotIncluded.map((exc) => (
                        <li key={exc} className="flex items-start gap-2.5">
                          <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{exc}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5">
                          <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            Moving heavy structural furniture without prior customer authorization.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            Cleaning interior locked wardrobes unless emptied before our crew
                            arrives.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>
                            External glass facades on high-rise buildings beyond safe balcony reach.
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sub-services Tags */}
            <div className="mt-8 rounded-2xl border border-border/80 bg-card p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Related Sub-Services & Cleaning Disciplines ({category.subServices.length})
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.subServices.map((sub) => (
                  <span
                    key={sub}
                    className="rounded-full bg-secondary/80 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Service Overview & Booking Guidance */}
        {(category.whoItsFor ||
          category.whenToBook ||
          category.comparisonNote ||
          (category.preparation && category.preparation.length > 0)) && (
          <section className="section-pad bg-secondary/20 border-t border-border/60">
            <Container>
              <SectionHeading
                eyebrow="Booking Guidance"
                title={`Planning Your ${category.name} in ${city.name}`}
                subtitle="Practical information to help you select the right service, prepare your space, and know what to expect."
              />

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {category.whoItsFor && (
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
                    <div>
                      <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-brand-tint text-primary mb-4">
                        <Users className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-navy">Who It Is For</h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {category.whoItsFor}
                      </p>
                    </div>
                  </div>
                )}

                {category.whenToBook && (
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
                    <div>
                      <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-brand-tint text-primary mb-4">
                        <CalendarClock className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-navy">When to Book</h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {category.whenToBook}
                      </p>
                    </div>
                  </div>
                )}

                {category.comparisonNote && (
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
                    <div>
                      <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-brand-tint text-primary mb-4">
                        <Layers className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-navy">How It Differs</h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {category.comparisonNote}
                      </p>
                    </div>
                  </div>
                )}

                {category.preparation && category.preparation.length > 0 && (
                  <div className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between">
                    <div>
                      <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-brand-tint text-primary mb-4">
                        <ClipboardCheck className="size-5" />
                      </div>
                      <h3 className="text-base font-bold text-navy">What to Prepare</h3>
                      <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-muted-foreground">
                        {category.preparation.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-0.5">•</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </section>
        )}

        {/* 4. How It Works for this category */}
        {category.process.length > 0 && (
          <section className="section-pad bg-secondary/30 border-t border-border/60">
            <Container>
              <SectionHeading
                eyebrow="Our Process"
                title={`How ${category.name} Works in 3 Steps`}
                subtitle="A methodical, efficient cleaning workflow designed to deliver spotless results with minimal disruption."
              />

              {category.images?.context ? (
                <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-5">
                    <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft">
                      <img
                        src={category.images.context.src}
                        alt={category.images.context.alt}
                        width={category.images.context.width}
                        height={category.images.context.height}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full object-cover aspect-[4/3]"
                      />
                      <div className="p-3.5 bg-card border-t border-border/50">
                        <p className="text-xs font-medium text-muted-foreground leading-snug">
                          {category.images.context.alt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    {category.process.map((step) => (
                      <div
                        key={step.step}
                        className="relative flex gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft"
                      >
                        <div className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-white">
                          0{step.step}
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-navy">{step.title}</h3>
                          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                  {category.process.map((step) => (
                    <div
                      key={step.step}
                      className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft"
                    >
                      <div>
                        <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-primary text-sm font-extrabold text-white">
                          0{step.step}
                        </div>
                        <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                        <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </section>
        )}

        {/* 5. Why Dirt Quit (reused component) */}
        <WhyDirtQuit />

        {/* 6. Areas We Serve in Bengaluru (32 Localities) */}
        <section id="areas" className="section-pad bg-background">
          <Container>
            <SectionHeading
              eyebrow="Coverage Across the City"
              title={`Where We Provide ${category.name} in ${city.name}`}
              subtitle={`We serve all 32 connected localities across ${city.name}. Click your area to pre-fill the booking form.`}
            />

            {/* Search & Filter Bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={`Search locality in ${city.name} (e.g. Whitefield, HSR Layout)...`}
                  value={areaQuery}
                  onChange={(e) => setAreaQuery(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/70 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveZone("all")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    activeZone === "all"
                      ? "bg-navy text-white shadow-xs"
                      : "bg-secondary text-secondary-foreground hover:bg-border"
                  }`}
                >
                  All ({city.localities.length})
                </button>
                {city.zones.map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setActiveZone(z.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      activeZone === z.id
                        ? "bg-navy text-white shadow-xs"
                        : "bg-secondary text-secondary-foreground hover:bg-border"
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Localities Grid */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filteredAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => selectBookingArea(area)}
                  className="group flex items-center justify-between rounded-xl border border-border/80 bg-card p-3 text-left shadow-2xs transition-all hover:border-primary/50 hover:bg-secondary/40 hover:shadow-xs active:scale-98"
                >
                  <span className="flex items-center gap-2 truncate text-xs font-bold text-navy group-hover:text-primary">
                    <MapPin className="size-3 text-primary shrink-0" />
                    <span className="truncate">{area}</span>
                  </span>
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Book →
                  </span>
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* 7. Pricing Note: Looking for Cleaning Prices? */}
        <section className="bg-secondary/40 py-12 border-y border-border/60">
          <Container>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-card p-6 sm:p-10 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="size-3.5" />
                  Transparent Pricing
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-navy">
                  Looking for {category.name} Prices in {city.name}?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Cleaning requirements vary by property size, furnished status, condition and scope
                  of work. Share your property layout and requirements to receive an exact,
                  transparent quote with no hidden charges.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Action
                  href="#book"
                  size="md"
                  variant="primary"
                  onClick={() => selectBookingService(category.name)}
                >
                  Get an Instant Quote
                  <Arrow />
                </Action>
                <WhatsAppButton
                  source={`pricing_note_${category.slug}`}
                  size="md"
                  variant="whatsapp"
                  label="WhatsApp Rates"
                  message={`Hi Dirt Quit, I would like to know pricing for ${category.name} in ${city.name}.`}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* 8. FAQs Specific to Category and City */}
        {category.faqs.length > 0 && (
          <section id="faqs" className="section-pad bg-background">
            <Container className="max-w-4xl">
              <SectionHeading
                eyebrow="Got Questions?"
                title={`Frequently Asked Questions: ${category.name}`}
                subtitle={`Common questions from homeowners and property managers in ${city.name} about our ${category.name.toLowerCase()}.`}
              />

              <div className="mt-10 space-y-3">
                {category.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-border bg-card transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-navy hover:text-primary transition-colors text-sm sm:text-base"
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="size-4 text-primary shrink-0" />
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        {/* 9. Related Services */}
        {relatedCategories.length > 0 && (
          <section className="section-pad bg-secondary/20 border-t border-border/60">
            <Container>
              <SectionHeading
                eyebrow="Complementary Services"
                title={`Other Popular Services in ${city.name}`}
                subtitle={`Customers who booked ${category.name.toLowerCase()} often choose these cleaning services as well.`}
              />

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedCategories.map((rel) => {
                  const relImg = getCategoryImages(rel.slug);
                  return (
                    <div
                      key={rel.slug}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft transition-all hover:border-primary/50 hover:shadow-lift"
                    >
                      <div>
                        {relImg && (
                          <a
                            href={`/${city.slug}/${rel.slug}/`}
                            className="block relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-secondary/50 mb-4 border border-border/50"
                          >
                            <img
                              src={relImg.hero.src}
                              alt={relImg.hero.alt}
                              width={400}
                              height={250}
                              loading="lazy"
                              decoding="async"
                              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </a>
                        )}
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                          {rel.group.toUpperCase()}
                        </span>
                        <h4 className="mt-2 text-lg font-bold text-navy group-hover:text-primary transition-colors">
                          <a href={`/${city.slug}/${rel.slug}/`}>{rel.name}</a>
                        </h4>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                          {rel.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                        <a
                          href={`/${city.slug}/${rel.slug}/`}
                          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Learn More <ChevronRight className="size-3.5" />
                        </a>
                        <a
                          href="#book"
                          onClick={() => selectBookingService(rel.name)}
                          className="text-xs font-bold text-navy hover:text-primary transition-colors"
                        >
                          Book →
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        )}

        {/* 10. Booking Form Pre-selected with Service & City */}
        <BookingForm initialService={category.name} initialCity={city.name} pagePath={pagePath} />
      </main>

      {/* 11. Sticky Mobile Bar */}
      <MobileActionBar />
    </div>
  );
}
