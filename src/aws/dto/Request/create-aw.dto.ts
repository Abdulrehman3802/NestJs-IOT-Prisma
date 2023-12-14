export class AwsDto {
    aws_id: string;
    location: string;
    sensorvalue: string;
    reading_timestamp: string
    measure:string
}

export class ReadingsDto extends AwsDto {
    sensorid:number;
    deviceid:number;
    gatewayid:number;
}