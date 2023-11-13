import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateConfigurationDto{
    @IsOptional()
    @IsString()
    property: string;
    @IsOptional()
    @IsString()
    unit: string;
    @IsOptional()
    @IsNumber()
    minvalue: number;
    @IsOptional()
    @IsNumber()
    maxvalue: number;
    @IsOptional()
    @IsNumber()
    sensorid: number;
    @IsOptional()
    @IsString()
    aws_sensorid: string;
    @IsOptional()
    @IsBoolean()
    is_hidden: boolean;

}