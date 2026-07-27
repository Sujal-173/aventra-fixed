"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "aventra-cookie-consent";

type Consent = "accepted" | "rejected";

/**
 * Minimal, functional cookie-consent banner.
 *
 * Scope note: this site currently sets no non-essential cookies of its own —
 * the only client-side storage is this consent flag itself (localStorage,
 * not a cookie) plus the theme preference in navbar.tsx. If analytics, ads,
 * or embedded third-party widgets are added later, gate them behind
 * `getCookieConsent() === "accepted"` so the banner's choice is actually
 * enforced rather than cosmetic.
 */
export function getCookieConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const decide = (consent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-[var(--line)] bg-[var(--bg-elevated)]/95 px-6 py-5 backdrop-blur-xl [box-shadow:0_-8px_30px_rgba(23,17,44,0.08)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
          We use essential cookies to run this site, and optional cookies to
          understand how it&apos;s used. Read our{" "}
          <Link
            href="/privacy"
            className="font-medium text-[var(--ink)] underline underline-offset-2 hover:text-[var(--primary)]"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => decide("rejected")}
            className="flex min-h-11 items-center rounded-full border border-[var(--line)] px-5 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--primary-glow)]"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-glow), var(--primary))",
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
