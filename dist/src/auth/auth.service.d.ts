import { LoginDto } from './dto/request/login.dto';
import { UserRepository } from "../user/user.repository";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ApiResponseDto } from "../../core/generics/api-response.dto";
import { ResponseDto, ResponseLoginDto } from "./dto/response/response-login.dto";
import { ChangePasswordDto, ResetPasswordDto } from "./dto/request/reset-password.dto";
import { EmailService } from "../email/email.service";
import { RolesRepository } from 'src/roles/roles.repository';
import { OrganizationRepository } from 'src/organization/organization.repository';
import { FacilityRepository } from 'src/facility/facility.repository';
import { DepartmentRepository } from 'src/department/department.repository';
import { DeviceRepository } from 'src/device/device.repository';
export declare class AuthService {
    private readonly userRepository;
    private readonly rolesRepository;
    private readonly organizationRepository;
    private readonly facilityRepository;
    private readonly departmentRepository;
    private readonly deviceRepository;
    private readonly configService;
    private readonly jwtService;
    private readonly emailService;
    constructor(userRepository: UserRepository, rolesRepository: RolesRepository, organizationRepository: OrganizationRepository, facilityRepository: FacilityRepository, departmentRepository: DepartmentRepository, deviceRepository: DeviceRepository, configService: ConfigService, jwtService: JwtService, emailService: EmailService);
    login(loginDto: LoginDto): Promise<ApiResponseDto<ResponseLoginDto>>;
    changePassword(userid: number, body: ChangePasswordDto): Promise<ApiResponseDto<ResponseDto>>;
    getResetToken(email: string): Promise<ApiResponseDto<null>>;
    resetPassword(body: ResetPasswordDto): Promise<ApiResponseDto<ResponseDto>>;
}
