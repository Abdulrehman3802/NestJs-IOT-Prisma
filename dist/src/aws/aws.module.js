"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
const aws_controller_1 = require("./aws.controller");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const permissions_repository_1 = require("../permissions/permissions.repository");
let AwsModule = class AwsModule {
};
AwsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(), jwt_1.JwtModule],
        controllers: [aws_controller_1.AwsController],
        providers: [aws_service_1.AwsService, prisma_service_1.PrismaService, permissions_repository_1.PermissionsRepository]
    })
], AwsModule);
exports.AwsModule = AwsModule;
//# sourceMappingURL=aws.module.js.map