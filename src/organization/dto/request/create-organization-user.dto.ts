import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateOrganizationUserDto {
    @IsNotEmpty()
    @IsNumber()
    customerid: number;

    @IsNotEmpty()
    @IsNumber()
    userid: number;
}

export class OrganizationUserModelDto {
    customerid: number
    userid: number
}