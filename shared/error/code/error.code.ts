import { CLERK_CODE } from '@/error/code/clerk.code';
import { COMMON_CODE } from '@/error/code/common.code';
import { RATE_LIMIT_CODE } from '@/error/code/rate-limit.code';
import { REDIS_CODE } from '@/error/code/redis.code';
import { ZOD_CODE } from '@/error/code/zod.code';

export const ERROR_CODE: Record<string, string> = {
  ...REDIS_CODE,
  ...RATE_LIMIT_CODE,
  ...COMMON_CODE,
  ...ZOD_CODE,
  ...CLERK_CODE,
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;

export interface ErrorResponse {
  error: ErrorCode;
}
