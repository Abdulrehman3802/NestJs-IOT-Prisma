"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModule = void 0;
const common_1 = require("@nestjs/common");
const facility_service_1 = require("./facility.service");
const facility_controller_1 = require("./facility.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const facility_repository_1 = require("./facility.repository");
const jwt_1 = require("@nestjs/jwt");
const permissions_repository_1 = require("../permissions/permissions.repository");
const user_module_1 = require("../user/user.module");
const roles_module_1 = require("../roles/roles.module");
let FacilityModule = class FacilityModule {
};
FacilityModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, roles_module_1.RolesModule],
        controllers: [facility_controller_1.FacilityController],
        providers: [facility_service_1.FacilityService, prisma_service_1.PrismaService, facility_repository_1.FacilityRepository, permissions_repository_1.PermissionsRepository, jwt_1.JwtService]
    })
], FacilityModule);
exports.FacilityModule = FacilityModule;
//# sourceMappingURL=facility.module.js.map