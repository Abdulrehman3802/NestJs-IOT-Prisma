import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionsRepository } from './permissions.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PrismaService, PermissionsRepository, JwtService]
})
export class PermissionsModule {}
