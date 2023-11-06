import { IsString, IsNotEmpty, IsNumber, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class CreateFacilityDto {

    @IsOptional()
    @IsNumber()
    customerid: number;
    
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
    contactphonenumber: string;

    @IsOptional()
    @IsNumber()
    longitude: number;

    @IsOptional()
    @IsNumber()
    latitude: number;

    @IsOptional()
    @IsString()
    facility_type: string;
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
    facility_type: string;
    isfacilityadmin: boolean;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    created_by: number;
    updated_by: number
}
