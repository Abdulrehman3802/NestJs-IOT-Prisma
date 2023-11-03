import { IsString } from "class-validator";

export class CreateRoleDto 
{

  @IsString()
  name: string;

}

export class CreateRoleModelDto
{
  name: string;
  normalizedname: string;
  is_active: boolean;
  is_deleted: boolean;

}