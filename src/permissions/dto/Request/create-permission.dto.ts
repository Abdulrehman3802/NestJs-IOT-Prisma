import { IsNumber, IsString } from "class-validator";

export class CreatePermissionDto 
{
  @IsNumber()
  roleid: number

  @IsString()
  permissiontype: string

  @IsString()
  permissionvalue: string

}

