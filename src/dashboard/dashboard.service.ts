import { Injectable, HttpStatus, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { DashboardRepository } from "./dashboard.repository";
import { CreateDashboardDto, FindDashboardDto } from "./dto/request/create-dashboard.dto";
import { ApiResponseDto, Token } from "core/generics/api-response.dto";

@Injectable()
export class DashboardService {
    constructor(
        private readonly dashboardRepository: DashboardRepository,
    ) { }

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
            }
            else if (createDashboardDto.facilityid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByFacilityId(createDashboardDto.facilityid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const facDashboardModel = {
                    facilityid: createDashboardDto.facilityid,
                    isCard: createDashboardDto.isCard,
                }
                responseDashboard = await this.dashboardRepository.createFacilityDashboard(facDashboardModel);
            }
            else if (createDashboardDto.departmentid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByDepId(createDashboardDto.departmentid);
                if (existingDashboard) {
                    throw new NotAcceptableException("Dashboard Already Exist")
                }
                const depDashboardModel = {
                    departmentid: createDashboardDto.departmentid,
                    isCard: createDashboardDto.isCard,
                }
                responseDashboard = await this.dashboardRepository.createDepartmentDashboard(depDashboardModel);
            }
            else if (createDashboardDto.deviceid !== undefined) {
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
            const { rolename, facilityId, customerId, departmentId } = token;
            let responseDashboard;
            if (rolename == 'SuperAdmin') {
                if (findDashboardDto.customerid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByOrgId(findDashboardDto.customerid);
                }
                if (findDashboardDto.facilityid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(findDashboardDto.facilityid);
                }
                if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                }
            }
            if (rolename == 'OrganizationAdmin') {
                responseDashboard = await this.dashboardRepository.findDashboardByOrgId(customerId);
            }
            if (rolename == 'FacilityAdmin') {
                responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(facilityId);
            }
            if (rolename == 'DepartmentAdmin') {
                responseDashboard = await this.dashboardRepository.findDashboardByDepId(departmentId);
            }

            if (!responseDashboard) {
                throw new NotFoundException("Dashboard Not Found.")
            }
            const response: ApiResponseDto<any> = {
                statusCode: HttpStatus.OK,
                message: "Dashboard Found Successfully!",
                data: responseDashboard,
                error: false,
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    }

    async findDashboardByFacId(token: Token) {
        try {
            const { rolename, facilityId } = token;
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
            const { rolename, departmentId } = token;
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
            const { rolename, customerId } = token;
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
}