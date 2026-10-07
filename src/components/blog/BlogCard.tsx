import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blogTypes";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-lift">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center p-6 sm:p-8">
          <div className="space-y-4 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-bold text-primary">
                Featured Pillar Guide
              </span>
              <span className="font-semibold text-muted-foreground">{post.category.title}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3.5" />
                {post.readingTimeMinutes} min read
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl md:text-4xl group-hover:text-primary transition-colors leading-tight">
              <a href={`/blog/${post.slug}/`}>{post.title}</a>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Quick Answer Snippet Preview */}
            <div className="rounded-xl border border-primary/20 bg-secondary/50 p-4 text-xs sm:text-sm text-foreground/90">
              <span className="font-bold text-primary">Quick Answer: </span>
              <span className="line-clamp-2">{post.quickAnswer}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5 text-xs">
                <div className="size-7 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-navy">{post.author.name}</span>
                  <span className="text-muted-foreground text-[11px] ml-2">{formattedDate}</span>
                </div>
              </div>

              <a
                href={`/blog/${post.slug}/`}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:bg-brand-dark"
              >
                <span>Read Guide</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Key Takeaways Inside
              </span>
              <ul className="space-y-2 text-xs text-foreground/80">
                {post.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span className="line-clamp-2 leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
      <div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-bold text-primary">{post.category.title}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTimeMinutes} min
          </span>
        </div>

        <h3 className="mt-3.5 text-lg font-bold text-navy group-hover:text-primary transition-colors leading-snug">
          <a href={`/blog/${post.slug}/`}>{post.title}</a>
        </h3>

        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-6 border-t border-border/70 pt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="size-3" />
          <span>{formattedDate}</span>
        </div>

        <a
          href={`/blog/${post.slug}/`}
          className="inline-flex items-center gap-1 font-bold text-primary group-hover:underline"
        >
          <span>Read More</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
