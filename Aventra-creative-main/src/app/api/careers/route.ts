import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { serverCareerSchema } from "@/lib/validations/career";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { resend } from "@/lib/resend";
import { CareerApplicationEmail } from "@/components/emails/CareerApplicationEmail";

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000 * 60; // 1 hour
const MAX_REQUESTS = 3; // 3 applications per hour per IP

function rateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

interface RenderEmailProps {
  name: string;
  email: string;
  phone: string;
  city?: string;
  country?: string;
  position: string;
  experience: string;
  skills?: string;
  college?: string;
  degree?: string;
  gradYear?: string;
  portfolioWebsite?: string;
  gitHub?: string;
  linkedIn?: string;
  whyJoin: string;
  bestProject: string;
  resumeBackupUrl: string;
  portfolioBackupUrl?: string;
}

// Use React.createElement instead of JSX so this file can remain .ts
// and avoid Next.js App Router misidentifying it as a React page component.
function createCareerApplicationEmail(props: RenderEmailProps) {
  return React.createElement(CareerApplicationEmail, {
    name: props.name,
    email: props.email,
    phone: props.phone,
    city: props.city,
    country: props.country,
    position: props.position,
    experience: props.experience,
    skills: props.skills,
    college: props.college,
    degree: props.degree,
    gradYear: props.gradYear,
    portfolioWebsite: props.portfolioWebsite,
    gitHub: props.gitHub,
    linkedIn: props.linkedIn,
    whyJoin: props.whyJoin,
    bestProject: props.bestProject,
    resumeBackupUrl: props.resumeBackupUrl,
    portfolioBackupUrl: props.portfolioBackupUrl,
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawIp = req.headers.get("x-forwarded-for") ?? "unknown";
    const ip = rawIp.split(",")[0].trim();
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many applications submitted from this IP. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const city = (formData.get("city") as string) || undefined;
    const country = (formData.get("country") as string) || undefined;
    const position = formData.get("position") as string;
    const experience = formData.get("experience") as string;
    const skills = (formData.get("skills") as string) || undefined;
    const college = (formData.get("college") as string) || undefined;
    const degree = (formData.get("degree") as string) || undefined;
    const gradYear = (formData.get("gradYear") as string) || undefined;
    const portfolioWebsite = (formData.get("portfolioWebsite") as string) || undefined;
    const gitHub = (formData.get("gitHub") as string) || undefined;
    const linkedIn = (formData.get("linkedIn") as string) || undefined;
    const whyJoin = formData.get("whyJoin") as string;
    const bestProject = formData.get("bestProject") as string;

    const resumeFile = formData.get("resume");
    const portfolioFile = formData.get("portfolioFile");

    // Pre-validate file presence to prevent processing huge empty payloads
    if (!resumeFile || !(resumeFile instanceof File)) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    const validationResult = serverCareerSchema.safeParse({
      name,
      email,
      phone,
      city,
      country,
      position,
      experience,
      college,
      degree,
      gradYear,
      portfolioWebsite,
      gitHub,
      linkedIn,
      whyJoin,
      bestProject,
      resume: resumeFile,
      portfolioFile: portfolioFile instanceof File && portfolioFile.size > 0 ? portfolioFile : undefined,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // Read resume buffer for direct attachment (avoids Cloudinary URL access issues)
    const resumeFileObj = resumeFile;
    const resumeBuffer = Buffer.from(await resumeFileObj.arrayBuffer());

    // Upload to Cloudinary for secure backup storage
    const resumeUrl = await uploadToCloudinary(resumeBuffer, resumeFileObj.name, "careers/resumes");

    // Process optional portfolio upload
    let portfolioUrl: string | undefined = undefined;
    let portfolioBuffer: Buffer | undefined = undefined;
    if (portfolioFile && portfolioFile instanceof File && portfolioFile.size > 0) {
      const portfolioFileObj = portfolioFile;
      portfolioBuffer = Buffer.from(await portfolioFileObj.arrayBuffer());
      portfolioUrl = await uploadToCloudinary(portfolioBuffer, portfolioFileObj.name, "careers/portfolios");
    }

    // Send email using Resend
    const adminEmail =
      process.env.CONTACT_TO_EMAIL ??
      process.env.CONTACT_EMAIL ??
      process.env.ADMIN_EMAIL ??
      "hello@aventracreative.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Aventra Careers <hello@aventracreative.com>";

    // Build attachments — pass raw Buffer so Resend handles base64 encoding internally.
    // Passing a pre-encoded base64 string causes double-encoding and corrupts the PDF.
    const emailAttachments: { filename: string; content: Buffer }[] = [
      {
        filename: resumeFileObj.name || `${name.replace(/\s+/g, "_")}_Resume.pdf`,
        content: resumeBuffer,
      },
    ];

    if (portfolioFile && portfolioFile instanceof File && portfolioFile.size > 0 && portfolioBuffer) {
      emailAttachments.push({
        filename: portfolioFile.name || `${name.replace(/\s+/g, "_")}_Portfolio.pdf`,
        content: portfolioBuffer,
      });
    }

    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `New Career Application - ${name}`,
      react: createCareerApplicationEmail({
        name,
        email,
        phone,
        city,
        country,
        position,
        experience,
        skills,
        college,
        degree,
        gradYear,
        portfolioWebsite,
        gitHub,
        linkedIn,
        whyJoin,
        bestProject,
        resumeBackupUrl: resumeUrl,
        portfolioBackupUrl: portfolioUrl,
      }),
      attachments: emailAttachments,
    });

    if (emailResult.error) {
      console.error("Resend email error:", emailResult.error);
      return NextResponse.json({ error: "Failed to send email notification." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully." });
  } catch (error: unknown) {
    console.error("API error in careers route:", error);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
