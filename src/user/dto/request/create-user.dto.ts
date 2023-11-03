import {IsString, IsOptional, IsArray, IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstname: string;
    @IsString()
    lastname: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsOptional()
    address: string;
    @IsString()
    @IsOptional()
    passwordhash: string;
    @IsOptional()
    @IsString()
    phonenumber: string;
    @IsOptional()
    @IsString()
    resettoken:string
}

export class ModelUserDto {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    passwordhash: string;
    phonenumber: string;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
}

