export interface BlogAuthor {
  name: string;
  slug: string;
  role: string;
  avatar: string;
  bio: string;
  credentials?: string[];
}

export interface BlogCategory {
  title: string;
  slug: string;
  description?: string;
  pillarTopic?: boolean;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface TableOfContentItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogSeoFields {
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogImage?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  schemaType?: "BlogPosting" | "Article" | "TechArticle";
}

export interface ComparisonTableRow {
  parameter: string;
  diyApproach: string;
  dirtquitStandard: string;
  verdict: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  calloutBox?: {
    type: "tip" | "warning" | "expert";
    title: string;
    text: string;
  };
  table?: {
    headers: [string, string, string, string];
    rows: ComparisonTableRow[];
  };
  internalLink?: {
    anchor: string;
    href: string;
    badge?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  featuredImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  quickAnswer: string;
  keyTakeaways: string[];
  tableOfContents: TableOfContentItem[];
  sections: ContentSection[];
  faqs: BlogFaqItem[];
  relatedSlugs: string[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    serviceHref: string;
  };
  seo: BlogSeoFields;
}
