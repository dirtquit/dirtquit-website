import { createFileRoute, notFound } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/site/shared";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { AnswerBox } from "@/components/blog/AnswerBox";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { FAQSection } from "@/components/blog/FAQSection";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { InlineCTA } from "@/components/blog/InlineCTA";
import { ShareBar } from "@/components/blog/ShareBar";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blogData";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFaqSchema,
  SITE_URL,
} from "@/lib/schema";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    const relatedPosts = getRelatedBlogPosts(post.relatedSlugs || []);
    return { post, relatedPosts };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) {
      return {
        meta: [{ title: "Article Not Found | Dirt Quit" }],
      };
    }

    const { post } = loaderData;
    const title = post.seo.seoTitle || `${post.title} | Dirt Quit`;
    const description = post.seo.metaDescription || post.excerpt;
    const canonical = post.seo.canonicalUrl || `${SITE_URL}/blog/${post.slug}/`;
    const ogImage = post.featuredImage.src.startsWith("http")
      ? post.featuredImage.src
      : `${SITE_URL}${post.featuredImage.src}`;

    const meta = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "article" },
      { property: "og:image", content: ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ];

    if (post.seo.noIndex) {
      meta.push({ name: "robots", content: "noindex, nofollow" });
    }

    return {
      meta,
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: SingleArticleRouteComponent,
});

function SingleArticleRouteComponent() {
  const { post, relatedPosts } = Route.useLoaderData();
  const currentUrl = `${SITE_URL}/blog/${post.slug}/`;

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
    { name: post.category.title, url: `/blog/?category=${post.category.slug}` },
    { name: post.title, url: `/blog/${post.slug}/` },
  ]);
  const faqSchema = generateFaqSchema(post.faqs);

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground pb-16 lg:pb-0">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Header />

      <main className="py-8 sm:py-12">
        <Container>
          {/* Main Article Container */}
          <div className="mx-auto max-w-6xl">
            {/* Hero Section */}
            <ArticleHero
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              author={post.author}
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              readingTimeMinutes={post.readingTimeMinutes}
            />

            {/* Answer-First Box Above The Fold */}
            <AnswerBox quickAnswer={post.quickAnswer} keyTakeaways={post.keyTakeaways} />

            {/* Mobile Collapsible Table of Contents */}
            <TableOfContents items={post.tableOfContents} variant="inline-mobile" />

            {/* Two-Column Editorial Layout (Desktop Sticky TOC + Content Body) */}
            <div className="mt-8 grid gap-10 lg:grid-cols-12">
              {/* Main Content Body */}
              <div className="lg:col-span-8">
                <ArticleBody sections={post.sections} />

                {/* Social Share Bar */}
                <ShareBar title={post.title} url={currentUrl} />

                {/* Inline CTA Section */}
                <InlineCTA
                  heading={post.cta.heading}
                  description={post.cta.description}
                  serviceHref={post.cta.serviceHref}
                />

                {/* FAQs Section */}
                {post.faqs && post.faqs.length > 0 && <FAQSection faqs={post.faqs} />}

                {/* Author Credentials & Bio Box */}
                <AuthorBox author={post.author} />
              </div>

              {/* Desktop Sticky Table of Contents Sidebar */}
              <div className="hidden lg:col-span-4 lg:block">
                <TableOfContents items={post.tableOfContents} variant="desktop-sticky" />
              </div>
            </div>

            {/* Related Topic Cluster Posts */}
            {relatedPosts && relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
          </div>
        </Container>
      </main>

      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
    </div>
  );
}
