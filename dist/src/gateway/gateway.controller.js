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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("./gateway.service");
const create_gateway_dto_1 = require("./dto/request/create-gateway.dto");
const update_gateway_dto_1 = require("./dto/request/update-gateway.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
let GatewayController = class GatewayController {
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    assignGateway(req, createGatewayDto) {
        const token = req.token;
        return this.gatewayService.assignGateway(token, createGatewayDto);
    }
    findAll(id) {
        return this.gatewayService.findAllGatewayOfOrg(+id);
    }
    findAllGatewaysForSuperAdmin() {
        return this.gatewayService.findAll();
    }
    updateGateway(id, updateGatewayDto) {
        return this.gatewayService.updateGateway(+id, updateGatewayDto);
    }
    remove(id) {
        return this.gatewayService.deleteGateway(+id);
    }
};
__decorate([
    (0, common_1.Post)('/assign-to-organization'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_gateway_dto_1.CreateGatewayDto]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "assignGateway", null);
__decorate([
    (0, common_1.Get)('/get-all-gateways/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/get-all-gateways'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "findAllGatewaysForSuperAdmin", null);
__decorate([
    (0, common_1.Patch)('/update-gateway/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_gateway_dto_1.UpdateGatewayDto]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "updateGateway", null);
__decorate([
    (0, common_1.Delete)('/delete-gateway/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "remove", null);
GatewayController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('gateway'),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayController);
exports.GatewayController = GatewayController;
//# sourceMappingURL=gateway.controller.js.map