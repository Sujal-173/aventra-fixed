export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  gradient: string;
  /** Cover image uploaded in Sanity Studio; legacy local posts fall back to `gradient`. */
  mainImageUrl?: string;
  mainImageAlt?: string;
  mainImageDimensions?: { width: number; height: number; aspectRatio: number };
  /** Portable Text from Sanity; legacy local posts use plain string paragraphs. */
  body?: Array<Record<string, unknown> | string>;
  seoTitle?: string;
  seoDescription?: string;
  content: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-every-business-needs-a-modern-website",
    title: "Why Every Business Needs a Modern Website",
    excerpt: "A slow, dated website isn't just a design problem — it's a leak in your funnel that shows up as lost revenue.",
    category: "Web Development",
    date: "2026-05-13",
    readTime: "6 min read",
    author: "Sujal Patidar",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #6d28d9 100%)",
    content: [
      "Most business owners think of their website as a digital business card — something that exists so people can find their phone number. That framing is exactly what's costing them customers.",
      "A modern website is closer to a 24-hour salesperson. It qualifies visitors, answers their objections, and moves them toward a decision, all without anyone on your team lifting a finger. When that salesperson is slow, confusing, or looks like it was built in 2014, visitors leave before they ever see what you actually offer.",
      "The fix isn't necessarily a bigger budget — it's treating the site as infrastructure that directly affects revenue, not a one-time expense you can defer indefinitely.",
    ],
  },
  {
    slug: "10-seo-tips-to-rank-higher-on-google",
    title: "10 SEO Tips to Rank Higher on Google",
    excerpt: "Most SEO advice is either outdated or too vague to act on. Here's what actually moves rankings in 2026.",
    category: "SEO",
    date: "2026-05-05",
    readTime: "8 min read",
    author: "Sujal Patidar",
    gradient: "linear-gradient(135deg, #831843 0%, #ec4899 100%)",
    content: [
      "SEO advice tends to fall into two camps: outdated tactics from a decade ago, or vague platitudes like 'create great content' with no actionable next step. Here's what's actually working right now.",
      "Technical SEO still comes first — no amount of content will rank if your site takes six seconds to load or Google can't crawl your pages properly. Start there before touching a single blog post.",
      "After that, match content to real search intent. Someone searching 'best CRM for small business' wants a comparison, not a sales pitch. Give them what they're actually looking for and rankings follow.",
    ],
  },
  {
    slug: "google-ads-vs-meta-ads-which-is-better",
    title: "Google Ads vs Meta Ads: Which is Better?",
    excerpt: "The honest answer is 'it depends on intent' — here's how to actually decide for your business.",
    category: "Digital Marketing",
    date: "2026-04-25",
    readTime: "5 min read",
    author: "Sujal Patidar",
    gradient: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
    content: [
      "This question comes up in nearly every strategy call, and the honest answer is that it depends entirely on where your customer is in their decision process.",
      "Google Ads captures existing intent — someone is already searching for what you offer. Meta Ads creates intent — you're interrupting someone's feed to introduce a need they weren't actively looking to solve.",
      "If you're a service business with real local search volume, start with Google. If you're launching a new product with no existing search demand, Meta usually wins.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
