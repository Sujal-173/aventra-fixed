"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

const SERVICES = [
  "Web Development",
  "E-commerce",
  "SEO & Optimization",
  "Branding & Design",
  "Digital Marketing",
  "Maintenance",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] px-8 py-16 text-center"
      >
        <CheckCircle2
          className="h-10 w-10"
          style={{ color: "var(--success)" }}
        />
        <h3 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-[var(--ink)]">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--ink-muted)]">
          Thanks for reaching out — we&apos;ll reply within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[var(--primary-glow)] hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("company_website")}
      />

      <div className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] p-4 text-sm text-[var(--ink-muted)]">
        Share your goals, timeline and audience, and we’ll recommend the
        best digital solution for launch, growth, or optimization.
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-mono text-[var(--ink-faint)]">
            Your Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="label-mono text-[var(--ink-faint)]">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="label-mono text-[var(--ink-faint)]">
          Select Service
        </label>
        <select
          id="service"
          {...register("service")}
          className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary-glow)] focus:outline-none"
          defaultValue=""
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1.5 text-xs text-red-400">
            {errors.service.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="label-mono text-[var(--ink-faint)]">
          Your Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="mt-2 w-full resize-none rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
          placeholder="Share your goals, timeline, and success criteria for this project."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-glow), var(--primary))",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Send Message <Send className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {status === "error" && (
          <p className="text-center text-xs text-red-400">
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </form>
  );
}
