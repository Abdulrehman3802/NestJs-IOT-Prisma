export class ResponseFacilityDto {
    facilityid: number;
    customerid: number;
    name: string;
    longitude: number;
    latitude: number;
    address: string;
    contactname: string;
    contactphonenumber: string;
    email: string;
    facility_type: string;
    timezone: string;
    currency: string;
    isfacilityadmin: boolean;
    is_active: boolean;
    is_deleted: boolean;
    date_created: Date;
    date_updated: Date;
}