"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const dashboard_repository_1 = require("./dashboard.repository");
const facility_service_1 = require("../facility/facility.service");
const department_service_1 = require("../department/department.service");
const device_service_1 = require("../device/device.service");
const sensor_service_1 = require("../sensor/sensor.service");
const organization_service_1 = require("../organization/organization.service");
let DashboardService = class DashboardService {
    constructor(dashboardRepository, facilityService, departmentService, organizationService, deviceService, SensorService) {
        this.dashboardRepository = dashboardRepository;
        this.facilityService = facilityService;
        this.departmentService = departmentService;
        this.organizationService = organizationService;
        this.deviceService = deviceService;
        this.SensorService = SensorService;
    }
    async createDashboard(createDashboardDto) {
        try {
            if (!createDashboardDto.isCard) {
                createDashboardDto.isCard = true;
            }
            let responseDashboard;
            if (createDashboardDto.customerid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByOrgId(createDashboardDto.customerid);
                if (existingDashboard) {
                    throw new common_1.NotAcceptableException("Dashboard Already Exist");
                }
                const orgDashboardModel = {
                    customerid: createDashboardDto.customerid,
                    isCard: createDashboardDto.isCard
                };
                responseDashboard = await this.dashboardRepository.createOrganizationDashboard(orgDashboardModel);
            }
            else if (createDashboardDto.facilityid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByFacilityId(createDashboardDto.facilityid);
                if (existingDashboard) {
                    throw new common_1.NotAcceptableException("Dashboard Already Exist");
                }
                const facDashboardModel = {
                    facilityid: createDashboardDto.facilityid,
                    isCard: createDashboardDto.isCard,
                };
                responseDashboard = await this.dashboardRepository.createFacilityDashboard(facDashboardModel);
            }
            else if (createDashboardDto.departmentid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByDepId(createDashboardDto.departmentid);
                if (existingDashboard) {
                    throw new common_1.NotAcceptableException("Dashboard Already Exist");
                }
                const depDashboardModel = {
                    departmentid: createDashboardDto.departmentid,
                    isCard: createDashboardDto.isCard,
                };
                responseDashboard = await this.dashboardRepository.createDepartmentDashboard(depDashboardModel);
            }
            else if (createDashboardDto.deviceid !== undefined) {
                const existingDashboard = await this.dashboardRepository.findDashboardByDeviceId(createDashboardDto.deviceid);
                if (existingDashboard) {
                    throw new common_1.NotAcceptableException("Dashboard Already Exist");
                }
                const devDashboardModel = {
                    deviceid: createDashboardDto.deviceid,
                    isCard: createDashboardDto.isCard,
                };
                responseDashboard = await this.dashboardRepository.createDeviceDashboard(devDashboardModel);
            }
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Dashboard Created Successfully!",
                data: responseDashboard,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findDashboard(findDashboardDto, token) {
        var _a, _b, _c, _d;
        try {
            const { rolename, facilityId, customerId, departmentId } = token;
            let responseDashboard, facCount, depCount, devCount, SensorCount, counts = {};
            if (rolename == 'SuperAdmin') {
                if (findDashboardDto.customerid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByOrgId(findDashboardDto.customerid);
                    counts = await this.getCountForOrg(findDashboardDto.customerid);
                }
                else if (findDashboardDto.facilityid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(findDashboardDto.facilityid);
                    counts = await this.getCountForFacility(findDashboardDto.facilityid);
                }
                else if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid);
                }
                else {
                    counts = await this.getCountsForSuperAdmin(token);
                    const response = {
                        statusCode: common_1.HttpStatus.OK,
                        message: "Dashboard Found Successfully!",
                        data: { counts },
                        error: false,
                    };
                    return response;
                }
            }
            if (rolename == 'OrganizationAdmin') {
                if (findDashboardDto.facilityid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(findDashboardDto.facilityid);
                    counts = await this.getCountForFacility(findDashboardDto.facilityid);
                }
                else if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid);
                }
                else {
                    responseDashboard = await this.dashboardRepository.findDashboardByOrgId(customerId);
                    counts = await this.getCountForOrg(customerId);
                }
            }
            if (rolename == 'FacilityAdmin') {
                if (findDashboardDto.departmentid) {
                    responseDashboard = await this.dashboardRepository.findDashboardByDepId(findDashboardDto.departmentid);
                    counts = await this.getCountForDepartment(findDashboardDto.departmentid);
                }
                else {
                    responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(facilityId);
                    counts = await this.getCountForFacility(facilityId);
                }
            }
            if (rolename == 'DepartmentAdmin') {
                responseDashboard = await this.dashboardRepository.findDashboardByDepId(departmentId);
                counts = await this.getCountForDepartment(departmentId);
            }
            if (!responseDashboard) {
                throw new common_1.NotFoundException("Dashboard Not Found.");
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Dashboard Found Successfully!",
                data: Object.assign(Object.assign({}, responseDashboard), { FacilityCount: (_a = facCount === null || facCount === void 0 ? void 0 : facCount.data) === null || _a === void 0 ? void 0 : _a.length, DepartmentCount: (_b = depCount === null || depCount === void 0 ? void 0 : depCount.data) === null || _b === void 0 ? void 0 : _b.length, DeviceCount: (_c = devCount === null || devCount === void 0 ? void 0 : devCount.data) === null || _c === void 0 ? void 0 : _c.length, AssignedSensorCount: (_d = SensorCount === null || SensorCount === void 0 ? void 0 : SensorCount.data) === null || _d === void 0 ? void 0 : _d.length, counts }),
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findDashboardByFacId(token) {
        try {
            const { rolename, facilityId } = token;
            if (rolename !== 'FacilityAdmin') {
                throw new common_1.NotAcceptableException(`UnAuthorized Request Not A Facility Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByFacilityId(facilityId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findDashboardByDepId(token) {
        try {
            const { rolename, departmentId } = token;
            if (rolename !== 'DepartmentAdmin') {
                throw new common_1.NotAcceptableException(`UnAuthorized Request Not A Department Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByDepId(departmentId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findDashboardByOrganizationId(token) {
        try {
            const { rolename, customerId } = token;
            if (rolename !== 'OrganizationAdmin') {
                throw new common_1.NotAcceptableException(`UnAuthorized Request Not A Organization Admin.`);
            }
            const responseDashboard = await this.dashboardRepository.findDashboardByOrgId(customerId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Dashboard Find Successfully!",
                data: responseDashboard,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async getCountForOrg(orgId) {
        var _a, _b, _c, _d;
        const facCount = await this.facilityService.findAllFacilities(orgId);
        const depCount = await this.departmentService.GetAllDepartmentsByOrgId(orgId);
        const devCount = await this.deviceService.GetAllDeviceByOrgId(orgId);
        const SensorCount = await this.SensorService.getSensorByOrgId(orgId);
        return {
            FacilityCount: (_a = facCount === null || facCount === void 0 ? void 0 : facCount.data) === null || _a === void 0 ? void 0 : _a.length,
            DepartmentCount: (_b = depCount === null || depCount === void 0 ? void 0 : depCount.data) === null || _b === void 0 ? void 0 : _b.length,
            DeviceCount: (_c = devCount === null || devCount === void 0 ? void 0 : devCount.data) === null || _c === void 0 ? void 0 : _c.length,
            AssignedSensorCount: (_d = SensorCount === null || SensorCount === void 0 ? void 0 : SensorCount.data) === null || _d === void 0 ? void 0 : _d.length,
        };
    }
    async getCountForFacility(facId) {
        var _a, _b, _c;
        const depCount = await this.departmentService.GetAllDepartmentIdsByFacilityId(facId);
        const devCount = await this.deviceService.getAllDeviceByFacilityId(facId);
        const SensorCount = await this.SensorService.getSensorByFacilityId(facId);
        return {
            DepartmentCount: (_a = depCount === null || depCount === void 0 ? void 0 : depCount.data) === null || _a === void 0 ? void 0 : _a.length,
            DeviceCount: (_b = devCount === null || devCount === void 0 ? void 0 : devCount.data) === null || _b === void 0 ? void 0 : _b.length,
            AssignedSensorCount: (_c = SensorCount === null || SensorCount === void 0 ? void 0 : SensorCount.data) === null || _c === void 0 ? void 0 : _c.length,
        };
    }
    async getCountForDepartment(depId) {
        var _a, _b;
        const devCount = await this.deviceService.findAllDevicesByDepId(depId);
        const SensorCount = await this.SensorService.getSensorByDepartmentId(depId);
        return {
            DeviceCount: (_a = devCount === null || devCount === void 0 ? void 0 : devCount.data) === null || _a === void 0 ? void 0 : _a.length,
            AssignedSensorCount: (_b = SensorCount === null || SensorCount === void 0 ? void 0 : SensorCount.data) === null || _b === void 0 ? void 0 : _b.length,
        };
    }
    async getCountsForSuperAdmin(token) {
        var _a, _b, _c, _d, _e, _f;
        const organizations = await this.organizationService.findAll();
        const facilities = await this.facilityService.findAllFacilityForSuperAdmin();
        const departments = await this.departmentService.findAllDepartmentsForSuperAdmin();
        const devices = await this.deviceService.findAllDeviceForSuperAdmin();
        const unAssignedSensors = await this.SensorService.getAllUnAssignedSensors(token);
        const assignedSensors = await this.SensorService.getAllAssignedSensor(token);
        return {
            OrganizationCount: (_a = organizations === null || organizations === void 0 ? void 0 : organizations.data) === null || _a === void 0 ? void 0 : _a.length,
            FacilityCount: (_b = facilities === null || facilities === void 0 ? void 0 : facilities.data) === null || _b === void 0 ? void 0 : _b.length,
            DepartmentCount: (_c = departments === null || departments === void 0 ? void 0 : departments.data) === null || _c === void 0 ? void 0 : _c.length,
            DeviceCount: (_d = devices === null || devices === void 0 ? void 0 : devices.data) === null || _d === void 0 ? void 0 : _d.length,
            UnAssignedSensorCount: (_e = unAssignedSensors === null || unAssignedSensors === void 0 ? void 0 : unAssignedSensors.data) === null || _e === void 0 ? void 0 : _e.length,
            AssignedSensorCount: (_f = assignedSensors === null || assignedSensors === void 0 ? void 0 : assignedSensors.data) === null || _f === void 0 ? void 0 : _f.length
        };
    }
};
DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => department_service_1.DepartmentService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => organization_service_1.OrganizationService))),
    __metadata("design:paramtypes", [dashboard_repository_1.DashboardRepository,
        facility_service_1.FacilityService,
        department_service_1.DepartmentService,
        organization_service_1.OrganizationService,
        device_service_1.DeviceService,
        sensor_service_1.SensorService])
], DashboardService);
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map