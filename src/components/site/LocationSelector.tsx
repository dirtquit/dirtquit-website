import { useState, useRef, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { MapPin, ChevronDown, Check, X } from "lucide-react";
import { useCity } from "@/lib/useCity";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  className?: string;
  tone?: "dark" | "light";
}

export function LocationSelector({ className, tone = "dark" }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { city, allCities, selectCity } = useCity();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Calculate target URL for each city based on current page
  const getCityTargetUrl = (targetCitySlug: string) => {
    const pathname = location.pathname;
    // Check if on a category page: /{city}/{category}/
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      const categorySlug = parts[1];
      return `/${targetCitySlug}/${categorySlug}/`;
    }
    // On city hub or other page
    return `/${targetCitySlug}/`;
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={`Select city. Currently selected: ${city.name}`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          tone === "dark"
            ? "text-white/90 hover:text-white bg-white/10 hover:bg-white/15"
            : "text-foreground hover:text-primary bg-secondary/80 hover:bg-secondary border border-border/60",
        )}
      >
        <MapPin className="size-3 text-primary shrink-0" />
        <span>
          {city.name}, {city.state}
        </span>
        <ChevronDown
          className={cn("size-3 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose Service Location"
          className="absolute left-0 mt-2 z-50 w-72 origin-top-left rounded-2xl border border-border bg-card p-3 shadow-lift animate-in fade-in zoom-in-95"
        >
          <div className="flex items-center justify-between pb-2 border-b border-border/80 px-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
              Select Service Location
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close location selector"
              className="text-muted-foreground hover:text-foreground rounded p-0.5"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="mt-2 space-y-1">
            {allCities.map((c) => {
              const isSelected = c.slug === city.slug;
              const targetUrl = getCityTargetUrl(c.slug);

              if (!c.isLive) {
                return (
                  <div
                    key={c.slug}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-xs opacity-50 bg-secondary/30 cursor-not-allowed"
                  >
                    <div>
                      <div className="font-semibold text-foreground">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground">{c.state}</div>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                );
              }

              return (
                <a
                  key={c.slug}
                  href={targetUrl}
                  onClick={() => {
                    selectCity(c.slug);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-foreground hover:bg-secondary/80 font-medium",
                  )}
                >
                  <div>
                    <div className="text-sm font-bold text-navy">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {c.state} · 32 localities served
                    </div>
                  </div>
                  {isSelected && <Check className="size-4 text-primary shrink-0" />}
                </a>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-border/60 text-center">
            <a
              href="/service-locations/"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              View all service locations →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
