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
exports.FacilityService = void 0;
const common_1 = require("@nestjs/common");
const facility_repository_1 = require("./facility.repository");
const roles_service_1 = require("../roles/roles.service");
const user_service_1 = require("../user/user.service");
const create_user_dto_1 = require("../user/dto/request/create-user.dto");
const department_service_1 = require("../department/department.service");
const device_service_1 = require("../device/device.service");
const sensor_service_1 = require("../sensor/sensor.service");
const dashboard_service_1 = require("../dashboard/dashboard.service");
const create_dashboard_dto_1 = require("../dashboard/dto/request/create-dashboard.dto");
let FacilityService = class FacilityService {
    constructor(facilityRepository, userService, roleService, departmentService, deviceService, dashboardService, sensorService) {
        this.facilityRepository = facilityRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.departmentService = departmentService;
        this.deviceService = deviceService;
        this.dashboardService = dashboardService;
        this.sensorService = sensorService;
    }
    async create(createFacilityDto, token) {
        try {
            const { id, customerId, rolename } = token;
            let facilityModel;
            const orgId = createFacilityDto.customerid;
            if (rolename == 'SuperAdmin') {
                if (!orgId)
                    throw new common_1.NotAcceptableException("customerid cannot be empty");
                facilityModel = Object.assign(Object.assign({}, createFacilityDto), { is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), created_by: id, updated_by: id });
            }
            if (rolename == 'OrganizationAdmin') {
                facilityModel = Object.assign(Object.assign({}, createFacilityDto), { customerid: customerId, is_active: true, is_deleted: false, date_created: new Date(), date_updated: new Date(), created_by: id, updated_by: id });
            }
            const facility = await this.facilityRepository.createFacility(facilityModel);
            const userDto = new create_user_dto_1.CreateUserDto();
            userDto.email = facility.email;
            const user = await this.userService.create(userDto, token);
            const facilityAdminId = await this.roleService.findRoleByName('FacilityAdmin');
            await this.roleService.createUserRole({ userid: user.data.userid, roleid: facilityAdminId.roleid });
            await this.facilityRepository.createFacilityUser({ userid: user.data.userid, facilityid: facility.facilityid, is_admin: true });
            const dashboardDto = new create_dashboard_dto_1.CreateDashboardDto();
            dashboardDto.facilityid = facility.facilityid;
            await this.dashboardService.createDashboard(dashboardDto);
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Facility Created Successfully!",
                data: facility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async createFacilityStaff(userid, facilityid, is_admin) {
        try {
            await this.facilityRepository.createFacilityAdmin({
                userid: userid,
                facilityid: facilityid,
                is_admin: is_admin
            });
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Facility Admin Created Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findAll(decodedtoken) {
        try {
            const { rolename, customerId } = decodedtoken;
            let facilities;
            if (rolename === 'OrganizationAdmin') {
                facilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(customerId);
            }
            else {
                facilities = await this.facilityRepository.findAllFacilities();
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facilities Found Successfully!",
                data: facilities,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findOne(id) {
        try {
            const facility = await this.facilityRepository.findOneFacility(id);
            if (!facility) {
                throw new common_1.NotFoundException(`Facility Not Found with id: ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Found Successfully!",
                data: facility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async update(id, updateFacilityDto) {
        try {
            const updatedFacility = await this.facilityRepository.updateFacility(id, updateFacilityDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Updated Successfully!",
                data: updatedFacility,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async remove(id) {
        try {
            await this.facilityRepository.deleteFacility(id);
            const departments = await this.departmentService.GetAllDepartmentIdsByFacilityId(id);
            await this.departmentService.removeByFacilityId(id);
            const departmentIds = departments.data.map(d => d.departmentid);
            const devices = await this.deviceService.findDevicesByDepartmentIds(departmentIds);
            await this.deviceService.removeByFacilityId(id);
            const deviceIds = devices.data.map(dev => dev.deviceid);
            await this.sensorService.unAssignSensorOnFacilityOrDepartmentDeletion(deviceIds);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async removeByOrganizationId(orgid) {
        try {
            await this.facilityRepository.deleteFacilityByOrganizationId(orgid);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facility Deleted Successfully!",
                data: null,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findAllFacilities(orgId) {
        try {
            const allFacilities = await this.facilityRepository.findAllFacilitiesOfOrgAdmin(orgId);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facilities Found Associated to Organization",
                data: allFacilities,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findAllFacilityForSuperAdmin() {
        try {
            const facilities = await this.facilityRepository.findAllFacilities();
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Facilities Found Associated to Organization",
                data: facilities,
                error: false,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
};
FacilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [facility_repository_1.FacilityRepository,
        user_service_1.UserService,
        roles_service_1.RolesService,
        department_service_1.DepartmentService,
        device_service_1.DeviceService,
        dashboard_service_1.DashboardService,
        sensor_service_1.SensorService])
], FacilityService);
exports.FacilityService = FacilityService;
//# sourceMappingURL=facility.service.js.map