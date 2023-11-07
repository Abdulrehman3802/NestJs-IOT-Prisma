import { DepartmentRepository } from './department.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateDepartmentDto } from './dto/request/create-department.dto';
import { UpdateDepartmentDto } from './dto/request/update-department.dto';
import { ResponseDepartmentDto } from './dto/response/response-department.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
export declare class DepartmentService {
    private readonly departmentRepository;
    private readonly userService;
    private readonly roleService;
    private readonly deviceService;
    private readonly sensorService;
    constructor(departmentRepository: DepartmentRepository, userService: UserService, roleService: RolesService, deviceService: DeviceService, sensorService: SensorService);
    create(createDepartmentDto: CreateDepartmentDto, token: Token): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    createDepartmentAdmin(userid: number, departmentid: number): Promise<ApiResponseDto<null>>;
    findAll(decodedtoken: Token): Promise<ApiResponseDto<ResponseDepartmentDto[]>>;
    GetAllDepartmentIdsByFacilityId(facilityid: number): Promise<ApiResponseDto<ResponseDepartmentDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<ApiResponseDto<ResponseDepartmentDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    removeByOrganizationId(orgid: number): Promise<ApiResponseDto<null>>;
    removeByFacilityId(facilityid: number): Promise<ApiResponseDto<null>>;
    findAllDepartments(facId: number): Promise<ApiResponseDto<ResponseDepartmentDto[]>>;
}
