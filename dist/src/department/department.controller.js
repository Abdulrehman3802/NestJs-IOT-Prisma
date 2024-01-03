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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
const create_department_dto_1 = require("./dto/request/create-department.dto");
const update_department_dto_1 = require("./dto/request/update-department.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
const PermissionDecorator_1 = require("../../core/generics/Guards/PermissionDecorator");
const GeneralEnums_1 = require("../../core/generics/Enums/GeneralEnums");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    create(req, createDepartmentDto) {
        const token = req.token;
        return this.departmentService.create(createDepartmentDto, token);
    }
    findAll(req) {
        const token = req.token;
        return this.departmentService.findAll(token);
    }
    findOne(id) {
        return this.departmentService.findOne(+id);
    }
    finAllDepartmentsByOrgId(id) {
        return this.departmentService.GetAllDepartmentsByOrgId(+id);
    }
    finAllDepartmentsByFacId(id) {
        return this.departmentService.findAllDepartments(+id);
    }
    update(id, updateDepartmentDto) {
        return this.departmentService.update(+id, updateDepartmentDto);
    }
    remove(id) {
        return this.departmentService.remove(+id);
    }
};
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "create", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "findAll", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "findOne", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "finAllDepartmentsByOrgId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('by-facId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "finAllDepartmentsByFacId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "update", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.DEPARTMENT, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentController.prototype, "remove", null);
DepartmentController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('department'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map