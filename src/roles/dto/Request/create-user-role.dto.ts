import {IsNumber} from "class-validator";

export class CreateUserRoleDto {
    @IsNumber()
    roleid: number;
    @IsNumber()
    userid:number;
}

export class CreateUserRoleModelDto {
    roleid:number;
    userid:number;

}