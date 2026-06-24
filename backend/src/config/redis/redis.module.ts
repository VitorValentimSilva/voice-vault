import { Global, Module } from '@nestjs/common';
import { Redis } from '@upstash/redis';

import { EnvService } from '@/config/env/env.service';
import { RedisService } from '@/config/redis/redis.service';
import { REDIS_CLIENT } from '@/const/redis.const';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [EnvService],
      useFactory: (env: EnvService): Redis => {
        return new Redis({
          url: env.upstashRedisUrl,
          token: env.upstashRedisToken,
          retry: false,
        });
      },
    },
    RedisService,
  ],
  exports: [REDIS_CLIENT, RedisService],
})
export class RedisModule {}
