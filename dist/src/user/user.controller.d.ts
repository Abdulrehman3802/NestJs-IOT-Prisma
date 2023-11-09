import { UserService } from './user.service';
import { CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateFacilityAdminDto, CreateUserDto, findQuery } from './dto/request/create-user.dto';
import { UpdateDepartmentAdminDto, UpdateDeviceAdminDto, UpdateFacilityAdminDto, UpdateUserDto } from './dto/request/update-user.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(req: RequestWithUser, createUserDto: CreateUserDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    createFacilityAdmin(req: RequestWithUser, createFacilityAdminDto: CreateFacilityAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    createDepartmentStaff(req: RequestWithUser, createDepartmentAdminDto: CreateDepartmentAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    createDeviceStaff(req: RequestWithUser, createDeviceAdminDto: CreateDeviceAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    updateFacilityStaff(updateFacilityDto: UpdateFacilityAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    updateDepartmentStaff(updateDepartmentDto: UpdateDepartmentAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    updateDeviceStaff(updateDeviceDto: UpdateDeviceAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    findAll(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto[]>>;
    findAllAdmins(query: findQuery): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseAdminDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
