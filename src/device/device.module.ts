import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { DeviceRepository } from './device.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService, DeviceRepository, PermissionsRepository, JwtService]
})
export class DeviceModule { }
