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
exports.ModelDeviceDashboardDto = exports.ModelOrgDashboardDto = exports.ModelFacilityDashboardDto = exports.ModelDepartmentDashboardDto = exports.FindDashboardDto = exports.CreateDashboardDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDashboardDto {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateDashboardDto.prototype, "isCard", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDashboardDto.prototype, "customerid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDashboardDto.prototype, "facilityid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDashboardDto.prototype, "deviceid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDashboardDto.prototype, "departmentid", void 0);
exports.CreateDashboardDto = CreateDashboardDto;
class FindDashboardDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindDashboardDto.prototype, "customerid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindDashboardDto.prototype, "facilityid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindDashboardDto.prototype, "departmentid", void 0);
exports.FindDashboardDto = FindDashboardDto;
class ModelDepartmentDashboardDto {
}
exports.ModelDepartmentDashboardDto = ModelDepartmentDashboardDto;
class ModelFacilityDashboardDto {
    constructor() {
        this.isCard = true;
    }
}
exports.ModelFacilityDashboardDto = ModelFacilityDashboardDto;
class ModelOrgDashboardDto {
}
exports.ModelOrgDashboardDto = ModelOrgDashboardDto;
class ModelDeviceDashboardDto {
}
exports.ModelDeviceDashboardDto = ModelDeviceDashboardDto;
//# sourceMappingURL=create-dashboard.dto.js.map