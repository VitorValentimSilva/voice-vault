import { ERROR_CODE, ErrorCode } from '@/error/code/error.code';
import { ErrorSeverity } from '@/error/error.enum';

export const ERROR_METADATA: Record<ErrorCode, { status: number; severity: ErrorSeverity }> = {
  [ERROR_CODE.REDIS_INVALID_TTL_DURATION]: { status: 400, severity: ErrorSeverity.LOW },
  [ERROR_CODE.REDIS_INVALID_SECONDS_DURATION]: { status: 400, severity: ErrorSeverity.LOW },
};
