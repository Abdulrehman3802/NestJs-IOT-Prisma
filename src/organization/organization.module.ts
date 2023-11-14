import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { OrganizationRepository } from './organization.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';
import {UserModule} from "../user/user.module";
import {RolesModule} from "../roles/roles.module";
import { FacilityModule } from 'src/facility/facility.module';
import { DepartmentModule } from 'src/department/department.module';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import {DashboardModule} from "../dashboard/dashboard.module";

@Module({
  imports: [PrismaModule,UserModule,RolesModule,FacilityModule, DepartmentModule, DeviceModule, SensorModule,DashboardModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, PrismaService, OrganizationRepository, PermissionsRepository, JwtService],
  exports:[OrganizationService]
})
export class OrganizationModule { }
