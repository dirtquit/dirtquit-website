import { MoveHorizontal, Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import bathAfter from "@/assets/bath-after.jpg";
import bathBefore from "@/assets/bath-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpg";
import kitchenBefore from "@/assets/kitchen-before.jpg";
import sofaAfter from "@/assets/sofa-after.jpg";
import sofaBefore from "@/assets/sofa-before.jpg";
import { cn } from "@/lib/utils";
import { BookButton, Container, SectionHeading, WhatsAppButton } from "./shared";

const PAIRS = [
  {
    id: "kitchen",
    label: "Kitchen",
    before: kitchenBefore,
    after: kitchenAfter,
    alt: "Deep kitchen cleaning service in Bengaluru",
    tagline: "Removal of burnt oil, greasy tiles, exhaust grime, and stained countertops.",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    before: bathBefore,
    after: bathAfter,
    alt: "Professional bathroom cleaning service in Bengaluru",
    tagline: "Hard water scaling descaling, sanitary polishing, and floor tile grout restoration.",
  },
  {
    id: "sofa",
    label: "Sofa & Upholstery",
    before: sofaBefore,
    after: sofaAfter,
    alt: "Sofa cleaning service in Bengaluru",
    tagline: "Deep fabric shampooing, spill extraction, allergen removal, and refreshed finish.",
  },
  {
    id: "floor",
    label: "Floor & Tiles",
    before: bathBefore, // reliable high-res asset
    after: bathAfter,
    alt: "Floor scrubbing and tile polishing in Bengaluru",
    tagline: "Machine scrubbing, grout line rejuvenation, and scratch-safe vitrified tile buffing.",
  },
  {
    id: "balcony",
    label: "Balcony & Outdoor",
    before: kitchenBefore, // reliable high-res asset
    after: kitchenAfter,
    alt: "Balcony and outdoor patio cleaning in Bengaluru",
    tagline: "Dust, weather stains, floor washdown, and exterior glass cleaning.",
  },
];

function Slider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const newPos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(newPos);
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] sm:aspect-[16/9] w-full touch-pan-y select-none overflow-hidden rounded-3xl border border-white/60 bg-navy shadow-lift"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After image (Base layer) */}
      <img
        src={after}
        alt={`${alt} - after`}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />

      {/* Before image (Clipped overlay) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${alt} - before`}
          loading="lazy"
          className="absolute inset-0 h-full max-w-none object-cover"
          style={{ width: ref.current?.clientWidth ?? "100%" }}
        />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-full bg-navy/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm border border-white/10">
        BEFORE
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-primary/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm border border-white/20">
        AFTER
      </span>

      {/* Slider handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift border border-border cursor-ew-resize hover:scale-105 transition-transform">
          <MoveHorizontal className="size-5 text-primary" />
        </div>
      </div>

      {/* Accessibility input */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Before and after comparison slider"
        onChange={(e) => setPos(Number(e.target.value))}
        className="sr-only"
      />
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState(PAIRS[0]!.id);
  const pair = PAIRS.find((p) => p.id === active) ?? PAIRS[0]!;

  return (
    <section className="section-pad bg-gradient-to-b from-secondary/40 via-secondary/20 to-background border-y border-border/60">
      <Container>
        <SectionHeading
          eyebrow="Real Transformations"
          title="See the Difference."
          subtitle="Some cleaning jobs need more than a quick wipe. See what a professional clean can change."
        />

        {/* 5 Selector Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {PAIRS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm",
                active === p.id
                  ? "border-navy bg-navy text-white shadow-soft"
                  : "border-border bg-card text-foreground/75 hover:border-primary/50 hover:text-primary",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Slider Showcase */}
        <div className="mx-auto mt-8 max-w-4xl">
          <Slider before={pair.before} after={pair.after} alt={pair.alt} />

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left px-2">
            <p className="text-sm font-medium text-navy">
              <span className="font-extrabold text-primary mr-2">Focus:</span>
              {pair.tagline}
            </p>
            <p className="text-xs text-muted-foreground shrink-0 font-medium">
              Drag the center slider to compare before & after
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <BookButton source="before_after" size="md" label="Book a Clean Like This" />
            <WhatsAppButton
              source="before_after"
              size="md"
              variant="outline"
              label="Ask on WhatsApp"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
