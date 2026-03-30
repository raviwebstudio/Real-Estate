import { notFound } from "next/navigation";

import { BlogForm } from "@/components/admin/blog-form";
import { AdminShell } from "@/components/admin/shell";
import { getBlogPostById } from "@/lib/queries";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) notFound();

  return (
    <AdminShell
      title={`Edit ${post.title}`}
      description="Update article content, category, metadata, and internal links."
    >
      <BlogForm post={post} />
    </AdminShell>
  );
}
