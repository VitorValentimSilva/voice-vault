import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import { ZodError } from 'zod';

import { AppException } from '@/error/class/app-exception.class';
import { ERROR_CODE } from '@/error/code/error.code';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof AppException) {
      response.status(exception.getStatus()).json({ error: exception.code });

      return;
    }

    if (exception instanceof ZodError) {
      const fields = exception.issues.map((e: ZodError['issues'][number]) => ({
        path: e.path.join('.'),
        message: e.message,
      }));

      this.logger.warn(
        {
          errorCode: ERROR_CODE.ZOD_ERROR_NOT_FOUND,
          fields,
          method: request.method,
          path: request.url,
        },
        'The ZodError was not caught by AllExceptionsFilter.'
      );

      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: ERROR_CODE.ZOD_ERROR_NOT_FOUND,
        fields,
      });

      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      this.logger.warn(
        {
          errorCode: HttpStatus[status],
          httpStatus: status,
          method: request.method,
          path: request.url,
          originalMessage: exception.message,
        },
        `Unmapped HttpException [${status}]`
      );

      Sentry.captureException(exception, {
        tags: { path: request.url, method: request.method },
      });

      response.status(status).json({ error: HttpStatus[status] });

      return;
    }

    const error = exception instanceof Error ? exception : new Error(String(exception));

    this.logger.error(
      {
        errorCode: ERROR_CODE.COMMON_INTERNAL_ERROR,
        method: request.method,
        path: request.url,
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack,
      },
      'Unhandled error caught by AllExceptionsFilter'
    );

    Sentry.captureException(error, {
      tags: {
        errorCode: ERROR_CODE.COMMON_INTERNAL_ERROR,
        path: request.url,
        method: request.method,
      },
    });

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: ERROR_CODE.COMMON_INTERNAL_ERROR });
  }
}
