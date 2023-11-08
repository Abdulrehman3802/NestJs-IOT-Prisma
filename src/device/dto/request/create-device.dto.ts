import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateDeviceDto {

    @IsString()
    @IsNotEmpty()
    devicename: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNumber()
    @IsOptional()
    departmentid: number;

    @IsOptional()
    @IsNumber()
    facilityid: number;

    @IsOptional()
    @IsNumber()
    customerid: number;

    @IsString()
    @IsOptional()
    devicetype: string;

    @IsString()
    @IsOptional()
    manufacturer: string;
}

export class ModelDeviceDto {
    devicename: string;
    departmentid: number;
    facilityid: number;
    customerid: number;
    devicetype: string;
    manufacturer: string;
    email:string
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    is_deleted: boolean;
    created_by: number;
    updated_by: number;
}
