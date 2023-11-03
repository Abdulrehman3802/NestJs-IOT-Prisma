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
exports.OrganizationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationRepository = class OrganizationRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createOrganization(model) {
        return this.prismaService.customers.create({
            data: model,
        });
    }
    async createOrganizationUser(model) {
        return this.prismaService.organizationusers.create({
            data: model,
        });
    }
    async findAllOrganization() {
        return this.prismaService.customers.findMany({
            where: {
                is_deleted: false
            }
        });
    }
    async findOrganization(orgId) {
        return this.prismaService.customers.findFirst({
            where: {
                customerid: orgId,
                is_deleted: false
            }
        });
    }
    async findOrganizationByUserId(userId) {
        return this.prismaService.organizationusers.findFirst({
            where: {
                userid: userId,
            }
        });
    }
    async updateOrganization(orgId, body) {
        return this.prismaService.customers.update({
            where: {
                customerid: orgId
            },
            data: body
        });
    }
    async deleteOrganization(orgId) {
        return this.prismaService.customers.update({
            where: {
                customerid: orgId
            },
            data: {
                is_active: false,
                is_deleted: true
            }
        });
    }
};
OrganizationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationRepository);
exports.OrganizationRepository = OrganizationRepository;
//# sourceMappingURL=organization.repository.js.map