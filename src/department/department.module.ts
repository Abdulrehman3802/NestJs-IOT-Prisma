import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { PrismaService } from "../prisma/prisma.service";
import { DepartmentRepository } from './department.repository';
import { PermissionsRepository } from 'src/permissions/permissions.repository';
import { JwtService } from '@nestjs/jwt';
import {UserModule} from "../user/user.module";
import {RolesModule} from "../roles/roles.module";

@Module({
  imports: [PrismaModule,UserModule,RolesModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService, DepartmentRepository, PermissionsRepository, JwtService]
})
export class DepartmentModule { }
