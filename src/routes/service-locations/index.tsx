import { createFileRoute } from "@tanstack/react-router";
import { CITIES } from "@/data/cities";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container, SectionHeading } from "@/components/site/shared";
import { BookingForm } from "@/components/site/BookingForm";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { MapPin, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/service-locations/")({
  head: () => {
    const title = "Service Locations & Cities We Serve | Dirt Quit";
    const description =
      "Explore Dirt Quit cleaning service locations in Bengaluru. We cover 32 major neighborhoods with trained local cleaning teams. Check your area and book today.";
    const canonical = "https://www.dirtquit.info/service-locations/";

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
  component: ServiceLocationsRouteComponent,
});

function ServiceLocationsRouteComponent() {
  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground pb-16 lg:pb-0">
      <Header />
      <div className="border-b border-border/40 bg-secondary/20">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Service Locations" },
            ]}
          />
        </Container>
      </div>

      <main>
        <section className="section-pad bg-gradient-to-b from-background via-secondary/20 to-background">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Service Locations & <span className="text-primary">Cities We Serve</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Dirt Quit is actively expanding across major Indian metropolitan areas. Select your city
                below to see available residential and commercial cleaning services.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CITIES.map((city) => (
                <div
                  key={city.slug}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft transition-all hover:border-primary/50 hover:shadow-lift"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        <MapPin className="size-3" />
                        {city.state}
                      </span>
                      {city.isLive ? (
                        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                          Active & Live
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-navy">{city.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Also known as {city.altName} · {city.localities.length} localities served
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border">
                    {city.isLive ? (
                      <a
                        href={`/${city.slug}/`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark transition-all"
                      >
                        Explore {city.name} Services <ChevronRight className="size-4" />
                      </a>
                    ) : (
                      <span className="block text-center text-xs font-medium text-muted-foreground py-2">
                        Expansion Planned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <BookingForm pagePath="/service-locations/" />
      </main>

      <Footer />
      <MobileActionBar />
    </div>
  );
}
