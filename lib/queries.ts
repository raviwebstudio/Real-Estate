import {
  type BlogPost,
  type Builder,
  type Lead,
  Prisma,
  type Project,
  type Property,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { safeFaqArray, safeNearbyPlaces, safeStringArray } from "@/lib/utils";
import type { DashboardMetric, PropertyFilters } from "@/lib/types";

const propertyInclude = {
  builder: true,
  project: true,
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  variations: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  tags: {
    orderBy: {
      tag: "asc",
    },
  },
} satisfies Prisma.PropertyInclude;

export type PropertyWithRelations = Prisma.PropertyGetPayload<{
  include: typeof propertyInclude;
}>;

export type BuilderWithProjects = Prisma.BuilderGetPayload<{
  include: {
    projects: {
      include: {
        properties: true;
      };
    };
    properties: true;
  };
}>;

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    builder: true;
    properties: {
      include: typeof propertyInclude;
    };
  };
}>;

export type BlogPostSummary = BlogPost;
export type LeadWithProperty = Prisma.LeadGetPayload<{
  include: {
    property: true;
  };
}>;

export function serializeProperty(property: PropertyWithRelations) {
  return {
    ...property,
    amenities: safeStringArray(property.amenities),
    highlights: safeStringArray(property.highlights),
    investmentHighlights: safeStringArray(property.investmentHighlights),
    nearbyPlaces: safeNearbyPlaces(property.nearbyPlaces),
    faq: safeFaqArray(property.faq),
    tagList: property.tags.map((item) => item.tag),
  };
}

export function serializeProject(project: ProjectWithRelations) {
  return {
    ...project,
    amenities: safeStringArray(project.amenities),
    configurations: safeStringArray(project.configurations),
    investmentHighlights: safeStringArray(project.investmentHighlights),
    faq: safeFaqArray(project.faq),
    properties: project.properties.map(serializeProperty),
  };
}

function buildPropertyWhere(filters: PropertyFilters = {}): Prisma.PropertyWhereInput {
  const and: Prisma.PropertyWhereInput[] = [];

  if (filters.location) {
    and.push({
      OR: [
        { sector: { contains: filters.location } },
        { city: { contains: filters.location } },
        { locationLabel: { contains: filters.location } },
        { title: { contains: filters.location } },
      ],
    });
  }

  if (filters.bhk) {
    and.push({
      variations: {
        some: {
          label: {
            contains: filters.bhk,
          },
        },
      },
    });
  }

  if (filters.propertyType) {
    and.push({
      propertyType: {
        contains: filters.propertyType,
      },
    });
  }

  if (filters.status) {
    and.push({
      status: filters.status,
    });
  }

  if (filters.tag) {
    and.push({
      tags: {
        some: {
          tag: filters.tag,
        },
      },
    });
  }

  if (filters.minPrice != null) {
    and.push({
      OR: [
        {
          priceMin: {
            gte: filters.minPrice,
          },
        },
        {
          priceMax: {
            gte: filters.minPrice,
          },
        },
      ],
    });
  }

  if (filters.maxPrice != null) {
    and.push({
      OR: [
        {
          priceMin: {
            lte: filters.maxPrice,
          },
        },
        {
          priceMax: {
            lte: filters.maxPrice,
          },
        },
      ],
    });
  }

  return and.length ? { AND: and } : {};
}

