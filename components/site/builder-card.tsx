import Link from "next/link";

export function BuilderCard({
  builder,
}: {
  builder: Awaited<ReturnType<typeof import("@/lib/queries").getBuilders>>[number];
}) {
  return (
    <article className="panel p-6">
      <p className="eyebrow">{builder.projects.length} projects</p>
      <h3 className="mt-4 font-serif text-2xl text-ink">
        <Link href={`/builders/${builder.slug}`}>{builder.name}</Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-taupe">{builder.description}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-taupe">{builder.properties.length} linked listings</span>
        <Link href={`/builders/${builder.slug}`} className="font-medium text-ink">
          View Builder
        </Link>
      </div>
    </article>
  );
}
