import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/request/create-device.dto';
import { UpdateDeviceDto } from './dto/request/update-device.dto';
import { RequestWithUser } from 'core/generics/Guards/PermissionAuthGuard';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(req: RequestWithUser, createDeviceDto: CreateDeviceDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto>>;
    findAll(req: RequestWithUser): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto[]>>;
    findOne(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto>>;
    finAllDevicesByOrgId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto[]>>;
    finAllDevicesByFacId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto[]>>;
    finAllDevicesByDepId(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto[]>>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/response-device.dto").ResponseDeviceDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
}
