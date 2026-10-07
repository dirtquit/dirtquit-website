import { Calendar, Clock, RotateCw, UserCheck } from "lucide-react";
import type { BlogAuthor, BlogCategory } from "@/data/blogTypes";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

interface ArticleHeroProps {
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
}

export function ArticleHero({
  title,
  excerpt,
  category,
  author,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
}: ArticleHeroProps) {
  const formattedPublish = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedUpdate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <header className="mb-6 border-b border-border/60 pb-8">
      {/* Breadcrumbs */}
      <div className="mb-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog/" },
            { label: category.title, href: `/blog/?category=${category.slug}` },
            { label: title },
          ]}
        />
      </div>

      {/* Category Pill */}
      <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
        <span>{category.title}</span>
      </div>

      {/* H1 Headline */}
      <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl md:text-5xl leading-tight">
        {title}
      </h1>

      {/* Short Contextual Intro */}
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{excerpt}</p>

      {/* Author & Meta Row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card border border-border/70 p-4 text-xs">
        {/* Author Details */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary border border-primary/20 shrink-0">
            {author.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-navy text-sm">
              <span>{author.name}</span>
              <UserCheck className="size-3.5 text-primary" aria-label="Verified expert" />
            </div>
            <div className="text-[11px] text-muted-foreground">{author.role}</div>
          </div>
        </div>

        {/* Timestamps & Read Time */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            <span>Published {formattedPublish}</span>
          </div>

          {formattedUpdate && (
            <div className="flex items-center gap-1.5 text-primary/90 font-medium">
              <RotateCw className="size-3.5" />
              <span>Updated {formattedUpdate}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 font-semibold text-foreground">
            <Clock className="size-3.5 text-muted-foreground" />
            <span>{readingTimeMinutes} min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}
