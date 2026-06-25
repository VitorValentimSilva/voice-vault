import { z } from 'zod';

import { ClerkUserSchema } from '@/dto/clerk/clerk-user.dto';

export const ClerkUserUpdateEventSchema = z.object({
  type: z.literal('user.updated'),
  data: ClerkUserSchema.pick({ id: true }).extend({
    object: z.literal('user').optional(),
    external_id: z.string().nullable().optional(),
    primary_email_address_id: z.string().nullable().optional(),
    primary_phone_number_id: z.string().nullable().optional(),
    primary_web3_wallet_id: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    first_name: z.string().nullable().optional(),
    last_name: z.string().nullable().optional(),
    image_url: z.string().optional(),
    has_image: z.boolean().optional(),
    email_addresses: z.array(z.any()).optional(),
    phone_numbers: z.array(z.any()).optional(),
    web3_wallets: z.array(z.any()).optional(),
    external_accounts: z.array(z.any()).optional(),
    public_metadata: z.record(z.string(), z.unknown()).optional(),
    private_metadata: z.record(z.string(), z.unknown()).nullable().optional(),
    unsafe_metadata: z.record(z.string(), z.unknown()).optional(),
    last_sign_in_at: z.number().nullable().optional(),
    banned: z.boolean().optional(),
    locked: z.boolean().optional(),
    lockout_expires_in_seconds: z.number().nullable().optional(),
    verification_attempts_remaining: z.number().nullable().optional(),
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
    delete_self_enabled: z.boolean().optional(),
    create_organization_enabled: z.boolean().optional(),
    last_active_at: z.number().nullable().optional(),
  }),
  object: z.literal('event'),
  timestamp: z.number(),
});
