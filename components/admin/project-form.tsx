import { AdminField, AdminSelect, AdminTextarea } from "@/components/admin/fields";
import { cmsEnums } from "@/lib/site";
import { saveProjectAction } from "@/lib/actions/admin";
import { startCase, toFaqMultilineValue, toMultilineValue } from "@/lib/utils";

export function ProjectForm({
  project,
  builders,
}: {
  project?: Awaited<ReturnType<typeof import("@/lib/queries").getProjectById>>;
  builders: Awaited<ReturnType<typeof import("@/lib/queries").getBuilders>>;
}) {
  return (
    <form action={saveProjectAction} className="panel grid gap-5 p-8">
      <input type="hidden" name="id" value={project?.id ?? ""} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="Project Name" name="name" defaultValue={project?.name} required />
        <AdminField label="Slug" name="slug" defaultValue={project?.slug} placeholder="auto-generated if blank" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminSelect
          label="Builder"
          name="builderId"
          defaultValue={project?.builderId}
          options={[
            { label: "Select builder", value: "" },
            ...builders.map((builder) => ({ label: builder.name, value: builder.id })),
          ]}
        />
        <AdminSelect
          label="Possession Status"
          name="possessionStatus"
          defaultValue={project?.possessionStatus}
          options={cmsEnums.projectStatuses.map((status) => ({
            label: startCase(status),
            value: status,
          }))}
        />
      </div>
      <AdminField label="Location Label" name="location" defaultValue={project?.location} required />
      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Sector" name="sector" defaultValue={project?.sector} required />
        <AdminField label="City" name="city" defaultValue={project?.city ?? "Gurgaon"} />
        <AdminField label="State" name="state" defaultValue={project?.state ?? "Haryana"} />
        <AdminField label="Pin Code" name="pinCode" defaultValue={project?.pinCode} />
      </div>
      <AdminTextarea label="Description" name="description" defaultValue={project?.description} rows={5} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminTextarea label="Amenities" name="amenities" defaultValue={toMultilineValue((project?.amenities as string[]) ?? [])} placeholder="One item per line" />
        <AdminTextarea label="Configurations" name="configurations" defaultValue={toMultilineValue((project?.configurations as string[]) ?? [])} placeholder="One item per line" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminTextarea label="Investment Highlights" name="investmentHighlights" defaultValue={toMultilineValue((project?.investmentHighlights as string[]) ?? [])} placeholder="One item per line" />
        <AdminTextarea label="FAQ" name="faq" defaultValue={toFaqMultilineValue((project?.faq as { question: string; answer: string }[]) ?? [])} placeholder="Question|Answer" />
      </div>
      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Min Price" name="priceRangeMin" type="number" defaultValue={project?.priceRangeMin} />
        <AdminField label="Max Price" name="priceRangeMax" type="number" defaultValue={project?.priceRangeMax} />
        <AdminField label="Possession Timeline" name="possessionTimeline" defaultValue={project?.possessionTimeline} />
        <AdminField label="Map Query" name="mapQuery" defaultValue={project?.mapQuery} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="SEO Title" name="seoTitle" defaultValue={project?.seoTitle} />
        <AdminField label="SEO Description" name="seoDescription" defaultValue={project?.seoDescription} />
      </div>
      <button className="w-fit rounded-2xl bg-ink px-5 py-3 text-sm text-white">
        Save Project
      </button>
    </form>
  );
}
