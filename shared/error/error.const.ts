import { ErrorCode } from '@/error/code/error.code';
import { ErrorSeverity } from '@/error/error.enum';

export const ERROR_METADATA: Record<ErrorCode, { status: number; severity: ErrorSeverity }> = {
  REDIS_INVALID_TTL_DURATION: { status: 400, severity: ErrorSeverity.LOW },
  REDIS_INVALID_SECONDS_DURATION: { status: 400, severity: ErrorSeverity.LOW },
  RATE_LIMIT_INVALID_IDENTIFIER_CONTENT: { status: 400, severity: ErrorSeverity.LOW },
  RATE_LIMIT_INVALID_CONTEXT: { status: 400, severity: ErrorSeverity.LOW },
  RATE_LIMIT_EXECUTION_FAILED: { status: 500, severity: ErrorSeverity.HIGH },
};
