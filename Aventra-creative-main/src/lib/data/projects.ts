import { projectMockupDataUri } from "./project-mockup";

export type Project = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  category: "Websites" | "E-commerce" | "SaaS" | "Branding" | "SEO";
  services: string[];
  year: string;
  result: string;
  overview: string;
  gradient: string;
  challenge: string;
  solutionText: string;
  keyFeatures: string[];
  technologies: string[];
  coverImageUrl?: string;
  coverImageAlt?: string;
  projectUrl?: string;
  featured?: boolean;
  orderRank?: number;
};

export const PROJECTS: Project[] = [
  {
    slug: "yashraj-palace",
    name: "Yashraj Palace",
    client: "Yashraj Palace",
    industry: "Hospitality",
    category: "Websites",
    services: ["Web Development", "SEO"],
    year: "2024",
    result: "+64% direct bookings",
    overview:
      "Built a refined hospitality website that turns browsers into bookings with polished brand storytelling and a seamless reservation path.",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #6d28d9 100%)",
    challenge:
      "Yashraj Palace had no direct booking path, which meant guests lost trust and the property lost commission-free revenue.",
    solutionText:
      "We launched a premium, mobile-first website with live room availability, secure payments, and guest intake automation that reduced reservation friction and boosted direct bookings.",
    keyFeatures: [
      "Live room availability",
      "Secure booking flow",
      "Mobile-first guest experience",
      "CMS-powered content management",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Razorpay", "Sanity CMS"],
    coverImageUrl: projectMockupDataUri({
      name: "Yashraj Palace",
      category: "Websites",
      result: "+64% direct bookings",
      year: "2024",
      keyFeatures: ["Live availability", "Secure booking", "Mobile-first"],
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #6d28d9 100%)",
    }),
    coverImageAlt: "Yashraj Palace hospitality website design",
    projectUrl: "https://yashrajpalace.com",
    featured: true,
    orderRank: 1,
  },
  {
    slug: "vardo-grow",
    name: "Vardo Grow",
    client: "Vardo Grow",
    industry: "E-commerce",
    category: "E-commerce",
    services: ["Web Development", "SEO"],
    year: "2024",
    result: "3.1x conversion rate",
    overview:
      "Redesigned the storefront with clearer navigation, shipping transparency, and a checkout experience that keeps buyers moving to purchase.",
    gradient: "linear-gradient(135deg, #052e16 0%, #065f46 55%, #059669 100%)",
    challenge:
      "Vardo Grow’s storefront lost buyers at checkout because shipping fees appeared too late and the purchase path felt uncertain.",
    solutionText:
      "We redesigned the store with a clear product hierarchy, instant shipping transparency, and a simplified two-step checkout that retains customers through payment.",
    keyFeatures: [
      "Two-step checkout",
      "Transparent shipping pricing",
      "Mobile-first product discovery",
      "Performance-optimized storefront",
    ],
    technologies: ["Next.js", "Razorpay", "Sanity CMS"],
    coverImageUrl: projectMockupDataUri({
      name: "Vardo Grow",
      category: "E-commerce",
      result: "3.1x conversion rate",
      year: "2024",
      keyFeatures: ["Two-step checkout", "Shipping transparency", "Mobile-first"],
      gradient: "linear-gradient(135deg, #052e16 0%, #065f46 55%, #059669 100%)",
    }),
    coverImageAlt: "Vardo Grow e-commerce website design",
    projectUrl: "https://vardogrow.com",
    featured: true,
    orderRank: 2,
  },
  {
    slug: "shubham-traders-solar",
    name: "Shubham Traders Solar",
    client: "Shubham Traders",
    industry: "Solar / B2B",
    category: "SEO",
    services: ["SEO", "Web Development"],
    year: "2024",
    result: "#1 local search ranking",
    overview:
      "Prepared a search-first site architecture and local landing pages that position the solar installer where buyers are searching.",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #2563eb 100%)",
    challenge:
      "Solar service buyers were searching locally, but Shubham Traders never appeared in the top results.",
    solutionText:
      "We rebuilt their website structure with search-focused landing pages, schema markup, and a local visibility strategy that captured buyers before competitors.",
    keyFeatures: [
      "Local SEO optimization",
      "Search-driven landing pages",
      "Google Business integration",
      "Monthly performance reporting",
    ],
    technologies: ["Next.js", "Schema.org", "Google Search Console"],
    coverImageUrl: projectMockupDataUri({
      name: "Shubham Traders Solar",
      category: "SEO",
      result: "#1 local search ranking",
      year: "2024",
      keyFeatures: ["Local SEO", "Landing pages", "GBP integration"],
      gradient: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #2563eb 100%)",
    }),
    coverImageAlt: "Shubham Traders Solar SEO project",
    projectUrl: "https://shubhamtraders.in",
    featured: true,
    orderRank: 3,
  },
  {
    slug: "its-daigh",
    name: "ITS Daigh",
    client: "ITS Daigh",
    industry: "Technology",
    category: "Branding",
    services: ["Branding & Design", "Web Development"],
    year: "2025",
    result: "Design system, 40+ screens",
    overview:
      "Created a consistent product brand and modular UI system across 40+ screens to support faster launches and higher confidence among enterprise buyers.",
    gradient: "linear-gradient(135deg, #3b0764 0%, #6d28d9 55%, #a855f7 100%)",
    challenge:
      "ITS Daigh had a product experience that felt inconsistent across screens, slowing onboarding and lowering trust.",
    solutionText:
      "We created a reusable design system and refreshed 40+ screens with consistent layout, interaction patterns, and brand clarity.",
    keyFeatures: [
      "Design system",
      "Component library",
      "Visual consistency",
      "Brand guidelines",
    ],
    technologies: ["Figma", "React", "Tailwind CSS"],
    coverImageUrl: projectMockupDataUri({
      name: "ITS Daigh",
      category: "Branding",
      result: "Design system, 40+ screens",
      year: "2025",
      keyFeatures: ["Design system", "Component library", "Brand guidelines"],
      gradient: "linear-gradient(135deg, #3b0764 0%, #6d28d9 55%, #a855f7 100%)",
    }),
    coverImageAlt: "ITS Daigh branding and design system",
    projectUrl: "https://itsdaigh.com",
    featured: false,
    orderRank: 4,
  },
  {
    slug: "shree-balaji-events",
    name: "Shree Balaji Events",
    client: "Shree Balaji Events",
    industry: "Events & Photography",
    category: "Websites",
    services: ["Web Development", "Branding & Design"],
    year: "2024",
    result: "2x inbound inquiries",
    overview:
      "Repositioned the brand with a cinematic portfolio site, faster lead capture, and clear next-step prompts for premium clients.",
    gradient: "linear-gradient(135deg, #451a03 0%, #b45309 55%, #f59e0b 100%)",
    challenge:
      "Their website failed to showcase spectacular event photography and made it hard for clients to inquire quickly.",
    solutionText:
      "We delivered an image-first portfolio site with a fast gallery, clear pricing entry points, and a WhatsApp inquiry flow that doubled enquiries.",
    keyFeatures: [
      "Cinematic gallery",
      "WhatsApp inquiry integration",
      "Fast image delivery",
      "Conversion-focused contact flow",
    ],
    technologies: ["Next.js", "Cloudinary"],
    coverImageUrl: projectMockupDataUri({
      name: "Shree Balaji Events",
      category: "Websites",
      result: "2x inbound inquiries",
      year: "2024",
      keyFeatures: ["Cinematic gallery", "WhatsApp inquiries", "Fast delivery"],
      gradient: "linear-gradient(135deg, #451a03 0%, #b45309 55%, #f59e0b 100%)",
    }),
    coverImageAlt: "Shree Balaji Events website design",
    projectUrl: "https://shreebalajievents.com",
    featured: false,
    orderRank: 5,
  },
  {
    slug: "avdhut-visuals",
    name: "Avdhut Visuals",
    client: "Avdhut Visuals",
    industry: "Creative Studio",
    category: "Branding",
    services: ["Branding & Design", "Web Development"],
    year: "2025",
    result: "Full brand + site relaunch",
    overview:
      "Refreshed the creative studio identity and launched a portfolio site built to showcase work, streamline discovery, and drive qualified inquiries.",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #4f46e5 100%)",
    challenge:
      "A creative studio with exceptional work was held back by a dated portfolio and weak storytelling.",
    solutionText:
      "We refreshed the brand, rebuilt the portfolio, and created a website that lets the work sell itself with stronger narrative and better project hierarchy.",
    keyFeatures: [
      "Brand refresh",
      "Portfolio rebuild",
      "Case study templates",
      "Service messaging",
    ],
    technologies: ["Next.js", "Figma"],
    coverImageUrl: projectMockupDataUri({
      name: "Avdhut Visuals",
      category: "Branding",
      result: "Full brand + site relaunch",
      year: "2025",
      keyFeatures: ["Brand refresh", "Portfolio rebuild", "Case study templates"],
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #4f46e5 100%)",
    }),
    coverImageAlt: "Avdhut Visuals brand relaunch",
    projectUrl: "https://avdhutvisuals.com",
    featured: false,
    orderRank: 6,
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export const CATEGORIES = ["All", "Websites", "E-commerce", "SaaS", "Branding", "SEO"] as const;