export async function getFeaturedProperties(limit = 3) {
  const properties = await prisma.property.findMany({
    where: {
      tags: {
        some: {
          tag: "FEATURED",
        },
      },
    },
    include: propertyInclude,
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return properties.map(serializeProperty);
}

export async function getProperties(filters: PropertyFilters = {}) {
  const properties = await prisma.property.findMany({
    where: buildPropertyWhere(filters),
    include: propertyInclude,
    orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
  });

  return properties.map(serializeProperty);
}

export async function getPropertyBySlug(slug: string) {
  const property = await prisma.property.findUnique({
    where: { slug },
    include: propertyInclude,
  });

  return property ? serializeProperty(property) : null;
}

export async function getPropertyById(id: string) {
  const property = await prisma.property.findUnique({
    where: { id },
    include: propertyInclude,
  });

  return property ? serializeProperty(property) : null;
}

export async function getRelatedProperties(
  propertyId: string,
  projectId?: string | null,
  builderId?: string | null,
) {
  const properties = await prisma.property.findMany({
    where: {
      id: { not: propertyId },
      OR: [
        projectId ? { projectId } : undefined,
        builderId ? { builderId } : undefined,
      ].filter(Boolean) as Prisma.PropertyWhereInput[],
    },
    include: propertyInclude,
    take: 3,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return properties.map(serializeProperty);
}

export async function getBuilders() {
  const builders = await prisma.builder.findMany({
    include: {
      projects: {
        include: {
          properties: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
      properties: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return builders;
}

export async function getBuilderBySlug(slug: string) {
  return prisma.builder.findUnique({
    where: { slug },
    include: {
      projects: {
        include: {
          properties: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
      properties: true,
    },
  });
}

export async function getBuilderById(id: string) {
  return prisma.builder.findUnique({
    where: { id },
    include: {
      projects: {
        orderBy: {
          updatedAt: "desc",
        },
      },
      properties: true,
    },
  });
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      builder: true,
      properties: {
        include: propertyInclude,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return projects.map(serializeProject);
}

export async function getProjectBySlug(slug: string) {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      builder: true,
      properties: {
        include: propertyInclude,
      },
    },
  });

  return project ? serializeProject(project) : null;
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      builder: true,
      properties: true,
    },
  });
}

export async function getBlogPosts(limit?: number) {
  return prisma.blogPost.findMany({
    take: limit,
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
  });
}

export async function getLeads() {
  return prisma.lead.findMany({
    include: {
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFilterFacets() {
  const [properties, sectors] = await Promise.all([
    prisma.property.findMany({
      select: {
        propertyType: true,
        status: true,
      },
      distinct: ["propertyType", "status"],
    }),
    prisma.property.findMany({
      select: {
        sector: true,
      },
      distinct: ["sector"],
      orderBy: {
        sector: "asc",
      },
    }),
  ]);

  const propertyTypes = [...new Set(properties.map((item) => item.propertyType))];
  const statuses = [...new Set(properties.map((item) => item.status))];

  return {
    sectors: sectors.map((item) => item.sector).filter(Boolean),
    propertyTypes,
    statuses,
  };
}

export async function getSectorSlugs() {
  const sectors = await prisma.property.findMany({
    select: {
      sector: true,
    },
    distinct: ["sector"],
  });

  return sectors.map((item) => item.sector);
}

export async function getSectorProperties(sector: string) {
  return getProperties({ location: sector });
}

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  const [properties, projects, builders, posts, leads] = await Promise.all([
    prisma.property.count(),
    prisma.project.count(),
    prisma.builder.count(),
    prisma.blogPost.count(),
    prisma.lead.count(),
  ]);

  return [
    {
      label: "Properties",
      value: properties.toString(),
      detail: "Residential listings managed in the CMS.",
    },
    {
      label: "Projects",
      value: projects.toString(),
      detail: "Project-level landing pages and detail pages.",
    },
    {
      label: "Builders",
      value: builders.toString(),
      detail: "Builder profiles with linked projects.",
    },
    {
      label: "Insights",
      value: posts.toString(),
      detail: "SEO blog posts available to index and share.",
    },
    {
      label: "Leads",
      value: leads.toString(),
      detail: "Buyer and investor enquiries stored in the database.",
    },
  ];
}

export async function getAdminCollections() {
  const [builders, projects, properties, posts] = await Promise.all([
    prisma.builder.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.project.findMany({
      include: {
        builder: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.property.findMany({
      include: {
        builder: true,
        project: true,
        tags: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.blogPost.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    }),
  ]);

  return { builders, projects, properties, posts };
}

export type BuilderRecord = Builder;
export type ProjectRecord = Project;
export type PropertyRecord = Property;
export type LeadRecord = Lead;
