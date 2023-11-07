import { CreateUserDto, CreateFacilityAdminDto, CreateDepartmentAdminDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserRepository } from "./user.repository";
import { ApiResponseDto, Token } from "../../core/generics/api-response.dto";
import { ResponseUserDto } from "./dto/response/response-user.dto";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../email/email.service";
import { RolesService } from 'src/roles/roles.service';
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
export declare class UserService {
    private readonly userRepository;
    private readonly configService;
    private readonly roleService;
    private readonly facilityService;
    private readonly departmentService;
    private readonly emailService;
    constructor(userRepository: UserRepository, configService: ConfigService, roleService: RolesService, facilityService: FacilityService, departmentService: DepartmentService, emailService: EmailService);
    create(createUserDto: CreateUserDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    createFacilityAdmin(createFacilityAdminDto: CreateFacilityAdminDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    createDepartmentAdmin(createDepartmentAdminDto: CreateDepartmentAdminDto, token: Token): Promise<ApiResponseDto<ResponseUserDto>>;
    findAll(): Promise<ApiResponseDto<ResponseUserDto[]>>;
    findAdmins(query: string): Promise<ApiResponseDto<ResponseUserDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseUserDto>>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    passwordGenerator(): Promise<string>;
}
