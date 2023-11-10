import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DashboardRepository } from "./dashboard.repository";
import { OrganizationService } from "src/organization/organization.service";
import { FacilityService } from "src/facility/facility.service";
import { DepartmentService } from "src/department/department.service";
import { DeviceService } from "src/device/device.service";
import { PermissionsRepository } from "src/permissions/permissions.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [PrismaModule],
    controllers: [DashboardController],
    providers: [DashboardService, PrismaService, DashboardRepository, PermissionsRepository, JwtService]
})
export class DashboardModule { }