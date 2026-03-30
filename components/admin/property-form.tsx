import { AdminField, AdminSelect, AdminTextarea } from "@/components/admin/fields";
import { savePropertyAction } from "@/lib/actions/admin";
import { cmsEnums } from "@/lib/site";
import {
  propertyTagLabel,
  startCase,
  toFaqMultilineValue,
  toMultilineValue,
  toNearbyMultilineValue,
  toVariationMultilineValue,
} from "@/lib/utils";

export function PropertyForm({
  property,
  builders,
  projects,
}: {
  property?: Awaited<ReturnType<typeof import("@/lib/queries").getPropertyById>>;
  builders: Awaited<ReturnType<typeof import("@/lib/queries").getBuilders>>;
  projects: Awaited<ReturnType<typeof import("@/lib/queries").getProjects>>;
}) {
  return (
    <form action={savePropertyAction} className="panel grid gap-5 p-8">
      <input type="hidden" name="id" value={property?.id ?? ""} />
      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="Property Title" name="title" defaultValue={property?.title} required />
        <AdminField label="Slug" name="slug" defaultValue={property?.slug} placeholder="auto-generated if blank" />
      </div>

      <AdminTextarea label="Excerpt" name="excerpt" defaultValue={property?.excerpt} rows={3} />
      <AdminTextarea label="Description" name="description" defaultValue={property?.description} rows={4} />
      <AdminTextarea label="Long-form Content (Markdown)" name="contentMarkdown" defaultValue={property?.contentMarkdown} rows={14} />

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminSelect
          label="Builder"
          name="builderId"
          defaultValue={property?.builderId}
          options={[
            { label: "Select builder", value: "" },
            ...builders.map((builder) => ({ label: builder.name, value: builder.id })),
          ]}
        />
        <AdminSelect
          label="Project"
          name="projectId"
          defaultValue={property?.projectId}
          options={[
            { label: "Select project", value: "" },
            ...projects.map((project) => ({ label: project.name, value: project.id })),
          ]}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Location Label" name="locationLabel" defaultValue={property?.locationLabel} />
        <AdminField label="Sector" name="sector" defaultValue={property?.sector} />
        <AdminField label="City" name="city" defaultValue={property?.city ?? "Gurgaon"} />
        <AdminField label="State" name="state" defaultValue={property?.state ?? "Haryana"} />
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Pin Code" name="pinCode" defaultValue={property?.pinCode} />
        <AdminField label="Property Type" name="propertyType" defaultValue={property?.propertyType} />
        <AdminSelect
          label="Status"
          name="status"
          defaultValue={property?.status}
          options={cmsEnums.propertyStatuses.map((status) => ({
            label: startCase(status),
            value: status,
          }))}
        />
        <AdminSelect
          label="Price Type"
          name="priceType"
          defaultValue={property?.priceType}
          options={cmsEnums.priceTypes.map((type) => ({
            label: startCase(type),
            value: type,
          }))}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Min Price" name="priceMin" type="number" defaultValue={property?.priceMin} />
        <AdminField label="Max Price" name="priceMax" type="number" defaultValue={property?.priceMax} />
        <AdminField label="Price Text" name="priceText" defaultValue={property?.priceText} />
        <AdminField label="RERA Number" name="reraNumber" defaultValue={property?.reraNumber} />
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Possession Status" name="possessionStatus" defaultValue={property?.possessionStatus} />
        <AdminField label="Possession Timeline" name="possessionTimeline" defaultValue={property?.possessionTimeline} />
        <AdminField label="Super Area" name="superArea" type="number" defaultValue={property?.superArea} />
        <AdminField label="Carpet Area" name="carpetArea" type="number" defaultValue={property?.carpetArea} />
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <AdminField label="Expected ROI %" name="expectedRoi" type="number" defaultValue={property?.expectedRoi} />
        <AdminField label="Rental Yield %" name="rentalYield" type="number" defaultValue={property?.rentalYield} />
        <AdminField label="Map Query" name="mapQuery" defaultValue={property?.mapQuery} />
        <AdminField label="Brochure URL" name="brochureUrl" defaultValue={property?.brochureUrl} />
      </div>

      <AdminTextarea label="Why Invest" name="whyInvest" defaultValue={property?.whyInvest} rows={5} />

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminTextarea
          label="Amenities"
          name="amenities"
          defaultValue={toMultilineValue(property?.amenities ?? [])}
          placeholder="One item per line"
        />
        <AdminTextarea
          label="Highlights"
          name="highlights"
          defaultValue={toMultilineValue(property?.highlights ?? [])}
          placeholder="One item per line"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminTextarea
          label="Investment Highlights"
          name="investmentHighlights"
          defaultValue={toMultilineValue(property?.investmentHighlights ?? [])}
          placeholder="One item per line"
        />
        <AdminTextarea
          label="Nearby Places"
          name="nearbyPlaces"
          defaultValue={toNearbyMultilineValue(property?.nearbyPlaces ?? [])}
          placeholder="Category|Name|Distance"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminTextarea
          label="Variations"
          name="variations"
          defaultValue={toVariationMultilineValue(
            property?.variations.map((item) => ({
              label: item.label,
              sizeSqft: item.sizeSqft,
              price: item.price,
              status: item.status,
            })) ?? [],
          )}
          placeholder="Label|SizeSqft|Price|Status"
        />
        <AdminTextarea
          label="FAQ"
          name="faq"
          defaultValue={toFaqMultilineValue(property?.faq ?? [])}
          placeholder="Question|Answer"
        />
      </div>

      <div className="grid gap-4">
        <p className="text-sm font-medium text-ink">Tags</p>
        <div className="flex flex-wrap gap-3">
          {cmsEnums.propertyTags.map((tag) => (
            <label key={tag} className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-taupe">
              <input
                type="checkbox"
                name="tags"
                value={tag}
                defaultChecked={property?.tagList?.includes(tag)}
              />
              {propertyTagLabel(tag)}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-ink">
          <span className="font-medium">Upload Images</span>
          <input type="file" name="images" accept="image/*" multiple className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm" />
        </label>

        {property?.images?.length ? (
          <div className="grid gap-4">
            <label className="flex items-center gap-3 text-sm text-taupe">
              <input type="checkbox" name="replaceGallery" />
              Replace existing gallery when new images are uploaded
            </label>
            <div className="grid gap-3 lg:grid-cols-2">
              {property.images.map((image) => (
                <label key={image.id} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-taupe">
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate">{image.url}</span>
                    <span>{image.orientation}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="checkbox" name="removeImageIds" value={image.id} />
                    Remove this image
                  </div>
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminField label="SEO Title" name="seoTitle" defaultValue={property?.seoTitle} />
        <AdminField label="SEO Description" name="seoDescription" defaultValue={property?.seoDescription} />
      </div>

      <button className="w-fit rounded-2xl bg-ink px-5 py-3 text-sm text-white">
        Save Property
      </button>
    </form>
  );
}
