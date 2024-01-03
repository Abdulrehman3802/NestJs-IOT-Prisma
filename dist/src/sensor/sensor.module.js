"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorModule = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const sensor_controller_1 = require("./sensor.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const sensor_repository_1 = require("./sensor.repository");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const aws_module_1 = require("../aws/aws.module");
const aws_service_1 = require("../aws/aws.service");
const device_module_1 = require("../device/device.module");
const department_module_1 = require("../department/department.module");
const organization_module_1 = require("../organization/organization.module");
let SensorModule = class SensorModule {
};
SensorModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule, aws_module_1.AwsModule, (0, common_1.forwardRef)(() => device_module_1.DeviceModule), (0, common_1.forwardRef)(() => department_module_1.DepartmentModule), (0, common_1.forwardRef)(() => organization_module_1.OrganizationModule)],
        controllers: [sensor_controller_1.SensorController],
        providers: [sensor_service_1.SensorService, sensor_repository_1.SensorRepository, prisma_service_1.PrismaService, permissions_repository_1.PermissionsRepository, aws_service_1.AwsService],
        exports: [sensor_service_1.SensorService]
    })
], SensorModule);
exports.SensorModule = SensorModule;
//# sourceMappingURL=sensor.module.js.map