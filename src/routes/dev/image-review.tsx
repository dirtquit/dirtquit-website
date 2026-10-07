import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/categories";
import { CATEGORY_IMAGES, customCleaningCard } from "@/data/categoryImages";
import { Container } from "@/components/site/shared";

export const Route = createFileRoute("/dev/image-review")({
  head: () => ({
    meta: [
      { title: "Image Review Contact Sheet | Internal Dev Tool" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ImageReviewPage,
});

function ImageReviewPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-7xl">
        <header className="mb-10 pb-6 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold mb-3 border border-amber-500/20">
            INTERNAL DEV ONLY · NOINDEX
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Category Image Review Contact Sheet
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-3xl">
            Visual inspection grid for all 17 cleaning categories plus the 18th custom card. Every
            slot is self-hosted with zero external Unsplash calls, native aspect ratios preserved
            without artificial upscaling, and strict descriptive alt tags.
          </p>
        </header>

        {/* 18th Card Preview */}
        <section className="mb-14 p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-amber-300">
              18th Homepage Card: Custom Cleaning
            </h2>
            <span className="text-xs font-mono bg-slate-700 px-2.5 py-1 rounded-md text-slate-300">
              custom-cleaning-bengaluru-card.webp
            </span>
          </div>
          <div className="max-w-md">
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
              <img
                src={customCleaningCard}
                alt="Custom space and specialty cleaning in Bengaluru"
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Slot: Homepage 18th Card · Aspect: 16:10 · Alt: "Custom space and specialty cleaning
              in Bengaluru"
            </p>
          </div>
        </section>

        {/* 17 Categories Grid */}
        <div className="space-y-16">
          {CATEGORIES.map((cat, idx) => {
            const imgSet = CATEGORY_IMAGES[cat.slug];
            if (!imgSet) return null;

            return (
              <article
                key={cat.slug}
                id={cat.slug}
                className="p-6 sm:p-8 rounded-3xl bg-slate-800/40 border border-slate-700/80 shadow-xl"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-6 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs font-mono font-bold text-white">
                      {idx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700/80 text-slate-300">
                      /{cat.slug}/
                    </span>
                  </div>
                  <a
                    href={`/bangalore/${cat.slug}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View Live Page ↗
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Hero Slot */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 border border-slate-700/60 p-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-emerald-400 uppercase">1. Hero Slot</span>
                      <span className="text-slate-400">
                        {imgSet.hero.width}×{imgSet.hero.height}
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-black aspect-[4/3] relative">
                      <img
                        src={imgSet.hero.src}
                        alt={imgSet.hero.alt}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-[11px] text-slate-300 leading-snug">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">
                        Alt Text:
                      </strong>
                      "{imgSet.hero.alt}"
                    </div>
                  </div>

                  {/* Detail Slot */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 border border-slate-700/60 p-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-sky-400 uppercase">2. Detail Slot</span>
                      <span className="text-slate-400">
                        {imgSet.detail.width}×{imgSet.detail.height}
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-black aspect-[4/3] relative">
                      <img
                        src={imgSet.detail.src}
                        alt={imgSet.detail.alt}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-[11px] text-slate-300 leading-snug">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">
                        Alt Text:
                      </strong>
                      "{imgSet.detail.alt}"
                    </div>
                  </div>

                  {/* Context Slot */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 border border-slate-700/60 p-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-purple-400 uppercase">3. Context Slot</span>
                      <span className="text-slate-400">
                        {imgSet.context.width}×{imgSet.context.height}
                      </span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-black aspect-[4/3] relative">
                      <img
                        src={imgSet.context.src}
                        alt={imgSet.context.alt}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-[11px] text-slate-300 leading-snug">
                      <strong className="text-slate-400 block text-[10px] uppercase font-mono">
                        Alt Text:
                      </strong>
                      "{imgSet.context.alt}"
                    </div>
                  </div>

                  {/* OG / Social Share Slot */}
                  <div className="flex flex-col rounded-2xl bg-slate-900/80 border border-slate-700/60 p-4">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="font-bold text-amber-400 uppercase">4. OG Social Slot</span>
                      <span className="text-slate-400">1200×630</span>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-black aspect-[1.91/1] relative">
                      <img
                        src={imgSet.og.src}
                        alt={`${cat.name} Social Share Preview`}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-500 block text-[10px] uppercase font-mono">
                        Role:
                      </strong>
                      OpenGraph & Twitter Card Preview
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
