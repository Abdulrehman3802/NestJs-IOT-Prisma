import { IsBoolean, IsOptional, IsNumber } from "class-validator";

export class CreateDashboardDto {
    @IsBoolean()
    @IsOptional()
    isCard?: boolean;

    @IsOptional()
    @IsNumber()
    customerid?: number;

    @IsOptional()
    @IsNumber()
    facilityid?: number;

    @IsOptional()
    @IsNumber()
    deviceid?: number;

    @IsOptional()
    @IsNumber()
    departmentid?: number;
}

export class FindDashboardDto {

    @IsOptional()
    @IsNumber()
    customerid?: number;

    @IsOptional()
    @IsNumber()
    facilityid?: number;

    // @IsOptional()
    // @IsNumber()
    // deviceid?: number;

    @IsOptional()
    @IsNumber()
    departmentid?: number;
}

export class ModelDepartmentDashboardDto {
    departmentid: number;
    isCard: boolean;
}

export class ModelFacilityDashboardDto {
    facilityid: number;
    isCard: boolean = true;
}

export class ModelOrgDashboardDto {
    customerid: number;
    isCard: boolean;
}

export class ModelDeviceDashboardDto {
    deviceid: number;
    isCard: boolean;
}