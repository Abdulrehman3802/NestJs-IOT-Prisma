import { CreateOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { OrganizationRepository } from './organization.repository';
import { ApiResponseDto } from 'core/generics/api-response.dto';
import { ResponseOrganizationDto } from './dto/response/response-organization.dto';
import { UserService } from "../user/user.service";
import { RolesService } from "../roles/roles.service";
export declare class OrganizationService {
    private readonly organizationRepository;
    private readonly userService;
    private readonly roleService;
    constructor(organizationRepository: OrganizationRepository, userService: UserService, roleService: RolesService);
    create(createOrganizationDto: CreateOrganizationDto, userid: number): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    findAll(): Promise<ApiResponseDto<ResponseOrganizationDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    remove(id: number): Promise<ApiResponseDto<ResponseOrganizationDto>>;
}
