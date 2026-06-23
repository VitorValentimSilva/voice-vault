import { RATE_LIMIT_CODE } from '@/error/code/rate-limit.code';
import { REDIS_CODE } from '@/error/code/redis.code';

export const ERROR_CODE = {
  ...REDIS_CODE,
  ...RATE_LIMIT_CODE,
} as const;

export type ErrorCode =
  | (typeof RATE_LIMIT_CODE)[keyof typeof RATE_LIMIT_CODE]
  | (typeof REDIS_CODE)[keyof typeof REDIS_CODE];
