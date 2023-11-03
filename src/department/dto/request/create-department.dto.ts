import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    departmentname: string;

    @IsOptional()
    @IsNumber()
    customerid: number;

    @IsOptional()
    @IsNumber()
    facilityid: number;

    @IsOptional()
    @IsString()
    location: string;
}

export class ModelDepartmentDto {
    departmentname: string;
    email:string;
    customerid: number;
    facilityid: number;
    location: string;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    is_deleted: boolean;
    created_by: number;
    updated_by: number;
}
