import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#f4eee5]">
      <div className="shell flex min-h-screen items-center justify-center py-16">
        <div className="grid w-full max-w-4xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel bg-hero-blur p-8">
            <p className="eyebrow">Admin</p>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-ink">
              Manage Gurgaon inventory, SEO pages, and incoming leads.
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-taupe">
              Secure access for the content team to update builders, projects, properties,
              blog posts, and lead workflows.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
