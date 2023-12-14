import {IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsDate} from "class-validator";

export class CreateOrganizationDto {
    @IsString()
    @IsNotEmpty()
    customername: string;

    @IsString()
    @IsNotEmpty()
    contactperson: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsOptional()
    credit: number;

    @IsNumber()
    @IsOptional()
    interval1: number;

    @IsNumber()
    @IsOptional()
    interval2: number;

    @IsNumber()
    @IsOptional()
    interval3: number;

    @IsNumber()
    @IsOptional()
    interval4: number;

    @IsOptional()
    @IsString()
    logo:string
}

export class ModelOrganizationDto {
    customername: string
    contactperson: string
    email: string
    phone: string
    address: string
    city: string
    credit: number
    is_active?: boolean
    date_created: Date
    date_updated?: Date
    created_by: number
    updated_by: number
    calibration_date: Date
    logo:string
    interval1: number
    interval2: number
    interval3: number
    interval4: number
}