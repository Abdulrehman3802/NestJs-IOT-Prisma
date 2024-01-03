import { AwsService } from './aws.service';
import { UpdateAwsDto } from './dto/Request/update-aw.dto';
export declare class AwsController {
    private readonly awsService;
    constructor(awsService: AwsService);
    getSensors(): Promise<import("aws-sdk/clients/timestreamquery").Datum[]>;
    saveAWSData(): Promise<{
        measure: string;
        aws_id: string;
        location: string;
        sensorvalue: string;
        reading_timestamp: string;
    }[]>;
    findAll(): Promise<string[]>;
    findOne(id: string): string;
    update(id: string, updateAwDto: UpdateAwsDto): string;
    remove(id: string): string;
}
