export declare class CreateDeviceDto {
    devicename: string;
    email: string;
    departmentid: number;
    facilityid: number;
    customerid: number;
    delaytime: number;
    devicetype: string;
    manufacturer: string;
}
export declare class ModelDeviceDto {
    devicename: string;
    departmentid: number;
    facilityid: number;
    customerid: number;
    delaytime: number;
    devicetype: string;
    manufacturer: string;
    email: string;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    is_deleted: boolean;
    created_by: number;
    updated_by: number;
}
