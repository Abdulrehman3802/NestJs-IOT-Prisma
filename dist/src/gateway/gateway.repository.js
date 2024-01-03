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
exports.GatewayRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GatewayRepository = class GatewayRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async assignGateway(model) {
        return this.prismaService.gateways.create({
            data: model
        });
    }
    findAllGatewayOfOrg(id) {
        return this.prismaService.gateways.findMany({
            where: {
                customerid: id,
                is_active: true,
                is_deleted: false
            }
        });
    }
    findAllGateways() {
        return this.prismaService.gateways.findMany({
            where: {
                is_deleted: false,
                is_active: true
            }
        });
    }
    findOne(id) {
        return `This action returns a #${id} gateway`;
    }
    updateGateway(id, updateGatewayDto) {
        return this.prismaService.gateways.update({
            where: {
                gatewayid: id,
            },
            data: updateGatewayDto
        });
    }
    deleteGateway(id) {
        return this.prismaService.gateways.update({
            where: {
                gatewayid: id,
            },
            data: {
                is_deleted: true,
                is_active: false
            }
        });
    }
};
GatewayRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GatewayRepository);
exports.GatewayRepository = GatewayRepository;
//# sourceMappingURL=gateway.repository.js.map