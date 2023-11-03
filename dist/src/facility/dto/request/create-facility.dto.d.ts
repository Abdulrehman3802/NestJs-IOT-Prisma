export declare class CreateFacilityDto {
    customerid: number;
    name: string;
    contactname: string;
    email: string;
    isfacilityadmin: boolean;
    location: string;
    address: string;
    contactphonenumber: string;
}
export declare class ModelFacilityDto {
    customerid: number;
    name: string;
    location: string;
    address: string;
    contactname: string;
    contactphonenumber: string;
    email: string;
    isfacilityadmin: boolean;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
    created_by: number;
    updated_by: number;
}
