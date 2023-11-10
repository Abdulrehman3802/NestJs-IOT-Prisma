import { CreateUserDto, CreateFacilityAdminDto, CreateDepartmentAdminDto, CreateDeviceAdminDto, CreateStaffUserDto } from './dto/request/create-user.dto';
import { UpdateDepartmentAdminDto, UpdateDeviceAdminDto, UpdateFacilityAdminDto, UpdateUserDto } from './dto/request/update-user.dto';
import { UserRepository } from "./user.repository";
import { ApiResponseDto, Token } from "../../core/generics/api-response.dto";
import { ResponseUserDto, ResponseAdminDto } from "./dto/response/response-user.dto";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { RolesService } from 'src/roles/roles.service';
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { deleteQueryDepartment, deleteQueryDevice, deleteQueryFacility } from './dto/request/user-queries-dto';
export declare class UserService {
    private readonly userRepository;
    private readonly configService;
    private readonly roleService;
    private readonly facilityService;
    private readonly departmentService;
    private readonly deviceService;
    private readonly emailService;
    constructor(userRepository: UserRepository, configService: ConfigService, roleService: RolesService, facilityService: FacilityService, departmentService: DepartmentService, deviceService: DeviceService, emailService: EmailService);
    create(createUserDto: CreateUserDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    findAll(): Promise<ApiResponseDto<ResponseUserDto[]>>;
    findUnAssignedUsers(): Promise<ApiResponseDto<ResponseUserDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseUserDto>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<ApiResponseDto<ResponseUserDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    createStaffUser(createStaffUserDto: CreateStaffUserDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    createFacilityStaff(createFacilityAdminDto: CreateFacilityAdminDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    createDepartmentStaff(createDepartmentAdminDto: CreateDepartmentAdminDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    createDeviceStaff(createDeviceAdminDto: CreateDeviceAdminDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    findAdminStaff(query: string): Promise<ApiResponseDto<ResponseAdminDto[]>>;
    findUserStaff(query: string): Promise<ApiResponseDto<ResponseAdminDto[]>>;
    updateFacilityStaff(updateFacilityAdminDto: UpdateFacilityAdminDto): Promise<ApiResponseDto<null>>;
    updateDepartmentStaff(updateDepartmentAdminDto: UpdateDepartmentAdminDto): Promise<ApiResponseDto<null>>;
    updateDeviceStaff(updateDeviceAdminDto: UpdateDeviceAdminDto): Promise<ApiResponseDto<null>>;
    deleteFacilityStaff(query: deleteQueryFacility): Promise<ApiResponseDto<null>>;
    deleteDepartmentStaff(query: deleteQueryDepartment): Promise<ApiResponseDto<null>>;
    deleteDeviceStaff(query: deleteQueryDevice): Promise<ApiResponseDto<null>>;
    passwordGenerator(): Promise<string>;
}
