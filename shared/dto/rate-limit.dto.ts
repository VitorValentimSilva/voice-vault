import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RateLimitResultSchema = z.object({
  success: z.boolean(),
  limit: z.number().int().nonnegative(),
  remaining: z.number().int().nonnegative(),
  reset: z.number().int().nonnegative(),
});

export class RateLimitResultDto extends createZodDto(RateLimitResultSchema) {}
