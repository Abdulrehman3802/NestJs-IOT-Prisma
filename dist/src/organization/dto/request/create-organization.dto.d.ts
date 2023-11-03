export declare class CreateOrganizationDto {
    customername: string;
    contactperson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}
export declare class ModelOrganizationDto {
    customername: string;
    contactperson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    is_active?: boolean;
    date_created: Date;
    date_updated?: Date;
    created_by: number;
    updated_by: number;
}
