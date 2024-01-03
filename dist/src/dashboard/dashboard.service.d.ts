import { DashboardRepository } from "./dashboard.repository";
import { CreateDashboardDto, FindDashboardDto } from "./dto/request/create-dashboard.dto";
import { ApiResponseDto, Token } from "core/generics/api-response.dto";
import { FacilityService } from "../facility/facility.service";
import { DepartmentService } from "../department/department.service";
import { DeviceService } from "../device/device.service";
import { SensorService } from "../sensor/sensor.service";
import { OrganizationService } from "../organization/organization.service";
export declare class DashboardService {
    private readonly dashboardRepository;
    private readonly facilityService;
    private readonly departmentService;
    private readonly organizationService;
    private readonly deviceService;
    private readonly SensorService;
    constructor(dashboardRepository: DashboardRepository, facilityService: FacilityService, departmentService: DepartmentService, organizationService: OrganizationService, deviceService: DeviceService, SensorService: SensorService);
    createDashboard(createDashboardDto: CreateDashboardDto): Promise<ApiResponseDto<any>>;
    findDashboard(findDashboardDto: FindDashboardDto, token: Token): Promise<ApiResponseDto<any>>;
    findDashboardByFacId(token: Token): Promise<ApiResponseDto<any>>;
    findDashboardByDepId(token: Token): Promise<ApiResponseDto<any>>;
    findDashboardByOrganizationId(token: Token): Promise<ApiResponseDto<any>>;
    getCountForOrg(orgId: number): Promise<{
        FacilityCount: number;
        DepartmentCount: number;
        DeviceCount: number;
        AssignedSensorCount: number;
    }>;
    getCountForFacility(facId: number): Promise<{
        DepartmentCount: number;
        DeviceCount: number;
        AssignedSensorCount: number;
    }>;
    getCountForDepartment(depId: number): Promise<{
        DeviceCount: number;
        AssignedSensorCount: number;
    }>;
    getCountsForSuperAdmin(token: Token): Promise<{
        OrganizationCount: number;
        FacilityCount: number;
        DepartmentCount: number;
        DeviceCount: number;
        UnAssignedSensorCount: number;
        AssignedSensorCount: number;
    }>;
}
