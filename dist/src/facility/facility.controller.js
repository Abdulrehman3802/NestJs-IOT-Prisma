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
exports.FacilityController = void 0;
const common_1 = require("@nestjs/common");
const facility_service_1 = require("./facility.service");
const create_facility_dto_1 = require("./dto/request/create-facility.dto");
const update_facility_dto_1 = require("./dto/request/update-facility.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
const PermissionDecorator_1 = require("../../core/generics/Guards/PermissionDecorator");
const GeneralEnums_1 = require("../../core/generics/Enums/GeneralEnums");
let FacilityController = class FacilityController {
    constructor(facilityService) {
        this.facilityService = facilityService;
    }
    create(createFacilityDto, req) {
        const token = req.token;
        return this.facilityService.create(createFacilityDto, token);
    }
    findAll(req) {
        return this.facilityService.findAll(req.token);
    }
    findOne(id) {
        return this.facilityService.findOne(+id);
    }
    finAllFacilitiesByOrgId(id) {
        return this.facilityService.findAllFacilities(+id);
    }
    update(id, updateFacilityDto) {
        return this.facilityService.update(+id, updateFacilityDto);
    }
    remove(id) {
        return this.facilityService.remove(+id);
    }
};
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facility_dto_1.CreateFacilityDto, Object]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "create", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "findAll", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "findOne", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "finAllFacilitiesByOrgId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_facility_dto_1.UpdateFacilityDto]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "update", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.FACILITY, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "remove", null);
FacilityController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('facility'),
    __metadata("design:paramtypes", [facility_service_1.FacilityService])
], FacilityController);
exports.FacilityController = FacilityController;
//# sourceMappingURL=facility.controller.js.map