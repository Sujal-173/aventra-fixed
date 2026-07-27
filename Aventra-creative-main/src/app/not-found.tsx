"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-dark)] px-6 pt-20">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--primary)" }}
      />
      {/* scattered stars, cheap CSS-only decoration matching the reference's space theme */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[rgba(255,255,255,0.4)]"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            opacity: 0.2 + (i % 5) * 0.12,
          }}
        />
      ))}

      <div className="relative text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(4rem, 12vw, 8rem)", lineHeight: 1 }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--primary-glow), var(--primary))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-medium text-white"
        >
          Oops! Page Not Found
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-3 max-w-sm text-sm text-[var(--ink-faint)]"
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-glow), var(--primary))",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
