import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { PropertyGallery } from "@/components/property/gallery";
import { FaqAccordion } from "@/components/site/faq";
import { LeadForm } from "@/components/site/lead-form";
import { MapCard } from "@/components/site/map-card";
import { PageHero } from "@/components/site/page-hero";
import { PropertyCard } from "@/components/site/property-card";
import { RichText } from "@/components/site/rich-text";
import { buildMetadata } from "@/lib/metadata";
import { getProperties, getPropertyBySlug, getRelatedProperties } from "@/lib/queries";
import { formatCompactINR, priceLabel, telLink, whatsappPropertyLink } from "@/lib/utils";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return buildMetadata({
      title: "Property",
      description: "Property detail page",
      path: `/properties/${slug}`,
    });
  }

  return buildMetadata({
    title: property.seoTitle || property.title,
    description: property.seoDescription || property.excerpt,
    path: `/properties/${property.slug}`,
  });
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const related = await getRelatedProperties(
    property.id,
    property.projectId,
    property.builderId,
  );

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Residence",
            name: property.title,
            description: property.excerpt,
            address: {
              "@type": "PostalAddress",
              streetAddress: property.locationLabel,
              addressLocality: property.city,
              addressRegion: property.state,
              postalCode: property.pinCode,
              addressCountry: "IN",
            },
          },
          property.faq.length
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: property.faq.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              }
            : {},
        ]}
      />

      <PageHero
        eyebrow={property.sector}
        title={property.title}
        description={property.excerpt}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/properties", label: "Properties" },
          { label: property.title },
        ]}
      />

      <section className="pb-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <PropertyGallery images={property.images} />

            <div className="panel p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="eyebrow">Price</p>
                  <h2 className="mt-3 font-serif text-4xl text-ink">
                    {priceLabel({
                      priceMin: property.priceMin,
                      priceMax: property.priceMax,
                      priceText: property.priceText,
                      priceType: property.priceType,
                    })}
                  </h2>
                </div>
                <div className="grid gap-2 text-sm text-taupe">
                  <p>{property.propertyType}</p>
                  <p>{property.possessionTimeline}</p>
                  <p>RERA: {property.reraNumber ?? "Available on request"}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-taupe">Super area</p>
                  <p className="mt-2 text-lg font-medium text-ink">
                    {property.superArea ? `${property.superArea} sq.ft.` : "On request"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-taupe">Carpet area</p>
                  <p className="mt-2 text-lg font-medium text-ink">
                    {property.carpetArea ? `${property.carpetArea} sq.ft.` : "On request"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-taupe">Rental yield</p>
                  <p className="mt-2 text-lg font-medium text-ink">
                    {property.rentalYield ? `${property.rentalYield}%` : "NA"}
                  </p>
                </div>
              </div>
            </div>

            <div className="panel p-8">
              <h2 className="font-serif text-3xl text-ink">Configuration & pricing</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-taupe">
                    <tr>
                      <th className="pb-3">Configuration</th>
                      <th className="pb-3">Size</th>
                      <th className="pb-3">Indicative Price</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.variations.map((variation) => (
                      <tr key={variation.id} className="border-t border-black/5">
                        <td className="py-4 font-medium text-ink">{variation.label}</td>
                        <td className="py-4 text-taupe">{variation.sizeSqft} sq.ft.</td>
                        <td className="py-4 text-taupe">{formatCompactINR(variation.price)}</td>
                        <td className="py-4 text-taupe">{variation.status ?? "Available"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="panel p-8">
                <h2 className="font-serif text-3xl text-ink">Amenities</h2>
                <ul className="mt-5 grid gap-3 text-sm text-taupe">
                  {property.amenities.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="panel p-8">
                <h2 className="font-serif text-3xl text-ink">Why invest here</h2>
                <p className="mt-5 text-sm leading-8 text-taupe">{property.whyInvest}</p>
                <ul className="mt-4 grid gap-3 text-sm text-taupe">
                  {property.investmentHighlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="panel p-8">
                <h2 className="font-serif text-3xl text-ink">Nearby places</h2>
                <div className="mt-5 grid gap-4">
                  {property.nearbyPlaces.map((item) => (
                    <div key={`${item.category}-${item.name}`} className="rounded-2xl bg-sand px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-gold">{item.category}</p>
                      <p className="mt-1 font-medium text-ink">{item.name}</p>
                      <p className="text-sm text-taupe">{item.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
              <MapCard mapQuery={property.mapQuery} title={property.title} />
            </div>

            <div className="panel p-8">
              <h2 className="font-serif text-3xl text-ink">Detailed overview</h2>
              <div className="mt-6">
                <RichText content={property.contentMarkdown} />
              </div>
            </div>

            {property.faq.length ? (
              <div className="space-y-6">
                <h2 className="font-serif text-3xl text-ink">Frequently asked questions</h2>
                <FaqAccordion items={property.faq} />
              </div>
            ) : null}

            {related.length ? (
              <div className="space-y-6">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="font-serif text-3xl text-ink">Related properties</h2>
                  <Link href="/properties" className="text-sm font-medium text-ink">
                    View all listings
                  </Link>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {related.map((item) => (
                    <PropertyCard key={item.id} property={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="panel p-6">
              <div className="grid gap-3">
                <a href="#lead-form" className="rounded-2xl bg-ink px-5 py-3 text-center text-sm text-white">
                  Get Price
                </a>
                <a href="#lead-form" className="rounded-2xl border border-black/10 px-5 py-3 text-center text-sm text-ink">
                  Download Brochure
                </a>
                <a href="#lead-form" className="rounded-2xl border border-black/10 px-5 py-3 text-center text-sm text-ink">
                  Book Site Visit
                </a>
                <a href={whatsappPropertyLink(property.title, property.slug)} className="rounded-2xl border border-black/10 px-5 py-3 text-center text-sm text-ink">
                  WhatsApp
                </a>
                <a href={telLink()} className="rounded-2xl border border-black/10 px-5 py-3 text-center text-sm text-ink">
                  Call Now
                </a>
              </div>
            </div>

            <div id="lead-form">
              <LeadForm
                propertyId={property.id}
                leadType="GET_PRICE"
                sourcePage={`/properties/${property.slug}`}
                title="Request pricing"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
