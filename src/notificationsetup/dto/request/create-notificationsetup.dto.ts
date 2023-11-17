import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNotificationsetupDto 
{
  @IsOptional()
  @IsString()
  email:string;
  
  @IsOptional()
  @IsString()
  plain_email:string;
  
  @IsOptional()
  @IsString()
  phonenumber:string;

  @IsOptional()
  @IsString()
  text_to_speech:string;
  
  @IsNotEmpty()
  @IsNumber()
  userid:number;
}

export class ModelCreateNotificationsetupDto {
  email: string;
  phonenumber:string;
  text_to_speech: string;
  plain_email: string;
  customerid: number; 
  userid: number;
  is_email: boolean;
  is_phone:boolean;
  is_text_to_speech: boolean;
  is_plain_email: boolean;
  is_active: boolean;
  is_deleted: boolean;
  date_created: Date;
  date_updated: Date;
  created_by: number;
  updated_by: number;
}

export class FindQueryForUsers {
  type: string;
}