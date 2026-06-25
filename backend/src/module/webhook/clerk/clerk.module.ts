import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config/prisma/prisma.module';
import { ClerkController } from '@/module/webhook/clerk/clerk.controller';
import { ClerkGuard } from '@/module/webhook/clerk/clerk.guard';
import { UserCreateHandler } from '@/module/webhook/clerk/handler/user-create.handler';
import { UserDeleteHandler } from '@/module/webhook/clerk/handler/user-delete.handler';
import { UserUpdateHandler } from '@/module/webhook/clerk/handler/user-update.handler';

@Module({
  imports: [PrismaModule],
  controllers: [ClerkController],
  providers: [ClerkGuard, UserCreateHandler, UserUpdateHandler, UserDeleteHandler],
})
export class ClerkModule {}
