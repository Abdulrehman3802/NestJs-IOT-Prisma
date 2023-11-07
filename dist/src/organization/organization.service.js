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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const organization_repository_1 = require("./organization.repository");
const user_service_1 = require("../user/user.service");
const create_user_dto_1 = require("../user/dto/request/create-user.dto");
const roles_service_1 = require("../roles/roles.service");
const create_organization_user_dto_1 = require("./dto/request/create-organization-user.dto");
const facility_service_1 = require("../facility/facility.service");
const department_service_1 = require("../department/department.service");
const device_service_1 = require("../device/device.service");
const sensor_service_1 = require("../sensor/sensor.service");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository, userService, roleService, facilityService, departmentService, deviceService, sensorService) {
        this.organizationRepository = organizationRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.facilityService = facilityService;
        this.departmentService = departmentService;
        this.deviceService = deviceService;
        this.sensorService = sensorService;
    }
    async create(createOrganizationDto, token) {
        try {
            const { id } = token;
            const organizationModel = Object.assign(Object.assign({}, createOrganizationDto), { is_active: true, created_by: id, updated_by: id, date_created: new Date(), date_updated: new Date() });
            const organization = await this.organizationRepository.createOrganization(organizationModel);
            if (!organization) {
                throw new common_1.NotImplementedException('Cannot create organization');
            }
            const userDto = new create_user_dto_1.CreateUserDto();
            userDto.email = organization.email;
            const user = await this.userService.create(userDto, token);
            const orgAdminId = await this.roleService.findRoleByName('OrganizationAdmin');
            await this.roleService.createUserRole({ userid: user.data.userid, roleid: orgAdminId.roleid });
            const orgUser = new create_organization_user_dto_1.CreateOrganizationUserDto();
            orgUser.customerid = organization.customerid;
            orgUser.userid = user.data.userid;
            await this.organizationRepository.createOrganizationUser(orgUser);
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Organization Created Successfully!",
                data: organization,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const organizations = await this.organizationRepository.findAllOrganization();
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organizations Found Successfully!",
                data: organizations,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const organization = await this.organizationRepository.findOrganization(id);
            if (!organization) {
                throw new common_1.NotFoundException(`Organization Not Found with id: ${id}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organization Found Successfully!",
                data: organization,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateOrganizationDto) {
        try {
            const organization = await this.organizationRepository.findOrganization(id);
            if (!organization) {
                throw new common_1.NotFoundException(`Organization Not Found with id: ${id}`);
            }
            const updatedOrganization = await this.organizationRepository.updateOrganization(id, updateOrganizationDto);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organization Updated Successfully!",
                data: updatedOrganization,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const organization = await this.organizationRepository.deleteOrganization(id);
            if (!organization) {
                throw new common_1.NotFoundException(`Organization Not Found with id: ${id}`);
            }
            await this.facilityService.removeByOrganizationId(id);
            await this.departmentService.removeByOrganizationId(id);
            await this.deviceService.removeByOrganizationId(id);
            await this.sensorService.unAssignSensorOnOrganziationDeletion(id);
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organization Deleted Successfully!",
                data: organization,
                error: false
            };
            return response;
        }
        catch (error) {
            throw error;
        }
    }
};
OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [organization_repository_1.OrganizationRepository,
        user_service_1.UserService,
        roles_service_1.RolesService,
        facility_service_1.FacilityService,
        department_service_1.DepartmentService,
        device_service_1.DeviceService,
        sensor_service_1.SensorService])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map