import { IsString } from "class-validator";

export class AssignRoleDto 
{

  @IsString()
  roleid: string;

  @IsString()
  userid: string;

}
