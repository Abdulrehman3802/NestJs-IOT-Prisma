import {IsBoolean, IsDate, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateConfigurationDto{
    @IsOptional()
    @IsNumber()
    sensortypeid: number;
    @IsOptional()
    @IsString()
    property: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsString()
    name: string;
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
    @IsOptional()
    @IsBoolean()
    is_active: boolean;

}