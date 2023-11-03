import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import {PrismaService} from "../prisma/prisma.service";
import {SensorRepository} from "./sensor.repository";
import {PermissionsRepository} from "../permissions/permissions.repository";
import {JwtModule} from "@nestjs/jwt";
import {AwsModule} from "../aws/aws.module";
import {AwsService} from "../aws/aws.service";

@Module({
  imports:[JwtModule,AwsModule],
  controllers: [SensorController],
  providers: [SensorService,SensorRepository,PrismaService,PermissionsRepository,AwsService]
})
export class SensorModule {}
