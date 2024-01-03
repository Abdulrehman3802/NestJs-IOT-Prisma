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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/request/create-user.dto");
const update_user_dto_1 = require("./dto/request/update-user.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
const PermissionDecorator_1 = require("../../core/generics/Guards/PermissionDecorator");
const GeneralEnums_1 = require("../../core/generics/Enums/GeneralEnums");
const user_queries_dto_1 = require("./dto/request/user-queries-dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(req, createUserDto) {
        const token = req.token;
        return this.userService.create(createUserDto, token);
    }
    findAll() {
        return this.userService.findAll();
    }
    findUnAssignedUsers() {
        return this.userService.findUnAssignedUsers();
    }
    findAllAdmins(req, query) {
        const token = req.token;
        return this.userService.findAdminStaff(query.name, token);
    }
    findAllUserStaff(req, query) {
        const token = req.token;
        return this.userService.findUserStaff(query.name, token);
    }
    findAllOrganizationStaffByOrganizationId(id) {
        return this.userService.findAllOrganizationStaffByOrganizationId(+id);
    }
    findAllAdminsByOrganizationId(id, query) {
        return this.userService.findAdminStaffByOrganizationId(query.name, +id);
    }
    findAllAdminsByFacilityId(id, query) {
        return this.userService.findAdminStaffByFacilityId(query.name, +id);
    }
    findAllAdminsByDepartmentId(id, query) {
        return this.userService.findAdminStaffByDepartmentId(query.name, +id);
    }
    findAllUserStaffByOrganizationId(id, query) {
        return this.userService.findUserStaffByOrganizationId(query.name, +id);
    }
    findAllUserStaffByFacilityId(id, query) {
        return this.userService.findUserStaffByFacilityId(query.name, +id);
    }
    findAllUserStaffByDepartmentId(id, query) {
        return this.userService.findUserStaffByDepartmentId(query.name, +id);
    }
    findOne(id) {
        return this.userService.findOne(+id);
    }
    update(id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
    createUserStaff(req, createStaffUserDto) {
        const token = req.token;
        return this.userService.createStaffUser(createStaffUserDto, token);
    }
    createFacilityStaff(req, createFacilityAdminDto) {
        const token = req.token;
        return this.userService.createFacilityStaff(createFacilityAdminDto, token);
    }
    createDepartmentStaff(req, createDepartmentAdminDto) {
        const token = req.token;
        return this.userService.createDepartmentStaff(createDepartmentAdminDto, token);
    }
    createDeviceStaff(req, createDeviceAdminDto) {
        const token = req.token;
        return this.userService.createDeviceStaff(createDeviceAdminDto, token);
    }
    updateFacilityStaff(updateFacilityDto) {
        return this.userService.updateFacilityStaff(updateFacilityDto);
    }
    updateDepartmentStaff(updateDepartmentDto) {
        return this.userService.updateDepartmentStaff(updateDepartmentDto);
    }
    updateDeviceStaff(updateDeviceDto) {
        return this.userService.updateDeviceStaff(updateDeviceDto);
    }
    deleteFacilityStaff(query) {
        return this.userService.deleteFacilityStaff(query);
    }
    deleteDepartmentStaff(query) {
        return this.userService.deleteDepartmentStaff(query);
    }
    deleteDeviceStaff(query) {
        return this.userService.deleteDeviceStaff(query);
    }
};
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('unassigned-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUnAssignedUsers", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('find-admins'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdmins", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('find-user-staff'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUserStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('allstaff-by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllOrganizationStaffByOrganizationId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('admins-by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdminsByOrganizationId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('admins-by-facId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdminsByFacilityId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('admins-by-depId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdminsByDepartmentId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('user-staff-by-orgId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUserStaffByOrganizationId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('user-staff-by-facId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUserStaffByFacilityId", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.VIEW),
    (0, common_1.Get)('user-staff-by-depId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_queries_dto_1.findQuery]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUserStaffByDepartmentId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/createUserStaff'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateStaffUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/facilityAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateFacilityAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createFacilityStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/departmentAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateDepartmentAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createDepartmentStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/deviceAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateDeviceAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createDeviceStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)('staff/updateFacilityStaff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateFacilityAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateFacilityStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)('staff/updateDepartmentStaff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateDepartmentAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateDepartmentStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.UPDATE),
    (0, common_1.Patch)('staff/updateDeviceStaff'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateDeviceAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateDeviceStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)('staff/deleteFacilityStaff'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_queries_dto_1.deleteQueryFacility]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteFacilityStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)('staff/deleteDepartmentStaff'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_queries_dto_1.deleteQueryDepartment]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteDepartmentStaff", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.DELETE),
    (0, common_1.Delete)('staff/deleteDeviceStaff'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_queries_dto_1.deleteQueryDevice]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteDeviceStaff", null);
UserController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map