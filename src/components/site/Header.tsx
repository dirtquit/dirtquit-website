import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PHONE_DISPLAY, telLink, track } from "@/lib/dirtquit";
import { useCity } from "@/lib/useCity";
import { BookButton, Container, WhatsAppButton } from "./shared";
import { Logo } from "./Logo";
import { LocationSelector } from "./LocationSelector";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

const NAV_ITEMS_AFTER_SERVICES = [
  { label: "Why Dirt Quit", href: "/#why" },
  { label: "How It Works", href: "/#how" },
  { label: "Areas", href: "/service-locations/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/#book" },
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { city } = useCity();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-200">
      {/* Top Utility Bar */}
      <div
        className={cn(
          "hidden border-b border-white/10 bg-navy text-white/85 transition-all duration-300 lg:block",
          stuck ? "h-0 overflow-hidden border-none opacity-0 py-0" : "h-9 opacity-100",
        )}
      >
        <Container className="flex h-full items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <LocationSelector tone="dark" />
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-2 text-white/65 text-[11px]">
              <a
                href={`/${city.slug}/home-cleaning/`}
                className="hover:text-white transition-colors"
              >
                Home
              </a>
              <span>·</span>
              <a
                href={`/${city.slug}/office-cleaning/`}
                className="hover:text-white transition-colors"
              >
                Office
              </a>
              <span>·</span>
              <a
                href={`/${city.slug}/office-cleaning/`}
                className="hover:text-white transition-colors"
              >
                Commercial
              </a>
              <span>·</span>
              <a
                href={`/${city.slug}/apartment-cleaning/`}
                className="hover:text-white transition-colors"
              >
                Villas
              </a>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <a
              href={telLink()}
              onClick={() => track("phone_click", { source: "top_utility_bar" })}
              className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <Phone className="size-3 text-primary" />
              <span>
                Call Us: <strong className="font-semibold text-white">{PHONE_DISPLAY}</strong>
              </span>
            </a>
            <span className="text-white/30">|</span>
            <WhatsAppButton
              source="top_utility_bar"
              size="sm"
              variant="ghost"
              label="Chat on WhatsApp"
              className="text-white/80 hover:text-white h-auto p-0 text-xs font-medium"
            />
          </div>
        </Container>
      </div>

      {/* Main Single Navbar */}
      <div
        className={cn(
          "border-b border-transparent bg-background/95 backdrop-blur-xl transition-all duration-300",
          stuck ? "border-border shadow-soft bg-background/98" : "border-border/40",
        )}
      >
        <Container className="flex h-18 sm:h-20 items-center justify-between">
          {/* Official DIRT QUIT Logo */}
          <a href="/#top" className="flex items-center group py-1" aria-label="Dirt Quit home">
            <Logo className="h-12 sm:h-14 transition-transform group-hover:scale-[1.02]" />
          </a>

          {/* Main Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 text-sm font-semibold text-foreground/80 lg:flex">
            <a href="/#top" className="transition-colors hover:text-primary py-1">
              Home
            </a>

            {/* Mega Menu for Services */}
            <ServicesMegaMenu />

            {NAV_ITEMS_AFTER_SERVICES.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="transition-colors hover:text-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <WhatsAppButton source="main_header" variant="whatsapp-outline" size="sm" />
            <BookButton source="main_header" size="md" />
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <WhatsAppButton
              source="mobile_header"
              label=""
              variant="whatsapp"
              size="sm"
              className="px-3 h-9"
              aria-label="WhatsApp Dirt Quit"
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-navy shadow-sm transition-colors hover:bg-secondary"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown Menu */}
        {open ? (
          <div className="border-t border-border bg-card p-5 lg:hidden shadow-lift animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <div className="pb-3 border-b border-border text-xs text-muted-foreground flex items-center justify-between">
                <LocationSelector tone="light" />
                <span className="font-semibold text-navy">{PHONE_DISPLAY}</span>
              </div>

              <a
                href="/#top"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                Home
              </a>

              {/* Mobile Services Accordion */}
              <ServicesMegaMenu isMobile onSelect={() => setOpen(false)} />

              {NAV_ITEMS_AFTER_SERVICES.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  {n.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-border">
                <BookButton
                  source="mobile_menu"
                  size="lg"
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                />
                <WhatsAppButton
                  source="mobile_menu"
                  size="md"
                  variant="whatsapp-outline"
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
