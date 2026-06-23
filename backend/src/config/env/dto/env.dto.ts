import * as Joi from 'joi';

import { NodeEnv } from '@/enum/env.enum';

export interface Env {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  SENTRY_DSN: string;
  CLERK_WEBHOOK_SECRET: string;
  POSTHOG_KEY: string;
  POSTHOG_HOST: string;
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
}

export const EnvSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(NodeEnv))
    .required(),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .required(),
  SENTRY_DSN: Joi.string().uri().required(),
  CLERK_WEBHOOK_SECRET: Joi.string().required(),
  POSTHOG_KEY: Joi.string().required(),
  POSTHOG_HOST: Joi.string().uri().required(),
  UPSTASH_REDIS_REST_URL: Joi.string().uri().required(),
  UPSTASH_REDIS_REST_TOKEN: Joi.string().required(),
});
