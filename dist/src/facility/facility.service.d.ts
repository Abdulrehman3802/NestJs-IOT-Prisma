import { FacilityRepository } from './facility.repository';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { CreateFacilityDto } from './dto/request/create-facility.dto';
import { UpdateFacilityDto } from './dto/request/update-facility.dto';
import { ResponseFacilityDto } from './dto/response/response-facility.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserService } from "../user/user.service";
import { DepartmentService } from 'src/department/department.service';
import { DeviceService } from 'src/device/device.service';
import { SensorService } from 'src/sensor/sensor.service';
export declare class FacilityService {
    private readonly facilityRepository;
    private readonly userService;
    private readonly roleService;
    private readonly departmentService;
    private readonly deviceService;
    private readonly sensorService;
    constructor(facilityRepository: FacilityRepository, userService: UserService, roleService: RolesService, departmentService: DepartmentService, deviceService: DeviceService, sensorService: SensorService);
    create(createFacilityDto: CreateFacilityDto, token: Token): Promise<ApiResponseDto<ResponseFacilityDto>>;
    createFacilityAdmin(userid: number, facilityid: number): Promise<ApiResponseDto<null>>;
    findAll(decodedtoken: Token): Promise<ApiResponseDto<ResponseFacilityDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseFacilityDto>>;
    update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<ApiResponseDto<ResponseFacilityDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    removeByOrganizationId(orgid: number): Promise<ApiResponseDto<null>>;
    findAllFacilities(orgId: number): Promise<ApiResponseDto<ResponseFacilityDto[]>>;
}
