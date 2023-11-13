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
                is_deleted: false
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
    async findAllUserForStaff() {
        return this.prismaService.users.findMany({
            where: {
                is_active: true,
                is_deleted: false,
                userroles: {
                    some: {
                        roles: {
                            name: {
                                not: "SuperAdmin"
                            }
                        }
                    }
                }
            },
            include: {
                userroles: {
                    include: {
                        roles: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        });
    }
    async findUserRoleRelation(userid) {
        return this.prismaService.userroles.findFirstOrThrow({
            where: {
                userid: userid
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
    async deleteUser(id) {
        return this.prismaService.users.update({
            where: {
                userid: id
            }, data: {
                is_active: false,
                is_deleted: true
            }
        });
    }
    async deleteUserRoleRelation(userroleid) {
        return this.prismaService.userroles.delete({
            where: {
                userroleid: userroleid
            }
        });
    }
    async findAllOrganizationStaff() {
        return this.prismaService.organizationusers.findMany();
    }
    async findAllFacilityAdmins() {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: true,
                facilities: {
                    is_active: true,
                    is_deleted: false
                }
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
    async findAllFacilityAdminsUsingOrganizationId(customerid) {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: true,
                facilities: {
                    is_active: true,
                    is_deleted: false,
                    customers: {
                        customerid: customerid
                    }
                }
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
    async findAllFacilityAdminsUsingFacilityId(facilityid) {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: true,
                facilities: {
                    is_active: true,
                    is_deleted: false,
                    facilityid: facilityid
                }
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
    async findAllFacilityUsers() {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: false,
                facilities: {
                    is_active: true,
                    is_deleted: false
                }
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
    async findAllFacilityUsersByOrganizationId(customerid) {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: false,
                facilities: {
                    is_active: true,
                    is_deleted: false,
                    customers: {
                        customerid: customerid
                    }
                }
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
    async findAllFacilityUsersByFacilityId(facilityid) {
        return this.prismaService.facilityusers.findMany({
            where: {
                is_admin: false,
                facilities: {
                    is_active: true,
                    is_deleted: false,
                    facilityid: facilityid
                }
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
    async findAllFacilityStaff() {
        return this.prismaService.facilityusers.findMany();
    }
    async findAllDepartmentAdmins() {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true,
                departments: {
                    is_active: true,
                    is_deleted: false
                }
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
    async findAllDepartmentAdminsByOrganizationId(customerid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true,
                departments: {
                    is_active: true,
                    is_deleted: false,
                    facilities: {
                        customers: {
                            customerid: customerid
                        }
                    }
                }
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
    async findAllDepartmentAdminsByFacilityId(facilityid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true,
                departments: {
                    is_active: true,
                    is_deleted: false,
                    facilityid: facilityid
                }
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
    async findAllDepartmentAdminsByDepartmentId(departmentid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: true,
                departments: {
                    is_active: true,
                    is_deleted: false,
                    departmentid: departmentid
                }
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
    async findAllDepartmentUsers() {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: false,
                departments: {
                    is_active: true,
                    is_deleted: false
                }
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
    async findAllDepartmentUsersByOrganizationId(customerid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: false,
                departments: {
                    facilities: {
                        customers: {
                            customerid: customerid
                        }
                    }
                }
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
    async findAllDepartmentUsersByFacilityId(facilityid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: false,
                departments: {
                    is_deleted: false,
                    facilities: {
                        facilityid: facilityid
                    }
                }
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
    async findAllDepartmentUsersByDepartmentId(departmentid) {
        return this.prismaService.departmentusers.findMany({
            where: {
                is_admin: false,
                departments: {
                    is_deleted: false,
                    departmentid: departmentid
                }
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
    async findAllDepartmentStaff() {
        return this.prismaService.departmentusers.findMany();
    }
    async findAllDeviceAdmins() {
        return this.prismaService.deviceusers.findMany({
            where: {
                is_admin: true,
                devices: {
                    is_active: true,
                    is_deleted: false
                }
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                devices: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDeviceAdminsByOrganizationId(customerid) {
        return this.prismaService.deviceusers.findMany({
            where: {
                is_admin: true,
                devices: {
                    is_active: true,
                    is_deleted: false,
                    departments: {
                        facilities: {
                            customers: {
                                customerid: customerid
                            }
                        }
                    }
                }
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                devices: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDeviceAdminsByFacilityId(facilityid) {
        return this.prismaService.deviceusers.findMany({
            where: {
                is_admin: true,
                devices: {
                    is_active: true,
                    is_deleted: false,
                    facilityid: facilityid
                }
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                devices: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDeviceAdminsByDepartmentId(departmentid) {
        return this.prismaService.deviceusers.findMany({
            where: {
                is_admin: true,
                devices: {
                    is_active: true,
                    is_deleted: false,
                    departments: {
                        departmentid: departmentid
                    }
                }
            },
            include: {
                users: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                },
                devices: {
                    where: {
                        is_deleted: false,
                        is_active: true
                    }
                }
            }
        });
    }
    async findAllDeviceStaff() {
        return this.prismaService.deviceusers.findMany();
    }
    async findFacilityStaff(userid, facilityid) {
        return this.prismaService.facilityusers.findFirstOrThrow({
            where: {
                userid: userid,
                facilityid: facilityid
            },
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
    async findDeviceStaff(userid, deviceid) {
        return this.prismaService.deviceusers.findFirstOrThrow({
            where: {
                userid: userid,
                deviceid: deviceid,
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
    async unAssignStaffFromFacility(facilityuserid) {
        return this.prismaService.facilityusers.delete({
            where: {
                facilityuserid: facilityuserid,
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