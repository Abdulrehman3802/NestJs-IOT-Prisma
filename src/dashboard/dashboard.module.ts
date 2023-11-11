import {forwardRef, Module} from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DashboardRepository } from "./dashboard.repository";
import { PermissionsRepository } from "src/permissions/permissions.repository";
import { JwtService } from "@nestjs/jwt";
import {FacilityModule} from "../facility/facility.module";
import {DepartmentModule} from "../department/department.module";
import {DeviceModule} from "../device/device.module";
import {SensorModule} from "../sensor/sensor.module";
import {OrganizationModule} from "../organization/organization.module";

@Module({
    imports: [PrismaModule,forwardRef(() => FacilityModule),forwardRef(() => DepartmentModule),DeviceModule,SensorModule,forwardRef(() => OrganizationModule)],
    controllers: [DashboardController],
    providers: [DashboardService, PrismaService, DashboardRepository, PermissionsRepository, JwtService],
    exports:[DashboardService]
})
export class DashboardModule { }