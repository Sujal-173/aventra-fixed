import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

// Simple in-memory rate limit — fine for a solo-agency scale site on a single
// Vercel region. Swap for Upstash Redis if traffic grows past one instance.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  // x-forwarded-for may be a comma-separated list of IPs when behind a proxy;
  // use only the first (client-facing) IP to prevent trivial header spoofing.
  const rawIp = req.headers.get("x-forwarded-for") ?? "unknown";
  const ip = rawIp.split(",")[0].trim();
  if (rateLimited(ip)) {

    return NextResponse.json({ error: "Too many requests, try again shortly." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (parsed.data.company_website) {
    // honeypot tripped — silently accept without sending, don't tip off bots
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const { name, email, service, message } = parsed.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL ?? "Aventra Creative <hello@aventracreative.com>",
      to: [process.env.CONTACT_EMAIL ?? process.env.ADMIN_EMAIL ?? "hello@aventracreative.com"],
      reply_to: email,
      subject: `New contact request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service ?? "Not specified"}\n\nMessage:\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend email failed:", await response.text());
    return NextResponse.json({ error: "Unable to send message" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
