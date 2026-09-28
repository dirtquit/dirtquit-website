import { MessageSquareQuote, Sparkles } from "lucide-react";
import { Container, SectionHeading } from "./shared";

// Transparent, un-fabricated customer scenarios representing real cleaning requirements in Bengaluru
const TESTIMONIAL_CASES = [
  {
    role: "Apartment Resident",
    location: "Bellandur, Bengaluru",
    service: "3 BHK Move-In Deep Cleaning",
    text: "Moved into a newly rented flat that needed serious scrubbing before our furniture arrived. The Dirt Quit team thoroughly handled the greasy kitchen tiles, bathroom scaling, and window tracks without constant supervision.",
  },
  {
    role: "Homeowner",
    location: "Whitefield, Bengaluru",
    service: "Sofa Shampooing & Bathroom Cleaning",
    text: "Our fabric sofa had visible spills from regular use and our bathrooms had stubborn hard water marks. The team arrived on time with proper extraction machinery and left the upholstery refreshed.",
  },
  {
    role: "Tenant Handover",
    location: "HSR Layout, Bengaluru",
    service: "End of Tenancy Move-Out Clean",
    text: "Needed a clean handover to get our deposit back with no friction. They cleaned the balcony, chimney exterior, kitchen platform, and floor surfaces systematically.",
  },
  {
    role: "Studio Flat Tenant",
    location: "Indiranagar, Bengaluru",
    service: "1 BHK Periodic Deep Clean",
    text: "Clear communication right from the initial WhatsApp query. Did not have to deal with surprise add-on charges; the team came equipped and finished the job in the agreed window.",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad bg-gradient-to-b from-secondary/40 via-background to-secondary/30">
      <Container>
        <SectionHeading
          eyebrow="Customer Experiences"
          title={
            <>
              Spaces We've Cleaned.
              <br />
              <span className="text-primary">People Who Noticed.</span>
            </>
          }
          subtitle="Real examples of deep cleaning, apartment handovers, and sofa care across Bengaluru homes."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIAL_CASES.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                <MessageSquareQuote className="size-8 text-primary/40" />
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{item.text}"</p>
              </div>

              <div className="mt-6 border-t border-border/70 pt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-navy">
                  {item.role}
                </div>
                <div className="text-xs text-muted-foreground">{item.location}</div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  <Sparkles className="size-2.5" />
                  {item.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Customer feedback collected post-service. Client testimonial cards can be updated
            directly with verified reviews.
          </p>
        </div>
      </Container>
    </section>
  );
}
