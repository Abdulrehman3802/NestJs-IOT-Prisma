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
exports.UpdateDeviceAdminDto = exports.UpdateDepartmentAdminDto = exports.UpdateFacilityAdminDto = exports.UpdateUserStaffDto = exports.UpdateUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("class-validator");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserStaffDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateStaffUserDto) {
}
exports.UpdateUserStaffDto = UpdateUserStaffDto;
class UpdateFacilityAdminDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateFacilityAdminDto) {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateFacilityAdminDto.prototype, "userid", void 0);
exports.UpdateFacilityAdminDto = UpdateFacilityAdminDto;
class UpdateDepartmentAdminDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateDepartmentAdminDto) {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateDepartmentAdminDto.prototype, "userid", void 0);
exports.UpdateDepartmentAdminDto = UpdateDepartmentAdminDto;
class UpdateDeviceAdminDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateDeviceAdminDto) {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateDeviceAdminDto.prototype, "userid", void 0);
exports.UpdateDeviceAdminDto = UpdateDeviceAdminDto;
//# sourceMappingURL=update-user.dto.js.map