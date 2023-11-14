import { CreateSensorDto, SensorDto } from './dto/request/create-sensor.dto';
import { UpdateSensorDto } from './dto/request/update-sensor.dto';
import { SensorRepository } from "./sensor.repository";
import { ApiResponseDto, Token } from "../../core/generics/api-response.dto";
import { AwsService } from "../aws/aws.service";
import { DeviceService } from "../device/device.service";
import { DepartmentService } from "../department/department.service";
import { UpdateConfigurationDto } from "./dto/request/update-configuration.dto";
import { ResponseConfigurationDto } from "./dto/response/response-configuration.dto";
export declare class SensorService {
    private readonly sensorRepository;
    private readonly awsService;
    private readonly departmentService;
    private readonly deviceService;
    constructor(sensorRepository: SensorRepository, awsService: AwsService, departmentService: DepartmentService, deviceService: DeviceService);
    assignSensor(userId: number, createSensorDto: CreateSensorDto): Promise<ApiResponseDto<SensorDto>>;
    getSensorConfiguration(sensorId: number): Promise<ApiResponseDto<ResponseConfigurationDto[]>>;
    ShowSensorConfiguration(sensorId: number): Promise<ApiResponseDto<ResponseConfigurationDto[]>>;
    updateSensorConfiguration(userId: number, configuration: UpdateConfigurationDto[]): Promise<ApiResponseDto<null>>;
    unAssignSensorOnOrganziationDeletion(orgid: number): Promise<ApiResponseDto<null>>;
    unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds: number[]): Promise<ApiResponseDto<null>>;
    unAssignSensorOnDeviceDeletion(deviceid: number): Promise<ApiResponseDto<null>>;
    getAllAssignedSensor(token: Token): Promise<ApiResponseDto<SensorDto[]>>;
    getAllUnAssignedSensors(token: Token): Promise<ApiResponseDto<string[]>>;
    updateAssignedSensor(userid: number, id: number, updateDto: UpdateSensorDto): Promise<ApiResponseDto<SensorDto>>;
    unAssignedSensor(id: number): Promise<ApiResponseDto<SensorDto>>;
    getSensorByDeviceId(devId: number): Promise<ApiResponseDto<SensorDto[]>>;
    getSensorByOrgId(orgId: number): Promise<ApiResponseDto<SensorDto[]>>;
    getSensorWidgets(): Promise<ApiResponseDto<any[]>>;
    getSensorByDepartmentId(depId: number): Promise<ApiResponseDto<SensorDto[]>>;
    getSensorByFacilityId(facId: number): Promise<ApiResponseDto<SensorDto[]>>;
    remove(id: number): string;
}
