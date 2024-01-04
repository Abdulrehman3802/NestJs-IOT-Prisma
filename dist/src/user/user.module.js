"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
const email_module_1 = require("../email/email.module");
const facility_module_1 = require("../facility/facility.module");
const roles_module_1 = require("../roles/roles.module");
const permissions_repository_1 = require("../permissions/permissions.repository");
const department_module_1 = require("../department/department.module");
const device_module_1 = require("../device/device.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, jwt_1.JwtModule, email_module_1.EmailModule, roles_module_1.RolesModule, facility_module_1.FacilityModule, department_module_1.DepartmentModule, device_module_1.DeviceModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, prisma_service_1.PrismaService, user_repository_1.UserRepository, permissions_repository_1.PermissionsRepository],
        exports: [user_repository_1.UserRepository, user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map