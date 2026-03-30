import { AdminField, AdminSelect, AdminTextarea } from "@/components/admin/fields";
import { saveBlogPostAction } from "@/lib/actions/admin";
import { cmsEnums } from "@/lib/site";
import { startCase } from "@/lib/utils";

export function BlogForm({
  post,
}: {
  post?: Awaited<ReturnType<typeof import("@/lib/queries").getBlogPostById>>;
}) {
  return (
    <form action={saveBlogPostAction} className="panel grid gap-5 p-8">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="Title" name="title" defaultValue={post?.title} required />
        <AdminField label="Slug" name="slug" defaultValue={post?.slug} placeholder="auto-generated if blank" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminSelect
          label="Category"
          name="category"
          defaultValue={post?.category}
          options={cmsEnums.blogCategories.map((category) => ({
            label: startCase(category),
            value: category,
          }))}
        />
        <AdminField
          label="Published At"
          name="publishedAt"
          type="date"
          defaultValue={post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : ""}
        />
      </div>
      <AdminTextarea label="Excerpt" name="excerpt" defaultValue={post?.excerpt} rows={4} />
      <AdminTextarea label="Content (Markdown)" name="content" defaultValue={post?.content} rows={16} />
      <div className="grid gap-5 lg:grid-cols-3">
        <AdminField label="Cover Image Path" name="coverImage" defaultValue={post?.coverImage} />
        <AdminField label="Cover Alt Text" name="coverAlt" defaultValue={post?.coverAlt} />
        <AdminField label="Related Link" name="relatedLink" defaultValue={post?.relatedLink} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="SEO Title" name="seoTitle" defaultValue={post?.seoTitle} />
        <AdminField label="SEO Description" name="seoDescription" defaultValue={post?.seoDescription} />
      </div>
      <button className="w-fit rounded-2xl bg-ink px-5 py-3 text-sm text-white">
        Save Post
      </button>
    </form>
  );
}
