import { RedisCode } from '@/error/code/redis.code';

export const ERROR_CODE = {
  ...RedisCode,
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
