import { UpdateAwsDto } from './dto/Request/update-aw.dto';
import * as AWS from 'aws-sdk';
import { AwsSensorData } from "./dto/response/aws-sensor.dto";
import { PrismaService } from "../prisma/prisma.service";
export declare class AwsService {
    private readonly prismaService;
    private readonly timestreamClient;
    private readonly dynamoDBClient;
    constructor(prismaService: PrismaService);
    getSensors(): Promise<AWS.TimestreamQuery.Datum[]>;
    getDataOfSpecificSensor(awsId: string): Promise<unknown[]>;
    getSensorDataForWidgets(devEUIs: string[]): Promise<AwsSensorData[]>;
    findAll(): Promise<string[]>;
    findOne(id: number): string;
    update(id: number, updateAwDto: UpdateAwsDto): string;
    remove(id: number): string;
    saveAWSData(): Promise<{
        measure: string;
        aws_id: string;
        location: string;
        sensorvalue: string;
        reading_timestamp: string;
    }[]>;
    getSensorDataForReport(ids: string[], days: number, selectedDate: string): Promise<{
        readingid: number;
        sensorid: number;
        deviceid: number;
        gatewayid: number;
        measure: string;
        aws_id: string;
        location: string;
        sensorvalue: string;
        reading_timestamp: string;
    }[]>;
}
