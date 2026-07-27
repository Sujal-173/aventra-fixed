"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2.5" noValidate>
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-glow), var(--primary))",
        }}
      >
        {status === "loading"
          ? "..."
          : status === "success"
            ? "Subscribed"
            : "Subscribe"}
      </button>
      {status === "error" && (
        <span role="alert" className="text-xs text-red-400">
          Please enter a valid email address.
        </span>
      )}
    </form>
  );
}
