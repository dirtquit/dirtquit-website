import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCityBySlug } from "@/data/cities";
import { CATEGORIES } from "@/data/categories";
import { getCategoryImages } from "@/data/categoryImages";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BookingForm } from "@/components/site/BookingForm";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container, SectionHeading } from "@/components/site/shared";
import { MapPin, ChevronRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/$city/")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.city);
    if (!city || !city.isLive) {
      throw notFound();
    }
    return { city };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { city } = loaderData;
    const title = `Cleaning Services in ${city.name} (${city.altName}) | Dirt Quit`;
    const description = `Reliable home and commercial cleaning services across ${city.name}. Trained professionals for deep cleaning, kitchens, and sofas. Book your slot online today.`;
    const canonical = `https://www.dirtquit.info/${city.slug}/`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: CityHubRouteComponent,
});

function CityHubRouteComponent() {
  const { city } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground pb-16 lg:pb-0">
      <Header />
      <div className="border-b border-border/40 bg-secondary/20">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: city.name }]} />
        </Container>
      </div>

      <main>
        {/* City Hero */}
        <section className="section-pad bg-gradient-to-b from-background via-secondary/20 to-background">
          <Container>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                <MapPin className="size-3.5" />
                <span>
                  {city.name} ({city.altName}), {city.state}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Professional Cleaning Services in <span className="text-primary">{city.name}</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Complete residential and commercial cleaning solutions across {city.name}. From full
                house deep cleans to sofa shampooing and office maintenance, we bring verified
                professionals, modern machines, and upfront pricing to every neighborhood.
              </p>
            </div>
          </Container>
        </section>

        {/* 17 Categories Grid */}
        <section className="section-pad bg-background border-t border-border/60">
          <Container>
            <SectionHeading
              eyebrow="Our Services"
              title={`Cleaning Services Available in ${city.name}`}
              subtitle="Select any service below to view detailed scope, inclusions, and locality availability."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const img = getCategoryImages(cat.slug);
                return (
                  <div
                    key={cat.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-soft transition-all hover:border-primary/50 hover:shadow-lift"
                  >
                    <div>
                      {img && (
                        <a
                          href={`/${city.slug}/${cat.slug}/`}
                          className="block relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-secondary/50 mb-4 border border-border/50"
                        >
                          <img
                            src={img.hero.src}
                            alt={img.hero.alt}
                            width={480}
                            height={300}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </a>
                      )}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        {cat.group.toUpperCase()}
                      </span>
                      <h3 className="mt-2 text-xl font-bold text-navy group-hover:text-primary transition-colors">
                        <a href={`/${city.slug}/${cat.slug}/`}>{cat.name}</a>
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {cat.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                      <a
                        href={`/${city.slug}/${cat.slug}/`}
                        className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        View Details & Pricing <ChevronRight className="size-3.5" />
                      </a>
                      <a
                        href="#book"
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

        {/* Localities Section */}
        <section className="section-pad bg-secondary/30 border-t border-border/60">
          <Container>
            <SectionHeading
              eyebrow="Coverage"
              title={`All 32 Service Localities in ${city.name}`}
              subtitle="We dispatch verified cleaning crews across every major residential and commercial zone."
            />
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {city.localities.map((loc: string) => (
                <div
                  key={loc}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 text-xs font-bold text-navy"
                >
                  <MapPin className="size-3 text-primary shrink-0" />
                  <span className="truncate">{loc}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Booking Form */}
        <BookingForm initialCity={city.name} pagePath={`/${city.slug}/`} />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}
