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
exports.SensorController = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const update_sensor_dto_1 = require("./dto/update-sensor.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
const PermissionDecorator_1 = require("../../core/generics/Guards/PermissionDecorator");
const GeneralEnums_1 = require("../../core/generics/Enums/GeneralEnums");
let SensorController = class SensorController {
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    assignSensor(req, createSensorDto) {
        return this.sensorService.assignSensor(req.token.id, createSensorDto);
    }
    getAllAssignedSensors(req) {
        return this.sensorService.getAllAssignedSensor(req.token);
    }
    getSensorsByOrganizationId(id) {
        return this.sensorService.getSensorByOrgId(+id);
    }
    getSensorByDeviceId(id) {
        return this.sensorService.getSensorByDeviceId(+id);
    }
    getAllUnAssignedSensors(req) {
        return this.sensorService.getAllUnAssignedSensors(req.token);
    }
    updateAssignedSensor(req, id, updateSensorDto) {
        return this.sensorService.updateAssignedSensor(req.token.id, +id, updateSensorDto);
    }
    unAssignedSensor(id) {
        return this.sensorService.unAssignedSensor(+id);
    }
    remove(id) {
        return this.sensorService.remove(+id);
    }
};
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/assign-sensor'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sensor_dto_1.CreateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "assignSensor", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('/get-assign-sensors'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getAllAssignedSensors", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('/get-sensors-by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getSensorsByOrganizationId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('/get-sensors-by-deviceId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getSensorByDeviceId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('/get-unassigned-sensors'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getAllUnAssignedSensors", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)('/update-sensor/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sensor_dto_1.UpdateSensorDto]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "updateAssignedSensor", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)('unAssigned/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "unAssignedSensor", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.SENSOR, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "remove", null);
SensorController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('sensor'),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorController);
exports.SensorController = SensorController;
//# sourceMappingURL=sensor.controller.js.map