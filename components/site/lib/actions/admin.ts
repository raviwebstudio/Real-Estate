"use server";

import { unlink, mkdir } from "node:fs/promises";
import path from "node:path";

import {
  BlogCategory,
  PriceType,
  ProjectStatus,
  PropertyStatus,
  PropertyTagType,
} from "@prisma/client";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  parseFaqText,
  parseNearbyText,
  parseVariationText,
  getNumber,
  getOptionalString,
  getString,
  getTextAreaLines,
} from "@/lib/form-parser";
import {
  authenticateAdmin,
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import type { AdminLoginState } from "@/lib/types";

const adminDefaultState: AdminLoginState = {
  status: "idle",
};

function parseEnumValue<T extends string>(
  value: string,
  values: readonly T[],
  fallback: T,
) {
  return values.includes(value as T) ? (value as T) : fallback;
}

async function processPropertyImages(
  files: File[],
  propertySlug: string,
  propertyTitle: string,
) {
  if (!files.length) {
    return [];
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  return Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const image = sharp(buffer).rotate();
      const metadata = await image.metadata();
      const width = metadata.width ?? 1600;
      const height = metadata.height ?? 900;
      const orientation = width >= height ? "LANDSCAPE" : "PORTRAIT";
      const filename = `${propertySlug}-${Date.now()}-${index}.webp`;
      const absolutePath = path.join(uploadDir, filename);

      await image
        .resize({
          width: orientation === "LANDSCAPE" ? 1600 : 1100,
          height: orientation === "LANDSCAPE" ? 1100 : 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toFile(absolutePath);

      const finalMeta = await sharp(absolutePath).metadata();

      return {
        url: `/uploads/${filename}`,
        alt: `${propertyTitle} gallery image ${index + 1}`,
        orientation,
        width: finalMeta.width ?? width,
        height: finalMeta.height ?? height,
        sortOrder: index,
      };
    }),
  );
}

async function removeLocalFiles(urls: string[]) {
  await Promise.all(
    urls
      .filter((url) => url.startsWith("/uploads/"))
      .map(async (url) => {
        const absolutePath = path.join(
          process.cwd(),
          "public",
          url.replace(/^\//, ""),
        );
        try {
          await unlink(absolutePath);
        } catch {
          // Ignore missing files during cleanup.
        }
      }),
  );
}

function revalidateGlobalPaths() {
  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/projects");
  revalidatePath("/builders");
  revalidatePath("/blog");
  revalidatePath("/properties-in-gurgaon");
  revalidatePath("/luxury-apartments-in-gurgaon");
  revalidatePath("/3-bhk-flats-in-gurgaon");
  revalidatePath("/ready-to-move-properties-in-gurgaon");
}

export async function loginAction(
  _state: AdminLoginState = adminDefaultState,
  formData: FormData,
): Promise<AdminLoginState> {
  void _state;
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    return {
      status: "error",
      message: "Please enter both email and password.",
    };
  }

  const isValid = await authenticateAdmin(email, password);

  if (!isValid) {
    return {
      status: "error",
      message: "Invalid credentials. Please try again.",
    };
  }

  await createAdminSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function saveBuilderAction(formData: FormData) {
  await requireAdmin();

  const id = getOptionalString(formData, "id");
  const name = getString(formData, "name");

  if (!name) {
    throw new Error("Builder name is required.");
  }

  const slug = toSlug(getOptionalString(formData, "slug") || name);
  const data = {
    name,
    slug,
    description: getString(formData, "description"),
    overview: getOptionalString(formData, "overview"),
    seoTitle: getOptionalString(formData, "seoTitle"),
    seoDescription: getOptionalString(formData, "seoDescription"),
  };

  if (id) {
    await prisma.builder.update({
      where: { id },
      data,
    });
  } else {
    await prisma.builder.create({
      data,
    });
  }

  revalidateGlobalPaths();
  revalidatePath(`/builders/${slug}`);
  redirect("/admin/builders");
}

export async function deleteBuilderAction(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) throw new Error("Builder id is required.");

  await prisma.builder.delete({
    where: { id },
  });

  revalidateGlobalPaths();
  redirect("/admin/builders");
}

export async function saveProjectAction(formData: FormData) {
  await requireAdmin();

  const id = getOptionalString(formData, "id");
  const name = getString(formData, "name");
  const builderId = getString(formData, "builderId");

  if (!name || !builderId) {
    throw new Error("Project name and builder are required.");
  }

  const slug = toSlug(getOptionalString(formData, "slug") || name);
  const projectStatus = parseEnumValue(
    getString(formData, "possessionStatus"),
    Object.values(ProjectStatus),
    ProjectStatus.UNDER_CONSTRUCTION,
  );

  const data = {
    name,
    slug,
    builderId,
    location: getString(formData, "location"),
    sector: getString(formData, "sector"),
    city: getString(formData, "city") || "Gurgaon",
    state: getString(formData, "state") || "Haryana",
    pinCode: getOptionalString(formData, "pinCode"),
    description: getString(formData, "description"),
    amenities: getTextAreaLines(formData, "amenities"),
    configurations: getTextAreaLines(formData, "configurations"),
    investmentHighlights: getTextAreaLines(formData, "investmentHighlights"),
    priceRangeMin: getNumber(formData, "priceRangeMin"),
    priceRangeMax: getNumber(formData, "priceRangeMax"),
    possessionStatus: projectStatus,
    possessionTimeline: getString(formData, "possessionTimeline"),
    mapQuery: getOptionalString(formData, "mapQuery"),
    seoTitle: getOptionalString(formData, "seoTitle"),
    seoDescription: getOptionalString(formData, "seoDescription"),
    faq: parseFaqText(getTextAreaLines(formData, "faq")),
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data,
    });
  } else {
    await prisma.project.create({
      data,
    });
  }

  revalidateGlobalPaths();
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) throw new Error("Project id is required.");

  await prisma.project.delete({
    where: { id },
  });

  revalidateGlobalPaths();
  redirect("/admin/projects");
}

