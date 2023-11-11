import { Module, forwardRef } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { DepartmentRepository } from './department.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';
import {UserModule} from "../user/user.module";
import {RolesModule} from "../roles/roles.module";
import { DeviceModule } from 'src/device/device.module';
import { SensorModule } from 'src/sensor/sensor.module';
import {DashboardModule} from "../dashboard/dashboard.module";

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule),RolesModule, DeviceModule, SensorModule,forwardRef(() => DashboardModule)],
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService, DepartmentRepository, PermissionsRepository, JwtService],
  exports: [DepartmentService]
})
export class DepartmentModule { }
