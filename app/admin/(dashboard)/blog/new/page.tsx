import { BlogForm } from "@/components/admin/blog-form";
import { AdminShell } from "@/components/admin/shell";

export default function NewBlogPostPage() {
  return (
    <AdminShell
      title="Add Blog Post"
      description="Publish an SEO article and connect it to a relevant listing or landing page."
    >
      <BlogForm />
    </AdminShell>
  );
}
