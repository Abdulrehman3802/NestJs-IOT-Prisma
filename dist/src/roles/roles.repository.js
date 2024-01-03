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
exports.RolesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RolesRepository = class RolesRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findByName(name) {
        return this.prismaService.roles.count({
            where: {
                normalizedname: name.toUpperCase()
            }
        });
    }
    async findAll() {
        return this.prismaService.roles.findMany({
            where: {
                is_deleted: false
            }
        });
    }
    async findRoleByName(name) {
        return this.prismaService.roles.findFirst({
            where: {
                normalizedname: name.toUpperCase()
            }
        });
    }
    async findOne(id) {
        return this.prismaService.roles.findFirst({
            where: {
                roleid: id,
                is_deleted: false
            }
        });
    }
    async findRoleOfUser(userid) {
        return this.prismaService.userroles.findFirst({
            where: {
                userid: userid,
            },
            include: {
                roles: true
            }
        });
    }
    async createUserRole(model) {
        return this.prismaService.userroles.create({
            data: model
        });
    }
    async createRole(role) {
        return this.prismaService.roles.create({ data: role });
    }
    async assignRole(userid, roleid) {
        return this.prismaService.userroles.create({
            data: {
                userid: userid,
                roleid: roleid
            }
        });
    }
    async updateRole(id, updateRoleDto) {
        return this.prismaService.roles.update({
            where: {
                roleid: id
            },
            data: updateRoleDto
        });
    }
    async deleteRole(id) {
        return this.prismaService.roles.update({
            where: {
                roleid: id
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        });
    }
};
RolesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesRepository);
exports.RolesRepository = RolesRepository;
//# sourceMappingURL=roles.repository.js.map