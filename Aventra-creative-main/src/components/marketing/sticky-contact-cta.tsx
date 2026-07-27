"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/919876543210";

/**
 * Floating WhatsApp CTA. Hidden on /contact itself (the full contact
 * channels are already front and center there — a floating duplicate
 * would just be visual noise) and on /studio (Sanity's own UI).
 */
export function StickyContactCta() {
  const pathname = usePathname();
  if (pathname?.startsWith("/contact") || pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-[65] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[var(--shadow-lg)] transition-transform hover:scale-105 focus-visible:scale-105"
      style={{
        background: "linear-gradient(135deg, var(--primary-glow), var(--primary))",
      }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
