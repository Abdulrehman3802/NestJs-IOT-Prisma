import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(createOrganizationDto: CreateOrganizationDto, req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-organization.dto").ResponseOrganizationDto>>;
    findAll(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-organization.dto").ResponseOrganizationDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-organization.dto").ResponseOrganizationDto>>;
    update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-organization.dto").ResponseOrganizationDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-organization.dto").ResponseOrganizationDto>>;
}
