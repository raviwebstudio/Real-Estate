import Link from "next/link";

import { primaryNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-sand/80 backdrop-blur-xl">
      <div className="shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-full border border-gold/30 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            GR
          </div>
          <div>
            <p className="font-serif text-xl tracking-wide text-ink">{siteConfig.name}</p>
            <p className="text-xs tracking-[0.24em] text-taupe uppercase">Luxury Residential Gurgaon</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-taupe hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-black"
          >
            Book Consultation
          </Link>
        </nav>

        <details className="relative lg:hidden">
          <summary className="list-none rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-3xl border border-black/5 bg-white p-4 shadow-xl">
            <div className="flex flex-col gap-1">
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm text-taupe hover:bg-sand hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-2xl bg-ink px-4 py-3 text-sm text-white"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
