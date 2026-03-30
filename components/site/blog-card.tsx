import Image from "next/image";
import Link from "next/link";

import { startCase } from "@/lib/utils";

export function BlogCard({
  post,
}: {
  post: Awaited<ReturnType<typeof import("@/lib/queries").getBlogPosts>>[number];
}) {
  return (
    <article className="panel overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-dark">
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.coverAlt ?? post.title} fill className="object-cover" />
        ) : null}
      </div>
      <div className="space-y-4 p-6">
        <p className="eyebrow">{startCase(post.category)}</p>
        <h3 className="font-serif text-2xl text-ink">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm leading-7 text-taupe">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-ink">
          Read article
        </Link>
      </div>
    </article>
  );
}
