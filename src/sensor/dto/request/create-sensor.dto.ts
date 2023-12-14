import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateSensorDto {
    @IsNumber()
    @IsOptional()
    deviceid: number
    @IsNumber()
    @IsOptional()
    customerid: number
    @IsString()
    @IsNotEmpty()
    aws_sensorid: string
    @IsString()
    @IsNotEmpty()
    sensorname: string

}

export class CheckpointReportDto{
    days: number;
    startDate : string;
}

export class SensorDto{
    deviceid: number
    is_active: boolean
    customerid: number
    aws_sensorid: string
    is_deleted   : boolean
    date_created  :Date
    date_updated  :Date
    assigned_by:number
    sensorname: string
}

export class SensorTypeModelDTO{
    property: string;
    unit: string;
    description:string
    minvalue: number;
    maxvalue: number;
    sensorid: number;
    name: string;
    aws_sensorid: string;
    is_hidden: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    updated_by: number;

}