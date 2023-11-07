import { CreateOrganizationDto } from './dto/request/create-organization.dto';
import { UpdateOrganizationDto } from './dto/request/update-organization.dto';
import { OrganizationRepository } from './organization.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { ResponseOrganizationDto } from './dto/response/response-organization.dto';
import { UserService } from "../user/user.service";
import { RolesService } from "../roles/roles.service";
import { FacilityService } from 'src/facility/facility.service';
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
export declare class OrganizationService {
    private readonly organizationRepository;
    private readonly userService;
    private readonly roleService;
    private readonly facilityService;
    private readonly departmentService;
    private readonly deviceService;
    private readonly sensorService;
    constructor(organizationRepository: OrganizationRepository, userService: UserService, roleService: RolesService, facilityService: FacilityService, departmentService: DepartmentService, deviceService: DeviceService, sensorService: SensorService);
    create(createOrganizationDto: CreateOrganizationDto, token: Token): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    findAll(): Promise<ApiResponseDto<ResponseOrganizationDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    update(id: number, updateOrganizationDto: UpdateOrganizationDto): Promise<ApiResponseDto<ResponseOrganizationDto>>;
    remove(id: number): Promise<ApiResponseDto<ResponseOrganizationDto>>;
}
