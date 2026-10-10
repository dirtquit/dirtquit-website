import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, Sparkles, BookOpen } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Container } from "@/components/site/shared";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { BlogCard } from "@/components/blog/BlogCard";
import { BLOG_CATEGORIES } from "@/data/blogData";
import { getPosts } from "@/lib/sanity";
import { generateBlogIndexSchema, generateBreadcrumbSchema } from "@/lib/schema";

export const Route = createFileRoute("/blog/")({
  loader: async () => ({ posts: await getPosts() }),
  head: () => {
    const title = "Cleaning Knowledge Hub & Guides | Dirt Quit Bengaluru";
    const description =
      "Expert, answer-first cleaning guides for Bengaluru homes. Frequency checklists, hard water stain removal, kitchen degreasing, and sofa care.";
    const canonical = "https://www.dirtquit.info/blog/";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogIndexRouteComponent,
});

function BlogIndexRouteComponent() {
  const { posts: allPosts } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.category.slug === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.quickAnswer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = allPosts[0];
  const remainingPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  const blogSchema = generateBlogIndexSchema(allPosts);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cleaning Knowledge Hub", url: "/blog/" },
  ]);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground pb-16 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <div className="border-b border-border/40 bg-secondary/20">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Cleaning Knowledge Hub" }]}
          />
        </Container>
      </div>

      <main>
        {/* Hub Header Section */}
        <section className="bg-gradient-to-b from-secondary/30 via-background to-background py-12 sm:py-16 border-b border-border/60">
          <Container>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-4">
                <BookOpen className="size-3.5" />
                <span>Expert Answers · Structured Frameworks · Bengaluru Insights</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl leading-tight">
                Cleaning Knowledge Hub: <span className="text-primary">Answer-First Guides</span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                No fluff. Real cleaning science, equipment comparisons, frequency frameworks, and
                hard water remediation strategies written by Dirt Quit sanitation leads.
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  All Topics ({allPosts.length})
                </button>
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                      selectedCategory === cat.slug
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-card border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cleaning guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-xs sm:text-sm focus:border-primary focus:outline-none shadow-2xs"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Content Stream */}
        <section className="section-pad">
          <Container>
            {/* Featured Post (only when not searching or in 'all') */}
            {selectedCategory === "all" && searchQuery.trim() === "" && featuredPost && (
              <div className="mb-14">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Sparkles className="size-4" />
                  <span>Start Here</span>
                </div>
                <BlogCard post={featuredPost} featured={true} />
              </div>
            )}

            {/* Grid of Articles */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                <h2 className="text-xl font-extrabold text-navy sm:text-2xl">
                  {selectedCategory === "all" && searchQuery === ""
                    ? "Latest In-Depth Guides"
                    : `Matching Guides (${filteredPosts.length})`}
                </h2>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                  <p className="text-base font-semibold text-navy">
                    No articles match your search.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try adjusting your keyword or reset filters to see all cleaning guides.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="mt-4 inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-brand-dark"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {(selectedCategory === "all" && searchQuery.trim() === ""
                    ? remainingPosts
                    : filteredPosts
                  ).map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
    </div>
  );
}
