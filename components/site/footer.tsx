import Link from "next/link";

import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#f3ede4]">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <p className="font-serif text-2xl text-ink">{siteConfig.name}</p>
          <p className="max-w-sm text-sm leading-7 text-taupe">{siteConfig.description}</p>
          <div className="space-y-1 text-sm text-taupe">
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
          </div>
        </div>

        {Object.entries(footerNavigation).map(([group, links]) => (
          <div key={group} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink">
              {group}
            </p>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-taupe hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="shell border-t border-black/5 py-5 text-sm text-taupe">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
