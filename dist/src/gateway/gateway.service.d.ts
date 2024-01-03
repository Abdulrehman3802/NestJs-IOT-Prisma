import { CreateGatewayDto } from './dto/request/create-gateway.dto';
import { UpdateGatewayDto } from './dto/request/update-gateway.dto';
import { GatewayRepository } from "./gateway.repository";
import { ApiResponseDto, Token } from "../../core/generics/api-response.dto";
import { GatewayResponseDto } from "./dto/response/gateway-response.dto";
export declare class GatewayService {
    private readonly gateWayRepository;
    constructor(gateWayRepository: GatewayRepository);
    assignGateway(token: Token, createGatewayDto: CreateGatewayDto): Promise<ApiResponseDto<GatewayResponseDto>>;
    findAllGatewayOfOrg(id: number): Promise<ApiResponseDto<GatewayResponseDto[]>>;
    findAll(): Promise<ApiResponseDto<GatewayResponseDto[]>>;
    updateGateway(id: number, updateGatewayDto: UpdateGatewayDto): Promise<ApiResponseDto<GatewayResponseDto>>;
    deleteGateway(id: number): Promise<ApiResponseDto<null>>;
}
