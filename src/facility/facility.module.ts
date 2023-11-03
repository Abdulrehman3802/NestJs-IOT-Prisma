import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { FacilityRepository } from './facility.repository';
import { JwtService } from '@nestjs/jwt';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import {UserModule} from "../user/user.module";
import {RolesModule} from "../roles/roles.module";

@Module({
  imports: [PrismaModule,UserModule,RolesModule],
  controllers: [FacilityController],
  providers: [FacilityService, PrismaService, FacilityRepository, PermissionsRepository, JwtService]
})
export class FacilityModule { }
