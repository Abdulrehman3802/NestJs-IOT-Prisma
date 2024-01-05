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
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const gateway_repository_1 = require("./gateway.repository");
let GatewayService = class GatewayService {
    constructor(gateWayRepository) {
        this.gateWayRepository = gateWayRepository;
    }
    async assignGateway(token, createGatewayDto) {
        try {
            const model = Object.assign(Object.assign({}, createGatewayDto), { is_active: true, date_created: new Date(), date_updated: new Date(), is_deleted: false, created_by: token.id, updated_by: token.id });
            const gateway = await this.gateWayRepository.assignGateway(model);
            if (!gateway) {
                throw new common_1.NotImplementedException("Cannot assign gateway");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Gateway Assigned Successfully",
                data: gateway,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findAllGatewayOfOrg(id) {
        try {
            const gateways = await this.gateWayRepository.findAllGatewayOfOrg(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Gateways Found Successfully",
                data: gateways,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findAll() {
        try {
            const gateways = await this.gateWayRepository.findAllGateways();
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Gateway Found Successfully",
                data: gateways,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async updateGateway(id, updateGatewayDto) {
        try {
            const gateway = await this.gateWayRepository.updateGateway(id, updateGatewayDto);
            if (!gateway) {
                throw new common_1.NotImplementedException("cannot update gateway");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Gateway Updated Successfully",
                data: gateway,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async deleteGateway(id) {
        try {
            const gateway = await this.gateWayRepository.deleteGateway(id);
            if (!gateway) {
                throw new common_1.NotImplementedException("Cannot Delete Gateway");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Gateway Deleted Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
};
GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gateway_repository_1.GatewayRepository])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map