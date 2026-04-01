import { clsx, type ClassValue } from "clsx";
import { PropertyTagType } from "@prisma/client";
import slugify from "slugify";

import { siteConfig } from "@/lib/site";
import type {
  FaqItem,
  NearbyPlace,
  PriceBadgeInput,
  VariationInput,
} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function toSlug(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true });
}

export function formatINR(value: number | null | undefined) {
  if (value == null) return "On request";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompactINR(value: number | null | undefined) {
  if (value == null) return "On request";

  if (value >= 10000000) {
    return `INR ${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 2)} Cr`;
  }

  if (value >= 100000) {
    return `INR ${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 2)} L`;
  }

  return formatINR(value);
}

export function buildAbsoluteUrl(path = "/") {
  return new URL(path, siteConfig.baseUrl).toString();
}

export function safeStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function safeFaqArray(input: unknown): FaqItem[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "question" in item &&
        "answer" in item &&
        typeof item.question === "string" &&
        typeof item.answer === "string"
      ) {
        return {
          question: item.question.trim(),
          answer: item.answer.trim(),
        };
      }

      return null;
    })
    .filter((item): item is FaqItem => Boolean(item?.question && item.answer));
}

export function safeNearbyPlaces(input: unknown): NearbyPlace[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => {
      if (
        item &&
        typeof item === "object" &&
        "category" in item &&
        "name" in item &&
        "distance" in item &&
        typeof item.category === "string" &&
        typeof item.name === "string" &&
        typeof item.distance === "string"
      ) {
        return {
          category: item.category.trim(),
          name: item.name.trim(),
          distance: item.distance.trim(),
        };
      }

      return null;
    })
    .filter(
      (item): item is NearbyPlace =>
        Boolean(item?.category && item.name && item.distance),
    );
}

export function toMultilineValue(values: string[]) {
  return values.join("\n");
}

export function toFaqMultilineValue(values: FaqItem[]) {
  return values.map((item) => `${item.question}|${item.answer}`).join("\n");
}

export function toNearbyMultilineValue(values: NearbyPlace[]) {
  return values
    .map((item) => `${item.category}|${item.name}|${item.distance}`)
    .join("\n");
}

export function toVariationMultilineValue(values: VariationInput[]) {
  return values
    .map((item) =>
      [item.label, item.sizeSqft, item.price ?? "", item.status ?? ""].join("|"),
    )
    .join("\n");
}

export function priceLabel(input: PriceBadgeInput) {
  if (input.priceType === "ON_REQUEST") {
    return input.priceText?.trim() || "Price on request";
  }

  if (input.priceMin && input.priceMax && input.priceMin !== input.priceMax) {
    return `${formatCompactINR(input.priceMin)} - ${formatCompactINR(input.priceMax)}`;
  }

  if (input.priceMin) {
    return formatCompactINR(input.priceMin);
  }

  if (input.priceMax) {
    return formatCompactINR(input.priceMax);
  }

  return input.priceText?.trim() || "Price on request";
}

export function startCase(value: string) {
  return value
    .toLowerCase()
    .split(/[_-]/g)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}

export function propertyTagLabel(tag: PropertyTagType) {
  return startCase(tag);
}

export function whatsappPropertyLink(title: string, slug: string) {
  const message = encodeURIComponent(
    `Hi, I would like details for ${title}. ${buildAbsoluteUrl(`/properties/${slug}`)}`,
  );

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}

export function telLink() {
  return `tel:${siteConfig.phone.replace(/\s+/g, "")}`;
}
