import { CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateFacilityAdminDto, CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const UpdateFacilityAdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateFacilityAdminDto>>;
export declare class UpdateFacilityAdminDto extends UpdateFacilityAdminDto_base {
    userid: number;
}
declare const UpdateDepartmentAdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDepartmentAdminDto>>;
export declare class UpdateDepartmentAdminDto extends UpdateDepartmentAdminDto_base {
    userid: number;
}
declare const UpdateDeviceAdminDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDeviceAdminDto>>;
export declare class UpdateDeviceAdminDto extends UpdateDeviceAdminDto_base {
    userid: number;
}
export {};
