import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.dirtquit.info${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumbs" className="py-3 text-xs font-medium text-muted-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5 sm:gap-2">
              {index === 0 && <Home className="size-3 text-muted-foreground/70" />}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-primary hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-semibold text-foreground/90">{item.label}</span>
              )}
              {!isLast && (
                <ChevronRight className="size-3 text-muted-foreground/40 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
