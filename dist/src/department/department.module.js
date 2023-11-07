"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModule = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
const department_controller_1 = require("./department.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const department_repository_1 = require("./department.repository");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const roles_module_1 = require("../roles/roles.module");
const device_module_1 = require("../device/device.module");
const sensor_module_1 = require("../sensor/sensor.module");
let DepartmentModule = class DepartmentModule {
};
DepartmentModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, (0, common_1.forwardRef)(() => user_module_1.UserModule), roles_module_1.RolesModule, device_module_1.DeviceModule, sensor_module_1.SensorModule],
        controllers: [department_controller_1.DepartmentController],
        providers: [department_service_1.DepartmentService, prisma_service_1.PrismaService, department_repository_1.DepartmentRepository, permissions_repository_1.PermissionsRepository, jwt_1.JwtService],
        exports: [department_service_1.DepartmentService]
    })
], DepartmentModule);
exports.DepartmentModule = DepartmentModule;
//# sourceMappingURL=department.module.js.map