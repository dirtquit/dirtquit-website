import { X } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/site/shared";
import { track, whatsappLink } from "@/lib/dirtquit";

export function FloatingWhatsApp() {
  const [closed, setClosed] = useState(false);

  return (
    <aside
      aria-label="Quick contact"
      className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-end gap-2.5"
    >
      {/* Optional Help Pill */}
      {!closed ? (
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card py-2.5 px-4 shadow-lift animate-in fade-in slide-in-from-bottom-2">
          <div className="size-2.5 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-xs font-bold text-navy">Quick quote? Chat with Dirt Quit</span>
          <button
            type="button"
            onClick={() => setClosed(true)}
            aria-label="Dismiss message"
            className="text-muted-foreground hover:text-navy ml-1.5 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : null}

      {/* Floating CTA Button */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "floating_button" })}
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] active:scale-95"
        aria-label="WhatsApp Dirt Quit"
      >
        <WhatsAppIcon className="size-5 fill-white transition-transform duration-300 group-hover:scale-110" />
        <span className="tracking-wide">WhatsApp Us</span>
      </a>
    </aside>
  );
}