export async function saveBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = getOptionalString(formData, "id");
  const title = getString(formData, "title");

  if (!title) {
    throw new Error("Blog title is required.");
  }

  const slug = toSlug(getOptionalString(formData, "slug") || title);
  const category = parseEnumValue(
    getString(formData, "category"),
    Object.values(BlogCategory),
    BlogCategory.GURGAON_INSIGHTS,
  );

  const data = {
    title,
    slug,
    excerpt: getString(formData, "excerpt"),
    content: getString(formData, "content"),
    category,
    coverImage: getOptionalString(formData, "coverImage"),
    coverAlt: getOptionalString(formData, "coverAlt"),
    seoTitle: getOptionalString(formData, "seoTitle"),
    seoDescription: getOptionalString(formData, "seoDescription"),
    relatedLink: getOptionalString(formData, "relatedLink"),
    publishedAt: new Date(getString(formData, "publishedAt") || Date.now()),
  };

  if (id) {
    await prisma.blogPost.update({
      where: { id },
      data,
    });
  } else {
    await prisma.blogPost.create({
      data,
    });
  }

  revalidateGlobalPaths();
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) throw new Error("Blog post id is required.");

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidateGlobalPaths();
  redirect("/admin/blog");
}

export async function savePropertyAction(formData: FormData) {
  await requireAdmin();

  const id = getOptionalString(formData, "id");
  const title = getString(formData, "title");

  if (!title) {
    throw new Error("Property title is required.");
  }

  const slug = toSlug(getOptionalString(formData, "slug") || title);
  const propertyStatus = parseEnumValue(
    getString(formData, "status"),
    Object.values(PropertyStatus),
    PropertyStatus.AVAILABLE,
  );
  const priceType = parseEnumValue(
    getString(formData, "priceType"),
    Object.values(PriceType),
    PriceType.ON_REQUEST,
  );
  const selectedTags = formData
    .getAll("tags")
    .map((item) => item.toString())
    .filter((tag): tag is PropertyTagType =>
      Object.values(PropertyTagType).includes(tag as PropertyTagType),
    );
  const variations = parseVariationText(getTextAreaLines(formData, "variations"));
  const removeImageIds = formData
    .getAll("removeImageIds")
    .map((item) => item.toString())
    .filter(Boolean);
  const replaceGallery = getString(formData, "replaceGallery") === "on";
  const uploadFiles = formData
    .getAll("images")
    .filter((item): item is File => item instanceof File && item.size > 0);

  const newImages = await processPropertyImages(uploadFiles, slug, title);
  const removedFileUrls: string[] = [];

  const propertyData = {
    title,
    slug,
    excerpt: getString(formData, "excerpt"),
    description: getString(formData, "description"),
    contentMarkdown: getString(formData, "contentMarkdown"),
    locationLabel: getString(formData, "locationLabel"),
    sector: getString(formData, "sector"),
    city: getString(formData, "city") || "Gurgaon",
    state: getString(formData, "state") || "Haryana",
    pinCode: getOptionalString(formData, "pinCode"),
    priceMin: getNumber(formData, "priceMin"),
    priceMax: getNumber(formData, "priceMax"),
    priceText: getOptionalString(formData, "priceText"),
    priceType,
    propertyType: getString(formData, "propertyType"),
    status: propertyStatus,
    possessionStatus: getString(formData, "possessionStatus"),
    possessionTimeline: getString(formData, "possessionTimeline"),
    superArea: getNumber(formData, "superArea"),
    carpetArea: getNumber(formData, "carpetArea"),
    expectedRoi: getNumber(formData, "expectedRoi"),
    rentalYield: getNumber(formData, "rentalYield"),
    whyInvest: getString(formData, "whyInvest"),
    investmentHighlights: getTextAreaLines(formData, "investmentHighlights"),
    amenities: getTextAreaLines(formData, "amenities"),
    highlights: getTextAreaLines(formData, "highlights"),
    nearbyPlaces: parseNearbyText(getTextAreaLines(formData, "nearbyPlaces")),
    faq: parseFaqText(getTextAreaLines(formData, "faq")),
    mapQuery: getOptionalString(formData, "mapQuery"),
    reraNumber: getOptionalString(formData, "reraNumber"),
    brochureUrl: getOptionalString(formData, "brochureUrl"),
    seoTitle: getOptionalString(formData, "seoTitle"),
    seoDescription: getOptionalString(formData, "seoDescription"),
    builderId: getOptionalString(formData, "builderId"),
    projectId: getOptionalString(formData, "projectId"),
  };

  const result = await prisma.$transaction(async (tx) => {
    const property = id
      ? await tx.property.update({
          where: { id },
          data: propertyData,
        })
      : await tx.property.create({
          data: propertyData,
        });

    await tx.propertyVariation.deleteMany({
      where: {
        propertyId: property.id,
      },
    });

    if (variations.length) {
      await tx.propertyVariation.createMany({
        data: variations.map((variation, index) => ({
          propertyId: property.id,
          label: variation.label,
          sizeSqft: variation.sizeSqft,
          price: variation.price,
          status: variation.status,
          sortOrder: index,
        })),
      });
    }

    await tx.propertyTag.deleteMany({
      where: {
        propertyId: property.id,
      },
    });

    if (selectedTags.length) {
      await tx.propertyTag.createMany({
        data: selectedTags.map((tag) => ({
          propertyId: property.id,
          tag,
        })),
      });
    }

    if (replaceGallery) {
      const existingImages = await tx.propertyImage.findMany({
        where: { propertyId: property.id },
      });
      removedFileUrls.push(...existingImages.map((image) => image.url));

      await tx.propertyImage.deleteMany({
        where: {
          propertyId: property.id,
        },
      });
    } else if (removeImageIds.length) {
      const existingImages = await tx.propertyImage.findMany({
        where: {
          id: {
            in: removeImageIds,
          },
        },
      });
      removedFileUrls.push(...existingImages.map((image) => image.url));

      await tx.propertyImage.deleteMany({
        where: {
          id: {
            in: removeImageIds,
          },
        },
      });
    }

    if (newImages.length) {
      const existingCount = await tx.propertyImage.count({
        where: {
          propertyId: property.id,
        },
      });

      await tx.propertyImage.createMany({
        data: newImages.map((image, index) => ({
          propertyId: property.id,
          ...image,
          sortOrder: existingCount + index,
        })),
      });
    }

    return property;
  });

  await removeLocalFiles(removedFileUrls);

  revalidateGlobalPaths();
  revalidatePath(`/properties/${slug}`);
  redirect(`/admin/properties/${result.id}`);
}

export async function deletePropertyAction(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) throw new Error("Property id is required.");

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  await prisma.property.delete({
    where: { id },
  });

  await removeLocalFiles(property.images.map((image) => image.url));

  revalidateGlobalPaths();
  revalidatePath(`/properties/${property.slug}`);
  redirect("/admin/properties");
}
