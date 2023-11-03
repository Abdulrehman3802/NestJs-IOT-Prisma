import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/request/create-department.dto';
import { UpdateDepartmentDto } from './dto/request/update-department.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(req: RequestWithUser, createDepartmentDto: CreateDepartmentDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-department.dto").ResponseDepartmentDto>>;
    findAll(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-department.dto").ResponseDepartmentDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-department.dto").ResponseDepartmentDto>>;
    finAllDepartmentsByFacId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-department.dto").ResponseDepartmentDto[]>>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-department.dto").ResponseDepartmentDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
}
