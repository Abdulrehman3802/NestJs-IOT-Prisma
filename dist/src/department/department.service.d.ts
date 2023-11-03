import { DepartmentRepository } from './department.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateDepartmentDto } from './dto/request/create-department.dto';
import { UpdateDepartmentDto } from './dto/request/update-department.dto';
import { ResponseDepartmentDto } from './dto/response/response-department.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
export declare class DepartmentService {
    private readonly departmentRepository;
    private readonly userService;
    private readonly roleService;
    constructor(departmentRepository: DepartmentRepository, userService: UserService, roleService: RolesService);
    create(createDepartmentDto: CreateDepartmentDto, token: Token): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    findAll(decodedtoken: Token): Promise<ApiResponseDto<ResponseDepartmentDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    findAllDepartments(facId: number): Promise<ApiResponseDto<ResponseDepartmentDto[]>>;
}
