import { Phone } from "lucide-react";
import { PHONE_DISPLAY, telLink, track } from "@/lib/dirtquit";
import { CATEGORIES } from "@/data/categories";
import { useCity } from "@/lib/useCity";
import { Container, WhatsAppButton } from "./shared";
import { Logo } from "./Logo";
import { LocationSelector } from "./LocationSelector";

const QUICK_LINKS = [
  { label: "Home", href: "/#top" },
  { label: "Why Dirt Quit", href: "/#why" },
  { label: "How It Works", href: "/#how" },
  { label: "Areas We Serve", href: "/service-locations/" },
  { label: "Cleaning Guides & Blog", href: "/blog/" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Book a Cleaning", href: "/#book" },
];

export function Footer() {
  const { city } = useCity();

  return (
    <footer className="border-t border-border bg-card text-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <a href="/#top" className="inline-block group py-1" aria-label="Dirt Quit home">
              <Logo className="h-12 sm:h-14 transition-transform group-hover:scale-[1.02]" />
            </a>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Professional cleaning services for homes, apartments, offices and commercial spaces
              across Bengaluru.
            </p>

            <div className="mt-6 flex flex-col gap-3 text-xs sm:text-sm font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <LocationSelector tone="light" />
              </div>
              <a
                href={telLink()}
                onClick={() => track("phone_click", { source: "footer" })}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="size-4 text-primary shrink-0" />
                <span>Phone: {PHONE_DISPLAY}</span>
              </a>
              <div className="pt-2">
                <WhatsAppButton
                  source="footer"
                  size="sm"
                  variant="whatsapp"
                  label="Chat on WhatsApp"
                  className="font-bold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm font-medium text-muted-foreground">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-primary transition-colors inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* All 17 Cleaning Services in Bengaluru */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
              Cleaning Services in {city.name} ({CATEGORIES.length})
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm font-medium text-muted-foreground">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/${city.slug}/${cat.slug}/`}
                    className="text-left hover:text-primary transition-colors block truncate"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Dirt Quit. Cleaner Spaces. Brighter Lives. All rights
            reserved.
          </p>
          <p className="text-center sm:text-right">
            Professional Residential, Deep Cleaning, & Commercial Cleaning Services in Bengaluru.
          </p>
        </div>
      </Container>
    </footer>
  );
}
