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
exports.NotificationsetupRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsetupRepository = class NotificationsetupRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createNotificationSetup(models) {
        return this.prismaService.notificationsetup.createMany({
            data: models
        });
    }
    async GetNotificationSetupByOrgId(customerid) {
        return this.prismaService.notificationsetup.findMany({
            where: {
                customerid: customerid
            }
        });
    }
    async GetSelectedNotificationSetupByOrgId(customerid) {
        return this.prismaService.notificationsetup.findMany({
            where: {
                customerid: customerid,
                OR: [
                    { is_email: true },
                    { is_phone: true },
                ],
            }
        });
    }
    async findByCustomerIdsAndUserIds(customerId, userIds) {
        return this.prismaService.notificationsetup.findMany({
            where: {
                customerid: customerId,
                userid: {
                    in: userIds
                },
                is_deleted: false
            }
        });
    }
    async performBulkUpdate(updateOperations) {
        return this.prismaService.$transaction(updateOperations.map(operation => this.prismaService.notificationsetup.update({
            where: operation.where,
            data: operation.data,
        })));
    }
};
NotificationsetupRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsetupRepository);
exports.NotificationsetupRepository = NotificationsetupRepository;
//# sourceMappingURL=notificationsetup.repository.js.map