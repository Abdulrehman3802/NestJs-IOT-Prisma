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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRepository = class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(model) {
        return this.prismaService.users.create({
            data: model
        });
    }
    async findUser(id) {
        return this.prismaService.users.findFirst({
            where: {
                userid: id,
                is_active: true
            }
        });
    }
    async findUserByEmail(email) {
        return this.prismaService.users.findFirst({
            where: {
                email: email,
                is_active: true,
                is_deleted: false
            }
        });
    }
    async findUserByToken(token) {
        return this.prismaService.users.findFirst({
            where: {
                resettoken: token,
                is_active: true
            }
        });
    }
    async findAllUser() {
        return this.prismaService.users.findMany({
            where: {
                is_deleted: false
            }
        });
    }
    async findAllFacilityAdmins() {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: true
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                facilities: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDepartmentAdmins() {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                departments: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDeviceAdmins() {
        return this.prismaService.deviceusers.findMany({
            where: {
                is_admin: true
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async deleteUser(id) {
        return this.prismaService.users.delete({
            where: {
                userid: id
            }
        });
    }
    async updateUser(id, body) {
        return this.prismaService.users.update({
            where: {
                userid: id,
            },
            data: Object.assign(Object.assign({}, body), { date_updated: new Date() }),
        });
    }
    async findFacilityStaff(userid, facilityid) {
        return this.prismaService.facilityusers.findFirstOrThrow({
            where: {
                userid: userid,
                facilityid: facilityid,
            },
        });
    }
    async unAssignStaffFromFacility(facilityuserid) {
        return this.prismaService.facilityusers.delete({
            where: {
                facilityuserid: facilityuserid,
            },
        });
    }
    async makeFacilityAdminOrUser(facilityuserid, is_admin) {
        return this.prismaService.facilityusers.update({
            where: {
                facilityuserid: facilityuserid,
            },
            data: {
                is_admin: is_admin
            }
        });
    }
    async findDepartmentStaff(userid, departmentid) {
        return this.prismaService.departmentusers.findFirstOrThrow({
            where: {
                userid: userid,
                departmentid: departmentid,
            },
        });
    }
    async unAssignStaffFromDepartment(departmentuserid) {
        return this.prismaService.departmentusers.delete({
            where: {
                departmentuserid: departmentuserid,
            },
        });
    }
    async findDeviceStaff(userid, deviceid) {
        return this.prismaService.deviceusers.findFirstOrThrow({
            where: {
                userid: userid,
                deviceid: deviceid,
            },
        });
    }
    async unAssignStaffFromDevice(deviceuserid) {
        return this.prismaService.deviceusers.delete({
            where: {
                deviceuserid: deviceuserid,
            },
        });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map