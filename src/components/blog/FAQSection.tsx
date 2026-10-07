import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { BlogFaqItem } from "@/data/blogTypes";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  faqs: BlogFaqItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  if (!faqs || faqs.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="my-12 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8">
      <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-primary">
        <HelpCircle className="size-4.5 text-primary" />
        <span>Frequently Asked Questions</span>
      </div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Common Questions Answered
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Direct, expert answers based on real Bengaluru cleaning cases.
      </p>

      <div className="mt-6 divide-y divide-border/70 border-t border-border/70">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-4">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="flex w-full items-center justify-between gap-4 text-left font-bold text-navy text-base transition-colors hover:text-primary"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 text-muted-foreground transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180 text-primary",
                  )}
                />
              </button>
              {isOpen && (
                <div className="mt-3 text-sm leading-relaxed text-foreground/85 animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
