import {IsNumber, IsOptional, IsString} from "class-validator";

export class CreateGatewayDto {
    @IsOptional()
    @IsString()
    gateway_note:string;
    @IsOptional()
    @IsNumber()
    customerid:number;
    @IsOptional()
    @IsString()
    location:string;
    @IsOptional()
    @IsString()
    gateway_id:string;
    @IsOptional()
    @IsString()
    carrier:string;
}

export class GatewayModelDto{
    gateway_note:string;
    customerid:number;
    location:string;
    gateway_id:string;
    is_active:boolean;
    date_created:Date;
    date_updated:Date;
    is_deleted:boolean;
    created_by:number;
    updated_by:number;
    carrier:string;
}
