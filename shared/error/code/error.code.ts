import { RATE_LIMIT_CODE } from '@/error/code/rate-limit.code';
import { REDIS_CODE } from '@/error/code/redis.code';

export const ERROR_CODE: Record<string, string> = {
  ...REDIS_CODE,
  ...RATE_LIMIT_CODE,
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;
