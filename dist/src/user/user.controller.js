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
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(req, createUserDto) {
        const token = req.token;
        return this.userService.create(createUserDto, token);
    }
    createFacilityAdmin(req, createFacilityAdminDto) {
        const token = req.token;
        return this.userService.createFacilityAdmin(createFacilityAdminDto, token);
    }
    createDepartmentAdmin(req, createDepartmentAdminDto) {
        const token = req.token;
        return this.userService.createDepartmentAdmin(createDepartmentAdminDto, token);
    }
    findAll() {
        return this.userService.findAll();
    }
    findAllAdmins(query) {
        console.log(query);
        return this.userService.findAdmins(query.name);
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
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/facilityAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateFacilityAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createFacilityAdmin", null);
__decorate([
    (0, PermissionDecorator_1.Permission)(GeneralEnums_1.Category.USER, GeneralEnums_1.PermissionType.CREATE),
    (0, common_1.Post)('/create/departmentAdmin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateDepartmentAdminDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createDepartmentAdmin", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findAdmins'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllAdmins", null);
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
UserController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map