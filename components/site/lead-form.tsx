"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitLeadAction } from "@/lib/actions/lead";
import type { LeadFormState } from "@/lib/types";

const initialState: LeadFormState = { status: "idle" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
    >
      {pending ? "Submitting..." : label}
    </button>
  );
}

export function LeadForm({
  propertyId,
  leadType,
  sourcePage,
  title = "Enquire Now",
  description = "Share your details and our team will get back with pricing, brochure, or site visit options.",
}: {
  propertyId?: string;
  leadType: "GENERAL" | "GET_PRICE" | "DOWNLOAD_BROCHURE" | "BOOK_SITE_VISIT";
  sourcePage: string;
  title?: string;
  description?: string;
}) {
  const [state, action] = useActionState(submitLeadAction, initialState);

  return (
    <div className="panel p-6">
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-taupe">{description}</p>

      <form action={action} className="mt-6 grid gap-4">
        <input type="hidden" name="propertyId" value={propertyId ?? ""} />
        <input type="hidden" name="leadType" value={leadType} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <input
          name="name"
          placeholder="Full name"
          required
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
        />
        <input
          name="phone"
          placeholder="Phone number"
          required
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
        />
        <input
          name="email"
          placeholder="Email address"
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
        />
        <textarea
          name="message"
          placeholder="What would you like to know?"
          rows={4}
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
        />
        <SubmitButton label={title} />
        {state.message ? (
          <p
            className={
              state.status === "success" ? "text-sm text-green-700" : "text-sm text-red-600"
            }
          >
            {state.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
