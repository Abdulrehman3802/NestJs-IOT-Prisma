import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/Request/create-role.dto';
import { UpdateRoleDto } from './dto/Request/update-role.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
import { AssignRoleDto } from './dto/Request/assigne-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/Response/role-response.dto").CreateRoleResponseDto>>;
    assignRoletoUser(assignRoleDto: AssignRoleDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<string>>;
    findAll(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/Response/role-response.dto").RolesResponseDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/Response/role-response.dto").RolesResponseDto>>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/Response/role-response.dto").RolesResponseDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
}
