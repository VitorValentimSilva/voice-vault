import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Webhook, WebhookRequiredHeaders } from 'svix';

import { EnvService } from '@/config/env/env.service';
import { RateLimitService } from '@/config/rate-limit/rate-limit.service';
import { CLERK_VERIFIED_EVENT_KEY } from '@/const/clerk.const';
import { ClerkEventSchema } from '@/dto/clerk/clerk.dto';
import { AppException } from '@/error/class/app-exception.class';
import { ERROR_CODE } from '@/error/code/error.code';
import { ClerkUtil } from '@/module/webhook/clerk/clerk.util';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(
    @InjectPinoLogger(ClerkGuard.name)
    private readonly logger: PinoLogger,
    private readonly envService: EnvService,
    private readonly ratelimit: RateLimitService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      rawBody?: Buffer;
      headers: Record<string, string | string[] | undefined>;
      ip?: string;
      ips?: string[];
      socket?: { remoteAddress?: string };
      [CLERK_VERIFIED_EVENT_KEY]?: unknown;
    }>();

    const ip = ClerkUtil.resolveIp(request);

    const rateLimitResult = await this.ratelimit.limit('clerkWebhook', ip);

    rateLimitResult.match(
      ({ success, limit, remaining, reset }) => {
        if (!success) {
          this.logger.warn({ ip, limit, remaining, reset }, 'Clerk blocked by rate limit');

          Sentry.captureMessage('Clerk rate limit reached', {
            level: 'warning',
            tags: { component: 'ClerkGuard', ip },
            extra: { limit, remaining, reset },
          });

          throw new AppException(ERROR_CODE.RATE_LIMIT_EXECUTION_FAILED, {
            context: { ip, limit, remaining, reset },
          });
        }
      },
      (error) => {
        this.logger.warn(
          { ip, errorCode: error.code },
          'Rate limit unavailable — allowing request (fail-open)'
        );
      }
    );

    const rawBody = request.rawBody;

    if (!rawBody?.length) {
      this.logger.warn({ ip }, 'Clerk received without rawBody');

      throw new AppException(ERROR_CODE.CLERK_MISSING_RAW_BODY, {
        context: { ip },
      });
    }

    const svixId = request.headers['svix-id'];
    const svixTimestamp = request.headers['svix-timestamp'];
    const svixSignature = request.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      this.logger.warn({
        ip,
        hasSvixId: Boolean(svixId),
        hasSvixTimestamp: Boolean(svixTimestamp),
        hasSvixSignature: Boolean(svixSignature),
        message: 'Missing mandatory Svix headers',
      });

      throw new AppException(ERROR_CODE.CLERK_MISSING_SVIX_HEADERS, {
        context: { ip },
      });
    }

    const svixHeaders: WebhookRequiredHeaders = {
      'svix-id': String(svixId),
      'svix-timestamp': String(svixTimestamp),
      'svix-signature': String(svixSignature),
    };

    let rawVerified: unknown;

    try {
      rawVerified = new Webhook(this.envService.clerkWebhookSecret).verify(
        rawBody.toString('utf8'),
        svixHeaders
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      this.logger.warn({
        ip,
        svixId: String(svixId),
        errorMessage: error.message,
        message: 'Failed to validate Svix signature',
      });

      throw new AppException(ERROR_CODE.CLERK_INVALID_SIGNATURE, {
        context: { ip, svixId: String(svixId) },
      });
    }

    const parsed = ClerkEventSchema.safeParse(rawVerified);

    if (!parsed.success) {
      const issues = parsed.error.issues;

      const fields = issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      this.logger.warn(
        { ip, svixId: String(svixId), fields },
        'Clerk payload failed Zod validation'
      );

      throw new AppException(ERROR_CODE.CLERK_INVALID_PAYLOAD, {
        context: { ip, svixId: String(svixId), fields },
      });
    }

    request[CLERK_VERIFIED_EVENT_KEY] = parsed.data;

    return true;
  }
}
