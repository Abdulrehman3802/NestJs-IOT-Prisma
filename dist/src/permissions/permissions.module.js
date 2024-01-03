"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsModule = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const permissions_controller_1 = require("./permissions.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const permissions_repository_1 = require("./permissions.repository");
const jwt_1 = require("@nestjs/jwt");
let PermissionsModule = class PermissionsModule {
};
PermissionsModule = __decorate([
    (0, common_1.Module)({
        controllers: [permissions_controller_1.PermissionsController],
        providers: [permissions_service_1.PermissionsService, prisma_service_1.PrismaService, permissions_repository_1.PermissionsRepository, jwt_1.JwtService]
    })
], PermissionsModule);
exports.PermissionsModule = PermissionsModule;
//# sourceMappingURL=permissions.module.js.map