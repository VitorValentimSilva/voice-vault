import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ClerkUserDeleteSchema = z.object({
  id: z.string().optional(),
  object: z.literal('user'),
  deleted: z.literal(true),
  external_id: z.string().optional(),
});

export class ClerkUserDeleteDto extends createZodDto(ClerkUserDeleteSchema) {}

export const ClerkUserDeleteEventSchema = z.object({
  type: z.literal('user.deleted'),
  data: ClerkUserDeleteSchema,
  object: z.literal('event'),
  timestamp: z.number(),
});
