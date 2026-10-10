import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, Check, HelpCircle, Info } from "lucide-react";
import {
  headingIds,
  type PtBlock,
  type PtCallout,
  type PtComparisonTable,
  type PtServiceLink,
  type PtTextBlock,
} from "@/lib/portableText";

interface PortableTextBodyProps {
  body: PtBlock[];
}

/**
 * Renders the Sanity article body. Styling mirrors ArticleBody so posts
 * written in the CMS look identical to the original hand-coded guides.
 */
export function PortableTextBody({ body }: PortableTextBodyProps) {
  const ids = headingIds(body);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < body.length; i++) {
    const block = body[i]!;

    if (block._type === "block" && block.listItem) {
      const listType = block.listItem;
      const items: PtTextBlock[] = [];
      while (i < body.length) {
        const next = body[i]!;
        if (next._type !== "block" || next.listItem !== listType) break;
        items.push(next);
        i++;
      }
      i--;
      nodes.push(<List key={block._key} type={listType} items={items} />);
      continue;
    }

    switch (block._type) {
      case "block":
        nodes.push(<TextBlock key={block._key} block={block} id={ids.get(block._key)} />);
        break;
      case "callout":
        nodes.push(<Callout key={block._key} block={block} />);
        break;
      case "comparisonTable":
        nodes.push(<ComparisonTable key={block._key} block={block} />);
        break;
      case "serviceLink":
        nodes.push(<ServiceLink key={block._key} block={block} />);
        break;
      case "image":
        if (block.url) {
          nodes.push(
            <figure key={block._key} className="my-8">
              <img
                src={`${block.url}?w=1200&auto=format`}
                alt={block.alt || ""}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-border"
              />
              {block.caption && (
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  {block.caption}
                </figcaption>
              )}
            </figure>,
          );
        }
        break;
    }
  }

  return (
    <article className="prose prose-slate max-w-none space-y-4 text-base leading-relaxed text-foreground/85 sm:text-[17px]">
      {nodes}
    </article>
  );
}

function Spans({ block }: { block: PtTextBlock }) {
  const linkDefs = new Map((block.markDefs || []).map((d) => [d._key, d]));
  return (
    <>
      {(block.children || []).map((span, idx) => {
        let node: ReactNode = span.text;
        for (const mark of span.marks || []) {
          if (mark === "strong") node = <strong className="font-semibold text-navy">{node}</strong>;
          else if (mark === "em") node = <em>{node}</em>;
          else {
            const def = linkDefs.get(mark);
            if (def?.href) {
              const external = /^https?:\/\//.test(def.href);
              node = (
                <a
                  href={def.href}
                  className="font-semibold text-primary underline underline-offset-2 hover:text-brand-dark"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {node}
                </a>
              );
            }
          }
        }
        return <span key={span._key || idx}>{node}</span>;
      })}
    </>
  );
}

function TextBlock({ block, id }: { block: PtTextBlock; id: string | undefined }) {
  switch (block.style) {
    case "h2":
      return (
        <h2
          id={id}
          className="scroll-mt-24 !mt-12 border-b border-border/50 pb-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl"
        >
          <Spans block={block} />
        </h2>
      );
    case "h3":
      return (
        <h3 id={id} className="scroll-mt-24 !mt-8 text-xl font-semibold text-foreground/90">
          <Spans block={block} />
        </h3>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-l-primary/60 pl-4 italic text-foreground/80">
          <Spans block={block} />
        </blockquote>
      );
    default:
      return (
        <p>
          <Spans block={block} />
        </p>
      );
  }
}

function List({ type, items }: { type: string; items: PtTextBlock[] }) {
  if (type === "number") {
    return (
      <ol className="my-4 list-decimal space-y-2 pl-6">
        {items.map((item) => (
          <li key={item._key}>
            <Spans block={item} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="my-4 space-y-2.5 rounded-xl border border-border/70 bg-card p-5 text-sm sm:text-base">
      {items.map((item) => (
        <li key={item._key} className="flex items-start gap-2.5">
          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="size-3.5" />
          </span>
          <span className="text-foreground/90">
            <Spans block={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ block }: { block: PtCallout }) {
  return (
    <aside
      className="my-6 rounded-2xl border-l-4 border-l-primary bg-secondary/50 p-5 shadow-xs"
      role="note"
    >
      <div className="flex items-center gap-2 text-sm font-bold text-navy">
        {block.tone === "warning" ? (
          <AlertTriangle className="size-4.5 text-amber-600" />
        ) : block.tone === "expert" ? (
          <HelpCircle className="size-4.5 text-primary" />
        ) : (
          <Info className="size-4.5 text-primary" />
        )}
        <span>{block.title}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">{block.text}</p>
    </aside>
  );
}

function ComparisonTable({ block }: { block: PtComparisonTable }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-border shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-navy font-bold text-white">
            <tr>
              {block.headers.map((h, idx) => (
                <th key={idx} className="whitespace-nowrap p-3.5 sm:p-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {(block.rows || []).map((row) => (
              <tr key={row._key} className="transition-colors hover:bg-muted/40">
                {(row.cells || []).map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={
                      cIdx === 0
                        ? "p-3.5 font-bold text-navy sm:p-4"
                        : cIdx === 2
                          ? "p-3.5 font-semibold text-primary sm:p-4"
                          : "p-3.5 text-foreground/90 sm:p-4"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServiceLink({ block }: { block: PtServiceLink }) {
  return (
    <div className="my-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:p-5">
      <div>
        {block.badge && (
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
            {block.badge}
          </span>
        )}
        <p className="mt-0.5 text-sm font-bold text-navy">{block.anchor}</p>
      </div>
      <a
        href={block.href}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs transition-colors hover:bg-brand-dark"
      >
        <span>View Service Details</span>
        <ArrowRight className="size-3.5" />
      </a>
    </div>
  );
}
