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
exports.NotificationsetupController = void 0;
const common_1 = require("@nestjs/common");
const notificationsetup_service_1 = require("./notificationsetup.service");
const create_notificationsetup_dto_1 = require("./dto/request/create-notificationsetup.dto");
const update_notificationsetup_dto_1 = require("./dto/request/update-notificationsetup.dto");
const PermissionAuthGuard_1 = require("../../core/generics/Guards/PermissionAuthGuard");
let NotificationsetupController = class NotificationsetupController {
    constructor(notificationsetupService) {
        this.notificationsetupService = notificationsetupService;
    }
    create(req, customerid, createNotificationsetupDtos) {
        const token = req.token;
        return this.notificationsetupService.createOrUpdate(createNotificationsetupDtos, token, +customerid);
    }
    findAllUsers(query, id) {
        return this.notificationsetupService.findUsersForNotificationSetupByOrganizationId(+id, query);
    }
    findAll(id) {
        return this.notificationsetupService.findAll(+id);
    }
    update(id, updateNotificationsetupDto) {
        return this.notificationsetupService.update(+id, updateNotificationsetupDto);
    }
    remove(id) {
        return this.notificationsetupService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('create/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Array]),
    __metadata("design:returntype", void 0)
], NotificationsetupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notificationsetup_dto_1.FindQueryForUsers, String]),
    __metadata("design:returntype", void 0)
], NotificationsetupController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Get)('selected-users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsetupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notificationsetup_dto_1.UpdateNotificationsetupDto]),
    __metadata("design:returntype", void 0)
], NotificationsetupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationsetupController.prototype, "remove", null);
NotificationsetupController = __decorate([
    (0, common_1.UseGuards)(PermissionAuthGuard_1.JwtAuthGuard),
    (0, common_1.Controller)('notificationsetup'),
    __metadata("design:paramtypes", [notificationsetup_service_1.NotificationsetupService])
], NotificationsetupController);
exports.NotificationsetupController = NotificationsetupController;
//# sourceMappingURL=notificationsetup.controller.js.map