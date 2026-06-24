import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { RATE_LIMIT_CONFIGS } from '@/const/rate-limit.const';

export type RateLimitContext = keyof typeof RATE_LIMIT_CONFIGS;

export const RateLimitResultSchema = z.object({
  success: z.boolean(),
  limit: z.number().int().nonnegative(),
  remaining: z.number().int().nonnegative(),
  reset: z.number().int().nonnegative(),
});

export class RateLimitResultDto extends createZodDto(RateLimitResultSchema) {}
