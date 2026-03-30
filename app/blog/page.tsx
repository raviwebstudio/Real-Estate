import { BlogCard } from "@/components/site/blog-card";
import { PageHero } from "@/components/site/page-hero";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/queries";

export const metadata = buildMetadata({
  title: "Blog",
  description: "SEO-focused Gurgaon property insights, investment articles, and residential buying guides.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Content designed to rank, educate, and move buyers deeper into the funnel."
        description="Browse investment guides, Gurgaon insights, and property explainers with internal links back into live listings."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
      />
      <section className="pb-16">
        <div className="shell grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
