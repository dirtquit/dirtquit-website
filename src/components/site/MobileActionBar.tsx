import { Phone, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/shared";
import { telLink, track, whatsappLink } from "@/lib/dirtquit";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between border-t border-border bg-card/95 px-3 py-2.5 backdrop-blur-lg lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-safe"
    >
      {/* Call button */}
      <a
        href={telLink()}
        onClick={() => track("phone_click", { source: "mobile_action_bar" })}
        className="flex flex-1 flex-col items-center justify-center py-1 text-center text-navy active:opacity-75"
        aria-label="Call Dirt Quit"
      >
        <Phone className="size-4 text-primary" />
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">Call</span>
      </a>

      <div className="h-7 w-px bg-border shrink-0" />

      {/* WhatsApp button */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { source: "mobile_action_bar" })}
        className="flex flex-1 flex-col items-center justify-center py-1 text-center text-[#25D366] active:opacity-75"
        aria-label="WhatsApp Dirt Quit"
      >
        <WhatsAppIcon className="size-4 fill-[#25D366]" />
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>

      {/* Primary BOOK NOW button - strongest visual action */}
      <a
        href="#book"
        onClick={() => track("book_cleaning_click", { source: "mobile_action_bar" })}
        className="flex flex-[1.6] items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-soft transition-transform active:scale-95 ml-2"
      >
        <Sparkles className="size-3.5 fill-white" />
        <span>BOOK NOW</span>
      </a>
    </nav>
  );
}
