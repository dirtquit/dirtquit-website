import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useCity } from "@/lib/useCity";
import { cn } from "@/lib/utils";

interface ServicesMegaMenuProps {
  className?: string;
  onSelect?: () => void;
  isMobile?: boolean;
}

const GROUPS = [
  { id: "residential", label: "Homes & Apartments" },
  { id: "specialist", label: "Deep & Specialist" },
  { id: "commercial", label: "Offices & Commercial" },
] as const;

export function ServicesMegaMenu({ className, onSelect, isMobile = false }: ServicesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { city } = useCity();

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (isMobile) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  // Mobile rendering (collapsible accordion)
  if (isMobile) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
        >
          <span>Services</span>
          <ChevronDown
            className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        {isOpen && (
          <div className="mt-2 pl-3 space-y-4 border-l-2 border-primary/30 py-2">
            {GROUPS.map((g) => {
              const groupCats = CATEGORIES.filter((c) => c.group === g.id);
              return (
                <div key={g.id}>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    {g.label}
                  </div>
                  <div className="mt-1 space-y-1">
                    {groupCats.map((cat) => (
                      <a
                        key={cat.slug}
                        href={`/${city.slug}/${cat.slug}/`}
                        onClick={onSelect}
                        className="block rounded-md px-2 py-1.5 text-sm font-medium text-foreground/85 hover:bg-secondary hover:text-primary"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t border-border">
              <a
                href="/#services"
                onClick={onSelect}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                Browse all on homepage <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop rendering (hover / click mega-dropdown)
  return (
    <div
      ref={menuRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 py-1 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors cursor-pointer"
      >
        <span>Services</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 w-[720px] rounded-3xl border border-border bg-card p-6 shadow-lift animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs font-extrabold uppercase tracking-wider text-navy">
              All 17 Cleaning Services in {city.name}
            </span>
            <a
              href="/#services"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              Browse all on homepage <ArrowRight className="size-3" />
            </a>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-6">
            {GROUPS.map((g) => {
              const groupCats = CATEGORIES.filter((c) => c.group === g.id);
              return (
                <div key={g.id}>
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-primary border-b border-border/60 pb-1.5 mb-2.5">
                    {g.label}
                  </h4>
                  <ul className="space-y-1">
                    {groupCats.map((cat) => (
                      <li key={cat.slug}>
                        <a
                          href={`/${city.slug}/${cat.slug}/`}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
