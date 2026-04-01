import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import {
  getBlogPosts,
  getBuilders,
  getProjects,
  getProperties,
} from "@/lib/queries";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "HTML Sitemap",
  description: "HTML sitemap for Gurgaon Residences.",
  path: "/sitemap",
});

export default async function HtmlSitemapPage() {
  const [properties, projects, builders, posts] = await Promise.all([
    getProperties(),
    getProjects(),
    getBuilders(),
    getBlogPosts(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="HTML Sitemap"
        description="Browse public pages, listings, projects, builders, and blog posts."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Sitemap" }]}
      />
      <section className="pb-16">
        <div className="shell grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "Main Pages",
              items: [
                ["/", "Home"],
                ["/about", "About Us"],
                ["/properties", "Properties"],
                ["/projects", "Projects"],
                ["/builders", "Builders"],
                ["/blog", "Blog"],
                ["/contact", "Contact"],
              ],
            },
            {
              title: "SEO Pages",
              items: [
                ["/properties-in-gurgaon", "Properties in Gurgaon"],
                [
                  "/luxury-apartments-in-gurgaon",
                  "Luxury Apartments in Gurgaon",
                ],
                ["/3-bhk-flats-in-gurgaon", "3 BHK Flats in Gurgaon"],
                [
                  "/ready-to-move-properties-in-gurgaon",
                  "Ready to Move Properties in Gurgaon",
                ],
              ],
            },
            {
              title: "Properties",
              items: properties.map((item) => [
                `/properties/${item.slug}`,
                item.title,
              ]),
            },
            {
              title: "Projects",
              items: projects.map((item) => [
                `/projects/${item.slug}`,
                item.name,
              ]),
            },
            {
              title: "Builders",
              items: builders.map((item) => [
                `/builders/${item.slug}`,
                item.name,
              ]),
            },
            {
              title: "Blog",
              items: posts.map((item) => [`/blog/${item.slug}`, item.title]),
            },
          ].map((section) => (
            <div key={section.title} className="panel p-6">
              <h2 className="font-serif text-2xl text-ink">{section.title}</h2>
              <div className="mt-5 flex flex-col gap-3">
                {section.items.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm text-taupe hover:text-ink"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
