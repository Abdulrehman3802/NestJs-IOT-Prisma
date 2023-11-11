import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateFacilityAdminDto, CreateStaffUserDto, CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserStaffDto extends PartialType(CreateStaffUserDto) {}

export class UpdateFacilityAdminDto extends PartialType(CreateFacilityAdminDto) {
    @IsNumber()
    @IsNotEmpty()
    userid: number;
}

export class UpdateDepartmentAdminDto extends PartialType(CreateDepartmentAdminDto) {
  @IsNumber()
  @IsNotEmpty()
  userid: number;
}

export class UpdateDeviceAdminDto extends PartialType(CreateDeviceAdminDto) {
  @IsNumber()
  @IsNotEmpty()
  userid: number;
}

