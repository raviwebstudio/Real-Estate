import Image from "next/image";
import Link from "next/link";

export function BuilderCard({
  builder,
}: {
  builder: Awaited<
    ReturnType<typeof import("@/lib/queries").getBuilders>
  >[number];
}) {
  return (
    <article className="group panel overflow-hidden transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/images/placeholders/clubhouse-portrait.svg"
          alt={`Builder ${builder.name}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-6 p-6">
        <p className="eyebrow">{builder.projects.length} projects</p>
        <h3 className="font-serif text-2xl text-ink">
          <Link href={`/builders/${builder.slug}`}>{builder.name}</Link>
        </h3>
        <p className="text-sm leading-7 text-taupe">{builder.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-taupe">
            {builder.properties.length} linked listings
          </span>
          <Link
            href={`/builders/${builder.slug}`}
            className="font-medium text-ink transition duration-300 ease-out hover:text-ink/80"
          >
            View Builder
          </Link>
        </div>
      </div>
    </article>
  );
}
