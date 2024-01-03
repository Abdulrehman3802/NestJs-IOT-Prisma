export declare class CreateGatewayDto {
    gateway_note: string;
    customerid: number;
    location: string;
    gateway_id: string;
    carrier: string;
}
export declare class GatewayModelDto {
    gateway_note: string;
    customerid: number;
    location: string;
    gateway_id: string;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    is_deleted: boolean;
    created_by: number;
    updated_by: number;
    carrier: string;
}
