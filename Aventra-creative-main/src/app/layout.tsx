import type { Metadata } from "next";
import Script from "next/script";
// Self-hosted via @fontsource rather than next/font/google: zero third-party
// requests at runtime (no fonts.googleapis.com round trip), which is what
// actually protects the <2s LCP budget in the performance spec.
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { CookieConsent } from "@/components/marketing/cookie-consent";
import { StickyContactCta } from "@/components/marketing/sticky-contact-cta";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aventracreative.com";
const twitterHandle =
  process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? "@aventracreative";
const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-M04NKFN0RH";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aventra Creative — We Build Digital Experiences",
    template: "%s | Aventra Creative",
  },
  description:
    "Aventra Creative builds modern websites, SEO, and growth-driven digital experiences for ambitious businesses in India and worldwide.",
  keywords: [
    "web development agency",
    "SEO agency India",
    "website design agency",
    "Aventra Creative",
    "digital growth strategy",
    "Next.js development",
  ],
  authors: [{ name: "Sujal Patidar", url: siteUrl }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Aventra Creative",
    title: "Aventra Creative — We Build Digital Experiences",
    description:
      "Modern websites, SEO strategy, and digital experiences that turn visitors into customers.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aventra Creative — We Build Digital Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: twitterHandle,
    creator: twitterHandle,
    title: "Aventra Creative — We Build Digital Experiences",
    description:
      "Modern websites, SEO strategy, and digital experiences that turn visitors into customers.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Aventra Creative",
    url: siteUrl,
    description:
      "Digital agency building modern websites, SEO strategy, and digital experiences.",
    founder: {
      "@type": "Person",
      name: "Sujal Patidar",
      jobTitle: "Founder & Full Stack Developer",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Aventra Creative",
    url: siteUrl,
    description:
      "Founder-led digital agency in Indore, India — building premium websites, SEO, and growth systems for ambitious brands worldwide.",
    image: `${siteUrl}/images/og-image.jpg`,
    telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Indore",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: "452001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.7196,
      longitude: 75.8577,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "Aventra Creative",
    description:
      "Digital agency building modern websites, SEO strategy, and growth-focused digital experiences for businesses worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term}`,
      },
      "query-input": "required name=search_term",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
<head>
  {GA_ID && (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )}

  <Script
    id="organization-jsonld"
    type="application/ld+json"
    strategy="beforeInteractive"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(organizationJsonLd),
    }}
  />
</head>

      <body
        id="top"
        className="min-h-full flex flex-col font-[family-name:var(--font-inter)] antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>

        <Navbar />

        {/* tabIndex={-1} allows the skip-to-content link to move focus here (WCAG 2.4.1) */}
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <StickyContactCta />
        <CookieConsent />
      </body>
    </html>
  );
}
