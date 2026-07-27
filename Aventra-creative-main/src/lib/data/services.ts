export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  color: string;
  icon: "code" | "search" | "palette" | "megaphone" | "wrench" | "shopping-bag";
  problem: string;
  solution: string;
  benefits: string[];
  features: { title: string; desc: string }[];
  technology: string[];
  timeline: { stage: string; detail: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    shortDesc: "Modern, fast & responsive websites, landing pages & more.",
    color: "#8b5cf6",
    icon: "code",
    problem:
      "Most business websites are slow, hard to update, and built on page builders that cap what you can actually do with them.",
    solution:
      "We build custom on modern frameworks — every site is fast by default, easy for you to update, and built to scale as your business does.",
    benefits: [
      "Sub-2-second load times, even on mobile networks",
      "Content you can update yourself without calling a developer",
      "Built to rank — technical SEO from day one, not bolted on after",
      "Scales cleanly as you add pages, products, or features",
    ],
    features: [
      { title: "Business Websites", desc: "Professional sites built for trust and credibility." },
      { title: "Portfolio Websites", desc: "Creative showcases that make your work the hero." },
      { title: "Landing Pages", desc: "High-converting pages built for a single goal." },
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
    timeline: [
      { stage: "Discovery", detail: "Scope, goals, and audience — 2-3 days" },
      { stage: "Design", detail: "Wireframes to high-fidelity UI — 1-2 weeks" },
      { stage: "Development", detail: "Build, integrate, test — 1-3 weeks" },
      { stage: "Launch", detail: "Deploy, monitor, handoff — 2-3 days" },
    ],
    deliverables: ["Fully responsive website", "CMS access & training", "SEO foundation", "30-day post-launch support"],
    faq: [
      { q: "How long does a typical website take?", a: "Most business sites launch in 3-5 weeks depending on scope and how quickly content and feedback come back to us." },
      { q: "Can I update the site myself after launch?", a: "Yes — every site ships with CMS access and a short walkthrough so you're not dependent on us for text and image changes." },
      { q: "Do you write the content too?", a: "We can, or work with content you provide — either way we make sure it's structured for SEO." },
    ],
  },
  {
    slug: "seo",
    name: "SEO & Optimization",
    shortDesc: "Rank higher, get more traffic and increase your sales.",
    color: "#ec4899",
    icon: "search",
    problem:
      "Most businesses have a website that's invisible on Google — no technical foundation, no content strategy, no way to measure what's working.",
    solution:
      "We fix the technical foundation first, then build a content and link strategy tied to the searches your actual customers are making.",
    benefits: [
      "Technical audit fixes the issues actually holding rankings back",
      "Content strategy tied to real search demand, not guesses",
      "Local SEO for businesses that depend on nearby customers",
      "Monthly reporting so you can see what's actually moving",
    ],
    features: [
      { title: "Technical SEO", desc: "Site speed, crawlability, structured data." },
      { title: "Content Strategy", desc: "Pages built around real search intent." },
      { title: "Local SEO", desc: "Google Business Profile & local pack visibility." },
    ],
    technology: ["Google Search Console", "Ahrefs", "Schema.org", "PageSpeed Insights"],
    timeline: [
      { stage: "Audit", detail: "Technical + content audit — 1 week" },
      { stage: "Strategy", detail: "Keyword & content plan — 1 week" },
      { stage: "Implementation", detail: "Ongoing, monthly cadence" },
      { stage: "Reporting", detail: "Monthly ranking & traffic report" },
    ],
    deliverables: ["Technical audit report", "Keyword strategy", "On-page optimization", "Monthly performance report"],
    faq: [
      { q: "How long until I see results?", a: "Meaningful movement typically starts at 6-10 weeks; SEO compounds rather than spikes." },
      { q: "Do you guarantee rankings?", a: "No one honestly can — we guarantee the work is done right and report transparently on what's moving." },
    ],
  },
  {
    slug: "branding",
    name: "Branding & Design",
    shortDesc: "Build a memorable identity that customers trust.",
    color: "#3b82f6",
    icon: "palette",
    problem:
      "Inconsistent visuals across your website, socials, and print materials make a business look smaller and less trustworthy than it is.",
    solution:
      "We build one identity system — logo, color, type, and usage rules — that holds up everywhere your business shows up.",
    benefits: [
      "One identity system instead of ad-hoc visuals per channel",
      "A brand guide your whole team can actually use",
      "Assets sized and ready for web, social, and print",
      "A visual identity that ages well, not a trend you'll redo in a year",
    ],
    features: [
      { title: "Logo & Identity", desc: "A mark and system built to hold up at any size." },
      { title: "Brand Guidelines", desc: "Color, type, and usage rules your team can follow." },
      { title: "Marketing Assets", desc: "Social templates, print-ready files, and more." },
    ],
    technology: ["Figma", "Adobe Illustrator"],
    timeline: [
      { stage: "Discovery", detail: "Brand positioning & audience — 3-5 days" },
      { stage: "Concepts", detail: "Logo & direction exploration — 1 week" },
      { stage: "Refinement", detail: "Final identity & guidelines — 1 week" },
    ],
    deliverables: ["Logo suite", "Brand guideline PDF", "Social + print templates"],
    faq: [
      { q: "How many logo concepts do I get?", a: "Typically 2-3 distinct directions to start, refined into one system." },
      { q: "Do you design business cards / signage too?", a: "Yes — anything print-facing can be scoped in alongside the core identity." },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortDesc: "Reach the right audience & increase sales, fast.",
    color: "#22c55e",
    icon: "megaphone",
    problem:
      "Running ads without a conversion-ready landing page or clear tracking usually means paying for clicks that never turn into customers.",
    solution:
      "We connect the campaign to the page and the tracking, so every rupee spent is measurable against actual leads or sales.",
    benefits: [
      "Campaigns tied to a landing page built to convert",
      "Real tracking — you see cost per lead, not just impressions",
      "Audience targeting refined from real performance data",
      "Monthly optimization, not a set-and-forget campaign",
    ],
    features: [
      { title: "Paid Search & Social", desc: "Google & Meta campaigns built around intent." },
      { title: "Conversion Tracking", desc: "GA4 + GTM wired to real business outcomes." },
      { title: "Landing Pages", desc: "Pages designed specifically for the campaign." },
    ],
    technology: ["Google Ads", "Meta Ads Manager", "GA4", "GTM"],
    timeline: [
      { stage: "Setup", detail: "Tracking, accounts, landing page — 1 week" },
      { stage: "Launch", detail: "Initial campaign live — day 7" },
      { stage: "Optimize", detail: "Ongoing weekly optimization" },
    ],
    deliverables: ["Campaign setup", "Conversion tracking", "Monthly performance report"],
    faq: [
      { q: "What's the minimum ad budget?", a: "We typically recommend starting from ₹15,000/month in ad spend to gather enough data to optimize." },
    ],
  },
  {
    slug: "maintenance",
    name: "Maintenance",
    shortDesc: "Monthly support & updates so your site stays current.",
    color: "#f97316",
    icon: "wrench",
    problem:
      "Sites that don't get maintained fall behind on security patches, slow down over time, and quietly break in ways no one notices until a customer complains.",
    solution:
      "We monitor uptime, apply updates, and handle content changes on a monthly retainer — so the site stays exactly as fast and secure as day one.",
    benefits: [
      "Uptime and performance monitored, not assumed",
      "Security patches applied before they become a problem",
      "Small content changes handled without a new project quote",
      "One point of contact who already knows your site",
    ],
    features: [
      { title: "Uptime Monitoring", desc: "Alerts before your customers notice an issue." },
      { title: "Security Updates", desc: "Dependencies and patches kept current." },
      { title: "Content Support", desc: "Text, image, and small copy changes included." },
    ],
    technology: ["Vercel Monitoring", "Sentry", "Dependabot"],
    timeline: [{ stage: "Ongoing", detail: "Monthly retainer, cancel anytime" }],
    deliverables: ["Monthly uptime report", "Security patch log", "Included content edit hours"],
    faq: [
      { q: "What counts as a 'small content change'?", a: "Text edits, image swaps, adding a blog post — anything that doesn't require new design or development." },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    shortDesc: "Stores engineered around checkout conversion.",
    color: "#a855f7",
    icon: "shopping-bag",
    problem:
      "Generic store templates look fine but lose customers at checkout — too many steps, unclear shipping costs, no trust signals at the moment that matters most.",
    solution:
      "We design the checkout flow first, then build the rest of the store around it — fewer steps, clear costs upfront, trust signals where buyers hesitate.",
    benefits: [
      "Checkout built to reduce abandonment, not just look nice",
      "Inventory and orders manageable without a developer",
      "Payment gateways integrated and PCI-compliant",
      "Built to handle real traffic spikes during sales",
    ],
    features: [
      { title: "Product Catalog", desc: "Fast, filterable, built for discovery." },
      { title: "Checkout Flow", desc: "Minimal steps, clear costs, trust signals." },
      { title: "Order Management", desc: "Inventory and fulfillment you can run yourself." },
    ],
    technology: ["Next.js Commerce", "Razorpay", "Sanity CMS"],
    timeline: [
      { stage: "Discovery", detail: "Catalog & payment scope — 1 week" },
      { stage: "Build", detail: "Store, checkout, integrations — 3-4 weeks" },
      { stage: "Launch", detail: "Testing & go-live — 1 week" },
    ],
    deliverables: ["Full storefront", "Payment integration", "Order management access"],
    faq: [
      { q: "Which payment gateways do you support?", a: "Razorpay and Stripe most commonly — others can be scoped on request." },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
