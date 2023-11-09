import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModelDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { CreateDeviceStaffModelDto, CreateDeviceUserModelDto } from './dto/request/create-device-user.dto';

@Injectable()
export class DeviceRepository {
    constructor(private readonly prismaService: PrismaService) { }

    createDevice(model: ModelDeviceDto) {
        return this.prismaService.devices.create({
            data: model,
        })
    }

    createDeviceUser(model:CreateDeviceUserModelDto){
        return this.prismaService.deviceusers.create({
            data: model,
        })
    }

    createDeviceStaff(model:CreateDeviceStaffModelDto){
        return this.prismaService.deviceusers.create({
            data:model,
        })
    }

    findAllDevices() {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
            }
        });
    }

    findAllDevicesByOrganizationId(orgId: number) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                customerid: orgId
            }
        });
    }

    findAllDevicesByFacilityId(facilityId: number) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                facilityid: facilityId
            }
        });
    }

    findAllDevicesByDepartmentId(departmentId: number) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                departmentid: departmentId
            }
        });
    }

    findDevicesByDepartmentIds(departmentIds: number[]) {
        return this.prismaService.devices.findMany({
            where: {
                is_deleted: false,
                departmentid: {
                    in: departmentIds
                }
            }
        });
    }

    findDeviceByUserId(userId: number) {
        return this.prismaService.deviceusers.findFirst({
            where: {
                userid: userId,
            }
        })
    }

    findOneDevice(id: number) {
        return this.prismaService.devices.findFirst({
            where: {
                deviceid: id,
            }
        })
    }

    updateDevice(id: number, body: UpdateDeviceDto) {
        return this.prismaService.devices.update({
            where: {
                deviceid: id,
            },
            data: {
                ...body,
                date_updated: new Date()
            },
        })
    }

    deleteDevice(id: number) {
        return this.prismaService.devices.update({
            where: {
                deviceid: id,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }

    deleteDeviceByOrganizationId(orgid: number) {
        return this.prismaService.devices.updateMany({
            where: {
                customerid: orgid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }

    deleteDeviceByFacilityId(facilityid: number) {
        return this.prismaService.devices.updateMany({
            where: {
                facilityid: facilityid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }

    deleteDeviceByDepartmentId(departmentid: number) {
        return this.prismaService.devices.updateMany({
            where: {
                departmentid: departmentid,
            },
            data: {
                is_active: false,
                is_deleted: true,
            }
        })
    }
}