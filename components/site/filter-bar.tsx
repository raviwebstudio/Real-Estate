import { PropertyStatus } from "@prisma/client";

export function PropertyFilterBar({
  sectors,
  propertyTypes,
  current,
}: {
  sectors: string[];
  propertyTypes: string[];
  current: Record<string, string | undefined>;
}) {
  return (
    <form className="panel grid gap-4 p-5 lg:grid-cols-5" action="/properties" method="get">
      <input
        name="location"
        defaultValue={current.location}
        placeholder="Sector or location"
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none ring-0"
      />
      <select
        name="bhk"
        defaultValue={current.bhk}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      >
        <option value="">Any BHK</option>
        <option value="2 BHK">2 BHK</option>
        <option value="3 BHK">3 BHK</option>
        <option value="4 BHK">4 BHK</option>
      </select>
      <select
        name="propertyType"
        defaultValue={current.propertyType}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      >
        <option value="">Any Type</option>
        {propertyTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        name="status"
        defaultValue={current.status}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      >
        <option value="">Any Status</option>
        {Object.values(PropertyStatus).map((status) => (
          <option key={status} value={status}>
            {status.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <button className="rounded-2xl bg-ink px-4 py-3 text-sm font-medium text-white">
        Search
      </button>

      <div className="lg:col-span-5 flex flex-wrap gap-2">
        {sectors.map((sector) => (
          <button
            key={sector}
            type="submit"
            name="location"
            value={sector}
            className="rounded-full border border-black/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-taupe hover:border-gold hover:text-ink"
          >
            {sector}
          </button>
        ))}
      </div>
    </form>
  );
}
