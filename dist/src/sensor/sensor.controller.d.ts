import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { RequestWithUser } from "../../core/generics/Guards/PermissionAuthGuard";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    assignSensor(req: RequestWithUser, createSensorDto: CreateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/create-sensor.dto").SensorDto>>;
    getAllAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/create-sensor.dto").SensorDto[]>>;
    getAllUnAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<string[]>>;
    remove(id: string): string;
}
