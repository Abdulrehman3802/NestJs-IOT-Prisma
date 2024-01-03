"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const user_module_1 = require("../user/user.module");
const jwt_1 = require("@nestjs/jwt");
const roles_repository_1 = require("../roles/roles.repository");
const prisma_service_1 = require("../prisma/prisma.service");
const email_module_1 = require("../email/email.module");
const organization_repository_1 = require("../organization/organization.repository");
const facility_repository_1 = require("../facility/facility.repository");
const department_repository_1 = require("../department/department.repository");
const device_repository_1 = require("../device/device.repository");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, jwt_1.JwtModule, email_module_1.EmailModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            roles_repository_1.RolesRepository,
            prisma_service_1.PrismaService,
            organization_repository_1.OrganizationRepository,
            facility_repository_1.FacilityRepository,
            department_repository_1.DepartmentRepository,
            device_repository_1.DeviceRepository
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map