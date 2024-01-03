export declare class CreateDashboardDto {
    isCard?: boolean;
    customerid?: number;
    facilityid?: number;
    deviceid?: number;
    departmentid?: number;
}
export declare class FindDashboardDto {
    customerid?: number;
    facilityid?: number;
    departmentid?: number;
}
export declare class ModelDepartmentDashboardDto {
    departmentid: number;
    isCard: boolean;
}
export declare class ModelFacilityDashboardDto {
    facilityid: number;
    isCard: boolean;
}
export declare class ModelOrgDashboardDto {
    customerid: number;
    isCard: boolean;
}
export declare class ModelDeviceDashboardDto {
    deviceid: number;
    isCard: boolean;
}
