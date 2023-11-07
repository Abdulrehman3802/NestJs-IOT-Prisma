import { CreateDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { DeviceRepository } from './device.repository';
import { ResponseDeviceDto } from './dto/response/response-device.dto';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
import { SensorService } from 'src/sensor/sensor.service';
export declare class DeviceService {
    private readonly deviceRepository;
    private readonly sensorService;
    constructor(deviceRepository: DeviceRepository, sensorService: SensorService);
    create(createDeviceDto: CreateDeviceDto, token: Token): Promise<ApiResponseDto<ResponseDeviceDto>>;
    findAll(token: Token): Promise<ApiResponseDto<ResponseDeviceDto[]>>;
    findDevicesByDepartmentIds(departmentIds: number[]): Promise<ApiResponseDto<ResponseDeviceDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseDeviceDto>>;
    update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<ApiResponseDto<ResponseDeviceDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    removeByOrganizationId(orgid: number): Promise<ApiResponseDto<null>>;
    removeByFacilityId(facilityid: number): Promise<ApiResponseDto<null>>;
    removeByDepartmentId(departmentid: number): Promise<ApiResponseDto<null>>;
    findAllDevices(depId: number): Promise<ApiResponseDto<ResponseDeviceDto[]>>;
}
