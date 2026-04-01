import { z } from "zod";

import type { FaqItem, NearbyPlace, VariationInput } from "@/lib/types";

export function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

export function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

export function getNumber(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) return null;

  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function getTextAreaLines(formData: FormData, key: string) {
  return getString(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseFaqText(lines: string[]): FaqItem[] {
  return lines
    .map((line) => {
      const [question, ...rest] = line.split("|");
      const answer = rest.join("|");

      if (!question?.trim() || !answer?.trim()) {
        return null;
      }

      return {
        question: question.trim(),
        answer: answer.trim(),
      };
    })
    .filter((item): item is FaqItem => Boolean(item));
}

export function parseNearbyText(lines: string[]): NearbyPlace[] {
  return lines
    .map((line) => {
      const [category, name, ...rest] = line.split("|");
      const distance = rest.join("|");

      if (!category?.trim() || !name?.trim() || !distance?.trim()) {
        return null;
      }

      return {
        category: category.trim(),
        name: name.trim(),
        distance: distance.trim(),
      };
    })
    .filter((item): item is NearbyPlace => Boolean(item));
}

export function parseVariationText(lines: string[]): VariationInput[] {
  return lines
    .map((line) => {
      const [label, sizeSqft, price, status] = line.split("|");

      if (!label?.trim() || !sizeSqft?.trim()) {
        return null;
      }

      const parsedSize = Number(sizeSqft.replace(/,/g, ""));
      const parsedPrice =
        price?.trim() && Number.isFinite(Number(price.replace(/,/g, "")))
          ? Number(price.replace(/,/g, ""))
          : null;

      if (!Number.isFinite(parsedSize)) {
        return null;
      }

      return {
        label: label.trim(),
        sizeSqft: parsedSize,
        price: parsedPrice,
        status: status?.trim() ? status.trim() : null,
      };
    })
    .filter((item): item is VariationInput => Boolean(item));
}

export const leadSchema = z.object({
  propertyId: z.string().optional(),
  leadType: z.enum([
    "GENERAL",
    "GET_PRICE",
    "DOWNLOAD_BROCHURE",
    "BOOK_SITE_VISIT",
  ]),
  name: z.string().min(2),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^[+\d][\d\s-]+$/),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
});
