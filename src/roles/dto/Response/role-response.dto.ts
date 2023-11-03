import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateRoleResponseDto 
{
  @IsNumber()
  roleid: number
  
  @IsString()
  name: string;
}

export class RolesResponseDto extends CreateRoleResponseDto 
{
  @IsBoolean()
  is_active: boolean
}
