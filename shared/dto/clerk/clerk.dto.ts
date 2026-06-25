import { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { z } from 'zod';

import { CLERK_VERIFIED_EVENT_KEY } from '@/const/clerk.const';
import { ClerkUserDeleteEventSchema } from '@/dto/clerk/clerk-delete.dto';
import { ClerkUserUpdateEventSchema } from '@/dto/clerk/clerk-update.dto';
import { ClerkUserSchema } from '@/dto/clerk/clerk-user.dto';

export const ClerkUserCreateEventSchema = z.object({
  type: z.literal('user.created'),
  data: ClerkUserSchema,
  object: z.literal('event'),
  timestamp: z.number(),
});

export const ClerkEventSchema = z.discriminatedUnion('type', [
  ClerkUserCreateEventSchema,
  ClerkUserUpdateEventSchema,
  ClerkUserDeleteEventSchema,
]);

export type ClerkEventDto = z.infer<typeof ClerkEventSchema>;

export type WebhookRequest = RawBodyRequest<Request> & {
  [CLERK_VERIFIED_EVENT_KEY]?: ClerkEventDto;
};
