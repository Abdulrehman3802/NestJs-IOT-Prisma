import { Module, forwardRef } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { FacilityRepository } from './facility.repository';
import { JwtService } from '@nestjs/jwt';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import {UserModule} from "../user/user.module";
import {RolesModule} from "../roles/roles.module";
import { DepartmentModule } from 'src/department/department.module';
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import {DashboardModule} from "../dashboard/dashboard.module";

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule) ,RolesModule, DepartmentModule, DeviceModule, SensorModule,DashboardModule],
  controllers: [FacilityController],
  providers: [FacilityService, PrismaService, FacilityRepository, PermissionsRepository, JwtService],
  exports: [FacilityService]
})
export class FacilityModule { }
