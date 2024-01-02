import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import {ConfigModule} from "@nestjs/config";
import {PrismaService} from "../prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {PermissionsModule} from "../permissions/permissions.module";
import {PermissionsRepository} from "../permissions/permissions.repository";
@Module({
  imports:[ConfigModule.forRoot(),JwtModule],
  controllers: [AwsController],
  providers: [AwsService,PrismaService,PermissionsRepository]
})
export class AwsModule {}
