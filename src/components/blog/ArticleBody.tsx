import { AlertTriangle, ArrowRight, Check, HelpCircle, Info } from "lucide-react";
import type { ContentSection } from "@/data/blogTypes";

interface ArticleBodyProps {
  sections: ContentSection[];
}

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <article className="prose prose-slate max-w-none space-y-12 text-foreground">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
          {/* Section Heading */}
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl border-b border-border/50 pb-3">
            {section.heading}
          </h2>

          {/* Subheading if present */}
          {section.subheading && (
            <h3 className="text-xl font-semibold text-foreground/90 mt-2">{section.subheading}</h3>
          )}

          {/* Paragraphs */}
          <div className="space-y-4 text-base leading-relaxed text-foreground/85 sm:text-[17px]">
            {section.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bullet Points */}
          {section.bulletPoints && section.bulletPoints.length > 0 && (
            <ul className="my-4 space-y-2.5 rounded-xl border border-border/70 bg-card p-5 text-sm sm:text-base">
              {section.bulletPoints.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-foreground/90">{bullet}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Callout Box */}
          {section.calloutBox && (
            <aside
              className="my-6 rounded-2xl border-l-4 border-l-primary bg-secondary/50 p-5 shadow-xs"
              role="note"
            >
              <div className="flex items-center gap-2 font-bold text-navy text-sm">
                {section.calloutBox.type === "warning" ? (
                  <AlertTriangle className="size-4.5 text-amber-600" />
                ) : section.calloutBox.type === "expert" ? (
                  <HelpCircle className="size-4.5 text-primary" />
                ) : (
                  <Info className="size-4.5 text-primary" />
                )}
                <span>{section.calloutBox.title}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                {section.calloutBox.text}
              </p>
            </aside>
          )}

          {/* Comparison Table */}
          {section.table && (
            <div className="my-8 overflow-hidden rounded-2xl border border-border shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy text-white font-bold">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3.5 sm:p-4 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-muted/40 transition-colors">
                        <td className="p-3.5 sm:p-4 font-bold text-navy">{row.parameter}</td>
                        <td className="p-3.5 sm:p-4 text-muted-foreground">{row.diyApproach}</td>
                        <td className="p-3.5 sm:p-4 font-semibold text-primary">
                          {row.dirtquitStandard}
                        </td>
                        <td className="p-3.5 sm:p-4 text-foreground/90">{row.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Internal Contextual Link */}
          {section.internalLink && (
            <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                {section.internalLink.badge && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    {section.internalLink.badge}
                  </span>
                )}
                <p className="text-sm font-bold text-navy mt-0.5">{section.internalLink.anchor}</p>
              </div>
              <a
                href={section.internalLink.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-brand-dark transition-colors shrink-0"
              >
                <span>View Service Details</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          )}
        </section>
      ))}
    </article>
  );
}
