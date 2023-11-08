export declare class CreateFacilityDto {
    customerid: number;
    latitude: number;
    longitude: number;
    name: string;
    contactname: string;
    email: string;
    isfacilityadmin: boolean;
    address: string;
    timezone: string;
    currency: string;
    facility_type: string;
    contactphonenumber: string;
}
export declare class ModelFacilityDto {
    customerid: number;
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    contactname: string;
    contactphonenumber: string;
    email: string;
    timezone: string;
    currency: string;
    isfacilityadmin: boolean;
    facility_type: string;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    created_by: number;
    updated_by: number;
}
