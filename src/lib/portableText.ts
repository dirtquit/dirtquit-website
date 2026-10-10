import type { TableOfContentItem } from "@/data/blogTypes";

/**
 * Minimal Portable Text types for the article body stored in Sanity.
 * Only the block types defined in src/sanity/schemaTypes are modelled.
 */

export interface PtSpan {
  _type: "span";
  _key?: string;
  text: string;
  marks?: string[];
}

export interface PtMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PtTextBlock {
  _type: "block";
  _key: string;
  style?: "normal" | "h2" | "h3" | "blockquote" | string;
  listItem?: "bullet" | "number" | string;
  level?: number;
  children: PtSpan[];
  markDefs?: PtMarkDef[];
}

export interface PtCallout {
  _type: "callout";
  _key: string;
  tone?: "tip" | "warning" | "expert";
  title: string;
  text: string;
}

export interface PtComparisonTable {
  _type: "comparisonTable";
  _key: string;
  headers: string[];
  rows?: Array<{ _key: string; cells?: string[] }>;
}

export interface PtServiceLink {
  _type: "serviceLink";
  _key: string;
  badge?: string;
  anchor: string;
  href: string;
}

export interface PtImage {
  _type: "image";
  _key: string;
  url?: string;
  alt?: string;
  caption?: string;
}

export type PtBlock = PtTextBlock | PtCallout | PtComparisonTable | PtServiceLink | PtImage;

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function blockPlainText(block: PtTextBlock): string {
  return (block.children || []).map((c) => c.text).join("");
}

/** Stable, unique anchor id for each H2/H3 block, keyed by block _key. */
export function headingIds(body: PtBlock[]): Map<string, string> {
  const ids = new Map<string, string>();
  const used = new Set<string>();
  for (const block of body) {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const base = slugifyHeading(blockPlainText(block)) || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    ids.set(block._key, id);
  }
  return ids;
}

export function tocFromBody(body: PtBlock[]): TableOfContentItem[] {
  const ids = headingIds(body);
  const items: TableOfContentItem[] = [];
  for (const block of body) {
    if (block._type !== "block") continue;
    const id = ids.get(block._key);
    if (!id) continue;
    items.push({ id, title: blockPlainText(block), level: block.style === "h3" ? 3 : 2 });
  }
  return items;
}

/** ~200 words per minute, minimum 1. */
export function readingTimeFromBody(body: PtBlock[]): number {
  let words = 0;
  for (const block of body) {
    let text = "";
    if (block._type === "block") text = blockPlainText(block);
    else if (block._type === "callout") text = `${block.title} ${block.text}`;
    else if (block._type === "comparisonTable")
      text = (block.rows || []).flatMap((r) => r.cells || []).join(" ");
    words += text.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(1, Math.round(words / 200));
}
