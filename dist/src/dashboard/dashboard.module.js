"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const prisma_service_1 = require("../prisma/prisma.service");
const dashboard_repository_1 = require("./dashboard.repository");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const facility_module_1 = require("../facility/facility.module");
const department_module_1 = require("../department/department.module");
const device_module_1 = require("../device/device.module");
const sensor_module_1 = require("../sensor/sensor.module");
const organization_module_1 = require("../organization/organization.module");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, (0, common_1.forwardRef)(() => facility_module_1.FacilityModule), (0, common_1.forwardRef)(() => department_module_1.DepartmentModule), device_module_1.DeviceModule, sensor_module_1.SensorModule, (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule)],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [dashboard_service_1.DashboardService, prisma_service_1.PrismaService, dashboard_repository_1.DashboardRepository, permissions_repository_1.PermissionsRepository, jwt_1.JwtService],
        exports: [dashboard_service_1.DashboardService]
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map