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
exports.DashboardRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardRepository = class DashboardRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createDepartmentDashboard(model) {
        return this.prismaService.departmentdashboard.create({
            data: model,
        });
    }
    createOrganizationDashboard(model) {
        return this.prismaService.organizationdashboard.create({
            data: model,
        });
    }
    createFacilityDashboard(model) {
        return this.prismaService.facilitydashboard.create({
            data: model,
        });
    }
    createDeviceDashboard(model) {
        return this.prismaService.devicedashboard.create({
            data: model,
        });
    }
    findDashboardByDepId(depId) {
        return this.prismaService.departmentdashboard.findFirst({
            where: {
                departmentid: depId
            },
            include: {
                departments: {
                    include: {
                        facilities: {
                            include: {
                                customers: true,
                            }
                        }
                    }
                },
            },
        });
    }
    findDashboardByOrgId(orgId) {
        return this.prismaService.organizationdashboard.findFirst({
            where: {
                customerid: orgId,
            },
            include: {
                customers: true
            }
        });
    }
    findDashboardByDeviceId(deviceId) {
        return this.prismaService.devicedashboard.findFirst({
            where: {
                deviceid: deviceId,
            },
            include: {
                devices: {
                    include: {
                        departments: true
                    }
                }
            }
        });
    }
    findDashboardByFacilityId(facId) {
        return this.prismaService.facilitydashboard.findFirst({
            where: {
                facilityid: facId,
            },
            include: {
                facilities: {
                    include: {
                        customers: true
                    }
                },
            }
        });
    }
    updateDepDashboard(id, body) {
        return this.prismaService.departmentdashboard.update({
            where: {
                departmentdashboardid: id,
            },
            data: body,
        });
    }
    updateOrgDashboard(id, body) {
        return this.prismaService.organizationdashboard.update({
            where: {
                orgdashboardid: id,
            },
            data: body,
        });
    }
    updateDeviceDashboard(id, body) {
        return this.prismaService.devicedashboard.update({
            where: {
                devicedashboardid: id,
            },
            data: body,
        });
    }
    updateFacilityDashboard(id, body) {
        return this.prismaService.facilitydashboard.update({
            where: {
                facilitydashboardid: id,
            },
            data: body,
        });
    }
};
DashboardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardRepository);
exports.DashboardRepository = DashboardRepository;
//# sourceMappingURL=dashboard.repository.js.map