"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization.service");
const organization_controller_1 = require("./organization.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const organization_repository_1 = require("./organization.repository");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const roles_module_1 = require("../roles/roles.module");
const facility_module_1 = require("../facility/facility.module");
const department_module_1 = require("../department/department.module");
const device_module_1 = require("../device/device.module");
const sensor_module_1 = require("../sensor/sensor.module");
const dashboard_module_1 = require("../dashboard/dashboard.module");
let OrganizationModule = class OrganizationModule {
};
OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, roles_module_1.RolesModule, facility_module_1.FacilityModule, department_module_1.DepartmentModule, device_module_1.DeviceModule, sensor_module_1.SensorModule, dashboard_module_1.DashboardModule],
        controllers: [organization_controller_1.OrganizationController],
        providers: [organization_service_1.OrganizationService, prisma_service_1.PrismaService, organization_repository_1.OrganizationRepository, permissions_repository_1.PermissionsRepository, jwt_1.JwtService],
        exports: [organization_service_1.OrganizationService]
    })
], OrganizationModule);
exports.OrganizationModule = OrganizationModule;
//# sourceMappingURL=organization.module.js.map