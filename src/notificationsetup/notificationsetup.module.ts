import { Module } from '@nestjs/common';
import { NotificationsetupService } from './notificationsetup.service';
import { NotificationsetupController } from './notificationsetup.controller';
import { NotificationsetupRepository } from './notificationsetup.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [NotificationsetupController],
  providers: [NotificationsetupService, NotificationsetupRepository, PrismaService, PermissionsRepository, JwtService]
})
export class NotificationsetupModule {}
