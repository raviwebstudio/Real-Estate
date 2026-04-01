import Image from "next/image";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/site/blog-card";
import { BuilderCard } from "@/components/site/builder-card";
import { FaqAccordion } from "@/components/site/faq";
import { ProjectCard } from "@/components/site/project-card";
import { PropertyCard } from "@/components/site/property-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Testimonials } from "@/components/site/testimonials";
import {
  getBlogPosts,
  getBuilders,
  getFeaturedProperties,
  getProjects,
} from "@/lib/queries";
import { buildMetadata } from "@/lib/metadata";
import { homeFaqs, serviceHighlights, siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Luxury Residential Property in Gurgaon",
  description:
    "Premium Gurgaon real estate platform for luxury apartments, buyer advisory, and investor-led residential opportunities.",
  path: "/",
  keywords: [
    "luxury apartments in Gurgaon",
    "properties in Gurgaon",
    "Gurgaon real estate",
  ],
});

export default async function HomePage() {
  const [featuredProperties, builders, projects, posts] = await Promise.all([
    getFeaturedProperties(3),
    getBuilders(),
    getProjects(),
    getBlogPosts(3),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: siteConfig.name,
          url: siteConfig.baseUrl,
          description: siteConfig.description,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: "Gurgaon, Haryana, India",
        }}
      />

      <section className="section-space">
        <div className="shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel bg-hero-blur px-6 py-12 sm:px-10">
            <p className="eyebrow">Gurgaon Luxury Residential</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-tight text-ink sm:text-6xl">
              Premium homes and investor-ready property in Gurgaon.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-taupe">
              Designed for serious buyers and investors looking across Golf
              Course Road, Golf Course Extension Road, and Dwarka Expressway.
            </p>

            <form
              action="/properties"
              method="get"
              className="mt-8 grid gap-3 rounded-[28px] border border-black/5 bg-white/90 p-4 sm:grid-cols-[1.2fr_0.8fr_0.8fr_auto]"
            >
              <input
                name="location"
                placeholder="Search by sector"
                className="rounded-2xl border border-black/10 bg-sand px-4 py-3 text-sm"
              />
              <select
                name="bhk"
                className="rounded-2xl border border-black/10 bg-sand px-4 py-3 text-sm"
                defaultValue=""
              >
                <option value="">Any BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
              <select
                name="status"
                className="rounded-2xl border border-black/10 bg-sand px-4 py-3 text-sm"
                defaultValue=""
              >
                <option value="">Any status</option>
                <option value="AVAILABLE">Available</option>
                <option value="UNDER_CONSTRUCTION">Under Construction</option>
              </select>
              <button className="rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white">
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/luxury-apartments-in-gurgaon"
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-ink"
              >
                Luxury Apartments
              </Link>
              <Link
                href="/3-bhk-flats-in-gurgaon"
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-ink"
              >
                3 BHK Flats
              </Link>
              <Link
                href="/ready-to-move-properties-in-gurgaon"
                className="rounded-full border border-black/10 px-4 py-2 text-sm text-ink"
              >
                Ready to Move
              </Link>
            </div>
          </div>

          <div className="panel relative min-h-[320px] overflow-hidden">
            <Image
              src="/images/hero/gurgaon-skyline.svg"
              alt="Luxury skyline illustration for Gurgaon residential real estate"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="shell grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [
              "Luxury-first UI",
              "Built for premium residential discovery and stronger conversion intent.",
            ],
            [
              "Lead engine",
              "Pricing, brochure, site visit, WhatsApp, and direct call pathways.",
            ],
            [
              "SEO scale",
              "Location pages, dynamic routes, schema markup, and sitemap coverage.",
            ],
            [
              "Investor clarity",
              "ROI, rental yield, and investment angles on every core listing.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="panel p-6">
              <p className="font-serif text-2xl text-ink">{title}</p>
              <p className="mt-3 text-sm leading-7 text-taupe">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Featured Inventory"
            title="High-conviction Gurgaon listings"
            description="Curated residential opportunities with premium presentation, direct enquiry flow, and an investor-aware narrative."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="Services"
              title="Advisory built around conversion and confidence"
              description="The platform is designed to sell the right listing, not just display inventory."
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceHighlights.map((item) => (
              <article key={item.title} className="panel p-6">
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-taupe">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Projects"
            title="Luxury launches and established communities"
            description="Project pages connect builder context, configuration mix, pricing range, and listing depth."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Builders"
            title="Builder credibility is part of the buying decision"
            description="Profiles are structured for long-term scale, making it easy to grow beyond Gurgaon into multiple cities later."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {builders.slice(0, 3).map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="A premium experience still needs to build trust"
            description="The visual language is refined, but the platform stays grounded in clarity, due diligence, and conversion support."
          />
          <Testimonials />
        </div>
      </section>

      <section className="section-space">
        <div className="shell space-y-8">
          <SectionHeading
            eyebrow="Insights"
            title="SEO content designed to support buyer intent"
            description="The blog engine helps rank for Gurgaon location and property guide searches while reinforcing internal links."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="FAQs"
            title="Built to answer high-intent buyer and investor questions"
            description="Structured FAQ content supports both user confidence and rich snippet eligibility."
          />
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
    </>
  );
}
