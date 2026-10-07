import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/site/shared";

interface ShareBarProps {
  title: string;
  url: string;
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title}\n${url}`,
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground my-6 py-4 border-y border-border/70">
      <span className="flex items-center gap-1.5 font-bold text-navy mr-1">
        <Share2 className="size-3.5 text-primary" />
        <span>Share:</span>
      </span>

      <a
        href={whatsappShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1 font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon className="size-3.5 fill-[#25D366]" />
        <span>WhatsApp</span>
      </a>

      <a
        href={twitterShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 font-semibold text-sky-600 hover:bg-sky-500/20 transition-colors"
        aria-label="Share on X"
      >
        <span>X (Twitter)</span>
      </a>

      <a
        href={linkedInShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/10 px-3 py-1 font-semibold text-blue-700 hover:bg-blue-600/20 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <span>LinkedIn</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-semibold text-foreground hover:bg-muted/80 transition-colors ml-auto"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check className="size-3 text-emerald-600" />
            <span className="text-emerald-600 font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="size-3 text-muted-foreground" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
