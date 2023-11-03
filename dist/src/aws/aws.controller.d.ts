import { AwsService } from './aws.service';
import { UpdateAwsDto } from './dto/update-aw.dto';
export declare class AwsController {
    private readonly awsService;
    constructor(awsService: AwsService);
    getSensors(): Promise<import("aws-sdk/clients/timestreamquery").Datum[]>;
    findAll(): Promise<string[]>;
    findOne(id: string): string;
    update(id: string, updateAwDto: UpdateAwsDto): string;
    remove(id: string): string;
}
