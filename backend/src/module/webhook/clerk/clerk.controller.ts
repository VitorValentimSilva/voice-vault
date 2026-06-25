import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import * as Sentry from '@sentry/nestjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CLERK_EVENT, CLERK_ROUTE, CLERK_VERIFIED_EVENT_KEY } from '@/const/clerk.const';
import type { WebhookRequest } from '@/dto/clerk/clerk.dto';
import { ClerkGuard } from '@/module/webhook/clerk/clerk.guard';
import { UserCreateHandler } from '@/module/webhook/clerk/handler/user-create.handler';
import { UserDeleteHandler } from '@/module/webhook/clerk/handler/user-delete.handler';
import { UserUpdateHandler } from '@/module/webhook/clerk/handler/user-update.handler';

@ApiExcludeController()
@Controller(CLERK_ROUTE)
export class ClerkController {
  constructor(
    private readonly userCreateHandler: UserCreateHandler,
    private readonly userUpdateHandler: UserUpdateHandler,
    private readonly userDeleteHandler: UserDeleteHandler,
    @InjectPinoLogger(ClerkController.name)
    private readonly logger: PinoLogger
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ClerkGuard)
  async handleWebhook(@Req() req: WebhookRequest): Promise<void> {
    const event = req[CLERK_VERIFIED_EVENT_KEY];

    if (!event) {
      this.logger.error({ message: 'Verified event not found in the request' });

      return;
    }

    const fallbackEventType = event.type;

    this.logger.info(
      { eventType: fallbackEventType, timestamp: event.timestamp },
      'Clerk received'
    );

    return Sentry.startSpan({ name: `clerk.${fallbackEventType}`, op: 'webhook' }, async () => {
      switch (fallbackEventType) {
        case CLERK_EVENT.USER_CREATED:
          await this.userCreateHandler.handle(event.data);
          break;

        case CLERK_EVENT.USER_UPDATED:
          await this.userUpdateHandler.handle(event.data);
          break;

        case CLERK_EVENT.USER_DELETED:
          await this.userDeleteHandler.handle(event.data);
          break;

        default:
          this.logger.warn({ eventType: fallbackEventType }, 'Unmapped Clerk event type — ignored');
      }
    });
  }
}
