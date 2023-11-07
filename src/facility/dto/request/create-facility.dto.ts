import { IsString, IsNotEmpty, IsNumber, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class CreateFacilityDto {

    @IsOptional()
    @IsNumber()
    customerid: number;

    @IsOptional()
    @IsNumber()
    latitude: number;

    @IsOptional()
    @IsNumber()
    longitude: number;
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    contactname: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    isfacilityadmin: boolean;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    facility_type: string;

    @IsOptional()
    @IsString()
    contactphonenumber: string;
}

export class ModelFacilityDto {
    customerid: number;
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    contactname: string;
    contactphonenumber: string;
    email: string;
    isfacilityadmin: boolean;
    facility_type: string;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    created_by: number;
    updated_by: number
}
