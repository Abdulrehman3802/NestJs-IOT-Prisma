"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const permissions_repository_1 = require("../../../src/permissions/permissions.repository");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(permissionsRepository, jwtService, configService, reflector) {
        this.permissionsRepository = permissionsRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        try {
            const request = context.switchToHttp().getRequest();
            const token = (_a = request.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
            if (!token) {
                throw new common_1.UnauthorizedException();
            }
            const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET')
            });
            const requiredPermissions = this.reflector.get('permissions', context.getHandler());
            request.token = decodedToken;
            if (!requiredPermissions)
                return true;
            const claimId = `Permissions.${requiredPermissions.Category}.${requiredPermissions.PermissionType}`;
            const roleid = decodedToken.roleid;
            const permissions = await this.permissionsRepository.findByRoleId(roleid);
            const check = permissions.some((obj) => obj.permissionvalue.includes(claimId));
            if (check) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permissions_repository_1.PermissionsRepository,
        jwt_1.JwtService,
        config_1.ConfigService,
        core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=PermissionAuthGuard.js.map