import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ClerkEmailAddressSchema = z.object({
  id: z.string(),
  email_address: z.email(),
  verification: z
    .object({
      status: z.string(),
      strategy: z.string(),
    })
    .nullable(),
  linked_to: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
    })
  ),
});

export const ClerkExternalAccountSchema = z.object({
  id: z.string(),
  provider: z.string(),
  identification_id: z.string(),
  provider_user_id: z.string(),
  approved_scopes: z.string(),
  email_address: z.email(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string(),
  username: z.string().nullable(),
  public_metadata: z.record(z.string(), z.unknown()),
  label: z.string().nullable(),
  verification: z
    .object({
      status: z.string(),
      strategy: z.string(),
      attempts: z.null(),
      expire_at: z.number().nullable(),
    })
    .nullable(),
});

export const ClerkUserSchema = z.object({
  id: z.string(),
  object: z.literal('user'),
  external_id: z.string().nullable(),
  primary_email_address_id: z.string().nullable(),
  primary_phone_number_id: z.string().nullable(),
  primary_web3_wallet_id: z.string().nullable(),
  username: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  image_url: z.string(),
  has_image: z.boolean(),
  email_addresses: z.array(ClerkEmailAddressSchema),
  phone_numbers: z.array(z.unknown()),
  web3_wallets: z.array(z.unknown()),
  external_accounts: z.array(ClerkExternalAccountSchema),
  public_metadata: z.record(z.string(), z.unknown()),
  private_metadata: z.record(z.string(), z.unknown()).nullable(),
  unsafe_metadata: z.record(z.string(), z.unknown()),
  last_sign_in_at: z.number().nullable(),
  banned: z.boolean(),
  locked: z.boolean(),
  lockout_expires_in_seconds: z.number().nullable(),
  verification_attempts_remaining: z.number().nullable(),
  created_at: z.number(),
  updated_at: z.number(),
  delete_self_enabled: z.boolean(),
  create_organization_enabled: z.boolean(),
  last_active_at: z.number().nullable(),
});

export class ClerkUserDto extends createZodDto(ClerkUserSchema) {}
