import type { MetadataRoute } from "next";

import {
  getBlogPosts,
  getBuilders,
  getProjects,
  getProperties,
  getSectorSlugs,
} from "@/lib/queries";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, projects, builders, posts, sectors] = await Promise.all([
    getProperties(),
    getProjects(),
    getBuilders(),
    getBlogPosts(),
    getSectorSlugs(),
  ]);

  const staticRoutes = [
    "/",
    "/about",
    "/properties",
    "/projects",
    "/builders",
    "/blog",
    "/contact",
    "/properties-in-gurgaon",
    "/luxury-apartments-in-gurgaon",
    "/3-bhk-flats-in-gurgaon",
    "/ready-to-move-properties-in-gurgaon",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/sitemap",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...properties.map((item) => ({
      url: `${siteConfig.baseUrl}/properties/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...projects.map((item) => ({
      url: `${siteConfig.baseUrl}/projects/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...builders.map((item) => ({
      url: `${siteConfig.baseUrl}/builders/${item.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...posts.map((item) => ({
      url: `${siteConfig.baseUrl}/blog/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...sectors.map((sector) => ({
      url: `${siteConfig.baseUrl}/gurgaon/${sector.toLowerCase().replace(/\s+/g, "-")}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
