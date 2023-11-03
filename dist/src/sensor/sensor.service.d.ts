import { CreateSensorDto, SensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { SensorRepository } from "./sensor.repository";
import { ApiResponseDto, Token } from "../../core/generics/api-response.dto";
import { AwsService } from "../aws/aws.service";
export declare class SensorService {
    private readonly sensorRepository;
    private readonly awsService;
    constructor(sensorRepository: SensorRepository, awsService: AwsService);
    assignSensor(userId: number, createSensorDto: CreateSensorDto): Promise<ApiResponseDto<SensorDto>>;
    getAllAssignedSensor(token: Token): Promise<ApiResponseDto<SensorDto[]>>;
    getAllUnAssignedSensors(token: Token): Promise<ApiResponseDto<string[]>>;
    updateAssignedSensor(userid: number, id: number, updateDto: UpdateSensorDto): Promise<ApiResponseDto<SensorDto>>;
    unAssignedSensor(id: number): Promise<ApiResponseDto<SensorDto>>;
    remove(id: number): string;
}
