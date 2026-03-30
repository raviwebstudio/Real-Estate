import Link from "next/link";

import { siteConfig } from "@/lib/site";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/builders", label: "Builders" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4eee5]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-black/5 bg-[#efe6d8] p-6">
          <div>
            <p className="font-serif text-2xl text-ink">{siteConfig.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-taupe">
              Admin CMS
            </p>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm text-taupe hover:bg-white/70 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="p-5 sm:p-8">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">CMS</p>
              <h1 className="mt-3 font-serif text-4xl text-ink">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-taupe">{description}</p>
            </div>
            {actions}
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
