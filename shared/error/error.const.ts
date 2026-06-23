import { ErrorCode } from '@/errorcode/error.code';
import { ErrorSeverity } from '@/errorerror.enum';

export const ERROR_METADATA: Record<ErrorCode, { status: number; severity: ErrorSeverity }> = {
  REDIS_INVALID_TTL_DURATION: { status: 400, severity: ErrorSeverity.LOW },
  REDIS_INVALID_SECONDS_DURATION: { status: 400, severity: ErrorSeverity.LOW },
};
