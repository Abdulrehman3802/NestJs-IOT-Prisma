import { PrismaService } from "../prisma/prisma.service";
import { SensorDto, SensorTypeModelDTO } from "./dto/create-sensor.dto";
export declare class SensorRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    assignSensor(model: SensorDto): import(".prisma/client").Prisma.Prisma__sensorsClient<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unAssignSensorOnOrganizationDeletion(orgid: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds: number[]): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    unAssignSensorOnDeviceDeletion(deviceid: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    createSensorType(model: SensorTypeModelDTO[]): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    findUnAssignedSensor(): import(".prisma/client").Prisma.PrismaPromise<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    }[]>;
    findByAwsId(awsId: string): import(".prisma/client").Prisma.Prisma__sensorsClient<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAssignSensor(): import(".prisma/client").Prisma.PrismaPromise<({
        customers: {
            customerid: number;
            customername: string;
            contactperson: string;
            email: string;
            phone: string;
            address: string;
            city: string;
            is_active: boolean;
            date_created: Date;
            date_updated: Date;
            is_deleted: boolean;
            created_by: number;
            updated_by: number;
            street: string;
            postcode: number;
        };
    } & {
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    })[]>;
    findAssignSensorByOrganizationId(orgId: number): import(".prisma/client").Prisma.PrismaPromise<({
        customers: {
            customerid: number;
            customername: string;
            contactperson: string;
            email: string;
            phone: string;
            address: string;
            city: string;
            is_active: boolean;
            date_created: Date;
            date_updated: Date;
            is_deleted: boolean;
            created_by: number;
            updated_by: number;
            street: string;
            postcode: number;
        };
    } & {
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    })[]>;
    findAssignSensorByDeviceId(devId: number): import(".prisma/client").Prisma.PrismaPromise<({
        devices: {
            departments: {
                departmentid: number;
                departmentname: string;
                customerid: number;
                is_active: boolean;
                date_created: Date;
                date_updated: Date;
                is_deleted: boolean;
                facilityid: number;
                created_by: number;
                updated_by: number;
                email: string;
                description: string;
            };
        } & {
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
        };
    } & {
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    })[]>;
    findSensorByDeviceIds(deviceIds: number[]): import(".prisma/client").Prisma.PrismaPromise<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    }[]>;
    updateSensor(id: number, updateSensorDto: SensorDto): import(".prisma/client").Prisma.Prisma__sensorsClient<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
        sensorname: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): string;
}
