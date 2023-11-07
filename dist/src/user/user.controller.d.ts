import { UserService } from './user.service';
import { CreateDepartmentAdminDto, CreateFacilityAdminDto, CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(req: RequestWithUser, createUserDto: CreateUserDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    createFacilityAdmin(req: RequestWithUser, createFacilityAdminDto: CreateFacilityAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    createDepartmentAdmin(req: RequestWithUser, createDepartmentAdminDto: CreateDepartmentAdminDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    findAll(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto[]>>;
    findAllAdmins(query: any): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-user.dto").ResponseUserDto>>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
