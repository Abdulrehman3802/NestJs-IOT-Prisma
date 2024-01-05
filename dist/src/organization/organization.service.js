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
const client_s3_1 = require("@aws-sdk/client-s3");
const organization_repository_1 = require("./organization.repository");
const user_service_1 = require("../user/user.service");
const create_user_dto_1 = require("../user/dto/request/create-user.dto");
const roles_service_1 = require("../roles/roles.service");
const create_organization_user_dto_1 = require("./dto/request/create-organization-user.dto");
const facility_service_1 = require("../facility/facility.service");
const department_service_1 = require("../department/department.service");
const device_service_1 = require("../device/device.service");
const sensor_service_1 = require("../sensor/sensor.service");
const dashboard_service_1 = require("../dashboard/dashboard.service");
const create_dashboard_dto_1 = require("../dashboard/dto/request/create-dashboard.dto");
const config_1 = require("@nestjs/config");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository, userService, roleService, facilityService, departmentService, deviceService, dashboardService, sensorService, configService) {
        this.organizationRepository = organizationRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.facilityService = facilityService;
        this.departmentService = departmentService;
        this.deviceService = deviceService;
        this.dashboardService = dashboardService;
        this.sensorService = sensorService;
        this.configService = configService;
        this.awsAccessKey = this.configService.get('AWS_ACCESS_KEY');
        this.awsSecretKeyAccess = this.configService.get('AWS_SECRET_ACCESS_KEY');
        this.awsRegion = this.configService.get('AWS_S3_REGION');
        this.awsBucket = this.configService.get('AWS_S3_BUCKET_NAME');
        this.awsClient = new client_s3_1.S3Client({
            region: 'ap-south-1',
            credentials: {
                accessKeyId: this.awsAccessKey,
                secretAccessKey: this.awsSecretKeyAccess,
            },
        });
    }
    async create(createOrganizationDto, token) {
        try {
            const { id } = token;
            const organizationModel = Object.assign(Object.assign({}, createOrganizationDto), { is_active: true, created_by: id, updated_by: id, calibration_date: new Date(), date_created: new Date(), date_updated: new Date() });
            if (organizationModel.credit == undefined) {
                organizationModel.credit = 0;
            }
            const organization = await this.organizationRepository.createOrganization(organizationModel);
            if (!organization) {
                throw new common_1.NotImplementedException('Cannot create organization');
            }
            const userDto = new create_user_dto_1.CreateUserDto();
            userDto.email = organization.email;
            userDto.firstname = organization.contactperson;
            userDto.phonenumber = organization.phone;
            const user = await this.userService.create(userDto, token);
            const orgAdminId = await this.roleService.findRoleByName('OrganizationAdmin');
            await this.roleService.createUserRole({ userid: user.data.userid, roleid: orgAdminId.roleid });
            const orgUser = new create_organization_user_dto_1.CreateOrganizationUserDto();
            orgUser.customerid = organization.customerid;
            orgUser.userid = user.data.userid;
            await this.organizationRepository.createOrganizationUser(orgUser);
            const dashBoardDro = new create_dashboard_dto_1.CreateDashboardDto();
            dashBoardDro.customerid = organization.customerid;
            await this.dashboardService.createDashboard(dashBoardDro);
            const response = {
                statusCode: common_1.HttpStatus.CREATED,
                message: "Organization Created Successfully!",
                data: organization,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findOrganizationCredit(orgId) {
        try {
            const organization = await this.organizationRepository.getOrganizationCredit(orgId);
            if (!organization) {
                throw new common_1.NotFoundException(`Organization Not Found With Id ${orgId}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organization Credit Fetched Successfully!",
                data: (organization.credit === null) ? 0 : organization.credit,
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async findOrganizationInterval(orgId) {
        try {
            const organization = await this.organizationRepository.findOrganization(orgId);
            if (!organization) {
                throw new common_1.NotFoundException(`Organization Not Found With Id ${orgId}`);
            }
            const response = {
                statusCode: common_1.HttpStatus.OK,
                message: "Organization Interval Fetched Successfully!",
                data: {
                    interval1: organization.interval1,
                    interval2: organization.interval2,
                    interval3: organization.interval3,
                    interval4: organization.interval4
                },
                error: false
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
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
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async uploadLogo(file, organizationName) {
        try {
            console.log(file, "sadasfs");
            const fileName = `iot.${organizationName}.${file.originalname}`;
            return this.uploadToAWS(file.buffer, fileName);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
    async uploadToAWS(fileBuffer, fileName) {
        const params = {
            Bucket: this.awsBucket,
            Key: fileName,
            Body: fileBuffer,
        };
        try {
            await this.awsClient.send(new client_s3_1.PutObjectCommand(params));
            return `https://${this.awsBucket}.s3.amazonaws.com/${fileName}`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Something went wrong");
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
        dashboard_service_1.DashboardService,
        sensor_service_1.SensorService,
        config_1.ConfigService])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organization.service.js.map