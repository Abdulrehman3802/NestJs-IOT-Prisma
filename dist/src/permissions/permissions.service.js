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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const permissions_repository_1 = require("./permissions.repository");
let PermissionsService = class PermissionsService {
    constructor(permssionsRepository) {
        this.permssionsRepository = permssionsRepository;
    }
    async create(createPermissionDto) {
        try {
            const createdPermission = await this.permssionsRepository.createPermission(createPermissionDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Role Successfully Created",
                data: createdPermission,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    findAll(roleid) {
        return this.permssionsRepository.findByRoleId(roleid);
    }
    findOne(id) {
        return `This action returns a #${id} permission`;
    }
    update(id, updatePermissionDto) {
        return `This action updates a #${id} permission`;
    }
    remove(id) {
        return `This action removes a #${id} permission`;
    }
};
PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permissions_repository_1.PermissionsRepository])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map