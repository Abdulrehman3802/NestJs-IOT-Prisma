import { CreateRoleDto } from './dto/Request/create-role.dto';
import { UpdateRoleDto } from './dto/Request/update-role.dto';
import { RolesRepository } from './roles.repository';
import { ApiResponseDto } from 'core/generics/api-response.dto';
import { CreateRoleResponseDto, RolesResponseDto } from './dto/Response/role-response.dto';
import { AssignRoleDto } from './dto/Request/assigne-role.dto';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserRoleDto } from "./dto/Request/create-user-role.dto";
export declare class RolesService {
    private readonly rolesRepository;
    private readonly usersRepository;
    constructor(rolesRepository: RolesRepository, usersRepository: UserRepository);
    create(createRoleDto: CreateRoleDto): Promise<ApiResponseDto<CreateRoleResponseDto>>;
    createUserRole(userRoleDto: CreateUserRoleDto): Promise<{
        userroleid: number;
        roleid: number;
        userid: number;
    }>;
    assignRoletoUser(assignRoleDto: AssignRoleDto): Promise<ApiResponseDto<string>>;
    findAll(): Promise<ApiResponseDto<RolesResponseDto[]>>;
    findRoleByName(name: string): Promise<{
        roleid: number;
        name: string;
        normalizedname: string;
        is_active: boolean;
        is_deleted: boolean;
    }>;
    findOne(id: number): Promise<ApiResponseDto<RolesResponseDto>>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<ApiResponseDto<RolesResponseDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
}
