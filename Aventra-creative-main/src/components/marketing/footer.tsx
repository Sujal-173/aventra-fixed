"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "SEO & Optimization", href: "/services/seo" },
      { name: "Branding & Design", href: "/services/branding" },
      { name: "Digital Marketing", href: "/services/digital-marketing" },
      { name: "Maintenance", href: "/services/maintenance" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Process", href: "/process" },
      { name: "Careers", href: "/careers" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: process.env.NEXT_PUBLIC_TWITTER_URL,
    label: "Twitter",
  },
  { icon: Github, href: process.env.NEXT_PUBLIC_GITHUB_URL, label: "GitHub" },
].filter((link): link is typeof link & { href: string } => Boolean(link.href));

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        {/* Group C: sm:grid-cols-2 intermediate breakpoint before full 4-col at lg */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[var(--primary-soft)]">
                <Image
                  src="/images/logo-icon.png"
                  alt="Aventra Creative logo"
                  fill
                  className="object-contain p-1"
                  sizes="36px"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-bold tracking-tight">
                  AVENTRA
                </span>
                <span className="label-mono text-[9px] text-[var(--primary-glow)]">
                  CREATIVE
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--ink-muted)]">
              We build digital experiences that help businesses grow.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-colors hover:border-[var(--primary-glow)] hover:text-[var(--primary)]"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="label-mono text-[var(--ink-faint)]">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--primary)]"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line)] pt-8 text-xs text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Aventra Creative. All rights reserved.
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] shadow-[var(--shadow-md)] transition-all duration-300 hover:border-[var(--primary-glow)] hover:scale-105 active:scale-95",
          showScrollTop
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-8 opacity-0 scale-90 pointer-events-none",
        )}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </footer>
  );
}
