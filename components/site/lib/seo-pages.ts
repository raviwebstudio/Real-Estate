import { PropertyStatus, PropertyTagType } from "@prisma/client";

import type { SeoLandingPageConfig } from "@/lib/types";

export const seoLandingPages: Record<string, SeoLandingPageConfig> = {
  "properties-in-gurgaon": {
    slug: "properties-in-gurgaon",
    title: "Properties in Gurgaon",
    metaTitle: "Properties in Gurgaon | Luxury Residential Listings",
    metaDescription:
      "Browse premium and investment-focused residential properties in Gurgaon with sector-level insights, ROI notes, and direct enquiry options.",
    intro:
      "Explore curated Gurgaon residential inventory across Golf Course Road, SPR, Dwarka Expressway, and New Gurgaon.",
    body: [
      "This page is built to capture broad residential intent while still helping high-intent buyers narrow down quickly by sector, configuration, and possession timeline.",
      "Every listing is supported by builder context, project information, nearby infrastructure markers, and lead conversion pathways including WhatsApp, call, brochure, and pricing requests.",
    ],
    faq: [
      {
        question: "What kinds of properties are listed in Gurgaon?",
        answer:
          "The platform focuses on residential and luxury inventory including apartments, residences within branded projects, and investor-oriented listings.",
      },
      {
        question: "Can I filter by sector and budget?",
        answer:
          "Yes. The listing experience is designed around sector, price band, status, and BHK-driven discovery.",
      },
    ],
    filters: {},
  },
  "luxury-apartments-in-gurgaon": {
    slug: "luxury-apartments-in-gurgaon",
    title: "Luxury Apartments in Gurgaon",
    metaTitle: "Luxury Apartments in Gurgaon | Premium Residential Homes",
    metaDescription:
      "Discover luxury apartments in Gurgaon with premium specifications, landmark builders, sector insights, and investor-focused narratives.",
    intro:
      "Curated luxury residences across Gurgaon for buyers prioritizing brand, location, lifestyle, and long-term value.",
    body: [
      "Luxury discovery needs more than visual polish. Buyers need clarity on builder credibility, project positioning, and sector growth trajectory.",
      "These pages surface the strongest residential opportunities with pricing cues, configuration depth, and conversion paths for site visits or brochure access.",
    ],
    faq: [
      {
        question: "Which sectors dominate Gurgaon luxury housing?",
        answer:
          "Golf Course Road, Golf Course Extension Road, and select Dwarka Expressway micro-markets remain among the strongest premium residential clusters.",
      },
      {
        question: "Are these apartments suitable for investors too?",
        answer:
          "Yes. Each relevant listing includes expected ROI, rental yield, and a focused investment highlights section.",
      },
    ],
    filters: {
      tag: PropertyTagType.LUXURY,
    },
  },
  "3-bhk-flats-in-gurgaon": {
    slug: "3-bhk-flats-in-gurgaon",
    title: "3 BHK Flats in Gurgaon",
    metaTitle: "3 BHK Flats in Gurgaon | Premium 3 Bedroom Homes",
    metaDescription:
      "Find 3 BHK flats in Gurgaon across premium projects with clear pricing, sizes, sector data, possession timelines, and direct enquiry options.",
    intro:
      "Focused inventory for buyers specifically searching for 3 BHK homes in Gurgaon’s premium residential corridors.",
    body: [
      "Configuration-led search is one of the highest-converting real estate intents, especially for families upgrading within Gurgaon.",
      "This landing page pairs inventory filtering with long-form, sector-specific context so the page ranks and converts at the same time.",
    ],
    faq: [
      {
        question: "Do the listings show variation-level sizes and pricing?",
        answer:
          "Yes. Property detail pages include variation tables for configuration, size, and indicative pricing wherever available.",
      },
      {
        question: "Can I compare ready-to-move and under-construction options?",
        answer:
          "Yes. Listing filters and possession status make it easy to compare both inventory types.",
      },
    ],
    filters: {
      bhk: "3 BHK",
    },
  },
  "ready-to-move-properties-in-gurgaon": {
    slug: "ready-to-move-properties-in-gurgaon",
    title: "Ready to Move Properties in Gurgaon",
    metaTitle: "Ready to Move Properties in Gurgaon | Move-In Luxury Homes",
    metaDescription:
      "Browse ready-to-move properties in Gurgaon with immediate possession, premium builders, location context, and buyer-focused lead CTAs.",
    intro:
      "Immediate possession homes for end users and investors who want clarity on delivery, rental readiness, and finished product quality.",
    body: [
      "Ready-to-move traffic is high-intent and often compares delivery certainty, community quality, and rental velocity.",
      "This page leans into those needs with clean filters, premium presentation, and strong enquiry pathways from mobile and desktop.",
    ],
    faq: [
      {
        question: "Why do ready-to-move properties convert well online?",
        answer:
          "Buyers can underwrite finished inventory faster because pricing, community quality, and immediate usability are easier to assess.",
      },
      {
        question: "Do these pages include investor notes?",
        answer:
          "Yes. Rental yield and investment highlights are surfaced wherever available.",
      },
    ],
    filters: {
      status: PropertyStatus.AVAILABLE,
    },
  },
};
