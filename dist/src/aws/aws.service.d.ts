import { UpdateAwsDto } from './dto/Request/update-aw.dto';
import * as AWS from 'aws-sdk';
import { AwsSensorData } from "./dto/response/aws-sensor.dto";
export declare class AwsService {
    private readonly timestreamClient;
    private readonly dynamoDBClient;
    constructor();
    getSensors(): Promise<AWS.TimestreamQuery.Datum[]>;
    getDataOfSpecificSensor(awsId: string): Promise<unknown[]>;
    getSensorDataForWidgets(devEUIs: string[]): Promise<AwsSensorData[]>;
    findAll(): Promise<string[]>;
    findOne(id: number): string;
    update(id: number, updateAwDto: UpdateAwsDto): string;
    remove(id: number): string;
}
