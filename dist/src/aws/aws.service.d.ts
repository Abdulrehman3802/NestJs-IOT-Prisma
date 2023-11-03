import { UpdateAwsDto } from './dto/update-aw.dto';
import * as AWS from 'aws-sdk';
export declare class AwsService {
    private readonly timestreamClient;
    private readonly dynamoDBClient;
    constructor();
    getSensors(): Promise<AWS.TimestreamQuery.Datum[]>;
    findAll(): Promise<string[]>;
    findOne(id: number): string;
    update(id: number, updateAwDto: UpdateAwsDto): string;
    remove(id: number): string;
}
