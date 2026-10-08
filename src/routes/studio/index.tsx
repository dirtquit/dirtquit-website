import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ExternalLink, Lock } from "lucide-react";

const SANITY_STUDIO_AUTH_URL = "https://www.sanity.io/manage/project/ltxt6lsd";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Redirecting to Sanity Studio | Dirt Quit" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioRedirectComponent,
});

function StudioRedirectComponent() {
  useEffect(() => {
    // Instant redirect to Sanity official authenticated workspace
    if (typeof window !== "undefined") {
      window.location.replace(SANITY_STUDIO_AUTH_URL);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center font-sans">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Lock className="size-7" />
      </div>

      <div className="mt-5 size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />

      <h1 className="mt-4 text-xl font-extrabold text-navy">Redirecting to Sanity Studio</h1>

      <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
        Please log in with your authorized Sanity credentials to upload and manage Dirt Quit blog
        content.
      </p>

      <a
        href={SANITY_STUDIO_AUTH_URL}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-brand-dark transition-all"
      >
        <span>Open Sanity Login</span>
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
