import { MapPin, MessageCircle, Phone } from "lucide-react";
import { PHONE_DISPLAY, selectBookingService, telLink, track } from "@/lib/dirtquit";
import { Container, WhatsAppButton } from "./shared";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Why Dirt Quit", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Areas We Serve", href: "#areas" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#book" },
];

const POPULAR_SERVICES = [
  "Home Cleaning",
  "Deep Cleaning",
  "Kitchen Cleaning",
  "Bathroom Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Mattress Cleaning",
  "Floor Cleaning",
  "Window Cleaning",
  "Office Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Commercial Cleaning",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <a href="#top" className="inline-block group py-1" aria-label="Dirt Quit home">
              <Logo className="h-12 sm:h-14 transition-transform group-hover:scale-[1.02]" />
            </a>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Professional cleaning services for homes, apartments, offices and commercial spaces
              across Bengaluru.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary shrink-0" />
                <span>Bengaluru, Karnataka</span>
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

          {/* Popular Services */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy">
              Popular Services in Bengaluru
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm font-medium text-muted-foreground">
              {POPULAR_SERVICES.map((srv) => (
                <li key={srv}>
                  <button
                    type="button"
                    onClick={() => selectBookingService(srv)}
                    className="text-left hover:text-primary transition-colors"
                  >
                    {srv}
                  </button>
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
