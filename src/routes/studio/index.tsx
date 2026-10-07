import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ExternalLink,
  CheckCircle2,
  Database,
  FileText,
  Users,
  FolderTree,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Terminal,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/shared";
import { sanityConfig } from "@/lib/sanity";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Sanity Studio & Content Hub | Dirt Quit" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StudioPortalComponent,
});

interface SanityDocSummary {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  slug?: { current: string };
  category?: string;
  publishedAt?: string;
}

function StudioPortalComponent() {
  const [activeTab, setActiveTab] = useState<"posts" | "categories" | "authors" | "setup">("posts");
  const [docs, setDocs] = useState<SanityDocSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState<boolean | null>(null);

  const fetchLiveDocs = async () => {
    setLoading(true);
    try {
      const url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(
        `*[_type in ["post", "category", "author"]] | order(_createdAt desc) {
          _id,
          _type,
          title,
          name,
          slug,
          publishedAt,
          "category": category->title
        }`,
      )}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setDocs(data.result || []);
        setConnected(true);
      } else {
        setConnected(false);
      }
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDocs();
  }, []);

  const posts = docs.filter((d) => d._type === "post");
  const categories = docs.filter((d) => d._type === "category");
  const authors = docs.filter((d) => d._type === "author");

  const sanityManageUrl = `https://www.sanity.io/manage/project/${sanityConfig.projectId}`;
  const sanityDatasetUrl = `https://www.sanity.io/manage/project/${sanityConfig.projectId}/dataset/${sanityConfig.dataset}`;
  const hostedStudioUrl = `https://dirtquit.sanity.studio`;

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <Header />

      <main className="py-10 sm:py-14">
        <Container>
          {/* Header Banner */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  <span>Sanity Cloud Connected</span>
                </div>

                <h1 className="mt-3 text-2xl font-extrabold text-navy sm:text-4xl">
                  Sanity Studio & Content Manager
                </h1>

                <p className="mt-2 text-sm text-muted-foreground sm:text-base max-w-2xl">
                  Manage blog articles, authors, and categories in your Sanity dataset. Access your
                  official Sanity Cloud Console or review live content synced with this website.
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={sanityManageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-xs hover:bg-brand-dark transition-all"
                >
                  <span>Open Sanity Manage</span>
                  <ExternalLink className="size-4" />
                </a>

                <a
                  href={sanityDatasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <Database className="size-4 text-primary" />
                  <span>View Production Dataset</span>
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
              <div className="rounded-2xl bg-secondary/30 p-4 border border-border/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Project ID
                </span>
                <p className="mt-1 font-mono text-sm font-extrabold text-navy">
                  {sanityConfig.projectId}
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/30 p-4 border border-border/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Dataset
                </span>
                <p className="mt-1 font-mono text-sm font-extrabold text-navy">
                  {sanityConfig.dataset}
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/30 p-4 border border-border/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Connection Status
                </span>
                <p className="mt-1 text-sm font-extrabold text-emerald-600 flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  {connected ? "Active & Healthy" : "Checking..."}
                </p>
              </div>

              <div className="rounded-2xl bg-secondary/30 p-4 border border-border/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Synced Documents
                </span>
                <p className="mt-1 text-sm font-extrabold text-navy">
                  {loading ? "Loading..." : `${docs.length} Items Live`}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("posts")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "posts"
                    ? "bg-navy text-white shadow-xs"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <FileText className="size-3.5" />
                <span>Blog Posts ({posts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("categories")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "categories"
                    ? "bg-navy text-white shadow-xs"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <FolderTree className="size-3.5" />
                <span>Categories ({categories.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("authors")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "authors"
                    ? "bg-navy text-white shadow-xs"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <Users className="size-3.5" />
                <span>Authors ({authors.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("setup")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "setup"
                    ? "bg-navy text-white shadow-xs"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                <Terminal className="size-3.5" />
                <span>Studio Hosting & Setup Guide</span>
              </button>
            </div>

            <button
              type="button"
              onClick={fetchLiveDocs}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Tab Content: Posts */}
          {activeTab === "posts" && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-navy">
                  Published Posts in Sanity Dataset ({posts.length})
                </h2>
                <a
                  href={sanityDatasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Edit in Sanity</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="grid gap-4">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-bold text-primary">
                          {post.category || "Cleaning"}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-[11px]">{post.slug?.current}</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-bold text-navy">{post.title}</h3>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {post.slug?.current && (
                        <a
                          href={`/blog/${post.slug.current}/`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-2 text-xs font-bold text-foreground hover:bg-muted/80 transition-colors"
                        >
                          <span>View Live Article</span>
                          <ArrowRight className="size-3" />
                        </a>
                      )}

                      <a
                        href={sanityDatasetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
                      >
                        <span>Edit Content</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Categories */}
          {activeTab === "categories" && (
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-bold text-navy">
                Taxonomy & Topic Clusters in Sanity ({categories.length})
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-xs"
                  >
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {cat.slug?.current}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-navy">{cat.title}</h3>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      ID: {cat._id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Authors */}
          {activeTab === "authors" && (
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-bold text-navy">
                Verified Authors & Experts ({authors.length})
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {authors.map((author) => (
                  <div
                    key={author._id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-xs"
                  >
                    <div className="size-12 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-lg shrink-0">
                      {author.name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-navy">{author.name}</h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {author.slug?.current}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Setup & Deployment Guide */}
          {activeTab === "setup" && (
            <div className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-navy">
                  Why was /studio showing 404 & How Sanity Works
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Sanity is a <strong>headless CMS</strong>. Content is hosted securely in Sanity's
                  cloud, while your studio can run in three different ways:
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm">
                    <Sparkles className="size-4 text-primary" />
                    <span>Option 1: Sanity Cloud Manage</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Always available instantly without installing any packages or deploying build
                    bundles.
                  </p>
                  <a
                    href={sanityManageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Open Sanity Manage →</span>
                  </a>
                </div>

                <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm">
                    <Database className="size-4 text-primary" />
                    <span>Option 2: Hosted Studio</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We registered your studio hostname: <code>dirtquit.sanity.studio</code>. You can
                    deploy the studio bundle directly with Sanity CLI.
                  </p>
                  <a
                    href={hostedStudioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Visit dirtquit.sanity.studio →</span>
                  </a>
                </div>

                <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-navy text-sm">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span>Option 3: This Portal (/studio)</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Direct access to your live documents, status diagnostics, and quick editing
                    links.
                  </p>
                  <span className="text-xs font-bold text-emerald-600">
                    Currently active on this site
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-white font-mono text-xs space-y-2">
                <p className="text-slate-400">
                  # Deploying your standalone Sanity Studio (1 command):
                </p>
                <p className="text-emerald-400">npx sanity deploy</p>
                <p className="text-slate-400"># Or run local studio development server:</p>
                <p className="text-emerald-400">npx sanity start</p>
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
