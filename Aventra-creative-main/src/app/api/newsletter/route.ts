import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ email: z.string().trim().email() })

// In-memory rate limiter — mirrors the contact route pattern.
// Swap for Upstash Redis if traffic grows past a single Vercel instance.
const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > MAX_REQUESTS
}

export async function POST(req: NextRequest) {
  // x-forwarded-for may be comma-separated; use only the first IP.
  const rawIp = req.headers.get('x-forwarded-for') ?? 'unknown'
  const ip = rawIp.split(',')[0].trim()
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests, try again shortly.' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Newsletter service is not configured' }, { status: 503 })
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    // Log gracefully — don't break the route for the visitor.
    console.error(
      '[newsletter] RESEND_AUDIENCE_ID is not set. ' +
        'Create an audience in your Resend dashboard and add its ID to .env.local.',
    )
    return NextResponse.json({ error: 'Newsletter is not fully configured' }, { status: 503 })
  }

  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Aventra-Creative/1.0',
    },
    body: JSON.stringify({ email: parsed.data.email, unsubscribed: false }),
  })

  // A duplicate subscription is still a successful outcome for the visitor.
  if (!response.ok && response.status !== 409) {
    console.error('Resend contact creation failed:', response.status)
    return NextResponse.json({ error: 'Unable to subscribe right now' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
