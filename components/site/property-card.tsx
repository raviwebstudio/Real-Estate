import Image from "next/image";
import Link from "next/link";

import type { getProperties } from "@/lib/queries";
import { priceLabel, propertyTagLabel } from "@/lib/utils";

type PropertyCardProps = {
  property: Awaited<ReturnType<typeof getProperties>>[number];
};

export function PropertyCard({ property }: PropertyCardProps) {
  const heroImage = property.images[0];

  return (
    <article className="panel overflow-hidden">
      <div className="relative aspect-[16/11] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.tagList.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              {propertyTagLabel(tag)}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-gold">{property.sector}</p>
            <h3 className="mt-2 font-serif text-2xl text-ink">
              <Link href={`/properties/${property.slug}`}>{property.title}</Link>
            </h3>
          </div>
          <div className="rounded-2xl bg-sand px-3 py-2 text-right text-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-taupe">From</p>
            <p className="font-semibold text-ink">
              {priceLabel({
                priceMin: property.priceMin,
                priceMax: property.priceMax,
                priceText: property.priceText,
                priceType: property.priceType,
              })}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-taupe">{property.excerpt}</p>

        <div className="flex flex-wrap gap-3 text-sm text-taupe">
          <span>{property.propertyType}</span>
          <span>•</span>
          <span>{property.variations.map((item) => item.label).join(", ")}</span>
          <span>•</span>
          <span>{property.possessionTimeline}</span>
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/properties/${property.slug}`}
            className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-white"
          >
            View Property
          </Link>
          <span className="text-sm text-taupe">
            ROI {property.expectedRoi ? `${property.expectedRoi}%` : "NA"}
          </span>
        </div>
      </div>
    </article>
  );
}
