"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("./gateway.service");
const gateway_controller_1 = require("./gateway.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_module_1 = require("../prisma/prisma.module");
const gateway_repository_1 = require("./gateway.repository");
const jwt_1 = require("@nestjs/jwt");
const permissions_module_1 = require("../permissions/permissions.module");
const permissions_repository_1 = require("../permissions/permissions.repository");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, jwt_1.JwtModule, permissions_module_1.PermissionsModule],
        controllers: [gateway_controller_1.GatewayController],
        providers: [gateway_service_1.GatewayService, gateway_repository_1.GatewayRepository, prisma_service_1.PrismaService, permissions_repository_1.PermissionsRepository]
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map