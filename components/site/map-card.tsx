export function MapCard({ mapQuery, title }: { mapQuery?: string | null; title: string }) {
  const query = encodeURIComponent(mapQuery || title);

  return (
    <div className="panel overflow-hidden">
      <iframe
        title={`${title} map`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        className="h-[340px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
