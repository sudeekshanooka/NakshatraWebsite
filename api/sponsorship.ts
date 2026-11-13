import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { isIP } from 'node:net';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type VercelRequest = IncomingMessage & { body: unknown };
type VercelResponse = ServerResponse & {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
};

const RECIPIENT = '2k16srs@gmail.com';
const MAX_BODY_BYTES = 8 * 1024;
const ALLOWED_INTERESTS = [
  'Financial sponsorship',
  'Products or services',
  'Community or promotional partnership',
  'Other',
] as const;

type SponsorshipInquiry = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  interest: (typeof ALLOWED_INTERESTS)[number];
  message: string;
  website: string;
};

let rateLimiter: Ratelimit | undefined;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string | undefined {
  return typeof value === 'string' ? value.trim() : undefined;
}

function hasControlCharacters(value: string, allowMessageLineBreaks = false): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    const isMessageWhitespace = allowMessageLineBreaks && [9, 10, 13].includes(code);
    return !isMessageWhitespace && (code < 32 || code === 127);
  });
}

function isAllowedInterest(value: string): value is SponsorshipInquiry['interest'] {
  return ALLOWED_INTERESTS.some((interest) => interest === value);
}

function validateInquiry(body: unknown): SponsorshipInquiry | undefined {
  if (!isRecord(body)) return undefined;
  const allowedFields = new Set(['name', 'organization', 'email', 'phone', 'interest', 'message', 'website']);
  if (Object.keys(body).some((key) => !allowedFields.has(key))) return undefined;

  const name = getString(body.name);
  const organization = getString(body.organization ?? '');
  const email = getString(body.email);
  const phone = getString(body.phone ?? '');
  const interest = getString(body.interest);
  const message = getString(body.message);
  const website = getString(body.website ?? '');

  if (
    name === undefined ||
    organization === undefined ||
    !email ||
    phone === undefined ||
    !interest ||
    !message ||
    website === undefined ||
    !name ||
    name.length > 120 ||
    organization.length > 160 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length > 40 ||
    !isAllowedInterest(interest) ||
    message.length > 4000
  ) {
    return undefined;
  }

  const shortFields = [name, organization, email, phone, interest, website];
  if (shortFields.some((value) => hasControlCharacters(value)) || hasControlCharacters(message, true)) {
    return undefined;
  }

  return {
    name,
    organization,
    email,
    phone,
    interest,
    message,
    website,
  };
}

function getRateLimiter(): Ratelimit {
  // Configure both in Vercel Environment Variables; do not hard-code credentials here.
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('Upstash rate-limit configuration is missing');

  if (!rateLimiter) {
    rateLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      prefix: 'nakshatra:sponsorship',
      analytics: false,
    });
  }
  return rateLimiter;
}

function getClientIp(request: VercelRequest): string | undefined {
  const forwardedFor = request.headers['x-forwarded-for'];
  const chain = Array.isArray(forwardedFor) ? forwardedFor.join(',') : forwardedFor;
  const ip = chain?.split(',').pop()?.trim();
  return ip && isIP(ip) ? ip : undefined;
}

function respondError(response: VercelResponse, status: number, message: string) {
  return response.status(status).json({ message });
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Vary', 'Origin');

  // Set this in Vercel to the site's origin (scheme and hostname only).
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  const origin = request.headers.origin;
  if (!allowedOrigin) {
    console.error('Sponsorship API is missing the ALLOWED_ORIGIN setting.');
    return respondError(response, 503, 'Sponsorship inquiries are temporarily unavailable.');
  }
  if (!origin || origin !== allowedOrigin) {
    return respondError(response, 403, 'This origin is not allowed.');
  }

  response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Max-Age', '86400');

  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    return respondError(response, 405, 'Method not allowed.');
  }

  const contentType = request.headers['content-type']?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return respondError(response, 415, 'Content-Type must be application/json.');
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return respondError(response, 413, 'The request is too large.');
  }

  const clientIp = getClientIp(request);
  if (!clientIp) return respondError(response, 403, 'Unable to verify the request source.');

  try {
    const { success, reset } = await getRateLimiter().limit(
      createHash('sha256').update(clientIp).digest('hex'),
    );
    if (!success) {
      response.setHeader('Retry-After', String(Math.max(1, Math.ceil((reset - Date.now()) / 1000))));
      return respondError(response, 429, 'Too many submissions. Please try again later.');
    }
  } catch (error) {
    console.error('Sponsorship rate limiting failed:', error);
    return respondError(response, 503, 'Sponsorship inquiries are temporarily unavailable.');
  }

  const bodyBytes = Buffer.byteLength(JSON.stringify(request.body) ?? '', 'utf8');
  if (bodyBytes > MAX_BODY_BYTES) {
    return respondError(response, 413, 'The request is too large.');
  }

  const inquiry = validateInquiry(request.body);
  if (!inquiry) return respondError(response, 400, 'Please check the inquiry fields and try again.');
  if (inquiry.website) return response.status(200).json({ message: 'Thanks for reaching out.' });


  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Sponsorship API is missing Resend email configuration.');
    return respondError(response, 503, 'Sponsorship inquiries are temporarily unavailable.');
  }

  const text = [
    `Name: ${inquiry.name}`,
    `Organization: ${inquiry.organization || 'Not provided'}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || 'Not provided'}`,
    `Sponsorship interest: ${inquiry.interest}`,
    '',
    'Message:',
    inquiry.message,
  ].join('\n');

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: inquiry.email,
        subject: 'New sponsorship inquiry',
        text,
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (!emailResponse.ok) {
      console.error('Resend rejected a sponsorship inquiry:', emailResponse.status);
      return respondError(response, 502, 'We could not send your inquiry. Please try again later.');
    }
  } catch (error) {
    console.error('Sponsorship email delivery failed:', error);
    return respondError(response, 502, 'We could not send your inquiry. Please try again later.');
  }

  return response.status(200).json({ message: 'Thanks for reaching out. We will be in touch soon.' });
}
