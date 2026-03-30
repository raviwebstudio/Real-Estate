import type { Metadata } from "next";

import { buildAbsoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: MetadataInput): Metadata {
  const canonical = buildAbsoluteUrl(path);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.baseUrl),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
