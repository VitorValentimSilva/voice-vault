import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';
import { LoggerModule } from 'nestjs-pino';

import { EnvSchema } from '@/config/env/dto/env.dto';
import { EnvModule } from '@/config/env/env.module';
import { PrismaModule } from '@/config/prisma/prisma.module';
import { RateLimitModule } from '@/config/rate-limit/rate-limit.module';
import { RedisModule } from '@/config/redis/redis.module';

const isProd = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: EnvSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: isProd ? 'info' : 'debug',
        transport: isProd
          ? undefined
          : {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
              },
            },
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.newPassword',
            'req.body.currentPassword',
            'req.body.token',
          ],
          remove: true,
        },
      },
    }),
    SentryModule.forRoot(),
    EnvModule,
    PrismaModule,
    RedisModule,
    RateLimitModule,
  ],
})
export class AppConfigModule {}
