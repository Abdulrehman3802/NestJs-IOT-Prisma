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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const permissions_repository_1 = require("./permissions/permissions.repository");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    constructor(jwtService, configService, permissionsRepository) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.permissionsRepository = permissionsRepository;
    }
    getHello() {
        return 'Hello World!';
    }
    async GetGeneralData(request) {
        try {
            const authorizationHeader = request.headers['authorization'];
            if (!authorizationHeader) {
                throw new Error('Authorization header is missing.');
            }
            const token = authorizationHeader.replace('Bearer ', '');
            const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET')
            });
            const roleId = decodedToken.roleid;
            const permissions = await this.permissionsRepository.findByRoleId(roleId);
            const transformedPermissions = permissions.map((permission) => {
                return permission.permissionvalue.replace('Permissions.', '').replace('.', '_').toLowerCase();
            });
            return { permissions: transformedPermissions };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        permissions_repository_1.PermissionsRepository])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map