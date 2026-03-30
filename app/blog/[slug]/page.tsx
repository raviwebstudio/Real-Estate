import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/page-hero";
import { RichText } from "@/components/site/rich-text";
import { buildMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/queries";
import { startCase } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Blog",
      description: "Blog detail page",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={startCase(post.category)}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { label: post.title },
        ]}
      />
      <section className="pb-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-8">
            <RichText content={post.content} />
          </div>
          <aside className="panel p-8">
            <p className="eyebrow">Related</p>
            {post.relatedLink ? (
              <Link href={post.relatedLink} className="mt-4 inline-block text-base font-medium text-ink">
                Continue exploring
              </Link>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
