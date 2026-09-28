import { ArrowRight, Calendar, CheckCheck, MessageSquare, Sparkles } from "lucide-react";
import { BookButton, Container, SectionHeading, WhatsAppButton } from "./shared";

const STEPS = [
  {
    step: "01",
    tag: "MESSAGE",
    title: "Tell Us What You Need",
    description:
      "Choose a service on this page or message us on WhatsApp with photos or property details.",
    icon: MessageSquare,
  },
  {
    step: "02",
    tag: "BOOK",
    title: "Choose Your Time",
    description: "Tell us your preferred date and time slot across Bengaluru. We confirm promptly.",
    icon: Calendar,
  },
  {
    step: "03",
    tag: "CLEAN",
    title: "We Clean. You Relax.",
    description:
      "Our equipped team arrives, follows a meticulous checklist, and hands over a refreshed space.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="section-pad bg-background">
      <Container>
        <SectionHeading
          eyebrow="Simple & Transparent"
          title="A Cleaner Space in 3 Simple Steps."
          subtitle="No complicated booking procedures or endless follow-ups. Just clear communication and thorough cleaning."
        />

        {/* Visual Flow Indicator */}
        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 text-xs font-extrabold uppercase tracking-widest text-primary">
          <span className="rounded-full bg-secondary px-3 py-1">MESSAGE</span>
          <ArrowRight className="size-4 text-muted-foreground" />
          <span className="rounded-full bg-secondary px-3 py-1">BOOK</span>
          <ArrowRight className="size-4 text-muted-foreground" />
          <span className="rounded-full bg-navy text-white px-3 py-1">CLEAN</span>
        </div>

        {/* 3 Step Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, idx) => (
            <div
              key={s.step}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl font-black text-navy/20">
                    STEP {s.step}
                  </span>
                  <div className="grid size-12 place-items-center rounded-2xl bg-brand-tint text-primary">
                    <s.icon className="size-6" />
                  </div>
                </div>

                <div className="mt-6 inline-block rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                  {s.tag}
                </div>

                <h3 className="mt-2 text-xl font-extrabold text-navy">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-primary pt-4 border-t border-border/60">
                <CheckCheck className="size-4" />
                <span>Zero hassle experience</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Prompts */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3.5">
          <BookButton source="how_it_works" size="lg" label="Book a Cleaning Now" />
          <WhatsAppButton
            source="how_it_works"
            size="lg"
            variant="whatsapp-outline"
            label="WhatsApp Us"
          />
        </div>
      </Container>
    </section>
  );
}
