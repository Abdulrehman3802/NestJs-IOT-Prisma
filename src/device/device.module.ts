import { Module, forwardRef } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { DeviceRepository } from './device.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';
import { SensorModule } from 'src/sensor/sensor.module';
import { UserModule } from 'src/user/user.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [PrismaModule, SensorModule, forwardRef(() => UserModule), RolesModule],
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService, DeviceRepository, PermissionsRepository, JwtService],
  exports:[DeviceService]
})
export class DeviceModule { }
