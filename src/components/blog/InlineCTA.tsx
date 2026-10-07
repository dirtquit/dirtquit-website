import { Phone, ShieldCheck, Sparkles } from "lucide-react";
import { PHONE_DISPLAY, telLink, whatsappLink, track } from "@/lib/dirtquit";
import { WhatsAppIcon } from "@/components/site/shared";

interface InlineCTAProps {
  heading?: string;
  description?: string;
  serviceHref?: string;
}

export function InlineCTA({
  heading = "Transform Your Bengaluru Home Today",
  description = "Trained crews, hospital-grade biocides, and zero acidic chemicals. Get an instant quote on WhatsApp in 60 seconds.",
  serviceHref = "/bengaluru/deep-cleaning/",
}: InlineCTAProps) {
  return (
    <div className="my-12 overflow-hidden rounded-3xl bg-linear-to-br from-navy via-[#0d3459] to-navy p-7 text-white shadow-lift sm:p-10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-300">
          <Sparkles className="size-3.5" />
          <span>Professional Cleaning In Bengaluru</span>
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
          {heading}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">{description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { source: "blog_inline_cta" })}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-[#20bd5a] transition-all hover:scale-105"
          >
            <WhatsAppIcon className="size-4.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={telLink()}
            onClick={() => track("phone_click", { source: "blog_inline_cta" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition-colors"
          >
            <Phone className="size-4 text-sky-300" />
            <span>Call {PHONE_DISPLAY}</span>
          </a>

          {serviceHref && (
            <a
              href={serviceHref}
              className="text-xs font-bold text-sky-200 underline underline-offset-4 hover:text-white transition-colors py-2 px-1"
            >
              Learn about this service →
            </a>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span>100% Satisfaction Guarantee · Transparent Pricing · Zero Acidic Treatments</span>
        </div>
      </div>
    </div>
  );
}
