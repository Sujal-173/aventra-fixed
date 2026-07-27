"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    name: "Web Development",
    href: "/services/web-development",
    blurb: "Fast, scalable, custom-built",
  },
  {
    name: "E-commerce",
    href: "/services/e-commerce",
    blurb: "Stores built to convert",
  },
  {
    name: "SEO & Optimization",
    href: "/services/seo",
    blurb: "Ranked, measured, growing",
  },
  {
    name: "Branding & Design",
    href: "/services/branding",
    blurb: "Identity that holds up",
  },
  {
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    blurb: "Campaigns tied to revenue",
  },
  {
    name: "Maintenance",
    href: "/services/maintenance",
    blurb: "Ongoing support & updates",
  },
];

const NAV_LINKS = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "Pricing", href: "/pricing" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("aventra-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : preferredTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("aventra-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.clearTimeout(focusTimer);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-[var(--bg-elevated)]/90 backdrop-blur-md border-[var(--line)] shadow-[0_4px_22px_rgba(38,22,82,0.05)]"
          : "bg-[var(--bg-elevated)]/75 backdrop-blur-sm border-transparent",
      )}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        style={{ height: "4.5rem" }}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Aventra Creative — home"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[var(--primary-soft)] transition-transform group-hover:scale-105">
            <Image
              src="/images/logo-icon.png"
              alt="Aventra Creative logo"
              fill
              className="object-contain p-1"
              sizes="36px"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-space-grotesk)] text-[15px] font-bold tracking-tight text-[var(--ink)]">
              AVENTRA
            </span>
            <span className="label-mono text-[9px] text-[var(--primary-glow)]">
              CREATIVE
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                "flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors",
                pathname.startsWith("/services")
                  ? "bg-[var(--primary-soft)] font-semibold text-[var(--primary)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--primary)]",
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                >
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] p-3 shadow-[0_20px_60px_-15px_rgba(67,56,202,0.18)]">
                    <div className="grid grid-cols-2 gap-1">
                      {SERVICES.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          className="rounded-xl px-4 py-3 transition-colors hover:bg-[var(--surface)]"
                        >
                          <div className="text-sm font-medium text-[var(--ink)]">
                            {s.name}
                          </div>
                          <div className="mt-0.5 text-xs text-[var(--ink-muted)]">
                            {s.blurb}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-[var(--line)] px-4 py-2 pt-2">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-xs font-medium text-[var(--primary-glow)] hover:underline"
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((l) => {
            const isActive =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href + "/"));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--primary-soft)] font-semibold text-[var(--primary)]"
                    : "text-[var(--ink-muted)] hover:text-[var(--primary)]",
                )}
              >
                {l.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition-colors hover:border-[var(--primary)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            href="/contact"
            className="rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-glow), var(--primary))",
            }}
          >
            Let&apos;s Talk
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition-colors hover:border-[var(--primary-glow)]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--bg)]/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setMobileOpen(false);
              }
            }}
          >
            <div ref={dialogRef} tabIndex={-1} className="flex h-full flex-col">
              <div
                className="flex h-18 items-center justify-between border-b border-[var(--line)] px-6"
                style={{ height: "4.5rem" }}
              >
                <span className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[var(--ink)]">
                  Aventra Creative
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink)] transition-colors hover:border-[var(--primary-glow)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav
                id="mobile-navigation"
                className="flex flex-1 flex-col gap-1 bg-[var(--bg-elevated)] px-6 py-6"
                aria-label="Mobile"
              >
                {[{ name: "Services", href: "/services" }, ...NAV_LINKS].map(
                  (item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/" &&
                        pathname.startsWith(item.href + "/"));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "border-b border-[var(--line)] py-4 font-[family-name:var(--font-space-grotesk)] text-2xl font-medium transition-colors",
                          isActive
                            ? "font-semibold text-[var(--primary-glow)]"
                            : "text-[var(--ink)] hover:text-[var(--primary-glow)]",
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  },
                )}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 rounded-full px-6 py-3.5 text-center text-sm font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-glow), var(--primary))",
                  }}
                >
                  Let&apos;s Talk
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
