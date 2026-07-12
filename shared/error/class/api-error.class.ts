import { ApiErrorField, ApiErrorOptions, ErrorCode } from '@/error/code/error.code';

export class ApiError extends Error {
  readonly status: number;
  readonly code: ErrorCode | undefined;
  readonly fields: ApiErrorField[];
  readonly body: unknown;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, { cause: options.cause });

    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
    this.fields = options.fields ?? [];
    this.body = options.body;
  }
}
