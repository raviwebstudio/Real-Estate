import {
  BlogCategory,
  LeadType,
  PriceType,
  ProjectStatus,
  PropertyStatus,
  PropertyTagType,
  PrismaClient,
} from "@prisma/client";

import { toSlug } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  await prisma.lead.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.propertyTag.deleteMany();
  await prisma.propertyVariation.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.project.deleteMany();
  await prisma.builder.deleteMany();

  const builders = await Promise.all(
    [
      [
        "DLF",
        "Flagship luxury builder with deep Gurgaon credibility.",
        "Premium townships and branded residential addresses across Gurgaon.",
      ],
      [
        "M3M India",
        "Lifestyle-driven luxury builder across key Gurgaon corridors.",
        "Strong visibility in Golf Course Extension Road and adjacent premium zones.",
      ],
      [
        "Elan Group",
        "Brand-led luxury developer with strong corridor positioning.",
        "Relevant for buyers and investors watching Dwarka Expressway growth.",
      ],
    ].map(([name, description, overview]) =>
      prisma.builder.create({
        data: {
          name,
          slug: toSlug(name),
          description,
          overview,
          seoTitle: `${name} projects in Gurgaon`,
          seoDescription: `${name} builder profile with linked projects and listings in Gurgaon.`,
        },
      }),
    ),
  );

  const builderMap = Object.fromEntries(builders.map((builder) => [builder.name, builder.id]));

  const projects = await Promise.all(
    [
      {
        name: "DLF The Arbour",
        builderName: "DLF",
        location: "Sector 63, Golf Course Extension Road",
        sector: "Sector 63",
        pinCode: "122102",
        description: "Large-format low-density luxury project with premium brand recall.",
        amenities: ["Clubhouse", "Pool", "Wellness", "Sports courts"],
        configurations: ["4 BHK", "4 BHK + Utility"],
        investmentHighlights: ["Brand premium", "Low density", "Luxury demand depth"],
        priceRangeMin: 65000000,
        priceRangeMax: 78000000,
        possessionStatus: ProjectStatus.UNDER_CONSTRUCTION,
        possessionTimeline: "Expected possession by Q4 2028",
        mapQuery: "DLF The Arbour Sector 63 Gurgaon",
      },
      {
        name: "M3M Golf Estate",
        builderName: "M3M India",
        location: "Sector 65, Golf Course Extension Road",
        sector: "Sector 65",
        pinCode: "122102",
        description: "Ready luxury golf-themed community with strong rental and resale relevance.",
        amenities: ["Golf views", "Residents club", "Spa", "Business lounge"],
        configurations: ["3 BHK", "4 BHK"],
        investmentHighlights: ["Ready inventory", "Rental demand", "Known premium address"],
        priceRangeMin: 43000000,
        priceRangeMax: 56000000,
        possessionStatus: ProjectStatus.READY_TO_MOVE,
        possessionTimeline: "Ready to move",
        mapQuery: "M3M Golf Estate Sector 65 Gurgaon",
      },
      {
        name: "Elan The Presidential",
        builderName: "Elan Group",
        location: "Sector 106, Dwarka Expressway",
        sector: "Sector 106",
        pinCode: "122006",
        description: "Luxury development aimed at growth-oriented buyers in a rising corridor.",
        amenities: ["Arrival lobby", "Pool deck", "Indoor sports", "Sky gardens"],
        configurations: ["3 BHK", "4 BHK"],
        investmentHighlights: ["Expressway upside", "Luxury positioning", "Medium-term growth"],
        priceRangeMin: 36000000,
        priceRangeMax: 52000000,
        possessionStatus: ProjectStatus.UNDER_CONSTRUCTION,
        possessionTimeline: "Expected possession by Q2 2029",
        mapQuery: "Elan The Presidential Sector 106 Gurgaon",
      },
    ].map((project) =>
      prisma.project.create({
        data: {
          name: project.name,
          slug: toSlug(project.name),
          builderId: builderMap[project.builderName],
          location: project.location,
          sector: project.sector,
          city: "Gurgaon",
          state: "Haryana",
          pinCode: project.pinCode,
          description: project.description,
          amenities: project.amenities,
          configurations: project.configurations,
          investmentHighlights: project.investmentHighlights,
          priceRangeMin: project.priceRangeMin,
          priceRangeMax: project.priceRangeMax,
          possessionStatus: project.possessionStatus,
          possessionTimeline: project.possessionTimeline,
          mapQuery: project.mapQuery,
          seoTitle: `${project.name} Gurgaon`,
          seoDescription: `${project.name} overview, amenities, and pricing cues in Gurgaon.`,
          faq: [
            {
              question: `Is ${project.name} suitable for premium buyers?`,
              answer: "Yes. The project is positioned for high-intent residential buyers seeking brand and location quality.",
            },
          ],
        },
      }),
    ),
  );

  const projectMap = Object.fromEntries(projects.map((project) => [project.name, project.id]));

  const properties = [
    {
      title: "DLF The Arbour 4 BHK Residences",
      builderName: "DLF",
      projectName: "DLF The Arbour",
      excerpt: "Premium 4 BHK residences in Sector 63 with brand-led luxury positioning.",
      locationLabel: "Sector 63, Golf Course Extension Road, Gurgaon",
      sector: "Sector 63",
      pinCode: "122102",
      priceMin: 65000000,
      priceMax: 78000000,
      priceText: null,
      priceType: PriceType.FIXED,
      propertyType: "Luxury Apartment",
      status: PropertyStatus.UNDER_CONSTRUCTION,
      possessionStatus: "Under construction",
      possessionTimeline: "Possession expected by Q4 2028",
      superArea: 3950,
      carpetArea: 2650,
      expectedRoi: 17.5,
      rentalYield: 3.4,
      whyInvest: "Brand trust, low-density planning, and strong corridor demand support long-term premium positioning.",
      investmentHighlights: ["Builder premium", "Low density", "Luxury demand"],
      amenities: ["Private lobby", "Infinity pool", "Clubhouse", "Landscaped decks"],
      highlights: ["Large layouts", "Upper-luxury audience", "High ticket demand"],
      nearbyPlaces: [
        { category: "Schools", name: "St. Xavier's High School", distance: "10 min" },
        { category: "Hospitals", name: "CK Birla Hospital", distance: "14 min" },
        { category: "Metro", name: "Sector 55-56 Rapid Metro", distance: "18 min" },
        { category: "Malls", name: "WorldMark Gurgaon", distance: "12 min" },
      ],
      faq: [{ question: "Is this suitable for NRI buyers?", answer: "Yes. The brand and product positioning are easy to evaluate remotely." }],
      mapQuery: "DLF The Arbour Sector 63 Gurgaon",
      reraNumber: "RC/REP/HARERA/GGM/680/412/2023/24",
      tags: [PropertyTagType.FEATURED, PropertyTagType.LUXURY, PropertyTagType.INVESTMENT],
      variations: [
        { label: "4 BHK", sizeSqft: 3950, price: 65000000, status: "Available" },
        { label: "4 BHK + Utility", sizeSqft: 4300, price: 78000000, status: "Limited" },
      ],
      images: [
        { url: "/images/placeholders/dlf-arbour-landscape.svg", orientation: "LANDSCAPE", width: 1600, height: 900 },
        { url: "/images/placeholders/interior-portrait.svg", orientation: "PORTRAIT", width: 900, height: 1400 },
      ],
      contentMarkdown: `
## Overview

DLF The Arbour targets buyers who want a branded luxury address with scale, privacy, and a premium Gurgaon corridor story.

## Explore more

- [Luxury Apartments in Gurgaon](/luxury-apartments-in-gurgaon)
- [Properties in Gurgaon](/properties-in-gurgaon)
`,
    },
    {
      title: "M3M Golf Estate Panorama Residences",
      builderName: "M3M India",
      projectName: "M3M Golf Estate",
      excerpt: "Ready luxury residences in Sector 65 with golf-themed views and rental relevance.",
      locationLabel: "Sector 65, Golf Course Extension Road, Gurgaon",
      sector: "Sector 65",
      pinCode: "122102",
      priceMin: 43000000,
      priceMax: 56000000,
      priceText: null,
      priceType: PriceType.FIXED,
      propertyType: "Ready to Move Apartment",
      status: PropertyStatus.AVAILABLE,
      possessionStatus: "Ready to move",
      possessionTimeline: "Immediate possession",
      superArea: 2900,
      carpetArea: 2100,
      expectedRoi: 14.2,
      rentalYield: 4.1,
      whyInvest: "Ready inventory and clear rental relevance make this attractive for investors and family buyers.",
      investmentHighlights: ["Ready inventory", "Rental-ready", "Established address"],
      amenities: ["Golf views", "Club", "Spa", "Business lounge"],
      highlights: ["Operational community", "Premium tenant relevance", "Strong sector familiarity"],
      nearbyPlaces: [
        { category: "Schools", name: "Heritage Xperiential Learning", distance: "16 min" },
        { category: "Hospitals", name: "Artemis Hospital", distance: "18 min" },
        { category: "Metro", name: "Sector 55-56 Rapid Metro", distance: "19 min" },
        { category: "Malls", name: "AIPL Joy Street", distance: "8 min" },
      ],
      faq: [{ question: "Is this good for rental investors?", answer: "Yes. Ready inventory improves rental clarity and product understanding." }],
      mapQuery: "M3M Golf Estate Sector 65 Gurgaon",
      reraNumber: "RC/REP/HARERA/GGM/214/2020/18",
      tags: [PropertyTagType.FEATURED, PropertyTagType.LUXURY, PropertyTagType.BEST_SELLER],
      variations: [
        { label: "3 BHK", sizeSqft: 2900, price: 43000000, status: "Available" },
        { label: "4 BHK", sizeSqft: 3650, price: 56000000, status: "Available" },
      ],
      images: [
        { url: "/images/placeholders/m3m-golf-landscape.svg", orientation: "LANDSCAPE", width: 1600, height: 900 },
        { url: "/images/placeholders/clubhouse-portrait.svg", orientation: "PORTRAIT", width: 900, height: 1400 },
      ],
      contentMarkdown: `
## Why buyers shortlist this

M3M Golf Estate works well for people who want finished product visibility, premium community branding, and immediate usability.
`,
    },
    {
      title: "Elan The Presidential 3 BHK Sky Homes",
      builderName: "Elan Group",
      projectName: "Elan The Presidential",
      excerpt: "Luxury 3 BHK sky homes on Dwarka Expressway designed around future corridor upside.",
      locationLabel: "Sector 106, Dwarka Expressway, Gurgaon",
      sector: "Sector 106",
      pinCode: "122006",
      priceMin: 36000000,
      priceMax: 42000000,
      priceText: null,
      priceType: PriceType.FIXED,
      propertyType: "Luxury Apartment",
      status: PropertyStatus.UNDER_CONSTRUCTION,
      possessionStatus: "Under construction",
      possessionTimeline: "Possession expected by Q2 2029",
      superArea: 2450,
      carpetArea: 1720,
      expectedRoi: 18.8,
      rentalYield: 3.2,
      whyInvest: "Branded luxury on a fast-moving expressway corridor supports a high-conviction medium-term investment thesis.",
      investmentHighlights: ["Expressway upside", "Luxury branding", "Future premium demand"],
      amenities: ["Arrival lobby", "Sky deck", "Indoor arena", "Pool deck"],
      highlights: ["Growth corridor", "Investor narrative", "Brand visibility"],
      nearbyPlaces: [
        { category: "Schools", name: "DPS Sector 102", distance: "12 min" },
        { category: "Hospitals", name: "Manipal Hospital Dwarka", distance: "22 min" },
        { category: "Metro", name: "Dwarka Sector 21 Metro", distance: "25 min" },
        { category: "Malls", name: "Conscient One", distance: "9 min" },
      ],
      faq: [{ question: "Why is Sector 106 drawing attention?", answer: "Connectivity upgrades and premium launches have improved buyer confidence." }],
      mapQuery: "Elan The Presidential Sector 106 Gurgaon",
      reraNumber: "RC/REP/HARERA/GGM/722/454/2024/55",
      tags: [PropertyTagType.LUXURY, PropertyTagType.INVESTMENT, PropertyTagType.HOT_SALE],
      variations: [
        { label: "3 BHK", sizeSqft: 2450, price: 36000000, status: "Available" },
        { label: "4 BHK", sizeSqft: 3150, price: 52000000, status: "Limited" },
      ],
      images: [
        { url: "/images/placeholders/elan-presidential-landscape.svg", orientation: "LANDSCAPE", width: 1600, height: 900 },
        { url: "/images/placeholders/lobby-portrait.svg", orientation: "PORTRAIT", width: 900, height: 1400 },
      ],
      contentMarkdown: `
## Corridor narrative

Dwarka Expressway is moving from potential into visible premium residential momentum, which is why investor attention has strengthened here.
`,
    },
    {
      title: "M3M Golf Estate 3 BHK Golf View Apartments",
      builderName: "M3M India",
      projectName: "M3M Golf Estate",
      excerpt: "Large 3 BHK ready-to-move apartments with premium views and strong search intent.",
      locationLabel: "Sector 65, Gurgaon",
      sector: "Sector 65",
      pinCode: "122102",
      priceMin: 43000000,
      priceMax: 47000000,
      priceText: null,
      priceType: PriceType.FIXED,
      propertyType: "3 BHK Apartment",
      status: PropertyStatus.AVAILABLE,
      possessionStatus: "Ready to move",
      possessionTimeline: "Immediate possession",
      superArea: 2900,
      carpetArea: 2050,
      expectedRoi: 13.8,
      rentalYield: 4.0,
      whyInvest: "A strong fit for buyers specifically searching large-format 3 BHK luxury inventory in Gurgaon.",
      investmentHighlights: ["High-intent config", "Ready inventory", "Rental relevance"],
      amenities: ["Golf deck", "Club lounge", "Pool", "Sports facilities"],
      highlights: ["3 BHK search relevance", "Premium community", "Immediate usability"],
      nearbyPlaces: [
        { category: "Schools", name: "Scottish High International School", distance: "20 min" },
        { category: "Hospitals", name: "Artemis Hospital", distance: "18 min" },
        { category: "Metro", name: "Millennium City Centre Metro", distance: "25 min" },
        { category: "Malls", name: "AIPL Joy Street", distance: "8 min" },
      ],
      faq: [{ question: "Is this aligned to 3 BHK family demand?", answer: "Yes. The format suits premium family buyers and relocation-led tenants." }],
      mapQuery: "M3M Golf Estate Sector 65 Gurgaon",
      reraNumber: "RC/REP/HARERA/GGM/214/2020/18",
      tags: [PropertyTagType.FEATURED, PropertyTagType.BEST_SELLER],
      variations: [{ label: "3 BHK", sizeSqft: 2900, price: 43000000, status: "Available" }],
      images: [
        { url: "/images/placeholders/m3m-golf-landscape.svg", orientation: "LANDSCAPE", width: 1600, height: 900 },
        { url: "/images/placeholders/clubhouse-portrait.svg", orientation: "PORTRAIT", width: 900, height: 1400 },
      ],
      contentMarkdown: `
## 3 BHK demand

This listing is designed to meet one of the clearest configuration searches in Gurgaon luxury residential: premium 3 BHK inventory.
`,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({
      data: {
        title: property.title,
        slug: toSlug(property.title),
        excerpt: property.excerpt,
        description: property.excerpt,
        contentMarkdown: property.contentMarkdown.trim(),
        locationLabel: property.locationLabel,
        sector: property.sector,
        city: "Gurgaon",
        state: "Haryana",
        pinCode: property.pinCode,
        priceMin: property.priceMin,
        priceMax: property.priceMax,
        priceText: property.priceText,
        priceType: property.priceType,
        propertyType: property.propertyType,
        status: property.status,
        possessionStatus: property.possessionStatus,
        possessionTimeline: property.possessionTimeline,
        superArea: property.superArea,
        carpetArea: property.carpetArea,
        expectedRoi: property.expectedRoi,
        rentalYield: property.rentalYield,
        whyInvest: property.whyInvest,
        investmentHighlights: property.investmentHighlights,
        amenities: property.amenities,
        highlights: property.highlights,
        nearbyPlaces: property.nearbyPlaces,
        faq: property.faq,
        mapQuery: property.mapQuery,
        reraNumber: property.reraNumber,
        seoTitle: `${property.title} | Gurgaon Residences`,
        seoDescription: property.excerpt,
        builderId: builderMap[property.builderName],
        projectId: projectMap[property.projectName],
        images: {
          create: property.images.map((image, index) => ({
            ...image,
            alt: `${property.title} image ${index + 1}`,
            sortOrder: index,
          })),
        },
        variations: {
          create: property.variations.map((variation, index) => ({
            ...variation,
            sortOrder: index,
          })),
        },
        tags: {
          create: property.tags.map((tag) => ({ tag })),
        },
      },
    });
  }

  await Promise.all(
    [
      {
        title: "Gurgaon luxury corridors that continue to outperform",
        category: BlogCategory.GURGAON_INSIGHTS,
        excerpt: "A practical look at the Gurgaon micro-markets where luxury residential demand remains strongest.",
        coverImage: "/images/hero/gurgaon-skyline.svg",
        relatedLink: "/luxury-apartments-in-gurgaon",
        content: `
## Corridors that matter

- Golf Course Road for established prestige
- Golf Course Extension Road for newer luxury supply
- Dwarka Expressway for growth-oriented premium positioning

## Start exploring

- [Luxury Apartments in Gurgaon](/luxury-apartments-in-gurgaon)
- [M3M Golf Estate Panorama Residences](/properties/m3m-golf-estate-panorama-residences)
`,
      },
      {
        title: "How investors should evaluate ready-to-move property in Gurgaon",
        category: BlogCategory.INVESTMENT,
        excerpt: "Ready inventory reduces uncertainty, but only if yield, community quality, and micro-market depth are assessed together.",
        coverImage: "/images/hero/investment-guide.svg",
        relatedLink: "/ready-to-move-properties-in-gurgaon",
        content: `
## Ready inventory advantages

Completed product gives faster clarity on quality, rental readiness, and community operations.

## Related inventory

- [Ready to Move Properties in Gurgaon](/ready-to-move-properties-in-gurgaon)
- [M3M Golf Estate 3 BHK Golf View Apartments](/properties/m3m-golf-estate-3-bhk-golf-view-apartments)
`,
      },
      {
        title: "What makes a 3 BHK flat in Gurgaon easier to resell",
        category: BlogCategory.PROPERTY_GUIDES,
        excerpt: "Configuration demand is only one part of the story. Builder trust and sector quality matter just as much.",
        coverImage: "/images/hero/three-bhk-guide.svg",
        relatedLink: "/3-bhk-flats-in-gurgaon",
        content: `
## Resale drivers

- Reputed builder
- Strong sector ecosystem
- Practical carpet efficiency
- Premium community identity

- [3 BHK Flats in Gurgaon](/3-bhk-flats-in-gurgaon)
- [Elan The Presidential 3 BHK Sky Homes](/properties/elan-the-presidential-3-bhk-sky-homes)
`,
      },
      {
        title: "How luxury project branding changes buyer perception in Gurgaon",
        category: BlogCategory.GURGAON_INSIGHTS,
        excerpt: "Premium project positioning influences shortlist behaviour, trust, and conversion speed in Gurgaon.",
        coverImage: "/images/hero/luxury-branding.svg",
        relatedLink: "/properties-in-gurgaon",
        content: `
## Why branding matters

In Gurgaon luxury real estate, positioning helps buyers understand the promise faster and compare projects more confidently.

- [Properties in Gurgaon](/properties-in-gurgaon)
- [DLF The Arbour 4 BHK Residences](/properties/dlf-the-arbour-4-bhk-residences)
`,
      },
    ].map((post) =>
      prisma.blogPost.create({
        data: {
          title: post.title,
          slug: toSlug(post.title),
          excerpt: post.excerpt,
          content: post.content.trim(),
          category: post.category,
          coverImage: post.coverImage,
          coverAlt: post.title,
          seoTitle: `${post.title} | Gurgaon Residences Blog`,
          seoDescription: post.excerpt,
          publishedAt: new Date(),
          relatedLink: post.relatedLink,
        },
      }),
    ),
  );

  const firstProperty = await prisma.property.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (firstProperty) {
    await prisma.lead.createMany({
      data: [
        {
          propertyId: firstProperty.id,
          leadType: LeadType.GET_PRICE,
          name: "Ishita Sharma",
          email: "ishita@example.com",
          phone: "+91 98765 43210",
          message: "Please share latest inventory and payment plan.",
          sourcePage: `/properties/${firstProperty.slug}`,
        },
        {
          propertyId: firstProperty.id,
          leadType: LeadType.BOOK_SITE_VISIT,
          name: "Rahul Khanna",
          email: "rahul.khanna@example.com",
          phone: "+91 98111 24567",
          message: "Interested in a weekend site visit with family.",
          sourcePage: `/properties/${firstProperty.slug}`,
        },
      ],
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
