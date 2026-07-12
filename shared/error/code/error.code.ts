import { CLERK_CODE } from '@/error/code/clerk.code';
import { COMMON_CODE } from '@/error/code/common.code';
import { LIBS_CODE } from '@/error/code/libs.code';
import { RATE_LIMIT_CODE } from '@/error/code/rate-limit.code';
import { REDIS_CODE } from '@/error/code/redis.code';
import { ZOD_CODE } from '@/error/code/zod.code';

export const ERROR_CODE = {
  ...REDIS_CODE,
  ...RATE_LIMIT_CODE,
  ...COMMON_CODE,
  ...ZOD_CODE,
  ...CLERK_CODE,
  ...LIBS_CODE,
} as const;

export type ErrorCode = keyof typeof ERROR_CODE;

export interface ErrorResponse {
  error: ErrorCode;
}

export type ErrorTitleKey = `error:codes.${ErrorCode}.title`;
export type ErrorDescriptionKey = `error:codes.${ErrorCode}.description`;
export type FallbackTranslationKey = 'error:fallback.title' | 'error:fallback.description';
export type ErrorTranslationKey = ErrorTitleKey | ErrorDescriptionKey | FallbackTranslationKey;

export type ApiErrorField = {
  path: string;
  message: string;
};

export type ApiErrorPayload = {
  error?: unknown;
  fields?: unknown;
};

export type LocalizedErrorCopy = {
  title: string;
  description: string;
};

export type NormalizedApiError = {
  code: ErrorCode | undefined;
  copy: LocalizedErrorCopy;
  fields: ApiErrorField[];
};

export type ApiErrorOptions = {
  status: number;
  code?: ErrorCode;
  fields?: ApiErrorField[];
  body?: unknown;
  cause?: unknown;
};
