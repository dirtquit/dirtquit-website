import { Metadata } from "next";
import Link from "next/link";
import { getPosts, getCategories } from "../../lib/sanity";
import { generateBlogIndexSchema, generateBreadcrumbSchema } from "../../lib/schema";

export const revalidate = 60; // ISR cache for fast delivery

export const metadata: Metadata = {
  title: "Cleaning Knowledge Hub: Answer-First Guides | Dirt Quit",
  description:
    "Expert home cleaning guides for Bengaluru. Direct answers, frequency schedules, hard water solutions, and equipment comparisons.",
  alternates: {
    canonical: "https://www.dirtquit.info/blog/",
  },
  openGraph: {
    title: "Cleaning Knowledge Hub | Dirt Quit Bengaluru",
    description: "Expert cleaning guides, science-backed schedules, and stain removal frameworks.",
    url: "https://www.dirtquit.info/blog/",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const blogSchema = generateBlogIndexSchema(posts);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mb-12 max-w-3xl">
            <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
              Answer-First Knowledge Hub
            </span>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Cleaning Guides & Scientific Frameworks
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Front-loaded answers, equipment comparisons, and practical home hygiene guidelines.
            </p>
          </header>

          {/* Featured Post */}
          {featuredPost && (
            <article className="mb-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-xs font-semibold text-sky-600">
                <span>{featuredPost.category.title}</span>
                <span>·</span>
                <span>{featuredPost.readingTimeMinutes} min read</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 hover:text-sky-600">
                <Link href={`/blog/${featuredPost.slug}/`}>{featuredPost.title}</Link>
              </h2>
              <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/70 p-4">
                <p className="text-sm font-semibold text-sky-950">
                  <span className="font-bold text-sky-700">Quick Answer: </span>
                  {featuredPost.quickAnswer}
                </p>
              </div>
              <div className="mt-6 flex justify-between items-center text-sm">
                <span className="text-slate-500">By {featuredPost.author.name}</span>
                <Link
                  href={`/blog/${featuredPost.slug}/`}
                  className="font-bold text-sky-600 hover:underline"
                >
                  Read Full Guide →
                </Link>
              </div>
            </article>
          )}

          {/* Remaining Posts Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <span className="text-xs font-bold text-sky-600">{post.category.title}</span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 hover:text-sky-600">
                    <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                  <span className="text-slate-500">{post.readingTimeMinutes} min read</span>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="font-bold text-sky-600 hover:underline"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
