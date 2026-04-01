"use server";

import { LeadType } from "@prisma/client";

import { leadSchema } from "@/lib/form-parser";
import { prisma } from "@/lib/prisma";
import type { LeadFormState } from "@/lib/types";

const defaultState: LeadFormState = {
  status: "idle",
};

export async function submitLeadAction(
  _state: LeadFormState = defaultState,
  formData: FormData,
): Promise<LeadFormState> {
  void _state;
  const result = leadSchema.safeParse({
    propertyId: formData.get("propertyId")?.toString() || undefined,
    leadType: formData.get("leadType")?.toString() || LeadType.GENERAL,
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    message: formData.get("message")?.toString() || "",
    sourcePage: formData.get("sourcePage")?.toString() || "",
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Please complete the required details before submitting.",
    };
  }

  await prisma.lead.create({
    data: {
      propertyId: result.data.propertyId,
      leadType: result.data.leadType,
      name: result.data.name.trim(),
      email: result.data.email?.trim() || null,
      phone: result.data.phone.trim(),
      message: result.data.message?.trim() || null,
      sourcePage: result.data.sourcePage?.trim() || null,
    },
  });

  return {
    status: "success",
    message: "Your enquiry has been received. Our team will contact you shortly.",
  };
}
