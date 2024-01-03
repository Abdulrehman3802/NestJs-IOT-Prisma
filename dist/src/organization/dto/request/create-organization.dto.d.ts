export declare class CreateOrganizationDto {
    customername: string;
    contactperson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    credit: number;
    interval1: number;
    interval2: number;
    interval3: number;
    interval4: number;
    logo: string;
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
    calibration_date: Date;
    logo: string;
    interval1: number;
    interval2: number;
    interval3: number;
    interval4: number;
}
