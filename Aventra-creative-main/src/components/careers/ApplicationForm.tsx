"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  FileText,
  UploadCloud,
  X,
  User,
  Briefcase,
  Link2,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import {
  clientCareerSchema,
  type CareerFormValues,
} from "@/lib/validations/career";
import Link from "next/link";

const POSITIONS = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Designer",
  "SEO & Content Strategist",
  "Digital Marketing Executive",
  "Project Manager",
  "Other",
];

const EXPERIENCE_LEVELS = [
  "Entry level / Fresh Graduate",
  "Junior (1-2 years)",
  "Mid-level (3-5 years)",
  "Senior (5+ years)",
  "Lead / Director",
];

export function ApplicationForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(clientCareerSchema),
    defaultValues: {
      position: "",
      experience: "",
    },
  });

  // useWatch subscribes only to these inputs and is compatible with the
  // React Compiler, unlike useForm().watch().
  const [watchResume, watchPortfolioFile] = useWatch({
    control,
    name: ["resume", "portfolioFile"],
  });

  const isBrowserFileList = (val: unknown): val is FileList =>
    typeof window !== "undefined" &&
    typeof FileList !== "undefined" &&
    val instanceof FileList;

  const resumeFile = isBrowserFileList(watchResume)
    ? watchResume.item(0)
    : watchResume;
  const portfolioFile = isBrowserFileList(watchPortfolioFile)
    ? watchPortfolioFile.item(0)
    : watchPortfolioFile;

  async function onSubmit(data: CareerFormValues) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();

      // Append text fields
      Object.keys(data).forEach((key) => {
        if (key !== "resume" && key !== "portfolioFile") {
          const value = data[key as keyof CareerFormValues];
          if (value !== undefined && value !== null) {
            formData.append(key, value as string);
          }
        }
      });

      // Append files
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      if (portfolioFile) {
        formData.append("portfolioFile", portfolioFile);
      }

      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit your application.");
      }

      setStatus("success");
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setErrorMessage(message);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--surface)] px-8 py-20 text-center shadow-[var(--shadow-lg)]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-[var(--primary)] mb-6">
          <CheckCircle2 className="h-10 w-10 text-[var(--primary)]" />
        </div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
          Application Submitted Successfully
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
          Thank you for applying to join the Aventra Creative team! Our talent
          acquisition team will review your qualifications and get back to you
          shortly.
        </p>

        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] p-4 max-w-sm w-full shadow-sm text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)] label-mono">
            What&apos;s Next?
          </div>
          <div className="mt-2 text-sm text-[var(--ink)] font-medium">
            Review Timeline
          </div>
          <div className="text-xs text-[var(--ink-muted)] mt-1">
            Expected response: 5–7 business days
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--primary-deep)] hover:scale-105 active:scale-95 duration-200"
        >
          Return Home
        </Link>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* SECTION 1: PERSONAL INFORMATION */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[var(--primary)]">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              Personal Information
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Let&apos;s start with your basics.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Full Name *
              </label>
              <input
                id="name"
                {...register("name")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="Jane Doe"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="jane@company.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="label-mono text-[var(--ink-faint)] text-xs"
            >
              Phone Number *
            </label>
            <input
              id="phone"
              {...register("phone")}
              className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
              placeholder="+91 98765 43210"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                City
              </label>
              <input
                id="city"
                {...register("city")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="Indore"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Country
              </label>
              <input
                id="country"
                {...register("country")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="India"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROFESSIONAL INFORMATION */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[var(--primary)]">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              Professional Details
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Tell us about your career and education.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="position"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Position Applying For *
              </label>
              <select
                id="position"
                {...register("position")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary-glow)] focus:outline-none cursor-pointer"
                aria-invalid={!!errors.position}
              >
                <option value="" disabled>
                  Select a position
                </option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="experience"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Experience Level *
              </label>
              <select
                id="experience"
                {...register("experience")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--primary-glow)] focus:outline-none cursor-pointer"
                aria-invalid={!!errors.experience}
              >
                <option value="" disabled>
                  Select your experience
                </option>
                {EXPERIENCE_LEVELS.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              {errors.experience && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label
                htmlFor="college"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                College / University
              </label>
              <input
                id="college"
                {...register("college")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="IIT Bombay"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="degree"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Degree
              </label>
              <input
                id="degree"
                {...register("degree")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="B.Tech Computer Science"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="gradYear"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Graduation Year
              </label>
              <input
                id="gradYear"
                {...register("gradYear")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="2025"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: PROFESSIONAL LINKS */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[var(--primary)]">
            <Link2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              Professional Links
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Where can we find your work?
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label
                htmlFor="portfolioWebsite"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                Portfolio Website
              </label>
              <input
                id="portfolioWebsite"
                {...register("portfolioWebsite")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="https://janedoe.dev"
                aria-invalid={!!errors.portfolioWebsite}
              />
              {errors.portfolioWebsite && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.portfolioWebsite.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="gitHub"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                GitHub Profile
              </label>
              <input
                id="gitHub"
                {...register("gitHub")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="https://github.com/janedoe"
                aria-invalid={!!errors.gitHub}
              />
              {errors.gitHub && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.gitHub.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="linkedIn"
                className="label-mono text-[var(--ink-faint)] text-xs"
              >
                LinkedIn Profile
              </label>
              <input
                id="linkedIn"
                {...register("linkedIn")}
                className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
                placeholder="https://linkedin.com/in/janedoe"
                aria-invalid={!!errors.linkedIn}
              />
              {errors.linkedIn && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">
                  {errors.linkedIn.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: QUESTIONNAIRE */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[var(--primary)]">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              Application Questions
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Tell us a bit about your motivations.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="whyJoin"
              className="label-mono text-[var(--ink-faint)] text-xs"
            >
              Why do you want to join Aventra Creative? *
            </label>
            <textarea
              id="whyJoin"
              rows={4}
              {...register("whyJoin")}
              className="mt-2 w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
              placeholder="What attracts you to our work, culture, and projects?"
              aria-invalid={!!errors.whyJoin}
            />
            {errors.whyJoin && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.whyJoin.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bestProject"
              className="label-mono text-[var(--ink-faint)] text-xs"
            >
              Tell us about your best project. *
            </label>
            <textarea
              id="bestProject"
              rows={4}
              {...register("bestProject")}
              className="mt-2 w-full resize-none rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:border-[var(--primary-glow)] focus:outline-none"
              placeholder="What was the challenge, the tech stack, your role, and the final impact?"
              aria-invalid={!!errors.bestProject}
            />
            {errors.bestProject && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.bestProject.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5: FILE UPLOADS */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4 mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-[var(--primary)]">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-[var(--ink)]">
              Documents Upload
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-0.5">
              Please upload PDF documents under 5MB.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Resume PDF Field */}
          <div>
            <span className="label-mono text-[var(--ink-faint)] text-xs font-semibold block mb-2">
              Resume (PDF only) *
            </span>
            <div className="relative">
              {!resumeFile ? (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[var(--line)] rounded-2xl cursor-pointer hover:border-[var(--primary-glow)] bg-[var(--bg-elevated)] transition-colors duration-200">
                  <UploadCloud className="h-8 w-8 text-[var(--ink-faint)] mb-2" />
                  <span className="text-xs font-medium text-[var(--ink)]">
                    Click to upload Resume
                  </span>
                  <span className="text-[10px] text-[var(--ink-faint)] mt-1">
                    PDF max 5MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    {...register("resume")}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 border border-[var(--line)] bg-[var(--bg-elevated)] rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[var(--primary)]">
                      <FileCheck className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-[var(--ink)] truncate">
                        {resumeFile.name}
                      </p>
                      <p className="text-[10px] text-[var(--ink-faint)] mt-0.5">
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · PDF
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setValue("resume", undefined as never)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-faint)] hover:bg-[var(--surface)] hover:text-[var(--ink)] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {errors.resume && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.resume.message as string}
              </p>
            )}
          </div>

          {/* Portfolio PDF Field (Optional) */}
          <div>
            <span className="label-mono text-[var(--ink-faint)] text-xs font-semibold block mb-2">
              Portfolio PDF (Optional)
            </span>
            <div className="relative">
              {!portfolioFile ? (
                <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-[var(--line)] rounded-2xl cursor-pointer hover:border-[var(--primary-glow)] bg-[var(--bg-elevated)] transition-colors duration-200">
                  <UploadCloud className="h-8 w-8 text-[var(--ink-faint)] mb-2" />
                  <span className="text-xs font-medium text-[var(--ink)]">
                    Click to upload Portfolio
                  </span>
                  <span className="text-[10px] text-[var(--ink-faint)] mt-1">
                    PDF max 5MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    {...register("portfolioFile")}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 border border-[var(--line)] bg-[var(--bg-elevated)] rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[var(--primary)]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-[var(--ink)] truncate">
                        {portfolioFile.name}
                      </p>
                      <p className="text-[10px] text-[var(--ink-faint)] mt-0.5">
                        {(portfolioFile.size / (1024 * 1024)).toFixed(2)} MB ·
                        PDF
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setValue("portfolioFile", undefined as never)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-faint)] hover:bg-[var(--surface)] hover:text-[var(--ink)] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            {errors.portfolioFile && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">
                {errors.portfolioFile.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {status === "error" && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 font-medium">
          {errorMessage}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer duration-150"
        style={{
          background:
            "linear-gradient(135deg, var(--primary-glow), var(--primary))",
        }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting
            Application...
          </>
        ) : (
          "Submit Career Application"
        )}
      </button>
    </form>
  );
}
