import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";
import {GatewayRepository} from "./gateway.repository";
import {JwtModule} from "@nestjs/jwt";
import {PermissionsModule} from "../permissions/permissions.module";
import {PermissionsRepository} from "../permissions/permissions.repository";

@Module({
  imports: [PrismaModule,JwtModule,PermissionsModule],
  controllers: [GatewayController],
  providers: [GatewayService,GatewayRepository,PrismaService,PermissionsRepository]
})
export class GatewayModule {}
