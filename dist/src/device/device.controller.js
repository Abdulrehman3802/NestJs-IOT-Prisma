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
exports.DeviceController = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const create_device_dto_1 = require("./dto/request/create-device.dto");
const update_device_dto_1 = require("./dto/request/update-device.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
const PermissionDecorator_1 = require("../../core/generics/Guards/PermissionDecorator");
const GeneralEnums_1 = require("../../core/generics/Enums/GeneralEnums");
let DeviceController = class DeviceController {
    constructor(deviceService) {
        this.deviceService = deviceService;
    }
    create(req, createDeviceDto) {
        const token = req.token;
        return this.deviceService.create(createDeviceDto, token);
    }
    findAll(req) {
        const token = req.token;
        return this.deviceService.findAll(token);
    }
    findOne(id) {
        return this.deviceService.findOne(+id);
    }
    finAllDevicesByDepId(id) {
        return this.deviceService.findAllDevicesByDepId(+id);
    }
    update(id, updateDeviceDto) {
        return this.deviceService.update(+id, updateDeviceDto);
    }
    remove(id) {
        return this.deviceService.remove(+id);
    }
};
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEVICE, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_device_dto_1.CreateDeviceDto]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "create", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEVICE, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "findAll", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEVICE, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "findOne", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('by-depId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "finAllDevicesByDepId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEVICE, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_device_dto_1.UpdateDeviceDto]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "update", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEVICE, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeviceController.prototype, "remove", null);
DeviceController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('device'),
    __metadata("design:paramtypes", [device_service_1.DeviceService])
], DeviceController);
exports.DeviceController = DeviceController;
//# sourceMappingURL=device.controller.js.map