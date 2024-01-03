import { GatewayModelDto } from "./dto/request/create-gateway.dto";
import { UpdateGatewayDto } from "./dto/request/update-gateway.dto";
import { PrismaService } from "../prisma/prisma.service";
export declare class GatewayRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    assignGateway(model: GatewayModelDto): Promise<{
        gatewayid: number;
        gateway_note: string;
        location: string;
        customerid: number;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
        gateway_id: string;
        carrier: string;
    }>;
    findAllGatewayOfOrg(id: number): import(".prisma/client").Prisma.PrismaPromise<{
        gatewayid: number;
        gateway_note: string;
        location: string;
        customerid: number;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
        gateway_id: string;
        carrier: string;
    }[]>;
    findAllGateways(): import(".prisma/client").Prisma.PrismaPromise<{
        gatewayid: number;
        gateway_note: string;
        location: string;
        customerid: number;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
        gateway_id: string;
        carrier: string;
    }[]>;
    findOne(id: number): string;
    updateGateway(id: number, updateGatewayDto: UpdateGatewayDto): import(".prisma/client").Prisma.Prisma__gatewaysClient<{
        gatewayid: number;
        gateway_note: string;
        location: string;
        customerid: number;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
        gateway_id: string;
        carrier: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    deleteGateway(id: number): import(".prisma/client").Prisma.Prisma__gatewaysClient<{
        gatewayid: number;
        gateway_note: string;
        location: string;
        customerid: number;
        is_active: boolean;
        date_created: Date;
        date_updated: Date;
        is_deleted: boolean;
        created_by: number;
        updated_by: number;
        gateway_id: string;
        carrier: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
