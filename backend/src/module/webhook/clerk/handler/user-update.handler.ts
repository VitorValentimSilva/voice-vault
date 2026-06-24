import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { fromAsyncThrowable, Result } from 'neverthrow';

import { PrismaService } from '@/config/prisma/prisma.service';
import { ClerkUserDto } from '@/dto/clerk/clerk.dto';
import { ERROR_CODE } from '@/error/code/error.code';
import { AppException } from '@/error/error.class';
import { ClerkUtil } from '@/module/webhook/clerk/clerk.util';

@Injectable()
export class UserUpdateHandler {
  constructor(
    @InjectPinoLogger(UserUpdateHandler.name)
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService
  ) {}

  async handle(data: ClerkUserDto): Promise<void> {
    const email = ClerkUtil.resolvePrimaryEmail(data);
    const name = ClerkUtil.resolveFullName(data);
    const currentProvider = ClerkUtil.resolveProvider(data);

    const updateMany = fromAsyncThrowable(
      () =>
        this.prisma.user.updateMany({
          where: {
            id: data.id,
            deletedAt: null,
          },
          data: {
            ...(email ? { email } : {}),
            name,
            avatarUrl: data.image_url || null,
            currentProvider,
            banned: data.banned,
            lastSignInAt: data.last_sign_in_at ? new Date(data.last_sign_in_at) : undefined,
          },
        }),
      (cause): AppException => {
        Sentry.captureException(cause, {
          tags: { handler: 'UserUpdateHandler', clerkUserId: data.id },
        });

        return new AppException(ERROR_CODE.COMMON_INTERNAL_ERROR, {
          cause,
          context: { handler: 'UserUpdateHandler', clerkUserId: data.id },
        });
      }
    );

    const result: Result<{ count: number }, AppException> = await updateMany();

    result.match(
      ({ count }) => {
        if (count === 0) {
          this.logger.warn(
            { clerkUserId: data.id },
            'user.update: user not found in database — possible out-of-order replay'
          );
          return;
        }

        this.logger.info({ clerkUserId: data.id }, 'User update successfully');
      },
      (error) => {
        this.logger.error(
          { clerkUserId: data.id, errorCode: error.code, errorContext: error.context },
          'Failed to update user in database'
        );

        throw error;
      }
    );
  }
}
