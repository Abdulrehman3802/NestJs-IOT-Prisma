import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesRepository, PrismaService, JwtService, UserRepository, PermissionsRepository],
  exports:[RolesService]
})
export class RolesModule {}
