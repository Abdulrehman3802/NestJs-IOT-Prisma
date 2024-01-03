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
exports.NotificationsetupService = void 0;
const common_1 = require("@nestjs/common");
const notificationsetup_repository_1 = require("./notificationsetup.repository");
const user_service_1 = require("../user/user.service");
let NotificationsetupService = class NotificationsetupService {
    constructor(notificationsetupRepository, userService) {
        this.notificationsetupRepository = notificationsetupRepository;
        this.userService = userService;
    }
    async createOrUpdate(createNotificationsetupDtos, token, customerid) {
        try {
            const { id } = token;
            const existingSetups = await this.notificationsetupRepository.findByCustomerIdsAndUserIds(customerid, createNotificationsetupDtos.map(dto => dto.userid));
            const toUpdate = [];
            const toCreate = [];
            createNotificationsetupDtos.forEach(dto => {
                const existing = existingSetups.find(es => es.userid === dto.userid && es.customerid === customerid);
                if (existing) {
                    toUpdate.push({ existing, newDto: dto });
                }
                else {
                    toCreate.push(dto);
                }
            });
            if (toUpdate.length > 0) {
                const updateOperations = toUpdate.map(({ existing, newDto }) => {
                    let updateData = {
                        updated_by: id,
                        date_updated: new Date(),
                    };
                    if (newDto.email !== undefined) {
                        updateData.email = newDto.email;
                        updateData.is_email = !!newDto.email;
                    }
                    if (newDto.phonenumber !== undefined) {
                        updateData.phonenumber = newDto.phonenumber;
                        updateData.is_phone = !!newDto.phonenumber;
                    }
                    return {
                        where: { notificationsetupid: existing.notificationsetupid },
                        data: updateData
                    };
                });
                await this.notificationsetupRepository.performBulkUpdate(updateOperations);
            }
            if (toCreate.length > 0) {
                const models = toCreate.map(dto => {
                    const { email, phonenumber, plain_email, text_to_speech, userid } = dto;
                    const model = {
                        userid: userid,
                        email: email,
                        phonenumber: phonenumber,
                        plain_email: plain_email,
                        text_to_speech: text_to_speech,
                        customerid: customerid,
                        is_active: true,
                        date_created: new Date(),
                        date_updated: new Date(),
                        is_deleted: false,
                        created_by: id,
                        updated_by: id,
                        is_email: false,
                        is_phone: false,
                        is_text_to_speech: false,
                        is_plain_email: false
                    };
                    if (email)
                        model.is_email = true;
                    if (phonenumber)
                        model.is_phone = true;
                    if (plain_email)
                        model.is_plain_email = true;
                    if (text_to_speech)
                        model.is_text_to_speech = true;
                    return model;
                });
                const success = await this.notificationsetupRepository.createNotificationSetup(models);
                if (!success)
                    throw new common_1.NotAcceptableException("Invalid data or database constraint violation.");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Notification Setup Successfully",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(id) {
        try {
            const notificationsetups = await this.notificationsetupRepository.GetSelectedNotificationSetupByOrgId(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Users Found Successfully",
                data: notificationsetups,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findUsersForNotificationSetupByOrganizationId(id, query) {
        try {
            const type = query.type;
            const organizationstaff = await this.userService.findAllOrganizationStaffByOrganizationId(id);
            const notificationsetups = await this.notificationsetupRepository.GetNotificationSetupByOrgId(id);
            let updatedStaff = organizationstaff.data.map(staff => {
                const notificationSetup = notificationsetups.find(setup => setup.userid === staff.userid);
                return Object.assign(Object.assign({}, staff), { is_email: notificationSetup && notificationSetup.email !== null ? notificationSetup.is_email : false, is_phone: notificationSetup && notificationSetup.phonenumber !== null ? notificationSetup.is_phone : false });
            });
            if (query) {
                if (type.toLowerCase() === 'email') {
                    updatedStaff = updatedStaff.filter(staff => staff.email !== null);
                }
                else if (type.toLowerCase() === 'phone') {
                    updatedStaff = updatedStaff.filter(staff => staff.phonenumber !== null);
                }
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Users Found Successfully",
                data: updatedStaff,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    update(id, updateNotificationsetupDto) {
        return `This action updates a #${id} notificationsetup`;
    }
    remove(id) {
        return `This action removes a #${id} notificationsetup`;
    }
};
NotificationsetupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notificationsetup_repository_1.NotificationsetupRepository,
        user_service_1.UserService])
], NotificationsetupService);
exports.NotificationsetupService = NotificationsetupService;
//# sourceMappingURL=notificationsetup.service.js.map