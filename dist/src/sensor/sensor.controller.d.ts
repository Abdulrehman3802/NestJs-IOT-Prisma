import { SensorService } from './sensor.service';
import { CheckpointReportDto, CreateSensorDto, GraphDto, SensorDto } from './dto/request/create-sensor.dto';
import { UpdateSensorDto } from './dto/request/update-sensor.dto';
import { RequestWithUser } from "../../core/generics/Guards/PermissionAuthGuard";
import { UpdateConfigurationDto } from "./dto/request/update-configuration.dto";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    assignSensor(req: RequestWithUser, createSensorDto: CreateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    getCheckpointReport(id: string, body: CheckpointReportDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any>>;
    getGraph(id: string, body: GraphDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<any>>;
    getAllAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorsConfiguration(req: RequestWithUser, id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-configuration.dto").ResponseConfigurationDto[]>>;
    showSensorsConfiguration(req: RequestWithUser, id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-configuration.dto").ResponseConfigurationDto[]>>;
    UpdateSensorsConfiguration(req: RequestWithUser, body: UpdateConfigurationDto[]): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
    getSensorWidgets(orgId: string): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: {
            value: any;
            batteryValue: any;
            readingDateTime: any;
            property: string;
            sensorId: number;
            sensorTypeId: number;
            awsSensorId: string;
            minValue: number;
            maxValue: number;
            sensorName: string;
            deviceName: string;
        }[];
        error: boolean;
    }>;
    getSensorsByOrganizationId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getAllSensorsByOrganizationIdForSuperAdmin(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorsByFacilityId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorsByDepartmentId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getSensorByDeviceId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getAllUnAssignedSensors(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<string[]>>;
    getEquipmentSensorsByOrgId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getEquipmentSensorsByFacId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    getEquipmentSensorsByDepId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto[]>>;
    updateAssignedSensor(req: RequestWithUser, id: string, updateSensorDto: UpdateSensorDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    unAssignedSensor(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    unAssignedSensorFromDevice(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<SensorDto>>;
    remove(id: string): string;
}
