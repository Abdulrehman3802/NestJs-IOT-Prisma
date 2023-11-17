export declare class CreateOrganizationDto {
    customername: string;
    contactperson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    credit: number;
}
export declare class ModelOrganizationDto {
    customername: string;
    contactperson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    credit: number;
    is_active?: boolean;
    date_created: Date;
    date_updated?: Date;
    created_by: number;
    updated_by: number;
}
