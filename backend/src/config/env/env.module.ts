import { Global, Module } from '@nestjs/common';

import { EnvService } from '@/config/env/env.service';

@Global()
@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
