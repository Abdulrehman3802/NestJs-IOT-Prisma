import { GatewayService } from './gateway.service';
import { CreateGatewayDto } from './dto/request/create-gateway.dto';
import { UpdateGatewayDto } from './dto/request/update-gateway.dto';
import { RequestWithUser } from "../../core/generics/Guards/PermissionAuthGuard";
export declare class GatewayController {
    private readonly gatewayService;
    constructor(gatewayService: GatewayService);
    assignGateway(req: RequestWithUser, createGatewayDto: CreateGatewayDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/gateway-response.dto").GatewayResponseDto>>;
    findAll(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/gateway-response.dto").GatewayResponseDto[]>>;
    findAllGatewaysForSuperAdmin(): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/gateway-response.dto").GatewayResponseDto[]>>;
    updateGateway(id: string, updateGatewayDto: UpdateGatewayDto): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<import("./dto/response/gateway-response.dto").GatewayResponseDto>>;
    remove(id: string): Promise<import("../../core/generics/api-response.dto").ApiResponseDto<null>>;
}
