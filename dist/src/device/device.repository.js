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
exports.DeviceRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DeviceRepository = class DeviceRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createDevice(model) {
        return this.prismaService.devices.create({
            data: model,
        });
    }
    findAllDevices() {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
            }
        });
    }
    findAllDevicesByOrganizationId(orgId) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                customerid: orgId
            }
        });
    }
    findAllDevicesByFacilityId(facilityId) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                facilityid: facilityId
            }
        });
    }
    findAllDevicesByDepartmentId(departmentId) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                departmentid: departmentId
            }
        });
    }
    findDevicesByDepartmentIds(departmentIds) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                departmentid: {
                    in: departmentIds
                }
            }
        });
    }
    findOneDevice(id) {
        return this.prismaService.devices.findFirst({
            where: {
                deviceid: id,
            }
        });
    }
    updateDevice(id, body) {
        return this.prismaService.devices.update({
            where: {
                deviceid: id,
            },
            data: Object.assign(Object.assign({}, body), { date_updated: new Date() }),
        });
    }
    deleteDevice(id) {
        return this.prismaService.devices.update({
            where: {
                deviceid: id,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        });
    }
    deleteDeviceByOrganizationId(orgid) {
        return this.prismaService.devices.updateMany({
            where: {
                customerid: orgid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        });
    }
    deleteDeviceByFacilityId(facilityid) {
        return this.prismaService.devices.updateMany({
            where: {
                facilityid: facilityid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        });
    }
    deleteDeviceByDepartmentId(departmentid) {
        return this.prismaService.devices.updateMany({
            where: {
                departmentid: departmentid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        });
    }
};
DeviceRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeviceRepository);
exports.DeviceRepository = DeviceRepository;
//# sourceMappingURL=device.repository.js.map