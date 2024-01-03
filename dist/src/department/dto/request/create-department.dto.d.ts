export declare class CreateDepartmentDto {
    email: string;
    departmentname: string;
    customerid: number;
    facilityid: number;
}
export declare class ModelDepartmentDto {
    departmentname: string;
    email: string;
    customerid: number;
    facilityid: number;
    is_active: boolean;
    date_created: Date;
    date_updated: Date;
    is_deleted: boolean;
    created_by: number;
    updated_by: number;
}
