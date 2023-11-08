import { PrismaService } from 'src/prisma/prisma.service';
import { ModelDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
export declare class DeviceRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createDevice(model: ModelDeviceDto): import(".prisma/client").Prisma.Prisma__devicesClient<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllDevices(): import(".prisma/client").Prisma.PrismaPromise<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findAllDevicesByOrganizationId(orgId: number): import(".prisma/client").Prisma.PrismaPromise<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findAllDevicesByFacilityId(facilityId: number): import(".prisma/client").Prisma.PrismaPromise<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findAllDevicesByDepartmentId(departmentId: number): import(".prisma/client").Prisma.PrismaPromise<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findDevicesByDepartmentIds(departmentIds: number[]): import(".prisma/client").Prisma.PrismaPromise<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }[]>;
    findOneDevice(id: number): import(".prisma/client").Prisma.Prisma__devicesClient<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateDevice(id: number, body: UpdateDeviceDto): import(".prisma/client").Prisma.Prisma__devicesClient<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteDevice(id: number): import(".prisma/client").Prisma.Prisma__devicesClient<{
        deviceid: number;
        devicename: string;
        departmentid: number;
        devicetype: string;
        manufacturer: string;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        facilityid: number;
        customerid: number;
        created_by: number;
        updated_by: number;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteDeviceByOrganizationId(orgid: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    deleteDeviceByFacilityId(facilityid: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    deleteDeviceByDepartmentId(departmentid: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
}
