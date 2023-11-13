import { SensorService } from './sensor.service';
import { CreateSensorDto, SensorDto } from './dto/request/create-sensor.dto';
import { UpdateSensorDto } from './dto/request/update-sensor.dto';
import { RequestWithUser } from "../../core/generics/Guards/PermissionAuthGuard";
import { UpdateConfigurationDto } from "./dto/request/update-configuration.dto";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    assignSensor(req: RequestWithUser, createSensorDto: CreateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    getAllAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorsConfiguration(req: RequestWithUser, id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-configuration.dto").ResponseConfigurationDto[]>>;
    showSensorsConfiguration(req: RequestWithUser, id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-configuration.dto").ResponseConfigurationDto[]>>;
    UpdateSensorsConfiguration(req: RequestWithUser, id: string, body: UpdateConfigurationDto[]): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    getSensorWidgets(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any[]>>;
    getSensorsByOrganizationId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorByDeviceId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getAllUnAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<string[]>>;
    updateAssignedSensor(req: RequestWithUser, id: string, updateSensorDto: UpdateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    unAssignedSensor(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    remove(id: string): string;
}
