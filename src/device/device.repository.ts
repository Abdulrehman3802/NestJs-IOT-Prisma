import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModelDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';

@Injectable()
export class DeviceRepository {
    constructor(private readonly prismaService: PrismaService) { }

    createDevice(model: ModelDeviceDto) {
        return this.prismaService.devices.create({
            data: model,
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
}