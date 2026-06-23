import { HttpException } from '@nestjs/common';

import { ErrorCode } from '@/errorcode/error.code';
import { ERROR_METADATA } from '@/errorerror.const';

export class AppException extends HttpException {
  readonly code: ErrorCode;
  readonly context?: Record<string, unknown>;

  constructor(
    code: ErrorCode,
    options?: {
      status?: number;
      context?: Record<string, unknown>;
      cause?: unknown;
    }
  ) {
    const meta = ERROR_METADATA[code];
    const status = options?.status ?? meta.status;

    super({ error: code }, status, { cause: options?.cause });

    this.code = code;
    this.context = options?.context;
  }
}
