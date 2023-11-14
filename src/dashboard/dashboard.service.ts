import {Injectable, HttpStatus, NotAcceptableException, NotFoundException, Inject, forwardRef} from "@nestjs/common";
import {DashboardRepository} from "./dashboard.repository";
import {CreateDashboardDto, FindDashboardDto} from "./dto/request/create-dashboard.dto";
import {ApiResponseDto, Token} from "core/generics/api-response.dto";
import {FacilityService} from "../facility/facility.service";
import {DepartmentService} from "../department/department.service";
import {DeviceService} from "../device/device.service";
import {SensorService} from "../sensor/sensor.service";
import {UserService} from "../user/user.service";
import {OrganizationService} from "../organization/organization.service";

@Injectable()
export class DashboardService {
    constructor(
        private readonly dashboardRepository: DashboardRepository,
        @Inject(forwardRef(() => FacilityService)) private readonly facilityService: FacilityService,
        @Inject(forwardRef(() => DepartmentService)) private readonly departmentService: DepartmentService,
        @Inject(forwardRef(() => OrganizationService)) private readonly organizationService: OrganizationService,
        private readonly deviceService: DeviceService,
        private readonly SensorService: SensorService,
    ) {
    }

    async createDashboard(createDashboardDto: CreateDashboardDto) {
        try {
            if (!createDashboardDto.isCard) {
                createDashboardDto.isCard = true
            }
            let responseDashboard: {};
            if (createDashboardDto.customerid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByOrgId(createDashboardDto.customerid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const orgDashboardModel = {
                    customerid: createDashboardDto.customerid,
                    isCard: createDashboardDto.isCard
                }
                responseDashboard = await this.dashboardRepository.createOrganizationDashboard(orgDashboardModel);
            } else if (createDashboardDto.facilityid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByFacilityId(createDashboardDto.facilityid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const facDashboardModel = {
                    facilityid: createDashboardDto.facilityid,
                    isCard: createDashboardDto.isCard,
                }
                responseDashboard = await this.dashboardRepository.createFacilityDashboard(facDashboardModel);
            } else if (createDashboardDto.departmentid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByDepId(createDashboardDto.departmentid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const depDashboardModel = {
                    departmentid: createDashboardDto.departmentid,
                    isCard: createDashboardDto.isCard,
                }
                responseDashboard = await this.dashboardRepository.createDepartmentDashboard(depDashboardModel);
            } else if (createDashboardDto.deviceid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByDeviceId(createDashboardDto.deviceid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const devDashboardModel = {
                    deviceid: createDashboardDto.deviceid,
                    isCard: createDashboardDto.isCard,
                }
                responseDashboard = await this.dashboardRepository.createDeviceDashboard(devDashboardModel);
            }
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.CREATED,
                message: "Dashboard Created Successfully!",
                data: responseDashboard,
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findDashboard(findDashboardDto: FindDashboardDto, token: Token) {
        try {
            const {rolename, facilityId, customerId, departmentId} = token;
            let responseDashboard, facCount, depCount, devCount, SensorCount, counts = {};
            if (rolename == 'SuperAdmin') {
                if (findDashboardDto.customerid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByOrgId(findDashboardDto.customerid);
                    counts = await this.getCountForOrg(findDashboardDto.customerid);
                } else if (findDashboardDto.facilityid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(findDashboardDto.facilityid);
                    counts = await this.getCountForFacility(findDashboardDto.facilityid)
                } else if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid)
                } else {
                    counts = await this.getCountsForSuperAdmin(token)
                    const response: ApiResponseDto<any> = {
                        statusCode: HttpStatus.OK,
                        message: "Dashboard Found Successfully!",
                        data: {counts},
                        error: false,
                    }
                    return response;
                }
            }
            if (rolename == 'OrganizationAdmin') {
                if (findDashboardDto.facilityid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(findDashboardDto.facilityid);
                    counts = await this.getCountForFacility(findDashboardDto.facilityid)
                } else if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid)
                } else {
                    responseDashboard = await this.dashboardRepository.findDashboardByOrgId(customerId);
                    counts = await this.getCountForOrg(customerId);
                }
            }
            if (rolename == 'FacilityAdmin') {
                if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid)
                } else {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(facilityId);
                    counts = await this.getCountForFacility(facilityId)
                }
            }
            if (rolename == 'DepartmentAdmin') {
                responseDashboard = await this.dashboardRepository.findDashboardByDepId(departmentId);
                counts = await this.getCountForDepartment(departmentId)
            }

            if (!responseDashboard) {
                throw new NotFoundException("Dashboard Not Found.")
            }
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.OK,
                message: "Dashboard Found Successfully!",
                data: {
                    ...responseDashboard,
                    FacilityCount: facCount?.data?.length,
                    DepartmentCount: depCount?.data?.length,
                    DeviceCount: devCount?.data?.length,
                    SensorCount: SensorCount?.data?.length,
                    counts
                },
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findDashboardByFacId(token: Token) {
        try {
            const {rolename, facilityId} = token;
            if (rolename !== 'FacilityAdmin') {
                throw new NotAcceptableException(`UnAuthorized Request Not A Facility Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(facilityId);
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findDashboardByDepId(token: Token) {
        try {
            const {rolename, departmentId} = token;
            if (rolename !== 'DepartmentAdmin') {
                throw new NotAcceptableException(`UnAuthorized Request Not A Department Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByDepId(departmentId);
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async findDashboardByOrganizationId(token: Token) {
        try {
            const {rolename, customerId} = token;
            if (rolename !== 'OrganizationAdmin') {
                throw new NotAcceptableException(`UnAuthorized Request Not A Organization Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByOrgId(customerId);
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getCountForOrg(orgId: number) {
        const facCount = await this.deviceService.GetAllDeviceByOrgId(orgId);
        const depCount = await this.departmentService.GetAllDepartmentsByOrgId(orgId);
        const devCount = await this.deviceService.GetAllDeviceByOrgId(orgId);
        const SensorCount = await this.SensorService.getSensorByOrgId(orgId);

        return {
            FacilityCount: facCount?.data?.length,
            DepartmentCount: depCount?.data?.length,
            DeviceCount: devCount?.data?.length,
            SensorCount: SensorCount?.data?.length,
        }
    }

    async getCountForFacility(facId: number) {
        const depCount = await this.departmentService.GetAllDepartmentIdsByFacilityId(facId);
        const devCount = await this.deviceService.getAllDeviceByFacilityId(facId);
        const SensorCount = await this.SensorService.getSensorByFacilityId(facId);

        return {
            DepartmentCount: depCount?.data?.length,
            DeviceCount: devCount?.data?.length,
            SensorCount: SensorCount?.data?.length,
        }
    }

    async getCountForDepartment(depId: number) {
        const devCount = await this.deviceService.findAllDevicesByDepId(depId);
        const SensorCount = await this.SensorService.getSensorByDepartmentId(depId);
        return {
            DeviceCount: devCount?.data?.length,
            SensorCount: SensorCount?.data?.length,
        }
    }

    async getCountsForSuperAdmin(token: Token) {
        const organizations = await this.organizationService.findAll()
        const facilities = await this.facilityService.findAllFacilityForSuperAdmin()
        const departments = await this.departmentService.findAllDepartmentsForSuperAdmin()
        const devices = await this.deviceService.findAllDeviceForSuperAdmin()
        const unAssignedSensors = await this.SensorService.getAllUnAssignedSensors(token)
        const assignedSensors = await this.SensorService.getAllAssignedSensor(token)

        return {
            OrganizationCount: organizations?.data?.length,
            FacilityCount: facilities?.data?.length,
            DepartmentCount: departments?.data?.length,
            DeviceCount: devices?.data?.length,
            UnAssignedSensorCount: unAssignedSensors?.data?.length,
            AssignedSensorCount: assignedSensors?.data?.length
        }
    }

}