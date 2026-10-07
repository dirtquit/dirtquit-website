import { useEffect, useState } from "react";
import { ChevronDown, ListFilter } from "lucide-react";
import type { TableOfContentItem } from "@/data/blogTypes";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentItem[];
  variant?: "desktop-sticky" | "inline-mobile";
}

export function TableOfContents({ items, variant = "desktop-sticky" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const content = (
    <nav aria-label="Table of contents" className="text-sm">
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.pushState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={cn(
                  "block py-1.5 text-xs transition-colors leading-snug rounded-md px-2",
                  isActive
                    ? "font-bold text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  // If mobile inline collapsible
  if (variant === "inline-mobile") {
    return (
      <div className="my-6 rounded-2xl border border-border bg-card p-4 shadow-xs lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between font-bold text-navy text-sm"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <ListFilter className="size-4 text-primary" />
            Table of Contents
          </span>
          <ChevronDown
            className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && <div className="mt-3.5 border-t border-border/60 pt-3">{content}</div>}
      </div>
    );
  }

  // Sticky desktop sidebar
  return (
    <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-xs lg:block">
      <div className="flex items-center gap-2 pb-3 text-xs font-bold uppercase tracking-wider text-navy border-b border-border">
        <ListFilter className="size-4 text-primary" />
        <span>On This Page</span>
      </div>
      <div className="pt-3">{content}</div>
    </aside>
  );
}
