import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCityBySlug } from "@/data/cities";
import { getCategoryBySlug } from "@/data/categories";
import { getCategoryImages } from "@/data/categoryImages";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CategoryPageTemplate } from "@/components/site/CategoryPageTemplate";

export const Route = createFileRoute("/$city/$categorySlug")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.city);
    if (!city || !city.isLive) {
      throw notFound();
    }
    const rawCategory = getCategoryBySlug(params.categorySlug);
    if (!rawCategory) {
      throw notFound();
    }
    const images = rawCategory.images || getCategoryImages(rawCategory.slug);
    const category = { ...rawCategory, images };
    return { city, category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { city, category } = loaderData;
    const title = `${category.name} in Bangalore | Dirt Quit`;
    const description =
      category.metaDescription ||
      `Professional ${category.name.toLowerCase()} services in ${city.name} by Dirt Quit. Verified cleaners and quality work. Book your service slot today.`;
    const canonical = `https://www.dirtquit.info/${city.slug}/${category.slug}/`;
    const ogImageSrc = category.images?.og?.src || category.images?.hero?.src;
    const ogImageUrl = ogImageSrc
      ? (ogImageSrc.startsWith("http") ? ogImageSrc : `https://www.dirtquit.info${ogImageSrc}`)
      : undefined;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(ogImageUrl
          ? [
              { property: "og:image", content: ogImageUrl },
              { name: "twitter:image", content: ogImageUrl },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: CategoryRouteComponent,
});

function CategoryRouteComponent() {
  const { city, category } = Route.useLoaderData();

  return (
    <div className="relative min-h-screen bg-background font-sans text-foreground">
      <Header />
      <CategoryPageTemplate category={category} city={city} />
      <Footer />
    </div>
  );
}
