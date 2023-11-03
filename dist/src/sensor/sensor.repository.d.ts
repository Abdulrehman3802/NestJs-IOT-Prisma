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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAssignSensor(): import(".prisma/client").Prisma.PrismaPromise<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
    }[]>;
    findAssignSensorByOrganizationId(orgId: number): import(".prisma/client").Prisma.PrismaPromise<{
        sensorid: number;
        deviceid: number;
        is_active: boolean;
        customerid: number;
        is_deleted: boolean;
        aws_sensorid: string;
        date_created: Date;
        date_updated: Date;
        assigned_by: number;
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): string;
}