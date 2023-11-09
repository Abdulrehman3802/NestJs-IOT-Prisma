"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModule = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const device_controller_1 = require("./device.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const device_repository_1 = require("./device.repository");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const sensor_module_1 = require("../sensor/sensor.module");
const user_module_1 = require("../user/user.module");
const roles_module_1 = require("../roles/roles.module");
let DeviceModule = class DeviceModule {
};
DeviceModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, sensor_module_1.SensorModule, (0, common_1.forwardRef)(() => user_module_1.UserModule), roles_module_1.RolesModule],
        controllers: [device_controller_1.DeviceController],
        providers: [device_service_1.DeviceService, prisma_service_1.PrismaService, device_repository_1.DeviceRepository, permissions_repository_1.PermissionsRepository, jwt_1.JwtService],
        exports: [device_service_1.DeviceService]
    })
], DeviceModule);
exports.DeviceModule = DeviceModule;
//# sourceMappingURL=device.module.js.map