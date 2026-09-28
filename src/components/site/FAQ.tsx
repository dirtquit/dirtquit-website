import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/dirtquit";
import { Container, SectionHeading, WhatsAppButton } from "./shared";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section id="faqs" className="section-pad bg-background">
      <Container>
        <SectionHeading
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about Dirt Quit services, bookings, and operations in Bengaluru."
        />

        {/* Search FAQ */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search answers (e.g. apartment, sofa, bathroom, booking)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 shadow-xs focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card p-4 sm:p-8 shadow-soft">
          {filtered.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left font-display text-base sm:text-lg font-bold text-navy hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="size-4 text-primary shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-primary",
                    )}
                  />
                </button>
                {isOpen ? (
                  <div className="mt-3 pl-6.5 text-sm sm:text-base leading-relaxed text-muted-foreground animate-in fade-in duration-200">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}

          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No matching questions found.{" "}
              <a href="#book" className="font-bold text-primary hover:underline">
                Contact our team directly
              </a>{" "}
              or message us on WhatsApp!
            </div>
          ) : null}
        </div>

        {/* Still Have Questions Box */}
        <div className="mx-auto mt-10 flex max-w-xl flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/50 p-6 text-center sm:text-left">
          <div>
            <div className="font-bold text-navy text-sm">Still have a question?</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Ask our team on WhatsApp and get a prompt response.
            </div>
          </div>
          <WhatsAppButton
            source="faq_footer"
            variant="whatsapp"
            size="sm"
            label="💬 Chat on WhatsApp"
            message="Hi Dirt Quit, I have a question about your cleaning services in Bengaluru."
          />
        </div>
      </Container>
    </section>
  );
}
