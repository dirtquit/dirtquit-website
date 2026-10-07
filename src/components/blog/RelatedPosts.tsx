import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blogTypes";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-14 border-t border-border pt-10">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <BookOpen className="size-4" />
        <span>Continue Reading & Topic Cluster</span>
      </div>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Related Cleaning Guides & Insights
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-bold text-primary">{post.category.title}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readingTimeMinutes} min
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-navy group-hover:text-primary transition-colors leading-snug">
                <a href={`/blog/${post.slug}/`}>{post.title}</a>
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-5 border-t border-border/60 pt-3">
              <a
                href={`/blog/${post.slug}/`}
                className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
