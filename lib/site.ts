import {
  BlogCategory,
  LeadType,
  PriceType,
  ProjectStatus,
  PropertyStatus,
  PropertyTagType,
} from "@prisma/client";

import type { CmsEnums, FaqItem } from "@/lib/types";

const fallbackSiteUrl = "https://www.gurgaonresidences.com";

export const siteConfig = {
  name: "Gurgaon Residences",
  title: "Luxury Residential Property in Gurgaon",
  description:
    "Premium real estate platform for luxury apartments, ready-to-move homes, and high-conviction investment opportunities in Gurgaon.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 99710 11488",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@gurgaonresidences.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919971011488",
  tagline: "Luxury homes. Investor clarity. Sector-first Gurgaon guidance.",
};

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
  { href: "/projects", label: "Projects" },
  { href: "/builders", label: "Builders" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNavigation = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ],
  explore: [
    { href: "/properties-in-gurgaon", label: "Properties in Gurgaon" },
    { href: "/luxury-apartments-in-gurgaon", label: "Luxury Apartments" },
    { href: "/3-bhk-flats-in-gurgaon", label: "3 BHK Flats" },
    { href: "/ready-to-move-properties-in-gurgaon", label: "Ready to Move" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/sitemap", label: "HTML Sitemap" },
  ],
};

export const serviceHighlights = [
  {
    title: "Buyer Advisory",
    description:
      "Shortlist premium homes based on sector, lifestyle requirements, and builder credibility.",
  },
  {
    title: "Investor Strategy",
    description:
      "Underwrite yield, resale upside, and possession cycles with a Gurgaon-first lens.",
  },
  {
    title: "Project Due Diligence",
    description:
      "RERA checks, builder track record, possession clarity, and comparative pricing support.",
  },
  {
    title: "Site Visit Concierge",
    description:
      "High-intent call scheduling, WhatsApp follow-up, and curated site visit planning.",
  },
] as const;

export const testimonials = [
  {
    name: "Aarav Bhatia",
    role: "NRI Investor, Singapore",
    quote:
      "The platform made Gurgaon inventory feel understandable. The ROI lens and sector-level comparison saved weeks.",
  },
  {
    name: "Rhea Malhotra",
    role: "End User, Golf Course Extension Road",
    quote:
      "Every property page felt transparent. We had pricing guidance, nearby infrastructure, and builder credibility in one place.",
  },
  {
    name: "Nikhil Arora",
    role: "Family Office Advisor",
    quote:
      "Premium design is great, but what stood out was the structure. Projects, builders, and lead workflows are all set up to scale.",
  },
] as const;

export const homeFaqs: FaqItem[] = [
  {
    question:
      "Which Gurgaon sectors are strongest for luxury residential investment?",
    answer:
      "Golf Course Road, Golf Course Extension Road, Southern Peripheral Road, New Gurgaon, and Dwarka Expressway continue to draw premium demand for both end use and investment.",
  },
  {
    question:
      "Do you cover ready-to-move as well as under-construction inventory?",
    answer:
      "Yes. The platform supports both, with possession timelines, status tags, and investor notes visible on every property page.",
  },
  {
    question: "Can buyers enquire directly from a property page?",
    answer:
      "Yes. Each listing includes lead capture for pricing, brochure requests, and site visits, along with WhatsApp and mobile call CTAs.",
  },
];

export const cmsEnums: CmsEnums = {
  blogCategories: [
    BlogCategory.INVESTMENT,
    BlogCategory.GURGAON_INSIGHTS,
    BlogCategory.PROPERTY_GUIDES,
  ],
  leadTypes: [
    LeadType.GENERAL,
    LeadType.GET_PRICE,
    LeadType.DOWNLOAD_BROCHURE,
    LeadType.BOOK_SITE_VISIT,
  ],
  projectStatuses: [
    ProjectStatus.READY_TO_MOVE,
    ProjectStatus.UNDER_CONSTRUCTION,
    ProjectStatus.PRE_LAUNCH,
  ],
  propertyStatuses: [
    PropertyStatus.AVAILABLE,
    PropertyStatus.SOLD,
    PropertyStatus.UNDER_CONSTRUCTION,
  ],
  propertyTags: [
    PropertyTagType.FEATURED,
    PropertyTagType.LUXURY,
    PropertyTagType.INVESTMENT,
    PropertyTagType.HOT_SALE,
    PropertyTagType.BEST_SELLER,
    PropertyTagType.CLOSED,
  ],
  priceTypes: [PriceType.FIXED, PriceType.ON_REQUEST],
};
