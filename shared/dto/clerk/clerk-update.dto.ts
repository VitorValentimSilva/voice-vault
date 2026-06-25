import { z } from 'zod';

import { ClerkUserSchema } from '@/dto/clerk/clerk.dto';

export const ClerkUserUpdateEventSchema = z.object({
  type: z.literal('user.updated'),
  data: ClerkUserSchema,
  object: z.literal('event'),
  timestamp: z.number(),
});
