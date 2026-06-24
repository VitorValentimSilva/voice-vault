import { Ratelimit } from '@upstash/ratelimit';

export const RATE_LIMIT_CLIENT = Symbol('RATE_LIMIT_CLIENT');

export const RATE_LIMIT_CONFIG = {
  clerkWebhook: {
    prefix: 'rate-limit:clerk-webhook',
    limiter: Ratelimit.slidingWindow(30, '60s'),
    analytics: true,
  },
} as const;

export type RateLimitConfig = keyof typeof RATE_LIMIT_CONFIG;
