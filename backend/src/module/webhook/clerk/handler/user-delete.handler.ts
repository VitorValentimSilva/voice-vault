import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { fromAsyncThrowable, Result } from 'neverthrow';

import { PrismaService } from '@/config/prisma/prisma.service';
import { ClerkUserDeleteDto } from '@/dto/clerk/clerk-delete.dto';
import { AppException } from '@/error/class/app-exception.class';
import { ERROR_CODE } from '@/error/code/error.code';

@Injectable()
export class UserDeleteHandler {
  constructor(
    @InjectPinoLogger(UserDeleteHandler.name)
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService
  ) {}

  async handle(data: ClerkUserDeleteDto): Promise<void> {
    const clerkUserId = data.id;

    if (!clerkUserId) {
      this.logger.warn({ data }, 'user.delete received without ID — ignored');

      return;
    }

    const softDelete = fromAsyncThrowable(
      () =>
        this.prisma.user.updateMany({
          where: {
            id: clerkUserId,
            deletedAt: null,
          },
          data: {
            isActive: false,
            deletedAt: new Date(),
          },
        }),
      (cause): AppException => {
        Sentry.captureException(cause, {
          tags: { handler: 'UserDeleteHandler', clerkUserId },
        });

        return new AppException(ERROR_CODE.COMMON_INTERNAL_ERROR, {
          cause,
          context: { handler: 'UserDeleteHandler', clerkUserId },
        });
      }
    );

    const result: Result<{ count: number }, AppException> = await softDelete();

    result.match(
      ({ count }) => {
        if (count === 0) {
          this.logger.warn(
            { clerkUserId },
            'user.delete: user not found or already deleted — ignored'
          );
          return;
        }

        this.logger.info({ clerkUserId }, 'User marked as deleted (soft delete)');
      },
      (error) => {
        this.logger.error(
          { clerkUserId, errorCode: error.code, errorContext: error.context },
          'Failed to delete user from database'
        );

        throw error;
      }
    );
  }
}
