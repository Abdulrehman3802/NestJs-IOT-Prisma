import { SensorService } from './sensor.service';
import { CreateSensorDto, SensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { RequestWithUser } from "../../core/generics/Guards/PermissionAuthGuard";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    assignSensor(req: RequestWithUser, createSensorDto: CreateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    getAllAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorsByOrganizationId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorByDeviceId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getAllUnAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<string[]>>;
    updateAssignedSensor(req: RequestWithUser, id: string, updateSensorDto: UpdateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    unAssignedSensor(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    remove(id: string): string;
}
