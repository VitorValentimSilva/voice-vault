import { Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { fromAsyncThrowable, Result } from 'neverthrow';

import { PrismaService } from '@/config/prisma/prisma.service';
import { ClerkUserDto } from '@/dto/clerk/clerk-user.dto';
import { AppException } from '@/error/class/app-exception.class';
import { ERROR_CODE } from '@/error/code/error.code';
import { ClerkUtil } from '@/module/webhook/clerk/clerk.util';

@Injectable()
export class UserCreateHandler {
  constructor(
    @InjectPinoLogger(UserCreateHandler.name)
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService
  ) {}

  async handle(data: ClerkUserDto): Promise<void> {
    const email = ClerkUtil.resolvePrimaryEmail(data);

    if (!email) {
      this.logger.warn({ clerkUserId: data.id }, 'user.create without primary email — ignored');

      return;
    }

    const name = ClerkUtil.resolveFullName(data);
    const currentProvider = ClerkUtil.resolveProvider(data);

    const upsert = fromAsyncThrowable(
      () =>
        this.prisma.user.upsert({
          where: { id: data.id },
          create: {
            id: data.id,
            email,
            name,
            avatarUrl: data.image_url || null,
            currentProvider,
            lastSignInAt: data.last_sign_in_at ? new Date(data.last_sign_in_at) : null,
            banned: data.banned,
            isActive: true,
          },
          update: {
            email,
            name,
            avatarUrl: data.image_url || null,
            currentProvider,
          },
        }),
      (cause): AppException => {
        Sentry.captureException(cause, {
          tags: { handler: 'UserCreateHandler', clerkUserId: data.id },
          extra: { email },
        });

        return new AppException(ERROR_CODE.COMMON_INTERNAL_ERROR, {
          cause,
          context: { handler: 'UserCreateHandler', clerkUserId: data.id, email },
        });
      }
    );

    const result: Result<unknown, AppException> = await upsert();

    result.match(
      () => {
        this.logger.info({ clerkUserId: data.id, email }, 'User create successfully');
      },
      (error) => {
        this.logger.error(
          { clerkUserId: data.id, errorCode: error.code, errorContext: error.context },
          'Failed to create user in database'
        );

        throw error;
      }
    );
  }
}
