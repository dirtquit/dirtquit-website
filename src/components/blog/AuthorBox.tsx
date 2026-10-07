import { Award, CheckCircle } from "lucide-react";
import type { BlogAuthor } from "@/data/blogTypes";

interface AuthorBoxProps {
  author: BlogAuthor;
}

export function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <section className="my-10 rounded-2xl border border-border bg-secondary/35 p-6 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-xl font-extrabold text-primary border border-primary/30 shrink-0">
          {author.name.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Written By
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-base font-extrabold text-navy">{author.name}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
              <CheckCircle className="size-3" />
              Verified Expert
            </span>
          </div>

          <p className="mt-1 text-xs font-semibold text-primary">{author.role}</p>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/80">
            {author.bio}
          </p>

          {author.credentials && author.credentials.length > 0 && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              {author.credentials.map((cred, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground/85"
                >
                  <Award className="size-3 text-primary" />
                  {cred}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
