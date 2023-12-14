import { Module, forwardRef } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import {PrismaService} from "../prisma/prisma.service";
import {SensorRepository} from "./sensor.repository";
import {PermissionsRepository} from "../permissions/permissions.repository";
import {JwtModule} from "@nestjs/jwt";
import {AwsModule} from "../aws/aws.module";
import {AwsService} from "../aws/aws.service";
import {DeviceModule} from "../device/device.module";
import { DeviceService } from 'src/device/device.service';
import {DepartmentModule} from "../department/department.module";
import {OrganizationModule} from "../organization/organization.module";

@Module({
  imports:[JwtModule,AwsModule, forwardRef(() => DeviceModule), forwardRef(() => DepartmentModule), forwardRef(()=> OrganizationModule)],
  controllers: [SensorController],
  providers: [SensorService,SensorRepository,PrismaService,PermissionsRepository,AwsService],
  exports: [SensorService]
})
export class SensorModule {}
