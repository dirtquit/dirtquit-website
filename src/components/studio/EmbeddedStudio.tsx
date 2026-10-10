import { lazy, Suspense, useEffect, useState } from "react";

// Sanity is heavy and browser-only: load it in its own chunk, after hydration,
// so the public site bundle and server rendering never touch it.
const Studio = lazy(async () => {
  const [{ Studio }, { default: config }] = await Promise.all([
    import("sanity"),
    import("@/sanity/studioConfig"),
  ]);
  return { default: () => <Studio config={config} /> };
});

function Loading() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-slate-50 text-center font-sans">
      <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="mt-4 text-sm font-semibold text-navy">Loading Dirt Quit Blog Studio…</p>
    </div>
  );
}

export function EmbeddedStudio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <Loading />;
  return (
    <div className="h-dvh">
      <Suspense fallback={<Loading />}>
        <Studio />
      </Suspense>
    </div>
  );
}

export const studioHead = () => ({
  meta: [
    { title: "Blog Studio | Dirt Quit" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "referrer", content: "same-origin" },
  ],
});
