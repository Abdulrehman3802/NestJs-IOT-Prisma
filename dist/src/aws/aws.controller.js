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
exports.AwsController = void 0;
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
const update_aw_dto_1 = require("./dto/Request/update-aw.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
let AwsController = class AwsController {
    constructor(awsService) {
        this.awsService = awsService;
    }
    getSensors() {
        return this.awsService.getSensors();
    }
    saveAWSData() {
        return this.awsService.saveAWSData();
    }
    findAll() {
        return this.awsService.findAll();
    }
    findOne(id) {
        return this.awsService.findOne(+id);
    }
    update(id, updateAwDto) {
        return this.awsService.update(+id, updateAwDto);
    }
    remove(id) {
        return this.awsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)('/get-sensors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "getSensors", null);
__decorate([
    (0, common_1.Post)('/save-sensor-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "saveAWSData", null);
__decorate([
    (0, common_1.Get)('/get-all-aws-sensors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aw_dto_1.UpdateAwsDto]),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AwsController.prototype, "remove", null);
AwsController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('aws'),
    __metadata("design:paramtypes", [aws_service_1.AwsService])
], AwsController);
exports.AwsController = AwsController;
//# sourceMappingURL=aws.controller.js.map