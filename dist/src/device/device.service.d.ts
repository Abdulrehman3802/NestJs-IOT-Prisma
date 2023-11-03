import { CreateDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { DeviceRepository } from './device.repository';
import { ResponseDeviceDto } from './dto/response/response-device.dto';
import { ApiResponseDto, Token } from 'core/generics/api-response.dto';
export declare class DeviceService {
    private readonly deviceRepository;
    constructor(deviceRepository: DeviceRepository);
    create(createDeviceDto: CreateDeviceDto, token: Token): Promise<ApiResponseDto<ResponseDeviceDto>>;
    findAll(token: Token): Promise<ApiResponseDto<ResponseDeviceDto[]>>;
    findOne(id: number): Promise<ApiResponseDto<ResponseDeviceDto>>;
    update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<ApiResponseDto<ResponseDeviceDto>>;
    remove(id: number): Promise<ApiResponseDto<null>>;
    findAllDevices(depId: number): Promise<ApiResponseDto<ResponseDeviceDto[]>>;
}
