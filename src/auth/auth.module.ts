import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import { RolesRepository } from 'src/roles/roles.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import {EmailModule} from "../email/email.module";
import { OrganizationRepository } from 'src/organization/organization.repository';
import { FacilityRepository } from 'src/facility/facility.repository';
import { DepartmentRepository } from 'src/department/department.repository';
import { DeviceRepository } from 'src/device/device.repository';

@Module({
  imports:[UserModule,JwtModule,EmailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
     RolesRepository,
     PrismaService,
     OrganizationRepository,
     FacilityRepository,
     DepartmentRepository,
     DeviceRepository
    ]
})
export class AuthModule {}
