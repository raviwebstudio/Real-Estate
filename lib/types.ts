import type {
  BlogCategory,
  LeadType,
  PriceType,
  ProjectStatus,
  PropertyStatus,
  PropertyTagType,
} from "@prisma/client";

export type NearbyPlace = {
  category: string;
  name: string;
  distance: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type VariationInput = {
  label: string;
  sizeSqft: number;
  price: number | null;
  status: string | null;
};

export type PropertyFilters = {
  location?: string;
  bhk?: string;
  propertyType?: string;
  status?: PropertyStatus | "";
  minPrice?: number;
  maxPrice?: number;
  tag?: PropertyTagType | "";
};

export type SeoLandingPageConfig = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string[];
  faq: FaqItem[];
  filters: {
    bhk?: string;
    status?: PropertyStatus;
    tag?: PropertyTagType;
  };
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type AdminLoginState = {
  status: "idle" | "error";
  message?: string;
};

export type PriceBadgeInput = {
  priceMin: number | null;
  priceMax: number | null;
  priceText: string | null;
  priceType: PriceType;
};

export type CmsEnums = {
  blogCategories: BlogCategory[];
  leadTypes: LeadType[];
  projectStatuses: ProjectStatus[];
  propertyStatuses: PropertyStatus[];
  propertyTags: PropertyTagType[];
  priceTypes: PriceType[];
};
