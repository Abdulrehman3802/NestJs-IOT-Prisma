import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {PrismaService} from "../prisma/prisma.service";
import {UserRepository} from "./user.repository";
import {JwtModule} from "@nestjs/jwt";
import {EmailModule} from "../email/email.module";
import { FacilityModule } from 'src/facility/facility.module';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { DepartmentModule } from 'src/department/department.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports:[PrismaModule,JwtModule,EmailModule, RolesModule, FacilityModule, DepartmentModule, DeviceModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,UserRepository, PermissionsRepository],
  exports:[UserRepository,UserService]
})
export class UserModule {}
