import Link from "next/link";

import { AdminShell } from "@/components/admin/shell";
import { deleteBlogPostAction } from "@/lib/actions/admin";
import { getBlogPosts } from "@/lib/queries";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <AdminShell
      title="Blog"
      description="Manage SEO-driven Gurgaon content, internal links, and post metadata."
      actions={
        <Link href="/admin/blog/new" className="rounded-2xl bg-ink px-5 py-3 text-sm text-white">
          Add Post
        </Link>
      }
    >
      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="panel flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-ink">{post.title}</h2>
              <p className="mt-2 text-sm text-taupe">{post.excerpt}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/blog/${post.id}`} className="rounded-2xl border border-black/10 px-4 py-3 text-sm text-ink">
                Edit
              </Link>
              <form action={deleteBlogPostAction}>
                <input type="hidden" name="id" value={post.id} />
                <button className="rounded-2xl border border-red-200 px-4 py-3 text-sm text-red-700">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
