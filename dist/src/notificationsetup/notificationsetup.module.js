"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsetupModule = void 0;
const common_1 = require("@nestjs/common");
const notificationsetup_service_1 = require("./notificationsetup.service");
const notificationsetup_controller_1 = require("./notificationsetup.controller");
const notificationsetup_repository_1 = require("./notificationsetup.repository");
const prisma_service_1 = require("../prisma/prisma.service");
const permissions_repository_1 = require("../permissions/permissions.repository");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
let NotificationsetupModule = class NotificationsetupModule {
};
NotificationsetupModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule],
        controllers: [notificationsetup_controller_1.NotificationsetupController],
        providers: [notificationsetup_service_1.NotificationsetupService, notificationsetup_repository_1.NotificationsetupRepository, prisma_service_1.PrismaService, permissions_repository_1.PermissionsRepository, jwt_1.JwtService]
    })
], NotificationsetupModule);
exports.NotificationsetupModule = NotificationsetupModule;
//# sourceMappingURL=notificationsetup.module.js.map